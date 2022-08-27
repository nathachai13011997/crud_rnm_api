const Users = require('../../controllers/Users.controller.js')
const route = require('express').Router()
const validators = require('../../validators/index.js')

route.get('/', Users.onGetAll)
route.get('/:id', Users.onGetById)
route.post('/', validators.users.user, validators.check, Users.onSave)
route.put('/:id', validators.users.user, validators.check, Users.onUpdate)
route.delete('/:id', Users.onDelete)

module.exports = route
