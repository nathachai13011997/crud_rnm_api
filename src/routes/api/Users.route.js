const Users = require('../../controllers/Users.controller.js')
const route = require('express').Router()

route.get('/', Users.onGetAll)
route.get('/:id', Users.onGetById)
route.post('/', Users.onSave)
route.put('/:id', Users.onUpdate)
route.delete('/:id', Users.onDelete)

module.exports = route
