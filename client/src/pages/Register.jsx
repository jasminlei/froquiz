import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, {
        username,
        password,
      })

      if (response.status === 201) {
        console.log('Registration successful:', response.data)
        navigate('/login')
      } else {
        console.log(
          'Registration failed:',
          response.data.message || 'Unknown error'
        )
        alert(response.data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data)
        alert(
          error.response.data.message || 'An error occurred during registration'
        )
      } else if (error.request) {
        console.error('No response from server:', error.request)
        alert('No response from server. Please check your network connection')
      } else {
        console.error('Unexpected error:', error.message)
        alert('An unexpected error occurred. Please try again later.')
      }
    }
  }

  return (
    <div>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>yay! fill your information below</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
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
            placeholder='Enter your password'
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
