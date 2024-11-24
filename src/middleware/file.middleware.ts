import path from 'node:path'
import multer from '@koa/multer'

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      console.log(path.resolve(__dirname, '../uploads'))
      cb(null, path.resolve(__dirname, '../../uploads'))
    },
    filename(req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

class FileMiddleware {
  avatar = upload.single('avatar')
}

export default new FileMiddleware()
