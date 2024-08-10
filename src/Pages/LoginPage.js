import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './LoginPage.css'

function LoginPage({onLogin}) {
  // State to manage the email input field
  const [email, setEmail] = useState('')

  // State to manage the password input field
  const [password, setPassword] = useState('')

  // Hook to programmatically navigate between routes
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault() // Prevent default form submission behavior
    // For simplicity, accepting any credentials without validation
    onLogin() // Trigger the onLogin function to update the login state in the parent component (e.g., App.js)
    navigate('/') // Redirect the user to the home page after login
  }

  return (
    <div className="login-container">
      <div className="login-page">
        {/* Login form section */}
        <div className="login-form">
          <nav className="nav-bar">
            <div className="nav">
              {/* Display logo */}
              <img
                className="logo-design"
                src="https://user-images.githubusercontent.com/59119736/219688189-dd0af383-b3e0-425c-afe6-0ecbea100a02.png"
                alt="logo"
              />
            </div>
            <p className="nav-para">Create an account</p>
          </nav>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="login">
            <h1 className="login-head">Welcome back</h1>
            <p className="login-para">
              Enter your Spartificial account details.
            </p>
            {/* Email/Username input field */}
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email or username"
            />
            {/* Password input field */}
            <input
              type="text"
              id="password" // Corrected ID to 'password' for the password field
              className="password-input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="sign-cred">
              <div className="input">
                {/* Checkbox for keeping the user signed in */}
                <input type="checkbox" />
                <p className="nav-para2">Keep me signed in</p>
              </div>
              {/* Link to recover forgotten password */}
              <p className="nav-para1">Forgot password</p>
            </div>
            {/* Submit button for the login form */}
            <button type="submit" className="button">
              Sign in
            </button>
          </form>
        </div>

        {/* Section displaying a background image */}
        <div className="login-part-2">
          <img
            src="https://cdn.dribbble.com/userupload/10783193/file/original-dc414a4dad34abdabf6d8b5ad98ec146.jpg?resize=1200x900"
            alt="login-image"
            className="image"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
