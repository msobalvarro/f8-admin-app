import { ProductsStyles as styles } from '@/styles'
import { ServicesPropierties } from '@/interfaces'
import { Text, View } from 'react-native'
import { CarousellProduct } from '@/components/product/CarousellProduct'
import { Badge, Button } from 'native-base'
import { useRouter } from 'expo-router'
import { IconPin } from '../Icons'

interface Props {
  service: ServicesPropierties
}

export const ServiceItem = ({ service }: Props) => {
  const navigation = useRouter()

  const handleEditService = () => {
    // Navigate to edit product screen
    navigation.navigate(`/service?id=${service._id}`)
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
            {service.archived && <Badge colorScheme='trueGray' rounded='full'>Archivado</Badge>}
            {service.pinned && <IconPin />}
          </View>
        </View>

        <Text style={styles.description}>{service.description}</Text>
      </View>

      <Button onPress={handleEditService} colorScheme='primary'>Editar</Button>
    </View>
  )
}