import connection from '../app/database'

class FileService {
  async add(filename: string, mimetype: string, size: number, user_id: number) {
    const statement = `INSERT INTO avatar(filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`

    const [data] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      user_id
    ])

    return data
  }
}

export default new FileService()
