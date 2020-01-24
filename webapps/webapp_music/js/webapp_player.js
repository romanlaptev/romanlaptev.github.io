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
		
//for test
//db\Manowar.json
//db\metallica.json
//db\Korpiklaani.json
p.url = "db/metallica.json";

		$.getJSON( p.url, function(){
console.log("getJSON, default...");
			})
			
			//.abort(function(){
//console.log("getJSON, Abort...", arguments);
			//})
			
			//.success(function( data, textStatus, jqXHR ){
//console.log("getJSON, Success...", arguments);
			//})
			
			//.complete(function(){
//console.log("getJSON, Complete...", arguments);
			//})
			
			.done(function( data, textStatus, jqXHR ){
//console.log("getJSON, Done...", arguments);
webApp.vars["logMsg"] = "getJSON done";
webApp.vars["logMsg"] += ",  "+textStatus +" load playlist file "+ p.url;
func.logAlert( webApp.vars["logMsg"], "success");

console.log(data);
/*
				$.each(data,function(entryIndex,entry){
var html = "<div class='entry'>";
html += "<p><b>" + entryIndex + ":</b>" + entry + "</p>";
html += "</div>";
//alert (html);
					$('#insert_json').append(html);
				});
*/
				//var json_str =   jqXHR.responseText;
				//$('#insert_json').append(  jqXHR.responseText );

			})
			
			.fail(function( xhr, status, error ){
webApp.vars["logMsg"] = "error, getJSON fail";
webApp.vars["logMsg"] += ",  " + error +", "+ p.url;
func.logAlert( webApp.vars["logMsg"], "error");
console.log(xhr);
			})
			// .error(function(){
// console.log("getJSON, Error...", arguments);
			// })
			
			.always(function( data, textStatus, jqXHR ){
//console.log("getJSON, Always...", textStatus);
//console.log(" jqXHR: ",  jqXHR);
//console.log(" status: ",  jqXHR.status);
//console.log(" statusText: ",  jqXHR.statusText);
			});
		
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