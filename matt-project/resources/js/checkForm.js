"use strict";

function modifiedDate() {
    document.getElementById('lastModDate').innerHTML += document.lastModified;
}

document.onload = modifiedDate();

function checkAge(alert, age) {
    if(this.validity.patternMismatch) {
        this.setCustomValidity(alert);
    } else if (parseInt(age, 10) < 16) {
        this.setCustomValidity('You must be at least 16 years old to use Teamspark.');
    } else if (parseInt(age, 10) > 100) {
        this.setCustomValidity("Invalid age. Who is that old?");
    } else {
        this.setCustomValidity('YOU');
    }
}

// function addInterest() {
//     var button = document.getElementByID("add-button");
//     var buttonClone = button.cloneNode(true);
//     var originalInput = document.getElementByID("interest1");
//     var cloneInput = original.cloneNode(true);
//     document.getElementByID("interests").removeChild(button);
//     document.getElementByID("interests").appendChild(cloneInput);
//     document.getElementByID("interests").appendChild(buttonClone);
// }

function checkValidity(alert) {
    this.setCustomValidity(this.validity.patternMismatch ? alert : '');
}

function setPassword(targetID, pattern) {
    var target = document.getElementByID(targetID);
    if(this.checkValidity()) {
        target.pattern = pattern;
    }
}
