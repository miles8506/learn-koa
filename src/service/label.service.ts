import connection from '../app/database'
import { ILabelResponse } from '../types/label'

class LabelService {
  async add(name: string) {
    const statement = `INSERT INTO label (name) VALUES (?);`

    const [data] = await connection.execute(statement, [name])

    return data
  }

  async list() {
    const statement = `SELECT * FROM label;`

    const [data] = await connection.execute(statement)

    return data as ILabelResponse[]
  }

  async queryLabelByName(name: string) {
    const statement = `SELECT * FROM label WHERE label.name = ?`

    const [data] = await connection.execute(statement, [name])

    return data as ILabelResponse[]
  }
}

export default new LabelService()
