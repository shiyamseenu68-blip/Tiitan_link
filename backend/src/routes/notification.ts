import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { getNotifications, getDeviceNotifications, markAsRead, markAllAsRead, deleteNotification } from '../controllers/notification'

const router = Router()

// All notification routes require authentication
router.use(authenticate)

// Get notifications for user
router.get('/', getNotifications)

// Get notifications for specific device
router.get('/device/:deviceId', getDeviceNotifications)

// Mark notification as read
router.patch('/:notificationId/read', markAsRead)

// Mark all notifications as read
router.patch('/read-all', markAllAsRead)

// Delete notification
router.delete('/:notificationId', deleteNotification)

export default router
