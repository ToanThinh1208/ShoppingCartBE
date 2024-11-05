import { Request, Response } from 'express'
import { RegisterReBody } from '~/models/requests/user.request'
import { ParamsDictionary } from 'express-serve-static-core'
import usersServices from '~/services/users.services'

// ham xu ly du lieu cuoi cung
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReBody>, res: Response) => {
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
