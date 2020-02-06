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
		"fsPath" : "",
		"GET" : {}
	};//end _vars

	var _init = function( opt ){
//console.log("init _fileManager", opt);
		
		_vars["fsPath"] = _vars["aliasLocation"];
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
					//_vars["rename_url"] = "api/rename.php";
					//_vars["remove_url"] = "api/remove.php";
					//_vars["mkdir_url"] = "api/mkdir.php";
					//_vars["save_pls_url"] = "api/save_pls.php"
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
console.log("-- data: ", data);

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
console.log("-- data: ", data);

				if( data["eventType"] && data["eventType"] === "error"){
_vars["logMsg"] = data["message"];
func.logAlert( _vars["logMsg"], "error");
					$d.reject( false );
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
console.log( "textStatus: ", textStatus );
console.log( "-- errorThrown: ", errorThrown );
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
for( var n = 0; n < data["files"].length; n++){
	var _file = data["files"][n];
	
	var startPos = _vars.fsPath.indexOf( _vars.alias );
	if( startPos !== -1){
		var urlPath = _vars.fsPath.substring( startPos, _vars.fsPath.length );
		_file["url"] = urlPath + "/" + _file["name"];
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
					"buttons_fs_action" : webApp.draw.vars.templates["buttonsFSaction"],
					"btn_change_level" : webApp.draw.vars.templates["btnChangeLevel"],
					"fs_path" : _vars["fsPath"],
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
			
			case "level-up":
				var upLink = _vars["fsPath"].substring( 0, _vars["fsPath"].lastIndexOf("/") );
//console.log(_vars["fsPath"]);
//console.log( upLink );

				_vars["fsPath"] = upLink;
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
			default:
console.log("-- fileManager.urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch

	}//end _urlManager()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(opt){ 
//console.log(arguments);
			return _init(opt); 
		},
		getFileList: _getFileList,
		formHtmlFileManager: _formHtmlFileManager,
		urlManager:	_urlManager
	};
	
}//end _fileManager()