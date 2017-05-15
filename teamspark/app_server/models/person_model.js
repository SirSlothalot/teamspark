var mongoose = require('mongoose');
//var bcrypt = require(bcrypt);
var SALT_WORK_FACTOR = 10;
var passportLocalMongoose = require('passport-local-mongoose');

var personSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        email: String,

        username: String,
        password: String

        // firstname:{type:String, require:true},
        // surname:{type:String, require:true},
        //
        // email:{type:String, require:true},
        // password:{type:String, require:true},
        //
        // age:{type:Number, require:true},
        // spoken-language:{type:String}, require:true},
        //
        // country:{type:String, require:true},
        // state:{type:String, require:true},
        // suburb:{type:String, require:true},
        //
        // programming-language:{type: String, require:true}
    }
);

personSchema.plugin(passportLocalMongoose);


//
//
//
//
// //------------------Encrypting the password-----------------------------------
// //https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// //----------------------------------------------------------------------------
// personSchema.pre(save, function(next) {
//     var user = this;
//
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//
//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
//
//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// personSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };
//
//
//
// mongoose.model('Person', personSchema);
module.exports = mongoose.model('Person', personSchema);
