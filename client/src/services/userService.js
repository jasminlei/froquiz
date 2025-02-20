import axios from 'axios'

const baseUrl = '/api'

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/user-profile/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}
