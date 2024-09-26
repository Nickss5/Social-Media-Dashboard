import {NavLink} from 'react-router-dom'
import {IoIosHome} from 'react-icons/io'
import {FaUsers} from 'react-icons/fa'
import {CgMediaPodcast} from 'react-icons/cg'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar-container">
      {/* Logo section */}
      <img
        className="logo-design1"
        src="https://user-images.githubusercontent.com/59119736/219688189-dd0af383-b3e0-425c-afe6-0ecbea100a02.png"
        alt="logo"
      />

      {/* Navigation link to Home */}
      <div className="link-container">
        <NavLink
          to="/"
          className={({isActive}) =>
            isActive ? 'nav-link active-link' : 'nav-link'
          }
        >
          {/* Home icon */}
          <IoIosHome className="link-image" />
          {/* Label for Home link */}
          <p className="link-para">Home</p>
        </NavLink>
      </div>

      {/* Navigation link to Users */}
      <div className="link-container">
        <NavLink
          to="/users"
          className={({isActive}) =>
            isActive ? 'nav-link active-link' : 'nav-link'
          }
        >
          {/* Users icon */}
          <FaUsers className="link-image" />
          {/* Label for Users link */}
          <p className="link-para">Users</p>
        </NavLink>
      </div>

      {/* Navigation link to Posts */}
      <div className="link-container">
        <NavLink
          to="/posts"
          className={({isActive}) =>
            isActive ? 'nav-link active-link' : 'nav-link'
          }
        >
          {/* Posts icon */}
          <CgMediaPodcast className="link-image" />
          {/* Label for Posts link */}
          <p className="link-para">Posts</p>
        </NavLink>
      </div>

      {/* Profile section */}
      <div className="profile">
        <img
          src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png"
          alt="profile"
          className="profile-image"
        />
        {/* Display profile name */}
        <h2 className="profile-head">Nishma Medagoni</h2>
        {/* Display profile role or description */}
        <p className="profile-para">B181220</p>
      </div>
    </div>
  )
}

export default Sidebar
