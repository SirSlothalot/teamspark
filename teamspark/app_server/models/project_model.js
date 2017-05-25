var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var enumProgLangs = {
    values: ["Bash", "C", "C++", "C#", "Clojure", "CoffeeScript", "Haskell", "Java", "JavaScript",
	   "Objective-C", "Perl", "PHP", "Python", "Scala","Swift"],
    message: '{VALUE} is not a valid programming language'
}

var enumAvailability = {
    values: [5, 10, 15, 20, 21],
    message: '{VALUE} is not a valid availability'
}

var projectSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            unique:true,
            require:true,
            validate: {
              validator: function(v) {
                return /^[\sa-zA-Z0-9_-]{3,40}$/.test(v);
              },
              message: '{VALUE} is not a valid project title. Titles are 3-40 characters long and contain letters, numbers, hyphens and underscores.'
            },
        },

        description:{type:String, require:true},

        skillLevel:{
            type:Number,
            require:true,
            min:1,
            max:6
        },

        programmingLanguages:{
            type:[String],
            require:true,
            enum:enumProgLangs
        },

        workload:{
            type:Number,
            require:true,
            enum:enumAvailability
        },

        virtualTeam:{type:String, require:true},

        country:{type:String, require:true},
        state:{type:String, require:true},
        suburb:{type:String, require:false},

        owner:{type:String, require:true},
        ageOfOwner:{type:String, require:true},
        spokenLanguages:{type:[String], require:false},

        submissionDate:{type:Date, require:true},

        userPotentials:{type:[String]},
        userMatches:{type:[String]}
    }
);

projectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema);
