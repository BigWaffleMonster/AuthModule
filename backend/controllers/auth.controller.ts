import authServices from '../services/auth.service'
const { validationResult } = require('express-validator')
import { Request, Response, NextFunction } from 'express'
import { UserInputDataType } from '../services/types'
import ApiError from '../exceptions/api.error'

class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Validation error!', errors.array())
      }

      const data: UserInputDataType = req.body

      const userData = await authServices.registerUser(data)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Validation error!', errors.array())
      }

      const data: UserInputDataType = req.body

      const userData = await authServices.login(data)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies
      const token = await authServices.logout(refreshToken)
      res.clearCookie('refreshToken')

      return res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies

      const userData = await authServices.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()
