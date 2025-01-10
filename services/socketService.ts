import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import { io } from 'socket.io-client'
import { getToken } from './authentication'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { serverAddress } from '@/constants/constanst'
import { store } from '@/store'

const SOCKET_TASK = 'background-socket-task'

const token = store.getState().token

export const socket = io(serverAddress, {
  reconnection: true,
  auth: { token }
})

socket.on('connect', () => {
  Toast.show({
    title: 'Conectado',
    textBody: 'Conectado al servidor',
    type: ALERT_TYPE.SUCCESS,
  })
  console.log(socket.id)
})

TaskManager.defineTask(SOCKET_TASK, async () => {
  try {
    if (!socket.connected) {
      socket.connect()
    }

    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

export async function registerSocketTask() {
  await BackgroundFetch.registerTaskAsync(SOCKET_TASK, {
    minimumInterval: 15, // Intervalo mínimo en segundos
    stopOnTerminate: false,
    startOnBoot: true,
  })
}