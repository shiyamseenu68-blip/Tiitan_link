import mongoose, { Schema, Document, Model } from 'mongoose'
import { DevicePermissions, BatteryInfo, StorageInfo, NetworkInfo, LocationInfo } from '../types'

export interface IDevice extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  deviceModel: string
  manufacturer: string
  androidVersion: string
  apiLevel: number
  pairingCode: string
  isPaired: boolean
  isOnline: boolean
  lastSeen: Date
  battery?: BatteryInfo
  storage?: StorageInfo
  network?: NetworkInfo
  location?: LocationInfo
  permissions: DevicePermissions
  fcmToken?: string
  createdAt: Date
  updatedAt: Date
}

const DeviceSchema = new Schema<IDevice>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    deviceModel: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    androidVersion: {
      type: String,
      required: true,
    },
    apiLevel: {
      type: Number,
      required: true,
    },
    pairingCode: {
      type: String,
      required: true,
      unique: true,
    },
    isPaired: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    battery: {
      level: Number,
      isCharging: Boolean,
      chargingType: {
        type: String,
        enum: ['ac', 'usb', 'wireless'],
      },
      temperature: Number,
      health: {
        type: String,
        enum: ['good', 'overheat', 'cold', 'dead'],
      },
    },
    storage: {
      total: Number,
      used: Number,
      available: Number,
      internal: {
        total: Number,
        used: Number,
        available: Number,
        path: String,
      },
      sdCard: {
        total: Number,
        used: Number,
        available: Number,
        path: String,
      },
    },
    network: {
      isConnected: Boolean,
      type: {
        type: String,
        enum: ['wifi', 'mobile', 'ethernet', 'bluetooth', 'none'],
      },
      wifiSSID: String,
      wifiBSSID: String,
      signalStrength: Number,
      ipAddress: String,
      macAddress: String,
      bluetoothEnabled: Boolean,
    },
    location: {
      latitude: Number,
      longitude: Number,
      accuracy: Number,
      altitude: Number,
      speed: Number,
      bearing: Number,
      timestamp: Date,
      address: String,
    },
    permissions: {
      camera: { type: Boolean, default: false },
      microphone: { type: Boolean, default: false },
      location: { type: Boolean, default: false },
      notifications: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
      contacts: { type: Boolean, default: false },
      calls: { type: Boolean, default: false },
      files: { type: Boolean, default: false },
      screenCapture: { type: Boolean, default: false },
      accessibility: { type: Boolean, default: false },
    },
    fcmToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
DeviceSchema.index({ userId: 1, isOnline: 1 })
DeviceSchema.index({ lastSeen: 1 })

const Device: Model<IDevice> = mongoose.models.Device || mongoose.model<IDevice>('Device', DeviceSchema)

export default Device
