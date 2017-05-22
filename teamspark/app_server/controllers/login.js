var passport = require('passport');
var Person = require('../models/person_model');

module.exports.renderLogin = function(req, res, next) {
      res.render('login', { title: 'Login', user: req.user});
};

// module.exports.submitLogin = function(req, res) {
//         res.redirect('/');
// };
