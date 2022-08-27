const Users = require('../../models/Users.model.js')
const { ObjectId } = require('mongodb')
const { ErrorNotFound } = require('../../services/errorMethods.service.js')

const methods = {
  find() {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Users.find()
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const _id = ObjectId(id)

        const findId = await Users.findOne({ _id: _id })
        if (!findId) return reject(ErrorNotFound('id not found'))

        const obj = await Users.findOne({ _id: _id })
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  save(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const findName = await Users.findOne({ name: data.name })
        if (findName) return reject(ErrorNotFound('name duplicate'))

        const users = new Users(data)
        const obj = await users.save(data)
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const _id = ObjectId(id)

        const findId = await Users.findOne({ _id: _id })
        if (!findId) return reject(ErrorNotFound('id not found'))

        const findName = await Users.aggregate([{ $match: { $and: [{ name: data.name, _id: { $ne: _id } }] } }])
        if (findName.length > 0) return reject(ErrorNotFound('name duplicate'))

        const obj = await Users.updateOne({ _id: _id }, { $set: data })
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const findId = await Users.findOne({ _id: id })
        if (!findId) return reject(ErrorNotFound('id not found'))

        const obj = await Users.deleteOne({ _id: id })
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
}

module.exports = { ...methods }
