import { Next } from 'koa'
import { RouterContext } from '../types/base/context'
import { ILabelContext, IMomentLabels } from '../types/moment'
import labelService from '../service/label.service'
import { ResultSetHeader } from 'mysql2'
import { IUserRegister } from '../types/users'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class MomentMiddleware {
  async verifyLabel(
    ctx: RouterContext<{ user: IUserRegister; labels: ILabelContext[] }>,
    next: Next
  ) {
    const { labels } = ctx.request.body as IMomentLabels
    ctx.labels = []

    try {
      for (const label of labels) {
        const data = await labelService.queryLabelByName(label)

        if (data.length) {
          const { id, name } = data[0]
          ctx.labels.push({ id, name })
        } else {
          const { insertId: id } = (await labelService.add(
            label
          )) as ResultSetHeader
          ctx.labels.push({ id, name: label })
        }
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_GET_ERROR, ctx)
      return
    }

    await next()
  }
}

export default new MomentMiddleware()
