"use strict";

// import sequelize
var Sequelize = require('sequelize'); // import sequlize from database file


var sequelize = require('../util/database'); // cart model defined


var Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}); // export cart-item.js

module.exports = Order;
//# sourceMappingURL=order.dev.js.map
