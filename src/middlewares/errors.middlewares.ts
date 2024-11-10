import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    //lỗi bình thường
    res.status(error.status).json(omit(error, ['status'])) //in ra lỗi nhưng mà lọc message đi
  } else {
    //lỗi khác errorWithStatus là lỗi bth, ko có status
    //lỗi tùm lum thứ
    Object.getOwnPropertyNames(error).forEach((key) => {
      enumerable: true
    })
  }
  //trả về ng dùng
  //lỗi 500 là lỗi server
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    errorInfor: omit(error, ['stack'])
  })
}
