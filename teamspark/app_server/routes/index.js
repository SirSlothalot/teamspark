var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');
var ctrlReference = require('../controllers/reference');
var ctrlRegister = require('../controllers/register');
var ctrlLogin = require('../controllers/login');
var ctrlLogout = require('../controllers/logout');


var passport = require('passport');
var Person = require('../models/person_model');

/* GET home page. */
router.get('/', ctrlMain.renderIndex);

/*GET Contact pages*/
router.get('/contact', ctrlContact.renderContact);

/*GET Reference page*/
router.get('/references', ctrlReference.renderReference);
//
// router.get('/register', ctrlRegister.register);

// router.get('/login', ctrlLogin.login);

//Register user
router.get('/register', ctrlRegister.renderRegister);

router.post('/register', ctrlRegister.submitRegister);

router.get('/login', ctrlLogin.renderLogin);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

//router.get('/profile/:username/edit', ctrlProfile.edit);

router.get('/logout', ctrlLogout.logoutUser);

module.exports = router;
