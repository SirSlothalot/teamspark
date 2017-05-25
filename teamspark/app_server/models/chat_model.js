var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
    time: Date
  });

mongoose.model('Message', messageSchema, 'messages');
