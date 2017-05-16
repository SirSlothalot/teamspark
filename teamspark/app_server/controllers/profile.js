require('../models/db');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

//Return person
module.exports.profile = function getProfile(req,res){
    Person.findOne({"username": req.params.username}).exec(
        function(err, result) {
            if(err) {
                res.render('error', {
                    message:err.messagr,
                    error: err
                });
            } else {
                console.log('find complete');
                res.render('profile', {'person':result});
            }
        })
};

// #{person.username}
//{"username": req.user.username}
