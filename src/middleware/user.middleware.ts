import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { IUser, IUserRegisterRequest } from '../types/users'
import userService from '../service/user.service'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import { encryptionPassword } from '../utils/encryption'
import { HTTP_METHOD } from '../constants/method'

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

  async permission(ctx: RouterContext<{ user: IUser }>, next: Next) {
    const params = ctx.params
    const key = Object.keys(params)[0]
    const resource = key.replace('Id', '')
    const resourceId = params[key]
    const { id: userId } = ctx.user
    const method = ctx.method as HTTP_METHOD

    const data = await userService.permission(
      resource,
      userId.toString(),
      resourceId
    )

    let statusCode: number | null = null

    switch (method) {
      case HTTP_METHOD.PATCH:
        statusCode = STATUS_CODE.NOT_UPDATE_PERMISSION
        break
      case HTTP_METHOD.DELETE:
        statusCode = STATUS_CODE.NOT_DELETE_PERMISSION
        break
      default:
        break
    }

    if (!data) {
      ctx.app.emit(EVENT_NAME.ERROR, statusCode, ctx)
      return
    }

    await next()
  }
}

export default new UserMiddleware()
