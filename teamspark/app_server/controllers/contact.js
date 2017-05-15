/* GET contact page. */
module.exports.contact = function(req, res, next) {
  res.render('contact', { title: 'Contact' });
};
