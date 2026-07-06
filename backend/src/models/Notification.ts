import mongoose, { Schema, Document, Model } from 'mongoose'

export interface INotification extends Document {
  deviceId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  packageName: string
  appName: string
  title: string
  text: string
  icon?: string
  timestamp: Date
  isRead: boolean
  category?: string
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
NotificationSchema.index({ deviceId: 1, timestamp: -1 })
NotificationSchema.index({ userId: 1, isRead: 1 })

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)

export default Notification
