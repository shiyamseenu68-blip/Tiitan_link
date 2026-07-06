import nodemailer from 'nodemailer'
import { logger } from '../utils/logger'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@titanlink.com',
      to: email,
      subject: 'Verify your TitanLink account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Welcome to TitanLink!</h2>
          <p>Thank you for registering with TitanLink. Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">Verify Email</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #64748b;">${verificationUrl}</p>
          <p style="color: #64748b; font-size: 14px;">This link will expire in 24 hours.</p>
          <p style="color: #64748b; font-size: 14px;">If you didn't create an account with TitanLink, you can safely ignore this email.</p>
        </div>
      `,
    })
    
    logger.info('Verification email sent:', { email })
  } catch (error) {
    logger.error('Failed to send verification email:', error)
    throw error
  }
}

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@titanlink.com',
      to: email,
      subject: 'Reset your TitanLink password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Reset Your Password</h2>
          <p>You requested a password reset for your TitanLink account. Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">Reset Password</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #64748b;">${resetUrl}</p>
          <p style="color: #64748b; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #64748b; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    })
    
    logger.info('Password reset email sent:', { email })
  } catch (error) {
    logger.error('Failed to send password reset email:', error)
    throw error
  }
}
