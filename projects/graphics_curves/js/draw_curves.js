var _vars = {
	"supportCanvas" : runTest(),
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
					var form = getById( this.formID );
					initFormCircle( form, this );
			},//end init()

			"draw" : function(){
				var context = _createCanvas( this["canvasID"] );

				var form = getById( this.formID );
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
				"start_x" : 150,
				"start_y" : 150,
				"step" : 0.01,
				"num_repeat" : Math.PI*8,
				"px" : 3,
				"py" : 3
			},
			"init" : function(){
					var form = getById( this.formID );
					initFormSpire( form, this );
			},//end init()

			"draw" : function(){
				var context = _createCanvas( this["canvasID"] );

				var form = getById( this.formID );
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
		}, //end spire

		"curve_epic" : {
			"canvasID" : "canvas-epic",
			"context" : _createCanvas( "canvas-epic" ),
			"context2" : _createCanvas( "canvas-epic2" ),
			"form" : getById( "form-epic" ),
			"p" : {
				"start_x" : 100,
				"start_y" : 80,
				"step" : 0.01,
				"num_repeat" : Math.PI*6,
				"px" : 40,
				"py" : 40,
				k1: 5,
				k2: 5,
				k3: 5,
				color: "blue"
			},
			
			"init" : function(){
				initFormEpic( this );
				
				epic_ulitka( this.context, this.p );
				epic_ulitka( this.context, {
					"start_x" : 200,
					"start_y" : 80,
					"step" : 0.01,
					"num_repeat" : Math.PI*6,
					"px" : 40,
					"py" : 40,
					k1: 2,
					k2: 2,
					k3: 3,
					color: "darkred"
				});
				
				epic_ulitka( this.context, {
					"start_x" : 100,
					"start_y" : 220,
					"step" : 0.01,
					"num_repeat" : Math.PI*6,
					"px" : 40,
					"py" : 40,
					k1: 5,
					k2: 5,
					k3: 31,
					color: "red"
				});

				epic_ulitka( this.context, {
					"start_x" : 340,
					"start_y" : 100,
					"step" : 0.01,
					"num_repeat" : Math.PI*6,
					"px" : 40,
					"py" : 40,
					k1: 5,
					k2: 3,
					k3: 6,
					color: "blue"
				});
				
				epic_ulitka( this.context, {
					"start_x" : 480,
					"start_y" : 100,
					"step" : 0.01,
					"num_repeat" : Math.PI*6,
					"px" : 30,
					"py" : 30,
					k1: 5,
					k2: 5,
					k3: 6,
					color: "green"
				});
				
				epic( this.context2, {
					"start_x" : 100,
					"start_y" : 80,
					"step" : 0.01,
					"num_repeat" : Math.PI*6,
					k1: 1,
					r0 : 30, // радиус неподвижного круга
					r1 : 5, // радиус скользящего круга
					d : 27,// расстояние от центра неподвижного круга до точки
					color: "blue"
				});
				
			},//end init()
			
			"getFormValues": function(){
				var values = {
					"start_x" : parseInt( this.form.elements["start_x"].value ),
					"start_y" : parseInt( this.form.elements["start_y"].value ),
					"step" : parseFloat( this.form.elements["step"].value ),
					"num_repeat" : parseInt( this.form.elements["num_repeat_val"].value ),
					k1: parseInt( this.form.elements["k1_val"].value ),
					k2: parseInt( this.form.elements["k2_val"].value ),
					k3: parseInt( this.form.elements["k3_val"].value ),
					"px" : parseInt( this.form.elements["px_val"].value ),
					"py" : parseInt( this.form.elements["py_val"].value ),
					"color": this.form.elements["color"].value
				};
				return values;
			},
			
			"draw" : function(){
				
				var p2 = this.getFormValues();
				epic_ulitka( this.context, p2 );
				
/*
				var context = _createCanvas( this["canvasID"] );
				this.context.fillStyle = "blue";
				var start_x = 150;
				var start_y = 150;
				var step = 0.01;
				var px = 60; // сжатие по X
				var py = 60;// сжатие по Y
				var num_repeat =  Math.PI*6;
				var k1 = 5;
				var k2 = 5;
				var k3 = 5;
				//for( var n2 = 0; n2 < 1; n2++){
					for ( n = 0;  n < num_repeat; n += step) {
						r = 1 - Math.cos( n * k3);
						x_ = ( r * Math.cos( n  * k1)  ) * px;
						y_ = ( r * Math.sin( n  * k2)  ) * py;

						x = start_x + ( Math.round(x_) ) ;
						y = start_y + ( Math.round(y_) );
						this.context.fillRect(x, y, 2, 2);
					}//next
					
					//k1=k1+0.1;
					//k2=k2+0.3;
					//k3=k3+0.5;
//console.log("k3=" + k3);					
				//}//next
*/
			}//end draw()
			
		} //end curve_epic
	}//end graphics
}
console.log(_vars);

