import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth'
import { AppError } from '../../middleware/errorHandler'
import Notification from '../../models/Notification'
import { logger } from '../../utils/logger'

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id
    const { limit = 50, offset = 0 } = req.query

    const notifications = await Notification.find({ userId })
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(Number(offset))

    const unreadCount = await Notification.countDocuments({ userId, isRead: false })

    res.json({
      success: true,
      data: {
        notifications,
        unreadCount,
        total: notifications.length,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getDeviceNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { deviceId } = req.params
    const { limit = 50, offset = 0 } = req.query

    const notifications = await Notification.find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip(Number(offset))

    res.json({
      success: true,
      data: {
        notifications,
        total: notifications.length,
      },
    })
  } catch (error) {
    throw error
  }
}

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    )

    if (!notification) {
      throw new AppError('Notification not found', 404)
    }

    res.json({
      success: true,
      data: notification,
    })
  } catch (error) {
    throw error
  }
}

export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id

    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    )

    res.json({
      success: true,
      message: 'All notifications marked as read',
    })
  } catch (error) {
    throw error
  }
}

export const deleteNotification = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params

    const notification = await Notification.findByIdAndDelete(notificationId)

    if (!notification) {
      throw new AppError('Notification not found', 404)
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully',
    })
  } catch (error) {
    throw error
  }
}
