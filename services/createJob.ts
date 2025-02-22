import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { uploadImageService } from './uploadImage'
import { Asset } from 'react-native-image-picker'
import { AxiosError } from 'axios'

interface Props {
  title: string
  description: string
  image: Asset | null
  tags: string[]
  location: string
}

export const createJobService = async ({ title, description, image, tags, location }: Props): Promise<ProductsResponse> => {
  try {
    const imageName = image ? await uploadImageService(image) : null

    const newProduct = await axiosInstance.post<ProductsResponse>('/jobs', {
      ...(imageName && { image: imageName }),
      title,
      description,
      tags,
      location
    })

    return newProduct.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data))
    }

    throw new Error(String(error))
  }
}
