/* Get Minion Page*/
module.exports.minion = function(req, res) {
  res.render('index', {title: 'Minion'});
};
