import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import './Navbar.css'

function Navbar() {
  const { isLoggedIn, logout, username } = useAuth()

  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-brand'>
          <Link to='/'>🐸 FrogQuiz</Link>
        </div>

        {isLoggedIn && (
          <div className='navbar-text'>{username} is logged in</div>
        )}

        <div className='navbar-links'>
          {isLoggedIn ? (
            <>
              <Link to='/profile'>Profile</Link>
              <Link to='/' onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
