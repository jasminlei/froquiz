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
      <p class='certificate-text'>
        Download your certificates as PDFs and flex them on LinkedIn!
        <br />
        Or print them out, frame them, and hang them on your wall—because your
        achievements deserve to be seen!
        <br />
      </p>
      <ul>
        {certificates.map((cert, index) => (
          <Certificate username={username} quizName={cert} />
        ))}
      </ul>
    </div>
  )
}

export default Certificates
