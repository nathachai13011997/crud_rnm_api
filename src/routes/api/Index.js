const route = require('express').Router()

route.use('/users', require('./Users.route.js'))

module.exports = route
