import KoaRouter from '@koa/router'
import fileController from '../controller/file.controller'
import loginMiddleware from '../middleware/login.middleware'
import fileMiddleware from '../middleware/file.middleware'

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post(
  '/avatar',
  loginMiddleware.auth,
  fileMiddleware.avatar,
  fileController.single
)

export default fileRouter
