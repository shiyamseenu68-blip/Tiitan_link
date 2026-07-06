import Redis from 'ioredis'
import { logger } from '../utils/logger'

let redisClient: Redis | null = null

export const connectRedis = async (): Promise<void> => {
  try {
    redisClient = new Redis(process.env.REDIS_URI || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    })

    redisClient.on('connect', () => {
      logger.info('Redis client connected')
    })

    redisClient.on('error', (error) => {
      logger.error('Redis client error:', error)
    })

    redisClient.on('close', () => {
      logger.info('Redis client connection closed')
    })

    await redisClient.connect()
  } catch (error) {
    logger.error('Failed to connect to Redis:', error)
    throw error
  }
}

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis client not initialized')
  }
  return redisClient
}

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
  }
}
