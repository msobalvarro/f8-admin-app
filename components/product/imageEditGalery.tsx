import { StyleSheet, View } from 'react-native'
import { ProductImage } from './productImage'
import { serverAddress } from '@/constants/constanst'
import { Asset } from 'react-native-image-picker'

interface Props {
  images?: string[]
  imagesLocal?: Asset[]
  onDelete?: (image: string) => void
  onDeleteLocal?: (image: Asset) => void
  isLocal?: boolean
}

export const ImageEditGalery = ({ images, onDelete, isLocal, imagesLocal, onDeleteLocal }: Props) => {
  if (isLocal) {
    return (
      <View style={styles.imageContainer}>
        {imagesLocal?.map((image, i) =>
          <ProductImage
            onDelete={() => onDeleteLocal?.(image)}
            key={i}
            source={typeof image === 'string' ? image : String(image.uri)} />)}
      </View>
    )
  }

  return (
    <View style={styles.imageContainer}>
      {images?.map((image, i) =>
        <ProductImage
          onDelete={() => onDelete?.(image)}
          key={i}
          source={`${serverAddress}/images/${image}`} />)}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    gap: 20,
  },
  imageContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 20,
  }
})
