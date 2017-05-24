var passport = require('passport');
var Person = require('../models/person_model');
var Project = require('../models/project_model');

var express = require('express');
var app = express();

module.exports.renderLogin = function(req, res, next) {
      res.render('login', { title: 'Login', user: req.user});
};

module.exports.submitLogin = function(req, res) {
    console.log(req.user.username);
    if(req.user) {
        Person.findOne({"username": req.user.username},
            function(err, result) {
                if(err) {
                    console.log("Couldn't find user: " + req.user.username);
                } else {
                    if(result.hasProject) {
                        Project.findOne({"title": result.myProject},
                            function(err, obj) {
                                if(err) {
                                    console.log("Couldn't find project: " + result.myProject);
                                } else {
                                    console.log("Project title: " + obj.title);
                                    req.app.locals.project = obj;
                                }
                        });
                    }
                }
        });
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};
