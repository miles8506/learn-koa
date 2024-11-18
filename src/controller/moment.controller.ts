import { IUser } from '../types/users'
import { IMomentRequest } from '../types/moment'
import { RouterContext } from '../types/base/context'
import momentService from '../service/moment.service'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class MomentController {
  async add(ctx: RouterContext<{ user: IUser }>) {
    const { content } = ctx.request.body as IMomentRequest
    const { id } = ctx.user

    try {
      await momentService.add({ content, userId: id })
      ctx.body = {
        message: 'success'
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
    }
  }
}

export default new MomentController()
