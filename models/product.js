const db = require('../util/database')

// constant holding required cart file location
const Cart = require('./cart')

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
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    )
  }

  static deleteById (id) {

  }

  // similar to a utility function that calls not on a single instance of an object but retrieves all data from object.
  static fetchall () {
    return db.execute('SELECT * FROM products')
  }

  static findById (id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}
