// fs constant is holding a  a File object
const fs = require('fs')

// path constant is holding a required path object, providing a location to access
const path = require('path')

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
  constructor (title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  // writes product object data as a string to a file
  save () {
    this.id = Math.random().toString()
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
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
