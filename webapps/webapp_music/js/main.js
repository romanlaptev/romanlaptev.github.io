var func = sharedFunc();
//console.log("func:", func);

var _testObj = {
	"logMsg": ""
};
console.log( _testObj );

window.onload = function(){
	_testObj.logMsg = navigator.userAgent;
	func.logAlert( _testObj.logMsg, "info");

/*	
	//init test object
	_testObj["log"] = func.getById("log");
	_testObj["btn_clear_log"] = func.getById("btn-clear-log");

	_testObj["btn_clear_log"].onclick = function( event ){
//console.log("click...", e);
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
		_testObj.log.innerHTML = "";
	};//end event
*/

//===============================
/*
	func.addEvent( 
		_testObj["btnSave"], 
		"click", 
		function(e){
//console.log( e );
			var dataURL = _testObj["canvas"].toDataURL();//PNG
console.log(dataURL)	;
			//_saveImage();
			_testObj["btnSave"].href = dataURL;
		}
	);//end event
*/

	//Start webApp
	if( typeof webApp === "object"){
		_runApp();
	}

	function _runApp(){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize

	}//end _runApp()

}//end load()
