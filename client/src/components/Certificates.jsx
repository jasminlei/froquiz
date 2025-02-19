import React from 'react'

const Certificates = ({ certificates }) => {
  return (
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
  )
}

export default Certificates
