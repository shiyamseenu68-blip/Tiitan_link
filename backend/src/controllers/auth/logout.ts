import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth'
import User from '../../models/User'
import { logger } from '../../utils/logger'

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body
    const userId = req.user._id

    // Remove refresh token from user's tokens
    const user = await User.findById(userId)
    if (user && refreshToken) {
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
      await user.save()
    }

    logger.info('User logged out:', { userId })

    res.json({
      success: true,
      message: 'Logout successful',
    })
  } catch (error) {
    throw error
  }
}
