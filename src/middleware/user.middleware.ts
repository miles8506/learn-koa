import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { IUserRegisterRequest } from '../types/users'
import userService from '../service/user.service'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import { encryptionPassword } from '../utils/encryption'

class UserMiddleware {
  async verifyRegister(ctx: RouterContext, next: Next) {
    const payload = ctx.request.body as IUserRegisterRequest
    const { name, password } = payload

    if (name.trim().length === 0 || password.trim().length === 0) {
      ctx.app.emit(
        EVENT_NAME.ERROR,
        STATUS_CODE.ACCOUNT_OR_PASSWORD_REQUIRED,
        ctx
      )

      return
    }

    const isExist = await userService.findUserByName(name)
    if (isExist.length > 0) {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.ACCOUNT_IS_DUPLICATED, ctx)

      return
    }

    await next()
  }

  async crypto(ctx: RouterContext, next: Next) {
    const payload = ctx.request.body as IUserRegisterRequest

    payload.password = encryptionPassword(payload.password)

    await next()
  }
}

export default new UserMiddleware()
