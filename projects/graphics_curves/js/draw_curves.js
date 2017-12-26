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
		}, //end sinus
		
		"circle" : {
			"canvasID" : "canvas-circle",
			"canvasID_2" : "canvas-circle2",
			"formID" : "form-circle",
			"parameters" : {
				"context" : null,
				"start_x" : 170,
				"start_y" : 130,
				"step" : 0.03,
				"radius" : 70,
				"num_repeat" : Math.PI*6,
				"px" : 50,
				"py" : 70
			},
			"init" : function(){
					var form = getDOMobj( this.formID );
					initFormCircle( form, this );
			},//end init()

			"draw" : function(){
				var context = _createCanvas( this["canvasID"] );

				var form = getDOMobj( this.formID );
				var start_x = parseInt( form.start_x_val.value );
				var start_y = parseInt( form.start_y_val.value );
//console.log(start_x, start_y);
				var step = parseFloat( form.step_val.value );
				var num_repeat =  parseInt( form.num_repeat_val.value );

				var radius = parseInt( form.num_radius_val.value);
				context.fillStyle = 'blue';
				for ( n = 0;  n < num_repeat; n += step) {
					x = start_x + ( Math.cos ( n ) * radius ) ;
					y = start_y + ( Math.sin( n ) * radius );
					context.fillRect(x, y, 2, 2);
				}//next

				context = _createCanvas( this["canvasID_2"] );
				var px = parseInt( form.px_val.value );
				var py = parseInt( form.py_val.value );
				context.fillStyle = 'red';
				for ( n = 0;  n < num_repeat; n += step) {
					x = start_x + ( Math.cos ( n ) * px ) ;
					y = start_y + ( Math.sin( n ) * py );
					context.fillRect(x, y, 2, 2);
				}//next

			}
		},//end circle

		"spire" : {
			"canvasID" : "canvas-spire",
			"formID" : "form-spire",
			"parameters" : {
				"start_x" : 75,
				"start_y" : 100,
				"step" : 0.01,
				"num_repeat" : Math.PI*6,
				"px" : 3,
				"py" : 3
			},
			"init" : function(){
					var form = getDOMobj( this.formID );
					initFormSpire( form, this );
			},//end init()

			"draw" : function(){
				var context = _createCanvas( this["canvasID"] );

				var form = getDOMobj( this.formID );
				var start_x = parseInt( form.start_x_val.value );
				var start_y = parseInt( form.start_y_val.value );
				var px = parseInt( form.px_val.value );
				var py = parseInt( form.py_val.value );
				var step = parseFloat( form.step_val.value );
				var num_repeat =  parseInt( form.num_repeat_val.value );

				context.fillStyle = 'green';
				for ( n = 0;  n < num_repeat; n += step) {
					x_ = ( Math.cos( n ) + n  * Math.sin( n ) ) * px;
					y_ = ( Math.sin( n ) - n * Math.cos( n ) ) * py;

					x = start_x + ( Math.round(x_) ) ;
					y = start_y + ( Math.round(y_) );
					context.fillRect(x, y, 2, 2);
				}//next

			}//end draw()
		}//end spire
		
	}//end graphics
}
console.log(_vars);

window.onload = function(){

		_vars["graphics"]["sinus"].init();
		_vars["graphics"]["sinus"].draw();

		_vars["graphics"]["circle"].init();
		_vars["graphics"]["circle"].draw();

		_vars["graphics"]["spire"].init();
		_vars["graphics"]["spire"].draw();

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

	//clear-btn
	var btn_clear_canvas = form["clear_canvas"];
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
//console.log(e);
			clear_canvas("canvas-sin");
			_vars["graphics"]["sinus"].init();
		}, false);//end event
	
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


