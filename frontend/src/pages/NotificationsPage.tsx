import { motion } from 'framer-motion'
import { Check, Trash2 } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function NotificationsPage() {
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
              <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-dark-400">View mirrored notifications from your devices</p>
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {[
              { app: 'WhatsApp', title: 'John Doe', message: 'Hey, are you free today?', time: '2 min ago', unread: true },
              { app: 'Gmail', title: 'New email', message: 'Your order has been shipped', time: '15 min ago', unread: true },
              { app: 'Instagram', title: 'New like', message: 'Your photo received 50 likes', time: '1 hour ago', unread: false },
              { app: 'Slack', title: 'General', message: 'Meeting starting in 10 minutes', time: '2 hours ago', unread: false },
            ].map((notif, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-dark rounded-xl p-4 ${notif.unread ? 'border-l-4 border-primary-500' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{notif.app}</span>
                      <span className="text-sm text-dark-400">{notif.time}</span>
                      {notif.unread && <span className="w-2 h-2 bg-primary-500 rounded-full"></span>}
                    </div>
                    <h3 className="text-white font-medium mb-1">{notif.title}</h3>
                    <p className="text-dark-400 text-sm">{notif.message}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Check className="w-4 h-4 text-dark-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
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
