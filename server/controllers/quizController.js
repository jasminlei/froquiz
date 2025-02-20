const pool = require('../config/db')

const fetchQuizById = async (quizId) => {
  const quizResult = await pool.query('SELECT * FROM quizzes WHERE id = $1', [
    quizId,
  ])
  return quizResult.rows[0]
}

const fetchQuestionsByQuizId = async (quizId) => {
  return await pool.query('SELECT * FROM questions WHERE quiz_id = $1', [
    quizId,
  ])
}

const fetchAnswerOptions = async (questionId) => {
  const answerOptionsResult = await pool.query(
    'SELECT * FROM answer_options WHERE question_id = $1',
    [questionId]
  )
  return answerOptionsResult.rows
}

const calculateScore = async (answers) => {
  let score = 0
  let wrongAnswers = []

  for (const answer of answers) {
    const { questionId, selectedAnswerId, textAnswer } = answer
    let correctAnswer = null
    let isCorrect = false
    let questionText = ''
    let codeExample = null
    const questionResult = await pool.query(
      'SELECT question_text, code_example FROM questions WHERE id = $1',
      [questionId]
    )
    questionText = questionResult.rows[0]?.question_text || ''
    codeExample = questionResult.rows[0]?.code_example || null

    let userAnswer = null

    if (textAnswer) {
      const result = await pool.query(
        'SELECT correct_answer_text FROM correct_answers WHERE question_id = $1',
        [questionId]
      )
      correctAnswer = result.rows[0]?.correct_answer_text

      if (
        textAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      ) {
        isCorrect = true
      }

      userAnswer = textAnswer
    } else if (selectedAnswerId) {
      const result = await pool.query(
        'SELECT answer_text, is_correct FROM answer_options WHERE id = $1',
        [selectedAnswerId]
      )

      const correctAnswerResult = await pool.query(
        'SELECT answer_text FROM answer_options WHERE question_id = $1 AND is_correct = TRUE',
        [questionId]
      )

      correctAnswer =
        correctAnswerResult.rows[0]?.answer_text || 'No correct answer found'

      isCorrect = result.rows[0]?.is_correct || false

      const selectedAnswer = result.rows[0]?.answer_text || 'No answer selected'
      userAnswer = selectedAnswer
    }

    if (isCorrect) {
      score++
    } else {
      wrongAnswers.push({
        questionText,
        correctAnswer,
        userAnswer,
        codeExample: codeExample || null,
      })
    }
  }

  return { score, wrongAnswers }
}

const insertUserQuizResult = async (userId, quizId, score) => {
  await pool.query(
    'INSERT INTO user_quiz_results (user_id, quiz_id, score) VALUES ($1, $2, $3)',
    [userId, quizId, score]
  )
}

const getQuiz = async (req, res) => {
  const quizId = req.params.id

  try {
    const quiz = await fetchQuizById(quizId)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    const questionsResult = await fetchQuestionsByQuizId(quizId)
    const questions = await Promise.all(
      questionsResult.rows.map(async (question) => {
        if (question.question_type === 'multiple-choice') {
          const answerOptions = await fetchAnswerOptions(question.id)
          return { ...question, answerOptions }
        }
        return question
      })
    )

    res.json({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions,
    })
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const submitQuiz = async (req, res) => {
  const { userId, quizId, answers } = req.body

  try {
    const { score, wrongAnswers } = await calculateScore(answers)
    await insertUserQuizResult(userId, quizId, score)

    const maxScoreResult = await pool.query(
      'SELECT COUNT(*) AS max_score FROM questions WHERE quiz_id = $1',
      [quizId]
    )
    const maxScore = parseInt(maxScoreResult.rows[0].max_score, 10)

    const scorePercentage = score / maxScore
    const passPercentage = 0.7

    if (scorePercentage >= passPercentage) {
      await pool.query(
        'UPDATE user_quiz_results SET certificate_issued = TRUE WHERE user_id = $1 AND quiz_id = $2',
        [userId, quizId]
      )
    }

    res.json({
      score,
      maxScore,
      wrongAnswers,
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = { getQuiz, submitQuiz }
