// import mongodb
const mongodb = require('mongodb')

// extract mongoclient constructor
const MongoClient = mongodb.MongoClient

let _db; //ADDED BY AH

// method wrapper for connection
//const mongoConnect = (callback) => { //REMOVED BY AH
const mongoConnect = callback => { //ADDED BY AH
  // create connection to mongodb
  MongoClient.connect(
    'mongodb+srv://aj:1234@cluster0.v0uea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!')
    	 _db = client.db(); //ADDED BY AH
      callback();  //ADDED BY AH
      //callback(client) //REMOVED BY AH
    })
    .catch(err => {
      console.log(err)
      throw err; //ADDED BY AH
    })
}

//ADDED BY AH
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

// export methods
//module.exports = mongoConnect //REMOVED BY AH

exports.mongoConnect = mongoConnect; //ADDED BY AH
exports.getDb = getDb; //ADDED BY AH
