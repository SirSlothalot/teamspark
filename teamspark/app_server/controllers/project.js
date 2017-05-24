require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

var express = require('express');
var app = express();

module.exports.renderNewProject = function(req, res, next) {
    if(req.user) {
        res.render('project-create', { title: 'New Project', user: req.user, 'project':req.app.locals.project});
    } else {
        res.redirect('/');
    }
};

module.exports.submitNewProject = function(req, res, next) {

    if(req.user) {
        Person.findOne({"username":req.user.username},
            function(err, result) {
                if(err) return console.log(err);

                console.log(req.body.workload);
                var newProject = new Project({
                    title: req.body.title,
                    description: req.body.description,

                    skillLevel: req.body.skillLevel,
                    programmingLanguages: req.body.programmingLanguages,

                    workload: req.body.workload,
                    virtualTeam: req.body.virtualTeam,

                    country: result.country,
                    state: result.state,
                    suburb: result.suburb,

                    owner: result.username,
                    ageOfOwner: result.dob,
                    submissionDate: new Date(),

                    spokenLanguages: result.spokenLanguages
                });

                newProject.save();

                var updates = {
                    hasProject: true,
                    myProject: req.body.title
                }
                Person.findOneAndUpdate({username:result.username}, updates, {runValidators:true, new:true}, function (err, obj) {
                      if (err) console.log(err);
                });

                req.app.locals.project = newProject;
                res.redirect('/project/' + req.body.title);
            });
    } else {
        console.log("Cannot create project. You are not logged in.");
        res.redirect('/');
    }

}

module.exports.renderProject = function(req, res, next) {
    if(req.user) {
        Project.findOne({"title": req.params.projectTitle},
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    console.log('find complete');
                    res.render('project', {'project':req.app.locals.project, title: req.params.projectTitle, user: req.user});
                }
            });
    } else {
        console.log("Cannot view project. You are not logged in.");
        res.redirect('/');
    }
}

module.exports.renderEditProject = function(req, res, next) {
    Project.findOne({"title":req.params.projectTitle},
        function(error, result) {
            if(error) {
                res.render('error', {
                    message:err.messagr,
                    error: err
                });
            }
            if(req.user && req.user.username == result.owner) {
                console.log('find complete');
                res.render('project-edit', {user: req.user, 'project':req.app.locals.project});
            } else {
                res.redirect('/');
                console.log('Cannot edit this project. You do not have permission.')
            }
        });
}

module.exports.submitEditProject = function(req, res, next) {
    Project.findOne({"title":req.params.projectTitle}, function(err, result) {
        if(err) {
            res.render('error', {
                message:err.messagr,
                error: err
            });
        }
        if(req.user && req.user.username == result.owner) {
            var updates = {
                title: req.params.projectTitle,
                description: req.body.description,

                skillLevel: req.body.skillLevel,
                programmingLanguages: req.body.programmingLanguages,

                workload: req.body.workload,
                virtualTeam: req.body.virtualTeam,
            }

            var newP = Project.findOneAndUpdate({title:req.params.projectTitle}, updates, {runValidators:true, new:true}, function (err, updatedProject) {
                  if (err) console.log(err);
                  req.app.locals.project = updatedProject;
            });
            res.redirect('/project/' + req.params.projectTitle);
        } else {
            res.redirect('/');
            console.log('Cannot edit this project. You are not the owner.')
        }
    });
};
