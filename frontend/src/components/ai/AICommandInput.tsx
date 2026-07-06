import React, { useState } from 'react'

interface AICommandInputProps {
  onSend: (command: string) => void
  loading?: boolean
}

export const AICommandInput: React.FC<AICommandInputProps> = ({ onSend, loading = false }) => {
  const [command, setCommand] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      onSend(command.trim())
      setCommand('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Ask TitanLink to do something... (e.g., 'Ring my phone')"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !command.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Send'}
      </button>
    </form>
  )
}
