import { ContainerViewLayout } from '@/components/ContainerView'
import { TitleView } from '@/components/TitleView'
import { UserResponse } from '@/interfaces'
import { updatePasswordService } from '@/services/updatePassword'
import { NewUserStyles as styles, UiStyles } from '@/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { TextInput, View } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Button } from 'react-native-paper'

export default function UpdatePasswordUser() {
  const route = useRoute<{ key: string; name: string; params: UserResponse }>()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onUpdatePassword = async () => {
    setLoading(true)

    try {
      if (password.length < 3) {
        throw new Error('Password must be at least 3 characters long')
      }

      if (password !== confirmPassword) {
        throw new Error('Password is not correct')
      }

      await updatePasswordService(route.params._id, password)

      navigation.goBack()
    } catch (error) {
      Toast.show({
        title: 'Error',
        textBody: `No se pudo eliminar el usuario ${error}`,
        type: ALERT_TYPE.DANGER,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContainerViewLayout scroll>
      <View style={styles.container}>
        <TitleView
          hiddenButton
          title={`Actualizar Contraseña`}
          subtitle={`Actualiza la contraseña a ${route.params.name}`}
        />

        <View style={{ gap: 10 }}>
          <TextInput
            placeholder='Contraseña'
            value={password}
            onChangeText={setPassword}
            placeholderTextColor='#FFFFFF'
            secureTextEntry
            style={UiStyles.InputStyle} />
          <TextInput
            placeholder='Repite Contraseña'
            placeholderTextColor='#FFFFFF'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={UiStyles.InputStyle} />
        </View>

        <Button
          loading={loading}
          disabled={password.length === 0 && password !== confirmPassword}
          mode='contained'
          onPress={onUpdatePassword}
          textColor='#FFF'>Crear Usuario</Button>
      </View>
    </ContainerViewLayout>
  )
}