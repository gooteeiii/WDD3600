"use strict";

// constant holding required product location
var Product = require('../models/product'); // export function to get all products


exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
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
  Product.findByPk(prodId).then(function (products) {
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
  Product.findAll().then(function (products) {
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
  req.user.getCart().then(function (cart) {
    return cart.getProducts().then(function (products) {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}; // export function to get content for cart page


exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  var fetchedCart;
  var newQuantity = 1;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product;

    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      var oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }

    return Product.findById(prodId);
  }).then(function (data) {
    return fetchedCart.addProduct(product, {
      through: {
        quantity: newQuantity
      }
    });
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postCartDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  req.user.getCart().then(function (cart) {
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product = products[0];
    return product.cartItem.destroy();
  }).then(function (result) {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  });
}; // something


exports.postOrder = function (req, res, next) {
  var fetchedCart;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(function (products) {
    return req.user.createOrder().then(function (order) {
      return order.addProducts(products.map(function (product) {
        product.orderItem = {
          quantity: product.cartItem.quantity
        };
        return product;
      }));
    })["catch"](function (err) {
      return console.log(err);
    });
  }).then(function (result) {
    return fetchedCart.setProducts(null);
  }).then(function (result) {
    res.redirect('/orders');
  })["catch"](function (err) {
    return console.log(err);
  });
}; // export function to get content for orders page


exports.getOrders = function (req, res, next) {
  req.user.getOrders({
    include: ['products']
  }).then(function (orders) {
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
