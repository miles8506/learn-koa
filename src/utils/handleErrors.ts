import app from '../app'
import { RouterContext } from '../types/base/context'
import { STATUS_CODE } from '../constants/statusCode'
import { EVENT_NAME } from '../constants/eventName'

app.on(
  EVENT_NAME.ERROR,
  (
    errorCode: number,
    ctx: RouterContext<unknown, { errorMessage: string; errorCode: number }>
  ) => {
    let errorMessage = ''

    switch (errorCode) {
      case STATUS_CODE.ACCOUNT_IS_DUPLICATED:
        errorMessage = 'account is duplicated'
        break
      case STATUS_CODE.ACCOUNT_OR_PASSWORD_REQUIRED:
        errorMessage = 'account or password required'
        break
      case STATUS_CODE.NOT_FOUND_USER_NAME:
        errorMessage = 'pls recheck user name'
        break
      case STATUS_CODE.USER_PASSWORD_FAILED:
        errorMessage = 'password is incorrect'
        break
      default:
        break
    }

    ctx.body = {
      errorMessage,
      errorCode
    }
  }
)