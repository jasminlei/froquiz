const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
require('dotenv').config()

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    )
    res.status(201).json({ userId: result.rows[0].id })
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log('Login route reached')

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ])
    const user = result.rows[0]

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.json({ token, userId: user.id })
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, password FROM users')
    const users = result.rows

    res.status(200).json(users)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
