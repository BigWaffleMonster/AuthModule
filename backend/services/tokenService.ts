import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token'
import {PayloadType} from './types'
import mongoose from 'mongoose'

class TokenService {
  generateTokens(payload: PayloadType) {
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_SECRET), {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_SECRET), {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: mongoose.ObjectId, refreshToken: string) {
    const tokenData = await TokenModel.findOne({user_id: userId})

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await TokenModel.create({user_id: userId, refreshToken})
    return token
  }
}

export default new TokenService()