import UserModel from '../models/User'
import { UserRegistrDataType } from './types'
import bcrypt from 'bcrypt'

class AuthService {
  async registerUser(data: UserRegistrDataType) {
    const hashedPassword = await bcrypt.hash(data.password, 12)
    const user = await UserModel.create({
      email: data.email,
      password: hashedPassword
    })
    return {
      userId: user._id
    }
  }

  async checkUserUnique(email: string) {
    const candidate = await UserModel.findOne({ email })

    return !!candidate
  }
}

export default new AuthService()
