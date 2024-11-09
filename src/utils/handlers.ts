import { RequestHandler, Request, Response, NextFunction } from 'express'

export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

/*
hi sử dụng throw(error) trong catch, lỗi sẽ được "ném" lên và cần phải có try-catch ở cấp cao hơn để xử lý, 
nếu không chương trình sẽ bị gián đoạn bởi lỗi chưa được bắt.
Khi sử dụng next(error) trong catch, lỗi sẽ được chuyển tiếp tới middleware
xử lý lỗi của Express (middleware với chữ ký (err, req, res, next)), 
nơi lỗi sẽ được xử lý một cách có kiểm soát, và chương trình không bị dừng.
*/
