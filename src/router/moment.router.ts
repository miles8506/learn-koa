import Router from '@koa/router'
import momentController from '../controller/moment.controller'
import loginMiddleware from '../middleware/login.middleware'
import momentMiddleware from '../middleware/moment.middleware'

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/add', loginMiddleware.auth, momentController.add)
momentRouter.get('/list', momentController.list)
momentRouter.get('/:id', momentController.detail)
momentRouter.patch(
  '/update/:id',
  loginMiddleware.auth,
  momentMiddleware.permission,
  momentController.update
)

export default momentRouter
