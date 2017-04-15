var webApp = {
	
	"vars" : {
		"log" : [],
		// "templates" : {
			// "subfolder_tpl" : "",
			// "file_tpl" : ""
		// },
	"db_url" : "db/art.xml",
	"db_type" : "xml"
	//"db_url" :"db/art.json",
	//"db_url" : "db/art.csv"
	},
	
	"init" : function(){
console.log("init webapp!");
//console.log(webApp.vars);

		runAjax( {
			"requestMethod" : "GET", 
			"url" : webApp.vars["db_url"], 
			"callback": function( data ){
var msg = "load " + webApp.vars["db_url"] ;
console.log("<br>" + msg);
//console.log( "_postFunc(), " + typeof data );

				_dBase().init({
					"data" : data,
					"format" : webApp.vars["db_type"]
				});
				
			}//end callback()
		});
		
		//this.dBase();
	}//end init()
	
};//end webApp()

webApp.init();


function _dBase( opt ){
//console.log(arguments);	

	// private variables and functions
	var vars = {};

	var _init = function(args){
console.log("init _dBase!", args);
		vars["xmlData"] = args["data"];
//console.log( "vars:" , vars["xmlData"].children );

		// var xml = vars["xmlData"].children;
// console.log( xml ) ;
		// for( var item in xml){
// console.log( item +" : "+ xml["item"] ) ;
		// }
		var xml = vars["xmlData"].getElementsByTagName("database");
		var records = xml.item(0).getElementsByTagName("table");
		
console.log( records.length ) ;

	};

	var _query = function(args){
		var data = 1;
		return data;
	};
	

	// public interfaces
	return{
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		query:	function(args){ 
			return _query(args); 
		}
	};
}//end _dBase()


/*
//Module MusicFM
(function(){
	var MusicFM = MusicFM || function(options){

		// private variables and functions
		var _init = function(){
console.log("init!!!");
		};
		
		var _build = function(target){
			var html = "Table " + target + " is building....";
			return html;
		};
		
		// public interfaces
		return{
			init:	function(){ 
				return _init(); 
			},
			build:	function(target){ 
				return _build(target); 
			}
		};
	};
	window.MusicFM = MusicFM;
	MusicFM().init();
})();
*/