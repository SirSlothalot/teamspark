require('../models/db');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Person = mongoose.model('Person');

function Node(data, score) {
  this.data = data;
  this.score = score;
}

function findProjects() {
  var users = new PQueue(function(a, b) {
    return a.score > b.score
  });
  var query = Project.find().exec(
    function(err, simpleData) {
      if (err) {
        res.render('error', {
          message: err.messagr,
          error: err
        });
      } else {
        console.log('find complete2');
        //console.log(simpleData);
        for (var k = 0; k < simpleData.length; k++) {
          var node = comparePerson(project, simpleData[k]);
          users.add(node);
        }
        var userArray = [];
        while (!users.isEmpty()) {
          var foo = users.poll();
          userArray.push(foo.data);
        }
        console.log('find complete3');
        res.render('potential-users', {
          'people': userArray,
          'project': res.app.locals.project,
          user: req.user
        });
      }
    });
}

function findPeople(project, req, res) {
  var users = new PQueue(function(a, b) {
    return a.score > b.score
  });
  var query = Person.find().exec(
    function(err, simpleData) {
      if (err) {
        res.render('error', {
          message: err.messagr,
          error: err
        });
      } else {
        console.log('find complete2');
        //console.log(simpleData);
        for (var k = 0; k < simpleData.length; k++) {
          var node = comparePerson(project, simpleData[k]);
          users.add(node);
        }
        var userArray = [];
        while (!users.isEmpty()) {
          var foo = users.poll();
          userArray.push(foo.data);
        }
        console.log('find complete3');
        res.render('potential-users', {
          'people': userArray,
          'project': res.app.locals.project,
          user: req.user
        });
      }
    });
}

function comparePerson(project, user) {
  var usernode = new Node(user, 0);
  if (!project.virtualTeam) {

  }
  for (var i = 0; i < project.programmingLanguages.length; i++) {
    for (var j = 0; j < user.programmingLanguages.length; j++) {
      if (project.programmingLanguages[i] == user.programmingLanguages[j]) {
        usernode.score += 4;
      }
    }
  }
  if (project.skillLevel <= user.skillLevel) {
    usernode.score += (1 + user.skillLevel - project.skillLevel) * 3;
  }
  if (user.availability >= project.workload) {
    usernode.score += (1 + user.availability - project.workload) * 2;
  }
  var userDate = new Date(user.dob);
  var projectDate = new Date(project.ageOfOwner);
  var time = Math.floor((userDate - projectDate) / (1000 * 60 * 60 * 24 * 365))
  if (time <= 10) {
    usernode.score += 1 + 10 - time;
  }
  return usernode;
}
