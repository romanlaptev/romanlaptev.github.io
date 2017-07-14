var _vars = {
	"graphics" : {
		
		"sinus" : {
			"canvasID" : "canvas-sin",
			"formID" : "form1",
			"parameters" : {
				"context" : null,
				"start_x" : 100,
				"start_y" : 100,
				"step" : 0.01,
				"num_repeat" : 12,
				"k1" : 30,
				"k2" : 70
			},
			"init" : function(){
				initForm( this.formID, this.parameters );
			},
			"draw" : function(){
				this["context"] = _createCanvas( this["canvasID"] );
				sinus( this["context"], this.parameters );
			}
		}//end sinus
		
	}//end graphics
}
console.log(_vars);

window.onload = function(){

		_vars["graphics"]["sinus"].init();
		_vars["graphics"]["sinus"].draw();
		
		//clear-btn
		var btn_clear_canvas = document.querySelector(".clear-canvas");
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
			var canvas_id = e.target.getAttribute("data-target");
//console.log(canvas_id);			
			clear_canvas( canvas_id );
			if( canvas_id === "canvas-sin"){
				_vars["graphics"]["sinus"].init();
			}
			
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


function initForm( id, p ){
//console.log(id, p);
	var form = getDOMobj( id );
	
	var startXRange = getDOMobj( "start-x-range" );
	startXRange.value = p["start_x"];
	var startXVal = getDOMobj( "start-x-val" );
	startXVal.value = startXRange.value;				
	//form.step.start_x_range.value = _vars["graphics"]["sinus"]["start_x"];
	startXRange.onchange = function(e){
		startXVal.value=this.value;				
	}
	
	var startYRange = getDOMobj( "start-y-range" );
	startYRange.value = p["start_y"];
	var startYVal = getDOMobj( "start-y-val" );
	startYVal.value = startYRange.value;				
	startYRange.onchange = function(e){
		startYVal.value=this.value;				
	}
	
	//form.step.start_y_range.value = _vars["graphics"]["sinus"]["start_y"];
	
	var numRepeatRange = getDOMobj( "num-repeat-range" );
	numRepeatRange.value = p["num_repeat"];
	var numRepeatVal = getDOMobj( "num-repeat-val" );
	numRepeatVal.value = numRepeatRange.value;				
	numRepeatRange.onchange = function(e){
		numRepeatVal.value=this.value;				
	}
	
	var k1Range = getDOMobj( "k1-range" );
	k1Range.value = p["k1"];
	var k1Val = getDOMobj( "k1-val" );
	k1Val.value = k1Range.value;				
	k1Range.onchange = function(e){
		k1Val.value=this.value;				
	}
	
	var k2Range = getDOMobj( "k2-range" );
	k2Range.value = p["k2"];
	var k2Val = getDOMobj( "k2-val" );
	k2Val.value = k2Range.value;				
	k2Range.onchange = function(e){
		k2Val.value=this.value;				
	}
	
	
	//form.num_repeat.value  = p["num_repeat"];
	form.step.value  = p["step"];
	
	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
			
			var canvas = document.querySelector("#canvas-sin");
			var context = canvas.getContext("2d");
			context.fillStyle = 'blue';
			
			var p2 = {
				start_x : parseInt( form.start_x.value ),
				start_y : parseInt( form.start_y.value ),
				step : parseFloat( form.step.value ),
				num_repeat : parseInt( form.num_repeat.value ),
				k1 : parseInt( form.k1.value ),
				k2 : parseInt( form.k2.value )
			};
	//console.log("submit", params);
			sinus( context, p2);
			
			event.preventDefault();
		};
		
	}
	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			initForm( id, p );
			event.preventDefault();
		};
	}
//console.log( form.onsubmit );	
//console.log( form.onreset );	
	
}//end initForm()
