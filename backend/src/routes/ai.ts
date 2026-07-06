import { Router } from 'express'
import { authenticate, requirePremium } from '../middleware/auth'
import { processCommand, getCommandHistory } from '../controllers/ai'

const router = Router()

// All AI routes require authentication and premium
router.use(authenticate, requirePremium)

// Process natural language command
router.post('/command', processCommand)

// Get command history
router.get('/history', getCommandHistory)

export default router
