import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  avatar?: string
  isVerified: boolean
  isPremium: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  refreshTokens: string[]
  devices: mongoose.Types.ObjectId[]
  lastLogin?: Date
  loginAttempts: number
  lockUntil?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  incrementLoginAttempts(): Promise<void>
  resetLoginAttempts(): Promise<void>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    avatar: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      select: false,
    },
    refreshTokens: [{
      type: String,
    }],
    devices: [{
      type: Schema.Types.ObjectId,
      ref: 'Device',
    }],
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '12'))
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Increment login attempts
UserSchema.methods.incrementLoginAttempts = async function (): Promise<void> {
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5')
  const lockoutDuration = parseInt(process.env.LOCKOUT_DURATION_MINUTES || '15') * 60 * 1000
  
  if (this.lockUntil && this.lockUntil > new Date()) {
    return
  }
  
  this.loginAttempts += 1
  
  if (this.loginAttempts >= maxAttempts) {
    this.lockUntil = new Date(Date.now() + lockoutDuration)
  }
  
  await this.save()
}

// Reset login attempts
UserSchema.methods.resetLoginAttempts = async function (): Promise<void> {
  this.loginAttempts = 0
  this.lockUntil = undefined
  await this.save()
}

// Check if account is locked
UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > new Date())
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
