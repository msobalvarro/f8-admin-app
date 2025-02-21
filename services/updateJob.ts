import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { uploadImageService } from './uploadImage'
import { Asset } from 'react-native-image-picker'
import { AxiosError } from 'axios'

interface Props {
  jobId?: string
  title: string
  description: string
  image: Asset | null | string
  tags: string[]
  location: string
}

export const updateJobService = async ({ title, description, image, tags, location, jobId }: Props): Promise<void> => {
  try {
    let imageName = null

    if (image && typeof image === 'object') {
      imageName = await uploadImageService(image)
    }

    if (typeof image === 'string') {
      imageName = image
    }

    console.log(imageName)

    await axiosInstance.put<ProductsResponse>(`/jobs/${jobId}`, {
      image: imageName,
      title,
      description,
      tags,
      location
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data))
    }

    throw new Error(String(error))
  }
}
