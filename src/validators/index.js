const { validationResult } = require('express-validator'),
  { ErrorUnprocessableEntity } = require('../services/errorMethods.service')

const users = require('./users.js')

const validators = {
  users,
}

module.exports = {
  check(req, res, next) {
    let errors = validationResult(req).array()
    if (errors.length == 0) return next()
    let messageError = `${errors[0].param}: ${errors[0].msg}`
    res.error(ErrorUnprocessableEntity(messageError))
  },
  ...validators,
}
