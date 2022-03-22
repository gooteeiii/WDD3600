// import mongodb
const mongodb = require('mongodb')

// extract mongoclient constructor
const MongoClient = mongodb.MongoClient

// method wrapper for connection
const mongoConnect = (callback) => {
  // create connection to mongodb
  MongoClient.connect(
    'mongodb+srv://aj:1234@cluster0.v0uea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!')
      callback(client)
    })
    .catch(err => {
      console.log(err)
    })
}

// export methods
module.exports = mongoConnect
