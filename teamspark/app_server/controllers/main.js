/* GET home page. */
module.exports.renderIndex = function(req, res, next) {
  res.render('index', { title: 'Teamspark', user: req.user, 'project':req.app.locals.project});
};
