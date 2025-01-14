import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { axiosInstance } from './axiosInstance'
import { Alert } from 'react-native'
import { AxiosError } from 'axios'

export const deleteUserService = async (id: string, refetch?: () => void) => {

  await Alert.alert(
    'Confirmar',
    '¿Estás seguro de eliminar este usuario?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar', onPress: async () => {
          try {
            await axiosInstance.delete(`/user?id=${id}`)

            Toast.show({
              title: 'Usuario Eliminado',
              textBody: 'El usuario ha sido eliminado',
              type: ALERT_TYPE.SUCCESS,
            })

            refetch?.()
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
      },
    ],
  )

}