export interface SuscessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
 //cú pháp '-?' sẽ loại bỏ Undefiend củacủa key optional
export type NoUndefinedfield<T> = {
  [p in keyof T]-?: NoUndefinedfield<NonNullable<T[p]>>
}