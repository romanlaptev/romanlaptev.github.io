﻿var _vars = {
	"graphics" : {
		"sinus" : {
			"start_x" : 100,
			"start_y" : 100,
			"step" : 0.01,
			"num_repeat" : 12,
			"k1" : 30,
			"k2" : 70
		}
	}
}

window.onload = function(){

		//get DOM objects
		var canvasObj = getDOMobj( "canvas-sin" );
		
		//draw graphic
		try {
			var context = canvasObj.getContext("2d");
			context.fillStyle = 'blue';
			var params = _vars["graphics"]["sinus"];
			initForm();
			sinus( context, params);
		} catch (e) {
			var msg = "HTML5 Canvas is not supported in this browser";
			msg += "<br> "+e.name+ ", "+e.message+ ", "+e.number+ ", "+e.description;
console.log(msg);			
		}

//=======================================		
		//clear-btn
		var btn_clear_canvas = document.querySelector(".clear-canvas");
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
			var canvas_id = e.target.getAttribute("data-target");
console.log(canvas_id);			
			var canvasObj = getDOMobj( canvas_id );
			clear_canvas( canvasObj );
			initForm();
		}, false);//end event
		
//=======================================		
		var startXRange = getDOMobj( "start-x-range" );
//console.log( startXRange );		
		var startXVal = getDOMobj( "start-x-val" );
		startXVal.value = startXRange.value;				
		// startXRange.oninput = function(e){
// //console.log( e, this );
			// startXVal.value=this.value;				
		// }
		startXRange.onchange = function(e){
			startXVal.value=this.value;				
		}
	
//=======================================		
		var startYRange = getDOMobj( "start-y-range" );
		var startYVal = getDOMobj( "start-y-val" );
		startYVal.value = startYRange.value;				
		startYRange.onchange = function(e){
			startYVal.value=this.value;				
		}
	
}//end load


function clear_canvas( canvas ){
//console.log( "clear!!!", canvas.width, canvas.height );
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
}//end clear_canvas


function sinus( context, params ){
	//var p = {
	//}
	var start_x = params.start_x;
	var start_y = params.start_y;
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	var k2 = params.k2;
	
	for ( n = 0;  n < num_repeat; n += step) {
		x_ =  n *k1 ;
		y_ = Math.sin(n) * k2;
		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
		context.fillRect(x, y, 2, 2);
	}
	
	//define rebuild event
	var form = getDOMobj( "form1" );
//console.log( form.onsubmit );	
//console.log( form.onreset );	
	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
			var canvas = document.querySelector("#canvas-sin");
			var context = canvas.getContext("2d");
			context.fillStyle = 'blue';
			
			var params = {
				start_x : parseInt( form.start_x.value ),
				start_y : parseInt( form.start_y.value ),
				step : parseFloat( form.step.value ),
				num_repeat : parseInt( form.num_repeat.value ),
				k1 : parseInt( form.k1.value ),
				k2 : parseInt( form.k2.value )
			};
	//console.log("submit", params);
			sinus( context, params);
			
			event.preventDefault();
		};
		
	}
	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			initForm();
			event.preventDefault();
		};
		
	}
	
}//end func


function initForm(){
	var form = getDOMobj( "form1" );
	
	var startXRange = getDOMobj( "start-x-range" );
	startXRange.value = _vars["graphics"]["sinus"]["start_x"];
	var startXVal = getDOMobj( "start-x-val" );
	startXVal.value = startXRange.value;				
	//form.step.start_x_range.value = _vars["graphics"]["sinus"]["start_x"];
	
	var startYRange = getDOMobj( "start-y-range" );
	startYRange.value = _vars["graphics"]["sinus"]["start_y"];
	var startYVal = getDOMobj( "start-y-val" );
	startYVal.value = startYRange.value;				
	
	//form.step.start_y_range.value = _vars["graphics"]["sinus"]["start_y"];
	
	form.num_repeat.value  = _vars["graphics"]["sinus"]["num_repeat"];
	form.step.value  = _vars["graphics"]["sinus"]["step"];
	form.k1.value = _vars["graphics"]["sinus"]["k1"];
	form.k2.value = _vars["graphics"]["sinus"]["k2"];
	
}//end initForm()