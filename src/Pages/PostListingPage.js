import React, {useState} from 'react'
import {GoGraph} from 'react-icons/go'
import {posts as initialPosts} from '../data'
import Sidebar from '../Components/Sidebar'
import ConfirmDialog from '../Components/ConfirmDialog'
import './PostListingPage.css'

function PostListingPage() {
  // State to manage the list of posts
  const [postList, setPostList] = useState(initialPosts)

  // State to manage the current page in pagination
  const [currentPage, setCurrentPage] = useState(1)

  // State to manage the visibility of the confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // State to store the ID of the post selected for deletion
  const [selectedPostId, setSelectedPostId] = useState(null)

  // Number of posts to display per page
  const postsPerPage = 5

  // Handle deleting a post by showing the confirmation dialog
  const handleDeletePost = postId => {
    setSelectedPostId(postId)
    setShowConfirmDialog(true)
  }

  // Confirm deletion of the selected post and update the post list
  const confirmDelete = () => {
    setPostList(postList.filter(post => post.id !== selectedPostId))
    setShowConfirmDialog(false)
  }

  // Handle hiding a post by updating its 'hidden' property
  const handleHidePost = postId => {
    setPostList(
      postList.map(post =>
        post.id === postId ? {...post, hidden: true} : post,
      ),
    )
  }

  // Filter out hidden posts to display only visible ones
  const visiblePosts = postList.filter(post => !post.hidden)

  // Calculate the total number of visible posts
  const totalPosts = visiblePosts.length

  // Calculate the number of recent posts within the last 24 hours
  const recentPosts = visiblePosts.filter(
    post =>
      new Date(post.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000),
  ).length

  // Determine the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage

  // Determine the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  // Get the posts to display on the current page
  const currentPosts = visiblePosts.slice(indexOfFirstPost, indexOfLastPost)

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(visiblePosts.length / postsPerPage)

  // Update the current page number
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="Post-container">
      {/* Sidebar component */}
      <Sidebar />

      <div className="PostPage-container">
        <div className="PostPage1">
          {/* Section displaying the total number of posts */}
          <div className="total-posts-container1">
            <h3 className="home-head">Total Posts</h3>
            <div className="class-1">
              <h1 className="head2">{totalPosts}K</h1>
              <GoGraph className="graph-image2" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color2">12.34%</div>
            </div>
          </div>

          {/* Section displaying the number of recent posts in the last 24 hours */}
          <div className="active-posts1">
            <h3 className="home-head">Recent Posts in Last 24 Hours</h3>
            <div className="class-1">
              <h1 className="head2">{recentPosts}K</h1>
              <GoGraph className="graph-image4" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color1">11.64%</div>
            </div>
          </div>
        </div>

        {/* Table displaying the list of posts */}
        <div className="table-wrapper">
          <table className="table-container">
            <thead className="table-head">
              <tr>
                <th>Post ID</th>
                <th>Caption</th>
                <th>Media URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {currentPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td className="caption-cell">{post.caption}</td>
                  <td>{post.mediaUrl}</td>
                  <td>
                    {/* Button to delete a post */}
                    <button
                      className="buttons"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>

                    {/* Button to hide a post */}
                    <button
                      className="buttons"
                      onClick={() => handleHidePost(post.id)}
                    >
                      Hide
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          {Array.from({length: totalPages}, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Confirmation dialog for deleting a post */}
        <ConfirmDialog
          show={showConfirmDialog}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
          message="Are you sure you want to delete this post?"
        />
      </div>
    </div>
  )
}

export default PostListingPage
