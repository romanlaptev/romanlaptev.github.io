
var _vars = [];
_vars["db_url"] = "db/art.xml";
//_vars["db_url"] = "db/art.json";
//_vars["db_url"] = "db/art.csv";

_vars["db_type"] = "xml";

_init();

function _init(){
console.log(_vars);

	var url = _vars["db_url"];
	_load( url, _postFunc );
	
}//end init()	


function _postFunc( data ){
	
var msg = "load " + _vars["db_url"];
console.log( msg );
_log(msg);

console.log( data );

}//end _postFunc()



function _load( url, callback ){
	
	var xhr = createRequestObject();
	if ( !xhr ) {
console.log("error, ", xhr);
		return false;
	}
	
	var timeStart = new Date();
	var async = true;
	xhr.open('GET', url, async);
	
	xhr.onreadystatechange  = function() { 
//console.log("state:", xhr.readyState);
		if( xhr.readyState == 4) {
console.log( xhr );
console.log("end request, state " + xhr.readyState, ", status: " + xhr.status);
				if( xhr.status === 200){
					
//console.log(xhr.getResponseHeader('X-Powered-By') );
					var all_headers = xhr.getAllResponseHeaders();
console.log( all_headers );
					
				var timeEnd = new Date();
				var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
_log(msg);
					
//console.log( xhr.responseText );
//console.log( xhr.responseXML );

					if( typeof callback === "function"){
						
						if( xhr.responseXML ){
							var data = xhr.responseXML;
						} else {
							var data = xhr.responseText;
						}
						callback(data);
					}
					
				} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
				}
				
		}
	};
	
	// xhr.onabort = function(){
// _log("ajax onabort");
// console.log(arguments);
	// }
	
	// xhr.onerror = function(){
// _log("ajax onerror");
// console.log(arguments);
	// }
	
	// xhr.onload = function(){
// _log("ajax onload");
// console.log(arguments);
	// }
	
	// xhr.onloadstart = function(){
// _log("ajax onloadstart");
// console.log(arguments);
	// }
	
	// xhr.onprogress = function(){
// _log("ajax onprogress");
// console.log(arguments);
	// }
	xhr.send();

	function createRequestObject() {
		var request = false;
		if (window.XMLHttpRequest) 
		{ // Mozilla, Safari, Opera ...
			request = new XMLHttpRequest();
		} 

		if(!request)
		{ // IE
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(!request)
		{
			request=new ActiveXObject('Msxml2.XMLHTTP');
		}

		return request;
	}//end createRequestObject()
	
}//end load()


var _dBase = function( options ){
console.log(arguments);	

	// private variables and functions
		var _init = function(){
console.log("init!!!");
	};
		
	// init vars
	var vars = {
		"log" : [],
		"templates" : {
			"subfolder_tpl" : "",
			"file_tpl" : "",
		},
		"testUrlPHP": "api/test.php",
		"testUrlASPX": "api/aspx/test.aspx",
		"music_alias" : "/music/",
		"content_location" : "",
		
		//"protocol" : "file://",
		//"protocol" : "",
		
		"dirname" : "",
		"filelist_url" : "",
		"copy_url" : "",
		"rename_url" : "",
		"remove_url" : "",
		"mkdir_url" : "",
		"save_pls_url" : "",
		"filelist_src" : "",
		"text_new_playlist" : "new playlist",
		"playlist" : ""
	};
//console.log( "vars:" , vars );

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

//window.dBase = _dBase;
//console.log ("dBase = ",  dBase);

_dBase().init();

var test = _dBase().build("table1");
_log (test);
