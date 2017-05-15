/* GET reference page. */
module.exports.reference = function(req, res, next) {
  res.render('references', { title: 'References' });
};
