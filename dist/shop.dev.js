"use strict";

var express = require('express');

var router = express.Router();
router.get('/', function (req, res, next) {
  res.send('<h1>Hello from Express!</h1>');
});
module.exports = router;
//# sourceMappingURL=shop.dev.js.map
