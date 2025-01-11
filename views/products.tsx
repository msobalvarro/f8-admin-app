import { ContainerViewLayout } from '@/components/ContainerView'
import { ProductItem } from '@/components/product/productItemList'
import { ProductSkeleton } from '@/components/product/productSkeleton'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ProductsResponse } from '@/interfaces'
import { ProductsStyles as styles } from '@/styles'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

export default function Products() {
  const navigation = useNavigation()
  const { data, isLoading, refetch } = useAxios<ProductsResponse[]>({ endpoint: '/products' })

  const onNewProduct = () => navigation.navigate('NewProduct' as never)

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={{ paddingVertical: 20 }}>
        <TitleView
          title='Productos F8'
          subtitle='Administra todos tus productos, agrega nuevos productos y elimina los que ya no necesites'
          onClickAdd={onNewProduct} />
      </View>

      <View style={styles.productContainerList}>
        {/* {isLoading && (
          <ProductSkeleton />
        )} */}

        {!isLoading && data?.map(product => <ProductItem product={product} key={product._id} />)}
        {(!isLoading && data?.length === 0) && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
            No hay Productos
          </Text>
        )}
      </View>
    </ContainerViewLayout>
  )
}