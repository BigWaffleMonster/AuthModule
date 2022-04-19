import {IUser} from '../IUser'

export interface AuthResponse {
  userId: IUser
  accessToken: string
  refreshToken: string
}