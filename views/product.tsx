import { ContainerViewLayout } from '@/components/ContainerView'
import { IconImages, IconTrash } from '@/components/Icons'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { ImageEditGalery } from '@/components/product/imageEditGalery'
import { ProductSkeleton } from '@/components/product/productSkeleton'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ProductsResponse } from '@/interfaces'
import { DeleteProductService } from '@/services/deleteProduct'
import { handleImagePickerService } from '@/services/imagePicker'
import { UpdateProductService } from '@/services/updateProduct'
import { uploadImageService } from '@/services/uploadImage'
import { ProductsStyles as styles, UiStyles } from '@/styles'
import { Asset } from 'react-native-image-picker'
import { Button, Checkbox } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Toast, ALERT_TYPE } from 'react-native-alert-notification'
import { useNavigation } from '@react-navigation/native'

export default function Product({ route }: { route: any }) {
  const navigation = useNavigation()
  const { id } = route.params
  const [product, setProduct] = useState<ProductsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [newImages, setImages] = useState<Asset[]>([])
  const { data, isLoading, refetch } = useAxios<ProductsResponse>({ endpoint: `/products?id=${id}` })

  useEffect(() => {
    setProduct(data)
  }, [data])

  const deleteImage = (image: string) => {
    if (product?.images) {
      const updatedImages = product.images.filter(i => i !== image);
      setProduct({
        ...product,
        images: updatedImages
      })
    }
  }

  const deleteNewImage = (image: Asset) => {
    const updatedImages = newImages.filter(i => i.uri !== image.uri);
    setImages(updatedImages)
  }

  const updateProduct = async () => {
    setLoading(true)

    try {
      if (product) {
        const images: string[] = []

        if (newImages.length > 0) {

          for (const image of newImages) {
            const response = await uploadImageService(image)
            images.push(response)
          }
        }


        await UpdateProductService({
          ...product,
          images: [...product.images, ...images]
        })

        Toast.show({
          title: 'Producto Actualizado',
          type: ALERT_TYPE.SUCCESS,
          textBody: 'El producto se ha actualizado correctamente',
        })


        setImages([])
        refetch()
      }
    } catch (error) {
      Toast.show({
        title: 'Error',
        type: ALERT_TYPE.WARNING,
        textBody: String(error)
      })
    } finally {
      setLoading(false)
    }
  }

  const updateArchived = async () => {
    setLoading(true)

    try {
      if (product) {
        await UpdateProductService({
          ...product,
          archived: !product.archived
        })

        Toast.show({
          title: 'Producto Actualizado',
          type: ALERT_TYPE.SUCCESS,
          textBody: `El producto ${product.archived ? 'se ha activado' : 'se ha archivado'} correctamente`,
        })

        refetch()
      }
    } catch (error) {
      Toast.show({
        title: 'Error',
        type: ALERT_TYPE.WARNING,
        textBody: String(error)
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImage = async () => {
    const newImageIncomming = await handleImagePickerService()
    setImages([...newImages, ...newImageIncomming])
  }

  const deleteProduct = () => {
    Alert.alert('Eliminar Producto', '¿Estas seguro de eliminar este producto?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => { },
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          setLoading(true)

          try {
            if (product) {
              await DeleteProductService(product)

              Toast.show({
                title: 'Producto Actualizado',
                type: ALERT_TYPE.SUCCESS,
                textBody: `El producto ${product.archived ? 'se ha activado' : 'se ha archivado'} correctamente`,
              })

              if (navigation.canGoBack()) {
                navigation.goBack()
              }
            }
          } catch (error) {
            Toast.show({
              title: 'Error',
              type: ALERT_TYPE.WARNING,
              textBody: String(error)
            })
          } finally {
            setLoading(false)
          }
        },
      },
    ])


  }

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={{ paddingVertical: 30 }}>
        <TitleView
          onClickAdd={deleteProduct}
          Icon={<IconTrash />}
          title='Edita tu Producto'
          subtitle='Edita la informacion de tu producto, agrega nuevas imagenes, dale de baja' />
      </View>

      {isLoading && (
        <ProductSkeleton />
      )}

      {(!isLoading && product) && (
        <View style={styles.productContainerList}>
          <Checkbox.Item
            disabled={loading}
            label='Fijar en la pagina web F8 principal'
            status={product.pinned ? 'checked' : 'unchecked'}
            onPress={() => setProduct({
              ...product,
              pinned: !product.pinned
            })} />

          {product.images.length > 0 && <ImageEditGalery images={product.images} onDelete={deleteImage} />}
          {newImages.length > 0 && (
            <ImageEditGalery
              imagesLocal={newImages}
              isLocal
              onDeleteLocal={deleteNewImage} />
          )}

          <AddImagesButton onClick={handleImage} />

          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor='#CCC'
              onChangeText={v => setProduct({
                ...product,
                name: v
              })}
              value={product.name}
              style={[UiStyles.InputStyle, { fontSize: 24 }]}
              placeholder='Nombre del Producto' />

            <TextInput
              placeholderTextColor='#CCC'
              onChangeText={v => setProduct({
                ...product,
                description: v
              })}
              value={product.description}
              multiline
              numberOfLines={4}
              style={[UiStyles.InputStyle, { height: 200 }]}
              placeholder='Escriba una descripción del producto' />
          </View>

          <View style={styles.buttonContainer}>
            {(product !== data || newImages.length > 0) && (
              <Button
                style={{ flex: 1 }}
                mode='contained'
                textColor='#FFF'
                loading={loading || isLoading}
                onPress={updateProduct}>Guardar</Button>
            )}

            {!product.archived
              ? <Button
                onPress={updateArchived}
                style={{ flex: 1 }}
                mode='contained'
                textColor='#FFF'
                loading={loading || isLoading}>Archivar</Button>
              : <Button
                onPress={updateArchived}
                style={{ flex: 1 }}
                mode='contained'
                textColor='#FFF'
                loading={loading || isLoading}>Desarchivar</Button>
            }
          </View>
        </View>
      )}
    </ContainerViewLayout>
  )
}