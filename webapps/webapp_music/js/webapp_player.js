function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"trackListName": "new track list",
		"trackListTitle": "",
		"trackList":  [
// {"title" : "Hit The Lights", "mp3" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "The Four Horsemen","artist" : "Metallica","mp3" : "/music/M/Metallica/1983_Kill_em_All/02_The_Four_Horsemen.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"mp3" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
		"numTrack": 0,
		"autoplay" : true
	};

	var _init = function( opt ){
		
		_vars["trackListTitle"] =  _vars["trackListName"];
		
		//_vars.$audioplayer = $("#audio-player")[0];
		_vars.$audioplayer = func.getById("audio-player");
		_vars.$audioplayer.volume = 0.4;
//--------------------------
		$(_vars.$audioplayer).on("ended", function(e){
console.log(e);
			_nextTrack();
		});//end event
		
//--------------------------
		$(_vars.$audioplayer).on("error",  function(e){
//console.log(e);
console.log( _vars.$audioplayer.error);
			var err = _vars.$audioplayer.error;
if(err){
			//for( var key in err){
				//webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ err[key];
				//func.logAlert( webApp.vars["logMsg"], "error");
			//}//next
webApp.vars["logMsg"] = "<b>code:</b> : "+ err["code"];
webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars.$audioplayer.src;
func.logAlert( webApp.vars["logMsg"], "error");
}
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
console.log(p);
		
//for test
//db\Manowar.json
//db\metallica.json
//db\Korpiklaani.json
//p.url = "db/metallica.json";

		var url = p["trackListUrl"];
		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);
			if(!url){
				reject( "-- error, empty url....", url );
				return _df;
			}
			
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
	webApp.vars["logMsg"] += ",  "+textStatus +" load playlist file "+ url;
	func.logAlert( webApp.vars["logMsg"], "success");
	//console.log(data);
					_vars["trackListTitle"] = url;
					resolve( data );
				})
				
				.fail(function( xhr, status, error ){
	webApp.vars["logMsg"] = "error, getJSON fail";
	webApp.vars["logMsg"] += ",  " + error +", "+ url;
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
	
	function _formTrackList(tracks){
		
		//----------------- add track order number 
		for( var n = 0; n < tracks.length; n++){
			tracks[n]["number"] = n+1;
		}//next
		
		if( _vars["trackList"].length > 0){
			_vars["trackList"] = _vars["trackList"].concat( tracks);
			_vars["trackList"].forEach( function(item, n, arr) {//reorder tracklist
				item["number"] = n+1;
			});
		} else {
			_vars["trackList"] = tracks;
		}
		
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		//_vars["numTrack"] = 0;
		_setActiveTrack( _vars["numTrack"] );
		
	}//end _formTrackList()
	
	
	function _loadTrack( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		var numTrack = p.trackNum-1;
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

		_setActiveTrack( numTrack );
	}//end _loadTrack()
	

	function _nextTrack(){
		if( _vars["numTrack"] < ( _vars["trackList"].length - 1) ){
			_vars["numTrack"]++;
			_setActiveTrack( _vars["numTrack"] );
		}
	}//end _nextTrack()
	
	
	function _prevTrack(){
		if( _vars["numTrack"] > 0){
			_vars["numTrack"]--;
			_setActiveTrack( _vars["numTrack"] );
		}
	}//end _prevTrack()
	

	function _setActiveTrack( num ){
//console.log(num);
		var activeNum = parseInt( num );
//console.log(num, typeof num, isNaN(num) );
		if( isNaN(activeNum) ){
webApp.vars["logMsg"] = "wrong activeNum: "+ activeNum;
console.log( "-- error, " + webApp.vars["logMsg"] );
			return false;
		}

		$(_vars.$audioplayer).attr("src", "");
		
		//load and play track by num
		var track = _vars["trackList"][ activeNum ];
		if( !track ){
console.log( "-- error, no track by activeNum = " + activeNum);
			return false;
		}
		
		var mediaSrc = track["mp3"];
//console.log(mediaSrc);		
		$(_vars.$audioplayer).attr("src", mediaSrc);
		
		//form track text title
		var track_info = "";
		if( track["artist"] && track["artist"].length > 0){
			track_info += track["artist"];
		}
		if( track["title"] && track["title"].length > 0){
			if( track_info.length > 0){
				track_info += ", ";
			}
			track_info += track["title"];
		}
		if( track_info.length === 0){
			track_info = track["mp3"];
		}
		$("#track-info").text( track_info );
		
		if( _vars["autoplay"] ){
			//try{
				_vars.$audioplayer.play();
			//} catch(e){
//console.log(e);	
			//}
		}

		//set active style
		var activeItem = false;
		$("#track-list a.track-name").each(function(num, value){
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
	

	function _removeTrack( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		//$(_vars.$audioplayer).attr("src", "");
		_vars.$audioplayer.pause();
		
		var numTrack = p.trackNum-1;
//console.log( numTrack, _vars["trackList"][numTrack] );
		
		//remove track
		delete _vars["trackList"][numTrack];
//console.log( _vars["trackList"] );
		
		//squeeze tracklist
		var arr = webApp.player.vars.trackList.filter(function(obj) {
		  return typeof obj !== "undefined";
		});
		
		//reorder tracklist
		arr.forEach( function(item, n, arr) {
			item["number"] = n+1;
		});
//console.log( arr );

		webApp.player.vars["trackList"] = arr;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		_setActiveTrack( _vars["numTrack"] );
	}//end _removeTrack()


	function _editTrack( opt ){
		var p = {
			"trackNum": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
				
		var numTrack = p.trackNum-1;
		//_vars["numTrack"] = numTrack;
		
console.log( numTrack, _vars["trackList"][numTrack] );
	}//end _editTrack()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		loadTrackList: _loadTrackList,
		formTrackList: _formTrackList,
		loadTrack: _loadTrack,
		setActiveTrack: _setActiveTrack,
		nextTrack: _nextTrack,
		prevTrack: _prevTrack,
		removeTrack: _removeTrack,
		editTrack: _editTrack
	};
}//end _player()