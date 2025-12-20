import { Request, Response, Router } from 'express'
import { uploadToCloudinary } from '../utils/cloudinary'
import { upload } from './multer'

const router = Router()

router.post(
  '/image',
  upload.single('file'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const url = await uploadToCloudinary(req.file.buffer)
      res.json({ url })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: 'Failed to upload image' })
    }
  }
)

export default router
