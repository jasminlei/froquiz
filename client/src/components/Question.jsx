import React from 'react'
import './Question.css'

const Question = ({ question, handleAnswerChange }) => {
  return (
    <div className='question-container'>
      <h3 className='question-text'>{question.question_text}</h3>

      {question.code_example && (
        <div className='code-example'>
          <pre>{question.code_example}</pre>
        </div>
      )}

      {question.question_type === 'multiple-choice' && (
        <div className='answer-options'>
          {question.answerOptions.map((option) => (
            <label key={option.id} className='answer-option'>
              <input
                type='radio'
                name={`question-${question.id}`}
                value={option.id}
                onChange={() => handleAnswerChange(question.id, option.id)}
              />
              {option.answer_text}
            </label>
          ))}
        </div>
      )}

      {question.question_type === 'open-ended' && (
        <div className='open-ended-container'>
          <label
            htmlFor={`question-${question.id}-answer`}
            className='open-ended-label'
          >
            Your answer:
          </label>
          <input
            type='text'
            id={`question-${question.id}-answer`}
            className='open-ended-input'
            onChange={(e) =>
              handleAnswerChange(question.id, null, e.target.value)
            }
          />
        </div>
      )}
    </div>
  )
}

export default Question
