import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'
import User from '../models/User'

export interface AuthRequest extends Request {
  user?: any
  deviceId?: string
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401)
    }

    const token = authHeader.substring(7)
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      throw new AppError('User not found', 401)
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401))
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401))
    } else {
      next(error)
    }
  }
}

export const authenticateDevice = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No device token provided', 401)
    }

    const token = authHeader.substring(7)
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    if (decoded.type !== 'device') {
      throw new AppError('Invalid device token', 401)
    }

    req.deviceId = decoded.deviceId
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid device token', 401))
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Device token expired', 401))
    } else {
      next(error)
    }
  }
}

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Admin access required', 403)
  }
  next()
}

export const requirePremium = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.isPremium) {
    throw new AppError('Premium subscription required', 403)
  }
  next()
}
