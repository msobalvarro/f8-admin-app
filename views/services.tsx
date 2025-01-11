import { ContainerViewLayout } from '@/components/ContainerView'
import { ProductSkeleton } from '@/components/product/productSkeleton'
import { ServiceItem } from '@/components/service/itemService'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ServicesPropierties } from '@/interfaces'
import { ProductsStyles as styles, UiStyles } from '@/styles'
import { Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Services() {
  const navigation = useNavigation()
  const [filter, setFilter] = useState<string>('')
  const { data, isLoading, refetch } = useAxios<ServicesPropierties[]>({ endpoint: '/services' })

  const onNewProduct = () => navigation.navigate('NewService' as never)

  const dataFilter = data?.filter((service) =>
    `${service.title} ${service.description}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={{ paddingVertical: 20, gap: 20 }}>
        <TitleView
          title='Servicios F8'
          subtitle='Administra todos tus servicios, agrega nuevas historias de servicios realizados y elimina los que ya no necesites'
          onClickAdd={onNewProduct} />

        <TextInput
          placeholderTextColor='#CCC'
          placeholder='Buscar servicio'
          style={[UiStyles.InputStyle, { width: '100%', fontSize: 20 }]}
          value={filter}
          keyboardType='default'
          onChangeText={setFilter} />
      </View>


      <View style={styles.productContainerList}>
        {isLoading && (
          <ProductSkeleton />
        )}

        {!isLoading && dataFilter?.map(service => <ServiceItem service={service} key={service._id} />)}

        {(!isLoading && dataFilter?.length === 0) && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
            No hay Servicios
          </Text>
        )}
      </View>
    </ContainerViewLayout>
  )
}