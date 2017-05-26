/* GET contact page. */
module.exports.renderTestExp = function(req, res, next) {
  res.render('test-explain', {title: 'Teamspark | Test', user: req.user});
};
