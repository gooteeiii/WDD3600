// requires path object, the object is defined in the other .js files
const path = require('path')

// requires express module installed
const express = require('express')

// requires body-parser object, defined on other .js pages
const bodyParser = require('body-parser')

// importing mongoose
const mongoose = require('mongoose')

// import sessions
const session = require('express-session')

// import mongodbStore
const MongoDBStore = require('connect-mongodb-session')(session)

//import csurf, this provided session tokens to protect against csrf attacks
const csrf = require('csurf')

// import connect-flash
const flash = require('connect-flash')

//import multer
const multer = require('multer')

// imports error controller location
const errorController = require('./controllers/error')

// import User model
const User = require('./models/user')

// creates express object named app
const app = express()

const MONGODB_URI = 'mongodb+srv://aj:1234@cluster0.v0uea.mongodb.net/shop'

// initialize csrf object
const csrfProtection = csrf()

// file storage object for image file
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

// initialize new store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

// fileFilter constant to provide image data types for multer
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// sets global config value, this is settings the default engine and its location
app.set('view engine', 'ejs')
app.set('views', 'views')

// creates objects with a path defined
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const { MongoKerberosError } = require('mongodb')
const authRoutes = require('./routes/auth')

// defines bodparser encoding for url
app.use(bodyParser.urlencoded({ extended: false }))

//defines multer object and assign data expected as a single file
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

// defines a location to allow access to files you otherwise could not access
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

// session middleware setup
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
)
app.use(csrfProtection)

// initialize flash
app.use(flash())

// applies isAuthenticated and csrfToken to all rendered views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next()
})

//middleware to take session data and load mongo models
app.use((req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user) {
        return next()
      }
      req.user = user
      next()
    })
    .catch(err => {
      next(new Error(err))
    })
})

// registering middleware, function call to database to retrieve user, dummy user id used
app.use((req, res, next) => {
  User.findById('625f2f0efbb8c5108a99231b')
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

// defines page locations
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

// get for error 500
app.get('/500', errorController.get500)

// defines response for a url error 404
app.use(errorController.get404)

//error handling middleware, skips above error handling
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...)
  // res.redirect('/500')

  res.status(500).render('500', { 
    pageTitle: 'Error', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  })
})

// execute mongoose connect method, if no user in DB then create dummy user
mongoose
.connect(
  MONGODB_URI
  )
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
