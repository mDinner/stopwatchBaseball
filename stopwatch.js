var myStart = function() {
    document.getElementById("a-time").innerHTML = "start";
    var startSecond = new Date();
	var seconds = startSecond.getSeconds();
	var startMil = startSecond.getMilliseconds()/1000;
	var startTime = seconds + startMil;
	console.log(startTime);
}    

var myStop = function() {
	var stopSecond = new Date();
	var ss = stopSecond.getSeconds();
	var stopMil = stopSecond.getMilliseconds()/1000;
	var stopTime = ss + stopMil;
	var end = (stopTime - startTime)/1000;
	console.log(stopTime);
	document.getElementById("a-time").innerHTML = end;

	if (end < startTime) {
		end = (stopTime + 1) - startTime;
	}	

}