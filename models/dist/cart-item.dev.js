"use strict";

// import sequelize
var Sequelize = require('sequelize'); // import sequlize from database file


var sequelize = require('../util/database'); // cart model defined


var CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
}); // export cart-item.js

module.exports = CartItem;
//# sourceMappingURL=cart-item.dev.js.map
