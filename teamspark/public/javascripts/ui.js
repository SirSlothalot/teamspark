// Depreciated.
function animateButton(el)
{
	var buttonName = el.value;
	el.innerHTML = "<a href='"+el.link+"'>"+buttonName+" <b>>>></b></a>"
}

// Depreciated.
function resetButtonAnimation(el)
{
	var buttonName = el.value;
	el.innerHTML = buttonName;
}



function validateSignUp()
{
	//console.log("Invalid file path specified, set to default value.");
	//return false;
	//return(validateFullName()  && validateEMail() && validateUName() && validatePasswd() && validateRPasswd() && validateDOB() && checkAgreement());
	//var fs = require('fs');
	//var filepath = document.getElementById("imagePath").value;

	//if (!fs.existsSync(filepath)) {
    //	document.getElementById("imagePath").value = "./public/images/user_image.png";
    //}
	return(validateImagePath() && validateFullName()  && validateEMail() && validateUName() && validatePasswd()
		&& validateRPasswd() && validateDOB());
	//document.getElementById("imagePath").value = "./public/images/user_image.png";

}



function validateSignIn()
{
	return (validateEMail() && validatePasswd());
}


function validateSubmit()
{
	return (validateEMail() && validateFeedback());
}


function validateEMail()
{
	var emailAddress = document.getElementById("email");

	if(emailAddress.value === "")
	{
		document.getElementById("emailError").innerHTML = "Enter your email address.";
		return false;
	}

	var isValid =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress.value);

	if(!isValid)
	{
		document.getElementById("emailError").innerHTML = "Invaid email address.";
		return false;
	}

	document.getElementById("emailError").innerHTML = "";
	return true;

}


function resetEMail()
{
	document.getElementById("emailError").innerHTML = "";
}


function validateUName()
{
	var username = document.getElementById("username");

	if(username.value == "")
	{
		document.getElementById("usernameError").innerHTML = "Enter your username.";
		return false;
	}
	else if((username.value).search(" ") !== -1)
	{
		document.getElementById("usernameError").innerHTML = "Invalid Username! Contains (SPACE) character.";
		return false;
	}

	document.getElementById("usernameError").innerHTML = "";
	return true;
}

function resetUName()
{
	document.getElementById("usernameError").innerHTML = "";
}


function validatePasswd(str)
{


	var pw = document.getElementById("passwd");
	var validPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(pw.value);


	if(passwd.value == "")
	{
		document.getElementById("passwdError").innerHTML = "Enter your password.";
		return false;
	}

	if(!validPw)
	{
		document.getElementById("passwdError").innerHTML = "Password must be at least 8 characters long with at least 1 number, 1 upper case and 1 lower case character.";
		return false;
	}

	return true;
}

function resetPasswd()
{
	document.getElementById("passwdError").innerHTML = "";
}


function validateRPasswd()
{
	var rpw = document.getElementById("rPasswd");

	if(rpw.value == "")
	{
		document.getElementById("rePasswdError").innerHTML = "Retype the password.";
		return false;
	}
	else if(rpw.value !== document.getElementById("passwd").value)
	{
		document.getElementById("rePasswdError").innerHTML = "Passwords don't match.";
		return false;
	}
	return true;
}

function resetRPasswd()
{
	document.getElementById("rePasswdError").innerHTML = "";
}


function validateDOB()
{
	var date = document.getElementById("dob");
	var isValid = /\d+\/\d+\/\d\d\d\d/.test(dob.value);

	if(dob.value == "" || !isValid)
	{
		document.getElementById("dobError").innerHTML = "Invalid date.";
		return false;
	}

	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var date = (dob.value).split("/");

	if(date[1]>12 || date[2]<1900)
	{
		document.getElementById("dobError").innerHTML = "Invalid date.";
		return false;
	}

	if((!(date[2]%4) && date[2]%100) || (!(date[2]%400)))
		daysInMonth[1] = 29;

	var monthIndex = date[1]-1;

	var today = new Date();

	// if((parseInt(today.getFullYear()) - parseInt(date[2])) < 15)
	// {
	// 	document.getElementById("dobError").innerHTML = "You must be above 15 years of age to use TeamSpark.";
	// 	return false;
	// }

	try{

		var bday = new Date(parseInt(date[2]), parseInt(date[1])+1, parseInt(date[0]));
		//document.getElementById("dobError").innerHTML = bday;
		var ageDif = Date.now()- bday.getTime(); //Milliseconds
		var yearAge = parseInt(ageDif)/(365*24*60*60*1000);

		if(ageDif < 0)
		{
			document.getElementById("dobError").innerHTML = "Gotta get back, back to the past Samurai Jack...";
			return false;
		}

		if(parseInt(yearAge)<15)
		{
			document.getElementById("dobError").innerHTML = "You must be above 15 years of age to use TeamSpark.";
			return false;
		}


	}catch(e){
		document.getElementById("dobError").innerHTML = number(date[1])+1;
		return false;
	}

	if(date[0] <= daysInMonth[monthIndex])
	{
		document.getElementById("dobError").innerHTML = "";
		return true;
	}

	document.getElementById("dobError").innerHTML = "Invalid date.";
	return false;


}


