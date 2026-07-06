import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth'
import { AppError } from '../../middleware/errorHandler'
import User from '../../models/User'
import Device from '../../models/Device'
import ActivityLog from '../../models/ActivityLog'
import { logger } from '../../utils/logger'

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50, search = '' } = req.query

    const query = search ? {
      $or: [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ],
    } : {}

    const users = await User.find(query)
      .select('-password -refreshTokens -twoFactorSecret')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 })

    const total = await User.countDocuments(query)

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getUserDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)
      .select('-password -refreshTokens -twoFactorSecret')
      .populate('devices')

    if (!user) {
      throw new AppError('User not found', 404)
    }

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    throw error
  }
}

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const updates = req.body

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -refreshTokens -twoFactorSecret')

    if (!user) {
      throw new AppError('User not found', 404)
    }

    logger.info('User updated by admin:', { userId, updates })

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params

    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    // Delete user's devices
    await Device.deleteMany({ userId })

    logger.info('User deleted by admin:', { userId })

    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    throw error
  }
}

export const getAllDevices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50, status } = req.query

    const query = status ? { isOnline: status === 'online' } : {}

    const devices = await Device.find(query)
      .populate('userId', 'email name')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ lastSeen: -1 })

    const total = await Device.countDocuments(query)

    res.json({
      success: true,
      data: {
        devices,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50, userId, deviceId } = req.query

    const query: any = {}
    if (userId) query.userId = userId
    if (deviceId) query.deviceId = deviceId

    const logs = await ActivityLog.find(query)
      .populate('userId', 'email name')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ timestamp: -1 })

    const total = await ActivityLog.countDocuments(query)

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getSystemStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userCount = await User.countDocuments()
    const deviceCount = await Device.countDocuments()
    const onlineDeviceCount = await Device.countDocuments({ isOnline: true })
    const premiumUserCount = await User.countDocuments({ isPremium: true })

    const stats = {
      users: {
        total: userCount,
        premium: premiumUserCount,
      },
      devices: {
        total: deviceCount,
        online: onlineDeviceCount,
        offline: deviceCount - onlineDeviceCount,
      },
    }

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    throw error
  }
}
