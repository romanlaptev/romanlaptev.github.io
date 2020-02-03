function _fileManager( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"testPHP_url": "api/test.php",
		"supportPHP": false//,
		//"testUrlASPX": "api/aspx/test.aspx",
	};

	var _init = function( opt ){
//console.log("init _fileManager");
		_phpSupport().then(
			function( res ){
//console.log( "-- THEN, promise resolve" );
//console.log(res);
			}, 
			function( error ){
//console.log( "-- THEN, promise reject, ", error );
				_noPHPSupport();
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
	
	function _getFileList(){
		
		var fsNames = {
			"folders" : [
{"name": "A","fs_path": "/mnt/d2/music/A"},
{"name": "E","fs_path": "/mnt/d2/music/E"}
			],
			"files": [
{"name": "log.txt", "url": "/music/log.txt"}
			]
		};
		
		var html_subfolders =  webApp.draw.wrapData({
			"data": fsNames["folders"],
			"templateID": "subfolders_listTpl",
			"templateListItemID": "subfolders_itemTpl"
		});
//console.log( html_subfolders );

		var html_files =  webApp.draw.wrapData({
			"data": fsNames["files"],
			"templateID": "files_listTpl",
			"templateListItemID": "files_itemTpl"
		});

		var html = webApp.draw.wrapData({
			"data": {
				"subfolders": html_subfolders,
				"files": html_files
			},
			"templateID": "fileList"
		});
		
//console.log( html );
		return html;
	}//end _getFileList()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
//console.log(arguments);
			return _init(); 
		},
		getFileList: _getFileList
	};
	
}//end _fileManager()