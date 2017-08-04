(function() {
	var iDB = function(opt){
//console.log(arguments);

		var _vars = {
			"ver": 1
		}; 
		
		// private variables and functions
		var _init = function(){
console.log("init iDB module...");
		};
		
		// var _build = function(target){
			// var html = "Table " + target + " is building....";
			// return html;
		// };
		
		// public interfaces
		return{
			vars:_vars,
			init: _init//,
			// build: function(target){ 
				// return _build(target); 
			// }
		};
	};//end iDB()
	
	window.iDB = iDB;
	//iDB().init();
	
//})(this);
})();