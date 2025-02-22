import { AxiosError } from 'axios'
import { axiosInstance } from './axiosInstance'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Alert } from 'react-native'


export const deleteJobService = async (id: string, refetch: () => void) => {
  await Alert.alert(
    'Confirmar',
    '¿Estás seguro de eliminar este empleo?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar', onPress: async () => {
          try {
            await axiosInstance.delete(`/jobs/${id}`)

            Toast.show({
              title: 'Error',
              textBody: 'Job deleted successfully!',
              type: ALERT_TYPE.SUCCESS
            })

            refetch()
          } catch (error) {
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data?.error)
            } else {
              throw new Error(String(error))
            }
          }
        }
      },
    ],
  )

}