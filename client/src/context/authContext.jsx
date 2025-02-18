import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const savedUsername = localStorage.getItem('username')
    const savedUserId = localStorage.getItem('userId')

    if (token) {
      setIsLoggedIn(true)
      setUsername(savedUsername)
      setUserId(savedUserId)
    }
  }, [])

  const login = (token, username, userId) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
    setIsLoggedIn(true)
    setUsername(username)
    setUserId(userId)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUsername('')
    setUserId(null)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
