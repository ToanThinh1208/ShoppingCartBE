import { RegisterReBody } from '~/models/requests/User.request'
import databaseServices from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/cryto'
import { signToken } from '~/utils/jwt'
import { ObjectId } from 'mongodb'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { TokenType } from '~/constants/enums'

// class dung de kiem tra mail co ton tai hay ko va chuc nang dki
class UserServices {
  private signAccessToken(user_id: string) {
    return signToken({
      //bug "invalid expiresIn option for string payload
      //là do chưa định nghĩa dạng token nên mới bị hết hạn
      payload: { user_id, token_type: TokenType.AccessToken },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  async checkEmailExist(email: string) {
    //payload là những gì người dùng gửi lên
    //const { email, password } = payload
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async register(payLoad: RegisterReBody) {
    const user_id = new ObjectId()
    const result = await databaseServices.users.insertOne(
      new User({
        _id: user_id,
        ...payLoad,
        password: hashPassword(payLoad.password),
        date_of_birth: new Date(payLoad.date_of_birth)
      })
    )
    //tạo chữ kí
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])
    //lưu vào database
    await databaseServices.refresh_tokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return {
      access_token,
      refresh_token
    }
  }
}

const usersServices = new UserServices()
export default usersServices
