import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import mongoose from 'mongoose'
import { connectRedis } from './config/redis'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import { rateLimiter } from './middleware/rateLimiter'
import { setupWebSocket } from './websocket/index'
import authRoutes from './routes/auth'
import deviceRoutes from './routes/device'
import fileRoutes from './routes/file'
import notificationRoutes from './routes/notification'
import aiRoutes from './routes/ai'
import adminRoutes from './routes/admin'

// Load environment variables
dotenv.config()

const app: Application = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  path: process.env.WS_PATH || '/socket.io',
})

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(compression())
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(rateLimiter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/admin', adminRoutes)

// Error handling
app.use(errorHandler)

// Database connections
const connectDatabases = async () => {
  try {
    // MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titanlink')
    logger.info('MongoDB connected successfully')

    // Redis
    await connectRedis()
    logger.info('Redis connected successfully')
  } catch (error) {
    logger.warn('Database connection failed, running in mock mode:', error)
    logger.warn('Some features will not work without MongoDB and Redis')
  }
}

// Setup WebSocket
setupWebSocket(io)

// Start server
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDatabases()
  
  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`WebSocket server running on port ${PORT}`)
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer()

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...')
  httpServer.close(() => {
    logger.info('Server closed')
    mongoose.connection.close()
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...')
  httpServer.close(() => {
    logger.info('Server closed')
    mongoose.connection.close()
    process.exit(0)
  })
})

export { app, io }
