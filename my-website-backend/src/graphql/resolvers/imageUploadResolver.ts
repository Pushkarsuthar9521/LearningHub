import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { Upload } from '../../types/Upload'
import { FileUpload, uploadToCloudinary } from '../../utils/cloudinary'

@Resolver()
export class ImageUploadResolver {
  @Authorized()
  @Mutation(() => String)
  async uploadImage(
    @Arg('file', () => Upload) file: FileUpload
  ): Promise<string> {
    try {
      const url = await uploadToCloudinary(file, 'blog-images')
      return url
    } catch (error) {
      console.error('Upload error:', error)
      throw new Error('Failed to upload image')
    }
  }
}
