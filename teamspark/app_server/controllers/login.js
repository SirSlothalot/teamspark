module.exports.login = function(req, res, next) {
      res.render('login', { title: 'Login', user: req.user});
};
