require('../models/db');
var mongoose = require('mongoose');
var passport = require('passport');
var Person = require('../models/person_model');
var Image = mongoose.model('Image');

module.exports.renderRegister = function(req, res, next) {
      res.render('register', { title: 'Register', user: req.user});
};

var fs    = require("fs");
//var filepath = ;

module.exports.submitRegister = function(req,res) {
    Person.register(
        new Person(
            {
                fullname: req.body.fullname,
                email: req.body.email,
                username: req.body.username,

                dob: req.body.dob,
                spokenLanguages: req.body.spokenLanguages,

                // online: req.body.online,

                country: req.body.country,
                state: req.body.state,
                suburb: req.body.suburb,

                availability: req.body.availability,
                skillLevel: req.body.skillLevel,
                programmingLanguages: req.body.programmingLanguages,

                userInterest: req.body.userInterest,
                bio: req.body.bio,
                accounts: req.body.accounts,



                    //data: fs.readFileSync("/home/abrar/Desktop/agile-web-development/teamspark/matt-project/resources/images/teamspark-icon.png").toString('base64'),
                // data: fs.readFileSync(req.body.imagePath).toString('base64'),
                //console.log("Image file not found, set to default.");
                //data: fs.readFileSync("./public/images/user_image.png").toString('base64');
                    //data: fs.readFileSync(req.body.data).toString('base64'),

                // contentType: "image/png"
                //data: req.body.data
            }),
        req.body.password,
        function(err, person) {
            if(err) {
                console.log(err);
                return res.render('register', {person:person});
            }
            console.log(person, ' saved');
            // var redirect = '/user/' + req.body.username;
            req.login(person, function(err) {
                if(err) {
                    console.log("New user couldn't sign in?");
                    res.redirect('/');
                } else {
                    res.redirect('/user/' + person.username);
                }
            })
        }
    );


    //console.log(reg.body.imagePath);

    var newImg = new Image(
      {
        data: fs.readFileSync(req.body.imagePath).toString('base64'),
    //console.log("Image file not found, set to default.");
    //data: fs.readFileSync("./public/images/user_image.png").toString('base64');
        //data: fs.readFileSync(req.body.data).toString('base64'),

        contentType: "image/png",

        user: req.body.username

      });
      newImg.save();
      console.log("Stored");
};
