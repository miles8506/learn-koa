import KoaRouter from '@koa/router'
import loginMiddleware from '../middleware/login.middleware'
import commentController from '../controller/comment.controller'

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', loginMiddleware.auth, commentController.add)

export default commentRouter
