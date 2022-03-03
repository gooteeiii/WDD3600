// import sequelize
const Sequelize = require('sequelize')

// import sequlize from database file
const sequelize = require('../util/database')

// cart model defined
const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

// export cart.js
module.exports = Cart
