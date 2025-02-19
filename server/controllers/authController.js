const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const insertUser = async (username, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
    [username, hashedPassword]
  )
  return result.rows[0].id
}

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  return result.rows[0]
}

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const registerUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await hashPassword(password)
    const userId = await insertUser(username, hashedPassword)
    res.status(201).json({ userId })
  } catch (error) {
    console.error('Error during registration:', error)
    next(new Error('Registration failed. Please try again.'))
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await findUserByUsername(username)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await comparePasswords(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)
    res.json({ token, userId: user.id })
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username FROM users')
    const users = result.rows
    res.status(200).json(users)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { registerUser, loginUser, getUsers }
