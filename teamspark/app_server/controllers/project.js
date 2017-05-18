require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

module.exports.renderNewProject = function(req, res, next) {
    if(req.user) {
        res.render('project-create', { title: 'New Project', user: req.user});
    } else {
        res.redirect('/');
    }
};

module.exports.submitNewProject = function(req, res, next) {

    if(req.user) {
        var p = Person.findOne({"username":req.user.username});

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

            owner: p.username,
            ageOfOwner: p.dob,
            submissionDate: new Date(),

            mainSpokenLanguage: p.mainSpokenLanguage
        });

        newProject.save();
        res.redirect(string.concat('/project/', req.body.title));

    } else {
        console.log("Cannot create project. You are not logged in.");
        res.redirect('/');
    }

}

module.exports.renderProject = function(req, res, next) {
    if(req.user) {
        Project.findOne({"title": req.params.projectTitle}).exec(
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    console.log('find complete');
                    res.render('project', {'person':result, title: 'Project', user: req.user});
                }
            })
    } else {
        console.log("Cannot view project. You are not logged in.");
        res.redirect('/');
    }
}

module.exports.renderEditProject = function(req, res, next) {
    var p = Project.findOne({"title":req.body.title});
    if(req.user.username = p.owner) {
        Project.findOne({"title": req.params.projectTitle}).exec(
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    console.log('find complete');
                    res.render('project-edit', {'project':result, user: req.user});
                }
            }
        );
    } else {
        res.redirect('/');
        console.log('Cannot edit this project. You do not have permission.')
    }
}

module.exports.submitEditProject = function(req, res, next) {
    var p = Project.findOne({"title":req.body.title});
    if(req.user.username = p.owner) {
        var updates = {
            title: req.body.title,
            description: req.body.description,

            skillLevel: req.body.skillLevel,
            programmingLanguages: req.body.programmingLanguages,

            timePerWeek: req.body.timePerWeek,
            online: req.body.online,
        }

        var newP = Project.findOneAndUpdate({title:req.body.title}, updates, {runValidators:true, new:true}, function (err, doc) {
              if (err) console.log(err);
        });

        res.redirect(string.concat('/project/', newP.title));

    } else {
        res.redirect('/');
        console.log('Cannot edit this project. You are not the owner.')
    }
};
