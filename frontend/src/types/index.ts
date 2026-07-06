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
