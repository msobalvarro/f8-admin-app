import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { AxiosError } from 'axios'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

export const UpdateProductService = async (product: ProductsResponse) => {
  try {
    await axiosInstance.put<ProductsResponse>('/products', {
      ...product,
      id: product._id
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data?.error))
    } else {
      throw new Error(String(error))
    }
  }
}
