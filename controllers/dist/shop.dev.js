"use strict";

// constant holding required product location
var Product = require('../models/product'); // export function to get all products


exports.getProducts = function (req, res, next) {
  Product.fetchAll().then(function (products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
}; // export function to get singular product


exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId;
  Product.findByPk(prodId).then(function (product) {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}; // export function to get content for shop page


exports.getIndex = function (req, res, next) {
  Product.fetchAll().then(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })["catch"](function (err) {
    console.log(err);
  });
}; // export function to get content for cart page


exports.getCart = function (req, res, next) {
  req.user.getCart().then(function (products) {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}; // export function to get content for cart page


exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findbyid(prodId).then(function (product) {
    return req.user.addToCart(product);
  }).then(function (result) {
    console.log(result);
    res.redirect('/cart');
  });
  /*
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }
      return Product.findById(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
    */
};

exports.postCartDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId).then(function (result) {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  });
}; // something


exports.postOrder = function (req, res, next) {
  var fetchedCart;
  req.user.addOrder().then(function (result) {
    res.redirect('/orders');
  })["catch"](function (err) {
    return console.log(err);
  });
}; // export function to get content for orders page


exports.getOrders = function (req, res, next) {
  req.user.getOrders().then(function (orders) {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};
//# sourceMappingURL=shop.dev.js.map
