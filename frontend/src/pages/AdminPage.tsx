import { motion } from 'framer-motion'
import { Users, Smartphone, Activity, AlertTriangle } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function AdminPage() {
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
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-dark-400">Monitor and manage the platform</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary-400" />
                <span className="text-dark-400">Total Users</span>
              </div>
              <p className="text-3xl font-bold text-white">1,234</p>
              <p className="text-sm text-green-400">+12% this month</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-5 h-5 text-accent-400" />
                <span className="text-dark-400">Active Devices</span>
              </div>
              <p className="text-3xl font-bold text-white">567</p>
              <p className="text-sm text-green-400">+8% this month</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-dark-400">API Requests</span>
              </div>
              <p className="text-3xl font-bold text-white">45.2K</p>
              <p className="text-sm text-dark-400">Today</p>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-dark-400">Errors</span>
              </div>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-sm text-red-400">-5% from yesterday</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-dark rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'User registered', details: 'john@example.com', time: '2 min ago' },
                { action: 'Device paired', details: 'Pixel 7 Pro', time: '5 min ago' },
                { action: 'File uploaded', details: 'photo.jpg (2.4MB)', time: '10 min ago' },
                { action: 'AI command executed', details: 'Ring device', time: '15 min ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-dark-400">{activity.details}</p>
                  </div>
                  <span className="text-sm text-dark-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
