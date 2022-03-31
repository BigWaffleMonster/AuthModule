import authServices from '../services/authService'
const { validationResult } = require('express-validator')
import { Request, Response, NextFunction } from 'express'
import { UserRegistrDataType } from '../services/types'

class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next('error!') //ApiError.BadRequest('Validation error!', errors.array()))
      }

      const data: UserRegistrDataType = req.body

      const uniqueCheck = await authServices.checkUserUnique(data.email)

      if (uniqueCheck) {
        return next('User with such email already exists')
      }

      const userData = await authServices.registerUser(data)

      return res.status(201).json(userData)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new AuthController()
