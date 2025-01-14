import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { axiosInstance } from './axiosInstance'
import { Alert } from 'react-native'
import { AxiosError } from 'axios'

export const updatePasswordService = async (id: string, password:string) => {

  try {
    await axiosInstance.put(`/user`, { 
      id,
      password,
    })

    Toast.show({
      title: 'Contraseña Actualizada',
      textBody: 'la contraseña ha sido modificada',
      type: ALERT_TYPE.SUCCESS,
    })

  } catch (error) {
    if (error instanceof AxiosError) {
      Toast.show({
        title: 'Error',
        textBody: `No se pudo eliminar el usuario ${error.response?.data}`,
        type: ALERT_TYPE.DANGER,
      })
    }
  }

}