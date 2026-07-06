import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../../middleware/auth'
import User from '../../models/User'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    // Check if account is locked
    if ((user as any).isLocked) {
      throw new AppError('Account is temporarily locked due to multiple failed attempts', 423)
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      await user.incrementLoginAttempts()
      throw new AppError('Invalid email or password', 401)
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts()

    // Update last login
    user.lastLogin = new Date()
    await user.save()

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

    // Save refresh token
    user.refreshTokens.push(refreshToken)
    await user.save()

    logger.info('User logged in successfully:', { userId: user._id, email })

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isVerified: user.isVerified,
          isPremium: user.isPremium,
          twoFactorEnabled: user.twoFactorEnabled,
        },
        accessToken,
        refreshToken,
      },
    })
  } catch (error) {
    throw error
  }
}
