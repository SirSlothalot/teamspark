require('../models/db');
var mongoose = require('mongoose');
var PQueue = require("fastpriorityqueue");
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
                    res.render('potential-projects', {'user':result, 'projects':projects, 'project':res.app.locals.project});
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
                    var users = findPeople(result);
                    console.log(users);
                    var userArray = [];
                    while(!users.isEmpty()) {
                      userArray.add(users.poll().user);
                    }
                    console.log('find complete2');
                    console.log(userArray);
                    res.render('potential-users', {'people':userArray, 'project':res.app.locals.project, user: req.user});
                }
            });
    } else {
        console.log("Cannot view project. You are not logged in.");
        res.redirect('/');
    }
}

function userNode(user, score) {
  this.user = user;
  this.score = score;
}

function findPeople(project) {
    var queue = new PQueue(function(a, b) { return a.score > b.score });
    Person.find().exec(
        function(err, simpleData) {
            if(err) {
                res.render('error', {
                    message:err.messagr,
                    error: err
                });
            } else {
                console.log('find complete');
                //console.log(simpleData);
                for (var k = 0; k < simpleData.length; k++) {
                    var node = comparePerson(project, simpleData[k]);
                    queue.add(node);
                }
                //return simpleData;
            }
        });
    //console.log(poeple);
    // for (var k = 0; k < people.length; k++) {
    //     var node = comparePerson(project, people[k]);
    //     queue.add(node);
    // }
    return queue;
}

function comparePerson(project, user) {
  var usernode = new userNode(user, 0);
  if (!project.virtualTeam) {

  }
  for(var i = 0; i < project.programmingLanguages.length; i++) {
    for(var j = 0; j < user.programmingLanguages.length; j++) {
      if (project.programmingLanguages[i] == user.programmingLanguages[j]) {
        usernode.score += 5;
      }
    }
  }
  return usernode;
}
