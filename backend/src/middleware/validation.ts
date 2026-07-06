import { Request, Response, NextFunction } from 'express'
import { validationResult, body, param } from 'express-validator'
import { AppError } from './errorHandler'

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    throw new AppError(
      errors.array().map(err => err.msg).join(', '),
      400
    )
  }
  
  next()
}

export const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
]

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
]

export const deviceValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Device name must be between 2 and 50 characters'),
  body('pairingCode')
    .isLength({ min: 6, max: 6 })
    .isAlphanumeric()
    .withMessage('Valid pairing code is required'),
]

export const deviceIdValidation = [
  param('deviceId')
    .isMongoId()
    .withMessage('Valid device ID is required'),
]
