import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController'

const router = Router()

router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length - 6 characters').isLength({
      min: 6
    })
  ],
  authController.registerUser
)

router.post('/login', [
  check('email', 'Incorrect email').normalizeEmail().isEmail(),
  check('password', 'Incorrect password').exists()
],
  authController.login
)

router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)

export default router
