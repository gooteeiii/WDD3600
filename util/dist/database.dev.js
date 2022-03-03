"use strict";

// constant used to import mysql2 for use
var Sequelize = require('sequelize'); // pool object created and used to provide db and login info


var sequelize = new Sequelize('node-complete', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost'
});
module.exports = sequelize;
//# sourceMappingURL=database.dev.js.map
