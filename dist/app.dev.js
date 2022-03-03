"use strict";

// requires path object, the object is defined in the other .js files
var path = require('path'); // requires express module installed


var express = require('express'); // requires body-parser object, defined on other .js pages


var bodyParser = require('body-parser'); // imports error controller location


var errorController = require('./controllers/error'); // imports sequelize database location


var sequelize = require('./util/database'); // import sequelize models location


var Product = require('./models/product');

var User = require('./models/user');

var Cart = require('./models/cart');

var CartItem = require('./models/cart-item');

var Order = require('./models/order');

var OrderItem = require('./models/order-item'); // creates express object named app


var app = express(); // sets global config value, this is settings the default engine and its location

app.set('view engine', 'ejs');
app.set('views', 'views'); // creates objects with a path defined

var adminRoutes = require('./routes/admin');

var shopRoutes = require('./routes/shop'); // not sure


app.use(bodyParser.urlencoded({
  extended: false
})); // defines a location to allow access to files you otherwise could not access

app.use(express["static"](path.join(__dirname, 'public'))); // registering middleware, function call to database to retrieve user

app.use(function (req, res, next) {
  User.findByPk(1).then(function (user) {
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
}); // defines page locations

app.use('/admin', adminRoutes);
app.use(shopRoutes); // defines response for a url error 404

app.use(errorController.get404); // relates modules to database

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
}); // checks models defined, creates tables for them and relations if they do not already exist

sequelize // .sync({ force: true })
.sync().then(function (result) {
  return User.findByPk(1); // console.log(result)
}).then(function (user) {
  if (!user) {
    return User.create({
      name: 'Max',
      email: 'test@test.com'
    });
  }

  return user;
}).then(function (user) {
  // console.log(user)
  return user.createCart();
}).then(function (cart) {
  app.listen(3000);
})["catch"](function (err) {
  console.log(err);
});
//# sourceMappingURL=app.dev.js.map
