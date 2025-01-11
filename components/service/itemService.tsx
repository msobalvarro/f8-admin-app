import { ProductsStyles as styles } from '@/styles'
import { ServicesPropierties } from '@/interfaces'
import { Text, View } from 'react-native'
import { CarousellProduct } from '@/components/product/CarousellProduct'
import { Badge, Button } from 'react-native-paper'
import { IconPin } from '../Icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
  service: ServicesPropierties
}

export const ServiceItem = ({ service }: Props) => {
  const navigation = useNavigation()

  const handleEditService = () => {
    // Navigate to edit product screen
    navigation.navigate(`Service` as never, { id: service._id } as any)
  }

  return (
    <View style={styles.productContainer} key={service._id}>
      {service.images.length > 0 && <CarousellProduct images={service.images} />}

      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.productTitle}>
            {service.title}
          </Text>

          <View style={styles.subContainerInformation}>
            {service.archived && <Badge>Archivado</Badge>}
            {service.pinned && <IconPin />}
          </View>
        </View>

        <Text style={styles.description}>{service.description}</Text>
      </View>

      <Button onPress={handleEditService}>Editar</Button>
    </View>
  )
}