// import mongodb
const mongodb = require('mongodb')

// import getDb
const getDb = require('../util/database').getDb

// class product
class Product {
  constructor (title, price, description, imageUrl, id, userId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id ? new mongodb.ObjectId(id) : null
    this.userId = userId
  }

  // save method to store data in db
  save () {
    const db = getDb()
    let db0p
    if (this._id) {
      // update product
      db0p = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      db0p = db.collection('products').insertOne(this)
    }
    return db0p
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll () {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products)
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }

  //static findbyid (prodId) { //REMOVED BY AH
  static findById(prodId) {    //ADDED BY AH
    const db = getDb()
    return db
      .collection('products')
      .find({ _id: mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteById (prodId) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Delete')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
module.exports = Product
