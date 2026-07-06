import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IActivityLog extends Document {
  userId: mongoose.Types.ObjectId
  deviceId?: mongoose.Types.ObjectId
  action: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: Date
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
ActivityLogSchema.index({ userId: 1, timestamp: -1 })
ActivityLogSchema.index({ deviceId: 1, timestamp: -1 })
ActivityLogSchema.index({ action: 1, timestamp: -1 })

// TTL index to automatically delete logs older than 90 days
ActivityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 })

const ActivityLog: Model<IActivityLog> = mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema)

export default ActivityLog
