import React from 'react'
import { useAuth } from '../context/authContext'

import './Results.css'

function Results({ score, wrongAnswers, maxScore }) {
  const { isLoggedIn } = useAuth()

  return (
    <div className='results-container'>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>
          {score === maxScore
            ? 'Unbelievable. Did you cheat?'
            : score === 0
            ? 'Zero points? Even a rock would’ve guessed something right by accident.'
            : score >= maxScore * 0.75
            ? 'Oh wow, look at you, almost competent! Too bad ‘almost’ doesn’t pay the bills.'
            : score >= maxScore / 2
            ? 'Are you even trying? I’ve seen pond scum with more intellect.'
            : 'Honestly, just hand over the quiz. Watching you struggle is getting painful'}
        </div>
      </div>
      <h1>Quiz Results</h1>
      <h2>
        Your Score: {score}/{maxScore}
      </h2>
      {score === maxScore && !isLoggedIn && (
        <div className='certificate-container'>
          Congratulations! Only if you were logged in... you would have gotten a
          certificate!
        </div>
      )}
      {score === maxScore && isLoggedIn && (
        <div className='certificate-container'>
          <h2>Congratulations! You've earned a certificate!</h2>
          <p>
            Your score is {score}/{maxScore}, which is 100%! See your
            certificate in your profile.
          </p>
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div>
          <h3>Incorrect answers:</h3>
          <ul>
            {wrongAnswers.map((wrongAnswer, index) => (
              <li key={index}>
                <strong>{wrongAnswer.questionText}</strong>
                {wrongAnswer.codeExample && (
                  <div className='code-example'>
                    <pre>{wrongAnswer.codeExample}</pre>
                  </div>
                )}
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
