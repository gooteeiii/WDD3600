// requires path object, the object is defined in the other .js files
const path = require('path')

// requires express module installed
const express = require('express')

// requires body-parser object, defined on other .js pages
const bodyParser = require('body-parser')

// imports error controller location
const errorController = require('./controllers/error')

// import mongoconnect method
const mongoConnect = require('./util/database').mongoConnect

// import User model
const User = require('./models/user')

// creates express object named app
const app = express()

// sets global config value, this is settings the default engine and its location

app.set('view engine', 'ejs')
app.set('views', 'views')

// creates objects with a path defined
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const { MongoKerberosError } = require('mongodb')

// not sure
app.use(bodyParser.urlencoded({ extended: false }))

// defines a location to allow access to files you otherwise could not access
app.use(express.static(path.join(__dirname, 'public')))

// registering middleware, function call to database to retrieve user
app.use((req, res, next) => {
 // User.findByPk('1') //REMOVED BY AH
  User.findById('1') //ADDED BY AH
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id)
      next()
    })
    .catch(err => console.log(err))
})

// defines page locations
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// defines response for a url error 404
app.use(errorController.get404)

// execute mongoconnect method
mongoConnect(() => {
  app.listen(3000)
})
