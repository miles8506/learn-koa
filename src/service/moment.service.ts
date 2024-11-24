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
    const { size = '10', offset = '0' } = payload

    const statement = `
			SELECT
        m.id id,
        m.content content,
        m.createAt create_time,
        m.updateAt update_time,
        JSON_OBJECT('id', u.id, 'name', u.name, 'create_time', u.createAt, 'update_time', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) comment_count,
				(SELECT COUNT(*) FROM moment_label md WHERE md.moment_id = m.id) label_count
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
         JSON_OBJECT('id', u.id, 'name', u.name, 'create_time', u.createAt, 'update_time', u.updateAt) user,
				 JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'label', l.name)) labels,
				 (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'user', u.name)) FROM comment c LEFT JOIN user u ON c.user_id = u.id) comment
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
			LEFT JOIN moment_label ml ON ml.moment_id = m.id
			LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `

    const [data] = await connection.execute(statement, [id])
    return data as IMomentListResponse[]
  }

  async update(id: string, content: string) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [data] = await connection.execute(statement, [content, id])

    return data
  }

  async remove(id: string) {
    const statement = `DELETE FROM moment WHERE moment.id = ?;`
    const [data] = await connection.execute(statement, [id])

    return data
  }
}

export default new MomentService()
