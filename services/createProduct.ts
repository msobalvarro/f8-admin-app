import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { uploadImageService } from './uploadImage'
import { ImagePickerAsset } from 'expo-image-picker'

interface Props {
  name: string
  description: string
  pinned: boolean
  imagesList: ImagePickerAsset[]
}

export const createProductService = async ({ imagesList, description, name, pinned }: Props): Promise<ProductsResponse> => {
  try {
    const images: string[] = []

    for (const image of imagesList) {
      const response = await uploadImageService(image)
      images.push(response)
    }

    const data = { images, description, name, pinned }
    console.log(data)
    
    const newProduct = await axiosInstance.post<ProductsResponse>('/products', data)

    return newProduct.data
  } catch (error) {
    throw new Error(String(error))
  }
}
