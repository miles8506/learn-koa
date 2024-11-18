import Router from '@koa/router'
import momentController from '../controller/moment.controller'
import loginMiddleware from '../middleware/login.middleware'

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/add', loginMiddleware.auth, momentController.add)
momentRouter.get('/list', momentController.list)

export default momentRouter
