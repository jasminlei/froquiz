import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import axios from 'axios'
import './Profile.css'
import ProfileFrogComment from '../components/ProfileFrogComment'

const baseUrl = 'http://localhost:3000'

function Profile() {
  const { username, userId } = useAuth()
  const [bestScores, setBestScores] = useState([])
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/user-profile/${userId}`
        )
        setBestScores(response.data.bestScores)
        setCertificates(response.data.certificates)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    if (userId) {
      fetchUserProfile()
    }
  }, [userId])

  return (
    <div className='profile'>
      <div className='hero'>
        <div className='frog-container'>
          <div className='big-emoji'>🐸</div>
          <div className='speech-bubble'>
            <ProfileFrogComment />
          </div>
        </div>
        <h1>{username}</h1>
        <p>
          Oh, look at you, collecting achievements like you're actually good at
          this!
          <br />
          Maybe you’ve even earned a certificate or two — finally, something to
          prove your worth. 💚
        </p>
      </div>

      <div className='features'>
        <div className='feature'>
          <h2>Certificates</h2>
          {certificates.length > 0 ? (
            <ul>
              {certificates.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          ) : (
            <p>No certificates earned yet.</p>
          )}
        </div>

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
      </div>
    </div>
  )
}

export default Profile
