// constant used to import mysql2 for use
const Sequelize = require('sequelize')

// pool object created and used to provide db and login info
const sequelize = new Sequelize('node-complete', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize
