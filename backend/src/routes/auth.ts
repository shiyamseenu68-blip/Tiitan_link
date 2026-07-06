import { Router } from 'express'
import { register, login, refreshToken, logout } from '../controllers/auth'
import { authenticate } from '../middleware/auth'
import { authRateLimiter } from '../middleware/rateLimiter'
import { registerValidation, loginValidation, validate } from '../middleware/validation'

const router = Router()

// Register
router.post('/register', authRateLimiter, registerValidation, validate, register)

// Login
router.post('/login', authRateLimiter, loginValidation, validate, login)

// Refresh token
router.post('/refresh', refreshToken)

// Logout
router.post('/logout', authenticate, logout)

export default router
