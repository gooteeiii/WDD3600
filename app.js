// requires path object, the object is defined in the other .js files
const path = require('path')

// requires express module installed
const express = require('express')

// requires body-parser object, defined on other .js pages
const bodyParser = require('body-parser')

// importing mongoose
const mongoose = require('mongoose')

// imports error controller location
const errorController = require('./controllers/error')

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

// registering middleware, function call to database to retrieve user, dummy user id used
app.use((req, res, next) => {
  User.findById('624b845138212100a7d454ed')
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

// defines page locations
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// defines response for a url error 404
app.use(errorController.get404)

// execute mongoose connect method, if no user in DB then create dummy user
mongoose
.connect('mongodb+srv://aj:1234@cluster0.v0uea.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'AJ',
        email: 'aj@test.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })
  app.listen(3000)
})
.catch(err => {
  console.log(err)
})
