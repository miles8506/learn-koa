import { QueryResult } from 'mysql2'
import commentService from '../service/comment.service'
import { RouterContext } from '../types/base/context'
import { ICommentRequest } from '../types/comment'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import { IUser } from '../types/users'

class CommentController {
  async add(ctx: RouterContext<{ user: IUser }, { data: QueryResult }>) {
    const { id } = ctx.user
    const { content, moment_id, comment_id } = ctx.request
      .body as ICommentRequest

    try {
      const data = await commentService.add({
        user_id: id,
        content,
        moment_id,
        comment_id
      })

      ctx.body = { data }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
      return
    }
  }
}

export default new CommentController()
