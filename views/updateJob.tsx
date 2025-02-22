import { StyleSheet, TextInput, View } from 'react-native'
import { UiStyles } from '@/styles'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { NavigationProp, StaticScreenProps, useNavigation } from '@react-navigation/native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { Asset } from 'react-native-image-picker'
import { ContainerViewLayout } from '@/components/ContainerView'
import { ProductImage } from '@/components/product/productImage'
import { TitleView } from '@/components/TitleView'
import { AddImagesButton } from '@/components/product/addImagesButton'
import { TagsInput } from '@/components/jobs/tagsInput'
import { handleImagePickerService } from '@/services/imagePicker'
import { JobsResponse, JobUpdateProps } from '@/interfaces'
import { useAxios } from '@/hooks/useFetch'
import { imageOrigin } from '@/constants/constanst'
import { updateJobService } from '@/services/updateJob'

type Props = StaticScreenProps<{
  id: string
}>

export default function UpdateJob({ route }: Props) {
  const { id } = route.params
  const [loading, setLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState<Asset | null>(null)
  const [dataForm, setDataForm] = useState<JobUpdateProps>({
    description: '',
    location: '',
    tags: [],
    title: '',
    image: null,
  })

  const { data: dataJob, isLoading, refetch } = useAxios<JobsResponse>({ endpoint: `/jobs/detail/${id}` })

  useEffect(() => {
    if (dataJob) {
      setDataForm(dataJob)
    }
  }, [dataJob])

  const handleImage = async () => {
    const newImages = await handleImagePickerService(1)
    setImageSelected(newImages[0])
    setDataForm({ ...dataForm, image: newImages[0] })
  }

  const submit = async () => {
    setLoading(true)
    try {
      await updateJobService({
        description: dataForm.description,
        location: dataForm.location,
        tags: dataForm.tags,
        title: dataForm.title,
        image: dataForm.image ?? dataJob?.image ?? null,
        jobId: dataJob?._id,
      })

      Toast.show({
        title: 'Empleo actualizado',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'El empleo se ha actualizado correctamente, haz click para ver',
      })

      refetch()
    } catch (error) {
      Toast.show({
        title: String(error),
        type: ALERT_TYPE.DANGER,
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = () => { 
    setImageSelected(null)
    setDataForm({ ...dataForm, image: null })
  }
  
  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={styles.container}>
        <TitleView
          title='Editar Empleo'
          hiddenButton />

        <View style={styles.imageContainer}>
          {(imageSelected || dataForm?.image) &&
            <ProductImage
              onDelete={deleteImage}
              source={String(imageSelected?.uri || `${imageOrigin}/${dataForm.image}`)} />}
        </View>

        {(!dataForm?.image && !imageSelected) && <AddImagesButton onClick={handleImage} />}

        <View style={styles.inputContainer}>
          <TextInput
            value={dataForm.title}
            placeholderTextColor='#CCC'
            onChangeText={title => setDataForm({ ...dataForm, title })}
            style={UiStyles.InputStyle}
            placeholder='Titulo del Empleo' />

          <TextInput
            value={dataForm.location}
            placeholderTextColor='#CCC'
            onChangeText={location => setDataForm({ ...dataForm, location })}
            style={UiStyles.InputStyle}
            placeholder='Ubicación' />

          <TextInput
            placeholderTextColor='#CCC'
            value={dataForm.description}
            onChangeText={description => setDataForm({ ...dataForm, description })}
            multiline
            style={[UiStyles.InputStyle, { minHeight: 200, textAlignVertical: 'top' }]}
            placeholder='Escriba una descripción del Empleo' />

          <TagsInput defaultValue={dataForm.tags} onChangeTags={tags => setDataForm({ ...dataForm, tags })} />
        </View>

        <Button icon='plus' disabled={dataForm === dataJob} mode='contained' textColor='#FFF' loading={loading} onPress={submit}>
          Guardar
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
})