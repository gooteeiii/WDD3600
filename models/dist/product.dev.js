"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import mongodb
var mongodb = require('mongodb'); // import getDb


var getDb = require('../util/database').getDb; // class product


var Product =
/*#__PURE__*/
function () {
  function Product(title, price, description, imageUrl, id, userId) {
    _classCallCheck(this, Product);

    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  } // save method to store data in db


  _createClass(Product, [{
    key: "save",
    value: function save() {
      var db = getDb();
      var db0p;

      if (this._id) {
        // update product
        db0p = db.collection('products').updateOne({
          _id: this._id
        }, {
          $set: this
        });
      } else {
        db0p = db.collection('products').insertOne(this);
      }

      return db0p.then(function (result) {
        console.log(result);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      var db = getDb();
      return db.collection('products').find().toArray().then(function (products) {
        console.log(products);
        return products;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "findbyid",
    value: function findbyid(prodId) {
      var db = getDb();
      return db.collection('products').find({
        _id: mongodb.ObjectId(prodId)
      }).next().then(function (product) {
        console.log(product);
        return product;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(prodId) {
      var db = getDb();
      return db.collection('products').deleteOne({
        _id: new mongodb.ObjectId(prodId)
      }).then(function (result) {
        console.log('Delete');
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return Product;
}();

module.exports = Product;
//# sourceMappingURL=product.dev.js.map
