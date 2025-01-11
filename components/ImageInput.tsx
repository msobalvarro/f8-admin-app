import { handleImagePickerService } from '@/services/imagePicker'
import { Button } from 'react-native-paper'

interface Props {
  onChangeImages: (image: string[]) => void
}

export const ImageInput = ({ onChangeImages }: Props) => {
  const handleImagePicker = async () => {
    const data = await handleImagePickerService()
    
    onChangeImages(data.map(e => String(e.uri)))
  }

  return (
    <Button onPress={handleImagePicker}>Agregar Fotos</Button>
  )
}