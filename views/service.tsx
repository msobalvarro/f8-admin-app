import { ContainerViewLayout } from '@/components/ContainerView'
import { IconTrash } from '@/components/Icons'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { ImageEditGalery } from '@/components/product/imageEditGalery'
// import { ProductSkeleton } from '@/components/product/productSkeleton'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ServicesPropierties } from '@/interfaces'
import { DeleteServiceApi } from '@/services/deleteService'
import { handleImagePickerService } from '@/services/imagePicker'
import { UpdateDataService } from '@/services/updateService'
import { uploadImageService } from '@/services/uploadImage'
import { ProductsStyles as styles, UiStyles } from '@/styles'
import { Button, Checkbox } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { Alert, Text, TextInput, View } from 'react-native'
import { Toast, ALERT_TYPE } from 'react-native-alert-notification'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { Asset } from 'react-native-image-picker'

export default function Service({ route }: { route: any }) {
  const navigation = useNavigation()
  const { id } = route.params
  const [service, setService] = useState<ServicesPropierties | null>(null)
  const [loading, setLoading] = useState(false)
  const [newImages, setImages] = useState<Asset[]>([])
  const { data, isLoading, refetch } = useAxios<ServicesPropierties>({ endpoint: `/services?id=${id}` })

  useEffect(() => {
    setService(data)
  }, [data])

  const deleteImage = (image: string) => {
    if (service?.images) {
      const updatedImages = service.images.filter(i => i !== image);
      setService({
        ...service,
        images: updatedImages
      })
    }
  }

  const deleteNewImage = (image: Asset) => {
    const updatedImages = newImages.filter(i => i.uri !== image.uri);
    setImages(updatedImages)
  }

  const updateService = async () => {
    setLoading(true)

    try {
      if (service) {
        const images: string[] = []

        if (newImages.length > 0) {

          for (const image of newImages) {
            const response = await uploadImageService(image)
            images.push(response)
          }
        }

        await UpdateDataService({
          ...service,
          images: [...service.images, ...images],
        })

        Toast.show({
          title: 'Servicio Actualizado',
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
      if (service) {
        await UpdateDataService({
          ...service,
          archived: !service.archived
        })

        Toast.show({
          title: 'Servicio Actualizado',
          type: ALERT_TYPE.SUCCESS,
          textBody: `El producto ${service.archived ? 'se ha activado' : 'se ha archivado'} correctamente`,
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
        onPress: () => {
        },
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          setLoading(true)

          try {
            if (service) {
              await DeleteServiceApi(service)

              Toast.show({
                title: 'Producto Actualizado',
                type: ALERT_TYPE.SUCCESS,
                textBody: `El producto ${service.archived ? 'se ha activado' : 'se ha archivado'} correctamente`,
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
          title='Edita tu Servicio'
          subtitle='Edita tu servicio, tus clientes verán tus servicios publicados, agrega nuevas imagenes, dale de baja' />
      </View>

      {/* {isLoading && (
        <ProductSkeleton/>
      )} */}

      {(!isLoading && service) && (
        <View style={styles.productContainerList}>
          <Checkbox.Item
            label='Fijar en la página web F8 principal'
            disabled={loading}
            status={service.pinned ? 'checked' : 'unchecked'}
            onPress={() => setService({
              ...service,
              pinned: !service.pinned
            })} />

          {service.images.length > 0 && <ImageEditGalery images={service.images} onDelete={deleteImage} />}
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
              onChangeText={v => setService({
                ...service,
                title: v
              })}
              value={service.title}
              style={[UiStyles.InputStyle, { fontSize: 24 }]}
              placeholder='Nombre del Producto' />

            <TextInput
              placeholderTextColor='#CCC'
              onChangeText={v => setService({
                ...service,
                description: v
              })}
              value={service.description}
              multiline
              numberOfLines={4}
              style={[UiStyles.InputStyle, { height: 200 }]}
              placeholder='Escriba una descripción del producto' />
          </View>

          <View style={styles.buttonContainer}>
            {(service !== data || newImages.length > 0) && (
              <Button
                style={{ flex: 1 }}
                isLoading={loading || isLoading}
                onPress={updateService}
                colorScheme='green'>Guardar</Button>
            )}

            {!service.archived
              ? <Button
                onPress={updateArchived}
                style={{ flex: 1 }}
                isLoading={loading || isLoading}
                colorScheme='warning'>Archivar</Button>
              : <Button
                onPress={updateArchived}
                style={{ flex: 1 }}
                isLoading={loading || isLoading}
                colorScheme='secondary'>Activar</Button>
            }
          </View>
        </View>
      )}
    </ContainerViewLayout>
  )
}