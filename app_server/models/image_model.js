var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var imagesSchema = new mongoose.Schema(
  {
    user:{
      type: String,
      unique: true,
      require: true
    },
    data: Buffer,
    contentType: String
  });

imagesSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Image',  imagesSchema);
//mongoose.model('Image', messageSchema, 'images');
