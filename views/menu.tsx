import { ContainerViewLayout } from '@/components/ContainerView'
import {
  IconCreateProductMenu,
  IconLogoutProductMenu,
  IconMessageMenu,
  IconNewServiceListMenu,
  IconPreference,
  IconProductListMenu,
  IconServiceListMenu
} from '@/components/Icons'
import { TitleView } from '@/components/TitleView'
import { logoutService } from '@/services/authentication'
import { MenuStyles as styles } from '@/styles'
import { useNavigation } from '@react-navigation/native'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

export default function Menu() {
  const router = useNavigation()

  const logout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de querer cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar', onPress: async () => {
            await logoutService()
            router.navigate('Login')
          }
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <ContainerViewLayout scroll>
      <View style={styles.container}>
        <TitleView
          hiddenButton
          title='Menú F8 Manager'
          subtitle='Administra tu sitio web con opciones parametrizadas'
        />

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('Messages' as never)}>
          <IconMessageMenu />
          <Text style={styles.text}>Mensajes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('Services' as never)}>
          <IconServiceListMenu />
          <Text style={styles.text}>Servicios F8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('NewService' as never)}>
          <IconNewServiceListMenu />
          <Text style={styles.text}>Nuevo Servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('Products' as never)}>
          <IconProductListMenu />
          <Text style={styles.text}>Productos F8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('NewProduct' as never)}>
          <IconCreateProductMenu />
          <Text style={styles.text}>Nuevo Producto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('Preference' as never)}>
          <IconPreference />
          <Text style={styles.text}>Preferencias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <IconLogoutProductMenu />
          <Text style={styles.text}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ContainerViewLayout>
  )
}

