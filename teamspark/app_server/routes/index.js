var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');
var ctrlReference = require('../controllers/reference');
var ctrlRegister = require('../controllers/register');
var ctrlLogin = require('../controllers/login');

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
router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req,res) {
    Person.register(
        new Person(
            {
                fullname: req.body.fullname,
                username: req.body.email,
                //password: req.body.password,
                dob: req.body.dob,
                programmingLanguage: req.body.programmingLanguage
            }),
            req.body.password,
        function(err, person) {
            if(err) {
                console.log(err);
                return res.render('register', {person:person});
            }
            console.log(person, ' saved');
            res.redirect('/');
            passport.authenticate('local', {successRedirect: '/', failureRedirect: '/register'});
        }
    );
});

router.get('/login', function(req,res) {
    res.render('login', {});
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}), function(req, res) {
        res.redirect('/');
});

router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
