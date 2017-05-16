var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');
var ctrlReference = require('../controllers/reference');
var ctrlRegister = require('../controllers/register');
var ctrlLogin = require('../controllers/login');
var ctrlLogout = require('../controllers/logout');
var ctrlProfile = require('../controllers/profile');


var passport = require('passport');
var Person = require('../models/person_model');

/* GET home page. */
router.get('/', ctrlMain.index);

/*GET Contact pages*/
router.get('/contact', ctrlContact.contact);

/*GET Reference page*/
router.get('/references', ctrlReference.reference);
//
// router.get('/register', ctrlRegister.register);

// router.get('/login', ctrlLogin.login);

//Register user
router.get('/register', ctrlRegister.load);

router.post('/register', ctrlRegister.registerUser);

router.get('/login', ctrlLogin.load);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}), ctrlLogin.loginUser);

router.get('/logout', ctrlLogout.logoutUser);

router.get('/profile/:username', ctrlProfile.profile);

router.get('/profile/:username/edit', ctrlProfile.edit);

module.exports = router;
