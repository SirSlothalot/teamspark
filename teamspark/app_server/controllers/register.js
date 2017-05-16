var passport = require('passport');
var Person = require('../models/person_model');

module.exports.load = function(req, res, next) {
      res.render('register', { title: 'Register', user: req.user});
};

module.exports.registerUser = function(req,res) {
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
};
