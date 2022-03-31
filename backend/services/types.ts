import mongoose from 'mongoose'

export type UserRegisterDataType = {
  email: string
  password: string
}

export type PayloadType = {
  email: string,
  user_id: mongoose.ObjectId
}