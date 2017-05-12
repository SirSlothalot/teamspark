var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/teamspark';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURO);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
})
mongoose.connection.on('disconneted', function() {
  console.log('Mongoose disconneted');
});

var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
