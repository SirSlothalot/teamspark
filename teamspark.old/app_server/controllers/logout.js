var passport = require('passport');
var Person = require('../models/person_model');

module.exports.logoutUser = function(req,res) {
    req.logout();
    res.redirect('/');
};
