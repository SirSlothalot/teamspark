require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

module.exports.load = function(req, res, next) {
      res.render('project-create', { title: 'New Project'});
};

module.exports.submit = function(req,res) {

    var p = Person.findOne({"username":req.user});

    Project.register(
        new Project(
            {
                title: req.body.title,
                description: req.body.description,

                skillLevel: req.body.skillLevel,
                programmingLanguages: req.body.programmingLanguages,

                timePerWeek: req.body.timePerWeek,
                online: req.body.online,

                country: p.country,
                state: p.state,
                suburb: p.suburb,

                dob: p.dob,

                mainSpokenLanguage: p.mainSpokenLanguage;
            }),
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
