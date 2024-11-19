import { IUser } from '../types/users'
import {
  IMomentListRequest,
  IMomentListResponse,
  IMomentRequest
} from '../types/moment'
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
      return
    }
  }

  async list(ctx: RouterContext<unknown, { data: IMomentListResponse[] }>) {
    const query = ctx.query as unknown as IMomentListRequest

    try {
      const data = await momentService.list(query)
      ctx.body = {
        data
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
      return
    }
  }

  async detail(ctx: RouterContext<unknown, { data: IMomentListResponse }>) {
    const { id } = ctx.params

    try {
      const res = await momentService.queryById(id)
      ctx.body = {
        data: res[0]
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.NOT_FOUND_MOMENT_ID, ctx)
      return
    }
  }
}

export default new MomentController()
