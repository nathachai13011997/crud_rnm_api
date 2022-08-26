const route = require('express').Router()

route.use('/api', require('./api/Index.js'))

module.exports = route
