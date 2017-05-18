var passport = require('passport');
var Person = require('../models/person_model');

module.exports.renderRegister = function(req, res, next) {
      res.render('register', { title: 'Register', user: req.user});
};

module.exports.submitRegister = function(req,res) {
    Person.register(
        new Person(
            {
                fullname: req.body.fullname,
                username: req.body.username,

                dob: req.body.dob,
                mainSpokenLanguage: req.body.mainSpokenLanguage,
                otherSpokenLanguages: req.body.otherSpokenLanguages,

                online: req.body.online,

                country: req.body.country,
                state: req.body.state,
                suburb: req.body.suburb,

                availability: req.body.timePerWeek,
                skillLevel: req.body.skillLevel,
                programmingLanguages: req.body.programmingLanguages
            }),
            req.body.password,
        function(err, person) {
            if(err) {
                console.log(err);
                return res.render('register', {person:person});
            }
            console.log(person, ' saved');
            res.redirect(string.concat('/user/', req.body.username));
            passport.authenticate('local', {successRedirect: '/', failureRedirect: '/register'});
        }
    );
};
