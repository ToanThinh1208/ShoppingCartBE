import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import { RegisterReBody } from '~/models/requests/User.request'
import usersServices from '~/services/users.services'

// ham xu ly du lieu cuoi cung
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReBody>,
  res: Response,
  next: NextFunction
) => {
  //giờ thì ta đã thấy body là RegisterReqBody
  //việc này sẽ giúp code nhắc ta là trong body có gì
  //và ta biết đã biết chắc body là RegisterReqBody
  //nên ta cũng k cần lấy lẽ từng cái email,pasword làm gì
  const { email } = req.body

  const isDup = await usersServices.checkEmailExist(email)
  if (isDup) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED, //401
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  }

  const result = await usersServices.register(req.body)

  res.status(HTTP_STATUS.CREATED).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
