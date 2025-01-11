import { Colors } from '@/constants/colors'
import { PreferenceResponse } from '@/interfaces'
import { updatePreferenceService } from '@/services/updatePreference'
import { UiStyles } from '@/styles'
import { Button } from 'react-native-paper'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

interface Props {
  preference: PreferenceResponse
  refetch: () => void
}

export const ItemPreference = ({ preference }: Props) => {
  const [loading, setLoading] = useState(false)
  const [dataForm, setData] = useState<PreferenceResponse>(preference)

  const handleUpdate = async () => {
    setLoading(true)

    try {
      await updatePreferenceService(dataForm)

      refetch()
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

  return (
    <View style={styles.container}>
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
          buttonColor={Colors.primary}
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
