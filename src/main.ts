import Koa from 'koa'
import Router from '@koa/router'
import { PORT } from './constants'

const app = new Koa()
const userRouter = new Router({ prefix: '/users' })

userRouter.get('/list', (ctx, next) => {
  ctx.body = 'user list'
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(PORT, () => {
  console.log(`running ${PORT} port`);
})
