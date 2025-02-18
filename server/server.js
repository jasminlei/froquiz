const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const authRoutes = require('./routes/authRoutes')
const pool = require('./config/db')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Use routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('✅ API is running...')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
