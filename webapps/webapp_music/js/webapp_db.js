function _db( opt ){
//console.log(arguments);	

	// // private variables and functions
	var _vars = {
		// "indexedDBsupport" : window.indexedDB ? true : false,
		// "webSQLsupport" : window.openDatabase  ? true : false,
		// "localStorageSupport" : window['localStorage']  ? true : false,
		// // "dataStoreType" : _detectDataStore(),
		// // "tables": {}
		"dataUrl" : "db/export_music.xml",
		"dbType" : "xml",
		//"db_type" : "json",
		"dbName": "music",
			
		"tagNameNodes": "node",
		"tagName": "tag",
		"tagListName": "tag_list",
		"tagGroupsName": "tag_groups",
		
//		"numRecordsPerPage":10,
//		"sortOrder": "asc",
//		"sortByKey": "title", //"published", 
//		"queryRes": []
	};

	var _init = function( opt ){
console.log("_db: ", _vars);
// console.log( "indexedDBsupport: " + _vars["indexedDBsupport"] );			
// console.log( "webSQLsupport: " + _vars["webSQLsupport"] );			
// console.log( "localStorageSupport: " + _vars["localStorageSupport"] );			
// console.log( "Data store type: " + _vars["dataStoreType"] );			
/*
		if( webApp.vars["support"]["indexedDBsupport"]){
			indexedDatabase = iDBmodule();
//console.log("indexedDatabase module:", indexedDatabase);
		}
		if( webApp.vars["support"]["webSQLsupport"]){
			webSqlDb = webSQLmodule();
//console.log("webSQLmodule:", webSqlDb);
		}
*/
		//storage.init();// _init_cache
	};//end _init()

	function _detectDataStore(){
//console.log(arguments);		
//console.log( this );		
		var dataStoreType = false;
		if( window['localStorage']  ? true : false ){
			dataStoreType = "localStorage";
		}
		if( window.openDatabase  ? true : false ){
			dataStoreType = "webSQL";
		}
		if( window.indexedDB ? true : false ){
			dataStoreType = "indexedDB";
		}
		return dataStoreType;
	}//end _detectDataStore()

	
	function _getData( postFunc ){
console.log("webApp.db.getData() ", arguments);

		// if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			// _vars["dataStoreType"] = false;
		// } 

		switch(_vars["dataStoreType"]) {				
			
			case "indexedDB":
				// webApp.iDBmodule.getListStores({//DB exists?
					// "dbName" : webApp.iDBmodule.dbInfo["dbName"],
					// "callback" : function( listStores ){
// console.log(listStores);				
						// webApp.iDBmodule.checkState({
							// "listStores" : listStores,
							// "callback" : postFunc//draw page
						// });
// //console.log("test!");				
					// }//end callback
				// });
				// return false;
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
				if( !_vars["dataUrl"] ||
					_vars["dataUrl"].length === 0 ){
webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
					if( typeof postFunc === "function"){
						postFunc();
					}
					return false;
				}

				webApp.vars["loadProgress"].style.display="block";
				func.runAjax( {
					"requestMethod" : "GET", 
					"url" : _vars["dataUrl"], 
					
					"onProgress" : function( e ){
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
						webApp.vars["totalBytes"].innerHTML = e.total;
						webApp.vars["totalMBytes"].innerHTML = (( e.total / 1024) / 1024).toFixed(2);
						webApp.vars["loaded"].innerHTML = e.loaded;

						if( webApp.vars["loadProgressBar"] ){
							//webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							//webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
						}
					},
						
					"onLoadEnd" : function( headers ){
//console.log( headers );
						//webApp.vars["loadProgress"].style.display="none";
						var logMsg = webApp.vars["loadInfo"].textContent.trim();
						logMsg += ", " + _vars["dataUrl"];
						func.logAlert( logMsg, "info");
					},
					
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
						for( var key in e){
							webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
							func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
						}//next

webApp.vars["logMsg"] = "error, ajax load failed..." + _vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
						if( typeof postFunc === "function"){
							postFunc();
						}
						//return false;
					},

					"callback": function( data ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( !data ){
webApp.vars["logMsg"] = "error, no data in " + _vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
							if( typeof postFunc === "function"){
								postFunc(false);
							}
							return false;
						}

						//if( data ){
							// if( webApp.vars["cache"]["cacheUpdate"] ){
		// webApp.vars["logMsg"]= "need to update cache data - " + webApp.vars["dataUrl"];
		// //func.logAlert( webApp.vars["logMsg"], "warning");
		// console.log( webApp.vars["logMsg"] );
								// storage.saveAppData({
									// "dataStoreType": webApp.vars["support"]["dataStoreType"],
									// "data": data,
									// "callback" : function( state ){
		// //webApp.vars["logMsg"]= "Update cache data, " + webApp.vars["dataUrl"];
		// //func.logAlert( webApp.vars["logMsg"], "success");
		// //console.log( webApp.vars["logMsg"] );
										// webApp.vars["cache"]["cacheUpdate"] = false;
									// }
								// });
							// }
							_parseAjax( data );
							if( typeof postFunc === "function"){
								postFunc();
							}
						//}


					}//end callback()
				});
				
			break;
		}//end switch

		//return false;
			
		function _parseAjax( data ){
			
			if( _vars["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + _vars["dbType"];
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			switch( _vars["dbType"] ){
				case "xml":
					_parseXML( data );
				break;
				
				case "json":
//_parseJSON( data );
				break;
				
				case "csv":
//_parseCSVBlocks(data);
				break;
			}//end switch
			
		}//_parseAjax()
		
	}//end _getData()
	
	
	function _parseXML(xml){
//console.log("function _parseXML()");
var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj( xml );
console.log(xmlObj);
delete xml;
			_vars["nodes"] = _getNodesObj(xmlObj);
			//_vars["queryRes"] = _vars["nodes"];
			_vars["tagList"] = _getTagListObj(xmlObj);
			_vars["tagGroups"] = _getTagGroupsObj(xmlObj);
delete xmlObj;

			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["getDataRes"] = true;

			var timeEnd = new Date();
			var runTime = ( timeEnd.getTime() - timeStart.getTime() ) / 1000;
			webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
			func.logAlert( webApp.vars["logMsg"], "info");
//console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.logAlert( webApp.vars["logMsg"], "error");
console.log( error );
				for( var key in error ){
					webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ error[key];
					func.logAlert( webApp.vars["logMsg"], "error");
				}//next

		}//end catch

	}//end _parseXML()

	function _getNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagName = _vars["tagNameNodes"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var tagNodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagName];
			}
		}//next

		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n].attributes.type
				};

				for(var item in tagNodes[n]["childNodes"]){
					var _content = tagNodes[n]["childNodes"][item][0]["text"];

					if( !_content ){
						_content = __convertMultipleField( tagNodes[n]["childNodes"][item][0]["childNodes"]);
					}
					obj[item] = _content;
				}
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
			}//next
		}

		//__checkSupport();
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
				for(var item2 in _xf){
					
					if( _xf[item2]["childNodes"] ){
						var _xff = _xf[item2]["childNodes"];
						//var obj = {};
						for( var key3 in _xff ){
							//obj[key3] = _xff[key3];
							fields.push( _xff[key3][0] );//<li><a...>(only one tag!!!)</li>
						}
					} else {
						fields.push( _xf[item2] );
					}
				}
			}
			return fields;
		}//end __convertMultipleField()

		
