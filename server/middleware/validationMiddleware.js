const { body, validationResult } = require('express-validator')

const validateUserRegistration = [
  body('username').notEmpty().withMessage('Username is required.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }
    next()
  },
]

module.exports = validateUserRegistration
