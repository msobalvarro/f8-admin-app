import { Image, TouchableOpacity, View } from 'react-native'
import { IconDeleteImage } from '../Icons'
import { ProductImageStyles as styles } from '@/styles'

interface Props {
  source: string
  onDelete: () => void
}

export const ProductImage = ({ onDelete, source }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <IconDeleteImage />
      </TouchableOpacity>

      <Image
        source={{ uri: source }}
        resizeMode='cover'
        style={styles.image} />
    </View>
  )
}
