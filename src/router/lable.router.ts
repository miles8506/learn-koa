import KoaRouter from '@koa/router'
import loginMiddleware from '../middleware/login.middleware'
import labelController from '../controller/label.controller'

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.post('/', loginMiddleware.auth, labelController.add)
labelRouter.get('/', labelController.list)

export default labelRouter
