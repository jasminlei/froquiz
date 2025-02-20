const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorMiddleware')
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

app.get('/', (req, res) => {
  res.send('✅ API is running... ribbit ribbit')
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
