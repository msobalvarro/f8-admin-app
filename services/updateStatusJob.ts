import { AxiosError } from 'axios'
import { axiosInstance } from './axiosInstance'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Alert } from 'react-native'

export const updatetStatusJob = async (id: string, active: boolean, refetch: () => void) => {
  await Alert.alert(
    'Confirmar',
    `¿Estás seguro de ${active ? 'desactivar' : 'activar'} este empleo?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar', onPress: async () => {
          try {
            await axiosInstance.put(`/jobs/status`, {
              jobId: id,
              active: !active
            })

            Toast.show({
              title: 'Job updated',
              textBody: 'Job state updated!',
              type: ALERT_TYPE.SUCCESS
            })

            refetch()
          } catch (error) {
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data)
            } else {
              throw new Error(String(error))
            }
          }
        }
      },
    ],
  )

}