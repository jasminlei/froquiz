import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { loginUser } from '../services/authService'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(username, password)
      const { token, userId } = response

      if (token && userId) {
        login(token, username, userId)
        navigate('/')
      } else {
        console.error('Login failed: Invalid response structure')
        alert('Invalid credentials')
      }
    } catch (error) {
      console.error('Error during login', error)
      alert('An error occurred during login')
    }
  }

  return (
    <div>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>Welcome back! Please login below</div>
      </div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
