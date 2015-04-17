var myScript = function() {
var s = new Date();
var seconds = s.getSeconds()*31536000;
console.log(seconds);
var numyears = Math.floor(seconds/31536000);
console.log(numyears);
var numdays = Math.floor((seconds % 31536000) / 86400);
var numhours = Math.floor(((seconds % 31536000)  % 86400) / 3600);
var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
var numseconds = Math.floor(((seconds % 31536000) % 86400) % 3600) % 60;
return numyears + " years " + numdays + " days " + numminutes + " minutes " + numseconds + " seconds ";

};