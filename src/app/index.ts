import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import autoRegisterRoutes from '../utils/autoRegisterRoutes'

const app = new Koa()

app.use(bodyParser())
autoRegisterRoutes(app)

export default app
