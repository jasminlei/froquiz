import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import Question from '../components/Question'
import Results from '../components/Results'
import { fetchQuizData, submitQuiz } from '../services/quizService'
import './Auth.css'
import './quiz.css'

function QuizPage() {
  const { quizId } = useParams()
  const { userId } = useAuth()
  const [quizData, setQuizData] = useState(null)
  const [answers, setAnswers] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await fetchQuizData(quizId)
        setQuizData(data)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }

    fetchQuiz()
  }, [quizId])

  const handleAnswerChange = (
    questionId,
    selectedAnswerId,
    textAnswer = ''
  ) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId
      )
      if (selectedAnswerId) {
        updatedAnswers.push({ questionId, selectedAnswerId })
      } else {
        updatedAnswers.push({ questionId, textAnswer })
      }
      return updatedAnswers
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      const currentElement = document.querySelector('.question-container')
      currentElement.classList.add('question-exit')

      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      }, 500)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      const formattedAnswers = answers.map((answer) => ({
        questionId: answer.questionId,
        selectedAnswerId: answer.selectedAnswerId,
        textAnswer: answer.textAnswer || null,
      }))

      const response = await submitQuiz(userId, quizId, formattedAnswers)
      setScore(response.score)
      setWrongAnswers(response.wrongAnswers)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
  }

  if (!quizData) {
    return <p>Loading quiz...</p>
  }

  if (showResults) {
    return (
      <Results
        score={score}
        wrongAnswers={wrongAnswers}
        maxScore={quizData.questions.length}
      />
    )
  }

  return (
    <div className='quiz-container'>
      <div className='frog-container'>
        <div className='big-emoji'>🐸</div>
        <div className='speech-bubble'>Time to quiz!!!</div>
      </div>
      <h1 className='quiz-title'>{quizData.title}</h1>
      <p className='quiz-description'>{quizData.description}</p>

      <h2 className='quiz-question-number'>
        Question {currentQuestionIndex + 1} / {quizData.questions.length}
      </h2>

      <div>
        <Question
          key={quizData.questions[currentQuestionIndex].id}
          question={quizData.questions[currentQuestionIndex]}
          handleAnswerChange={handleAnswerChange}
        />
      </div>

      <button className='quiz-button' onClick={handleNextQuestion}>
        {currentQuestionIndex < quizData.questions.length - 1
          ? 'Next'
          : 'Submit'}
      </button>
    </div>
  )
}

export default QuizPage
