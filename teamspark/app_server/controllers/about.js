/* GET contact page. */
module.exports.renderAbout = function(req, res, next) {
  res.render('about', {title: 'Teamspark | About', user: req.user});
};
