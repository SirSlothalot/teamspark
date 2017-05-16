var passport = require('passport');
var Person = require('../models/person_model');

module.exports.load = function(req, res, next) {
      res.render('login', { title: 'Login', user: req.user});
};

module.exports.loginUser = function(req, res) {
        res.redirect('/');
};
