import React from 'react'
import Certificate from './Certificate'
import './Certificates.css'

const Certificates = ({ certificates, username }) => {
  if (!certificates || certificates.length === 0) {
    return (
      <p className='certificates-container'>
        No certificates yet! Keep quizzing! 🐸
      </p>
    )
  }
  return (
    <div>
      <ul>
        {certificates.map((cert, index) => (
          <Certificate username={username} quizName={cert} />
        ))}
      </ul>
    </div>
  )
}

export default Certificates
