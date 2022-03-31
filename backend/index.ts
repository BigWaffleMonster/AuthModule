require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const router = require('./router/index')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true
    })
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}

start()
