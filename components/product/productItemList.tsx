import { ProductsStyles as styles } from '@/styles'
import { ProductsResponse } from '@/interfaces'
import { Text, View } from 'react-native'
import { CarousellProduct } from '@/components/product/CarousellProduct'
import { Badge, Button } from 'native-base'
import { useRouter } from 'expo-router'
import { IconPin } from '../Icons'

interface Props {
  product: ProductsResponse
}

export const ProductItem = ({ product }: Props) => {
  const navigation = useRouter()

  const handleEditProduct = () => {
    // Navigate to edit product screen
    navigation.navigate(`/product?id=${product._id}`)
  }

  return (
    <View style={styles.productContainer} key={product._id}>
      {product.images.length > 0 && <CarousellProduct images={product.images} />}

      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.productTitle}>
            {product.name}
          </Text>

          <View style={styles.subContainerInformation}>
            {product.archived && <Badge colorScheme='trueGray' rounded='full'>Archivado</Badge>}
            {product.pinned && <IconPin />}
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Button onPress={handleEditProduct} colorScheme='primary'>Editar</Button>
    </View>
  )
}