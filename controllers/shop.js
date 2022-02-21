// constant holding required product location
const Product = require('../models/product')

const Cart = require('../models/cart')

// export function to get all products
exports.getProducts = (req, res, next) => {
  Product.fetchall((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
}

// export function to get singular product
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    console.log(product)
  })
  res.redirect('/')
}

// export function to get content for shop page
exports.getIndex = (req, res, next) => {
  Product.fetchall((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
}

// export function to get content for cart page
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchall(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }

      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
    })
  })
}

// export function to get content for cart page
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}

// export function to get content for orders page
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
}

// export function to get content for checkout page
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}
