import connection from '../app/database'
import { ICommentRequest } from '../types/comment'

class CommentService {
  async add({ user_id, content, moment_id, comment_id }: ICommentRequest & { user_id: number }) {
    const statement = `INSERT INTO comment (user_id, content, moment_id, comment_id) VALUES(?, ?, ?, ?);`

    const [data] = await connection.execute(statement, [
      user_id,
      content,
      moment_id,
      comment_id ?? null
    ])

    return data
  }
}

export default new CommentService()
