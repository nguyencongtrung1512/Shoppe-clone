import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { ClearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accsessToken: string
  constructor() {
    this.accsessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accsessToken && config.headers) {
          config.headers.authorization = this.accsessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    //add a reponse interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          const data = response.data as AuthResponse
          this.accsessToken = data.data.access_token
          setAccessTokenToLS(this.accsessToken)
          setProfileToLS(data.data.user)
        } else if (url === '/logout') {
          this.accsessToken = ''
          ClearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
