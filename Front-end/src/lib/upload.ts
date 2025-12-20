import axios from 'axios'

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const token = localStorage.getItem('token')

  const response = await axios.post(
    `${
      import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
      'http://localhost:9000'
    }/upload/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  )

  return response.data.url
}
