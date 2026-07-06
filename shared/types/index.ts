// Shared types between frontend, backend, and Android app

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isVerified: boolean
  isPremium: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  twoFactorEnabled: boolean
  devices: string[]
}

export interface Device {
  id: string
  userId: string
  name: string
  model: string
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
  createdAt: Date
  updatedAt: Date
}

export interface BatteryInfo {
  level: number
  isCharging: boolean
  chargingType?: 'ac' | 'usb' | 'wireless'
  temperature?: number
  health?: 'good' | 'overheat' | 'cold' | 'dead'
}

export interface StorageInfo {
  total: number
  used: number
  available: number
  internal: StoragePartition
  sdCard?: StoragePartition
}

export interface StoragePartition {
  total: number
  used: number
  available: number
  path: string
}

export interface NetworkInfo {
  isConnected: boolean
  type: 'wifi' | 'mobile' | 'ethernet' | 'bluetooth' | 'none'
  wifiSSID?: string
  wifiBSSID?: string
  signalStrength?: number
  ipAddress?: string
  macAddress?: string
  bluetoothEnabled?: boolean
}

export interface LocationInfo {
  latitude: number
  longitude: number
  accuracy: number
  altitude?: number
  speed?: number
  bearing?: number
  timestamp: Date
  address?: string
}

export interface DevicePermissions {
  camera: boolean
  microphone: boolean
  location: boolean
  notifications: boolean
  sms: boolean
  contacts: boolean
  calls: boolean
  files: boolean
  screenCapture: boolean
  accessibility: boolean
}

export interface Notification {
  id: string
  deviceId: string
  packageName: string
  appName: string
  title: string
  text: string
  icon?: string
  timestamp: Date
  isRead: boolean
  category?: string
}

export interface Contact {
  id: string
  deviceId: string
  name: string
  phoneNumbers: PhoneNumber[]
  emails?: EmailAddress[]
  avatar?: string
  starred?: boolean
}

export interface PhoneNumber {
  number: string
  type: 'mobile' | 'home' | 'work' | 'other'
  isPrimary?: boolean
}

export interface EmailAddress {
  email: string
  type: 'home' | 'work' | 'other'
  isPrimary?: boolean
}

export interface CallLog {
  id: string
  deviceId: string
  phoneNumber: string
  contactName?: string
  type: 'incoming' | 'outgoing' | 'missed'
  duration: number
  timestamp: Date
}

export interface SMSMessage {
  id: string
  deviceId: string
  threadId: string
  phoneNumber: string
  contactName?: string
  content: string
  type: 'inbox' | 'sent' | 'draft'
  timestamp: Date
  isRead: boolean
}

export interface FileItem {
  id: string
  deviceId: string
  name: string
  path: string
  size: number
  type: string
  mimeType: string
  isDirectory: boolean
  modifiedAt: Date
  createdAt: Date
}

export interface ActivityLog {
  id: string
  userId: string
  deviceId?: string
  action: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: Date
}

export interface PairingRequest {
  code: string
  deviceId: string
  deviceName: string
  deviceModel: string
  browser: string
  country: string
  timestamp: Date
  expiresAt: Date
}

export interface AICommand {
  id: string
  userId: string
  deviceId: string
  command: string
  intent: string
  parameters: Record<string, any>
  status: 'pending' | 'executing' | 'completed' | 'failed'
  result?: any
  error?: string
  timestamp: Date
}

export interface WebSocketMessage {
  type: string
  payload: any
  deviceId?: string
  userId?: string
  timestamp: Date
}

export enum WebSocketEventType {
  // Device events
  DEVICE_ONLINE = 'device:online',
  DEVICE_OFFLINE = 'device:offline',
  DEVICE_STATUS_UPDATE = 'device:status_update',
  
  // Action events
  RING_DEVICE = 'action:ring',
  FLASHLIGHT_TOGGLE = 'action:flashlight',
  CLIPBOARD_SYNC = 'action:clipboard',
  
  // Data events
  NOTIFICATION_MIRROR = 'data:notification',
  LOCATION_UPDATE = 'data:location',
  BATTERY_UPDATE = 'data:battery',
  
  // File events
  FILE_UPLOAD_START = 'file:upload_start',
  FILE_UPLOAD_PROGRESS = 'file:upload_progress',
  FILE_UPLOAD_COMPLETE = 'file:upload_complete',
  FILE_DOWNLOAD_START = 'file:download_start',
  FILE_DOWNLOAD_PROGRESS = 'file:download_progress',
  FILE_DOWNLOAD_COMPLETE = 'file:download_complete',
  
  // Screen events
  SCREEN_SHARE_START = 'screen:share_start',
  SCREEN_SHARE_FRAME = 'screen:share_frame',
  SCREEN_SHARE_STOP = 'screen:share_stop',
  
  // Camera events
  CAMERA_CAPTURE = 'camera:capture',
  
  // Pairing events
  PAIRING_REQUEST = 'pairing:request',
  PAIRING_ACCEPT = 'pairing:accept',
  PAIRING_REJECT = 'pairing:reject',
  
  // Error events
  ERROR = 'error',
}
