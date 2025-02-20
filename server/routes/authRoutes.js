const express = require('express')
const validateUserRegistration = require('../middleware/validationMiddleware')
const {
  registerUser,
  loginUser,
  getUsers,
} = require('../controllers/authController')
const router = express.Router()

router.post('/register', validateUserRegistration, (req, res) => {
  registerUser(req, res)
})

router.post('/login', loginUser)
router.get('/users', getUsers)

module.exports = router
