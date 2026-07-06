import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, LogOut } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import { useAuth } from '../contexts/AuthContext'

export default function SettingsPage() {
  const { user, logout } = useAuth()

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
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-dark-400">Manage your account and preferences</p>
          </div>

          {/* Profile Section */}
          <div className="glass-dark rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
                <p className="text-dark-400">{user?.email}</p>
              </div>
            </div>
            <button className="btn-secondary">Edit Profile</button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Push Notifications</span>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Email Notifications</span>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Two-Factor Authentication</span>
                  <button className="w-12 h-6 bg-dark-700 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                <button className="btn-secondary w-full">Change Password</button>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-accent-400" />
                <h3 className="text-lg font-semibold text-white">Appearance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Dark Mode</span>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="glass-dark rounded-xl p-6 w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
