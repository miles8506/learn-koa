import fs from 'node:fs'
import path from 'node:path'
import { appType } from '../types/base/app'

export default function autoRegisterRoutes(app: appType) {
  const files = fs.readdirSync(path.resolve(__dirname, '../router'))

  for (const file of files) {
    if (!file.endsWith('.router.ts')) continue

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const router = require(path.resolve(__dirname, `../router/${file}`)).default
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
