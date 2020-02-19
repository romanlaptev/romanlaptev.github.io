function _fileManager( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"testPHP_url": "api/test.php",
		"supportPHP": false,
		//"testUrlASPX": "api/aspx/test.aspx",
		
		"alias" : "/music",
		"aliasLocation" : "/home/www/music",
		//"aliasLocation" : "d:/temp/music",
		//"aliasLocation" : "./",
		"fsPath" : ""
	};//end _vars

	var _init = function( opt ){
//console.log("init _fileManager", opt);
		
		_vars["fsPath"] = _vars["aliasLocation"];
		_vars["urlPath"] = _vars["alias"];
//-----------------
//var parseUrl = window.location.search; 
//if( parseUrl.length > 0 ){
	//_vars["GET"] = func.parseGetParams(); 
//}

//-----------------
		_phpSupport().then(
			function( res ){
//console.log( "-- THEN, promise resolve" );
//console.log(res);
					_vars["fileListUrl"] = "api/filelist.php"
					//_vars["copy_url"] = "api/copy.php";
					_vars["renameUrl"] = "api/rename.php";
					_vars["removeUrl"] = "api/remove.php";
					//_vars["mkdir_url"] = "api/mkdir.php";
					_vars["saveTrackListUrl"] = "api/save_pls.php"
					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]();
					}
					return false;
			}, 
			function( error ){
//console.log( "-- THEN, promise reject, ", error );
				_noPHPSupport();
				if( typeof opt["postFunc"] === "function"){
					opt["postFunc"]();
				}
				return false;
			}
		);
	};//end _init()

	
	//check PHP support
	function _phpSupport( callback ){
		return new Promise( function(resolve, reject) {

			$.ajax({
				type: "GET",
				//dataType: "text",
				dataType: "json",
				url: _vars["testPHP_url"],
				success: function(data, status){
//console.log("-- status: " + status);
//console.log("-- data: ", data);

					if (data["testResult"] === 4 ){
						_vars["supportPHP"] = true;
						_vars.logMsg = status +", PHP script language supported by server, version " + data["version"];
						func.logAlert( _vars.logMsg, "success");
					} else {
						_noPHPSupport();
					}
					
					resolve();
				},
				
				error:function (XMLHttpRequest, textStatus, errorThrown) {
	//console.log( "XMLHttpRequest: ", XMLHttpRequest );
	//console.log( "textStatus: ", textStatus );
console.log( "-- errorThrown: ", errorThrown );
					_vars["supportPHP"] = false;
					reject();
				}
			});
		
		});//end promise
	}// end _phpSupport()

	function _noPHPSupport(){
		webApp.vars["use_file_manager"]	= false;
		_vars.logMsg = "PHP script language NOT supported by server.";
		func.logAlert( _vars.logMsg, "error");
	}//end
	
	
	
	
	function _getFileList(opt){
		
		var $d = $.Deferred();
//console.log( $d );

		var p = {
			"dirName" : false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( p.dirName.length === 0){
_vars["logMsg"] = "-- warning, root level ...";
console.log( _vars["logMsg"] );
console.log(p);
			p.dirName = "/";
		}

		if( !p.dirName){
_vars["logMsg"] = "-- error, incorrect input parameters....";
console.log( _vars["logMsg"] );
console.log(p);
			$d.reject( false );
		}
		
		$.ajax({
			type: "GET",
			dataType: "json",
			url: _vars["fileListUrl"],
			data: ({dir: p.dirName}),
			success: function(data, status){
//console.log("-- status: " + status);
//console.log("-- data: ", data);

				if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
					$d.reject( false );
				}
				
				if( data["eventType"] && data["eventType"] === "warning"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "warning");
					data["files"] =[{}];
				}

				if( data["subfolders"] || data["files"]){
					var html = __formHtml( data );
//console.log( html );
					$d.resolve( html );
				} else {
					$d.reject( false );
				}
				
			},
			
			error:function (XMLHttpRequest, textStatus, errorThrown) {
//console.log( "XMLHttpRequest: ", XMLHttpRequest );
console.log( "textStatus: " +  textStatus );
console.log( "-- errorThrown: " + errorThrown );

_vars["logMsg"] = "server request error....";
_vars["logMsg"] += ", <b>textStatus</b>: " + textStatus;
_vars["logMsg"] += ", <b>errorThrown</b>: " + errorThrown;
func.logAlert( _vars["logMsg"], "error");

				$d.reject( false );
			}
		});
		return $d;
		
		function __formHtml( data ){
			// var data = {
				// "subfolders" : [
	// {"name": "A","fs_path": "/mnt/d2/music/A"},
	// {"name": "E","fs_path": "/mnt/d2/music/E"}
				// ],
				// "files": [
	// {"name": "log.txt", "url": "/music/log.txt"}
				// ]
			// };

			var html_subfolders = "";
			if( data["subfolders"] ){
				html_subfolders =  webApp.draw.wrapData({
					"data": data["subfolders"],
					"templateID": "subfolders_listTpl",
					"templateListItemID": "subfolders_itemTpl"
				});
			}
//console.log( html_subfolders );

			var html_files = "";
			if( data["files"] ){
//----------------------- create url path
_vars["urlPath"] = _getUrlPath( _vars.fsPath );
for( var n = 0; n < data["files"].length; n++){
	var _file = data["files"][n];
	
	if( _vars["urlPath"] ){
		_file["url"] = _vars["urlPath"] + "/" + _file["name"];
	} else {
		_file["url"] = "#";
		_file["template"] = "files_itemTpl_block";
	}
	
}//next
//-----------------------

				html_files =  webApp.draw.wrapData({
					"data": data["files"],
					"templateID": "files_listTpl",
					"templateListItemID": "files_itemTpl"
				});
			}

			var html = webApp.draw.wrapData({
				"data": {
					"subfolders": html_subfolders,
					"files": html_files
				},
				"templateID": "fileList"
			});
			
//console.log( html );
			return html;
		}//end __formHtml()
		
	}//end _getFileList()
	
	
	function _formHtmlFileManager(opt){

		_getFileList({
			"dirName" : _vars["fsPath"]
		}).then(
			
			function( htmlFilelist ){
//console.log( "-- THEN, promise resolved", html );

				_dataObj = {
					"location" : _vars["aliasLocation"],
					"buttons_fs_action" : webApp.draw.vars.templates["buttonsFSaction"],
					"btn_change_level" : webApp.draw.vars.templates["btnChangeLevel"],
					"fs_path" : _vars["fsPath"],
					"url_path" : _getUrlPath( _vars.fsPath ),
					"filelist" : htmlFilelist
				};
				//----------- hide change level button on FS root level
				if( _vars["fsPath"].length === 0){
					delete _dataObj["btn_change_level"];
					_dataObj["fs_path"] = "/";
				}
				
				var html = webApp.draw.wrapData({
					"data": _dataObj, 
					"templateID": "contentFileManager"
				});
//console.log( html );

				if( typeof opt["postFunc"] === "function"){
					opt["postFunc"]( html );
				}
			}, 
			
			function(res){
console.log( "-- THEN, promise rejected", res );

				//correct fs path after unread directory (/opt)
				var upLink = _vars["fsPath"].substring( 0, _vars["fsPath"].lastIndexOf("/") );
//console.log(_vars["fsPath"]);
//console.log( upLink );
				_vars["fsPath"] = upLink;

					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]( res );
					}
			}
			
		);//end then

	}//_formHtmlFileManager()

	
	
	function _urlManager( url ){
//console.log(url);
		_vars["GET"] = func.parseGetParams( url );
		switch( _vars["GET"]["q"] ) {
			
//--------------------------------------------
			case "get-folder":
				_vars["fsPath"] = _vars["fsPath"] + "/" +_vars["GET"]["foldername"];
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						}
					}
				});
			break;
			
