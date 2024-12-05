import { User } from './user.type'
import { suscessResponse } from './utils.type'

export type AuthResponse = suscessResponse<{
  access_token: string
  expries: string
  user: User
}>
