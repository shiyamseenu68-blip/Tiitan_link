import { Response } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { AuthRequest } from '../../middleware/auth'
import User from '../../models/User'
import { AppError } from '../../middleware/errorHandler'
import { sendVerificationEmail } from '../../services/email'
import { logger } from '../../utils/logger'

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new AppError('User already exists with this email', 409)
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
    })

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    user.refreshTokens.push(verificationToken)
    await user.save()

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    // Generate tokens
    // @ts-ignore
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    // @ts-ignore
    const refreshToken = jwt.sign(
      { userId: user._id, type: 'refresh' },
      process.env.REFRESH_TOKEN_SECRET || 'refresh-secret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d' }
    )

    logger.info('User registered successfully:', { userId: user._id, email })

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          isVerified: user.isVerified,
          isPremium: user.isPremium,
        },
        accessToken,
        refreshToken,
      },
    })
  } catch (error) {
    throw error
  }
}