/*		
		function __checkSupport(){
			for(var n = 0; n < nodes.length; n++){
				var links = nodes[n]["ul"];
				if(!links){
					continue;
				}
				for( var n2 = 0; n2 < links.length; n2++){
					//links[n2]["class-support"] = "";
					if( links[n2]["data-type"] === "local-file"){
						var filepath = links[n2]["href"];
						//get file type
						var arr = filepath.split(".");
						var filetype = arr[ (arr.length-1) ];
						var videoType = webApp.vars["videoTypes"][filetype];
//console.log(filetype, videoType);

						if( videoType && videoType["support"]){
							//links[n2]["class-support"] = "1";
						} else {
							links[n2]["class_support"] = "wrong-video-type";
						}
					}
				}
			}//next
		}// end __checkSupport()
*/		
	}//end _getNodesObj()


	function _getTagListObj(xmlObj){
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagListName = _vars["tagListName"];//"tag_list"
		var tagName = _vars["tagName"];//"tag"
		
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var nodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagListName][n]["childNodes"][tagName];
			}
		}//next
		
		if( nodes.length > 0){
			func.sortRecords({
				"records" : nodes,
				"sortOrder": "asc", //desc
				"sortByKey": "text"
			});
			
			return nodes;
		} else {
			return false;
		}
				
	}//end _getTagListObj()


	function _getTagGroupsObj(xmlObj){
		var databases = xmlObj["xroot"]["childNodes"]["database"];
		var dbName = _vars["dbName"];
		var tagName = "item";
		var tagGroupsName = _vars["tagGroupsName"];//"tag_groups"
		
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var nodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagGroupsName][n]["childNodes"][tagName];
			}
		}//next
		
		if( nodes.length > 0){
			func.sortRecords({
				"records" : nodes,
				"sortOrder": "asc", //desc
				"sortByKey": "text"
			});
			
			return nodes;
		} else {
			return false;
		}
				
	}//end _getTagGroupsObj()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		getData:	function( opt ){ 
			return _getData( opt ); 
		}
	};
}//end _db()