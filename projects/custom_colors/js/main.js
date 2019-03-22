//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
//var func = sharedFunc();
//console.log("func:", func);
var _vars = {
	colors: [
		{
			"styleName": "bg-darkblue",
			"code": "#004586"
		},
		{
			"styleName": "bg-darkblue2",
			"code": " #000080"
		},
		{
			"styleName": "bg-darkblue3",
			"code": "#0e1f40"
		},
		{
			"styleName": "bg-darkblue4",
			"code": "#062237"
		},
		{
			"styleName": "bg-darkblue5",
			"code": "#153449"
		},
		{
			"styleName": "bg-darkblue-tango",
			"code": "#0c253c"
		},
		{
			"styleName": "bg-darkblue-tango2",
			"code": "#001b33"
		},
		{
			"styleName": "bg-lightblue",
			"code": "#0084d1"
		},
		{
			"styleName": "bg-lightblue2",
			"code": "#083caf"
		},
		{
			"styleName": "bg-lightblue3",
			"code": "#6aa6c0"
		},
		{
			"styleName": "bg-lightblue4",
			"code": "#C9E0ED"
		},
		{
			"styleName": "bg-lightblue5",
			"code": "#BBD8E9"
		},

		{
			"styleName": "bg-lightsteelblue",
			"code": "#b0c4de"
		},
		{
			"styleName": "bg-lightsteelblue2",
			"code": "#83A0C5"
		},
		{
			"styleName": "bg-lightsteelblue3",
			"code": "#3b5a6f"
		},
		{
			"styleName": "bg-lightsteelblue4",
			"code": "#b6cfed"
		}

	]//end colors
}
console.log(_vars);

if( typeof window.jQuery === "function"){
//var msg = 'jQuery version: ' + jQuery.fn.jquery;
//func.log(msg);

	$(document).ready(function(){
//console.log("document ready");
	});//end ready	

}

window.onload = function(){
console.log("window event onload");
//func.log( navigator.userAgent );
	_vars["pallete"] = document.getElementById("App");
	createPalette();
};//end window.load


function createPalette(){
	
	var newDiv = null;
	for( var n = 0; n < _vars["colors"].length; n++){
		
		newDiv = document.createElement("div");
		newDiv.className = "block";
		var _color = _vars["colors"][n]["code"];
		newDiv.setAttribute("style", "background-color:"+_color+";");
		
		//inverse color
/*		
var r = "00";
var g = "84";
var b = "d1";
r = (255 - parseInt(r, 16)).toString(16);
g = (255 - parseInt(g, 16)).toString(16);
b = (255 - parseInt(b, 16)).toString(16);
console.log(r,g,b); // осталось только нолики дописать
*/		
		var r = _color.substr(1,2);
		var g = _color.substr(3,2);
		var b = _color.substr(5,2);
		r = (255 - parseInt(r, 16)).toString(16);
		g = (255 - parseInt(g, 16)).toString(16);
		b = (255 - parseInt(b, 16)).toString(16);
//console.log(r,g,b);
		
		newDiv.style.color="#"+r+g+b;
		newDiv.setAttribute("title", "background-color: "+_color);
		
		newDiv.innerHTML = "<p>" + _vars["colors"][n]["code"] + "</p>";
		newDiv.innerHTML += "<p>" + _vars["colors"][n]["styleName"] + "</p>";
		
		_vars["pallete"].appendChild( newDiv );	
	}//next
	
}//end createPalette()
