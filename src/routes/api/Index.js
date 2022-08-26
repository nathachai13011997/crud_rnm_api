const route = require('express').Router()
const UsersRoute = require('./Users.route.js')

route.use('/users', UsersRoute)

module.exports = route
