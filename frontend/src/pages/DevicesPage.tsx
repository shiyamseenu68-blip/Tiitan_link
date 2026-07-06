import { motion } from 'framer-motion'
import { Smartphone, Plus, Search } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function DevicesPage() {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Devices</h1>
              <p className="text-dark-400">Manage and monitor your connected devices</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Device
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search devices..."
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass-dark rounded-xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Online</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1">Pixel 7 Pro</h3>
                <p className="text-dark-400 text-sm mb-4">Google • Android 14</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Battery</span>
                    <span className="text-white">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Signal</span>
                    <span className="text-white">Strong</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Last seen</span>
                    <span className="text-white">2 min ago</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
