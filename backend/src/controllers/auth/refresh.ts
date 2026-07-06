import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../../middleware/auth'
import User from '../../models/User'
import { AppError } from '../../middleware/errorHandler'

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400)
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'refresh-secret'
    ) as any

    if (decoded.type !== 'refresh') {
      throw new AppError('Invalid refresh token', 401)
    }

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw new AppError('User not found', 401)
    }

    // Check if refresh token exists in user's tokens
    if (!user.refreshTokens.includes(refreshToken)) {
      throw new AppError('Invalid refresh token', 401)
    }

    // Generate new access token
    // @ts-ignore
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      data: {
        accessToken,
      },
    })
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Refresh token expired', 401)
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid refresh token', 401)
    }
    throw error
  }
}
