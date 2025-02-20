const { body, validationResult } = require('express-validator')

const validateUserRegistration = [
  body('username').notEmpty().withMessage('Username is required.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed')
      error.status = 400
      error.details = errors.array()
      return next(error)
    }
    next()
  },
]

module.exports = validateUserRegistration
