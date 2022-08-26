const mongoose = require('mongoose')

const Users = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  general: {
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
})

module.exports = mongoose.model('users', Users)
