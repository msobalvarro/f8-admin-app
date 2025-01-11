import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '@/constants/colors'
import { IconBack, IconMenu } from '../Icons'
import { useNavigation, useRoute } from '@react-navigation/native'

export const UiNavbar = () => {
  const router = useNavigation()
  const pathName = useRoute().name

  if (pathName === 'Login') return null

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {(router.canGoBack() && pathName !== 'Menu') && (
          <TouchableOpacity style={styles.backButton} onPress={() => router.goBack()}>
            <IconBack />
          </TouchableOpacity>
        )}

        <Image resizeMode='contain' style={styles.logo} source={require('@/assets/images/logo/F8_Horizontal_Logo.png')} />
      </View>

      {pathName !== 'Menu' && (
        <TouchableOpacity onPress={() => router.navigate('Menu' as never)}>
          <IconMenu />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
  },

  logo: {
    width: 180,
    height: 40,
  },
  backButton: {
    width: 50,
    textAlign: 'center',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20
  },
})
