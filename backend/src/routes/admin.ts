import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import { getAllUsers, getUserDetails, updateUser, deleteUser, getAllDevices, getActivityLogs, getSystemStats } from '../controllers/admin'

const router = Router()

// All admin routes require authentication and admin role
router.use(authenticate)
router.use(requireAdmin)

// Get all users
router.get('/users', getAllUsers)

// Get user details
router.get('/users/:userId', getUserDetails)

// Update user
router.put('/users/:userId', updateUser)

// Delete user
router.delete('/users/:userId', deleteUser)

// Get all devices
router.get('/devices', getAllDevices)

// Get activity logs
router.get('/logs', getActivityLogs)

// Get system stats
router.get('/stats', getSystemStats)

export default router
