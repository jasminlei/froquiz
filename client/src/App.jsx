import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <div className='hero-section'></div>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
