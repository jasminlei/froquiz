import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/auth'

export const loginUser = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  })
  return response.data
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
