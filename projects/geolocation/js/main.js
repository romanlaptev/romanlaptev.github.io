//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
console.log("func:", func);

window.onload = function(){
console.log("window event onload");
var logMsg;
logMsg = navigator.userAgent;
func.logAlert(logMsg, "info");

defineEvents();

	//Start webApp
	//if( typeof webApp === "object"){
		//_runApp();
	//}

	//function _runApp(){
		//webApp.init(function(){
//console.log("end webApp initialize....");
		//});//end webApp initialize
	//}//end _runApp()

};//end window.load



function defineEvents(){

	var btn_clear_log = func.getById("btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};

}//end defineEvents()
