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

	var runners = [0,0,0];

	var homeScore = 0;
	var awayScore = 0;

	var currentInningRuns = 0;

	var swinging = false;
	var time;

	var vis_title = $('td#away');
	var home_title = $('td#home');
	vis_title.css('background-color','yellow');


btn.click(function(e){
		e.preventDefault();
		e.stopPropagation();

		



		
//reset the outs strikes and count function 
			function reset_outs(){
				reset_strikes();
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
					runners = [0,0,0];
					currentInningRuns = 0;
					reset_outs();
					clear_bases();
					vis_title.css('background-color','white'); home_title.css('background-color','yellow');
				}
			    else if (ab == 'Home') {
					ab = 'Visitors';
					$('.ab').html(ab);
					inning += 1;
					$('.inn_count').html(inning);
					runners = [0,0,0];
					currentInningRuns = 0;
					reset_outs();
					clear_bases();
					home_title.css('background-color','white'); vis_title.css('background-color','yellow');
				}
				else{
					console.log('ERR: CHANGE SIDES NOT HOME OR VISITORS');
				}
			}
			 
			function clear_bases(){
				$('.home_plate').css('background-color', 'white');
				$('.first_base').css('background-color', 'white');
				$('.second_base').css('background-color', 'white');
				$('.third_base').css('background-color', 'white');
			}



			function update_score(){
				/*
				if(ab == 'Visitors'){
					
					
					console.log('homeScore: ' + homeScore + ' awayScore: ' +  awayScore );
					console.log('currentInningRuns: ' + currentInningRuns);
				}
				else if(ab == 'Home'){
					
					console.log('homeScore: ' + homeScore + ' awayScore: ' +  awayScore );
					console.log('currentInningRuns: ' + currentInningRuns);
				}
				*/
			}

			function add_run(){
				var vis_class = '.vis_inn_' + inning;
				var home_class = '.home_inn_' + inning;
				console.log('add run called;')
				if(ab == 'Visitors'){
					console.log('add run to awayScore' + ' currentInningRuns: ' + currentInningRuns);
					console.log('homeScore: ' + homeScore + ' : awayScore: ' + awayScore);
					currentInningRuns += 1;
					awayScore += 1;
					$(vis_class).html(currentInningRuns);
					$('.vis_R').html(awayScore);
				}
				else if(ab == 'Home'){
					console.log('add run to awayScore' + ' currentInningRuns: ' + currentInningRuns);
					console.log('homeScore: ' + homeScore + ' : awayScore: ' + awayScore);
					currentInningRuns += 1;
					homeScore += 1;
					$(home_class).html(currentInningRuns);
					$('.home_R').html(homeScore);
				}
			}

		function bases(x){
			// runner logic - 1 for singles, 2 doubles, so on
			switch(x){
				case 1:
					// advance runner to next base
					console.log('single');
					clear_bases();
					for(r = 2; r >= 0; r--){
						if((r === 2) && runners[r] == 1){ 
							runners[r] = 0;
							add_run();
							//update_score(); 
						}
						else if((r <= 0) && runners[r] === 1){ 
							runners[r] = 0; 
							runners[r + 1] = 1; 
						}
						console.log('r: ' + r + ' added ' + runners[r] + ' to score');
					}

					runners[0] = 1;
					reset_strikes();
					$('.first_base').css('background-color', 'yellow');
					if(runners[1] == 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] == 1){$('.third_base').css('background-color', 'yellow');}
										  
					break;
				case 2:
					console.log('double');
					clear_bases();
					// add runners to score
					for(r = 2; r >= 0; r--){
						if((r >= 1) && runners[r] === 1){ 
							runners[r] = 0; 
							add_run();
							//update_score(); 
							console.log('added 1 to score');
						}else if((r < 1) && runners[r] == 1){ 
							runners[r + 2] = 1; 
							runners[r] = 0;
						}
					}

					
					runners[1] = 1; runners[0] = 0;					
					reset_strikes();
					$('.second_base').css('background-color', 'yellow');
					if(runners[2] == 1){$('.third_base').css('background-color', 'yellow');}
					break;
				case 3:
					console.log('triple');
					clear_bases();
					// add runners to score
					// loop through runners on extra bases if any
					// and add them to score
					for(r = 2; r >= 0; r--){
						if((r >= 0) && runners[r] === 1){ 
							runners[r] = 0; 
							console.log('runners[r] - should be 0! ' + runners[r]);
							add_run();
							//update_score(); 
						} 
					}

					
					runners[2] = 1; runners[1] = 0; runners[0] = 0;
					console.log('runners after explicit set: ' + runners);	
					reset_strikes();
					$('.third_base').css('background-color', 'yellow');
					break;
				case 4:

					// clear home
					// advance runners
					console.log('DONGER!');
					console.log('runners before donger: ' + runners);
					clear_bases();
					for(r = 2; r >= 0; r--){
						if(runners[r] === 1){ 
							runners[r] = 0; 
							add_run();
							//update_score(); 
							console.log('runner was on ' + r + ' 1 added to score');
						}
						console.log('base(r): ' + r + ' - runners[r]: ' + runners[r]);
					} 
					add_run();
					//update_score();
					reset_strikes();
				    runners[2] = 0; runners[1] = 0; runners[0] = 0;	
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

				$('.vis_inn_1').parent().next().addClass('`');
				$('.home_inn_1').parent().next().addClass('active');
				console.log('next inning'); 

			}
/*
		$('.home_plate').css('background-color', 'white');
		$('.first_base').css('background-color', 'white');
		$('.second_base').css('background-color', 'white');
		$('.third_base').css('background-color', 'white');
	 

		if(running == false){ 
			running = true; 
			// start timer
			start = new Date().getTime();

		}
*/


		if(swinging === false){
			swinging = true;
			start = new Date().getTime();
		}
		else if(swinging === true){
			swinging = false;
			end = new Date().getTime();
			time = end - start;
			swing(time);
		}else{
			alert('something wrong with swinging variable')
			console.log('swinging: ' + swinging);
		}


		function swing(time){

			console.log('swing! strikes: ' + strikes + ' outs: ' + outs + ' currentInningRuns:' + currentInningRuns);
			console.log(' homeScore: ' + homeScore + ' awayScore: ' + awayScore + ' runners: ' + runners);
			console.log('ab: ' + ab + ' runners: ' + runners);


			running = false; 
			//var end = new Date().getTime();

			//var time = end - start;
			console.log("time: " + time);
			$('inn_count').html(inning);
			// stop timer
			// calculate time
			// post time #1
			// post time from last click

			if(time < 920){
				result = 'strike';
				add_strike();

				if(strikes > 2){
					reset_strikes();
					add_out();

					if(outs > 2){
						change_sides();
					}
				}
			}
			else if(time >= 920 && time < 940){
				// logic for single
				result = 'single';
				reset_strikes();
			    bases(1);
			}
			else if(time >=940 && time < 970){
				// double
				result = 'double';
				reset_strikes();
				bases(2);
			}
			else if(time >=970 && time < 1000){
				// triple
				result = 'triple';
				reset_strikes();
				bases(3);
			}
			else if(time >=1000 && time < 1100){
				// donger
				result = 'Home Run!'
				//adv_runners() * 4;
				reset_strikes();
				bases(4);
			}
			else if(time >= 1100){
				// out
				result = 'Out!'
				outs += 1;
				$('.out_count').html(outs)
				reset_strikes();
				
				if(outs > 2){
					outs = 0;
					$('.out_count').html(outs);
					change_sides();
				}
			}
			else{
				console.log('somethings wrong with the time var!');
				console.log('time (should be a number) : ' + time);
			}

			if(inning > 9 && homeScore != awayScore){
				if(homeScore > awayScore){
					alert("Home Team Wins!!")
				}
				else{ 
					alert("Visiting Team Wins!!")
				}

			}
		
			homeAway = "away"



		}

		var fixed_result = (time/1000).toFixed(2);

	$('#a-time').html(fixed_result + ' ' + result); 
						





	});
});