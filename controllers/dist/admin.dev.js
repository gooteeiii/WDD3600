"use strict";

var _require = require('express/lib/response'),
    redirect = _require.redirect;

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
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(function (result) {
    console.log(result);
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
  req.user.getProducts({
    where: {
      id: prodId
    }
  }) // Product.findById(prodId)
  .then(function (products) {
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
  Product.findById(prodId).then(function (product) {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save();
  }).then(function (result) {
    console.log('Updated Product!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  req.user.getProducts().then(function (products) {
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
  Product.findById(prodId).then(function (product) {
    return product.destroy();
  }).then(function (result) {
    console.log('Destroyed Product!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};
//# sourceMappingURL=admin.dev.js.map
