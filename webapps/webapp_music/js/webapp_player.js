function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"trackListTitle": "new playlist",
		"trackList":  [
// {"title" : "Hit The Lights", "mp3" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "The Four Horsemen","artist" : "Metallica","mp3" : "/music/M/Metallica/1983_Kill_em_All/02_The_Four_Horsemen.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"mp3" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
	};

	var _init = function( opt ){
		//_vars.$audioplayer = $("#audio-player")[0];
		_vars.$audioplayer = func.getById("audio-player");
		_vars.$audioplayer.volume = 0.4;

		$(_vars.$audioplayer).on("ended", function(e){
console.log(e);
		});//end event
		
	};//end _init()


	function _loadTrackList(opt){
		var p = {
			//"trackListTitle": false,
			"trackListUrl": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
//for test
//db\Manowar.json
//db\metallica.json
//db\Korpiklaani.json
p.url = "db/metallica.json";

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);
			$.getJSON( p.url, function(){
//console.log("getJSON, default...");
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
	//console.log(data);
					webApp.player.vars["trackList"] = data;
					webApp.player.vars["trackListTitle"] = p["trackListUrl"];
					resolve( textStatus );
				})
				
				.fail(function( xhr, status, error ){
	webApp.vars["logMsg"] = "error, getJSON fail";
	webApp.vars["logMsg"] += ",  " + error +", "+ p.url;
	func.logAlert( webApp.vars["logMsg"], "error");
	console.log(xhr);
					reject( status );
				})
				// .error(function(){
	// console.log("getJSON, Error...", arguments);
				// })
				
				//.always(function( data, textStatus, jqXHR ){
	//console.log("getJSON, Always...", textStatus);
	//console.log(" jqXHR: ",  jqXHR);
	//console.log(" status: ",  jqXHR.status);
	//console.log(" statusText: ",  jqXHR.statusText);
				//});

		});//end promise
		
//console.log( _df );
		return _df;
		
	}//end _loadTrackList()
	
	function _loadTrack( opt ){
		var p = {
			"trackUrl": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		//$(_vars.$audioplayer).attr("src", p["trackUrl"] );
		_vars.$audioplayer.setAttribute("src", p["trackUrl"] );
		//document.querySelector("#block-player audio").setAttribute("src", p["trackUrl"] );

		document.querySelector("#block-player h5").innerHTML = p["trackUrl"];
	}//end _loadTrack()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		loadTrackList: _loadTrackList,
		loadTrack: _loadTrack
	};
}//end _player()