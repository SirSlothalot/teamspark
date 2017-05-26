/* GET contact page. */
module.exports.renderContact = function(req, res, next) {
  res.render('contact', {title: 'Contact', user: req.user});
};
