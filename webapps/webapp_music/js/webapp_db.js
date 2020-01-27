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
		"footerLinks" : [
{ url : "https://music.yandex.ru/users/roman-laptev/playlists", title: "music.yandex.ru" },
{ url : "https://www.youtube.com/channel/UCgp8hFrPYEx2F1SqEB8yUMg/playlists", title: "youtube playlists" },
//{ url : "https://vk.com/audios36466377", title: "music on VK.com", template : "blockLinksListItem3" },
{ url : "https://vk.com/audios36466377", title: "music on VK.com" },
{ url : "https://ok.ru/music/profile/508693848602", title: "music on OK.ru" },
{ url : "https://cloud.mail.ru/public/bbb2f6a3eb1d/music", title: "music on cloud.mail.ru" }
		],
		
		"playlistTitle": "new playlist",
		"playList":  [
// {"title" : "Hit The Lights", "mp3" : "/music/M/Metallica/1983_Kill_em_All/01_Hit_The_Lights.mp3"},
// {"title" : "The Four Horsemen","artist" : "Metallica","mp3" : "/music/M/Metallica/1983_Kill_em_All/02_The_Four_Horsemen.mp3"},
// {"title" : "Motorbreath",	"artist" : "Metallica",	"mp3" : "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3"}
],
		
		"numRecordsPerPage": 5,
		"numberPage": 1,
		"numPages": null,
		
		"sortOrder": "asc",
		"sortByKey": "", //"title", //"updated", 
		"dateFormat": "dd-mm-yyyy hh:mm:ss",

		"outputBuffer": [],
		"queryRes":[]
	};

	var _init = function( opt ){
//console.log("_db: ", _vars);
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
//---------------------
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
//console.log("webApp.db.getData() ", arguments);

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
//console.log(xmlObj);
delete xml;
			_vars["nodes"] = _getNodesObj(xmlObj);
			
//--------------------			
			for( var n = 0; n < _vars.numRecordsPerPage; n++){
				_vars["outputBuffer"].push( _vars["nodes"][n] );
			}//next
//--------------------			
			
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
//console.log( item, _content );	

					//if( !_content ){
					if( tagNodes[n]["childNodes"][item][0]["childNodes"] ){
						_content = __convertMultipleField( tagNodes[n]["childNodes"][item][0]["childNodes"]);
					}
					
					obj[item] = _content;
				}
				
				obj["nid"] = n;//create unique id for node
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
			}//next
		}

