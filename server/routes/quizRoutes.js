const express = require('express')
const { getQuiz, submitQuiz } = require('../controllers/quizController')
const router = express.Router()

router.get('/quizzes/:id', getQuiz)
router.post('/submit-quiz', submitQuiz)

module.exports = router
