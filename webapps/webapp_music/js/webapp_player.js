function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
	};

	var _init = function( opt ){
//console.log("_player: ", _vars);
	};//end _init()


	function _loadPlaylist(opt){
		var p = {
			"playlistUrl": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);
		
	}//end _loadPlaylist()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		loadPlaylist: _loadPlaylist
	};
}//end _player()