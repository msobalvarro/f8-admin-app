import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { uploadImageService } from './uploadImage'
import { ImagePickerAsset } from 'expo-image-picker'

interface Props {
  title: string
  description: string
  pinned: boolean
  imagesList: ImagePickerAsset[]
}

export const createService = async ({ imagesList, description, title, pinned }: Props): Promise<ProductsResponse> => {
  try {
    const images: string[] = []

    for (const image of imagesList) {
      const response = await uploadImageService(image)
      images.push(response)
    }

    const data = { images, description, title, pinned }
    
    const newProduct = await axiosInstance.post<ProductsResponse>('/services', data)

    return newProduct.data
  } catch (error) {
    throw new Error(String(error))
  }
}
