import axios, { AxiosError } from 'axios'
import { FileUploadedResponse } from '@/interfaces'
import { ImagePickerAsset } from 'expo-image-picker'
import { store } from '@/store'
import { serverAddress } from '@/constants/constanst'

export const uploadImageService = async (image: ImagePickerAsset): Promise<string> => {
  const formData = new FormData()
  formData.append('file', {
    uri: image.uri,
    name: image.fileName,
    type: image.mimeType,
  } as any)

  try {    
    let { data } = await axios.post<FileUploadedResponse>(
      `${serverAddress}/images`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${store.getState().token}`
        },
      }
    )

    return data.fileName
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error)
    } else {
      throw new Error(String(error))
    }
  }
}

const mimeTypes: { [key: string]: string } = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'bmp': 'image/bmp',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'ico': 'image/vnd.microsoft.icon',
}

export const getMimeType = (extension: string): string => {
  const ext = extension.toLowerCase().replace('.', '')
  return mimeTypes[ext] || 'application/octet-stream'
}
