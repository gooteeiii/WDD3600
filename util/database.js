// constant used to import mysql2 for use
const mysql = require('mysql2')

// pool object created and used to provide db and login info
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '1234'
})

// export object
module.exports = pool.promise()
