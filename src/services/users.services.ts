import { RegisterReBody } from '~/models/requests/user.request'
import databaseServices from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/cryto'

// class dung de kiem tra mail co ton tai hay ko va chuc nang dki
class UserServices {
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async register(payload: RegisterReBody) {
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    return result
  }
}

const usersServices = new UserServices()
export default usersServices
