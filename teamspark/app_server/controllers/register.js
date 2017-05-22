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
                email: req.body.email,
                username: req.body.username,

                dob: req.body.dob,
                spokenLanguages: req.body.spokenLanguages,

                // online: req.body.online,

                country: req.body.country,
                state: req.body.state,
                suburb: req.body.suburb,

                availability: req.body.availability,
                skillLevel: req.body.skillLevel,
                programmingLanguages: req.body.programmingLanguages,

                userInterest: req.body.userInterest,
                bio: req.body.bio,
                accounts: req.body.accounts
            }),
        req.body.password,
        function(err, person) {
            if(err) {
                console.log(err);
                return res.render('register', {person:person});
            }
            console.log(person, ' saved');
            // var redirect = '/user/' + req.body.username;
            req.login(person, function(err) {
                if(err) {
                    console.log("New user couldn't sign in?");
                    res.redirect('/');
                } else {
                    res.redirect('/user/' + person.username);
                }
            })
        }
    );
};
