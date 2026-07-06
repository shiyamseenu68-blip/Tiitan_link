import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError && error.isOperational) {
    logger.error('Operational error:', {
      message: error.message,
      statusCode: error.statusCode,
      path: req.path,
      method: req.method,
    })
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
    return
  }

  logger.error('Unexpected error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  })

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
  })
}
