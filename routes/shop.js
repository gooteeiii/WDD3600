// old  content, not currently used
const path = require('path')

// express object required
const express = require('express')

// shopController object required
const shopController = require('../controllers/shop')

// creating object utlizing express router function
const router = express.Router()

// all router.get's are providing the path and calling a get function appropriate to the pages content, the content is specific to what shoppers would use
router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart)

router.get('/cart', shopController.postCart)

router.get('/cart-delete-item', shopController.postCartDeleteProduct)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

// export router object to other pages
module.exports = router
