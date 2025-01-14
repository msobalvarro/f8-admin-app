import { ContainerViewLayout } from '@/components/ContainerView'
import { TitleView } from '@/components/TitleView'
import { createUserService } from '@/services/newUserService'
import { NewUserStyles as styles, UiStyles } from '@/styles'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TextInput, View } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Button } from 'react-native-paper'

export default function NewUser() {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onCreateUser = async () => {
    setLoading(true)

    try {
      await createUserService({ name, username, password })

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
          title='Nuevo Usuario F8'
          subtitle='Al crear un nuevo usuario F8 darás acceso a tus configuraciones F8'
        />

        <View style={{ gap: 10 }}>
          <TextInput
            placeholder='Nombre'
            placeholderTextColor='#FFFFFF'
            value={name}
            onChangeText={setName}
            style={UiStyles.InputStyle} />
          <TextInput
            placeholder='Usuario'
            value={username}
            onChangeText={setUser}
            placeholderTextColor='#FFFFFF'
            style={UiStyles.InputStyle} />
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
          onPress={onCreateUser}
          textColor='#FFF'>Crear Usuario</Button>
      </View>
    </ContainerViewLayout>
  )
}