import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function AIPage() {
  const [command, setCommand] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help you control your devices using natural language. Try saying "Ring my phone" or "Show battery status".' }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    setMessages([...messages, { role: 'user', content: command }])
    setCommand('')

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I understand you want to ' + command + '. This feature will be implemented with AI integration.' }])
    }, 1000)
  }

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
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent-400" />
              AI Assistant
            </h1>
            <p className="text-dark-400">Control your devices with natural language commands</p>
          </div>

          {/* Chat Interface */}
          <div className="glass-dark rounded-xl p-6 h-[calc(100vh-200px)] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/10 text-white'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Ask me to control your devices..."
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary px-6">
                <Send className="w-5 h-5" />
              </button>
            </form>

            {/* Example Commands */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-dark-400 mb-2">Try commands like:</p>
              <div className="flex flex-wrap gap-2">
                {['Ring my phone', 'Show battery', 'Locate device', 'Open camera'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => setCommand(cmd)}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm text-dark-300 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
