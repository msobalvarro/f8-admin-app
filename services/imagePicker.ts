import { launchImageLibrary, Asset } from 'react-native-image-picker'

export const handleImagePickerService = async (selectionLimit?: number): Promise<Asset[]> => {
  const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit })

  return result.assets || []
}