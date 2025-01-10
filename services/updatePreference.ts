import { AxiosError } from 'axios'
import { axiosInstance } from './axiosInstance'
import { PreferenceResponse } from '@/interfaces'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'


export const updatePreferenceService = async (data: PreferenceResponse) => {
  try {
    await axiosInstance.put('/preferences', data)

    Toast.show({
      title: 'Error',
      textBody: 'Preference saved successfully!',
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