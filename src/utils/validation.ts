import { ValidationChain, validationResult } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";
import {Request, Response, NextFunction} from 'express'

// ham kiem tra xac thuc tra ra promise danh sach loi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
    return async (req:Request, res: Response, next: NextFunction) => {
        await validation.run(req)
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }else {
            res.status(422).json({
                message: 'Register validation failed',
                errors: errors.mapped()
            })
        }
    }
}