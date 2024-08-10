import {GoGraph} from 'react-icons/go'
import React, {useState} from 'react'
import {users as initialUsers} from '../data'
import Sidebar from '../Components/Sidebar'
import ConfirmDialog from '../Components/ConfirmDialog'
import './UserListingPage.css'

function UserListingPage() {
  // State to store the list of users, initialized with initialUsers from data file
  const [userList, setUserList] = useState(initialUsers)

  // State to store the user currently being edited
  const [editingUser, setEditingUser] = useState(null)

  // State to store the current page for pagination
  const [currentPage, setCurrentPage] = useState(1)

  // State to control the visibility of the edit user modal
  const [showEditModal, setShowEditModal] = useState(false)

  // State to control the visibility of the confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // State to store the ID of the user selected for banning or editing
  const [selectedUserId, setSelectedUserId] = useState(null)

  // State to store the type of action for the confirmation dialog ('ban' or 'edit')
  const [dialogType, setDialogType] = useState('')

  // Number of users to display per page
  const usersPerPage = 5

  // Function to handle saving changes to a user after editing
  const handleEditUser = () => {
    // Update the user list with the edited user's details
    setUserList(
      userList.map(user => (user.id === editingUser.id ? editingUser : user)),
    )
    // Close the edit modal
    setShowEditModal(false)
  }

  // Function to initiate the ban user process
  const handleBanUser = userId => {
    setSelectedUserId(userId) // Set the selected user ID
    setDialogType('ban') // Set the dialog type to 'ban'
    setShowConfirmDialog(true) // Show the confirmation dialog
  }

  // Function to confirm an action (ban or edit)
  const confirmAction = () => {
    if (dialogType === 'ban') {
      // If the action is to ban, remove the user from the list
      setUserList(userList.filter(user => user.id !== selectedUserId))
    }
    // Close the confirmation dialog
    setShowConfirmDialog(false)
  }

  // Function to cancel the confirmation dialog
  const handleCancel = () => {
    setShowConfirmDialog(false)
  }

  // Calculate the visible users for the current page
  const visibleUsers = userList
  const totalUsers = visibleUsers.length
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = visibleUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Calculate the total number of pages needed
  const totalPages = Math.ceil(visibleUsers.length / usersPerPage)

  // Calculate the number of active users
  const activeUsers = userList.filter(user => user.active).length

  // Function to change the current page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="User-container">
      {/* Sidebar component */}
      <Sidebar />
      <div className="UserPage-container">
        <div className="LoginPage1">
          {/* Total Users Section */}
          <div className="total-users-container1">
            <h3 className="home-head">Total Users</h3>
            <div className="class-1">
              <h1 className="head2">{totalUsers}K</h1>
              <GoGraph className="graph-image1" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color1">13.56%</div>
            </div>
          </div>

          {/* Active Users Section */}
          <div className="active-users1">
            <h3 className="home-head">Active Users in Last 24 Hours</h3>
            <div className="class-1">
              <h1 className="head2">{activeUsers}K</h1>
              <GoGraph className="graph-image3" />
            </div>
            <div className="percent1">
              <p className="home-para">Since last week</p>
              <div className="percent color2">03.68%</div>
            </div>
          </div>
        </div>

        {/* User List Table */}
        <div className="table-wrapper">
          <table className="table-container">
            <thead className="table-head">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {/* Render current users for the current page */}
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Edit button */}
                    <button
                      className="buttons"
                      onClick={() => {
                        setEditingUser(user)
                        setShowEditModal(true)
                      }}
                    >
                      Edit
                    </button>
                    {/* Ban button */}
                    <button
                      className="buttons"
                      onClick={() => handleBanUser(user.id)}
                    >
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit User Modal */}
          {showEditModal && editingUser && (
            <div className="edit-user-modal">
              <h2 className="edit-head">Edit User</h2>
              <input
                type="text"
                placeholder="ID"
                className="edit-input"
                value={editingUser.id}
                onChange={e =>
                  setEditingUser({...editingUser, id: e.target.value})
                }
              />
              <input
                type="text"
                placeholder="Username"
                className="edit-input"
                value={editingUser.username}
                onChange={e =>
                  setEditingUser({...editingUser, username: e.target.value})
                }
              />
              <input
                type="text"
                placeholder="Name"
                className="edit-input"
                value={editingUser.name}
                onChange={e =>
                  setEditingUser({...editingUser, name: e.target.value})
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={editingUser.email}
                className="edit-input"
                onChange={e =>
                  setEditingUser({...editingUser, email: e.target.value})
                }
              />
              <div className="edit-button">
                {/* Save button */}
                <button className="edit-button1" onClick={handleEditUser}>
                  Save
                </button>
                {/* Cancel button */}
                <button
                  className="edit-button1"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Dialog for Ban/Edit Actions */}
        <ConfirmDialog
          show={showConfirmDialog}
          onConfirm={confirmAction}
          onCancel={handleCancel}
          message={
            dialogType === 'edit'
              ? 'Are you sure you want to edit this user?'
              : 'Are you sure you want to ban this user?'
          }
          onConfirmText={dialogType === 'edit' ? 'Edit' : 'Ban'}
          onCancelText="Cancel"
        />

        {/* Pagination */}
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
      </div>
    </div>
  )
}

export default UserListingPage
