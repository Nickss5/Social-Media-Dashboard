import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import UserListingPage from './Pages/UserListingPage'
import PostListingPage from './Pages/PostListingPage'

function App() {
  // State to track if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Function to handle user login
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              // Show LoginPage if not logged in, otherwise redirect to home
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Route for the home page */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        {/* Route for the user listing page */}
        <Route
          path="/users"
          element={isLoggedIn ? <UserListingPage /> : <Navigate to="/login" />}
        />
        {/* Route for the post listing page */}
        <Route
          path="/posts"
          element={isLoggedIn ? <PostListingPage /> : <Navigate to="/login" />}
        />
        {/* Redirect any unknown routes to the login page */}
        <Route element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
