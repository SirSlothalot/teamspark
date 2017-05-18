require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

module.exports.load = function(req, res, next) {
    if(req.user) {
        res.render('project-create', { title: 'New Project', user: req.user});
    } else {
        res.redirect('/');
    }
};

module.exports.submit = function(req, res, next) {

    var p = Person.findOne({"username":req.params.user});

    var newProject = new Project({
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
    });

    newProject.save();
    res.redirect('/');


}
