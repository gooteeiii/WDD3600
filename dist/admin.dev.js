"use strict";

var express = require('express');

var router = express.Router(); // /admin/add-product => GET

router.get('/add-product', function (req, res, next) {
  res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
}); // /admin/add-product => POST

router.post('/add-product', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});
module.exports = router;
//# sourceMappingURL=admin.dev.js.map
