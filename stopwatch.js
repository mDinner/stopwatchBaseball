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
			    else if (ab == 'Home') {
					ab = 'Visitors';
					$('.ab').html(ab);
					inning += 1;
					$('.inn_count').html(inning);
				}
				else{
					alert('somethings wrong with the team');
				}
			}
			 
			function update_score(){
				var vis_class = '.vis_inn_' + inning;
				var home_class = '.home_inn_' + inning;
				if(ab == 'Visitors'){
					$(vis_class).html(awayScore);
				}
				else if(ab == 'Home'){
					$(home_class).html(homeScore);
				}
				else{alert('team is not home or away!!')};
			}

			function add_run(){
				if(ab == 'Visitors'){
					awayScore += 1;
				}
				else if(ab == 'Home'){
					homeScore += 1;
				}
			}

		function bases(x){
			// runner logic - 1 for singles, 2 doubles, so on
			switch(x){
				case 1:
					// advance runner to next base
					alert('single! score');
	
					for(r = 2; r >= 0; r--){
						if((r === 2) && runners[r] == 1){ 
							runners[r] = 0;
							add_run();
							update_score(); 
						}
						else if((r <= 0) && runners[r] === 1){ 
							runners[r] = 0; 
							runners[r + 1] = 1; 
						}
						console.log('r: ' + r + ' added ' + runners[r] + ' to score');
						alert('runners: ' + runners);
					}

					runners[0] = 1;
					alert('after explicit set, runners: ' +  runners );

					
					if(runners[0] == 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] == 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] == 1){$('.third_base').css('background-color', 'yellow');}
										  
					break;
				case 2:
					alert('double!');
					// clear home
					// add runners to score
					for(r = 2; r >= 0; r--){
						if((r >= 1) && runners[r] === 1){ 
							runners[r] = 0; 
							add_run();
							update_score(); 
							console.log('added 1 to score');
						}else if((r < 1) && runners[r] == 1){ 
							runners[r + 2] = 1; 
							runners[r] = 0;
						}
					}

					
					runners[1] = 1; runners[0] = 0;					
					if(runners[0] == 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] == 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] == 1){$('.third_base').css('background-color', 'yellow');}
					
					console.log('runners: ' + runners +  ' - score: ' + score);	
					break;
				case 3:
					alert('triple!');
					// add runners to score
					// loop through runners on extra bases if any
					// and add them to score
					for(r = 2; r >= 0; r--){
						alert('r: ' + r + ' runners[r]: ' + runners[r] );
						if((r >= 0) && runners[r] === 1){ 
							alert('greater than 3! & equal to 1	');
							runners[r] = 0; 
							console.log('runners[r] - should be 0! ' + runners[r]);
							add_run();
							update_score(); 
							alert('score increased'); 
						} 
					}

					
					runners[2] = 1; runners[1] = 0; runners[0] = 0;
					console.log('runners after explicit set: ' + runners);	

					if(runners[0] == 1){$('.first_base').css('background-color', 'yellow');}
					if(runners[1] == 1){$('.second_base').css('background-color', 'yellow');}
					if(runners[2] == 1){$('.third_base').css('background-color', 'yellow');}
					break;
				case 4:
					alert('DONGER!');
					// clear home
					// advance runners

					for(r = 2; r >= 0; r--){
						if(runners[r] === 1){ 
							runners[r] = 0; 
							add_run();
							update_score(); 
							console.log('runner was on ' + r + ' 1 added to score');
						}
						console.log('base(r): ' + r + ' - runners[r]: ' + runners[r]);
						alert('runners: ' + runners);
					} 
					add_run();
					update_score();
					
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

			if(time < 920){
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
			else if(time >= 920 && time < 940){
				// logic for single
				result = 'single';
				reset_strikes();
				alert('hit');
			    bases(1);
				$('.first_base').addClass('active');
			}
			else if(time >=941 && time < 970){
				// double
				alert('hit');
				result = 'double';
				add_strike();
				$('.second_base').addClass('active');
				bases(2);
			}
			else if(time >=971 && time < 1000){
				// triple
				alert('hit');
				result = 'triple';
				bases(3);
			}
			else if(time >=1000 && time < 1100){
				// donger
				alert('hit');
				result = 'Home Run!'
				//adv_runners() * 4;
				bases(4);
				if(ab == 'Visitors'){
					awayScore += 1
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
					change_sides();
				}
			}

			else{
				console.log('somethings wrong with the time var!');
				console.log('time: ' + time);
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

	$('#a-time').html((time)/1000 + ' ' + result); 
						





	});
});