// fs constant is holding a  a File object
const fs = require('fs')

// path constant is holding a required path object, providing a location to access
const path = require('path')

const Cart = require('./cart')

// will write data content to products.json file
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data', 'products.json')

// call back function to read file content
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

// exports a product object with all relevant data: title, imgUrl, description, price
module.exports = class Product {
  constructor (id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  // writes product object data as a string to a file
  save () {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  static deleteById (id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  // similar to a utility function that calls not on a single instance of an object but retrieves all data from object.
  static fetchall (cb) {
    getProductsFromFile(cb)
  }

  static findById (id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}
