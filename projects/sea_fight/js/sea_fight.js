function SeaFight()
{
	//this.f1 = function(){
		//a = 1;
		//return a;
	//}
	
	function PlayerField(){
		this.field = [];
		init_field( this.field );
//		this.draw = function( cell_id ){
//console.log("function draw", arguments);
//			$(cell_id).eq(0).addClass("marked-cell");
//		};

	};//end PlayerField
	
	PlayerField.prototype.draw = function( cell_id) {
//console.log("function PlayerField.prototype.draw", arguments);
		for( var n = 0; n < this.field.length; n++)
		{
			if( this.field[n] == 1)
			{
				$(cell_id).eq(n).addClass("marked-cell");
				$(cell_id).eq(n).text(n);
			}
			if( this.field[n] == 2)
			{
				$(cell_id).eq(n).addClass("marked2-cell");
				$(cell_id).eq(n).text(n);
			}
			if( this.field[n] == 21)
			{
				$(cell_id).eq(n).addClass("marked21-cell");
				$(cell_id).eq(n).text(n);
			}
			if( this.field[n] == 3)
			{
				$(cell_id).eq(n).addClass("marked3-cell");
			}
		}
	}//end draw
	
	function init_field( field ){

		for( var n1 = 0; n1 < 100; n1++)
		//for( var n1 = 0; n1 < 10; n1++)
		{
			//field[n1] = [];
			//for( var n2 = 0; n2 < 10; n2++)
			//{
				//field[n1].push(0);
			//}
			field.push(0);
		}

		var min = 0;
		var max =99;
		var rand_arr = [];
//test		
//rand_arr = [5, 58, 66, 96, 1, 40, 7];
 //[5, 29, 2, 21, 81, 89, 60]
		
		//locate four 1x ships
		for( var n = 0; n < 4; n++)
		{
			var test_func = function(  rand_v  ){
				return test_crossing_ships(  rand_v );
			}
			var rand_v = get_random_num_cell( test_func );
		}
 		for( var n = 0; n  <=3; n++)
		{
			var index = rand_arr[n];
			field[ index ] = 1;
		}
		
		
		//locate three 2x ships
		for( var n = 0; n < 3; n++)
		{
			var test_func = function(  rand_v  ){
				return test_crossing_ships(  rand_v );
			}
			//var rand_v = get_random_num_cell( test_func );
		}
		
 		for( var n = 4; n  <=7; n++)
		{
			var index = rand_arr[n];
			field[ index ] = 2;
			
			build_ship( type = 2, index);
		}
		
 console.log( rand_arr );
//console.log( field );

 
		function get_random_num_cell( test_func )
		{
			var rand_v = Math.random() * (max - min) + min;
			rand_v = Math.round( rand_v );
//console.log( rand_v );

			var test_repeat = false;
			for( var n = 0; n  < rand_arr.length; n++)
			{
				if( rand_v == rand_arr[n] )
				{
console.log( "error! repeat random value ", rand_v + " = " +  rand_arr[n] );
					test_repeat = true;
				}
			}//next
			
			var test_crossing_ship = test_func(  rand_v  );
			//var test_crossing_ship = false;
			
			if( !test_repeat && !test_crossing_ship)
			{
				rand_arr.push( rand_v);
			}
			else
			{
				get_random_num_cell( test_func );
			}
		}//end get_random_num_cell()

		function test_crossing_ships( test_num )
		{
//console.log(" function test_crossing_ships()");
			var crossing_ship = false;
			
			for( var n = 0; n  < rand_arr.length; n++)
			{
				var test_coord = rand_arr[n] - 1;
				if( test_num == test_coord )
				{
console.log( "error!, crossing left", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
				var test_coord = rand_arr[n] + 1;
				if( test_num == test_coord )
				{
console.log( "error!, crossing right ", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
				var test_coord = rand_arr[n] - 11;
				if( test_num == test_coord )
				{
console.log( "error!, crossing up-left ", test_num + " = " + test_coord );
					crossing_ship = true;
				}

				var test_coord = rand_arr[n] - 10;
				if( test_num == test_coord )
				{
console.log( "error!, crossing up ", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
				var test_coord = rand_arr[n] - 9;
				if( test_num == test_coord )
				{
console.log( "error!, crossing up-right ", test_num + " = " + test_coord );
					crossing_ship = true;
				}


				var test_coord = rand_arr[n] + 9;
				if( test_num == test_coord )
				{
console.log( "error!, crossing bottom-right ", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
				var test_coord = rand_arr[n] + 10;
				if( test_num == test_coord )
				{
console.log( "error!, crossing bottom ", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
				var test_coord = rand_arr[n] + 11;
				if( test_num == test_coord )
				{
console.log( "error!, crossing left ", test_num + " = " + test_coord );
					crossing_ship = true;
				}
				
			}//next
			
			return crossing_ship;
		}//end test_crossing_ships()

		
		
		function build_ship( type, start_num)
		{
console.log("function build_ship( type, num)", min, max);

			var num_line = Math.floor( start_num / 10 );
			var num_line_min = num_line * 10;
			var num_line_max = num_line_min + 9;

			var num = test_left_side()
			if( !num )
			{
				var num = test_up_side()
				if( !num )
				{
					var num = test_right_side()
					if( !num )
					{
						return;
					}
					else
					{
						field[ num ] = 21;
					}
					return;
				}
				else
				{
					field[ num ] = 21;
				}

				return;
			}
			else
			{
				field[ num ] = 21;
			}

			function test_left_side()
			{
				var num = start_num - 1;
console.log(  "test_left_side()" , num, "num_line = " + num_line, num_line_min, num_line_max );
console.log( num >= num_line_min );
				if( num >= num_line_min )
				{
					//test crossing ships
					//test left
					var num = start_num - 2;
					if( field[ num ] > 0 )
					{
						return num;
					}
					else
					{
console.log( "error!, crossing ship!", start_num,num);
					}
				}
				else
				{
console.log( "error!, out  from num_line_min", num_line_min);
				}
				return false;
			}//end test_left_side()

			function test_up_side()
			{
				var num = start_num - 10;
//console.log(  "test_up_side()" , num, "num_line = " + num_line, num_line_min, num_line_max );
//console.log( num >= min );
				if( num >= min )
				{
					return num;
				}
				else
				{
//console.log( "error!, out  from min", min);
				}
				return false;
			}//end test_up_side()
			
			function test_right_side()
			{
				var num = start_num + 1;
//console.log(  "test_right_side()" , num, "num_line = " + num_line, num_line_min, num_line_max );
//console.log( num <= num_line_max );
				if( num <= num_line_max )
				{
					return num;
				}
				else
				{
//console.log( "error!, out  from num_line_max", num_line_max);
				}
				return false;
			}//end test_right_side()
			
		}//end build_ship()
		
	}//end init_field()
	
	//start
	this.player1_field = new PlayerField();
	this.player2_field = new PlayerField();

}//end SeaFight()




$(document).ready(function(){
	var seafight = new SeaFight();
//console.log( seafight.f1() );
//console.log( seafight );
	
//console.log( seafight.player1_field );
	var cell_id = "#player-fleet .cell";
	seafight.player1_field.draw( cell_id );

	var cell_id = "#computer-fleet .cell";
	seafight.player2_field.draw( cell_id );
	
	//var cell_id = "#player-fleet .cell";
	//seafight.init_field( cell_id );
	
});//end ready
