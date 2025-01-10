import { StateRedux } from '@/interfaces'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState: StateRedux = {
  isAuth: false,
  token: null,
}

const counterSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setAuthentication: (state: StateRedux, { payload }) => {
      state.token = payload
      state.isAuth = true
    },
    removeAuthentication: (state: StateRedux) => { 
      state.token = null
      state.isAuth = false
    }
  }
})

export const { removeAuthentication, setAuthentication } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})
