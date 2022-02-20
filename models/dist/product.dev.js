"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// fs constant is holding a  a File object
var fs = require('fs'); // path constant is holding a required path object, providing a location to access


var path = require('path'); // will write data content to products.json file


var p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json'); // call back function to read file content

var getProductsFromFile = function getProductsFromFile(cb) {
  fs.readFile(p, function (err, fileContent) {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}; // exports a product object with all relevant data: title, imgUrl, description, price


module.exports =
/*#__PURE__*/
function () {
  function Product(title, imageUrl, description, price) {
    _classCallCheck(this, Product);

    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  } // writes product object data as a string to a file


  _createClass(Product, [{
    key: "save",
    value: function save() {
      var _this = this;

      this.id = Math.random().toString();
      getProductsFromFile(function (products) {
        products.push(_this);
        fs.writeFile(p, JSON.stringify(products), function (err) {
          console.log(err);
        });
      });
    } // similar to a utility function that calls not on a single instance of an object but retrieves all data from object.

  }], [{
    key: "fetchall",
    value: function fetchall(cb) {
      getProductsFromFile(cb);
    }
  }, {
    key: "findById",
    value: function findById(id, cb) {
      getProductsFromFile(function (products) {
        var product = products.find(function (p) {
          return p.id === id;
        });
        cb(product);
      });
    }
  }]);

  return Product;
}();
//# sourceMappingURL=product.dev.js.map
