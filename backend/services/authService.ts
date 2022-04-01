import UserModel from '../models/User'
import { UserRegisterDataType } from './types'
import bcrypt from 'bcrypt'
import tokenService from './tokenService'
import UserDto from '../dtos/userDto'
import ApiError from '../exceptions/apiError'

class AuthService {
  async registerUser(data: UserRegisterDataType) {
    const candidate = await UserModel.findOne({ email: data.email })

    if (candidate) {
      throw ApiError.BadRequest('User with such email already exists')
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)
    const user = await UserModel.create({
      email: data.email,
      password: hashedPassword
    })

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {
      ...tokens,
      userId: user._id
    }
  }
}

export default new AuthService()
