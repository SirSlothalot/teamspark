var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var personSchema = new mongoose.Schema(
    {
        fullname:{type:String, require:true},

        email:{type:String, require:true},

        username:{type:String, require:true},
        password:{type:String, require:true},

        dob:{type:String, require:true},
        spokenLanguages:{type:[String], require:true},

        // online:{type:Boolean, require:true},

        country:{type:String, require:true},
        state:{type:String, require:true},
        suburb:{type:String, require:true},

        availability:{type:String, require:true},

        skillLevel:{type:String, require:true},
        programmingLanguages:{type: [String], require:true},
        userInterest:{type:String, require:true},

        bio:{type:String, require:true},
        accounts:{type:[String], require:false}
    }
);

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Person', personSchema);
