"use strict";

// import mongodb
var mongodb = require('mongodb'); // extract mongoclient constructor


var MongoClient = mongodb.MongoClient; // method wrapper for connection

var mongoConnect = function mongoConnect(callback) {
  // create connection to mongodb
  MongoClient.connect('mongodb+srv://aj:1234@cluster0.v0uea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(function (client) {
    console.log('Connected!');
    callback(client);
  })["catch"](function (err) {
    console.log(err);
  });
}; // export methods


module.exports = mongoConnect;
//# sourceMappingURL=database.dev.js.map