function resetDOB()
{
	document.getElementById("dobError").innerHTML = "";
}


function validateFullName()
{
	var fname = document.getElementById("fullname");

	if(fname.value == "")
	{
		document.getElementById("nameError").innerHTML = "Please enter your full name.";
		return false;
	}

	var isValid = /^[A-Z][a-z]* [A-Z][a-z]*/.test(fname.value);

	if(!isValid)
	{
		document.getElementById("nameError").innerHTML = "Invalid full name. Must be of form: John Citizen";
		return false;
	}

	//resetFullName();
	return true;

}


function resetFullName()
{
	document.getElementById("nameError").innerHTML = "";
}

var progLangCount = 0;

function addLangOpt()
{
	var options = document.getElementById("selectProgLanguage");
	var clone = options.cloneNode(true);

	clone.id = "progLangExtra"+(progLangCount+1);
	var formGroup = document.getElementById("progLanguages");
	formGroup.appendChild(clone);
	progLangCount++;


	// var progLangExtra = document.createElement("input");
	// progLangExtra.id = "progLangExtra"+(progLangCount+1);
	// progLangExtra.name = "programmingLanguages";
	// progLangExtra.type = "text";
	// progLangExtra.value = "C++";
	// var form = document.forms['/register'];
	// var formGroup = document.getElementById("progLanguages");
	// formGroup.appendChild(progLangExtra);
	// progLangCount++;
	// formGroup.insertBefore(progLangExtra, addButton);
}


function minusLangOpt()
{
	if(progLangCount>0)
	{
		document.getElementById("progLangExtra"+progLangCount).remove();
		progLangCount--;
	}
}



var spokenLangCount = 0;

function addSpeakOpt()
{
	var options = document.getElementById("selectSpokenLanguage");
	var clone = options.cloneNode(true);

	clone.id = "spokenLanguages"+(spokenLangCount+1);
	var formGroup = document.getElementById("spokenLanguages");
	formGroup.appendChild(clone);
	spokenLangCount++;

	// var speakLangExtra = document.createElement("input");
	// speakLangExtra.id = "spokenLanguages"+(spokenLangCount+1);
	// speakLangExtra.name = "spokenLanguages";
	// speakLangExtra.type = "text";
	// speakLangExtra.value = "French";
	// var form = document.forms['/register'];
	// var formGroup = document.getElementById("spokenLanguages");
	// formGroup.appendChild(speakLangExtra);
	// spokenLangCount++;
	// formGroup.insertBefore(speakLangExtra, addButton);
}


function minusSpeakOpt()
{
	if(spokenLangCount>0)
	{
		document.getElementById("spokenLanguages"+spokenLangCount).remove();
		spokenLangCount--;
	}
}

var accountCount = 0;

function addAccountOpt()
{
	var accountExtra = document.createElement("input");
	accountExtra.id = "account"+(accountCount+1);
	accountExtra.name = "accounts";
	accountExtra.type = "text";
	accountExtra.placeholder = "StackOverflow, LinkedIn, ...";
	var form = document.forms['/register'];
	var formGroup = document.getElementById("accountsGroup");
	formGroup.appendChild(accountExtra);
	accountCount++;
}


function minusAccountOpt()
{
	if(accountCount>0)
	{
		document.getElementById("account"+accountCount).remove();
		accountCount--;
	}
}

