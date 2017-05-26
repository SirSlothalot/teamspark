/* GET contact page. */
module.exports.renderContact = function(req, res, next) {
  res.render('bio', {title: 'Teamspark | Creators', user: req.user});
};
