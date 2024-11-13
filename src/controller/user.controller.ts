import { DefaultContext, DefaultState, Middleware } from 'koa'
import userService from '../service/user.service'

class UserController {
  register: Middleware<DefaultState, DefaultContext, unknown> = () => {
    userService.register()
  }
}

export default new UserController()
