var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var passportLocalMongoose = require('passport-local-mongoose');


var enumProgLangs = {
    values: ['C', 'C++', 'C#', 'Haskell', 'Java', 'JavaScript', 'Objective-C', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Other...'],
    message: '{VALUE} is not a valid programming language'
}

var enumAreaofInterest = {
    values: ['Machine Learning', 'Web App Development', 'Data Mining', 'Graphics and Animation', 'Game Development', 'UX Design', 'Networks and Security', 'Systems Programming', 'Research'],
    message: '{VALUE} is not a valid area of interest'
}

var enumAvailability = {
    values: ['5', '10', '15', '20', '21'],
    message: '{VALUE} is not a valid availability'
}

var personSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            require:true,
            validate: {
              validator: function(v) {
                return /^[A-Z][a-z]* [A-Z][a-z]*/.test(v);
              },
              message: '{VALUE} is not a valid fullname. Must be of the form John Smith.'
            },
        },

        email:{
            type:String,
            require:true,
            validate: {
              validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
.test(v);
              },
              message: '{VALUE} is not a valid email address.'
            },},

        username:{
            type:String,
            unique:true,
            require:true,
            validate: {
              validator: function(v) {
                return /^[a-zA-Z0-9_-]{3,16}$/.test(v);
              },
              message: '{VALUE} is not a valid username. Usernames are 3-16 characters long and contain letters, numbers, hyphens and underscores.'
            },
        },


        password:{type:String, require:true},

        dob:{
            type:String,
            require:true,
            validate: {
              validator: function(v) {
                return /\d+\/\d+\/\d\d\d\d/.test(v);
              },
              message: '{VALUE} is not a valid username. Usernames are 3-16 characters long and contain letters, numbers, hyphens and underscores.'
            },
        },

        virtualTeam:{type:String, require:true},

        country:{type:String, require:true},
        state:{type:String, require:true},
        suburb:{type:String, require:true},

        availability:{
            type:String,
            require:true,
            enum:enumAvailability
        },

        skillLevel:{
            type:Number,
            require:true,
            min: 1,
            max: 6
        },

        programmingLanguages:{
            type: [String],
            require:true,
            enum:enumProgLangs
        },

        userInterest:{
            type:String,
            require:true,
            enum:enumAreaofInterest
        },

        bio:{type:String, require:true},
        accounts:{type:[String], require:false},

        //profilepic:{type:Buffer, require:true}
        data:{type:Buffer, require:true},
        contentType:{type:String, require:true},
        //profilepic: { data: Buffer, contentType: String }

        isOwner:{type:Boolean},
        myProject:{type:String},

        projectPotentials:{type:[String]},
        projectMatches:{type:[String]},

    }
);

personSchema.plugin(passportLocalMongoose);
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
