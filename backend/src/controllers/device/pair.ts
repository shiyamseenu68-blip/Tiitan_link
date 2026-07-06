import { Response } from 'express'
import crypto from 'crypto'
import { AuthRequest } from '../../middleware/auth'
import Device from '../../models/Device'
import User from '../../models/User'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

export const generatePairingCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { deviceName, deviceModel, manufacturer, androidVersion, apiLevel } = req.body

    // Generate unique 6-character pairing code
    let pairingCode: string
    let isUnique = false
    
    while (!isUnique) {
      pairingCode = crypto.randomBytes(3).toString('hex').toUpperCase()
      const existing = await Device.findOne({ pairingCode })
      if (!existing) isUnique = true
    }

    // Create device record
    const device = await Device.create({
      userId: req.user._id,
      name: deviceName,
      model: deviceModel,
      manufacturer,
      androidVersion,
      apiLevel,
      pairingCode,
      isPaired: false,
      isOnline: true,
    })

    // Add device to user's devices
    await User.findByIdAndUpdate(req.user._id, {
      $push: { devices: device._id },
    })

    logger.info('Pairing code generated:', { deviceId: device._id, pairingCode })

    res.json({
      success: true,
      data: {
        deviceId: device._id,
        pairingCode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    })
  } catch (error) {
    throw error
  }
}

export const pairDevice = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { pairingCode, browser, country } = req.body

    // Find device with pairing code
    const device = await Device.findOne({ pairingCode, isPaired: false })
    if (!device) {
      throw new AppError('Invalid or expired pairing code', 404)
    }

    // Check if pairing code is expired (5 minutes)
    if (device.createdAt.getTime() + 5 * 60 * 1000 < Date.now()) {
      throw new AppError('Pairing code has expired', 410)
    }

    // Verify device belongs to user
    if (device.userId.toString() !== req.user._id.toString()) {
      throw new AppError('Device does not belong to this user', 403)
    }

    // Update device as paired
    device.isPaired = true
    device.isOnline = true
    device.lastSeen = new Date()
    await device.save()

    logger.info('Device paired successfully:', { deviceId: device._id })

    res.json({
      success: true,
      message: 'Device paired successfully',
      data: {
        device: {
          id: device._id,
          name: device.name,
          model: device.model,
          manufacturer: device.manufacturer,
          androidVersion: device.androidVersion,
          isOnline: device.isOnline,
        },
      },
    })
  } catch (error) {
    throw error
  }
}
