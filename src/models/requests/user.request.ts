import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

// quy dinh du lieu gui len server
export interface RegisterReBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LoginReBody {
  email: string
  password: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
}
