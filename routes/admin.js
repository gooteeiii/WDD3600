// old  content, not currently used
const path = require('path')

// express object required
const express = require('express')

// adminController object required
const adminController = require('../controllers/admin')

//import middle auth check script
const isAuth = require('../middleware/is-auth')

// creating object utlizing express router function
const router = express.Router()

// all router.get's are providing the path and calling a get function appropriate to the pages content, the content is specific to admin use
// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct)

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)

router.post('/edit-product', isAuth, adminController.postEditProduct)

router.post('/delete-product', isAuth, adminController.postDeleteProduct)

// export router object to other pages
module.exports = router
