import KoaRouter from '@koa/router'
import loginController from '../controller/login.controller'
import loginMiddleware from '../middleware/login.middleware'

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', loginMiddleware.verify, loginController.login)

export default loginRouter
