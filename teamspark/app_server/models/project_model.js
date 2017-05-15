var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
    {
        title:{type:String, require:true},
        required-skill-one:{type:String, require:true},
        required-skill-two:{type:String, require:true},
        description:{type:String, require:true}
    }
);

mongoose.model('Project', projectSchema);
