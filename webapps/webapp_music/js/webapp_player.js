function _player( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"trackListName": "new_tracklist.json*",
		"trackListTitle": "",
		"trackList":  [
// {"title" : "Hit The Lights", "mp3" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "The Four Horsemen","artist" : "Metallica","mp3" : "/music/M/Metallica/1983_Kill_em_All/02_The_Four_Horsemen.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"mp3" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
		"numTrack": 0,
		"autoplay" : true//,
		//"unSavedTrackList": false
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

//insert-track
			//case "stop-play":
			//break;

			case "load-track":
				_loadTrack({
					"trackNum": _vars["GET"]["num"]
				});
			break;

			case "prev-track":
				_prevTrack();
			break;
			
			case "next-track":
				_nextTrack();
			break;
			

			//case "check-all":
				//_draw_checkAll();
			//break;
			
			//case "clear-all":
				//_draw_clearAll();
			//break;
			
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
	webApp.vars["logMsg"] = "getJSON done";
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
		_setActiveTrack( _vars["numTrack"] );
		
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

		var _param = {
			"filename": p["trackListFsPath"], 
			"playlist": _vars["trackList"]
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["saveTrackListUrl"],
				//dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
//console.log( arguments );
/*	
					//$("#log").html( textStatus );
					$("#log").append( data );

					var dirname = $(".files .dirname").text();
					var files_panel = ".right-panel";
					get_filelist( vars["filelist_url"], dirname, files_panel, true );
*/			
					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}
/*
				if( data["subfolders"] || data["files"]){
					var html = __formHtml( data );
//console.log( html );
					$d.resolve( html );
				} else {
					$d.reject( false );
				}
*/
webApp.vars["logMsg"] = "ajax server query done";
webApp.vars["logMsg"] += ",  "+textStatus +" save track list file <b>"+ p["trackListFsPath"] +"</b>";
func.logAlert( webApp.vars["logMsg"], "success");

					resolve();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
	/*
					var msg = "<p class='alert alert-error'>";
					msg += "<b>url:</b> " + vars["save_pls_url"] +", ";
					msg += "<b>textStatus:</b> " + textStatus +", ";
					msg += "<b>errorThrown</b>: " + errorThrown;
					msg += "</p>";
					$("#log").append( msg );
*/					
					reject( false);
				}
			});//end ajax query

		});//end promise
		
//console.log( _df );
		return _df;

	}//end _saveTrackList()


	
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
//console.log( _vars["numTrack"], _vars["trackList"].length);
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
//console.log( _vars.$audioplayer.getAttribute("src") );
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
		
		//_setActiveTrack( _vars["numTrack"] );
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
		
		formHtmlTrackList : _formHtmlTrackList,
		//loadTrackList: _loadTrackList,
		//formTrackList: _formTrackList,
		//loadTrack: _loadTrack,
		//setActiveTrack: _setActiveTrack,
		//nextTrack: _nextTrack,
		//prevTrack: _prevTrack,
		//removeTrack: _removeTrack,
		//editTrack: _editTrack,
		urlManager:	_urlManager
	};
}//end _player()