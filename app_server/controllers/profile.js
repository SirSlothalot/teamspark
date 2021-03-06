require('../models/db');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Image = mongoose.model('Image');

//Return person
module.exports.renderProfile = function (req,res){
    if(req.user) {
        Person.findOne({"username": req.params.username}).exec(
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    console.log('find complete');
                    Image.findOne({"user": req.params.username}).exec(
                      function(err, picture) {
                          if(err) {
                              res.render('error', {
                                  message:err.messagr,
                                  error: err
                              });
                          } else {
                              console.log('find complete');
                              //res.render('profile', {'image':result, 'pic':req.user});
                              res.render('profile', {'person':result, 'user':req.user, 'image':picture, 'pic':req.user});
                          }

                      })

                }
            })

    } else {
        res.redirect('/');
        Console.log('Cannot view profile. You are not logged in.');
    }
};

module.exports.renderEditProfile = function (req,res){
    if(req.user && req.user.username == req.params.username) {
        Person.findOne({"username": req.params.username}).exec(
            function(err, result) {
                if(err) {
                    res.render('error', {
                        message:err.messagr,
                        error: err
                    });
                } else {
                    console.log('find complete');
                    res.render('profile-edit', {'person':result, user: req.user});
                }
            })
    } else {
        res.redirect('/');
        console.log('Cannot edit this profile. You do not have permission.')
    }
}

module.exports.submitEditProfile = function (req,res){
    if(req.user.username == req.params.username) {
        var updates = {
            fullname: req.body.fullname,
            email: req.body.email,

            dob: req.body.dob,

            // online: req.body.online,

            country: req.body.country,
            state: req.body.state,
            suburb: req.body.suburb,

            availability: req.body.availability,
            skillLevel: req.body.skillLevel,
            programmingLanguages: req.body.programmingLanguages,

            userInterest: req.body.userInterest,
            bio: req.body.bio,
            virtualTeam: req.body.virtualTeam,
            accounts: req.body.accounts
        }

        var newP = Person.findOneAndUpdate({username:req.user.username}, updates, {runValidators:true, new:true}, function (err, doc) {
              if (err) console.log(err);
        });

        res.redirect('/user/' + req.user.username);

    } else {
        res.redirect('/');
        console.log('Cannot edit profile. You are not logged in.')
    }
}

// #{person.username}
//{"username": req.user.username}

//Delete a person
module.exports.deletePerson = function(req, res) {
  if(req.user && req.user.username == req.params.username) {
    Person.remove({
      username: req.params.username
    }, function(err) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('error', {
          message: err.message,
          error: err
        });
      } else {
        console.log(req.param.id, ' removed');
        res.redirect('/');
      }
    });
  } else {
    console.log("You can only delete your own profile.")
  }
}
