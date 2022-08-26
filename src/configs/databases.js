const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const databases = {
  mongoDB() {
    mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const db = mongoose.connection
    db.on('error', (error) => console.log('Error DB', error))
    db.on('open', () => console.log('Database Connected...'))
    return db
  },
}

// module.exports = databases.mongoDB()
module.exports = databases.mongoDB()
