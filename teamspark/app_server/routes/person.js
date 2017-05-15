var express = require('express');

var passport = require('passport');
var Person = require('../models/person_model');

var router = express.Router();
var ctrlPerson = require('../controllers/person');

//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

//Delete a person
router.get('/delete/:id', ctrlPerson.deletePerson);

//Register user
router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req,res) {
    Person.register(
        new Person({username: req.body.username}),
        req.body.password,
        function(err, person) {
            if(err) {
                return res.render('register', {person:person});
            }
            passport.authenticate('local')(req,res,function() {
                res.redirect('/');
            });
        }
    );
});

router.get('/login', function(req,res) {
    res.render('login', {user:req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
});

router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
