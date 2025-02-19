const pool = require('../config/db')

const getQuiz = async (req, res) => {
  const quizId = req.params.id

  try {
    const quizResult = await pool.query('SELECT * FROM quizzes WHERE id = $1', [
      quizId,
    ])

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    const quiz = quizResult.rows[0]

    const questionsResult = await pool.query(
      'SELECT * FROM questions WHERE quiz_id = $1',
      [quizId]
    )

    const questions = await Promise.all(
      questionsResult.rows.map(async (question) => {
        if (question.question_type === 'multiple-choice') {
          const answerOptionsResult = await pool.query(
            'SELECT * FROM answer_options WHERE question_id = $1',
            [question.id]
          )
          const answerOptions = answerOptionsResult.rows
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
    let score = 0
    let wrongAnswers = []

    for (const answer of answers) {
      const { questionId, selectedAnswerId, textAnswer } = answer
      let correctAnswer = null
      let isCorrect = false
      let questionText = ''
      let codeExample = null
      // Get the question text
      const questionResult = await pool.query(
        'SELECT question_text, code_example FROM questions WHERE id = $1',
        [questionId]
      )
      questionText = questionResult.rows[0]?.question_text || ''
      codeExample = questionResult.rows[0]?.code_example || null
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
      }

      if (isCorrect) {
        score++
      } else {
        wrongAnswers.push({
          questionText,
          correctAnswer,
          codeExample: codeExample || null,
        })
      }
    }

    await pool.query(
      'INSERT INTO user_quiz_results (user_id, quiz_id, score) VALUES ($1, $2, $3)',
      [userId, quizId, score]
    )

    const maxScoreResult = await pool.query(
      'SELECT COUNT(*) AS max_score FROM questions WHERE quiz_id = $1',
      [quizId]
    )
    const maxScore = parseInt(maxScoreResult.rows[0].max_score, 10)

    if (score === maxScore) {
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
