import { RouterContext } from '../types/base/context'

class FileController {
  single(ctx: RouterContext) {
    ctx.body = {
      message: 'success'
    }
  }
}

export default new FileController()
