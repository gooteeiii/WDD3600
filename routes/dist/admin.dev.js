"use strict";

// old  content, not currently used
var path = require('path'); // express object required


var express = require('express'); // adminController object required


var adminController = require('../controllers/admin'); // creating object utlizing express router function


var router = express.Router(); // all router.get's are providing the path and calling a get function appropriate to the pages content, the content is specific to admin use
// /admin/add-product => GET

router.get('/add-product', adminController.getAddProduct); // /admin/products => GET

router.get('/products', adminController.getProducts); // /admin/add-product => POST

router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct); // export router object to other pages

module.exports = router;
//# sourceMappingURL=admin.dev.js.map
