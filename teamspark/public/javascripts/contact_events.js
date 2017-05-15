document.getElementById("feedback").onblur = validateFeedback; 
document.getElementById("email").onblur = validateEMail;
document.getElementById("email").onfocus = resetEMail;
document.getElementById("feedback").onfocus = resetFeedback;