function _db( opt ){
//console.log(arguments);	

	// // private variables and functions
	var _vars = {
		// "indexedDBsupport" : window.indexedDB ? true : false,
		// "webSQLsupport" : window.openDatabase  ? true : false,
		// "localStorageSupport" : window['localStorage']  ? true : false,
		// // "dataStoreType" : _detectDataStore(),
		// // "tables": {}
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
				if( !webApp.vars["DB"]["dataUrl"] ||
					webApp.vars["DB"]["dataUrl"].length === 0 ){
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
					"url" : webApp.vars["DB"]["dataUrl"], 
					
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
						logMsg += ", " + webApp.vars["DB"]["dataUrl"];
						func.logAlert( logMsg, "info");
					},
					
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
						for( var key in e){
							webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
							func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
						}//next

webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["DB"]["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
						if( typeof postFunc === "function"){
							postFunc();
						}
						//return false;
					},

					"callback": function( data ){
console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( !data ){
webApp.vars["logMsg"] = "error, no data in " + webApp.vars["DB"]["dataUrl"];
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
			
			if( webApp.vars["DB"]["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + webApp.vars["DB"]["dbType"];
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			switch( webApp.vars["DB"]["dbType"] ){
				case "xml":
console.log( "_parseAjax, ", typeof data );
//_parseXML( data );
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
			webApp.vars["DB"]["nodes"] = _data_formNodesObj(xmlObj);
			webApp.vars["DB"]["queryRes"] = webApp.vars["DB"]["nodes"];

			webApp.vars["DB"]["tags"] = _data_formTagObj(xmlObj);
delete xmlObj;
			
			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["getDataRes"] = true;
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( error );
		}//end catch

	}//end _parseXML()
	
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


/*
	function _data_formNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		var databases = xmlObj["xroot"]["children"]["database"];
		var dbName = webApp.vars["DB"]["dbName"];
		var tagName = webApp.vars["DB"]["tagNameFilms"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < databases.length; n++){
			if( databases[n]["name"] && databases[n]["name"] === dbName){
				var tagNodes = xmlObj["xroot"]["children"]["database"][n]["children"][tagName];
			}
		}//next
		
		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n]["type"]
				};

				for(var item in tagNodes[n]["children"]){
					var _content = tagNodes[n]["children"][item][0]["text"];
//"producer"
//"roles"
//"creators"
//"description"
//"published"
//"updated"
					
					if( !_content ){
//tags
//title
//ul
						_content = __convertMultipleField( tagNodes[n]["children"][item][0]["children"]);
					}
					obj[item] = _content;
				}
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
				
			}//next
		}

//------------------ form timestamp
		__addTimeStamp();
		__checkSupport();
			
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
				for(var item2 in _xf){
					
					if( _xf[item2]["children"] ){
						var _xff = _xf[item2]["children"];
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

		function __addTimeStamp(){
			for(var n = 0; n < nodes.length; n++){
				if( nodes[n]["published"] && nodes[n]["published"].length > 0){
					if( webApp.vars["DB"]["dateFormat"] === "dd-mm-yyyy hh:mm:ss"){
						var arr = nodes[n]["published"].split(" ");
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
						
						var _day = parseInt( split_values["day"] );
						if ( isNaN( _day ) ){
							_day = 0;
						}

						var _month = 0;
				//"15-Sep-2018 22:13:00";
						var sMonth = split_values["month"];
						switch(sMonth){
							
							case "Jan":
								_month = 1;
							break;
							
							case "Feb":
								_month = 2;
							break;
							
							case "Mar":
								_month = 3;
							break;
							
							case "Apr":
								_month = 4;
							break;
							
							case "May":
								_month = 5;
							break;
							
							case "Jun":
								_month = 6;
							break;
							
							case "Jul":
								_month = 7;
							break;
							
							case "Aug":
								_month = 8;
							break;
							
							case "Sep":
								_month = 9;
							break;
							
							case "Oct":
								_month = 10;
							break;
							
							case "Nov":
								_month = 11;
							break;
							
							case "Dec":
								_month = 12;
							break;
							
						}//end switch

						var _year = parseInt( split_values["year"] );
						if ( isNaN( _year ) ){
							_year = 0;
						}

						nodes[n]["timestamp"] = new Date ( _year, _month -1 , _day).getTime();
					}
				}
			}//next
		}// end __addTimeStamp()
		
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
		}// end __addTimeStamp()
		
	}//end _data_formNodesObj()
*/

/*
	function _data_formTagObj(xmlObj){
		var databases = xmlObj["xroot"]["children"]["database"];
		var dbName = webApp.vars["DB"]["dbName"];
		var tagListName = "taglist";
		var tagName = "tag";
		
		for(var n = 0; n < databases.length; n++){
			if( databases[n]["name"] && databases[n]["name"] === dbName){
var tagNodes = xmlObj["xroot"]["children"]["database"][n]["children"][tagListName][n]["children"][tagName];
			}
		}//next
		
		if( tagNodes.length > 0){
			func.sortRecords({
				"records" : tagNodes,
				"sortOrder": "asc", //desc
				"sortByKey": "name"
			});
			
			return tagNodes;
		} else {
			return false;
		}
				
	}//end _data_formTagObj()
*/	
	//function _data_formHierarchyList(){
	//}//end _data_formHierarchyList()
