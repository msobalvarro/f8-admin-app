import axios from 'axios'
import { getToken, logoutService } from './authentication'
import { serverAddress } from '@/constants/constanst'

export const axiosInstance = axios.create({
  baseURL: serverAddress,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
})


axios.interceptors.response.use(
  async (e) => {
    if (e.status === 401) {
      await logoutService()
    }

    return e
  },  
)

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {    
    return Promise.reject(error.message)
  }
)