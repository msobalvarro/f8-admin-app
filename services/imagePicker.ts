import { launchImageLibrary, Asset } from 'react-native-image-picker'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

export const handleImagePickerService = async (): Promise<Asset[]> => {
  // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  // if (permissionResult.granted === false) {
  //   Toast.show({
  //     type: ALERT_TYPE.DANGER,
  //     title: 'Permisos Requeridos',
  //     textBody: 'Necesitamos permisos para acceder a la galería de fotos.'
  //   })

  //   return []
  // }

  const result = await launchImageLibrary({ mediaType: 'photo' })
  
  return result.assets || []
}