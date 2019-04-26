var func = sharedFunc();
//console.log("func:", func);

window.onload = function(){
//console.log("onload");
	func.log( "<p class='alert alert-info'>"+navigator.userAgent +"</p>");
};//end load