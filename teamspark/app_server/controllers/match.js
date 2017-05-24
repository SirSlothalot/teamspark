require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

module.exports.renderAllProjects = function (req,res){
    if(req.user) {
        Person.findOne({"username": req.params.username}).exec(
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    var projects = [];
                    var numProjects = result.projectPotentials.length;
                    for(var i = 0; i < numProjects; i++) {

                        Project.findOne({"title": result.projectPotentials[i]},
                            function(err, project) {
                                if(err) {
                                    console.log("Couldn't find project: " + result.projectPotentials[i]);
                                } else {
                                    projects.push(project);
                                }
                        });

                    }
                    console.log('find complete');
                    res.render('potential-projects', {'user':result}, {'projects':projects} );
                }
            })
    } else {
        res.redirect('/');
        Console.log('Cannot view macthes. You are not logged in.');
    }
};


module.exports.renderAllPeople = function(req, res, next) {
    if(req.user) {
        Project.findOne({"title": req.params.projectTitle},
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    var users = [];
                    var numUsers = result.userPotentials.length;
                    for(var i = 0; i < numUsers; i++) {

                        Project.findOne({"username": result.userPotentials[i]},
                            function(err, user) {
                                if(err) {
                                    console.log("Couldn't find user: " + result.userPotentials[i]);
                                } else {
                                    projects.push(user);
                                }
                        });
                    }
                    console.log('find complete');
                    res.render('potential-users', {'users':users}, {'project':result}, {user: req.user});
                }
            });
    } else {
        console.log("Cannot view project. You are not logged in.");
        res.redirect('/');
    }
}
