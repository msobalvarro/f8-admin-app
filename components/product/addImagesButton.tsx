import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconImages } from '../Icons'
import { View } from 'native-base'

interface Props {
  onClick: () => void
}

export const AddImagesButton = ({ onClick }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onClick}>
    <IconImages />
    <View style={styles.containerText}>
      <Text style={[styles.text, { fontSize: 20 }]}>Agregar Imágenes</Text>
      <Text style={styles.text}>Toca para adjuntar nuevas imagenes al producto</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  containerText: {
    gap: 10,
  },
  button: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255,0.5)',
    borderStyle: 'dotted',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(27, 112, 135, 0.2)',
    borderRadius: 5,
  },
  text: {
    color: 'white',

  }
})
