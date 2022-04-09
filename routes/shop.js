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

router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.post('/create-order', shopController.postOrder)

router.get('/orders', shopController.getOrders)

// export router object to other pages
module.exports = router