//--------------------------------------------
			case "level-up":
				var upLink = _vars["fsPath"].substring( 0, _vars["fsPath"].lastIndexOf("/") );
//console.log(_vars["fsPath"]);
//console.log( upLink );

				_vars["fsPath"] = upLink;
				
				//change url path
				_vars["urlPath"] = _getUrlPath( _vars.fsPath );
				
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						}
					}
				});
			break;
			
//--------------------------------------------
			case "define-location":
				var fsLocation = $("#input-location-path").val();
//console.log( fsLocation);
				if( !fsLocation || fsLocation.length === 0){
					return false;
				}

				//save old values
				_alias_loc = _vars["aliasLocation"];
				_fs_path = _vars["fsPath"];
				
				//get new values
				_vars["aliasLocation"] = fsLocation.trim();
				_vars["fsPath"] = _vars["aliasLocation"];
				
				_formHtmlFileManager({
					"postFunc" : function(html){
//console.log( html );
						if( html && html.length > 0){
							webApp.vars["blocksByName"]["blockFM"].content = html;
							webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
						} else {
							//restore old values if access to the folder fails
							_vars["aliasLocation"] = _alias_loc;
							_vars["fsPath"] = _fs_path;
						}
						
					}
				});
				
			break;
			
//--------------------------------------------
			case "check-all":
				$("#block-file-manager").find(".wfm input[type=checkbox]").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", true);
				});				
			break;
			
			case "clear-all":
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", false);
				});				
			break;
			
