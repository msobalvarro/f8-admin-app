import { ProductsResponse, ServicesPropierties } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { AxiosError } from 'axios'

export const DeleteServiceApi = async ({ _id }: ServicesPropierties) => {  
  try {
    await axiosInstance.delete(`/services?id=${_id}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data?.error))
    } else {
      throw new Error(String(error))
    }
  }
}
