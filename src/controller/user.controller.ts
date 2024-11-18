import { RouterContext } from '../types/base/context'
import userService from '../service/user.service'
import { IUserRegisterRequest } from '../types/users'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class UserController {
  async register(ctx: RouterContext) {
    const payload = ctx.request.body as IUserRegisterRequest

    try {
      await userService.register(payload)
      ctx.body = {
        message: 'success'
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
    }
  }
}

export default new UserController()
