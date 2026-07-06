import React from 'react'
import { Device } from '../../types'

interface DeviceStatusProps {
  device: Device
}

export const DeviceStatus: React.FC<DeviceStatusProps> = ({ device }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-600 mb-1">Status</p>
        <p className={`text-lg font-semibold ${device.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
          {device.isOnline ? 'Online' : 'Offline'}
        </p>
      </div>

      {device.battery && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">Battery</p>
          <p className="text-lg font-semibold">{device.battery.level}%</p>
        </div>
      )}

      {device.network && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">Network</p>
          <p className="text-lg font-semibold capitalize">{device.network.type}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-600 mb-1">Last Seen</p>
        <p className="text-lg font-semibold">{new Date(device.lastSeen).toLocaleDateString()}</p>
      </div>
    </div>
  )
}
