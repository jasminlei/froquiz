import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-brand'>
          <Link to='/'>🐸 froquiz</Link>
        </div>
        <div className='navbar-links'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
