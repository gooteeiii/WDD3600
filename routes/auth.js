const express = require('express');

//import validator package
const { check, body } = require('express-validator')
//location of auth controller
const authController = require('../controllers/auth');
//location of user model
const User = require('../models/user')
//create router object
const router = express.Router();


router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

// provides requirements to email and password user entry on login page
router.post(
    '/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password', 'Password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
)

// provides requirements to email and password user entry on signup page
router.post(
    '/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) => {
                //if(value === 'test@test.com') {
                //    throw new Error('This email address is forbidden.')
                //}
                //return true
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'Email exists already, please pick a different one.'
                        )
                    }
                })
            })
            .normalizeEmail(),
        body(
            'password', 
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
            body('confirmPassword')
                .trim()
                .custom((value, {req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Passwords have to match!')
                    }
                    return true
                })
    ],
    authController.postSignup
);
//link to logout page and function on auth controller
router.post('/logout', authController.postLogout);
//link to reset page and getReset function on auth controller
router.get('/reset', authController.getReset);
//link to reset page and postResetfunction on auth controller
router.post('/reset', authController.postReset);
//link to reset token page and function on auth controller
router.get('/reset/:token', authController.getNewPassword);
//link to new-password page and function on auth controller
router.post('/new-password', authController.postNewPassword);
//export auth routes functions
module.exports = router;