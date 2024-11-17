import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { ILoginRequest, ILoginResponse } from '../types/login/login'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import userService from '../service/user.service'
import { encryptionPassword } from '../utils/encryption'

class LoginMiddleware {
  async verify(
    ctx: RouterContext<{ user: Omit<ILoginResponse, 'token'> }>,
    next: Next
  ) {
    const { name, password } = ctx.request.body as ILoginRequest

    if (!name.trim() || !password.trim()) {
      ctx.app.emit(
        EVENT_NAME.ERROR,
        STATUS_CODE.ACCOUNT_OR_PASSWORD_REQUIRED,
        ctx
      )
      return
    }

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

    await next()
  }
}

export default new LoginMiddleware()
