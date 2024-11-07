import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config
//hàm tạo chữ ký
export const signToken = ({
  payload,
  privateKey, //= process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) throw reject(error)
      else resolve(token as string)
    })
  })
}
// dùng promise để có thể kí nhiều thg cùng lúc
