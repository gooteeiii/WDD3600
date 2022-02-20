"use strict";

var Product = require('../models/product');

exports.getProducts = function (req, res, next) {
  Product.fetchall(function (products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = function (req, res, next) {
  Product.fetchall(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = function (req, res, next) {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  });
};

exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  });
};

exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};
//# sourceMappingURL=shop.dev.js.map
