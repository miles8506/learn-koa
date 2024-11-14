import connection from "../app/database";
import { IUserRegisterRequest, IUserRegister } from "../types/users/register";

class UserService {
  async register({ name, password }: IUserRegisterRequest) {
    const statement = `INSERT INTO user (name, password) VALUES(?, ?)`

    const [result] = await connection.execute(statement, [name, password])

    return result
  }

  async findUserByName(name: string) {
    const statement = `SELECT * FROM user WHERE name = ?`

    const [result] = await connection.execute(statement, [name])

    return result as IUserRegister[]
  }
}

export default new UserService()
