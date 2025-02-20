import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { fetchUserProfile } from '../services/userService'
import './Profile.css'
import ProfileFrogComment from '../components/ProfileFrogComment'
import Certificates from '../components/Certificates'
import BestScores from '../components/BestScores'

function Profile() {
  const { username, userId } = useAuth()
  const [bestScores, setBestScores] = useState([])
  const [certificates, setCertificates] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUserProfile = async () => {
      if (userId) {
        try {
          const data = await fetchUserProfile(userId)
          setBestScores(data.bestScores)
          setCertificates(data.certificates)
        } catch (error) {
          setError('Failed to load user profile.')
        }
      }
    }

    loadUserProfile()
  }, [userId])

  return (
    <div className='profile'>
      {error && <p className='error'>{error}</p>}
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
          Maybe you've even earned a certificate or two — finally, something to
          prove your worth. 💚
        </p>
      </div>

      <div className='feature'>
        <h2>Your certificates</h2>

        <Certificates certificates={certificates} username={username} />
      </div>
    </div>
  )
}

export default Profile
