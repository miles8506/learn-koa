import Router from '@koa/router'
import userController from '../controller/user.controller'
import userMiddleware from '../middleware/user.middleware'

const userRouter = new Router({ prefix: '/users' })

userRouter.post(
  '/register',
  userMiddleware.verifyRegister,
  userMiddleware.crypto,
  userController.register
)

userRouter.get('/avatar/:userId', userController.avatar)

export default userRouter
