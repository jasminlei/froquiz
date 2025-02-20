import React, { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import './Certificate.css'

function Certificate({ username, quizName }) {
  const certificateRef = useRef(null)

  const generatePDF = () => {
    const input = certificateRef.current
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape')
      const imgWidth = 297 // A4-koon leveys mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`${username}_${quizName}_Certificate.pdf`)
    })
  }

  return (
    <div className='certificate-container'>
      <div className='certificate-content' ref={certificateRef}>
        <h1 className='certificate-title'>🏆🏆🏆🏆</h1>
        <p className='certificate-text'>This certifies that</p>
        <h2 className='certificate-username'>{username}</h2>
        <p className='certificate-text'>
          has done quite well in <strong>{quizName}</strong> and therefore
          definetely knows something about JavaScript!
        </p>
        <p className='certificate-date'>
          Issued on: {new Date().toLocaleDateString()}
        </p>
        <div className='frog-emoji'>🐸🐸🐸</div>
      </div>
      <button className='download-btn' onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  )
}

export default Certificate
