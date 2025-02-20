import './Home.css'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom'

function Home() {
  const { isLoggedIn, username } = useAuth()
  return (
    <div className='home'>
      <div className='hero'>
        <div className='frog-container'>
          <div className='big-emoji'>🐸</div>
          <div className='speech-bubble'>
            {isLoggedIn
              ? `Hello ${username}! Are you ready to show off your skills, or should I grab some popcorn first?`
              : 'Welcome! Ready to quiz? Remember to login to get a certificate!'}
          </div>
        </div>

        <h1>You think you know everthing about coding!? Let's see!</h1>
        <p>
          Are you ready to test your skills and knowledge? In this game, you'll
          face a series of questions that will{' '}
          <span className='green-word'>
            push your coding knowledge to the limit
          </span>
          . If you perform well,
          <span className='pink-word'> you’ll earn a cool certificate</span> to
          show off your expertise. But, if you're not quite there yet... well,
          maybe it's time to rethink your career choice!
        </p>
      </div>
      <div className='features'>
        <Link to='/quiz/5'>
          <div className='feature'>
            <h2>Play Easy JavaScript Quiz</h2>
            <p>
              Here you can test if you know the basics of JavaScript. It would
              be embarassing if you didn't, right?
            </p>
          </div>
        </Link>
        <div className='feature'>
          <p>More quizzes coming soon!</p>
          🐸
        </div>
      </div>
    </div>
  )
}

export default Home
