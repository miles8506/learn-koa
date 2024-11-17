import fs from 'node:fs'
import path from 'node:path'

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../config/keys/private.key')
)
const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../config/keys/public.key')
)

export { privateKey, publicKey }
