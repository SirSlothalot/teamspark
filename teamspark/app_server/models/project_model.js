var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
    {
        title:{type:String, unique:true, require:true},
        description:{type:String, require:true},

        skillLevel:{type:String, require:true},
        programmingLanguages:{type:[String], require:true},

        timePerWeek:{type:String, require:false},

        online:{type:Boolean, require:true},

        country:{type:String, require:true},
        state:{type:String, require:true},
        suburb:{type:String, require:false},

        ageOfOwner:{type:String, require:true},
        mainSpokenLanguage:{type:String, require:true},
        otherSpokenLanguages:{type:[String], require:false},

        submissionDate:{type:Date, require:true}
    }
);

module.exports = mongoose.model('Project', projectSchema);
