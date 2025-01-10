export interface LoginResponse {
  error?: string
  token?: string
}

export interface StateRedux {
  isAuth: boolean
  token?: string | null
}

export interface PropsAxiosIntance {
  endpoint: string
  data?: object,
  params?: object
  autoFetch?: boolean
}

export interface ProductsPropierties {
  archived: boolean
  name: string
  description: string
  unitPrice: number
  images: string[]
  pinned: boolean
}

export interface ProductsResponse extends ProductsPropierties {
  _id: string
}

export interface FileUploadedResponse {
  fileName: string
}

export interface PreferencesPropierties {
  key: string
  value: string
}

export interface PreferenceResponse extends PreferencesPropierties {
  _id: string
}

export interface MessagesResponse {
  _id: string
  fullName: string
  company: string
  email: string
  phoneNumber: string
  message: string
  archived?: boolean
  createdAt: string
}


export interface ServicesPropierties { 
  _id: string
  title: string
  description: string  
  images: string[]
  archived?: boolean
  pinned?: boolean
}
