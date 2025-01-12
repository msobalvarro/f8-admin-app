import { Colors } from '@/constants/colors'
import { PreferenceResponse } from '@/interfaces'
import { updatePreferenceService } from '@/services/updatePreference'
import { UiStyles } from '@/styles'
import { Button } from 'react-native-paper'
import { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { PreferenceContextService } from '@/context'
import { deletePreferenceService } from '@/services/deletePreference'
import { IconDeleteImage } from '../Icons'

interface Props {
  preference: PreferenceResponse
}

export const ItemPreference = ({ preference }: Props) => {
  const [loading, setLoading] = useState(false)
  const [dataForm, setData] = useState<PreferenceResponse>(preference)
  const context = useContext(PreferenceContextService)

  const handleUpdate = async () => {
    setLoading(true)

    try {
      await updatePreferenceService(dataForm)
      context?.refetch()
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error al actualizar preferencia',
        textBody: String(error)
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar',
      '¿Está seguro de querer eliminar esta preferencia?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => { }
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            setLoading(true)

            try {
              await deletePreferenceService(preference._id)
              context?.refetch()
            } catch (error) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al eliminar preferencia',
                textBody: String(error)
              })
            } finally {
              setLoading(false)
            }
          }
        },
      ],
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={handleDelete}>
        <IconDeleteImage />
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Text style={styles.textLabel}>Key</Text>
        <TextInput
          placeholderTextColor='#CCC'
          onChangeText={key => setData({ ...dataForm, key })}
          style={UiStyles.InputStyle}
          value={dataForm.key} />
      </View>

      <View style={[styles.subContainer, { flex: 1 }]}>
        <Text style={styles.textLabel}>Value</Text>
        <TextInput
          placeholderTextColor='#CCC'
          style={UiStyles.InputStyle}
          onChangeText={value => setData({ ...dataForm, value })}
          value={dataForm.value} />
      </View>

      {dataForm !== preference && (
        <Button
          mode='contained'
          textColor='#FFF'
          loading={loading}
          onPress={handleUpdate}>
          Actualizar
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  subContainer: {
    paddingVertical: 10,
  },
  textLabel: {
    color: '#FFF',
    paddingLeft: 5,
  }
})
