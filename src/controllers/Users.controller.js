const Users = require('../modules/users/Users.js')

const methods = {
  async onGetAll(req, res) {
    try {
      const result = await Users.find()
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
  async onGetById(req, res) {
    try {
      const result = await Users.findById(req.params.id)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
  async onSave(req, res) {
    try {
      const result = await Users.save(req.body)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
  async onUpdate(req, res) {
    try {
      await Users.update(req.params.id, req.body)
      res.success('success')
    } catch (error) {
      res.error(error)
    }
  },
  async onDelete(req, res) {
    try {
      await Users.delete(req.params.id)
      res.success('success')
    } catch (error) {
      res.error(error)
    }
  },
}

module.exports = { ...methods }
