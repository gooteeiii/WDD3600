"use strict";

// import sequelize
var Sequelize = require('sequelize'); // import sequlize from database file


var sequelize = require('../util/database'); // cart model defined


var Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}); // export cart.js

module.exports = Cart;
//# sourceMappingURL=cart.dev.js.map