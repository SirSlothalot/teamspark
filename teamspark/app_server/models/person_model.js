var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var personSchema = new mongoose.Schema(
    {
        fullname:{type:String, require:true},

        username:{type:String, require:true},
        password:{type:String, require:true},

        dob:{type:String, require:true},
        // spoken-language:{type:String}, require:true},

        // country:{type:String, require:true},
        // state:{type:String, require:true},
        // suburb:{type:String, require:true},

        programmingLanguage:{type: String, require:true}
    }
);

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Person', personSchema);
