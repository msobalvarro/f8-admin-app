import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { axiosInstance } from './axiosInstance'
import { Alert } from 'react-native'

export const handledArchiveMessage = async (_id: string, setLoading: (v: boolean) => void, refetch: () => void) => {
  setLoading(true)

  try {
    await axiosInstance.put('/message', { _id })

    Toast.show({
      textBody: 'El mensaje ha sido archivado',
      type: ALERT_TYPE.SUCCESS,
    })

    refetch()
  } catch (error) {
    Toast.show({
      textBody: 'Error al archivar el mensaje',
      type: ALERT_TYPE.WARNING,
    })
  } finally {
    setLoading(false)
  }
}

export const handleDeleteMessage = async (_id: string, setLoading: (v: boolean) => void, refetch: () => void) => {
  Alert.alert(
    'Eliminar Mensaje',
    'Al eliminar el mensaje no se podrá recuperar la información',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => { },
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          setLoading(true)

          try {
            await axiosInstance.put('/message', { _id })

            Toast.show({
              title: 'Eliminado',
              textBody: 'El mensaje ha sido elimado',
              type: ALERT_TYPE.SUCCESS,
            })

            refetch()
          } catch (error) {
            Toast.show({
              title: 'Error',
              textBody: 'Error al archivar el mensaje',
              type: ALERT_TYPE.WARNING,
            })
          } finally {
            setLoading(false)
          }
        },
      }
    ]
  )

}