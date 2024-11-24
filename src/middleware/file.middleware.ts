import multer from '@koa/multer'
import { AVATAR_BASE_PATH } from '../constants/path'

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, AVATAR_BASE_PATH)
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

class FileMiddleware {
  avatar = upload.single('avatar')
}

export default new FileMiddleware()
