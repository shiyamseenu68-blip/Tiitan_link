import { Router } from 'express'
import { generatePairingCode, pairDevice } from '../controllers/device'
import { authenticate, authenticateDevice } from '../middleware/auth'
import { pairingRateLimiter } from '../middleware/rateLimiter'
import { deviceValidation, deviceIdValidation, validate } from '../middleware/validation'

const router = Router()

// Generate pairing code (from Android app)
router.post('/pair/generate', authenticateDevice, pairingRateLimiter, generatePairingCode)

// Pair device (from web)
router.post('/pair', authenticate, pairingRateLimiter, deviceValidation, validate, pairDevice)

// Get user's devices
router.get('/', authenticate, async (req: any, res) => {
  try {
    const devices = await Device.find({ userId: req.user._id }).sort({ lastSeen: -1 })
    res.json({ success: true, data: devices })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch devices' })
  }
})

// Get device details
router.get('/:deviceId', authenticate, deviceIdValidation, validate, async (req: any, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.deviceId,
      userId: req.user._id,
    })
    
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' })
    }
    
    res.json({ success: true, data: device })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch device' })
  }
})

// Delete device
router.delete('/:deviceId', authenticate, deviceIdValidation, validate, async (req: any, res) => {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.deviceId,
      userId: req.user._id,
    })
    
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' })
    }
    
    // Remove from user's devices
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { devices: req.params.deviceId },
    })
    
    res.json({ success: true, message: 'Device deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete device' })
  }
})

import Device from '../models/Device'
import User from '../models/User'

export default router
