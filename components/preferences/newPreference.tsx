import { axiosInstance } from '@/services/axiosInstance'
import { NewPreferenceStyles, UiStyles } from '@/styles'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Toast, ALERT_TYPE } from 'react-native-alert-notification'
import { Button, Modal, Portal, Text } from 'react-native-paper'

interface Props {
  isVisible: boolean
  toggleModal: (value: boolean) => void
  onRefetch: () => void
}

export const NewPreference = ({ isVisible, toggleModal, onRefetch }: Props) => {
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const handledSubmit = async () => {
    setLoading(false)

    try {
      await axiosInstance.post('/preferences', { key, value })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Variable creada',
        textBody: `Ahora puedes utilizar tu variable en el sitio web F8`,
      })

      toggleModal(false)
      onRefetch()

      setKey('')
      setValue('')
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: `No se pudo crear la preferencia: ${error.response?.data}`,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Portal>
      <Modal visible={isVisible} dismissableBackButton theme={{ colors: { primary: 'rgba(0,0,0,0.6)' } }} onDismiss={() => toggleModal(false)}>
        <View style={NewPreferenceStyles.container}>
          <Text style={{ fontSize: 24 }}>Nueva Variable</Text>
          <TextInput
            value={key}
            onChangeText={setKey}
            placeholderTextColor='#FFFFFF60'
            style={UiStyles.InputStyle}
            placeholder='key' />

          <TextInput
            value={value}
            onChangeText={setValue}
            placeholderTextColor='#FFFFFF60'
            style={UiStyles.InputStyle}
            placeholder='value' />

          <Button loading={loading} onPress={handledSubmit} mode='contained' textColor='#FFF' icon='plus'>
            Crear Variable
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}
