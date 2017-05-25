require('../models/db');
var mongoose = require('mongoose');
var PQueue = require("fastpriorityqueue");
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');
var matcher = require('./matching');

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
                    console.log('find complete1');
                    matcher.findProjects(result, req, res);
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
                    console.log('find complete1');
                    matcher.findPeople(result, req, res);
                }
            });
    } else {
        console.log("Cannot view project. You are not logged in.");
        res.redirect('/');
    }
}
