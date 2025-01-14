import { ContainerViewLayout } from '@/components/ContainerView'
import { ProductItem } from '@/components/product/productItemList'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ProductsResponse } from '@/interfaces'
import { ProductsStyles as styles } from '@/styles'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

export default function Products() {
  const navigation = useNavigation()
  const [filter, setFilter] = useState('')
  const { data, isLoading, refetch } = useAxios<ProductsResponse[]>({ endpoint: '/products' })

  const onNewProduct = () => navigation.navigate('NewProduct' as never)

  const dataFilter = data?.filter((product) =>
    `${product.name} ${product.description}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={{ paddingVertical: 20 }}>
        <TitleView
          title='Productos F8'
          subtitle='Administra todos tus productos, agrega nuevos productos y elimina los que ya no necesites'
          onClickAdd={onNewProduct} />

        <Searchbar style={{ backgroundColor: 'rgba(250,250,250,0.1)' }} placeholder='buscar producto' onChangeText={setFilter} value={filter} />
      </View>

      <View style={styles.productContainerList}>
        {!isLoading && dataFilter?.map(product => <ProductItem product={product} key={product._id} />)}
        {(!isLoading && data?.length === 0) && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
            No hay Productos
          </Text>
        )}
        {dataFilter?.length === 0 && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
            No se encontraron productos
          </Text>
        )}
      </View>
    </ContainerViewLayout>
  )
}