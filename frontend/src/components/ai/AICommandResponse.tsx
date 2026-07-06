import React from 'react'

interface AICommandResponseProps {
  intent: string
  parameters: Record<string, any>
  status: string
  message?: string
}

export const AICommandResponse: React.FC<AICommandResponseProps> = ({
  intent,
  parameters,
  status,
  message,
}) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    executing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Command Response</h4>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>

      {message && (
        <p className="text-gray-600 mb-4">{message}</p>
      )}

      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700">Intent:</p>
          <p className="text-gray-900">{intent}</p>
        </div>

        {Object.keys(parameters).length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700">Parameters:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(parameters, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
