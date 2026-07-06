import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, Battery, Wifi, Signal, MapPin, Clock } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function DeviceDetailPage() {
  const { deviceId } = useParams()
  console.log('Device ID:', deviceId) // Use deviceId to avoid unused variable warning

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Device Header */}
          <div className="glass-dark rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Pixel 7 Pro</h1>
                  <p className="text-dark-400">Google • Android 14</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">Online</span>
              </div>
            </div>
          </div>

          {/* Device Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Battery className="w-5 h-5 text-green-400" />
                <span className="text-dark-400">Battery</span>
              </div>
              <p className="text-2xl font-bold text-white">78%</p>
              <p className="text-sm text-dark-400">Charging</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Signal className="w-5 h-5 text-primary-400" />
                <span className="text-dark-400">Signal</span>
              </div>
              <p className="text-2xl font-bold text-white">Strong</p>
              <p className="text-sm text-dark-400">4G LTE</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wifi className="w-5 h-5 text-accent-400" />
                <span className="text-dark-400">Network</span>
              </div>
              <p className="text-2xl font-bold text-white">WiFi</p>
              <p className="text-sm text-dark-400">Home Network</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-pink-400" />
                <span className="text-dark-400">Last Seen</span>
              </div>
              <p className="text-2xl font-bold text-white">2m</p>
              <p className="text-sm text-dark-400">ago</p>
            </div>
          </div>

          {/* Location */}
          <div className="glass-dark rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary-400" />
              <h2 className="text-xl font-semibold text-white">Location</h2>
            </div>
            <div className="bg-dark-900 rounded-lg h-64 flex items-center justify-center">
              <p className="text-dark-400">Map view would be displayed here</p>
            </div>
            <p className="text-sm text-dark-400 mt-2">San Francisco, CA • Updated 2 minutes ago</p>
          </div>

          {/* Quick Actions */}
          <div className="glass-dark rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                <Signal className="w-5 h-5" />
                <span className="text-sm">Ring Device</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Locate</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                <Battery className="w-5 h-5" />
                <span className="text-sm">Flashlight</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                <Wifi className="w-5 h-5" />
                <span className="text-sm">Files</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
