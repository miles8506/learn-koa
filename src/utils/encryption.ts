import crypto from 'node:crypto'

export function encryptionPassword(password: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}