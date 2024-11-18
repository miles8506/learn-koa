import jwt from 'jsonwebtoken'
import { RouterContext } from '../types/base/context'
import { ILoginResponse } from '../types/login'
import { privateKey } from '../constants/keys'
import { IUser } from '../types/users'

class LoginController {
  login(ctx: RouterContext<{ user: IUser }, ILoginResponse>) {
    const user = ctx.user

    const token = jwt.sign(user, privateKey, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = { ...user, token }
  }
}

export default new LoginController()
