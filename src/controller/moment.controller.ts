import { IUser } from '../types/users'
import {
  IMomentListRequest,
  IMomentListResponse,
  IMomentRequest,
  IMomentUpdateRequest
} from '../types/moment'
import { RouterContext } from '../types/base/context'
import momentService from '../service/moment.service'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import { QueryResult } from 'mysql2'

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
    const { momentId } = ctx.params

    try {
      const res = await momentService.queryById(momentId)
      ctx.body = {
        data: res[0]
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.NOT_FOUND_MOMENT_ID, ctx)
      return
    }
  }

  async update(ctx: RouterContext<unknown, { data: QueryResult }>) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body as IMomentUpdateRequest

    try {
      const data = await momentService.update(momentId, content)
      ctx.body = { data }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_UPDATE_ERROR, ctx)
      return
    }
  }

  async remove(ctx: RouterContext<unknown, { data: QueryResult }>) {
    const { momentId } = ctx.params

    try {
      const data = await momentService.remove(momentId)
      ctx.body = {
        data
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_DELETE_ERROR, ctx)
      return
    }
  }
}

export default new MomentController()
