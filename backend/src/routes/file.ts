import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { listFiles, uploadFile, downloadFile, deleteFile } from '../controllers/file'

const router = Router()

// All file routes require authentication
router.use(authenticate)

// List files
router.get('/:deviceId', listFiles)

// Upload file
router.post('/:deviceId/upload', uploadFile)

// Download file
router.get('/:deviceId/download/:fileId', downloadFile)

// Delete file
router.delete('/:deviceId/:fileId', deleteFile)

export default router