function validateLanguage()
{
	if(document.getElementById("language").value === "other")
	{
		if(!document.contains(document.getElementById("altlang")))
		{
			var info = document.createElement("label");
			info.innerHTML = "Please Specify ";
			info.id = "altlanginfo";

			var lang = document.createElement("input");
			lang.type = "text";
			lang.placeholder = "language";
			lang.id = "altlang";

			var brk = document.createElement("br");
			brk.id = "langbrk";

			var form = document.forms['/register'];
			var button = document.getElementById("preterm");
			form.appendChild(info);
			form.appendChild(lang);
			form.insertBefore(lang, button);
			form.insertBefore(info, lang);
			//form.insertBefore(brk, button);
		}
	}

	else
	{
		if(document.contains(document.getElementById("altlang")))
		{
			document.getElementById("altlang").remove();
			document.getElementById("altlanginfo").remove();
		}
	}


}


function checkAgreement()
{
	var checkboxState = document.getElementById("agreebox").checked;

	if(checkboxState)
	{
		document.getElementById("agreementErr").innerHTML = "";
		return true;
	}

	document.getElementById("agreementErr").innerHTML = "You need to agree to the terms.";
	return false;
}

function expandTerms()
{
	if(document.getElementById("terms").innerHTML === "Show")
	{
		var info = document.createElement("div");
		info.innerHTML = "GNU General Public Licence : Terms 1.1  Random Text You are agreeing to our terms I could post something long  but that might bore you!  Just click on I agree. 1.2 Random text";
		info.height = "30px";
		info.id = "scrollableText";

		var form = document.forms.signup;
		// var checkBox = document.getElementById("checkbox");
		document.getElementById("terms").innerHTML = "Hide";

		form.appendChild(info);
		var button = document.getElementById("preterm");
		form.insertBefore(info, button);
		// form.insertBefore(checkBox, info);

	}
	else
	{
		document.getElementById("terms").innerHTML = "Show";
		document.getElementById("scrollableText").remove();
	}

}



function success()
{
	var user = document.getElementById('username').value;
	alert("Congratulations, "+user+" you are now signed in.");
	window.location.href = './index.html';
}

function successContact()
{
	var email = document.getElementById('email').value;
	alert("Thanks! feedback was sent to us, we will try to get back to you via: "+email);
	window.location.href="./index.html";
}


function validateFeedback()
{
	var feedback = document.getElementById("feedback");

	if((feedback.value).length < 100)
	{
		document.getElementById("genericError").innerHTML = "Responce needs to be 100 characters or longer. You typed: "+(feedback.value).length+" characters.";
		return false;
	}

	resetFeedback();
}

function resetFeedback()
{
	document.getElementById("genericError").innerHTML = "";
	return true;
}

function makeFooter()
{
   var lmDate = new Date(Date.parse(document.lastModified));
   var date = lmDate.getDate()+"/"+(lmDate.getMonth()+1)+"/"+lmDate.getFullYear();
   var time = lmDate.getHours()+":"+lmDate.getMinutes()+":"+lmDate.getSeconds();
   var datetime = date+" "+time;

   var a = "";
   a = a+"<p>Last Modified: "+datetime+"</p>";
   document.getElementById('footer').innerHTML = a;
}



function location_display()
{
	var x = document.getElementById("location");
	//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
	var loc = position.coords.latitude + "," + position.coords.longitude;
	var x = document.getElementById("location");
    //x.innerHTML =     x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
    x.innerHTML = position.coords.latitude +","+position.coords.longitude;
}




function validateImagePath()
{
	//var fs = require('fs');
	var filepath = document.getElementById("imagePath").value;

    if(filepath === "")
    	document.getElementById("imagePath").value = "./public/images/user_image.png";

	return true;
}



function getProgLanguageOpt()
{
	var progLang = ["Bash", "C", "C++", "C#", "Clojure", "CoffeeScript", "Haskell", "Java", "JavaScript",
	"Objective-C", "Perl", "PHP", "Python", "Scala","Swift"];

	if(!document.getElementById("selectProgLanguage").hasChildNodes())
	{
		var selectMenu = document.getElementById("selectProgLanguage");
		for(var i = 0; i<progLang.length; i++)
		{
			var opt = document.createElement('option');
			opt.innerHTML = progLang[i];
			opt.value = progLang[i];
			selectMenu.appendChild(opt);
		}
	}

}



function getCountryOpt()
{
	var countryList = [
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
	 "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"
 ];

 if(!document.getElementById("country").hasChildNodes())
 {
	 var countryMenu = document.getElementById("country");
	 for(var i = 0; i<countryList.length; i++)
	 {
		 var opt = document.createElement('option');
		 opt.innerHTML = countryList[i];
		 opt.value = countryList[i];
		 countryMenu.appendChild(opt);
	 }
 }

}


function selectionMatcher()
{
	getProgLanguageOpt();
	getCountryOpt();
}