//Start app
//window.onload = function(){
	if( _vars["supportCanvas"] ){
		_vars["graphics"]["sinus"].init();
		_vars["graphics"]["sinus"].draw();

		_vars["graphics"]["circle"].init();
		_vars["graphics"]["circle"].draw();

		_vars["graphics"]["spire"].init();
		_vars["graphics"]["spire"].draw();
		
		_vars["graphics"]["curve_epic"].init();
		_vars["graphics"]["curve_epic"].draw();
	}
//}//end load


function _createCanvas( id ){
	//get DOM objects
	var canvasObj = getById( id );
	
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
	var canvasObj = getById( id );
	var context = canvasObj.getContext("2d");
	context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}//end clear_canvas


function sinus( context, params ){
//console.log(params);	
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
	var form = getById( id );
	
	var startXRange = getById( "start-x-range" );
	startXRange.value = p["start_x"];
	var startXVal = getById( "start-x-val" );
	startXVal.value = startXRange.value;				
	//form.step.start_x_range.value = _vars["graphics"]["sinus"]["start_x"];
	startXRange.onchange = function(e){
		startXVal.value=this.value;				
		reDraw();
	}
	
	var startYRange = getById( "start-y-range" );
	startYRange.value = p["start_y"];
	var startYVal = getById( "start-y-val" );
	startYVal.value = startYRange.value;				
	startYRange.onchange = function(e){
		startYVal.value=this.value;				
		reDraw();
	}
	
	//form.step.start_y_range.value = _vars["graphics"]["sinus"]["start_y"];
	
	var numRepeatRange = getById( "num-repeat-range" );
	numRepeatRange.value = p["num_repeat"];
	var numRepeatVal = getById( "num-repeat-val" );
	numRepeatVal.value = numRepeatRange.value;				
	numRepeatRange.onchange = function(e){
		numRepeatVal.value=this.value;				
		reDraw();
	}
	
	var k1Range = getById( "k1-range" );
	k1Range.value = p["k1"];
	var k1Val = getById( "k1-val" );
	k1Val.value = k1Range.value;				
	k1Range.onchange = function(e){
		k1Val.value=this.value;				
		reDraw();
	}
	
	var k2Range = getById( "k2-range" );
	k2Range.value = p["k2"];
	var k2Val = getById( "k2-val" );
	k2Val.value = k2Range.value;				
	k2Range.onchange = function(e){
		k2Val.value=this.value;				
		reDraw();
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
			reDraw();
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
	function reDraw(){
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
	}//end reDraw()			
	
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


function initFormEpic( drawObj ){
	
	var form = drawObj["form"];
//console.log(form);
/*
for (var n1=1; n1 < form.elements.length; n1++){
	var elmnt = form.elements[n1];
console.log(elmnt);	
}
*/
//console.log( form.elements["start_x_range"] );	
	var p = drawObj.p;
	
	form.elements["color"].value = p["color"];

	var startXVal = form.elements["start_x"];
	startXVal.value = p["start_x"];

	var xRange = form.elements["x_range"];
	xRange.value = p["start_x"];
	xRange.onchange = function(e){
		startXVal.value=this.value;				
		//drawObj["draw"]();
	}
	
	var startYVal = form.elements["start_y"];
	startYVal.value = p["start_y"];

	var yRange = form.elements["y_range"];
	yRange.value = p["start_y"];
	yRange.onchange = function(e){
		startYVal.value=this.value;				
		//drawObj["draw"]();
	}
	
	var numRepeatRange = form[ "num_repeat_range" ];
	numRepeatRange.value = p["num_repeat"];
	var numRepeatVal = form[ "num_repeat_val" ];
	numRepeatVal.value = numRepeatRange.value;				
	numRepeatRange.onchange = function(e){
		numRepeatVal.value=this.value;				
		drawObj["draw"]();
	}

	var k1Val = form.k1_val;
	k1Val.value = p["k1"];
	k1Val.onkeyup = function(e){
		k1Range.value=this.value;				
	}
	var k1Range = form.k1;
	k1Range.value = p["k1"];
	k1Range.onchange = function(e){
		k1Val.value=this.value;				
		drawObj["draw"]();
	}
	
	var k2Val = form.k2_val;
	k2Val.value = p["k2"];
	k2Val.onkeyup = function(e){
		k2Range.value=this.value;				
	}
	var k2Range = form.k2;
	k2Range.value = p["k2"];
	k2Range.onchange = function(e){
		k2Val.value=this.value;				
		drawObj["draw"]();
	}
	
	var k3Val = form.k3_val;
	k3Val.value = p["k3"];
	k3Val.onkeyup = function(e){
		k3Range.value=this.value;				
	}
	var k3Range = form.k3;
	k3Range.value = p["k3"];
	k3Range.onchange = function(e){
		k3Val.value=this.value;				
		drawObj["draw"]();
	}
	
	var pxRange = form[ "px_range" ];
	pxRange.value = p["px"];
	var pxVal = form[ "px_val" ];
	pxVal.value = pxRange.value;				
	pxRange.onchange = function(e){
		pxVal.value=this.value;				
		drawObj["draw"]();
	}

	var pyRange = form[ "py_range" ];
	pyRange.value = p["py"];
	var pyVal = form[ "py_val" ];
	pyVal.value = pyRange.value;				
	pyRange.onchange = function(e){
		pyVal.value=this.value;				
		drawObj["draw"]();
	}

	form.elements["step"].value = p["step"];

	if( typeof form.onsubmit !== "function"){
		form.onsubmit = function( event ){
console.log(event);
			drawObj["draw"]();
			event.preventDefault();
		};
	}

	if( typeof form.onreset !== "function"){
		form.onreset = function( event ){
			drawObj["init"]( drawObj );
			event.preventDefault();
		};
	}

	//clear-btn
	var btn_clear_canvas = form["clear_canvas"];
//console.log(btn_clear_canvas);		
	btn_clear_canvas.addEventListener("click", function(e){
//console.log(e);
		clear_canvas( drawObj["canvasID"] );
		//drawObj["init"]();
		//drawObj["draw"]();
	}, false);//end event
	
	form.elements["color_widget"].onchange = function(e){
//console.log(arguments);
//console.log(e.target.value);
		form.elements["color"].value = e.target.value;
	}//end event
	
}//end initFormEpic()

function epic_ulitka( context, params){//Улитка Паскаля
//console.log( context, params );
		context.fillStyle = params.color;
		var start_x = params.start_x;
		var start_y = params.start_y;
		var px = params.px; // сжатие по X
		var py = params.py; // сжатие по Y
		var step = params.step;
		var num_repeat =  params.num_repeat;
		var k1 = params.k1;
		var k2 = params.k2;
		var k3 = params.k3;
		
		for ( var n = 0;  n < num_repeat; n += step) {
			r = 1 - Math.cos( n * k3);
			x_ = ( r * Math.cos( n  * k1)  ) * px;
			y_ = ( r * Math.sin( n  * k2)  ) * py;

			x = start_x + ( Math.round(x_) ) ;
			y = start_y + ( Math.round(y_) );
			context.fillRect(x, y, 2, 2);
		}//next

}//end epic_ulika()

function epic( context, params){
	context.fillStyle = params.color;
	var start_x = params.start_x;
	var start_y = params.start_y;
	var r0 = params.r0; // радиус неподвижного круга
	var r1 = params.r1; // радиус скользящего круга
	var d = params.d;// расстояние от центра неподвижного круга до точки
	var step = params.step;
	var num_repeat =  params.num_repeat;
	var k1 = params.k1;
	
	var px = params.px; // сжатие по X
	var py = params.py; // сжатие по Y
	
	for ( n = 0;  n < num_repeat; n += step){
		var cos_v = ((r0 + r1) / r1 ) * n;
		var sin_v = ((r0 + r1) / r1 ) * n;
		x_ = ( r0  + r1 )* Math.cos( n ) - d * Math.cos( cos_v );
		y_ = ( r0 + r1 )  * Math.sin( n ) - d * Math.sin(  sin_v );

		x = start_x + ( Math.round(x_) ) ;
		y = start_y + ( Math.round(y_) );
			
		x = x + k1;
		context.fillRect(x, y, 2, 2);
	}//next
}//end epic()


function runTest(){
	var support = false;
	var test = {
		"name" : "HTML5, isCanvasSupported",
		"result" : false
	};
	
	try {
			document.createElement("canvas").getContext("2d");
			test["result"] = true;
			test["msg"] = "Canvas 2D is supported in this browser";
	} catch (e) {
			test["msg"] = "Canvas 2D is not supported in this browser";
			test["msg"] += "<br> "+e.name+ ", "+e.message+ ", "+e.number+ ", "+e.description;
_log("<div class='alert alert-danger'>" + test["msg"] + "</div>");
console.log( test["msg"] );
	}//end try
	

	return test["result"];
}//end runTest()
