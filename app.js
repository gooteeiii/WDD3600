// requires path object, the object is defined in the other .js files
const path = require('path')

// requires express module installed
const express = require('express')

// requires body-parser object, defined on other .js pages
const bodyParser = require('body-parser')

// imports error controller location
const errorController = require('./controllers/error')

// imports sequelize database location
const sequelize = require('./util/database')

// import sequelize models location
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

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

// registering middleware, function call to database to retrieve user
app.use((req, res, next) => {
  User.findByPk(1)
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

// relates modules to database
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

// checks models defined, creates tables for them and relations if they do not already exist
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1)
    // console.log(result)
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' })
    }
    return user
  })
  .then(user => {
    // console.log(user)
    return user.createCart()
  })
  .then(cart => {
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })
