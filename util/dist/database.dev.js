"use strict";

// constant used to import mysql2 for use
var mysql = require('mysql2'); // pool object created and used to provide db and login info


var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '1234'
}); // export object

module.exports = pool.promise();
//# sourceMappingURL=database.dev.js.map
