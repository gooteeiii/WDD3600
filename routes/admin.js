// old  content, not currently used
const path = require('path')

// express object required
const express = require('express')

// import validator
const { body }  = require('express-validator')

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
router.post(
    '/add-product', 
    [
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price').isFloat(),
        body('description')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth, 
    adminController.postAddProduct)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)

router.post(
    '/edit-product', 
    [
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price').isFloat(),
        body('description')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth, 
    adminController.postEditProduct)

router.post('/delete-product', isAuth, adminController.postDeleteProduct)

// export router object to other pages
module.exports = router
