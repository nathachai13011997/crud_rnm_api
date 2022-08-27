const { check } = require('express-validator')

module.exports = {
  user: [
    check('name').notEmpty().withMessage('is Empty'),
    check('email').notEmpty().withMessage('is Empty').isEmail().withMessage('must be email'),
  ],
}
