import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expries: string
  user: User
}>
