$(document).ready(function(){

var running = false;
var btn = $('#timeBtn');
var start;
var inning = 1;
var lastAction;
var homeAway = 'away';
var strikes = 0;
var outs = 0;
var ab = 'Visitors';
var result = '';

var runner1 = 0; 
var runner2 = 0;
var runner3 = 0;
var runner4 = 0;

var homeScore = 0;
var awayScore = 0;


btn.click(function(e){
		e.preventDefault();
		e.stopPropagation();
		
//reset the outs strikes and count function 
			function reset_outs(){
				outs = 0;
				$('.out_count').html(outs);			 
		}
			
			function reset_strikes(){
				strikes = 0;	
				$('.strike_count').html(strikes);

			}
			function reset_count(){
				strikes = 0;	
				$('.strike_count').html(strikes);
				outs = 0;
				$('.out_count').html(outs);
			}


//add a strike and print it
			function add_strike(){
				strikes += 1;
				$('.strike_count').html(strikes);
			}


//add a out and print it
			function add_out(){
				outs += 1
				$('.out_count').html(outs);

			}

//change who's at bat
			function change_sides(){
				if(ab == 'Visitors') {
					ab = 'Home';
					$('.ab').html(ab);
					}
			    else {
					ab = 'Visitors';
					$('.ab').html(ab);
					inning += 1;
					$('.inn_count').html(inning);


							}
			}
/*
//advance a runner forward
			function adv_runners(){
				runner1 += 1;
				if(runner1 > 0 && runner2 == 0 && runner3 == 0 && runner4 == 0 && result == 'single'){
					runner2 += 1;
					console.log('runner1: ' + runner1 + ' runner2: ' + runner2);
				}
				else if(runner1 > 0 && runner2 > 0 &&){
					runner3 +=1;
					console.log('runner3 increased! ' + ' runner3: ' + runner3);
				}
				else if (runner1 > 0 && runner2 > 0 && runner3 > 0){
					runner4 +=1;
					console.log('runner4 increased! ' + ' runner4: ' + runner4);
				}

	            }
	            if (runner1 > 3) {
					if (ab == 'Home') {
						homeScore +=1;
						$('.home_inn_1').html('homeScore')
					}

				awayScore +=1;
				$('.vis_inn_1').html('awayScore');
				

			};
*/

		function bases(x){
			var runners = [0,0,0,0];
			var b1, b2, b3, b4;

			var score = ab == 'Visitors' ? awayScore : homeScore;


			switch(x){
				case 1:
					// advance runner to next base
					runners[3] = 0; 
					for(r = 0; r <= 3; r++){
						runners[r+1] += 1;
						runners[r] -=1;
					} 
					if(runners[3] > 0){
						score += runners[3];
					}
					if(runners[0] = 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] = 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] = 1){$('.third_base').css('background-color', 'yellow');}
						
					  
					break;
				case 2:
					// clear home
					runners[3] = 0; 
					// advance runners
					for(r = 0; r <= 3; r++){
						runners[r+2] += 1;
						runners[r] -= 1;
					} 
					// add runners to score
					// loop through runners on extra bases if any
					// and add them to score
					if(runners.length() > 2){
						for(r = runners.length(); r > 3; r--){
							score += runners[r];
							console.log('added ' + runners[r] + ' to score');
						}
					}
					if(runners[0] = 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] = 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] = 1){$('.third_base').css('background-color', 'yellow');}
					break;
				case 3:
					// clear home
					runners[3] = 0; 
					// advance runners
					for(r = 0; r <= 3; r++){
						runners[r+3] += 1;
						runners[r] -= 1;
					} 
					// add runners to score
					// loop through runners on extra bases if any
					// and add them to score
					if(runners.length() > 2){
						for(r = runners.length(); r > 3; r--){
							score += runners[r];
							console.log('added ' + runners[r] + ' to score');
						}
					}
					if(runners[0] = 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] = 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] = 1){$('.third_base').css('background-color', 'yellow');}
					break;
				case 4:
					// clear home
					runners[3] = 0; 
					// advance runners
					for(r = 0; r <= 3; r++){
						runners[r+4] += 1;
						runners[r] -= 1;
					} 
					// add runners to score
					// loop through runners on extra bases if any
					// and add them to score
					if(runners.length() > 2){
						for(r = runners.length(); r > 3; r--){
							score += runners[r];
							console.log('added ' + runners[r] + ' to score');
						}
					}
					if(runners[0] = 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] = 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] = 1){$('.third_base').css('background-color', 'yellow');}
					break;
				default:
					$('#bases').css('background-color', 'white');

			}

		}

//Highlighting the inning on the scoreboard			}
		$('.vis_inn_1').addClass('active')
		$('.home_inn_1').addClass('active')

			if(ab == 'Home' && outs > 2){
				change_sides();
				

				$('.vis_inn_1').parent().next().addClass('active');
				$('.home_inn_1').parent().next().addClass('active');
				console.log('next inning'); 

			}

		$('.home_plate').css('background-color', 'white');
		$('.first_base').css('background-color', 'white');
		$('.second_base').css('background-color', 'white');
		$('.third_base').css('background-color', 'white');
	 

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
			$('inn_count').html(inning);
			// stop timer
			// calculate time
			// post time #1
			// post time from last click

			if(time < 970){
				result = 'strike';
				add_strike();
				if(strikes > 2){
					reset_strikes();
					add_out();
						if(outs > 2){
							reset_strikes();
							change_sides();
							add_out();
						}

				}
			}
			else if(time >= 970 && time < 980){
				// logic for single
				result = 'single';
				reset_strikes();
			    bases(1);
				$('.first_base').addClass('active');


			}
			else if(time >=980 && time < 990){
				// double
				result = 'double';
				add_strike();
				$('.second_base').addClass('active');
				bases(2);

			}
			else if(time >=990 && time < 1000){
				// triple
				result = 'triple';
				bases(3);
			}
			else if(time >=1000 && time < 1100){
				// donger
				result = 'Home Run!'
				//adv_runners() * 4;
				bases(4);
				if(ab == 'Visitors'){
					awayScore += 1
					$('.vis_inn_1').html(awayScore)
			}
			else{
					homeScore += 1
					$('.home_inn_1').html(homeScore)
				}
			}
			else if(time >= 1100){
				// out
				result = 'Out!'
				outs += 1;
				$('.out_count').html(outs)
				strikes = 0;
				$('.strike_count').html(strikes);
					if(outs > 2){
						outs = 0;
						$('.out_count').html(outs);
							if(ab == 'Visitors'){
								ab = 'Home';
								$('.ab').html(ab);
							} 
								else { 
									ab = 'Visitors';
									inning += 1;
									$('.ab').html(ab);
									$('.inn_count').html(inning);
							}
					}
			}
			else{
				consle.log('somethings wrong with the time var!');
				console.log('time: ' + time);
			}

			if(inning > 9 && homeScore != awayScore){
				if(homeScore > awayScore){
					alert("Home Team Wins!!")
				}
						else{ alert("Visiting Team Wins!!")}

					}


						homeAway = "away"
					}

						$('#a-time').html((time)/1000 + ' ' +result); 
						




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