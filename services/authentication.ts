import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginResponse } from '@/interfaces'
import { store, setAuthentication, removeAuthentication } from '@/store'
import { axiosInstance } from './axiosInstance'
import { Alert } from 'react-native'
import { serverAddress } from '@/constants/constanst'

export const authenticationService = async (username: string, password: string): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', { username, password })

  if (data?.error) throw new Error(data.error)

  if (data?.token) {
    await AsyncStorage.setItem('token', data?.token)
  }

  store.dispatch(setAuthentication(data?.token))
  return data
}

export const logoutService = async () => {
  store.dispatch(removeAuthentication())
  await AsyncStorage.removeItem('token')
}

export const getInitState = async () => {
  const token = await AsyncStorage.getItem('token')

  if (token) {
    store.dispatch(setAuthentication(token))
  }
}

export const getToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem('token')

  return token
}
