import { ContainerViewLayout } from '@/components/ContainerView'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ProductImage } from '@/components/product/productImage'
import { Button, Checkbox } from 'react-native-paper'
import { UiStyles } from '@/styles'
import { TitleView } from '@/components/TitleView'
import { handleImagePickerService } from '@/services/imagePicker'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Asset } from 'react-native-image-picker'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { createService } from '@/services/createService'
import { StackActions, useNavigation } from '@react-navigation/native'

export default function NewService() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Asset[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pinned, setPinned] = useState(false)

  const handleImage = async () => {
    const newImages = await handleImagePickerService()
    setImages([...images, ...newImages])
  }

  const submit = async () => {
    setLoading(true)
    try {
      await createService({
        imagesList: images,
        description,
        title,
        pinned
      })

      Toast.show({
        title: 'Servicio Agregado',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'El servicio se ha agregado correctamente, haz click para ver',
        onPress: () => console.log('click'),
      })

      navigation.dispatch(StackActions.replace('Services'))
    } catch (error) {
      Toast.show({
        title: String(error),
        type: ALERT_TYPE.DANGER,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContainerViewLayout scroll>
      <View style={styles.container}>
        <TitleView
          title='Nuevo Servicio'
          subtitle='Agrega un nuevo servicio a tu pagina web para que tus clientes vean tus trabajos realizados, agrega imagenes y una descripción'
          hiddenButton />

        <Checkbox.Item
          label='Fijar en la pagina web F8 principal'
          disabled={loading}
          status={pinned ? 'checked' : 'unchecked'}
          onPress={() => setPinned(!pinned)} />

        <View style={styles.imageContainer}>
          {images.map((image, i) =>
            <ProductImage
              onDelete={() => setImages(images.filter((_, index) => index !== i))}
              key={i}
              source={String(image.uri)} />)}
        </View>

        <AddImagesButton onClick={handleImage} />

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor='#CCC'
            onChangeText={setTitle}
            style={UiStyles.InputStyle}
            placeholder='Titulo del Servicio' />

          <TextInput
            placeholderTextColor='#CCC'
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={[UiStyles.InputStyle, { height: 200 }]}
            placeholder='Escriba una descripción clara del servicio' />
        </View>

        <Button icon='plus' mode='contained' textColor='#FFF' loading={loading} onPress={submit}>
          Agregar Servicio
        </Button>
      </View>
    </ContainerViewLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    gap: 20,
  },
  imageContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 20,
  }
})