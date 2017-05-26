/* GET contact page. */
module.exports.renderBio = function(req, res, next) {
  res.render('bio', {title: 'Teamspark | Creators', user: req.user});
};
