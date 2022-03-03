// import sequelize
const Sequelize = require('sequelize')

// import sequlize from database file
const sequelize = require('../util/database')

// cart model defined
const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

// export cart-item.js
module.exports = Order
