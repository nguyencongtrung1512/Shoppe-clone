import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'

export function isAxiosError(error: unknown): error is AxiosError<unknown> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
//đoạn code java để tách số tiền tền tố ngăn cách bởi dấu chấm, sử dụng Intl.NumberFormat 1000000 >> 1.000.000

export function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}
// tách 1200 >> 1.2k

export const rateSale = (originalPrice: number, salePrice: number) =>
  Math.round(((originalPrice - salePrice) / originalPrice) * 100) + '%'