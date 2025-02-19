const pool = require('../config/db')

const getUserProfile = async (req, res) => {
  const { userId } = req.params

  try {
    const bestScoresQuery = `
        SELECT quiz_id, MAX(score) AS best_score
        FROM user_quiz_results
        WHERE user_id = $1
        GROUP BY quiz_id
      `
    const bestScoresResult = await pool.query(bestScoresQuery, [userId])

    const bestScores = await Promise.all(
      bestScoresResult.rows.map(async (row) => {
        const quizTitleQuery = 'SELECT title FROM quizzes WHERE id = $1'
        const quizTitleResult = await pool.query(quizTitleQuery, [row.quiz_id])
        return {
          quizId: row.quiz_id,
          quizTitle: quizTitleResult.rows[0]?.title || 'Unknown Quiz',
          bestScore: row.best_score,
        }
      })
    )

    const certificatesQuery = `
        SELECT DISTINCT ON (q.title) q.title AS quiz_title
        FROM user_quiz_results uqr
        JOIN quizzes q ON uqr.quiz_id = q.id
        WHERE uqr.user_id = $1 AND uqr.certificate_issued = TRUE
        ORDER BY q.title, uqr.id DESC
      `
    const certificatesResult = await pool.query(certificatesQuery, [userId])

    const certificates = certificatesResult.rows.map((row) => row.quiz_title)

    res.json({ bestScores, certificates })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getUserProfile,
}
