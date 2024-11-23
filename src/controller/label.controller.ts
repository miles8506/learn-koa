import { QueryResult } from 'mysql2'
import labelService from '../service/label.service'
import { RouterContext } from '../types/base/context'
import { ILabelRequest, ILabelResponse } from '../types/label'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class LabelController {
  async add(ctx: RouterContext<unknown, { data: QueryResult }>) {
    const { name } = ctx.request.body as ILabelRequest

    try {
      const data = await labelService.add(name)
      ctx.body = { data }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_UPDATE_ERROR, ctx)
      return
    }
  }

  async list(ctx: RouterContext<unknown, { data: ILabelResponse[] }>) {
    try {
      const data = await labelService.list()

      ctx.body = { data }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_GET_ERROR, ctx)
      return
    }
  }
}

export default new LabelController()
