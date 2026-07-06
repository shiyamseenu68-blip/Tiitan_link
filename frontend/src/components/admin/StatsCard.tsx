import React from 'react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </p>
          )}
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  )
}
