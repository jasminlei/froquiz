import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/auth'

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    })

    return response.data
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message

      if (error.response.status === 400) {
        alert(errorMessage)
      } else {
        alert('An error occurred. Please try again.')
      }
    } else {
      alert('Network error. Please check your connection.')
    }

    throw error
  }
}

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      username,
      password,
    })
    return { data: response.data, status: response.status }
  } catch (error) {
    if (error.response) {
      return { errors: error.response.data.errors }
    }
    return { errors: [{ msg: 'An unexpected error occurred.' }] }
  }
}
