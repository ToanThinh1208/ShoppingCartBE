import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

// ham kiem tra xac thuc tra ra promise danh sach loi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) //chỉ chạy thì mới trả ValidationChain để check lỗi từ req
    const errors = validationResult(req) //sau đó mới dùng thg ValtionResult để lấy lỗi ra từ req
    if (errors.isEmpty()) {
      //nếu ko bug thì next
      return next()
    } else {
      const errorObject = errors.mapped() //lưu tất cả các lỗi dạng object
      const errorEntity = new EntityError({ errors: {} }) //tạo 1 object rỗng chứa các lỗi cùng
      for (const key in errorObject) {
        //key là index của từng trong errorObject: 1 cục bug siêu bự
        //msg là 1 thg object nhỏ trong 1 object lớn
        const { msg } = errorObject[key]
        if (msg instanceof ErrorWithStatus && msg.status != HTTP_STATUS.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }
        errorEntity.errors[key] = msg
      }
      next(errorEntity)
    }
  }
}

//errorObject: chỉ là tập hợp các lỗi dưới dạng object nên khi in ra sẽ có rất nhiều thông tin
//EntityError: là tập hợp lại các lỗi cùng 1 status và chỉ in ra các message
