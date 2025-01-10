import { handleImagePickerService } from '@/services/imagePicker'
import { Button } from 'native-base'

interface Props {
  onChangeImages: (image: string[]) => void
}

export const ImageInput = ({ onChangeImages }: Props) => {
  const handleImagePicker = async () => {
    onChangeImages(await handleImagePickerService())
  }

  return (
    <Button colorScheme='blueGray' onPress={handleImagePicker}>Agregar Fotos</Button>
  )
}