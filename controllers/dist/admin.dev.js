"use strict";

// const { redirect } = require('express/lib/response')
// const Product = require('../models/product')
var Product = require('../models/product');

exports.getAddProduct = function (req, res, next) {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description;
  var product = new Product(title, price, description, imageUrl, null, req.user._id);
  product.save().then(function (result) {
    // console.log(result)
    console.log('Created Product');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  var prodId = req.params.productId;
  Product.findByPk(prodId).then(function (products) {
    var product = products[0];

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postEditProduct = function (req, res, next) {
  var prodId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedPrice = req.body.price;
  var updatedImageUrl = req.body.imageUrl;
  var updatedDesc = req.body.description;
  var product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);
  product.save().then(function (result) {
    console.log('Updated Product!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.fetchAll().then(function (products) {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  Product.deleteById(prodId).then(function () {
    console.log('Destroyed Product!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};
//# sourceMappingURL=admin.dev.js.map
