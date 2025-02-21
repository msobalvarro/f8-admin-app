import { ContainerViewLayout } from '@/components/ContainerView'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { ProductImage } from '@/components/product/productImage'
import { Button } from 'react-native-paper'
import { UiStyles } from '@/styles'
import { TitleView } from '@/components/TitleView'
import { handleImagePickerService } from '@/services/imagePicker'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Asset } from 'react-native-image-picker'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { useNavigation } from '@react-navigation/native'
import { createJobService } from '@/services/createJob'
import { TagsInput } from '@/components/jobs/tagsInput'

export default function NewJob() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<Asset | null>(null)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  const handleImage = async () => {
    const newImages = await handleImagePickerService(1)
    setImage(newImages[0])
  }

  const submit = async () => {
    setLoading(true)
    try {
      await createJobService({
        image,
        description,
        title,
        location,
        tags
      })

      Toast.show({
        title: 'Empleo Agregado',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'El empleo se ha agregado correctamente',
        onPress: () => console.log('click'),
      })

      navigation.navigate('Jobs' as never)
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
          title='Nuevo Empleo'
          subtitle='Agrega un nuevo emplo para mostar en la pagina web'
          hiddenButton />

        <View style={styles.imageContainer}>
          {image &&
            <ProductImage
              onDelete={() => setImage(null)}
              source={String(image.uri)} />}
        </View>

        {!image && <AddImagesButton onClick={handleImage} />}

        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            placeholderTextColor='#CCC'
            onChangeText={setTitle}
            style={UiStyles.InputStyle}
            placeholder='Titulo del Empleo' />

          <TextInput
            value={location}
            placeholderTextColor='#CCC'
            onChangeText={setLocation}
            style={UiStyles.InputStyle}
            placeholder='Ubicación' />

          <TextInput
            placeholderTextColor='#CCC'
            value={description}
            onChangeText={setDescription}
            multiline
            style={[UiStyles.InputStyle, { minHeight: 200, textAlignVertical: 'top' }]}
            placeholder='Escriba una descripción del Empleo' />

          <TagsInput onChangeTags={setTags} />
        </View>

        <Button icon='plus' mode='contained' textColor='#FFF' loading={loading} onPress={submit}>
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