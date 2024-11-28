import express from 'express'
import { register } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

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
userRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
desc: login
path: /login
method: post
body : {
    email: string,
    password: string
}
 */

userRouter.post('/login', loginValidator, wrapAsync(loginController))

/*
desc: logout
path: /logout
method: post
headers: {
    Authoriztion: 'Bearer <access_token>'
}
body : {
    refresh_token: string
}
*/

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
export default userRouter
