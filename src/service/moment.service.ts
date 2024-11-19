import connection from '../app/database'
import {
  IMomentListRequest,
  IMomentListResponse,
  IMomentRequest
} from '../types/moment'

class MomentService {
  async add(payload: IMomentRequest & { userId: number }) {
    const { content, userId } = payload

    const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?)`
    await connection.execute(statement, [content, userId])
  }

  async list(payload: IMomentListRequest) {
    const { size, offset } = payload

    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt create_time,
        m.updateAt update_time,
        JSON_OBJECT('id', u.id, 'name', u.name, 'create_time', u.createAt, 'update_time', u.updateAt) user
      FROM moment m
	    LEFT JOIN user u ON m.user_id = u.id
	    LIMIT ? OFFSET ?;
    `

    const [data] = await connection.execute(statement, [size, offset])

    return data as IMomentListResponse[]
  }

  async queryById(id: string) {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt create_time,
        m.updateAt update_time,
        JSON_OBJECT('id', u.id, 'name', u.name, 'create_time', u.createAt, 'update_time', u.updateAt) user
      FROM moment m
	    LEFT JOIN user u ON m.user_id = u.id
	    WHERE m.id = ?;
    `

    const [data] = await connection.execute(statement, [id])
    return data as IMomentListResponse[]
  }

  async update(id: string, content: string) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [data] = await connection.execute(statement, [content, id])

    return data
  }

  async permission(userId: string, momentId: string) {
    const statement = `SELECT * FROM moment WHERE moment.id = ? && moment.user_id = ?;`
    const [data] = await connection.execute(statement, [momentId, userId])

    return (data as IMomentListResponse[]).length > 0
  }

  async remove(id: string) {
    const statement = `DELETE FROM moment WHERE moment.id = ?;`
    const [data] = await connection.execute(statement, [id])

    return data
  }
}

export default new MomentService()
