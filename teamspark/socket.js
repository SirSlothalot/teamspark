var io = require('socket.io')();
var ctrlChat = require('./app_server/controllers/chat');

// io.on('connection', function(socket) {
//     ctrlChat.connect(io, socket);
//     socket.on('disconnect', ctrlChat.disconnect);
//     socket.on('message', function(msg){ctrlChat.message(msg, io);});
// });

var clients = {};
// var rooms = {};

io.on('connection', function (socket) {
  socket.on('add-user', function(username){
    clients[username] = {
      "socket": socket.id
    };
  });

  socket.on('notification', function(receivingUsername){
    if (clients[receivingUsername]){
      io.sockets.connected[clients[receivingUsername].socket].emit("notification", data);
    } else {
      console.log("User does not exist: " + receivingUsername);
    }
  });

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var name in clients) {
  		if(clients[name].socket === socket.id) {
  			delete clients[name];
  			break;
  		}
  	}
  })

});

module.exports = io;
