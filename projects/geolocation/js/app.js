//(function(){
	
	var App =  App || function(){
	
		// private variables and functions
		//.......
		_vars = {
			"logMsg" : ""
		};//end _vars
		
		var _init = function(){
//console.log("App initialize...");
			
			_vars["getCoord"] = document.querySelector("#get_coords");
			_vars["getCoord"].onclick = function(e){
console.log(e);
				_handleCoordinateBtn();
			}//end event
			
		};// end _init


		var _handleCoordinateBtn = function(opt){
			navigator.geolocation.getCurrentPosition( function (position) {
console.log( "async navigator.geolocation.getCurrentPosition ");
console.log( position);
// for(var item in position.coords){
	// console.log( item, position.coords[item] );
// }
				// var coords = position.coords;
				// latitude_value.innerHTML = coords.latitude;
				// longitude_value.innerHTML = coords.longitude;
				// accuracy_value.innerHTML = coords.accuracy;
				// timestamp_value.innerHTML = position.timestamp;
				
				// speed_value.innerHTML = coords.speed;
				// altitude_value.innerHTML = coords.altitude;
				// altitudeAccuracy_value.innerHTML = coords.altitudeAccuracy;
				// heading_value.innerHTML = position.heading;
			}, function (error){
				var errorTypes = {
					1: "Permission denied",
					2: "Position is not available",
					3: "Request timeout"
				};
				_vars["logMsg"] = "Error code: " + error.code + ", " + errorTypes[error.code] + ", " + error.message;
console.log(error);
				func.logAlert(_vars["logMsg"], "error");
			});
		};//_handleCoordinateBtn
		
		// public interfaces
		return {
			vars:	_vars,
			init:	_init
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
		
	};//end App
	
//window.App = App;
//})();

