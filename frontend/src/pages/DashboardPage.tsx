import { motion } from 'framer-motion'
import { Smartphone, Battery, Wifi, Signal, Bell, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-dark-400">Manage your devices from anywhere</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-dark rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <Smartphone className="w-8 h-8 text-primary-400" />
                <span className="text-sm text-dark-400">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">3</h3>
              <p className="text-dark-400 text-sm">Connected Devices</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-dark rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <Battery className="w-8 h-8 text-green-400" />
                <span className="text-sm text-dark-400">Average</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">78%</h3>
              <p className="text-dark-400 text-sm">Battery Level</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-dark rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <Wifi className="w-8 h-8 text-accent-400" />
                <span className="text-sm text-dark-400">Online</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">2</h3>
              <p className="text-dark-400 text-sm">Active Devices</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-dark rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <Bell className="w-8 h-8 text-pink-400" />
                <span className="text-sm text-dark-400">Today</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">24</h3>
              <p className="text-dark-400 text-sm">Notifications</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="glass-dark rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="btn-secondary flex flex-col items-center gap-2 py-6">
                <Signal className="w-6 h-6" />
                <span className="text-sm">Ring Device</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-6">
                <Battery className="w-6 h-6" />
                <span className="text-sm">Check Battery</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-6">
                <Wifi className="w-6 h-6" />
                <span className="text-sm">Locate</span>
              </button>
              <button className="btn-secondary flex flex-col items-center gap-2 py-6">
                <Settings className="w-6 h-6" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>

          {/* Recent Devices */}
          <div className="glass-dark rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Devices</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Pixel 7 Pro</h3>
                      <p className="text-sm text-dark-400">Last seen: 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Online</span>
                    <span className="text-sm text-dark-400">78%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
