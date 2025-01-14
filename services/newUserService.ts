import { AxiosError } from 'axios'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { axiosInstance } from './axiosInstance'

interface Props {
  name: string
  username: string
  password: string
}

export const createUserService = async (data: Props) => {
  try {
    await axiosInstance.post('/user', data)

    Toast.show({
      title: 'Usuario Creado',
      textBody: `Ya puedes utilizar este usuario`,
      type: ALERT_TYPE.SUCCESS,
    })

  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data)
    }
  }
}