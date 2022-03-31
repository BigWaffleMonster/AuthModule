import mongoose from 'mongoose'

type User = {
  email: string
}

class UserDto {
  email!: string
  user_id!: mongoose.ObjectId

  constructor(model: any) {
    this.email = model.email
    this.user_id = model._id
  }
}

export default UserDto