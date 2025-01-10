import { StateRedux } from '@/interfaces'
import { store } from '@/store'
import { useEffect, useState } from 'react'

export const useStore = () => {
  const [storeState, setStore] = useState<StateRedux>({
    isAuth: false,
    token: null,
  })

  useEffect(() => {
    setStore(store.getState())

    store.subscribe(() => {
      setStore(store.getState())
    })
  }, [])

  return storeState
}