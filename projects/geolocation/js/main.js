//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
console.log("func:", func);

	var support = false;
	var logMsg;

window.onload = function(){

	logMsg = navigator.userAgent;
	func.logAlert(logMsg, "info");

	defineEvents();

	//--------------------------
	var test =  typeof navigator.geolocation !== "undefined";
	logMsg = "navigator.geolocation support: " + test;
	if ( test ) {
		func.logAlert(logMsg, "success");
		support = true;
	} else {
		func.logAlert(logMsg, "danger");
	}
	
	//--------------------------
	if( window.location.protocol !== "https:"){
		support = false;
		logMsg = "error, <b>navigator.geolocation</b> requires <b>'https:'</b> protocol....";
		func.logAlert( logMsg, "error" );
	} else {
		support = true;
	}

	//Start webApp
	if( support ){
		_runApp();
	}

	function _runApp(){
		var _app = App();
console.log("_app:", _app);
		_app.init();
	}//end _runApp()

};//end window.load



function defineEvents(){

	var btn_clear_log = func.getById("btn-clear-log");
	btn_clear_log.onclick = function( event ){
//console.log("click...", e);			
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		log.innerHTML = "";
	};//end event

/*
//------------------------------------------------------------------
	$("#btn-toggle-log").on("click", function(event){
//console.log("click...", e);			
		event = event || window.event;
		//var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		
		if( webApp.vars["log"].style.display==="none"){
			webApp.vars["log"].style.display="block";
			webApp.vars["btnToggle"].innerHTML="-";
		} else {
			webApp.vars["log"].style.display="none";
			webApp.vars["btnToggle"].innerHTML="+";
		}
	});//end event
*/

}//end defineEvents()
