function modulePlayer( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		
		"mediaTypes" : [
{ "extension" : "mp3", "testString" : 'audio/mpeg; codecs="mp3"', support: false },
{ "extension" : "3gp", "testString" : 'audio/3gpp', support: false},
{ "extension" : "flac", "testString" : 'audio/flac', support: false, name: "native FLAC format (FLAC in its own container)."},
{ "extension" : "ape", "testString" : 'audio/ape', support: false},
{ "extension" : "mka", "testString" : 'audio/x-matroska', support: false, name: "Matroska audio"},
{"extension" : "wav", "testString" : 'audio/wav; codecs=1', support: false },
{ "extension" : "ogg", "testString" : 'audio/ogg; codecs="vorbis"', support: false},
//{ "extension" : "au", "testString" : 'audio/basic', support: false},
//{"extension" : "wav", "testString" : 'audio/L24', support: false, name: "24bit Linear PCM format, at 8-48 kHz, 1-N channels"},
{ "extension" : "webm", "testString" : 'audio/webm', support: false, name: "WebM open media format."},
{ "extension" : "mp2,mpga,mpega", "testString" : 'audio/x-mpeg', support: false, name: "MPEG audio"},
{ "extension" : "mp4,mpg4", "testString" : 'audio/mp4; codecs="mp4a.40.5"', support: false, name: "MPEG-4 audio"},
{ "extension" : "m4a", "testString" : 'audio/x-m4a', support: false, name: "MPEG-4 audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wma', support: false, name: "Windows Media Audio"},
{ "extension" : "wma", "testString" : 'audio/x-ms-wax', support: false, name: "Windows Media Audio"},

//{ "extension" : "ogg", "testString" : 'video/ogg; codecs="theora, vorbis"', support: false},
{"extension" : "ogv", "testString" : 'video/ogg', support: false },
{"extension" : "mp4", "testString" : 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"', support: false , name: "MPEG-4, Advanced Video Coding"},
{"extension" : "mp4", "testString" : 'video/mp4; codecs="ac-3"', support: false, name: "MPEG-4, AC-3 audio" },
{"extension" : "mp4", "testString" : 'video/mp4; codecs="ac-4"', support: false, name: "MPEG-4, AC-4 audio" },
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
		"playAudio": false,
		"playlist" : {
			tracks:[
//{title:"test MP4", src: "/projects/test_code.git/js/test_media/video/video.mp4"},
//{title:"test WEBM", src: "/projects/test_code.git/js/test_media/video/2018-05-05-064753.webm"},
//{title:"test OGV", src: "/projects/test_code.git/js/test_media/video/small.ogv"}//,
//{title:"Anda Jaleo Jaleo", src: "http://www.youtube.com/embed/Td6lN_U7Ecs"}
//{title:"", src: ""}//,
			],
			lastNum:0
		},
		
	};//end _vars

	var _init = function( opt ){
console.log("init modulePlayer...");

		_testMediaSupport();
	
		_vars["player"] = func.getById("player1");
		_vars["player"].style.display = "none";

		_vars["iframePlayer"] = func.getById("iframe-player");
		_vars["iframePlayer"].style.display = "none";

		_vars.player.volume = 0.4;

//=====================
		//_vars["player"].onloadstart = function(e){
//console.log(e);	
			//func.logAlert( "event: " + e.type, "info");
		//}//end event

		//_vars["player"].onloadeddata = function(e) {
//console.log("onloadeddata", e);		
			//func.logAlert( "event: " + e.type, "info");
		//};//end event

		//_vars["player"].oncanplaythrough = function(e) {
//console.log("oncanplaythrough", e);		
			//func.logAlert( "event: " + e.type, "info");
		//};//end event
		
		_vars["player"].oncanplay = function(e) {
console.log("oncanplay", e);		
		};//end event

		//_vars["player"].onended = function(e) {
//console.log("onended", e);		
			////_nextTrack();
		//};//end event

//--------------------------
		_vars["player"].onplay = function(e) {
//console.log("onplay", e);		
			_vars.logMsg = "start playing <b>" + e.target.src+"</b>";
			func.logAlert( _vars.logMsg, "info");
			
			//add subtitles tracks
			var num = _vars["playlist"]["lastNum"];
			if( !_vars["playlist"]["tracks"][num] ){
	console.log( "-- no media track info...");
				return false;
			}
			
			_loadSubTitles({
				"mediaPlayer": _vars["player"],
				"mediaTrackInfo": _vars["playlist"]["tracks"][num]
			});
			
		};//end event


//--------------------------
		_vars["player"].onerror = function(e) {
console.log(e);
			var err = _vars["player"].error;
			if(err){
				webApp.vars["logMsg"] = "player error, <b>code:</b> : "+ err["code"];
				webApp.vars["logMsg"] += ", <b>message:</b> : "+ err["message"];
				webApp.vars["logMsg"] += ", <b>src:</b> : "+ _vars["player"].src;
				func.logAlert( webApp.vars["logMsg"], "error");
			}
		};//end event

		_vars["player"].textTracks.onaddtrack = function(e) {
console.log(e.type, e);	
			_vars.logMsg = "add subtitles track " + e.track.label+", "+e.track.language;
			//for(var key in e.track){
				//if( typeof(e.track[key]) !== "function"){
					//_vars.logMsg += ", ";
					//_vars.logMsg += "<b>"+key +"</b>:" + e.track[key];
				//}
			//}//next
			func.logAlert( _vars.logMsg, "info");
		};//end event
		
		_vars["player"].textTracks.onchange = function(e) {
console.log("onchange", e);		
		};//end event
		
		_vars["player"].textTracks.onremovetrack = function(e) {
console.log("onremovetrack", e);		
		};//end event

	};//end _init()



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

		if( _vars["playVideo"] ){
			__testTypeSupport( _videoObj );
		}
		
		if( _vars["playAudio"] ){
			__testTypeSupport( _audioObj );
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

	function _getMediaTypeInfo(filetype){
		for( var n = 0; n < _vars["mediaTypes"].length; n++){
			if( _vars["mediaTypes"][n]["extension"] === filetype ){
				return _vars["mediaTypes"][n];
			}
		}//next	
		return false;	
	}//end _getMediaTypeInfo()


	function _loadTrack(opt){
		var p = {
			"trackNum": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var num = p.trackNum;
//console.log(num, typeof num, isNaN(num) );
		if( isNaN(num) ){
_vars["logMsg"] = "not found track by num: "+ webApp.vars["GET"]["num"];
console.log( _vars["logMsg"] );
			return false;
		}
		var track = _vars["playlist"]["tracks"][num];
		if(!track){
_vars["logMsg"] = "not found track by num: "+ webApp.vars["GET"]["num"];
console.log( _vars["logMsg"] );
			return false;
		}				
				
		var videoSrc = track["src"];
				
		if( track["dataType"] === "embed-video" ){
			$(_vars["player"]).hide();
			$(_vars["iframePlayer"]).attr("src", videoSrc);
			$(_vars["iframePlayer"]).show();
		} else {
			$(_vars["iframePlayer"]).hide();
			$(_vars["player"]).attr("src", videoSrc);
			$(_vars["player"]).show();
		}
				
		_vars["playlist"]["lastNum"] = num;
				
		//var track_info = track["title"];
		//$("#track-info").text(track_info);
		_draw_setActiveTrack(num);
		
	}//end _loadTrack()


	function _addTrackPlayList(opt){
		var p = {
			"trackInfoNode": null, //node object
			"nodeNum": null,
			"linkNum": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		var _node = p["trackInfoNode"];
		var _link = _node["ul"][p.linkNum];
//console.log(_node);

		var _wrongDataType = true;
		if( _link["data-type"] === "local-file" ||
			_link["data-type"] === "embed-video" ||
			_link["data-type"] === "url-video" ||
			_link["data-type"] === "youtube"
		){
			_wrongDataType = false;
		}
		
		if( _wrongDataType ){
_vars["logMsg"] = "incorrect media type <b>"+ _link["data-type"] +"</b>, not added to playlist...";
func.logAlert( _vars["logMsg"], "warning");
			return false;
		}
		
		var _trackTitle = "";
		for(var n = 0; n < _node["title"].length; n++){
			if(n > 0) {
				_trackTitle += ", ";
			}
			//_trackTitle += _node["title"][n]["text"];
			_trackTitle += _link.text;
		}//next
		
		var _trackSrc = _link["href"];
		
		var _trackObj = {
			"title": _trackTitle,
			"src": _trackSrc,
			"dataType": _link["data-type"]
		};
//Попытка нарушения системы безопасности: 
//содержимое «http://i5/projects/webapp_video/app2.html» не имеет права загружать данные из 
//file:///mnt/terra/video/films/I/Idiocracy/Idiocracy.ENG.vtt.
//https://stackoverflow.com/questions/35073290/cannot-catch-chromes-cannot-load-local-resource-error-in-try-catch-block

		// add subtitles, sub-track data-type
		var _subTitles = [];
		for(var n = 0; n < _node["ul"].length; n++){
			if( _node["ul"][n]["data-type"] === "sub-track"){
				var sub = _node["ul"][n];
				
				if( sub.href.indexOf(".vtt") === -1){
_vars.logMsg = "warning, incorrect subtitle format, must be VTT...";
console.log(_vars.logMsg, e);	
func.logAlert( _vars.logMsg, "warning");
				}
				
				var _subTrack = {
					"kind": "subtitles",
					"label": sub.text,
					"srclang": sub["data-srclang"],
					"src": sub.href
				};
				_subTitles.push( _subTrack );
			}
		}//next
		_trackObj["subtitles"] = _subTitles;
		
		_vars["playlist"]["tracks"].push(_trackObj);
		
		//refresh block-playlist
		var _block = webApp.vars["blocks"][0];
		_block["buildBlock"]();

_vars.logMsg = "add track to playlist, title:<b>"+_trackTitle+"</b>, type: <b>"+_link["data-type"]+"</b>";
console.log(_vars.logMsg);	
func.logAlert( _vars.logMsg, "info");
		
	}//end _addTrackPlayList()

	
	function _loadPlayList(opt){
		var p = {
			"playListUrl": false,
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["playListUrl"] ){
_vars["logMsg"] = "error, incorrect URL... ";
func.logAlert(_vars["logMsg"], "error");
console.log( _vars["logMsg"] );
			return false;
		}
		var url = p["playListUrl"];

		if( webApp["vars"]["waitWindow"] ){
			webApp["vars"]["waitWindow"].style.display="block";
		}

		func.runAjax( {
			"requestMethod" : "GET", 
			"url" : url, 
			
			"onProgress" : function( e ){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

				_vars["totalBytes"] = e.total;
				_vars["totalMBytes"] = (( e.total / 1024) / 1024).toFixed(2);
				_vars["loaded"] = e.loaded;

			},//end callback function
			
			"onError" : function( xhr ){
//console.log( "onError ", xhr);
_vars["logMsg"] = "error, not load " + url;
func.logAlert(_vars["logMsg"], "error");
console.log( _vars["logMsg"] );
			},//end callback function
			
			"onLoadEnd" : function( headers ){
//console.log( "onLoadEnd ", headers);
_vars["logMsg"] = "load bytes: " + _vars["totalBytes"]+", Mbytes: " + _vars["totalMBytes"];
func.logAlert(_vars["logMsg"], "info");

//_vars["logMsg"] = "e.loaded: " + _vars["loaded"];
//console.log(_vars["logMsg"]);
			},//end callback function
			
			"callback": function( data, runtime ){
//console.log(data.length, typeof data, data );
_vars["logMsg"] = "load <b>" + url  +"</b>, runtime: "+ runtime +" sec";
func.logAlert(_vars["logMsg"], "info");
//console.log( _vars["logMsg"] );
// //console.log( data );
// //for( var key in data){
// //console.log(key +" : "+data[key]);
// //}

//---------------convert string to format object
				if( typeof data === "string"){
					if( p.format === "xml"){
						var parser = new DOMParser();
						try {
							var xml = parser.parseFromString( data, "text/xml" );
							_updatePlayList({
								"format" : "XML",
								"data": xml
							});
						} catch (e) {
_vars["logMsg"] = "XML parsing error: ";
for( var item in e ){
	_vars["logMsg"] += item + ": " + e[item] + "<br>";
}
func.logAlert(_vars["logMsg"], "danger");
console.log (_vars["logMsg"], e);
						};//end try
					}
				}
//--------------------				
				if( typeof data === "object"){
					if( p.format === "xml"){
						
						_updatePlayList({
							"format" : "XML",
							"data": data
						});
					
						delete xmlData;
						delete xmlObj;
					}
				}

				if( typeof p.callback === "function"){
					p.callback(data);
				}

				//clear block window
//setTimeout(function(){
				if( webApp["vars"]["waitWindow"] ){
					webApp["vars"]["waitWindow"].style.display="none";
				}		
//}, 1000*3);
				
			}//end callback()
		});
		
		
	}//end _loadPlayList()


	function _updatePlayList(opt){
		var p = {
			"format": false,
			"data": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] ){
_vars["logMsg"] = "error, empty playlist data... ";
func.logAlert(_vars["logMsg"], "error");
//console.log( _vars["logMsg"] );
			return false;
		}

		if( !p["format"] ){
_vars["logMsg"] = "error, empty playlist format... ";
func.logAlert(_vars["logMsg"], "error");
//console.log( _vars["logMsg"] );
			return false;
		}

		switch( p["format"] ) {

			case "XML":
			
//rewrite this code!!!!!!!!!
				var xmlObj = func.convertXmlToObj(p.data);
//console.log(xmlObj);
				var _trackListXml = xmlObj["playlist"]["childNodes"]["trackList"][0]["childNodes"]["track"];
				
				//convert xml object to js object (level 1...)
				var _trackList = [];
				_trackList = _convertNodeList({
					"nodesListXml": _trackListXml
				})
				
function _convertNodeList(opt){
	var p = {
		"nodesListXml": false
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	var _nodesListObj = [];
	
	for( var n = 0; n < p.nodesListXml.length; n++){
		var _xmlObj = p.nodesListXml[n]["childNodes"];

		var nodeObj = {};
		for( var key in _xmlObj){
			if( _xmlObj[key][0]["text"] ){
				nodeObj[key] = _xmlObj[key][0]["text"];
			}

//if( key === "track"){
//console.log("test:", _xmlObj[key].length);
//}
/*
			var node_attr = _xmlObj[key][0]["attributes"];
			for( var attr in node_attr){
				if( !nodeObj[key] ){
					nodeObj[key] = {};
				}
				nodeObj[key][attr] = node_attr[attr];
			}//next
*/

var _key = key;
for( var n2 = 0; n2 < _xmlObj[key].length; n2++){
			var node_attr = _xmlObj[key][n2]["attributes"];
			for( var attr in node_attr){
				
				if( _xmlObj[key].length > 1){
					var _key = key+"-"+n2;
				}
				
				if( !nodeObj[_key] ){
					nodeObj[_key] = {};
				}
				nodeObj[_key][attr] = node_attr[attr];
			}//next
}//next						


			if( _xmlObj[key][0]["childNodes"] ){
				childNodesObj = _convertNodeList({
					"nodesListXml": _xmlObj[key]
				});
				//nodeObj[key] = [];
				//nodeObj[key].push(childNodesObj);
				nodeObj[key] = childNodesObj;
			}

		}//next

		_nodesListObj.push( nodeObj );
	}//next
	
	return _nodesListObj;
}//end
//console.log(_trackList);

				//update _vars["playlist"]["tracks"] from  _trackList
				for( var n = 0; n < _trackList.length; n++){
					
					var _trackTitle = _trackList[n]["location"];
					if( _trackList[n]["title"] && 
						_trackList[n]["title"].length > 0
					){
						_trackTitle = _trackList[n]["title"];
					}
					
					var _trackObj = {
						"title": _trackTitle,
						"src": _trackList[n]["location"]
					};
					
					// add subtitles
					if( _trackList[n]["subtitles"]){
						var subsObj = _trackList[n]["subtitles"][0];
						var _subTitles = [];
						for( var _subTrack in subsObj){
							_subTitles.push( subsObj[_subTrack] );
						}//next
						_trackObj["subtitles"] = _subTitles;
					}
					
					_vars["playlist"]["tracks"].push(_trackObj);
				}//next
//end, rewrite this code!!!!!!!!!
				
				//refresh block-playlist
				var _block = webApp.vars["blocks"][0];
				_block["buildBlock"]();
_vars["logMsg"] = "load playlist... ";
func.logAlert(_vars["logMsg"], "info");

			break;
			
//--------------------------------------------
			default:
console.log("function _updatePlayList()", p);			
_vars["logMsg"] = "error, wrong playlist format... ";
func.logAlert(_vars["logMsg"], "error");
			break;
		}//end switch


	}//end _updatePlayList()


	function _nextTrack(){
		$(_vars["iframePlayer"]).attr("src", "");
		$(_vars["player"]).attr("src", "");
		
/*		
//console.log( _vars["numTrack"], _vars["trackList"].length);
		if( _vars["numTrack"] < ( _vars["trackList"].length - 1) ){
			_vars["numTrack"]++;
			_setActiveTrack({
				num : _vars["numTrack"]
			});
			
		}
*/ 
	}//end _nextTrack()



	function _playTrack(){
		//if( !$(_vars["player"]).attr("src")){
		if( !_vars["player"].getAttribute("src")){
console.log( "-- no media track url...");
			return false;
		}
		
		//add subtitles tracks
		var num = _vars["playlist"]["lastNum"];
		if( !_vars["playlist"]["tracks"][num] ){
console.log( "-- no media track info...");
			return false;
		}
		
		_loadSubTitles({
			"mediaPlayer": _vars["player"],
			"mediaTrackInfo": _vars["playlist"]["tracks"][num]
		});
		
		//try{
			_vars["player"].play();
		//} catch(e){
console.log(e);			
		//}
		
	}//end _playTrack()
	

	function _loadSubTitles(opt){
		var p = {
			"mediaPlayer": _vars["player"],
			"mediaTrackInfo": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
	//console.log(p);

		if(!p["mediaTrackInfo"]){
	console.log( "error, no media track info...");
			return false;
		}				

		var _trackInfo = p["mediaTrackInfo"];
		var _player = p["mediaPlayer"];

		//remove old text tracks
		var textTracks = _player.querySelectorAll("track[kind='subtitles']");
		for( var n = 0; n < textTracks.length; n++){
			var ch = textTracks[n];
			_player.removeChild( ch );
		}//next
		
		//add subtitles tracks
		if( _trackInfo.subtitles && 
			_trackInfo.subtitles.length > 0
		){
			for( var n = 0; n < _trackInfo.subtitles.length; n++){
				var sub = _trackInfo.subtitles[n];
					
				textTrack = document.createElement("track");
				textTrack.kind = "subtitles";
				textTrack.label = sub.label;
				textTrack.srclang = sub.srclang;

				if( sub.src.indexOf(".vtt") === -1){
	_vars.logMsg = "warning, incorrect subtitle format, must be VTT...";
	console.log(_vars.logMsg, e);	
	func.logAlert( _vars.logMsg, "warning");
				}
				textTrack.src = sub.src;

				_player.appendChild(textTrack);
				
			}//next
console.log( _player.textTracks );
_vars.logMsg = "num subtitles track: " + _player.textTracks.length;
//func.logAlert( _vars.logMsg, "info");
console.log(_vars.logMsg);	

			//select subtitles track
			_player.textTracks[0].mode = "showing";
		}
		
	}//end _loadSubTitles

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		testMediaSupport: _testMediaSupport,
		getMediaTypeInfo: _getMediaTypeInfo,
		loadTrack: _loadTrack,
		addTrackPlayList: _addTrackPlayList,
		loadPlayList: _loadPlayList,
		playTrack: _playTrack,
		nextTrack: _nextTrack
	};
	
}//end modulePlayer()
