//alert("graphics_curves.js");
window.onload = function(){

		//sinus
		var context = document.querySelector("#canvas-sin").getContext("2d");
		context.fillStyle = 'blue';
		var params = {
			start_x : 100,
			start_y : 100,
			step : 0.01,
			num_repeat :  Math.PI * 4,
			k1 : 30,
			k2 : 70
		};
		sinus( context, params);
/*
		if( document.querySelector)
		{
			var form1 = document.querySelector("#form1");
		}
		else
		{
			var form1 = document.getElementById("form1");
		}
console.log(form1);
*/		

		form_1.onsubmit = function( event ){
		
			var canvas = document.querySelector("#canvas-sin");
			var context = canvas.getContext("2d");
			context.fillStyle = 'blue';
			
			var start_x = parseInt( form_1.start_x.value );
			var start_y = parseInt( form_1.start_y.value );
			var step = parseFloat( form_1.step.value );
			var num_repeat = eval( form_1.num_repeat.value );
			var k1 = parseInt( form_1.k1.value );
			var k2 = parseInt( form_1.k2.value );
			var params = {
				start_x : start_x,
				start_y : start_y,
				step : step,
				num_repeat : num_repeat ,
				k1 : k1,
				k2 : k2
			};
console.log("submit", params);
			sinus( context, params);
			event.preventDefault();
		};

//=======================================		
		//circle
		var context = document.querySelector("#canvas-circle").getContext("2d");
		context.fillStyle = 'red';
		var start_x = 75;
		var start_y = 100;
		var radius = 70;
		var step = 0.03;
		var num_repeat =  Math.PI * 6;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( Math.cos( n ) * radius ) ;
			y = start_y + ( Math.sin( n ) * radius );
			context.fillRect(x, y, 2, 2);
		}
		
		context.fillStyle = 'blue';
		var start_x = 200;
		var start_y = 100;
		var px = 50; // сжатие по X
		var py = 70; // сжатие по Y
		var step = 0.03;
		var num_repeat =  Math.PI * 6;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( Math.cos( n ) * px ) ;
			y = start_y + ( Math.sin( n ) * py );
			context.fillRect(x, y, 2, 2);
		}
		
		context.fillStyle = '#000000';
		var start_x = 330;
		var start_y = 100;
		var px = 70; // сжатие по X
		var py = 50; // сжатие по Y
		var step = 0.03;
		var num_repeat =  Math.PI * 6;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( Math.cos( n ) * px ) ;
			y = start_y + ( Math.sin( n ) * py );
			context.fillRect(x, y, 2, 2);
		}

		//spiral
		context.fillStyle = 'green';
		var start_x = 75;
		var start_y = 300;
		var px = 3; // сжатие по X
		var py = 3; // сжатие по Y
		var step = 0.01;
		var num_repeat =  Math.PI * 6;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x_ = ( Math.cos( n ) + n  * Math.sin( n ) ) * px;
			y_ = ( Math.sin( n ) - n * Math.cos( n ) ) * py;

			x = start_x + ( Math.round(x_) ) ;
			y = start_y + ( Math.round(y_) );
			context.fillRect(x, y, 2, 2);
		}
		context.font='30px Arial';
		//context.textAlign = "center"; 
		//context.textBaseline = "middle"; 
		context.fillText("Архимедова спираль", 30, 230); 
		

		
		//box, cross
		var context = document.querySelector("#canvas-cross").getContext("2d");
		
		//box
		context.strokeStyle = "red";
		context.fillStyle = '#000000';
		var start_x = 75;
		var start_y = 100;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 50; 
		var step = 1;
		var num_repeat =  60;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( Math.cos( a )  ) );
			y = start_y + ( k * Math.round( Math.sin( a )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();

		//cross
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 220;
		var start_y = 100;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 30; 
		var step = 1;
		var num_repeat =  62;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 2*Math.cos( a )  ) );
			y = start_y + ( k * Math.round( 2*Math.sin( a )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();

		//cross2
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 370;
		var start_y = 100;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 20; 
		var step = 1;
		var num_repeat =  62;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 4*Math.cos( a )  ) );
			y = start_y + ( k * Math.round( 4*Math.sin( a )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();
		
		//romb
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 550;
		var start_y = 100;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 50; 
		var step = 1;
		var num_repeat =  8;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( Math.cos( n )  ) );
			y = start_y + ( k * Math.round( Math.sin( n )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
		}
		context.closePath();
		context.stroke();
		
		//stairway
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 80;
		var start_y = 250;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 30; 
		var step = 1;
		var num_repeat =  62;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 2*Math.cos( a ) + Math.sin ( a ) ) );
			y = start_y + ( k * Math.round( 2*Math.sin( a )  + Math.cos( a ) ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();
		
		//stairway2
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 200;
		var start_y = 250;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 20; 
		var step = 1;
		var num_repeat =  62;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 2*Math.cos( a ) + (1*Math.sin ( a ))  ) );
			y = start_y + ( k * Math.round( 2*Math.sin( a )  + (4*Math.cos( a ))  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();
		
		//stairway3
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 320;
		var start_y = 250;
		//context.moveTo( start_x, start_y );
		var a = 0; 
		var k = 20; 
		var step = 1;
		var num_repeat =  63;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 2*Math.cos( a ) + (5*Math.sin ( a ))  ) );
			y = start_y + ( k * Math.round( 2*Math.sin( a )  + (4*Math.cos( a ))  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
			a = a + 0.1;
		}
		context.closePath();
		context.stroke();
		

		//oktagon
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 530;
		var start_y = 250;
		//context.moveTo( start_x, start_y );
		var k = 40; 
		var step = 1;
		var num_repeat =  360;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( 2*Math.cos( n )  ) );
			y = start_y + ( k * Math.round( 2*Math.sin( n )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
		}
		context.closePath();
		context.stroke();
		
		//triangle_box
		//context.strokeStyle = "blue";
		//context.fillStyle = '#000000';
		var start_x = 75;
		var start_y = 380;
		//context.moveTo( start_x, start_y );
		var k = 40; 
		var step = 1;
		var num_repeat =  18;
		context.beginPath();
		for ( n = 0;  n < num_repeat; n += step) 
		{
			x = start_x + ( k * Math.round( Math.cos( n )  ) );
			y = start_y + ( k * Math.round( Math.sin( n )  ) );
			context.fillRect(x, y, 3, 3);
			context.lineTo( x, y);
		}
		context.closePath();
		context.stroke();

		
		//ulitka
		var context = document.querySelector("#canvas-epic").getContext("2d");

		context.fillStyle = 'green';
		var params = {
			start_x : 150,
			start_y : 100,
			px : 60, // сжатие по X
			py : 60, // сжатие по Y
			step : 0.009,
			num_repeat :  Math.PI * 6,
			k1 : 10,
			k2 : 10,
			k3 : 10
		};
		epic_ulitka( context, params );
		//text
		context.font = "bold 14рх Arial"; 
		//context.textAlign = "center"; 
		//context.textBaseline = "middle"; 
		context.fillText("Улитка Паскаля", 70, 15); 		
		
		context.fillStyle = 'red';
		var params = {
			start_x : 220,
			start_y : 100,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.009,
			num_repeat :  Math.PI * 6,
			k1 : 10,
			k2 : 10,
			k3 : 5
		};
		epic_ulitka( context, params );
		
		context.fillStyle = 'blue';
		var params = {
			start_x : 380,
			start_y : 100,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.0009,
			num_repeat :  Math.PI * 6,
			k1 : 5,
			k2 : 5,
			k3 : 6
		};
		epic_ulitka( context, params );

		//epic 3
		context.fillStyle = 'blue';
		var params = {
			start_x : 550,
			start_y : 100,
			r0 : 40, // радиус неподвижного круга
			r1 : 15, // радиус скользящего круга
			d : 35,// расстояние от центра неподвижного круга до точки
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		//epic 2
		context.fillStyle = 'black';
		var params = {
			start_x : 60,
			start_y : 250,
			r0 : 30, // радиус неподвижного круга
			r1 : 10, // радиус скользящего круга
			d : 10,// расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		var params = {
			start_x : 160,
			start_y : 250,
			r0 : 40, // радиус неподвижного круга
			r1 : 10, // радиус скользящего круга
			d : 10,// расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		var params = {
			start_x : 270,
			start_y : 250,
			r0 : 40, // радиус неподвижного круга
			r1 : 6.666666667, // радиус скользящего круга
			d : 6.666666667, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		//epic 2
		context.fillStyle = 'maroon';
		var params = {
			start_x : 390,
			start_y : 250,
			r0 : 50, // радиус неподвижного круга
			r1 : 5, // радиус скользящего круга
			d : 5, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );

		context.fillStyle = 'blue';
		var params = {
			start_x : 530,
			start_y : 260,
			r0 : 37, // радиус неподвижного круга
			r1 : 15.857142859, // радиус скользящего круга
			d : 15, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		context.fillStyle = 'red';
		var params = {
			start_x : 75,
			start_y : 380,
			r0 : 35, // радиус неподвижного круга
			r1 : 10, // радиус скользящего круга
			d : 10, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		context.fillStyle = 'olive';
		var params = {
			start_x : 200,
			start_y : 390,
			r0 : 35, // радиус неподвижного круга
			r1 : 15, // радиус скользящего круга
			d : 15, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		var params = {
			start_x : 350,
			start_y : 400,
			r0 : 35, // радиус неподвижного круга
			r1 : 15, // радиус скользящего круга
			d : 25, // расстояние от центра неподвижного круга до точки
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		
		context.fillStyle = 'lime';
		var params = {
			start_x : 530,
			start_y : 440,
			r0 : 50, // радиус неподвижного круга
			r1 : 10, // радиус скользящего круга
			d : 40, // расстояние от центра неподвижного круга до точки
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic( context, params );
		

		context.fillStyle = 'darkblue';
		var params = {
			start_x : 75,
			start_y : 500,
			r0 : 25, // радиус неподвижного круга
			r1 : 5, // радиус скользящего круга
			d : 20, // расстояние от центра неподвижного круга до точки
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 : 1
		};
		epic2( context, params );

		
		//hypocycloida
		var context = document.querySelector("#canvas-hypo").getContext("2d");

		context.fillStyle = 'green';
		var params = {
			start_x : 100,
			start_y : 110,
			r0 : 30, // радиус неподвижного круга
			r1 : 30, // радиус скользящего круга
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 :  2,
			k2 :  2
		};
		hypocycloida( context, params );
		context.font='20px Arial';
		context.fillText("Гипоциклоида", 30, 25); 
		
		//astroida
		context.fillStyle = 'blue';
		var params = {
			start_x : 250,
			start_y : 110,
			px : 80, // сжатие по X
			py : 80, // сжатие по Y
			step : 0.01,
			num_repeat :  Math.PI * 6,
			k1 : 180
		};
		astroida( context, params );
		context.font='20px Arial';
		context.fillText("Астроида", 200, 25); 
		
		context.fillStyle = 'red';
		var params = {
			start_x : 380,
			start_y : 110,
			r0 : 25, // радиус неподвижного круга
			r1 : 5, // радиус скользящего круга
			d : 20, // расстояние от центра неподвижного круга до точки
			step : 0.02,
			num_repeat :  Math.PI * 6
		};
		curve15( context, params );
		var params = {
			start_x : 500,
			start_y : 110,
			r0 : 25, // радиус неподвижного круга
			r1 : 15, // радиус скользящего круга
			d : 20, // расстояние от центра неподвижного круга до точки
			step : 0.01,
			num_repeat :  Math.PI * 6
		};
		curve15( context, params );
		
		context.fillStyle = 'green';
		var params = {
			start_x : 110,
			start_y : 290,
			px : 100, // сжатие по X
			py : 100, // сжатие по Y
			step : 0.005,
			num_repeat :  Math.PI * 9,
			k1 : 5,
			k2 : 26//,
			//k3 : 180
		};
		curve16( context, params );
		
		context.fillStyle = 'darkviolet';
		var params = {
			start_x : 270,
			start_y : 290,
			px : 50, // сжатие по X
			py : 80, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 11,
			k2 : 5,
			k3 : 10
		};
		curve17( context, params );
		
		context.fillStyle = 'black';
		var params = {
			start_x : 370,
			start_y : 290,
			px : 30, // сжатие по X
			py : 60, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 11,
			k2 : 5,
			k3 : 10
		};
		curve18( context, params );
		
		context.fillStyle = 'blue';
		var params = {
			start_x : 500,
			start_y : 290,
			px : 75, // сжатие по X
			py : 80, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 11,
			k2 : 7
		};
		curve19( context, params );
		
		context.fillStyle = 'red';
		var params = {
			start_x : 100,
			start_y : 480,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 1,
			k2 : 1,
			k3 : 6
		};
		curve20( context, params );
		
		context.fillStyle = 'brown';
		var params = {
			start_x : 260,
			start_y : 480,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 3,
			k2 : 3,
			k3 : 10
		};
		curve20( context, params );
		
		context.fillStyle = '#4D5D53';
		var params = {
			start_x : 420,
			start_y : 500,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.002,
			num_repeat :  Math.PI * 6,
			k1 : 1,
			k2 : 7,
			k3 : 10
		};
		curve20( context, params );
		
		context.fillStyle = 'darkblue';
		var params = {
			start_x : 100,
			start_y : 650,
			px : 40, // сжатие по X
			py : 40, // сжатие по Y
			step : 0.007,
			num_repeat :  Math.PI * 6,
			k1 : 7,
			k2 : 7,
			k3 : 10
		};
		curve20( context, params );
		
		context.fillStyle = 'steelblue';
		var params = {
			start_x : 300,
			start_y : 680,
			px : 50, // сжатие по X
			py : 50, // сжатие по Y
			step : 0.001,
			num_repeat :  Math.PI*2,
			k1 : 21,
			k2 : 21,
			k3 : 10
		};
		curve20( context, params );

		//========================== clear-btn
		document.querySelector(".clear-canvas").onclick = function(e){
			var canvas_id = e.target.getAttribute("data-target");
			var canvas = document.querySelector("#" + canvas_id);
			clear_canvas( canvas );
		}//end event
		
}//end load


function clear_canvas( canvas )
{
console.log( "clear!!!", canvas.width, canvas.height );
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
}//end clear_canvas




function sinus( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ =  n *k1 ;
		y_ = Math.sin(n) * k2;
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func


function curve20( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	var k3 = params.k3;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		r = 1 - Math.cos( n * k3);
		x_ = ( r * Math.cos( n * k1 ) ) * px;
		y_ = ( r * Math.sin( n * k2 ) ) * py;
	
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func

function curve19( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ = Math.cos( k1 * n) * px;
		y_ = Math.sin( k2 * n) * py;	
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func

function curve18( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	var k3 = params.k3;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		r = 1 - Math.cos( n * k3);
		x_ = ( r * Math.cos( k1 * n)) * px;
		y_ = ( r * Math.sin( k2 * n)) * py;
	
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func


function curve17( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	var k3 = params.k3;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ = px * Math.cos( n * k3 ) * Math.cos( k1 * n);
		y_ = py * Math.cos( n * k3 ) * Math.sin( k2 * n);

		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func

function curve16( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2//;
	//var k3 = params.k3;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		z = (6.2832 * n) / 36;
		x_ = px * Math.sin( k1 * z) * Math.cos( k2 * z);
		y_ = py * Math.cos( k1 * z) * Math.sin( k2 * z);
		
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func

function curve15( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var r0 = params.r0; // радиус неподвижного круга
	var r1 = params.r1; // радиус скользящего круга
	var d = params.d;// расстояние от центра неподвижного круга до точки
	var step = params.step;
	var num_repeat =  params.num_repeat;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ = (r0 + r1) * Math.cos(n) + d * Math.cos( (r0 + r1) / r1 * n );
		y_ = (r0 + r1) * Math.sin(n) - d * Math.sin( (r0 + r1) / r1 * n );

		
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end func

function astroida( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	var step = params.step;
	var k1 = params.k1;
	var num_repeat =  params.num_repeat;
	
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ = ( Math.cos(n) * Math.cos(n) * Math.cos(n) ) * px;
		y_ =( Math.sin(n) * Math.sin(n) * Math.sin(n) ) * py ;

		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end astroida

function hypocycloida( context, params )
{
	var start_x = params.start_x;
	var start_y = params.start_y;
	var r0 = params.r0; // радиус неподвижного круга
	var r1 = params.r1; // радиус скользящего круга
	var step = params.step;
	var k1 = params.k1;
	var k2 = params.k2;
	
	var num_repeat =  params.num_repeat;
	for ( n = 0;  n < num_repeat; n += step) 
	{
		x_ = r0 * ( k1 * Math.cos(n) - Math.cos( k1 * n) );
		y_ =r1 * ( k2 * Math.sin(n) + Math.sin( k2 * n) ) ;

		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
}//end hypocycloide

//Улитка Паскаля
function epic_ulitka( context, params)
{
		var start_x = params.start_x;
		var start_y = params.start_y;
		var px = params.px; // сжатие по X
		var py = params.py; // сжатие по Y
		var step = params.step;
		var num_repeat =  params.num_repeat;
		var k1 = params.k1;
		var k2 = params.k2;
		var k3 = params.k3;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			r = 1 - Math.cos( n * k3);
			x_ = ( r * Math.cos( n  * k1)  ) * px;
			y_ = ( r * Math.sin( n  * k2)  ) * py;

			x = start_x + ( Math.round(x_) ) ;
			y = start_y + ( Math.round(y_) );
			context.fillRect(x, y, 2, 2);
		}
}//end epic_ulika()


function epic( context, params)
{
		var start_x = params.start_x;
		var start_y = params.start_y;
		var r0 = params.r0; // радиус неподвижного круга
		var r1 = params.r1; // радиус скользящего круга
		var d = params.d;// расстояние от центра неподвижного круга до точки
		var step = params.step;
		var num_repeat =  params.num_repeat;
		var k1 = params.k1;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			var cos_v = ((r0 + r1) / r1 ) * n;
			var sin_v = ((r0 + r1) / r1 ) * n;
			x_ = ( r0  + r1 )* Math.cos( n ) - d * Math.cos( cos_v );
			y_ = ( r0 + r1 )  * Math.sin( n ) - d * Math.sin(  sin_v );

			x = start_x + ( Math.round(x_) ) ;
			y = start_y + ( Math.round(y_) );
			
			x = x + k1;
			context.fillRect(x, y, 2, 2);
		}
}//end epic()

function epic2( context, params)
{
		var start_x = params.start_x;
		var start_y = params.start_y;
		var r0 = params.r0; // радиус неподвижного круга
		var r1 = params.r1; // радиус скользящего круга
		var d = params.d;// расстояние от центра неподвижного круга до точки
		var step = params.step;
		var num_repeat =  params.num_repeat;
		var k1 = params.k1;
		for ( n = 0;  n < num_repeat; n += step) 
		{
			var cos_v = ( (r0 + r1) / d ) * n;
			var sin_v = ( (r0 + r1) / d ) * n;
			x_ = ( r0  + r1 )* Math.cos( n ) - d * Math.cos( cos_v );
			y_ = ( r0 + r1 )  * Math.sin( n ) - d * Math.sin(  sin_v );

			x = start_x + ( Math.round(x_) ) ;
			y = start_y + ( Math.round(y_) );
			
			x = x + k1;
			context.fillRect(x, y, 2, 2);
		}
}//end epic()
