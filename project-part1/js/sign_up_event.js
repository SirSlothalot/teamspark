document.getElementById("passwd").onblur = validatePasswd; 
document.getElementById("username").onblur = validateUName;
document.getElementById("username").onfocus = resetUName;
document.getElementById("passwd").onfocus = resetPasswd;
document.getElementById("email").onblur = validateEMail; 
document.getElementById("rPasswd").onblur = validateRPasswd;
document.getElementById("email").onfocus = resetEMail;
document.getElementById("rPasswd").onfocus = resetRPasswd;

document.getElementById("dob").onblur = validateDOB;
document.getElementById("dob").onfocus = resetDOB;


document.getElementById("fullname").onblur= validateFullName;
document.getElementById("fullname").onfocus = resetFullName;

document.getElementById("agreebox").onclick = checkAgreement;

document.getElementById("language").onclick= validateLanguage;
document.getElementById("terms").onclick= expandTerms;
