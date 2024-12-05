type Role = 'User' | 'Admin'
export interface User {
  _id: string
  name: string
  email: string
  roles: string[]
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
