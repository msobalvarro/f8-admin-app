import { callPhone, sendEmail, sendWhatsApp } from '@/services/contactServices'
import { ContactButtonsStyles as styles } from '@/styles'
import { Text, TouchableOpacity, View } from 'react-native'
import { IconCallPhone, IconMail, IconWhatsapp } from '../Icons'
import { Colors } from '@/constants/colors'

interface Props {
  email: string
  phoneNumber: string
  whatsapp: string
}

export const ContactButtons = ({ email, phoneNumber, whatsapp }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#128c7e' }]} onPress={() => sendWhatsApp(whatsapp)}>
        <IconWhatsapp />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#a62b2d' }]} onPress={() => sendEmail(email)}>
        <IconMail />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }]} onPress={() => callPhone(phoneNumber)}>
        <IconCallPhone />
      </TouchableOpacity>
    </View>
  )
}

