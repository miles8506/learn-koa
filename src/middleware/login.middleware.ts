import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { ILoginRequest } from '../types/login'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import userService from '../service/user.service'
import { encryptionPassword } from '../utils/encryption'
import jwt from 'jsonwebtoken'
import { publicKey } from '../constants/keys'
import { IUser } from '../types/users'

class LoginMiddleware {
  async verify(ctx: RouterContext<{ user: IUser }>, next: Next) {
    const { name, password } = ctx.request.body as ILoginRequest
    if (!name.trim() || !password.trim()) {
      ctx.app.emit(
        EVENT_NAME.ERROR,
        STATUS_CODE.ACCOUNT_OR_PASSWORD_REQUIRED,
        ctx
      )
      return
    }

    try {
      const user = (await userService.findUserByName(name))?.[0]

      if (!user) {
        ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.NOT_FOUND_USER_NAME, ctx)
        return
      }

      if (user.password !== encryptionPassword(password)) {
        ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.USER_PASSWORD_FAILED, ctx)
        return
      }

      ctx.user = { id: user.id, name: user.name }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
      return
    }

    await next()
  }

  async auth(ctx: RouterContext<{ user: IUser }>, next: Next) {
    const token = ctx.header.authorization?.replace('Bearer ', '') ?? ''

    try {
      const user = jwt.verify(token, publicKey, {
        algorithms: ['RS256']
      }) as IUser
      ctx.user = user
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.AUTHORIZATION_FAILED, ctx)
      return
    }

    await next()
  }
}

export default new LoginMiddleware()
