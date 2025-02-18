import React from 'react'
import './Results.css'

function Results({ score, wrongAnswers }) {
  return (
    <div className='results-container'>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>How did it go??</div>
      </div>
      <h1>Quiz Results</h1>
      <h2>Your Score: {score}</h2>

      {wrongAnswers.length > 0 && (
        <div>
          <h3>Incorrect Answers:</h3>
          <ul>
            {wrongAnswers.map((wrongAnswer, index) => (
              <li key={index}>
                <strong>{wrongAnswer.questionText}</strong>:
                <br />
                <span className='correct-answer'>
                  {wrongAnswer.correctAnswer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Results
