import { ServicesPropierties } from '@/interfaces'
import { axiosInstance } from './axiosInstance'
import { AxiosError } from 'axios'

export const UpdateDataService = async (service: ServicesPropierties) => {
  try {
    await axiosInstance.put<ServicesPropierties>('/services', {
      ...service,
      id: service._id
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data?.error))
    } else {
      throw new Error(String(error))
    }
  }
}
