// old  content, not currently used
const path = require('path')

// express object required
const express = require('express')

// shopController object required
const shopController = require('../controllers/shop')

//import middle auth check script
const isAuth = require('../middleware/is-auth')

// creating object utlizing express router function
const router = express.Router()

// all router.get's are providing the path and calling a get function appropriate to the pages content, the content is specific to what shoppers would use
router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProduct)

router.get('/cart', isAuth, shopController.getCart)

router.post('/cart', isAuth, shopController.postCart)

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct)

router.post('/create-order', isAuth, shopController.postOrder)

router.get('/orders', isAuth, shopController.getOrders)

// export router object to other pages
module.exports = router
