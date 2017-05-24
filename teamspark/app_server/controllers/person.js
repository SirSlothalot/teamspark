require('../models/db');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

//Return all persons
module.exports.personList = function(req,res){
    Person.find().exec(
        function(err, simpleData) {
            if(err) {
                res.render('error', {
                    message:err.messagr,
                    error: err
                });
            } else {
                console.log('find complete');
                res.render('person', {'people':simpleData, user: req.user, 'project':res.app.locals.project});
            }
        })
};

//Add a new person
module.exports.newPerson = function(req,res){
    var newPerson = new Person({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });
    newPerson.save(function(err,data) {
        if(err) {
            console.log(err);
            res.status(500);
            res.render('error', {
                message:err.message,
                error:err
            });
        } else {
            console.log(data, ' saved');
            getPersons(req,res);
        }
    });
};

//Delete a person
module.exports.deletePerson = function(req,res) {
    Person.remove({_id:req.params.id}, function(err) {
        if(err) {
            console.log(err);
            res.status(500);
            res.render('error', {
                message:err.message,
                error: err
            });
        } else {
            console.log(req.param.id, ' removed');
            getPersons(req, res);
        }
    });
}
