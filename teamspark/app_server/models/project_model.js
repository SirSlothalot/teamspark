var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
    {
        title:{type:String, unique:true, require:true},
        description:{type:String, require:true},

        skillLevel:{type:String, require:true},
        programmingLanguages:{type:[String], require:true},

        workload:{type:String, require:false},

        virtualTeam:{type:Boolean, require:true},

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

module.exports = mongoose.model('Project', projectSchema);
