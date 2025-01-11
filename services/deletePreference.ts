import { AxiosError } from 'axios'
import { axiosInstance } from './axiosInstance'
import { PreferenceResponse } from '@/interfaces'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'


export const deletePreferenceService = async (id: string) => {
  try {
    await axiosInstance.delete(`/preferences?id=${id}`)

    Toast.show({
      title: 'Error',
      textBody: 'Preference deleted successfully!',
      type: ALERT_TYPE.SUCCESS
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error)
    } else {
      throw new Error(String(error))
    }
  }
}