function initFormCircle(  form, drawObj ){
//console.log(drawObj);
	var p = drawObj["parameters"];

	var startXRange = form["start_x_range"];
	startXRange.value = p["start_x"];

	var startXVal = form["start_x_val"];
	startXVal.value = startXRange.value;				

	startXRange.onchange = function(e){
		startXVal.value = this.value;				
	}


	var startYRange = form["start_y_range"];
	startYRange.value = p["start_y"];

	var startYVal = form["start_y_val"];
	startYVal.value = startYRange.value;				

	startYRange.onchange = function(e){
		startYVal.value = this.value;				
	}

	var numRadiusRange = form[ "num_radius_range" ];
	numRadiusRange.value = p["radius"];
	var numRadiusVal = form[ "num_radius_val" ];
	numRadiusVal.value = numRadiusRange.value;				
	numRadiusRange.onchange = function(e){
		numRadiusVal.value=this.value;				
	}

	var numRepeatRange = form[ "num_repeat_range" ];
	numRepeatRange.value = p["num_repeat"];
	var numRepeatVal = form[ "num_repeat_val" ];
	numRepeatVal.value = numRepeatRange.value;				
	numRepeatRange.onchange = function(e){
		numRepeatVal.value=this.value;				
	}

	var pxRange = form[ "px_range" ];
	pxRange.value = p["px"];
	var pxVal = form[ "px_val" ];
	pxVal.value = pxRange.value;				
	pxRange.onchange = function(e){
		pxVal.value=this.value;				
	}

	var pyRange = form[ "py_range" ];
	pyRange.value = p["py"];
	var pyVal = form[ "py_val" ];
	pyVal.value = pyRange.value;				
	pyRange.onchange = function(e){
		pyVal.value=this.value;				
	}

	form["step_val"].value  = p["step"];

	//clear-btn
	var btn_clear_canvas = form["clear_canvas"];
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
console.log(e);
			clear_canvas( drawObj["canvasID"] );
			clear_canvas( drawObj["canvasID_2"] );
			drawObj["init"]();
			//drawObj["draw"]();
		}, false);//end event

	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
console.log(event);
			drawObj["draw"]( form );
			event.preventDefault();
		};
	}

	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			drawObj["init"]( form, drawObj );
			event.preventDefault();
		};
	}

}//end initFormCircle()

function initFormSpire(  form, drawObj ){
//console.log(drawObj);
	var p = drawObj["parameters"];

	var startXRange = form["start_x_range"];
	startXRange.value = p["start_x"];

	var startXVal = form["start_x_val"];
	startXVal.value = startXRange.value;				

	startXRange.onchange = function(e){
		startXVal.value = this.value;				
	}

	var startYRange = form["start_y_range"];
	startYRange.value = p["start_y"];

	var startYVal = form["start_y_val"];
	startYVal.value = startYRange.value;				

	startYRange.onchange = function(e){
		startYVal.value = this.value;				
	}

	var numRepeatRange = form[ "num_repeat_range" ];
	numRepeatRange.value = p["num_repeat"];
	var numRepeatVal = form[ "num_repeat_val" ];
	numRepeatVal.value = numRepeatRange.value;				
	numRepeatRange.onchange = function(e){
		numRepeatVal.value=this.value;				
	}

	var pxRange = form[ "px_range" ];
	pxRange.value = p["px"];
	var pxVal = form[ "px_val" ];
	pxVal.value = pxRange.value;				
	pxRange.onchange = function(e){
		pxVal.value=this.value;				
	}

	var pyRange = form[ "py_range" ];
	pyRange.value = p["py"];
	var pyVal = form[ "py_val" ];
	pyVal.value = pyRange.value;				
	pyRange.onchange = function(e){
		pyVal.value=this.value;				
	}

	form["step_val"].value  = p["step"];

	//clear-btn
	var btn_clear_canvas = form["clear_canvas"];
//console.log(btn_clear_canvas);		
		btn_clear_canvas.addEventListener("click", function(e){
//console.log(e);
			clear_canvas( drawObj["canvasID"] );
			drawObj["init"]();
			//drawObj["draw"]();
		}, false);//end event

	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
//console.log(event);
			drawObj["draw"]( form );
			event.preventDefault();
		};
	}

	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			drawObj["init"]( form, drawObj );
			event.preventDefault();
		};
	}

}//end initFormSpire()


