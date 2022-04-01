import UserModel from '../models/User'
import { UserInputDataType } from './types'
import bcrypt from 'bcrypt'
import tokenService from './token.service'
import UserDto from '../dtos/user.dto'
import ApiError from '../exceptions/api.error'

class AuthService {
  async registerUser(data: UserInputDataType) {
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
  
  async login(data: UserInputDataType) {
    const user = await UserModel.findOne({email: data.email})

    if (!user) {
      throw ApiError.BadRequest('User with this email does not exist')
    }

    const isPassEquals = await bcrypt.compare(data.password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password')
    }

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {
      ...tokens,
      userId: user._id
    }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)

    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDd = tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDd) {
      throw ApiError.UnauthorizedError()
    }

    // @ts-ignore
    const user = await UserModel.findById(userData.user_id)

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {
      ...tokens,
      userId: user._id
    }
  }
}

export default new AuthService()
