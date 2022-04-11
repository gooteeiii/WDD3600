// user model location
const user = require("../models/user")

//method to check login status
exports.getLogin = (req, res, next) => {
  /*
  const isLoggedIn = req
    .get('Cookie')
    .split(';')[1]
    .trim()
    .split('=')[1]
  */
    console.log(req.session.isLoggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
}

// method to update login status and then redirect to index page
exports.postLogin = (req, res, next) => {
  user.findById('624b845138212100a7d454ed')
    .then(user => {
      req.session.isLoggedIn = true
      req.session.user = user
      req.session.save(err => {
        console.log(err)
        res.redirect('/')
      })
     })
    .catch(err => console.log(err))
}

// method to logout by destroying session, then redirect to index page
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    console.log(err)
    res.redirect('/')
  })
}