import React from 'react'
import { Device } from '../../types'

interface DeviceCardProps {
  device: Device
  onSelect: (deviceId: string) => void
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(device.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
          <p className="text-sm text-gray-600">{device.manufacturer} {device.model}</p>
        </div>
        <div className={`flex items-center gap-2 ${device.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
          <span className={`w-2 h-2 rounded-full ${device.isOnline ? 'bg-green-600' : 'bg-gray-400'}`}></span>
          <span className="text-sm font-medium">{device.isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {device.battery && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Battery</span>
            <span>{device.battery.level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                device.battery.level > 50 ? 'bg-green-500' : device.battery.level > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${device.battery.level}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Android {device.androidVersion}</span>
        <span>Last seen: {new Date(device.lastSeen).toLocaleString()}</span>
      </div>
    </div>
  )
}
