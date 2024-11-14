import { RouterContext } from '../types/base/context'
import userService from '../service/user.service'
import { IUserRegisterRequest } from '../types/users/register'

class UserController {
  async register(ctx: RouterContext) {
    const payload = ctx.request.body as IUserRegisterRequest
    const { name, password } = payload
    
    if (name.trim().length === 0 || password.trim().length === 0) {
      ctx.body = {
        errorMessage: 'name or password is empty',
        errorCode: -1001
      }
      return 
    }

    const isExist = await userService.findUserByName(name)
    if (isExist.length === 0) {
      ctx.body = {
        errorMessage: 'name is duplicated',
        errorCode: -1002
      }
      return
    }

    await userService.register(payload)

    ctx.body = {
      message: 'success'
    }
  }
}

export default new UserController()
