require('../models/db');
var mongoose = require('mongoose');
var ChatRoom = mongoose.model('ChatRoom');
var Person = mongoose.model('Person');
var Project = mongoose.model('Project');
var Message = mongoose.model('Message');

module.exports.connect = function(io, socket, projectTitle){
    console.log('User Connected');

    ChatRoom.findOne({'project': projectTitle},
        function(err, chatRoom){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            } else {
                console.log('last 20 messages');
                for(var i = 0; i < 10; i++) {
                  socket.emit('message', chatRoom.messages.pop());
                }
            }
        });
}

module.exports.disconnect = function() {

    console.log('User Disconnected');
}

module.exports.message = function(msg, io, socket) {
    console.log('message received!');
    var message = new Message({user:msg.user, message:msg.message, time: new Date()});

    ChatRoom.findOne({'project': socket.room},
        function(err, chatRoom){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            } else {
                chatRoom.messages.push(message);
                chatRoom.save(function (err) {
                  if(err){
                    res.render('error', {
                        message:err.message,
                        error:err
                    });
                  }
                });
            }
        });

      io.sockets.in(socket.room).emit('message', msg);

    // message.save(function(err, data){
    //     if(err){
    //         console.log(err);
    //         res.status(500);
    //         res.render('error', {
    //             message:err.message,
    //             error:err
    //         });
    //     } else {
    //       console.log(data, 'message saved');
    //     }
    //   });
}

module.exports.renderChatroom = function(req, res) {
  if(req.user) {
      Person.findOne({"username": req.user.username}).exec(
          function(err, result) {
              if(err) {
                  res.render('error', {
                      message:err.messagr,
                      error: err
                  });
              } else if(result.myProject == req.params.projectTitle) {
                Project.findOne({"title":req.params.projectTitle}).exec(
                  function(err, project) {
                    if(err) {
                      res.render('error', {
                        message:err.messagr,
                        error: err
                      });
                    } else {
                      console.log('find complete');
                      res.render('chat', {'user':req.user, 'project':project});
                    }
                  });
              } else {
                  console.log('Cannot view chat. You are not a member of this project.');
                  res.redirect('/');
              }
          })
  } else {
      console.log('Cannot view chat. You are not logged in.');
      res.redirect('/');
  }
};
