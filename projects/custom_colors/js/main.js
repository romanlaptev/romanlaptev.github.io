//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
//var func = sharedFunc();
//console.log("func:", func);
var _vars = {
	colors: [
		{
			"styleName": "bg-darkblue",
			"code": " #004586"
		},
		{
			"styleName": "bg-darkblue2",
			"code": "  #000080"
		},
		{
			"styleName": "bg-darkblue3",
			"code": " #0e1f40"
		},
		{
			"styleName": "bg-darkblue4",
			"code": " #062237"
		},
		{
			"styleName": "bg-darkblue5",
			"code": " #153449"
		},
		{
			"styleName": ".bg-darkblue-tango",
			"code": " #0c253c"
		},
		{
			"styleName": ".bg-darkblue-tango2",
			"code": " #001b33"
		}
	]
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
		newDiv.setAttribute("style", "background-color:"+_vars["colors"][n]["code"]+";");
		newDiv.innerHTML = "<p>" + _vars["colors"][n]["code"] + "</p>";
		newDiv.innerHTML += "<p>" + _vars["colors"][n]["styleName"] + "</p>";
		
		_vars["pallete"].appendChild( newDiv );	
	}//next
	
}//end createPalette()
