import React from 'react'
import { useAuth } from '../context/authContext'
import './Profile.css'
import ProfileFrogComment from '../components/ProfileFrogComment'

function Profile() {
  const { username } = useAuth()

  const mockCertificates = ['Quiz One', 'Quiz Two']
  const mockBestScores = {
    'Quiz 1': 85,
    'Quiz 2': 92,
  }

  return (
    <div className='profile'>
      <div className='hero'>
        <div className='frog-container'>
          <div className='big-emoji'>🐸</div>
          <div className='speech-bubble'>
            <ProfileFrogComment />
          </div>
        </div>
        <h1> {username}</h1>
        <p>
          Oh, look at you, collecting achievements like you're actually good at
          this!
          <br></br>
          Maybe you’ve even earned a certificate or two — finally, something to
          prove your worth. 💚
        </p>
      </div>

      <div className='features'>
        <div className='feature'>
          <h2>Certificates</h2>
          {mockCertificates.length > 0 ? (
            <ul>
              {mockCertificates.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          ) : (
            <p>No certificates earned yet.</p>
          )}
        </div>

        <div className='feature'>
          <h2>Best Scores</h2>
          {Object.keys(mockBestScores).length > 0 ? (
            <ul>
              {Object.entries(mockBestScores).map(([game, score], index) => (
                <li key={index}>
                  {game}: {score} points
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
