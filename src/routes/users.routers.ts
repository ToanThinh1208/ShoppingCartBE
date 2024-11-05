import express from 'express'
import { register } from 'module'
import { registerController } from '~/controllers/users.controllers'
import { registerValiator } from '~/middlewares/users.middlewares'


//dựng userRouter
const userRouter = express.Router()

// userRouter.post('/login', loginValidator, loginController)
/*  Description: Register a new user
    Path: /register
    Method: POST
    Body: {
        email: string,
        password: string,
        confirm_password: string
        date_of_birth: ISO8601

    } 
*/
userRouter.post('/register', registerValiator, registerController)

export default userRouter
