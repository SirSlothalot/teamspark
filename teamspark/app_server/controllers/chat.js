require('../models/db');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Person = mongoose.model('Person');

module.exports.connect = function(socket, room){
    console.log('User Connected');

    Message.find().sort({time:-1}).limit(10).exec(
        function(err, messages){
            if(err){
                res.render('error',{
                    message:err.message,
                    error:err
                });
            } else {
                console.log('last 10 messages');
                for(var i = messages.length-1; i >= 0; i--) {
                  socket.emit('message', messages[i].message);
                }
            }
        });
}

module.exports.disconnect = function() {
    console.log('User Disconnected');
}

module.exports.message = function(msg, io) {
    console.log('message received!');
    var message = new Message({user:'user?', message:msg, time: new Date()});

    message.save(function(err, data){
      if(err){
        console.log(err);
        res.status(500);
        res.render('error', {
          message:err.message,
          error: err
        });
      } else {
        console.log(data, 'message saved');
      }
    });
    io.emit('message', msg);
  }

module.exports.renderChatroom = function(req, res) {
  if(req.user) {
      // Person.findOne({"username": req.user.username}).exec(
      //     function(err, result) {
      //         if(err) {
      //             res.render('error', {
      //                 message:err.messagr,
      //                 error: err
      //             });
      //         } else {
                console.log('find complete');
                res.render('chat', {'user':req.user});
              }
        //     });
        //   }
        }











//               else if(result.myProject == req.params.projectTitle) {
//                 Project.findOne({"title":req.params.projectTitle}).exec(
//                   function(err, project) {
//                     if(err) {
//                       res.render('error', {
//                         message:err.messagr,
//                         error: err
//                       });
//                     } else {
//                       console.log('find complete');
//                       res.render('chat', {'user':req.user, 'project':project});
//                     }
//                   });
//               } else {
//                   console.log('Cannot view chat. You are not a member of this project.');
//                   res.redirect('/');
//               }
//           })
//   } else {
//       console.log('Cannot view chat. You are not logged in.');
//       res.redirect('/');
//   }
// };