//--------------------------------------------
			case "delete-file":
				var checkedFiles = [];
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					checkedFiles.push( $(item).val() );
				});
				
				_deleteFile({
					"fsPath": _vars["fsPath"],
					"files": checkedFiles
				})
				.then(
					function( data ){
//console.log( "-- THEN, promise resolve" );
//console.log(data);
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
//console.log(arguments);					
					}
				);

			break;
			
//-------------------------------------------- rename, move FIRST selected file
			case "rename-file":
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					if( num === 0){
						var _oldName = _vars["fsPath"] + "/"+ $(item).val();

						_renameFile({
							"fsPath": _vars["fsPath"],
							"oldName": _oldName,
							"newName": _inputNewFileName( _oldName )
						})
						.then(
							function( data ){
		console.log( "-- THEN, promise resolve" );
		//console.log(data);
							},
							function( error ){
		console.log( "-- THEN, promise reject, ", error );
		//console.log(arguments);					
							}
						);
						
					} else {
						$(item).prop("checked", false);
					}
				});
			
			break;
			
//--------------------------------------------
			case "add-track":
				var checkedFiles = [];
				//$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
				$("#block-file-manager").find(".files-list :checkbox:checked").each( function(num, item){
//console.log(num, item);
					var _fileName = $(item).val();
					if( _vars["urlPath"] ){
						
						if( _checkMediaType(_fileName) ){
							var _fileObj = {
								"artist" : _getLastDirName( _vars["urlPath"] ),
								"title" : _fileName,
								"source_url" : _vars["urlPath"] + "/"+ _fileName
							}
							checkedFiles.push( _fileObj );
							
						} else {
_vars["logMsg"] = "- warning, could not add file "+ _fileName +" to tracklist, incorrect media type...."
//func.logAlert( _vars["logMsg"], "warning" );
console.log( _vars["logMsg"] );
							
						}
						
					} else {
_vars["logMsg"] = "- warning, could not add file "+ _fileName +" to tracklist, incorrect web-alias...."
//func.logAlert( _vars["logMsg"], "warning" );
console.log( _vars["logMsg"] );
					}
				});//next
				
				//clear checked checkboxes
				$("#block-file-manager").find(".wfm :checkbox:checked").each( function(num, item){
//console.log(num, item);
					$(item).prop("checked", false);
				});				
				
				if( checkedFiles.length > 0){
					_addTrackToTrackList({
						"fileList" : checkedFiles
					});
				} else {
_vars["logMsg"] = "- warning, could not add selected files  to tracklist...."
func.logAlert( _vars["logMsg"], "warning" );
				}
				
			break;
			
//--------------------------------------------
			default:
console.log("-- fileManager.urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch

	}//end _urlManager()
	

	//change url path
	function _getUrlPath( fsPath ){
		var startPos = fsPath.indexOf( _vars.alias );
		if( startPos !== -1){
			var urlPath = fsPath.substring( startPos, fsPath.length );
//console.log(urlPath);
			return urlPath;
		} else {
			return false;
		}
	}//end


	function _inputNewFileName( oldName ){
		var _newFileName = window.prompt("rename/move file, enter new path/name:", oldName );
		// if( _newFileName && _newFileName.length > 0 ){
		// }
		return _newFileName;
	}//end _inputNewFileName()

//==================== delete file(s), directory(ies)
	function _deleteFile(opt){
		var p = {
			"fsPath": false,
			"files": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["fsPath"] || p["fsPath"].length === 0){
_vars["logMsg"] = "error, incorrect parameter fsPath...";
console.log( _vars.logMsg);
			return false;
		}
		
		if( !p["files"] || p["files"].length === 0){
_vars["logMsg"] = "error, wrong parameter files...";
console.log( _vars.logMsg);
			return false;
		}
		
		var _param = {
			fs_path: p["fsPath"], 
			file: p["files"]
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["removeUrl"],
				dataType: "json",
				data: _param, 
				
//				beforeSend: function(){
//console.log("beforeSend:", arguments);					
					//return false; //cancel
//				},
				
				success: function( data,textStatus ){
//console.log( data );

					if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
						reject( false );
					}

					if( data["eventType"] && data["eventType"] === "success"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "success");
						_formHtmlFileManager({
							"postFunc" : function(html){
		//console.log( html );
								if( html && html.length > 0){
									webApp.vars["blocksByName"]["blockFM"].content = html;
									webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
								}
							}
						});

						resolve(data);
					}
					
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

	}//end _deleteFile()


