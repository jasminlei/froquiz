import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await registerUser(username, password)
      if (response && response.status === 201) {
        navigate('/login')
      } else {
        handleRegistrationError(response)
      }
    } catch (error) {
      handleError(error)
    }
  }

  const handleRegistrationError = (error) => {
    if (error.errors && error.errors.length > 0) {
      const errorMessage = error.errors[0].msg
      console.log(errorMessage)
      alert(errorMessage)
    } else {
      const genericErrorMessage = 'An unknown error occurred.'
      console.log(genericErrorMessage)
      alert(genericErrorMessage)
    }
  }

  const handleError = (error) => {
    console.error('Error during registration', error)
    alert(
      error.response?.data?.message || 'An error occurred during registration'
    )
  }

  return (
    <div>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>Yay! Fill your information below</div>
      </div>

      <div className='auth-container'>
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
    </div>
  )
}

export default Register
