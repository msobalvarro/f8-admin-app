import { ProductsStyles as styles } from '@/styles'
import { NavigateParamList, ServicesPropierties } from '@/interfaces'
import { Text, View } from 'react-native'
import { CarousellProduct } from '@/components/product/CarousellProduct'
import { Badge, Button } from 'react-native-paper'
import { IconPin } from '../Icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
  service: ServicesPropierties
}

export const ServiceItem = ({ service }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateParamList>>()

  const handleEditService = () => {
    // eslint-disable-next-line
    navigation.navigate(`Service`, { id: service._id })
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
            {service.archived && <Badge style={{ paddingHorizontal: 10 }}>Archivado</Badge>}
            {service.pinned && <IconPin />}
          </View>
        </View>

        <Text style={styles.description}>{service.description}</Text>
      </View>

      <Button onPress={handleEditService}>Editar</Button>
    </View>
  )
}