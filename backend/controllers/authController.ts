import authServices from '../services/authService'
const { validationResult } = require('express-validator')
import { Request, Response, NextFunction } from 'express'
import { UserRegisterDataType } from '../services/types'
import ApiError from '../exceptions/apiError'

class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Validation error!', errors.array())
      }

      const data: UserRegisterDataType = req.body

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
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()
