"use strict";

var mysql = require('mysql2');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '1234'
});
module.exports = pool.promise();
//# sourceMappingURL=database.dev.js.map
