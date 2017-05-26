var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var passportLocalMongoose = require('passport-local-mongoose');


var enumProgLangs = {
    values: ["Bash", "C", "C++", "C#", "Clojure", "CoffeeScript", "Haskell", "Java", "JavaScript",
	"Objective-C", "Perl", "PHP", "Python", "Scala","Swift"],
    message: '{VALUE} is not a valid programming language'
}

var enumAreaofInterest = {
    values: ['Machine Learning', 'Web App Development', 'Data Mining', 'Graphics and Animation', 'Game Development', 'UX Design', 'Networks and Security', 'Systems Programming', 'Research'],
    message: '{VALUE} is not a valid area of interest'
}

var enumCountries = {
    values: [
		"Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
	"Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
	"Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
	"Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon",
	"Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary",
	"Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia",
	 "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte",
	 "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
	 "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
	 "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena",
	 "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands",
	 "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
     message: '{VALUE} is not a valid country'

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

        country:{
            type:String,
            require:true,
            enum:enumCountries
        },

        state:{
            type:String,
            require:true,
        },
        suburb:{type:String, require:true},

        availability:{
            type:Number,
            require:true,
            min: 5,
            max: 21
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
        // data:{type:Buffer, require:true},
        // contentType:{type:String, require:true},
        //profilepic: { data: Buffer, contentType: String }

        isOwner:{type:Boolean},
        myProject:{type:String},

        projectLikes:{type:[String]},
        projectMatches:{type:[String]},
        projectDislikes:{type:[String]}
    }
);

personSchema.plugin(passportLocalMongoose);
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
