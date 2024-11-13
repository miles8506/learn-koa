import mysql from 'mysql2'
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT } from '../constants'

const pool = mysql.createPool({
  user: 'root',
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: 'localhost',
  port: Number(DATABASE_PORT),
  connectionLimit: 5
})

pool.getConnection((err, conn) => {
  if (err) throw new Error('check database')

  conn.connect((err) => {
    if (err) throw new Error('check database')
  })
})

const connection = pool.promise()

export default connection
