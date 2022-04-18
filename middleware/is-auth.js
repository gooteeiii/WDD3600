// middleware that performs a check for every rendered page to determine if user is logged in.
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next()
}