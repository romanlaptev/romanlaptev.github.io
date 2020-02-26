function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"trackListName": "new_tracklist.json*",
		"trackListTitle": "",
		"trackList":  [
// {"title" : "Hit The Lights", "source_url" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"source_url" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
		"trackFormat":  {
			"title" : "Hit The Lights",
			"artist" : "Metallica",
			"source_url": "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"
		},
		
		"numTrack": 0,
		//"autoplay" : true//,
		//"unSavedTrackList": false
		"GET" : {},
		
		"mediaTypes" : [
{"extension" : "wav", "testString" : 'audio/wav; codecs=1', support: false },
{ "extension" : "ogg", "testString" : 'audio/ogg; codecs="vorbis"', support: false},
//{ "extension" : "au", "testString" : 'audio/basic', support: false},
//{"extension" : "wav", "testString" : 'audio/L24', support: false, name: "24bit Linear PCM format, at 8-48 kHz, 1-N channels"},
//{ "extension" : "webm", "testString" : 'audio/webm', support: false, name: "WebM open media format."},
{ "extension" : "mp2,mpga,mpega", "testString" : 'audio/x-mpeg', support: false, name: "MPEG audio"},
{ "extension" : "mp3", "testString" : 'audio/mpeg; codecs="mp3"', support: false },
{ "extension" : "mp4,mpg4", "testString" : 'audio/mp4; codecs="mp4a.40.5"', support: false, name: "MPEG-4 audio"},
{ "extension" : "m4a", "testString" : 'audio/x-m4a', support: false, name: "MPEG-4 audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wma', support: false, name: "Windows Media Audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wax', support: false, name: "Windows Media Audio"},
{ "extension" : "3gp", "testString" : 'audio/3gpp', support: false},
{ "extension" : "flac", "testString" : 'audio/flac', support: false, name: "native FLAC format (FLAC in its own container)."},
{ "extension" : "ape", "testString" : 'audio/ape', support: false},
{ "extension" : "mka", "testString" : 'audio/x-matroska', support: false, name: "Matroska audio"},

{ "extension" : "ogg", "testString" : 'video/ogg; codecs="theora, vorbis"', support: false},
{"extension" : "ogv", "testString" : 'video/ogg', support: false },
{"extension" : "mp4", "testString" : 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"', support: false , name: "MPEG-4 video"},
{"extension" : "m4v", "testString" : 'video/x-m4v', support: false },
{"extension" : "webm", "testString" : 'video/webm; codecs="vp8.0, vorbis"', support: false },
{"extension" : "mpg", "testString" : 'video/mpeg', support: false, name: "MPEG-1" },
{"extension" : "mpg,mpeg,mpe", "testString" : 'video/x-mpeg', support: false, name: "MPEG video" },
{"extension" : "mov", "testString" : 'video/quicktime', support: false },
{"extension" : "wmv", "testString" : 'video/x-ms-wmv', support: false, name: "Windows Media Video" },
{"extension" : "3gp", "testString" : 'video/3gpp', support: false},
{"extension" : "flv", "testString" : 'video/x-flv', support: false},
{"extension" : "mkv", "testString" : 'video/x-matroska', support: false, name: "Matroska video"},
{"extension" : "vob", "testString" : 'video/x-ms-vob', support: false},
{"extension" : "avi", "testString" : 'video/vnd.avi', support: false},
{"extension" : "avi", "testString" : 'video/avi', support: false},
{"extension" : "avi", "testString" : 'video/msvideo', support: false},
{"extension" : "avi", "testString" : 'video/x-msvideo', support: false}
		],
		"playVideo": false,
		"playAudio": false
	};//end _vars

	var _init = function( opt ){
		
		_vars["trackListTitle"] =  _vars["trackListName"];
		
		//_vars.$mediaplayer = $("#audio-player")[0];
		_vars.$audioplayer = func.getById("audio-player");
		_vars.$videoplayer = func.getById("video-player");
		
		_vars.$audioplayer.volume = 0.4;
		_vars.$videoplayer.volume = 0.4;
		
//--------------------------
		$(_vars.$audioplayer).on("ended", function(e){
console.log(e);
			_nextTrack();
		});//end event
		
		$(_vars.$videoplayer).on("ended", function(e){
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
webApp.vars["logMsg"] = "MediaError, <b>code:</b> : "+ err["code"];
webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars.$audioplayer.src;
func.logAlert( webApp.vars["logMsg"], "error");
}
		});//end event
	
//--------------------------
		$(_vars.$videoplayer).on("error",  function(e){
//console.log(e);
console.log( _vars.$videoplayer.error);
			var err = _vars.$videoplayer.error;
if(err){
webApp.vars["logMsg"] = "<b>code:</b> : "+ err["code"];
webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars.$videoplayer.src;
func.logAlert( webApp.vars["logMsg"], "error");
}
		});//end event

//--------------------------
		_vars.$mediaplayer = _vars.$audioplayer;
	
	};//end _init()


	function _urlManager( url ){
//console.log(url);
		_vars["GET"] = func.parseGetParams( url );
		switch( _vars["GET"]["q"] ) {

			case "get-tracklist-url":
				if( _vars["GET"]["action"] === "load-tracklist" ){
					var _defaultValue = webApp.fileManager.vars["alias"] + "/0_playlists/" +_vars["trackListName"].replace("*","");
					var _trackListPath = window.prompt("Load track list, enter url:", _defaultValue);
//console.log( _trackListPath );
					if( _trackListPath && _trackListPath.length > 0 ){
						var _url = "?q=load-tracklist&url="+_trackListPath;
						_urlManager( _url );
					}
				}
				
				if( _vars["GET"]["action"] === "save-tracklist" ){
					if( _vars["trackList"].length > 0){
						var _defaultValue = webApp.fileManager.vars["aliasLocation"] + "/0_playlists/" +_vars["trackListName"].replace("*","");
						var _trackListPath = window.prompt("Save track list, enter file system path:", _defaultValue );
						if( _trackListPath && _trackListPath.length > 0 ){
						var _url = "?q=save-tracklist&fs_path="+_trackListPath;
							_urlManager( _url );
						}
					} else {
webApp.vars["logMsg"] = "warning, empty media track list ...";
func.logAlert(webApp.vars["logMsg"], "warning");
					}
				}
			break;
			
			case "load-tracklist":
				//var _nid = webApp.vars["GET"]["nid"];
				
				if( !_vars["GET"]["url"] || 
						_vars["GET"]["url"].length === 0){
_vars["logMsg"] = "error, not found tracklist url...";
func.logAlert( _vars.logMsg, "error");
					return false;
				}
				
				if( !webApp.vars.support["promiseSupport"]){
					_vars["logMsg"] = "error, window.Promise not supported...";
					func.logAlert( _vars["logMsg"], "error" );
					return false;
				}
				
				_loadTrackList({
					"trackListUrl": _vars["GET"]["url"]
				})
				.then(
					function( data ){
//console.log( "-- THEN, promise resolve" );
//console.log(data);
						_formTrackList(data);
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);
			break;


			case "save-tracklist":
				
				if( !_vars["GET"]["fs_path"] || 
						_vars["GET"]["fs_path"].length === 0){
_vars["logMsg"] = "error, not found tracklist fs_path...";
func.logAlert( _vars.logMsg, "error");
					return false;
				}
				
				if( !webApp.vars.support["promiseSupport"]){
_vars["logMsg"] = "error, window.Promise not supported...";
func.logAlert( _vars["logMsg"], "error" );
					return false;
				}
				
				_saveTrackList({
					"trackListFsPath": _vars["GET"]["fs_path"]
				})
				.then(
					function( data ){
console.log( "-- THEN, promise resolve" );
//console.log(data);
						_vars["unSavedTrackList"] = false;
						_vars["trackListTitle"] = 	webApp.fileManager.getUrlPath( _vars["GET"]["fs_path"] );
						webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);
			break;

			case "clear-tracklist":
				_vars["numTrack"] = 0;
				_vars["trackList"] = [];
				_vars["trackListTitle"] = _vars["trackListName"];
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
			break;

			case "load-track":
				_loadTrackToPlayer({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "prev-track":
				_prevTrack();
			break;
			
			case "next-track":
				_nextTrack();
			break;
			
			case "remove-track":
				_removeTrack({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "edit-track":
				_editTrack({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "insert-track":
//console.log(url);
				_insertTrack({
					"title": _vars["GET"]["input_title"],
					"artist": _vars["GET"]["input_artist"],
					"source_url": _vars["GET"]["input_source_url"]
				});
			break;
			
			case "update-track":
//console.log(url);
				_updateTrack({
					"number": _vars["GET"]["number"],
					"title": _vars["GET"]["input_title"],
					"artist": _vars["GET"]["input_artist"],
					"source_url": _vars["GET"]["input_source_url"]
				});
			break;
			
//--------------------------------------------
			default:
console.log("-- player.urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch

	}//end _urlManager()
	

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
	webApp.vars["logMsg"] = "server query done";
	webApp.vars["logMsg"] += ",  "+textStatus +" load track list file <b>"+ url +"</b>";
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
	
	
	
	function _formHtmlTrackList(){
		if( _vars["trackList"].length > 0 ){
			var html = webApp.draw.wrapData({
				"data": _vars["trackList"], 
				"templateID": "trackList",
				"templateListItemID": "trackListItem"
			});
		} else {
			var html = webApp.draw.vars.templates["trackList"].replace("{{list}}", "");
		}
//console.log( html );

//---------------------------- mark unsaved tracklist name
		if( _vars["unSavedTrackList"] ){
			if( _vars["trackListTitle"].indexOf("*") === -1){
				_vars["trackListTitle"] =  _vars["trackListTitle"] + "*";
			}
		} else {
			_vars["trackListTitle"] =  _vars["trackListTitle"].replace("*", "");
		}

		html = html.replace("{{tracklist_title}}", _vars["trackListTitle"]);
		return html;
	}//_formHtmlTrackList()

	
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
			_vars["numTrack"] = 0;
			_vars["trackList"] = tracks;
		}
		
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( !$("#block-player").is(":visible") ){
			$("#block-player").show();
		}

		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
	}//end _formTrackList()
	

	function _saveTrackList(opt){
		var p = {
			"trackListFsPath": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

//------------------------ filter track list
		var _trackFormat = _vars["trackFormat"];
		var _trackList = [];
		for( var n = 0; n < _vars["trackList"].length; n++){
			var _trackObj = {};
			for( var key in _trackFormat ){
				_trackObj[key] = "";
			}//next
//console.log( _trackObj );

			//write key:value to _track ( only matching  keys by "trackFormat" )
			var _track = _vars["trackList"][n];
			for( var key in _trackObj ){
				_trackObj[key] = _track[key];
			}//next
//console.log( _track );
			_trackList.push( _trackObj );
		}//next
console.log( _trackList );

//------------------------
		var _param = {
			"filename": p["trackListFsPath"], 
			//"filename": "", //test
			"playlist": _trackList
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["saveTrackListUrl"],
				dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
console.log( data );
					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}

					if( data["eventType"] && data["eventType"] === "success"){
webApp.vars["logMsg"] = "server query done";
webApp.vars["logMsg"] += ",  "+textStatus +" save track list file <b>"+ p["trackListFsPath"] +"</b>";
func.logAlert( webApp.vars["logMsg"], "success");
						resolve(data);
					}/* else {
_vars["logMsg"] = "unknown server request error....";
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}*/
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");
					reject( false);
				}
			});//end ajax query

		});//end promise
		
//console.log( _df );
		return _df;

	}//end _saveTrackList()


	
	function _loadTrackToPlayer( opt ){
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

			if( track["mp3"] ){
				var trackUrl = track["mp3"];
			}
			if( track["source_url"] ){
				var trackUrl = track["source_url"];
			}
			
		} else {
			webApp.vars["logMsg"] = "not found track by num: "+ numTrack;
console.log( "-- " + webApp.vars["logMsg"] );
			return false;
		}
		
		//$(_vars.$mediaplayer).attr("src", trackUrl );
		_vars.$mediaplayer.setAttribute("src", trackUrl );
		//document.querySelector("#block-player audio").setAttribute("src", trackUrl );

		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
	}//end _loadTrackToPlayer()
	
	

	function _nextTrack(){
//console.log( _vars["numTrack"], _vars["trackList"].length);
		if( _vars["numTrack"] < ( _vars["trackList"].length - 1) ){
			_vars["numTrack"]++;
			_setActiveTrack({
				num : _vars["numTrack"]
			});
			
		}
	}//end _nextTrack()
	
	
	function _prevTrack(){
		if( _vars["numTrack"] > 0){
			_vars["numTrack"]--;
			_setActiveTrack({
				num : _vars["numTrack"]
			});
		}
	}//end _prevTrack()
	

	function _setActiveTrack( opt ){
		var  p = {
			num : null, 
			autoplay: true
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
		var activeNum = parseInt( p.num );
//console.log(num, typeof num, isNaN(num) );
		if( isNaN( activeNum ) ){
webApp.vars["logMsg"] = "wrong activeNum: "+ activeNum;
console.log( "-- error, " + webApp.vars["logMsg"] );
			return false;
		}

		
		//load and play track by num
		var track = _vars["trackList"][ activeNum ];
		
		if( !track ){
console.log( "-- error, no track by activeNum = " + activeNum);
			return false;
		}
		
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
			
			if( track["mp3"] ){
				track_info = track["mp3"];
			}
			if( track["source_url"] ){
				track_info = track["source_url"];
			}
			
		}
		$("#track-info").text( track_info );
		

		if( track["mp3"] ){
			var mediaSrc = track["mp3"];
		}
		if( track["source_url"] ){
			var mediaSrc = track["source_url"];
		}
//console.log(mediaSrc );

		_vars.$audioplayer.pause();
		_vars.$videoplayer.pause();
		
		if( p.autoplay ){
			var _canPlay = _setMediaPlayer( mediaSrc );
			if( _canPlay){
				$(_vars.$mediaplayer).attr("src", mediaSrc);
				_vars.$mediaplayer.play();
			} else {
_vars["logMsg"] = "Cannot play media file "+ mediaSrc;
func.logAlert( _vars["logMsg"], "error" );
			}
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
				
		//$(_vars.$mediaplayer).attr("src", "");
		//_vars.$mediaplayer.pause();
		
		var numTrack = p.trackNum-1;
//console.log( numTrack, _vars["trackList"][numTrack] );
		
		//remove track
		delete _vars["trackList"][numTrack];
//console.log( _vars["trackList"] );
		
		//squeeze tracklist
		var arr = _vars.trackList.filter(function(obj) {
		  return typeof obj !== "undefined";
		});
		
		//reorder tracklist
		arr.forEach( function(item, n, arr) {
			item["number"] = n+1;
		});
//console.log( arr );

		_vars["unSavedTrackList"] = true;
		
//----------------------------
		_vars["trackList"] = arr;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		_setActiveTrack({
			num : _vars["numTrack"], 
			autoplay: false 
		});

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

		//$("#insert-track-form").attr("action", "?q=update-track");//change form action
		
		document.forms["form_insert_track"].elements["input_title"].value = _vars["trackList"][numTrack]["title"];
		document.forms["form_insert_track"].elements["input_artist"].value = _vars["trackList"][numTrack]["artist"];
		
		if( _vars["trackList"][numTrack]["mp3"] && _vars["trackList"][numTrack]["mp3"].length > 0){
			document.forms["form_insert_track"].elements["input_source_url"].value = _vars["trackList"][numTrack]["mp3"];
		}
		if( _vars["trackList"][numTrack]["source_url"] && _vars["trackList"][numTrack]["source_url"].length > 0){
			document.forms["form_insert_track"].elements["input_source_url"].value = _vars["trackList"][numTrack]["source_url"];
		}
		document.forms["form_insert_track"].elements["number"].value = _vars["trackList"][numTrack]["number"];
		
		webApp.app.toggleBlock( "#modal-insert-track" );
		
	}//end _editTrack()


	function _insertTrack( opt ){
		var p = {
			"title": false,
			"artist": false,
			"source_url": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
		//--------------------------------
		if( !p["title"]){
			p["title"] = webApp.fileManager.getFileName( p["source_url"], true );
		}
		if( !p["artist"]){
			p["artist"] = webApp.fileManager.getLastDirName( p["source_url"] );
		}
//console.log(p);

		var _trackFormat = _vars["trackFormat"];
		var _trackObj = {};
		for( var key in _trackFormat ){
			_trackObj[key] = "";
		}//next
		
		//write key:value to _track ( only matching  keys by "trackFormat" )
		var _track = p;
		for( var key in _trackObj ){
			_trackObj[key] = _track[key];
		}//next
//console.log( _track );
	
		_vars["trackList"].push( _trackObj );
		
		//----------------- add track order number 
		for( var n = 0; n < _vars["trackList"].length; n++){
			_vars["trackList"][n]["number"] = n+1;
		}//next
		
		_vars["unSavedTrackList"] = true;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( !$("#block-player").is(":visible") ){
			$("#block-player").show();
		}

		_vars["numTrack"] = _vars["trackList"].length-1;
		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
		webApp.app.toggleBlock( "#modal-insert-track" );
	}//end _insertTrack()


	function _updateTrack( opt ){
		var p = {
			"number": false,
			"title": false,
			"artist": false,
			"source_url": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
		//--------------------------------
		if( !p["title"]){
			p["title"] = webApp.fileManager.getFileName( p["source_url"], true );
		}
		if( !p["artist"]){
			p["artist"] = webApp.fileManager.getLastDirName( p["source_url"] );
		}
//console.log(p);

		var _trackFormat = _vars["trackFormat"];
		var _trackObj = {};
		for( var key in _trackFormat ){
			_trackObj[key] = "";
		}//next
		
		//write key:value to _track ( only matching  keys by "trackFormat" )
		var _track = p;
		for( var key in _trackObj ){
			_trackObj[key] = _track[key];
		}//next
//console.log( _track );

		var _num = _track.number - 1;
		_vars["trackList"][ _num ] = _trackObj;
		
		//----------------- update track order number 
		for( var n = 0; n < _vars["trackList"].length; n++){
			_vars["trackList"][n]["number"] = n+1;
		}//next
		
		_vars["unSavedTrackList"] = true;
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( !$("#block-player").is(":visible") ){
			$("#block-player").show();
		}

		_setActiveTrack({
			num : _vars["numTrack"]
		});
		
		//$("#insert-track-form").attr("action", "?q=insert-track");//restore form action
		webApp.app.toggleBlock( "#modal-insert-track" );
	}//end _updateTrack()



	function _testMediaSupport(){

		var _videoObj = document.createElement("video");
	//for(var key in _video){
		//if( typeof _video[key] === "function"){
	//console.log(key, _video[key]);
		//}
	//}
		if( typeof _videoObj === "object"){
			if( typeof _videoObj["load"] !== "function"){
	_vars["logMsg"] = "creating a object VIDEO failed.";
	func.logAlert(_vars["logMsg"], "error");
			} else {
				_vars["playVideo"] = true;
			}
		}
		
		var _audioObj = document.createElement("audio");
		if( typeof _audioObj === "object"){
			if( typeof _audioObj["load"] !== "function"){
	_vars["logMsg"] = "creating a object AUDIO failed.";
	func.logAlert(_vars["logMsg"], "error");
			} else {
				_vars["playAudio"] = true;
			}
		}
		
		if( _vars["playAudio"] ){
			__testTypeSupport( _audioObj );
		}
		
		if( _vars["playVideo"] ){
			__testTypeSupport( _videoObj );
		}
		
		function __testTypeSupport( mediaObj ){
//console.log( mediaObj );

			for(var n = 0; n < _vars["mediaTypes"].length; n++ ){
				
				var _testString = _vars["mediaTypes"][n]["testString"];
				var _ext = _vars["mediaTypes"][n]["extension"];
				var _name = "";
				if( _vars["mediaTypes"][n]["name"] ){
					_name = "(" + _vars["mediaTypes"][n]["name"] + ")";
				}
				
				var _mediaTypeString = mediaObj.tagName.toLowerCase(); // video or audio
				if( _testString.indexOf( _mediaTypeString ) !== -1){
					
					var _test = mediaObj.canPlayType( _testString );
//console.log( "test " + _mediaTypeString + " format: ", _test, _test.length, _testString);
					if( _test && _test.length > 0){
	_vars["logMsg"] = "test support media format <b>"+ _ext +", "+_name+"</b>, <i>"+ _testString +"</i>: " + _test;
	func.logAlert( _vars["logMsg"], "success");
						_vars["mediaTypes"][n]["support"] = true;
						//break;
					} else {
	_vars["logMsg"] = "not support media format <b>"+ _ext +", "+_name+"</b>, <i>" + _testString +"</i>";
	func.logAlert( _vars["logMsg"], "warning");
					}
					
				}
	
			}//next
		}//end __testTypeSupport()
		
	}//end testMediaSupport()


	function _setMediaPlayer( filePath ){
		var _canPlay = false;

		var _fileType = webApp.fileManager.getFileType( filePath );
//console.log( _fileType );	
		for( var n =0; n < _vars["mediaTypes"].length; n++){
			var _testString = _vars["mediaTypes"][n]["testString"];
			var _ext = _vars["mediaTypes"][n]["extension"];
			var _support = _vars["mediaTypes"][n]["support"];
			
			if( _fileType === _ext ){
				if( _support ){
					_canPlay = true;
//------------------------- choose media player: audio, video, or iframe-video
					if( _testString.indexOf("video") !== -1){
						_vars.$mediaplayer = _vars.$videoplayer;
					}
					if( _testString.indexOf("audio") !== -1){
						_vars.$mediaplayer = _vars.$audioplayer;
					}

					break;
				}
			}
			
		}//next

		return _canPlay;
	}//end _setMediaPlayer()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		
		formHtmlTrackList : _formHtmlTrackList,
		//loadTrackList: _loadTrackList,
		formTrackList: _formTrackList,
		//loadTrackToPlayer: _loadTrackToPlayer,
		//setActiveTrack: _setActiveTrack,
		//nextTrack: _nextTrack,
		//prevTrack: _prevTrack,
		//removeTrack: _removeTrack,
		//editTrack: _editTrack,
		urlManager:	_urlManager,
		testMediaSupport: _testMediaSupport
	};
}//end _player()