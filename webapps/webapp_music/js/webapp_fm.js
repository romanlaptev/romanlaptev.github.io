function _fileManager( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"testPHP_url": "api/test.php",
		"supportPHP": false//,
		//"testUrlASPX": "api/aspx/test.aspx",
	};

	var _init = function( opt ){
//console.log("init _fileManager");
		_phpSupport().then(
			function( res ){
console.log( "-- THEN, promise resolve" );
console.log(res);
			}, 
			function( error ){
console.log( "-- THEN, promise reject, ", error );
			}
		);
	};//end _init()

	//check PHP support
	function _phpSupport( callback ){
		return new Promise( function(resolve, reject) {

			$.ajax({
				type: "GET",
				url: _vars["testPHP_url"],
				success: function(data, status){
	console.log("-- status: " + status);
	console.log("-- data: " + data);

					if (data == "4"){
						_vars["supportPHP"] = true;
					}
					resolve( data );
				},
				
				error:function (XMLHttpRequest, textStatus, errorThrown) {
	//console.log( "XMLHttpRequest: ", XMLHttpRequest );
	//console.log( "textStatus: ", textStatus );
	//console.log( "errorThrown: ", errorThrown );
					vars["supportPHP"] = false;
					reject( textStatus );
				}
			});
		
		});//end promise
	}// end _phpSupport()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		}
	};
	
}//end _fileManager()