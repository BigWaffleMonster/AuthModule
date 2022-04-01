require('dotenv').config()
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './router/authRoutes'
import errorMiddleware from './middlewares/error.middleware'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', authRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(String(process.env.DB_URI))
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}

start()
