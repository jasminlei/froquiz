import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const savedUsername = localStorage.getItem('username')

    if (token) {
      setIsLoggedIn(true)
      setUsername(savedUsername)
    }
  }, [])

  const login = (token, username) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('username', username)
    setIsLoggedIn(true)
    setUsername(username)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
