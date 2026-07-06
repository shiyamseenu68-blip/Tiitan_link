import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Smartphone, 
  Folder, 
  Bell, 
  Settings, 
  Sparkles, 
  Shield,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/devices', icon: Smartphone, label: 'Devices' },
  { path: '/files', icon: Folder, label: 'Files' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/ai', icon: Sparkles, label: 'AI Assistant' },
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/admin', icon: Shield, label: 'Admin' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-dark rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden fixed inset-0 z-40 lg:static lg:block"
          >
            <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-dark border-r border-white/10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              TitanLink
            </h1>
            <p className="text-xs text-dark-400 mt-1">Control Your Phone Anywhere</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white border border-primary-500/30' 
                      : 'text-dark-300 hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">User Name</p>
                <p className="text-xs text-dark-400 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
