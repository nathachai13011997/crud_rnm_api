const cors = require('cors')
const express = require('express')

require('./configs/databases.js')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(require('./services/responseFormat.service.js'))

app.use(require('./routes/Index.js'))

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app
