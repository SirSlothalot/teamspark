document.getElementById("passwd").onblur = validatePasswd; 
document.getElementById("username").onblur = validateUName;
document.getElementById("username").onfocus = resetUName;
document.getElementById("passwd").onfocus = resetPasswd;