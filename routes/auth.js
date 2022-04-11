// express import
const express = require('express');

//location of auth.js in controllers folder
const authController = require('../controllers/auth');

//create router object
const router = express.Router();

//call getLogin method
router.get('/login', authController.getLogin);

//router.get('/signup', authController.getSignup);

// call postLogin method
router.post('/login', authController.postLogin);

// router.post('/signup', authController.postSignup);

// call postLogout method
router.post('/logout', authController.postLogout);

// router.get('/reset', authController.getReset);

//export router object
module.exports = router;