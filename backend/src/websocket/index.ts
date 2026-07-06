import { Server as SocketIOServer } from 'socket.io'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger'
import Device from '../models/Device'
import { WebSocketEventType } from '../types'

export const setupWebSocket = (io: SocketIOServer): void => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.substring(7)
      
      if (!token) {
        return next(new Error('Authentication token required'))
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
      
      if (decoded.type === 'device') {
        socket.data.deviceId = decoded.deviceId
        socket.data.type = 'device'
      } else {
        socket.data.userId = decoded.userId
        socket.data.type = 'user'
      }
      
      next()
    } catch (error) {
      next(new Error('Invalid authentication token'))
    }
  })

  io.on('connection', (socket) => {
    logger.info('WebSocket client connected:', {
      socketId: socket.id,
      type: socket.data.type,
      id: socket.data.userId || socket.data.deviceId,
    })

    // Device connection
    if (socket.data.type === 'device') {
      handleDeviceConnection(socket, io)
    }
    
    // User connection
    if (socket.data.type === 'user') {
      handleUserConnection(socket, io)
    }

    socket.on('disconnect', () => {
      logger.info('WebSocket client disconnected:', {
        socketId: socket.id,
        type: socket.data.type,
      })
      
      // Mark device as offline
      if (socket.data.type === 'device') {
        handleDeviceDisconnection(socket, io)
      }
    })

    socket.on('error', (error) => {
      logger.error('WebSocket error:', {
        socketId: socket.id,
        error: error.message,
      })
    })
  })
}

const handleDeviceConnection = async (socket: any, io: SocketIOServer): Promise<void> => {
  try {
    const deviceId = socket.data.deviceId
    
    // Update device status
    await Device.findByIdAndUpdate(deviceId, {
      isOnline: true,
      lastSeen: new Date(),
    })
    
    // Join device room
    socket.join(`device:${deviceId}`)
    
    // Notify user that device is online
    const device = await Device.findById(deviceId)
    if (device) {
      io.to(`user:${device.userId}`).emit(WebSocketEventType.DEVICE_ONLINE, {
        deviceId,
        timestamp: new Date(),
      })
    }
    
    logger.info('Device connected to WebSocket:', { deviceId })
  } catch (error) {
    logger.error('Error handling device connection:', error)
  }
}

const handleDeviceDisconnection = async (socket: any, io: SocketIOServer): Promise<void> => {
  try {
    const deviceId = socket.data.deviceId
    
    // Update device status
    await Device.findByIdAndUpdate(deviceId, {
      isOnline: false,
      lastSeen: new Date(),
    })
    
    // Notify user that device is offline
    const device = await Device.findById(deviceId)
    if (device) {
      io.to(`user:${device.userId}`).emit(WebSocketEventType.DEVICE_OFFLINE, {
        deviceId,
        timestamp: new Date(),
      })
    }
    
    logger.info('Device disconnected from WebSocket:', { deviceId })
  } catch (error) {
    logger.error('Error handling device disconnection:', error)
  }
}

const handleUserConnection = async (socket: any, _io: SocketIOServer): Promise<void> => {
  try {
    const userId = socket.data.userId
    
    // Join user room
    socket.join(`user:${userId}`)
    
    // Get user's devices
    const devices = await Device.find({ userId, isOnline: true })
    
    // Join all device rooms
    devices.forEach(device => {
      socket.join(`device:${device._id}`)
    })
    
    logger.info('User connected to WebSocket:', { userId })
  } catch (error) {
    logger.error('Error handling user connection:', error)
  }
}
