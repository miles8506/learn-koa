import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { IUser } from '../types/users'
import momentService from '../service/moment.service'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class MomentMiddleware {
  async permission(ctx: RouterContext<{ user: IUser }>, next: Next) {
    const { id: userId } = ctx.user
    const { id: momentId } = ctx.params

    const data = await momentService.permission(userId.toString(), momentId)

    if (!data) {
      ctx.app.emit(
        EVENT_NAME.ERROR,
        STATUS_CODE.NOT_UPDATE_MOMENT_PERMISSION,
        ctx
      )
      return
    }

    await next()
  }
}

export default new MomentMiddleware()
