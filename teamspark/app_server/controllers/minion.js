/* Get Minion Page*/
module.exports.minionList = function(req, res){
  res.render('index', {title: 'Teamspark'});
};

module.exports.minion = function(req, res) {
  res.render('index', {title: 'Minion'});
};
