"use strict";

// requires path object, the object is defined in the other .js files
var path = require('path'); // requires express module installed


var express = require('express'); // requires body-parser object, defined on other .js pages


var bodyParser = require('body-parser'); // imports error controller location


var errorController = require('./controllers/error'); // import mongoconnect method


var mongoConnect = require('./util/database').mongoConnect; // import User model


var User = require('./models/user'); // creates express object named app


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
  User.findByPk('1').then(function (user) {
    req.user = new User(user.name, user.email, user.cart, user._id);
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
}); // defines page locations

app.use('/admin', adminRoutes);
app.use(shopRoutes); // defines response for a url error 404

app.use(errorController.get404); // execute mongoconnect method

mongoConnect(function () {
  app.listen(3000);
});
//# sourceMappingURL=app.dev.js.map
