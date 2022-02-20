"use strict";

// constant holding required product location
var Product = require('../models/product');

var Cart = require('../models/cart'); // export function to get all products


exports.getProducts = function (req, res, next) {
  Product.fetchall(function (products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
}; // export function to get singular product


exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId;
  Product.findById(prodId, function (product) {
    console.log(product);
  });
  res.redirect('/');
}; // export function to get content for shop page


exports.getIndex = function (req, res, next) {
  Product.fetchall(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}; // export function to get content for cart page


exports.getCart = function (req, res, next) {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  });
}; // export function to get content for cart page


exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findById(prodId, function (product) {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}; // export function to get content for orders page


exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  });
}; // export function to get content for checkout page


exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};
//# sourceMappingURL=shop.dev.js.map