//------------------ form timestamp (for sort by 'updated')
		__addTimeStamp();
		//__checkSupport();
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
//console.log( item1, _xf );	
				for(var item2 in _xf){
					if( _xf[item2]["childNodes"] ){
						var _xff = _xf[item2]["childNodes"];
						//var obj = {};
						for( var key3 in _xff ){
							//obj[key3] = _xff[key3];
//console.log(_xff[key3][0]);	
							//fields.push( _xff[key3][0]["attributes"] );//<li><a...>(only one tag!!!)</li>
							var obj = {};
							if( _xff[key3][0]["attributes"] ){
								obj = _xff[key3][0]["attributes"];
							}
							if( _xff[key3][0]["text"] ){
								obj["text"] = _xff[key3][0]["text"];
							}
							fields.push( obj );
							
						}
					} else {
//console.log( _xf[item2] );	
						//fields.push( _xf[item2] );
						
						var obj = {};
						if( _xf[item2]["attributes"] ){
							obj = _xf[item2]["attributes"];
						}
						if( _xf[item2]["text"] ){
							obj["text"] = _xf[item2]["text"];
						}
						fields.push( obj );
						
					}
				}
			}
			return fields;
		}//end __convertMultipleField()


		function __addTimeStamp(){
			if( webApp.db.vars["dateFormat"] !== "dd-mm-yyyy hh:mm:ss"){
				return false;
			}
			
			for(var n = 0; n < nodes.length; n++){
				if( nodes[n]["updated"] && nodes[n]["updated"].length > 0){
					var arr = nodes[n]["updated"].split(" ");
					var dateArr = arr[0].split("-");
					var timeArr = arr[1].split(":");
						
					var split_values = {
						"day" : dateArr[0],
						"month" : dateArr[1],
						"year" : dateArr[2],
						"hour" : timeArr[0],
						"min" : timeArr[1],
						"sec" : timeArr[2]
					};
					nodes[n]["timestamp"] = func.getTimeStampFromDateStr( split_values );
				}
			}//next
		}// end __addTimeStamp()
		
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
		
		var nodes = [];
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
//var nodes = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagListName][n]["childNodes"][tagName];
var xTagList = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagListName][n]["childNodes"][tagName];
				for( var n2 = 0; n2 < xTagList.length; n2++ ){
					var obj = {};
					if( xTagList[n2]["attributes"] ){
						obj = xTagList[n2]["attributes"];
					}
					if( xTagList[n2]["text"] ){
						obj["text"] = xTagList[n2]["text"];
					}
					nodes.push( obj );
				}//next
				
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
		
		var nodes = [];
		for(var n = 0; n < databases.length; n++){
//console.log(databases[n].attributes.name, dbName);
			if( databases[n].attributes.name === dbName){
				var xTagGroupList = xmlObj["xroot"]["childNodes"]["database"][n]["childNodes"][tagGroupsName][n]["childNodes"][tagName];
//console.log( xTagGroupList);	
				for( var n2 = 0; n2 < xTagGroupList.length; n2++ ){
					var obj = {};
					if( xTagGroupList[n2]["attributes"] ){
						obj = xTagGroupList[n2]["attributes"];
					}
					if( xTagGroupList[n2]["text"] ){
						obj["text"] = xTagGroupList[n2]["text"];
					}
					nodes.push( obj );
					
				}//next
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
	
	
	function _getNodesByTag( opt ){
		var p = {
			"tagName" : null,
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}

		if( !p["tagName"] || p["tagName"].length === 0){
webApp.vars["logMsg"] = "_data_getNodesByTag(), error, not found tag name value...";
console.log( webApp.vars["logMsg"] );
			return false;
		}

		var data = [];
		for(var n = 0; n < _vars["nodes"].length; n++){
			var node = _vars["nodes"][n];
			if( !node["node_tags"] ){
console.log(node);		
				continue;			
			}
			var tags = node["node_tags"];
			for(var n2 = 0; n2 < tags.length; n2++){
//console.log( tags[n2]["text"], tags[n2]["text"].length, p["tagName"], p["tagName"].length, tags[n2]["text"] === p["tagName"]);
				var tagName = p["tagName"].trim();
				var nodeTagName = tags[n2]["text"].trim();
//console.log( nodeTagName, nodeTagName.length, tagName, tagName.length, nodeTagName === tagName);
				if( nodeTagName === tagName){
					data.push( node );
				}
			}//next
			
		}//next

		//_vars["queryRes"] = data;

		if( typeof p["callback"] === "function"){
			p["callback"](data);
		}
		//return false;
		
	}//end _getNodesByTag()


	function _search( opt ){
		var p = {
			"targetField" : null,
			"keyword" : null,
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
	//console.log(p);
		var fieldKey = p["targetField"];
		var itemKey;
		
		if( fieldKey === "title"){
			itemKey = "text";
		}
		
		//if( fieldKey === "filename"){
			//fieldKey = "ul";
			//itemKey = "href";
		//}
		
		var data = [];
		for(var n = 0; n < _vars["nodes"].length; n++){
			var node = _vars["nodes"][n];
			var item = node[fieldKey];
//console.log(item);

			if(!item){
				continue;
			}

			if( itemKey && itemKey.length > 0){//search into multi fields
				for(var n2 = 0; n2 < item.length; n2++){
					if( item[n2][itemKey]){
						var test = item[n2][itemKey].toLowerCase();
						var keyword = p["keyword"].toLowerCase();
						if( test.indexOf(keyword) !==-1 ){
							data.push( node );
							break;
						}
					}
				}//next
			} else {
	//console.log(node[fieldKey], typeof node[fieldKey]);
				if( typeof node[fieldKey] !== "string"){
					continue;
				}
				var test = node[fieldKey].toLowerCase();
				var keyword = p["keyword"].toLowerCase();
				if( test.indexOf(keyword) !==-1 ){
					data.push( node );
				}
			}
			
		}//next

		_vars["queryRes"] = data;

		if( typeof p["callback"] === "function"){
			p["callback"](data);
		}

	};//end _search()


	function _sortNodes(opt){
		var p = {
			records: [],
			"sortOrder": "asc", //desc
			"sortByKey": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if(p.records.length === 0 ){
			var logMsg = "error, not found sorting records...";
func.logAlert( logMsg, "error");
console.log( logMsg );
			return false;
		}
				
		if(!p.sortByKey){
			var logMsg = "error, not found 'sortByKey'...";
func.logAlert( logMsg, "error");
console.log( logMsg );
			return false;
		}
				
		p.records.sort(function(a,b){
	//console.log(a, b);
			var s1,s2;
			
			s1 = a[p.sortByKey];
			s2 = b[p.sortByKey];
			
			if( p.sortByKey === "title" ){
				s1 = a[p.sortByKey][0]["text"].toLowerCase();
				s2 = b[p.sortByKey][0]["text"].toLowerCase();
			}
			
			if( p.sortByKey === "updated" ){
				s1 = a["timestamp"];
				s2 = b["timestamp"];
			}
			
			switch(p.sortOrder){
				case "asc":
					if (s1 > s2) {
						return 1;
					}
					if (s1 < s2) {
						return -1;
					}
					// s1 === s2
					return 0;
				break
				
				case "desc":
					if (s1 > s2) {
						return -1;
					}
					if (s1 < s2) {
						return 1;
					}
					// s1 === s2
					return 0;
				break
			}//end swith()
		});//end sort
		
	}//end _sortNodes()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		getData:	function( opt ){ 
			return _getData( opt ); 
		},
		getNodesByTag: _getNodesByTag,
		search: _search,
		sortNodes: _sortNodes
	};
}//end _db()