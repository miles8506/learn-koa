import connection from '../app/database'
import { IMomentRequest } from '../types/moment'

class MomentService {
  async add(payload: IMomentRequest & { userId: number }) {
    const { content, userId } = payload

    const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?)`
    await connection.execute(statement, [content, userId])
  }
}

export default new MomentService()
