import { callPhone, sendEmail, sendWhatsApp } from '@/services/contactServices'
import { ContactButtonsStyles as styles } from '@/styles'
import { Text, TouchableOpacity, View } from 'react-native'
import { IconCallPhone, IconMail, IconWhatsapp } from '../Icons'

interface Props {
  email: string
  phoneNumber: string
  whatsapp: string
}

export const ContactButtons = ({ email, phoneNumber, whatsapp }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#075e54' }]} onPress={() => sendWhatsApp(whatsapp)}>
        <IconWhatsapp />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#741b47' }]} onPress={() => sendEmail(email)}>
        <IconMail />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#0b5394' }]} onPress={() => callPhone(phoneNumber)}>
        <IconCallPhone />
      </TouchableOpacity>
    </View>
  )
}

