import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

// Configure using individual variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = 'blog-images'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(error)
        } else {
          resolve(result?.secure_url || '')
        }
      }
    )
    streamifier.createReadStream(buffer).pipe(uploadStream)
  })
}
