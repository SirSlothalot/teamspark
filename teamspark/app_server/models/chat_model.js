var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
    time: Date
  });

  var chatRoomSchema = new mongoose.Schema(
    {
      project: {type:String, required:true},
      messages: [messageSchema]
    });

mongoose.model('ChatRoom', chatRoomSchema);
mongoose.model('Message', messageSchema);
