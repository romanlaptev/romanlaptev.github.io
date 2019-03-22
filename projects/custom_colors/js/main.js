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
			"code": "#0084d1",
			"text-color": "#fff"
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
		},

		
		{
			"styleName": "bg-yellow",
			"code": "#ffd320",
			"text-color": "#000000"
		},
		{
			"styleName": "bg-yellow2",
			"code": "#ffcc00",
			"text-color": "#000000"
		},
		
		{
			"styleName": "bg-orange",
			"code": "#ff950e"
		},
		{
			"styleName": "bg-orange2",
			"code": "#ffb515"
		},
		{
			"styleName": "bg-orange-tango",
			"code": "#e09d00"
		},
		{
			"styleName": "bg-orange3",
			"code": "#ffa500"
		},
		{
			"styleName": "bg-orange4",
			"code": "#FECD90"
		},
		{
			"styleName": "bg-red-brown",
			"code": "#2f0606"
		},
		{
			"styleName": "bg-red-pink",
			"code": "#a68caa",
			"text-color": "#000000"
		},

		
		{
			"styleName": "bg-grey-blue",
			"code": "#5a819d",
			"text-color": "#000000"
		},
		{
			"styleName": "bg-blue-grey",
			"code": "#315570"
		},
		{
			"styleName": "bg-lightblue-grey",
			"code": "#e6e6ff",
			"text-color": "#000000"
		},
		
		
		{
			"styleName": "bg-lightskyblue",
			"code": "#87cefa"
		},
		{
			"styleName": "bg-sky-blue5",
			"code": "#006699"
		},
		{
			"styleName": "bg-sky-blue7",
			"code": "#003366"
		},
		{
			"styleName": "bg-sky-blue",
			"code": "#00ccff"
		},
		{
			"styleName": "bg-sky-blue2",
			"code": "#3399ff"
		},
		{
			"styleName": "bg-sky-blue3",
			"code": "#6699cc",
			"text-color": "#000000"
		},
		{
			"styleName": "bg-sky-blue4",
			"code": "#0174e9"
		},
		{
			"styleName": "bg-sky-blue5",
			"code": "#1e73be"
		},
		{
			"styleName": "bg-sky-blue6",
			"code": "#0088FF"
		},
		{
			"styleName": "bg-sky-blue7",
			"code": "#5bc0de"
		},
		{
			"styleName": "bg-sky-blue8",
			"code": "#336699"
		},
		{
			"styleName": "bg-sky-blue10",
			"code": "#99ccff"
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
		
		if( _vars["colors"][n]["text-color"] ){
			newDiv.style.color = _vars["colors"][n]["text-color"];
		} else {//inverse color
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
		}
		newDiv.setAttribute("title", "background-color: "+_color);
		
		newDiv.innerHTML = "<p>" + _vars["colors"][n]["code"] + "</p>";
		newDiv.innerHTML += "<p>" + _vars["colors"][n]["styleName"] + "</p>";
		
		_vars["pallete"].appendChild( newDiv );	
	}//next
	
}//end createPalette()
