$(document).ready(function(){

var running = false;
var btn = $('#timeBtn');
var start;
var inning = 1;
var lastAction;
var homeAway = away;
var strikes;
var outs;

var runner1; 
var runner2;
var runner3;

var homeScore;
var awayScore;

btn.click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(running == false){ 

			running = true; 

			// start timer
			start = new Date().getTime();






		}
		else{ 
			running = false; 
			var end = new Date().getTime();

			var time = end - start;
			console.log("time: " + time);
			// stop timer
			// calculate time
			// post time #1
			// post time from last click

			if(time < 970){
				strikes += 1;
				var lastAction = strike;
			}
			else if(time >= 970 && time < 980){
				// logic for single

			}
			else if(time >=980 && time < 990){
				// double
			}
			else if(time >=990 && time < 1000){
				// triple
			}
			else if(time >=1000 && time < 1100){
				// donger
			}
			else if(time >= 1100){
				// out
			}
			else{
				consle.log('somethings wrong with the time var!');
				console.log('time: ' + time);
			}


			if(strikes > 2){
				strikes = 0;
				outs += 1;
				if(outs > 2){
					outs = 0;
					if(homeAway == "away"){
						homeAway = "home"
					}
					else{ 
						inning += 1;
						if(inning > 9 && homeScore != awayScore){
							if(homeScore > awayScore){
								alert("Home Team Wins!!")
							}
							else{ alert("Visiting Team Wins!!")}

						}


						homeAway = "away"
					}
				}
			}

		}
		console.log('hello')
		console.log(running);




	});

function UndoLastAction(){
// write this - keep track of last action
}




});















/*var myStart = function() {
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
*/