import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import userRouter from '../router/user.router'
import loginRouter from '../router/login.router'

const app = new Koa()

app.use(bodyParser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

export default app
