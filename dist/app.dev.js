"use strict";

// requires path object, the object is defined in the other .js files
var path = require('path'); // requires express module installed


var express = require('express'); // requires body-parser object, defined on other .js pages


var bodyParser = require('body-parser');

var errorController = require('./controllers/error.js'); // creates express object named app


var app = express(); // sets global config value, this is settings the default engine and its location

app.set('view engine', 'ejs');
app.set('views', 'views'); // creates objects with a path defined

var adminRoutes = require('./routes/admin');

var shopRoutes = require('./routes/shop'); // not sure


app.use(bodyParser.urlencoded({
  extended: false
})); // defines a location to allow access to files you otherwise could not access

app.use(express["static"](path.join(__dirname, 'public'))); // defines page locations

app.use('/admin', adminRoutes);
app.use(shopRoutes); // defines response for a url error 404

app.use(errorController.get404); // listens on port 3000

app.listen(3000);
//# sourceMappingURL=app.dev.js.map
