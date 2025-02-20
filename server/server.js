const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const logger = require('./middleware/loggerMiddleware')
const validateUserRegistration = require('./middleware/validationMiddleware')

dotenv.config()

const authRoutes = require('./routes/authRoutes')
const quizRoutes = require('./routes/quizRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use(logger)

app.use(express.static('dist'))

app.use('/api/auth', authRoutes, validateUserRegistration)
app.use('/api', quizRoutes)
app.use('/api', userRoutes)

app.get('/api', (req, res) => {
  res.send('✅ API is running... ribbit ribbit')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
