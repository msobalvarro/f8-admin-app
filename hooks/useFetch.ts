import { useCallback, useEffect, useState } from 'react'
import { axiosInstance } from '@/services/axiosInstance'
import { AxiosError } from 'axios'
import { logoutService } from '@/services/authentication'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { PropsAxiosIntance } from '@/interfaces'
import { serverAddress } from '@/constants/constanst'

export const useFetch = () => {
  const fetchHttp = (endpoint: string) => fetch(`${serverAddress}/${endpoint}`)

  return { fetchHttp }
}

export const useAxios = <T = any>({ endpoint, data: dataBody, autoFetch = true }: PropsAxiosIntance) => {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const response = await axiosInstance<T>({
        url: endpoint,
        method: 'GET',
        data: dataBody,
      })

      setStatus(response.status)
      setData(response?.data)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          await logoutService()
        }

        if (err.code === 'ERR_NETWORK') {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Internet Connection',
            textBody: `Connection refused`
          })
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: String(err?.response?.data)
          })
        }

        setError(String(err?.response?.data))
      }
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [])

  return { data, isLoading, error, status, refetch: fetchData }
}
