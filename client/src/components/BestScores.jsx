import React from 'react'

const BestScores = ({ bestScores }) => {
  return (
    <div className='feature'>
      <h2>Best Scores</h2>
      {bestScores.length > 0 ? (
        <ul>
          {bestScores.map((quiz, index) => (
            <li key={index}>
              {quiz.quizTitle}: {quiz.bestScore} points
            </li>
          ))}
        </ul>
      ) : (
        <p>No scores recorded yet.</p>
      )}
    </div>
  )
}

export default BestScores