//=============================== rename files
	function _renameFile(opt){
		var p = {
			"oldName": false, 
			"newName": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);

		if( !p["oldName"] || p["oldName"].length === 0){
_vars["logMsg"] = "error, incorrect parameter oldName...";
console.log( _vars.logMsg);
			return false;
		}
		
		if( !p["newName"] || p["newName"].length === 0){
_vars["logMsg"] = "error, wrong parameter newName...";
console.log( _vars.logMsg);
			return false;
		}
		
		var _param = {
			"old_name": p.oldName, 
			"new_name": p.newName
		};

		var _df =  new Promise( function(resolve, reject) {
//console.log(resolve, reject);

			$.ajax({
				type: "POST",
				url: webApp.fileManager.vars["renameUrl"],
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
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "success");
						_formHtmlFileManager({
							"postFunc" : function(html){
		//console.log( html );
								if( html && html.length > 0){
									webApp.vars["blocksByName"]["blockFM"].content = html;
									webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockFM"] );
								}
							}
						});

						resolve(data);
					}
					
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

	}//end _renameFile()


//=============================== add track to playlist
	function _addTrackToTrackList( opt ){
		var p = {
			"fileList": false
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["fileList"] || p["fileList"].length === 0){
_vars["logMsg"] = "error, incorrect parameter fileList...";
console.log( _vars.logMsg);
			return false;
		}

		var _trackFormat = webApp.player.vars["trackFormat"];
		var _trackList = [];
		
		for( var n = 0; n < p.fileList.length; n++){
			
			var _trackObj = {};
			for( var key in _trackFormat ){
				_trackObj[key] = "";
			}//next
//console.log( _trackObj );
			
			//write key:value to _fileObj ( only matching  keys by "trackFormat" )
			var _fileObj = p.fileList[n];
			for( var key in _trackObj ){
				_trackObj[key] = _fileObj[key];
			}//next
//console.log( _fileObj );
			
			_trackList.push( _trackObj );
		}//next
		
//console.log( _trackList );
		webApp.player.formTrackList( _trackList );
		
	}//end _addTrackToTrackList()
	

	function _checkMediaType(_fileName){
		var checkRes = false;

		for( var _type in webApp.player.vars["mediaTypes"] ){
			var testType = webApp.player.vars["mediaTypes"][_type]["extension"];
			
			var testFileName = _fileName.toLowerCase();
			if( testFileName.lastIndexOf( testType) > 0 ){
				var checkRes = true;
				return checkRes;
			}
			
		}//next
		
		return checkRes;
	}//end _checkMediaType()

	function _getLastDirName( fsPath ){
		
		// var pos1 = fsPath.lastIndexOf("/")+1;
		// var pos2 = fsPath.length;
		// var _dirName = fsPath.substring( pos1, pos2 );
		
		// var _fsPath2 = fsPath.substring( 0, pos1-1 );
		// var pos1 = _fsPath2.lastIndexOf("/")+1;
		// var pos2 = _fsPath2.length;
		// var _prevDirName = _fsPath2.substring( pos1, pos2 );
		
		var _fsPath = fsPath.split("/");
		
		var n1 = _fsPath.length-1;
		var n2 = _fsPath.length-2;
		
		var _dirName = _fsPath[ n1 ];
		var _prevDirName = _fsPath[ n2 ];
		
		return _prevDirName +", "+ _dirName;
	}//end _getLastDirName()


	function _getFileType( fsPath ){
		var _fsPath = fsPath.split("/");
		
		var n1 = _fsPath.length-1;
		
		var _fileName = _fsPath[ n1 ];
		var _file = _fileName.split(".");
		var _fileType = _file[1];
		
		return _fileType;
	}//end _getFileType()


	// public interfaces
	return{
		vars : _vars,
		init:	function(opt){ 
//console.log(arguments);
			return _init(opt); 
		},
		getFileList: _getFileList,
		formHtmlFileManager: _formHtmlFileManager,
		urlManager:	_urlManager,
		getUrlPath: _getUrlPath,
		getFileType: _getFileType
	};
	
}//end _fileManager()