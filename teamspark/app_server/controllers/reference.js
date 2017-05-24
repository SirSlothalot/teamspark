/* GET reference page. */
module.exports.renderReference = function(req, res, next) {
  res.render('references', { title: 'References', user: req.user, 'project':req.app.locals.project});
};
