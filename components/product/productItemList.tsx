import { ProductsStyles as styles } from '@/styles'
import { ProductsResponse } from '@/interfaces'
import { Text, View } from 'react-native'
import { CarousellProduct } from '@/components/product/CarousellProduct'
import { Badge, Button } from 'react-native-paper'
import { IconPin } from '../Icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
  product: ProductsResponse
}

export const ProductItem = ({ product }: Props) => {
  const navigation = useNavigation()

  const handleEditProduct = () => {
    // Navigate to edit product screen
    navigation.navigate(`Product` as never, { id: product._id } as never)
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
            {product.archived && <Badge>Archivado</Badge>}
            {product.pinned && <IconPin />}
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Button onPress={handleEditProduct}>Editar</Button>
    </View>
  )
}