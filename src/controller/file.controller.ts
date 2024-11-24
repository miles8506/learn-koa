import { QueryResult } from 'mysql2'
import fileService from '../service/file.service'
import { RouterContext } from '../types/base/context'
import { IUser } from '../types/users'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'

class FileController {
  async single(ctx: RouterContext<{ user: IUser }, { data: QueryResult }>) {
    try {
      const { filename, mimetype, size } = ctx.file
      const { id } = ctx.user
      const data = await fileService.add(filename, mimetype, size, id)

      ctx.body = { data }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
      return
    }
  }
}

export default new FileController()
