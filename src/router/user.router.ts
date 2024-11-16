import Router from '@koa/router'
import userController from '../controller/user.controller'
import userMiddleware from '../middleware/user.middleware'

const userRouter = new Router({ prefix: '/users' })

userRouter.post(
  '/register',
  userMiddleware.verifyRegister,
  userController.register
)

export default userRouter
