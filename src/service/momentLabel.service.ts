import connection from '../app/database'
import { IMomentLabelResponse } from '../types/moment_label'

class MomentLabelService {
  async add(lable_id: number, moment_id: string) {
    const statement = `INSERT INTO moment_label (label_id, moment_id) VALUES(?, ?)`

    const [data] = await connection.execute(statement, [lable_id, moment_id])

    return data
  }

  async hasExist(label_id: number, moment_id: string) {
    const statement = `SELECT * FROM moment_label WHERE moment_label.label_id = ? && moment_label.moment_id = ?`

    const [data] = await connection.execute(statement, [label_id, moment_id])

    return !!(data as IMomentLabelResponse[]).length
  }
}

export default new MomentLabelService()
