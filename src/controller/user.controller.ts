import { RouterContext } from '../types/base/context'
import userService from '../service/user.service'
import { IUserRegisterRequest } from '../types/users/register'

class UserController {
  async register(ctx: RouterContext) {
    const payload = ctx.request.body as IUserRegisterRequest

    await userService.register(payload)

    ctx.body = {
      message: 'success'
    }
  }
}

export default new UserController()
