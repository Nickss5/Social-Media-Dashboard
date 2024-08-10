import {GoGraph} from 'react-icons/go'
import {users, posts} from '../data'
import Sidebar from '../Components/Sidebar'
import './HomePage.css'

function Homepage() {
  // Calculate the total number of users
  const totalUsers = users.length

  // Calculate the total number of posts
  const totalPosts = posts.length

  // Calculate the number of active users in the last 24 hours
  const activeUsers = users.filter(user => user.active).length

  // Calculate the number of recent posts created in the last 24 hours
  const recentPosts = posts.filter(
    post =>
      new Date(post.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000),
  ).length

  return (
    <div className="Home-container">
      {/* Render the Sidebar component */}
      <Sidebar />

      <div className="HomePage-container">
        <div className="Homepage1">
          {/* Section to display the total number of users */}
          <div className="total-users-container">
            <h3 className="home-head">Total Users</h3>
            <div className="class-1">
              {/* Display the total users count */}
              <h1 className="head2">{totalUsers}K</h1>
              {/* Display a graph icon */}
              <GoGraph className="graph-image1" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color1">13.56%</div>
            </div>
          </div>

          {/* Section to display the total number of posts */}
          <div className="total-posts-container">
            <h3 className="home-head">Total Posts</h3>
            <div className="class-1">
              {/* Display the total posts count */}
              <h1 className="head2">{totalPosts}K</h1>
              {/* Display a graph icon */}
              <GoGraph className="graph-image2" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color2">12.34%</div>
            </div>
          </div>
        </div>

        <div className="Homepage1">
          {/* Section to display the number of active users in the last 24 hours */}
          <div className="active-users">
            <h3 className="home-head">Active Users in Last 24 Hours</h3>
            <div className="class-1">
              {/* Display the active users count */}
              <h1 className="head2">{activeUsers}K</h1>
              {/* Display a graph icon */}
              <GoGraph className="graph-image3" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color2">03.68%</div>
            </div>
          </div>

          {/* Section to display the number of recent posts in the last 24 hours */}
          <div className="active-posts">
            <h3 className="home-head">Recent Posts in Last 24 Hours</h3>
            <div className="class-1">
              {/* Display the recent posts count */}
              <h1 className="head2">{recentPosts}K</h1>
              {/* Display a graph icon */}
              <GoGraph className="graph-image4" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color1">11.64%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
