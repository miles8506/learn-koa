import fs from 'node:fs'
import path from 'node:path'
import { RouterContext } from '../types/base/context'
import userService from '../service/user.service'
import { IUserRegisterRequest } from '../types/users'
import { EVENT_NAME } from '../constants/eventName'
import { STATUS_CODE } from '../constants/statusCode'
import { AVATAR_BASE_PATH } from '../constants/path'

class UserController {
  async register(ctx: RouterContext) {
    const payload = ctx.request.body as IUserRegisterRequest

    try {
      await userService.register(payload)
      ctx.body = {
        message: 'success'
      }
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_INSERT_ERROR, ctx)
      return
    }
  }

  async avatar(ctx: RouterContext<unknown, Buffer>) {
    const { userId } = ctx.params

    try {
      const data = await userService.avatar(userId)

      if (!data) throw Error()

      const res = fs.readFileSync(path.resolve(AVATAR_BASE_PATH, data.filename))

      ctx.type = data.mimetype
      ctx.body = res
    } catch {
      ctx.app.emit(EVENT_NAME.ERROR, STATUS_CODE.DB_GET_ERROR, ctx)
      return
    }
  }
}

export default new UserController()
