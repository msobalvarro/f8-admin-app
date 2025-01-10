import { Alert, Linking } from 'react-native'

export const sendEmail = (email:string) => {
  const subject = 'Hola soy F8'
  const body = 'Este es un mensaje enviado desde mi aplicación F8.'
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  Linking.openURL(mailtoUrl).catch(err => Alert.alert('Error', 'No se pudo abrir el cliente de correo'))
}


export const callPhone = (phoneNumber: string) => {
  const telUrl = `tel:${phoneNumber}`

  Linking.openURL(telUrl).catch(err => Alert.alert('Error', 'No se pudo realizar la llamada'))
}

// Función para enviar un mensaje de WhatsApp
export const sendWhatsApp = (phoneNumber: string) => {
  const message = 'Hola, escribe tu mensaje F8'
  const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

  Linking.openURL(whatsappUrl).catch(err => Alert.alert('Error', 'No se pudo abrir WhatsApp'))
}