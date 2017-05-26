var io = require('socket.io')();
var ctrlChat = require('./app_server/controllers/chat');
require('./app_server/models/db');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

io.on('connection', function(socket) {
  console.log("yo");
  socket.on('create', function(username){
    console.log("heyhey");
    socket.username = username;

    Person.findOne({"username":username}).exec(
        function(err, result) {
            if(err) {
              console.log(err);
            } else {
              socket.room = result.myProject;
              socket.join(result.myProject);
              socket.emit('updateroom', result.myProject)
              ctrlChat.connect(io, socket, result.myProject);
            }
        });
  });

  socket.on('disconnect', function(){socket.leave(socket.room);});

  socket.on('messsage', function(msg){ctrlChat.message(msg, io, socket);});

  // io.sockets.in(socket.room).emit('')
});

module.exports = io;
