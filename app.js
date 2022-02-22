// requires path object, the object is defined in the other .js files
const path = require('path')

// requires express module installed
const express = require('express')

// requires body-parser object, defined on other .js pages
const bodyParser = require('body-parser')

const errorController = require('./controllers/error.js')

const db = require('./util/database')

// creates express object named app
const app = express()

// sets global config value, this is settings the default engine and its location

app.set('view engine', 'ejs')
app.set('views', 'views')

// creates objects with a path defined
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// not sure
app.use(bodyParser.urlencoded({ extended: false }))

// defines a location to allow access to files you otherwise could not access
app.use(express.static(path.join(__dirname, 'public')))

// defines page locations
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// defines response for a url error 404
app.use(errorController.get404)

// listens on port 3000
app.listen(3000)
