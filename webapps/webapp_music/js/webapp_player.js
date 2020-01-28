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
		"numTrack": 0
	};

	var _init = function( opt ){
		//_vars.$audioplayer = $("#audio-player")[0];
		_vars.$audioplayer = func.getById("audio-player");
		_vars.$audioplayer.volume = 0.4;

//--------------------------
		$(_vars.$audioplayer).on("ended", function(e){
console.log(e);
		});//end event
		
//--------------------------
		$(_vars.$audioplayer).onerror = function(e){
console.log(e);
			//func.logAlert( "event: " + e.type, "error");
		}//end event
	
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
//p.url = "db/metallica.json";

		var url = p["trackListUrl"];
		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);
			$.getJSON( url, function(){
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
	
//----------------- add track order number 
for( var n = 0; n < data.length; n++){
	data[n]["number"] = n;
}//next
//-----------------
					_vars["trackList"] = data;
					_vars["trackListTitle"] = p["trackListUrl"];
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
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		var numTrack = p.trackNum;
		_vars["numTrack"] = numTrack;
		
//console.log( numTrack, _vars["trackList"][numTrack], trackUrl );
		if( _vars["trackList"][numTrack] ){
			var track = _vars["trackList"][numTrack];
			var trackUrl = track["mp3"];
		} else {
			webApp.vars["logMsg"] = "not found track by num: "+ numTrack;
console.log( "-- " + webApp.vars["logMsg"] );
			return false;
		}
		
		//$(_vars.$audioplayer).attr("src", trackUrl );
		_vars.$audioplayer.setAttribute("src", trackUrl );
		//document.querySelector("#block-player audio").setAttribute("src", trackUrl );

		$("#track-info").text( track["title"] );
		_setActiveTrack( numTrack );
	}//end _loadTrack()
	

	function _nextTrack(){
		$(_vars.$audioplayer).attr("src", "");
		//var autoplay = false;
		
		if( _vars["numTrack"] < ( _vars["trackList"].length - 1) ){
			_vars["numTrack"]++;
			//if( webApp.vars["GET"]["autoplay"] === "TRUE"){
				//autoplay = true;
			//}
		}
		var num = _vars["numTrack"];
//console.log( num );
		var track = _vars["trackList"][num];
		if( !track ){
console.log( "-- no track!!!!");
			return false;
		}				
		var mediaSrc = track["mp3"];
//console.log(mediaSrc);		
		$(_vars.$audioplayer).attr("src", mediaSrc);
		
		var track_info = track["title"];
		$("#track-info").text( track_info );

		_setActiveTrack( num );
		
		//if( autoplay ){
			//_vars.$audioplayer.play();
		//}

	}//end _nextTrack()
	
	
	function _prevTrack(){
		$(_vars.$audioplayer).attr("src", "");
		if( _vars["numTrack"] > 0){
			_vars["numTrack"]--;
		}
		
		var num = _vars["numTrack"];
//console.log( num );
		var track = _vars["trackList"][num];
		if( !track ){
console.log( "-- no track!!!!");
			return false;
		}				
		var mediaSrc = track["mp3"];
//console.log(mediaSrc);		
		$(_vars.$audioplayer).attr("src", mediaSrc);
		
		var track_info = track["title"];
		$("#track-info").text( track_info );

		_setActiveTrack( num );
		//if( autoplay ){
			//_vars.$audioplayer.play();
		//}
		
	}//end _prevTrack()
	

	function _setActiveTrack( num ){
//console.log(num);
		var activeNum = parseInt( num );
//console.log(num, typeof num, isNaN(num) );
		if( isNaN(activeNum) ){
webApp.vars["logMsg"] = "not found track by num: "+ activeNum;
console.log( "-- error, " + webApp.vars["logMsg"] );
			return false;
		}

		var activeItem = false;
		$("#playlist a.track-name").each(function(num, value){
//console.log(num)
			$(this).removeClass("active");
//console.log(num, activeNum, typeof activeNum, num === activeNum);
			if( num === activeNum){
				activeItem = value;//this...
			}
		});//end each
		
		if( activeItem ){
			$(activeItem).addClass("active");
		}
	}//end _setActiveTrack()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		loadTrackList: _loadTrackList,
		loadTrack: _loadTrack,
		nextTrack: _nextTrack,
		prevTrack: _prevTrack
	};
}//end _player()