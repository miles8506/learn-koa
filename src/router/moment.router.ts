import Router from '@koa/router'
import momentController from '../controller/moment.controller'
import loginMiddleware from '../middleware/login.middleware'
import userMiddleware from '../middleware/user.middleware'
import momentMiddleware from '../middleware/moment.middleware'

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
momentRouter.post(
  '/:momentId/labels',
  loginMiddleware.auth,
  userMiddleware.permission,
  momentMiddleware.verifyLabel,
  momentController.labels
)

export default momentRouter
