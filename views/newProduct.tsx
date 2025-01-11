import { ContainerViewLayout } from '@/components/ContainerView'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ProductImage } from '@/components/product/productImage'
import { Button, Checkbox } from 'react-native-paper'
import { UiStyles } from '@/styles'
import { TitleView } from '@/components/TitleView'
import { handleImagePickerService } from '@/services/imagePicker'
import { createProductService } from '@/services/createProduct'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Asset } from 'react-native-image-picker'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/colors'

export default function NewProduct() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Asset[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pinned, setPinned] = useState(false)

  const handleImage = async () => {
    const newImages = await handleImagePickerService()
    setImages([...images, ...newImages])
  }

  const submit = async () => {
    setLoading(true)
    try {
      await createProductService({
        imagesList: images,
        description,
        name,
        pinned
      })

      Toast.show({
        title: 'Producto Agregado',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'El producto se ha agregado correctamente, haz click para ver',
        onPress: () => console.log('click'),
      })

      navigation.navigate('Products' as never)
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
          title='Nuevo Producto'
          subtitle='Agrega un nuevo producto a tu pagina web, agrega imagenes y una descripción'
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
            onChangeText={setName}
            style={UiStyles.InputStyle}
            placeholder='Nombre del Producto' />

          <TextInput
            placeholderTextColor='#CCC'
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={[UiStyles.InputStyle, { height: 200 }]}
            placeholder='Escriba una descripción del producto' />
        </View>

        <Button loading={loading} onPress={submit} textColor='#FFF' buttonColor={Colors.primary}>
          Agregar Producto
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