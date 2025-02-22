import { Asset } from 'react-native-image-picker'

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

export interface PreferenceContext {
  refetch: () => void
}

export interface UsersContext {
  refetch: () => void
}

export interface UserResponse {
  _id: string
  name: string
  username: string
  createdAt: string
  updatedAt: string
}

export type JobsResponse = {
  _id: string
  title: string
  location: string
  description: string
  image?: string | null
  tags: string[]
  active: boolean
  applicationsCount: number
  createdAt: string
  updatedAt: string
}

export type ApplicationsByJobResponse = {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  cv: string
  archived: boolean
  createdAt: string
  updatedAt: string
  job?: JobsResponse
}

export type JobUpdateProps = {
  title: string
  location: string
  description: string
  image?: Asset | string | null
  tags: string[]
}

export type NavigateParamList = {
  UpdateJob?: { id: string } | undefined
  Product?: { id: string } | undefined
  Service?: { id: string } | undefined
  VacantApplication?: { applicationId: string }
  ApplicationsByJob?: {
    jobId: string
    jobTitle: string
  }
  UpdatePasswordUser: {
    user: UserResponse
  }
}