export interface suscessResponse<Data> {
  messsage: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
