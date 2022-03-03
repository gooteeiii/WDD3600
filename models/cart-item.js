// import sequelize
const Sequelize = require('sequelize')

// import sequlize from database file
const sequelize = require('../util/database')

// cart model defined
const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
})

// export cart-item.js
module.exports = CartItem
