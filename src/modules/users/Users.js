const Users = require('../../models/Users.model.js')
const { ErrorNotFound } = require('../../services/errorMethods.service.js')

const methods = {
  find() {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Users.find(
          {},
          { _id: 0, id: 1, name: 1, email: 1, general: { weight: 1, height: 1, gender: 1 } },
        )
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Users.find(
          { id: id },
          { _id: 0, id: 1, name: 1, email: 1, general: { weight: 1, height: 1, gender: 1 } },
        )
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  save(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await Users.find().count()
        const findName = await Users.findOne({ name: data.name })
        if (findName) return reject(ErrorNotFound('name duplicate'))

        data.id = count + 1
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
        const findName = await Users.aggregate([{ $match: { $and: [{ name: data.name, id: { $ne: id } }] } }])
        if (findName.length > 0) return reject(ErrorNotFound('name duplicate'))

        const obj = await Users.updateOne({ id: id }, { $set: data })
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const findId = await Users.findOne({ id: id })
        if (!findId) return reject(ErrorNotFound('id not found'))

        const obj = await Users.deleteOne({ id: id })
        resolve(obj)
      } catch (err) {
        reject(err)
      }
    })
  },
}

module.exports = { ...methods }
