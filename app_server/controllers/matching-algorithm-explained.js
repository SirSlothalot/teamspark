/* GET contact page. */
module.exports.renderMatchingAlgorithm = function(req, res, next) {
  res.render('matching-algorithm-explain', {title: 'Teamspark | Matching Algorithm', user: req.user});
};
