import Router from '@koa/router'

const userRouter = new Router({ prefix: '/users' })

userRouter.get('/list', (ctx) => {
  ctx.body = 'user list'
})

export default userRouter
