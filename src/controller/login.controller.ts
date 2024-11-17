import jwt from 'jsonwebtoken'
import { RouterContext } from '../types/base/context'
import { ILoginResponse } from '../types/login/login'
import { privateKey } from '../constants/keys'

class LoginController {
  login(
    ctx: RouterContext<{ user: Omit<ILoginResponse, 'token'> }, ILoginResponse>
  ) {
    const user = ctx.user

    const token = jwt.sign(user, privateKey, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = { ...user, token }
  }
}

export default new LoginController()
