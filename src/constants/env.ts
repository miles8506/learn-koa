import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT
} = process.env
