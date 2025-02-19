import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/quizzes`)
    return response.data
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    throw error
  }
}

export const fetchQuizData = async (quizId) => {
  const response = await axios.get(`${baseUrl}/quizzes/${quizId}`)
  return response.data
}

export const submitQuiz = async (userId, quizId, answers) => {
  const response = await axios.post(`${baseUrl}/submit-quiz`, {
    userId,
    quizId,
    answers,
  })
  return response.data
}
