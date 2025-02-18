import './Home.css'
import { useContext } from 'react'
import { useAuth } from '../context/authContext'

function Home() {
  const { isLoggedIn, username } = useAuth()
  return (
    <div className='home'>
      <div className='hero'>
        <div className='frog-container'>
          <div className='big-emoji'>🐸</div>
          <div className='speech-bubble'>
            {isLoggedIn
              ? `hello ${username}! you ready to show off your skills, or should I grab some popcorn first?`
              : 'welcome! ready to quiz?'}
          </div>
        </div>

        <h1>You think you know everthing about coding!? Let's see!</h1>
        <p>
          Welcome to the ultimate challenge! Ready to test your skills and
          knowledge? In this game, you'll face a series of questions that will
          push your coding knowledge to the limit. Choose from a variety of
          themes and difficulty modes, and log in to track your progress. If you
          perform well, you’ll earn a cool certificate to show off your
          expertise. But, if you're not quite there yet... well, maybe it's time
          to rethink your career choice!
        </p>
      </div>
      <div className='features'>
        <div className='feature'>
          <h2>Box 1</h2>
          <p>
            text text text text text text text text text text text text text
            text text
          </p>
        </div>
        <div className='feature'>
          <h2>Box 2</h2>
          <p>
            text text text text text text text text text text text text text
            text text
          </p>
        </div>
        <div className='feature'>
          <h2>Box 3</h2>
          <p>
            text text text text text text text text text text text text text
            text text
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
