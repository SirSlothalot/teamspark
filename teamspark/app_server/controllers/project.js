require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

module.exports.load = function(req, res, next) {
      res.render('project-create', { title: 'New Project'});
};

module.exports.submit = function(req, res, next) {

    var p = Person.findOne({"username":req.user});

    Project.insert(
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

            ageOfOwner: p.dob,
            submissionDate: new Date(),

            mainSpokenLanguage: p.mainSpokenLanguage
        }
    );
};
