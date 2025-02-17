const { Pool } = require('pg')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.PG_SSL_CA,
  },
}

const pool = new Pool(config)

module.exports = pool
