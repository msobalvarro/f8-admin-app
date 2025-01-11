import { io } from 'socket.io-client'
import { serverAddress } from '@/constants/constanst'
import { onDisplayNotification } from '@/services/notification'
import { MessagesResponse } from '@/interfaces'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

/**Socket instance */
export const socket = io(serverAddress, {
  autoConnect: false,
  reconnection: true,
})

socket.on('connect_error', (e) => {
  console.log(e)
  setTimeout(() => socket.connect(), 5000)
})

socket.on('disconnect', () => console.log('socket disconnect'))


socket.on('connect', () => {
  Toast.show({
    title: 'Conectado',
    textBody: 'Ahora podrás recibir mensajes tus clientes',
    type: ALERT_TYPE.SUCCESS,
  })
})

/** Funcion que activa la subscripcion a las notificaciones */
export function registerNotification() {
  console.log('registerNotification')
  
  socket.on('newMessage', (data: MessagesResponse) => {
    Toast.show({
      title: 'Nuevo Mensaje',
      textBody: `De: ${data.fullName}`,
      type: ALERT_TYPE.INFO,
    })

    onDisplayNotification(`Nuevo Mensaje de ${data.fullName}`)
  })
}

export default { socket, registerNotification }