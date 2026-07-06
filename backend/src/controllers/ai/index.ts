import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

// Simple intent matching for AI commands
const intentPatterns = {
  ring_device: ['ring', 'call', 'find my phone', 'where is my phone'],
  flashlight: ['flashlight', 'torch', 'light'],
  locate: ['locate', 'location', 'where is', 'gps'],
  battery: ['battery', 'charge', 'power'],
  camera: ['camera', 'photo', 'picture', 'capture'],
  microphone: ['microphone', 'mic', 'record audio'],
  screen: ['screen', 'display', 'screenshot'],
  files: ['files', 'documents', 'downloads'],
  notifications: ['notifications', 'alerts', 'messages'],
  contacts: ['contacts', 'phonebook'],
  calls: ['calls', 'call log'],
  sms: ['sms', 'text', 'message'],
}

const detectIntent = (command: string): { intent: string; parameters: Record<string, any> } => {
  const lowerCommand = command.toLowerCase()

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (lowerCommand.includes(pattern)) {
        return {
          intent,
          parameters: { originalCommand: command },
        }
      }
    }
  }

  return {
    intent: 'unknown',
    parameters: { originalCommand: command },
  }
}

export const processCommand = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { command, deviceId } = req.body

    if (!command) {
      throw new AppError('Command is required', 400)
    }

    const { intent, parameters } = detectIntent(command)

    logger.info('AI command processed:', { command, intent, deviceId })

    // In production, this would use OpenAI or similar
    // For now, we use simple pattern matching

    res.json({
      success: true,
      data: {
        intent,
        parameters,
        status: 'pending',
        deviceId,
        message: `Command "${command}" interpreted as ${intent}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getCommandHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { limit = 20, offset = 0 } = req.query

    // Command history would be stored in database
    // For now, return empty array
    res.json({
      success: true,
      data: {
        commands: [],
        total: 0,
      },
    })
  } catch (error) {
    throw error
  }
}
