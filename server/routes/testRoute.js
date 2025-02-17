const { Pool } = require('pg')
require('dotenv').config()

const pool = require('../config/db')

const testQuery = async () => {
  try {
    const res = await pool.query('SELECT * FROM users;')
    console.log(res.rows) // Display the results
  } catch (err) {
    console.error('Error executing query', err.stack)
  } finally {
    await pool.end() // Close the connection
  }
}

testQuery()
