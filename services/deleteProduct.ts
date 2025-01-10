import { ProductsResponse } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { AxiosError } from 'axios'

export const DeleteProductService = async ({ _id }: ProductsResponse) => {  
  try {
    await axiosInstance.delete<ProductsResponse>(`/products?id=${_id}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data?.error))
    } else {
      throw new Error(String(error))
    }
  }
}
