import Router from '@koa/router'
import momentController from '../controller/moment.controller'
import loginMiddleware from '../middleware/login.middleware'
import userMiddleware from '../middleware/user.middleware'

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/add', loginMiddleware.auth, momentController.add)
momentRouter.get('/list', momentController.list)
momentRouter.get('/:momentId', momentController.detail)
momentRouter.patch(
  '/:momentId',
  loginMiddleware.auth,
  userMiddleware.permission,
  momentController.update
)
momentRouter.delete(
  '/:momentId',
  loginMiddleware.auth,
  userMiddleware.permission,
  momentController.remove
)

export default momentRouter
