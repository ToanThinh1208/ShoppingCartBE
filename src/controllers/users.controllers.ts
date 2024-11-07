import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
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

  try {
    const isDup = await usersServices.checkEmailExist(email)
    if (isDup) {
      const customError = new Error('Email has been used')
      Object.defineProperty(customError, 'message', {
        enumerable: true
      })
      throw customError
    }

    const result = await usersServices.register(req.body)

    res.status(201).json({
      message: 'Register success',
      data: result
    })
  } catch (error) {
    res.status(422).json({
      message: 'Register failed',
      error
    })
  }
}
