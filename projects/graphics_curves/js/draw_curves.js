var _vars = {
	"graphics" : {
		"sinus" : {
			"canvasID" : "canvas-sin",
			"formID" : "form1",
			"context" : null,
			"start_x" : 100,
			"start_y" : 100,
			"step" : 0.01,
			"num_repeat" : 12,
			"k1" : 30,
			"k2" : 70//,
			//"build" : sinus
		}
	}
}
console.log(_vars);

window.onload = function(){

		//get DOM objects
		// var canvasID = _vars["graphics"]["sinus"]["canvasID"];
		// var canvasObj = getDOMobj( canvasID );
		
		// //draw graphic
		// try {
			// var context = canvasObj.getContext("2d");
			// context.fillStyle = 'blue';
			// var params = _vars["graphics"]["sinus"];
			// initForm();
			// sinus( context, params);
		// } catch (e) {
			// var msg = "HTML5 Canvas is not supported in this browser";
			// msg += "<br> "+e.name+ ", "+e.message+ ", "+e.number+ ", "+e.description;
// console.log(msg);			
		// }

		var params = _vars["graphics"]["sinus"];
		params["context"] = _createCanvas( params["canvasID"] );
		initForm( params["formID"] );
		var context = params["context"];
		sinus( context, params);
		
//=======================================		
		//clear-btn
		var btn_clear_canvas = document.querySelector(".clear-canvas");
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
			var canvas_id = e.target.getAttribute("data-target");
//console.log(canvas_id);			
			clear_canvas( canvas_id );
			initForm( _vars["graphics"]["sinus"]["formID"] );
		}, false);//end event

	
}//end load

function _createCanvas( id ){
	//get DOM objects
	var canvasObj = getDOMobj( id );
	
	try {
		var context = canvasObj.getContext("2d");
		context.fillStyle = 'blue';
		return context;
	} catch (e) {
		var msg = "HTML5 Canvas is not supported in this browser";
		msg += "<br> "+e.name+ ", "+e.message+ ", "+e.number+ ", "+e.description;
console.log(msg);	
		return false;
	}
	
}//end _createCanvas()

function clear_canvas( id ){
	var canvasObj = getDOMobj( id );
	var context = canvasObj.getContext("2d");
	context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}//end clear_canvas


function sinus( context, params ){
console.log(params);	
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
	}//next
	
}//end sinus()


function initForm( id ){
	var form = getDOMobj( id );
	
	var startXRange = getDOMobj( "start-x-range" );
	startXRange.value = _vars["graphics"]["sinus"]["start_x"];
	var startXVal = getDOMobj( "start-x-val" );
	startXVal.value = startXRange.value;				
	//form.step.start_x_range.value = _vars["graphics"]["sinus"]["start_x"];
	startXRange.onchange = function(e){
		startXVal.value=this.value;				
	}
	
	var startYRange = getDOMobj( "start-y-range" );
	startYRange.value = _vars["graphics"]["sinus"]["start_y"];
	var startYVal = getDOMobj( "start-y-val" );
	startYVal.value = startYRange.value;				
	startYRange.onchange = function(e){
		startYVal.value=this.value;				
	}
	
	//form.step.start_y_range.value = _vars["graphics"]["sinus"]["start_y"];
	
	form.num_repeat.value  = _vars["graphics"]["sinus"]["num_repeat"];
	form.step.value  = _vars["graphics"]["sinus"]["step"];
	form.k1.value = _vars["graphics"]["sinus"]["k1"];
	form.k2.value = _vars["graphics"]["sinus"]["k2"];
	
	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
			
			var canvas = document.querySelector("#canvas-sin");
			var context = canvas.getContext("2d");
			context.fillStyle = 'blue';
			
			var p = {
				start_x : parseInt( form.start_x.value ),
				start_y : parseInt( form.start_y.value ),
				step : parseFloat( form.step.value ),
				num_repeat : parseInt( form.num_repeat.value ),
				k1 : parseInt( form.k1.value ),
				k2 : parseInt( form.k2.value )
			};
	//console.log("submit", params);
			sinus( context, p);
			
			event.preventDefault();
		};
		
	}
	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			initForm( _vars["graphics"]["sinus"]["formID"] );
			event.preventDefault();
		};
	}
//console.log( form.onsubmit );	
//console.log( form.onreset );	
	
}//end initForm()