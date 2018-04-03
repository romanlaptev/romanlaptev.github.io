function _db( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		//"data" : false,
		//"format" : false,
		
		// "schema" : {
			// "root" : {
				// "tag" : "database",
				// "attributes" : ["name"],
				// "child": {
					// "tag" : "table",
					// "attributes" : ["name"],
					 // "child": {
						// "tag" : "column",
						// "attributes" : ["name"]
					// }
				// }
			// }//end root node
		// },
		"indexedDBsupport" : window.indexedDB ? true : false,
		"webSQLsupport" : window.openDatabase  ? true : false,
		"localStorageSupport" : window['localStorage']  ? true : false,
		"dataStoreType" : _detectDataStore(),
		"isEmptyURL" : false,
		"numDataURL": false,
		"tables": {}
	};
	
	
	var _init = function( opt ){
//console.log("init _db: ", arguments);
console.log( "indexedDBsupport: " + _vars["indexedDBsupport"] );			
console.log( "webSQLsupport: " + _vars["webSQLsupport"] );			
console.log( "localStorageSupport: " + _vars["localStorageSupport"] );			
console.log( "Data store type: " + _vars["dataStoreType"] );			
		_vars["isEmptyURL"] = _checkDataURL();
	};//end _init()

	function _checkDataURL(){
//console.log("_checkDataURL()", webApp);
		var isEmptyURL = false;
		
		//detect url format
		if( typeof webApp.vars["import"]["data_url"] === "string"){//data url - one filename
			isEmptyURL = webApp.vars["import"]["data_url"].length === 0;
		}
		
		if( typeof webApp.vars["import"]["data_url"] === "object"){//data url - list of filenames
			var numDataURL = 0;
			for( var tableName in webApp.vars["import"]["data_url"]){
				numDataURL++;
			}//next
			isEmptyURL = numDataURL === 0;
//console.log(numDataURL, isEmptyURL);

			if( numDataURL > 0){//Get tables info
				_vars["numDataURL"] = numDataURL;
				for( var tableName in webApp.vars["import"]["data_url"]){
					var tableInfo = {
						//"tableName" : tableName,
						"url" : webApp.vars["import"]["data_url"][tableName],
						"inputDataFormat" : ""
					};
					
					var pos1= tableInfo["url"].lastIndexOf(".")+1;
					var pos2= tableInfo["url"].length;
					var inputDataFormat = tableInfo["url"].substring(pos1, pos2);
					tableInfo["inputDataFormat"]= inputDataFormat;
					
					_vars["tables"][tableName] = tableInfo;
				}//next
				
				//convert table list to Array
				_vars["tablesArr"] = [];
				for(var tblName in _vars["tables"]){
					var obj = {
						"name" : tblName,
						"url" : _vars["tables"][tblName]["url"], 
						"inputDataFormat" : _vars["tables"][tblName]["inputDataFormat"]
					}
					_vars["tablesArr"].push( obj );
				}//next
				
			}
		}
		return isEmptyURL;
	}//end _checkDataURL()
	
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
	
	function _saveData( postFunc ){
console.log("webApp.db.saveData() ", arguments);

		if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			_vars["dataStoreType"] = false;
		} 

		if( _vars["isEmptyURL"]){
console.log("error in _db(), empty 'data_url' !");
			if( typeof postFunc === "function"){
				postFunc();
			}
			return false;
		}
		
		switch(_vars["dataStoreType"]) {
			case "indexedDB":
				__saveDataToIDB(postFunc);
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
				//server request ( save result to memory, _vars["tables"] )
				if( _vars["numDataURL"] > 0 ){
						if( typeof postFunc === "function"){
							postFunc();
						}
				} else {
					
					webApp.app.serverRequest({
						"url" : webApp.vars["import"]["data_url"],
						"callback": function( data ){
var msg = "load " + webApp.vars["import"]["data_url"] ;
//console.log(msg);
//console.log(data);
								if( data ){
									__parseAjax(data);
								} else {
console.log("error in _db(), _saveData(), not find 'data'.... ");			
								}
								
						}//end callback()
					});
					
				}
			break;
		}//end switch
		
		// if( !_vars["dataStoreType"] ){
// console.log("TEST2");			
		// } 
		
		return false;

		function __saveDataToIDB( postFunc ){
console.log("function __saveDataToIDB");	

			if( _vars["numDataURL"] > 0 ){
console.log("Load data files from server and save to indexeDB storage");

				var counter = 0;
				__recursiveSave( counter );
				return false;
			}

			//data in one file
			switch( webApp.vars["import"]["inputDataFormat"] ){
				case "xml":
					webApp.iDBmodule.getListStores({//DB exists?
						"dbName" : webApp.iDBmodule.dbInfo["dbName"],
						"callback" : function( listStores ){
console.log(listStores);				
							webApp.iDBmodule.checkState({
								"listStores" : listStores,
								"callback" : postFunc//draw page
							});
						}//end callback
					});
					//return false;????????
				break;
				
				case "json":
				break;
				
				//case "csv":
				//case "jcsv":
				//break;
				
				//default:
				//break;
				
			}//end switch

			if( typeof postFunc === "function"){
				postFunc();
			}
			return false;
			
			function __recursiveSave( counter ){
				
				var url = _vars["tablesArr"][counter]["url"];
console.log(counter, url);
				webApp.app.serverRequest({
					"url" : url,
					"callback": function(data){
//console.log( data.length );	
						if( data.length > 0){
							if( _vars["tablesArr"][counter]["inputDataFormat"] === "csv"){
								var tableName = _vars["tablesArr"][counter]["name"];
								_vars["tables"][tableName]["records"] = _parseCSVBlocks(data);
								//_continueQuery( _parseCSVBlocks(data) );
							}
						}
						
						counter++;
						if( counter >= _vars["tablesArr"].length ){
							if( typeof postFunc === "function"){
								postFunc();
							}
							return false;
						} else {
							__recursiveSave( counter );
						}
						
					}
				});

			}//end __recursive()
			
		}//end __saveDataToIDB()
		
		function __parseAjax( data ){
			
			if( webApp.vars["import"]["inputDataFormat"].length === 0 ){
console.log("error in _db(), not find 'inputDataFormat' !");
				return false;
			}
			
			switch( webApp.vars["import"]["inputDataFormat"] ){
				case "xml":
					_parseXML( data );
				break;
				
				case "json":
					//var obj = typeof data == 'string'? JSON.parse(data): data;
					if( typeof data !== "string"){
console.log("error in _db(), data not in JSON format");
						return false;
					}
						
					try {
						//var jsonObj = JSON.parse( data );
						var jsonObj = JSON.parse( data, function(key, value) {
//console.log( key, value );
							return value;
						});							
//console.log( jsonObj );
						for(var tableName in jsonObj){
//console.log( tableName, jsonObj[tableName].length );
							var table = jsonObj[tableName];
							for( var n = 0; n < table.length; n++){
								var recordObj = table[n];
								webApp.db.vars["tables"][tableName]["records"].push( recordObj );
							}//next
						}//next
					} catch(e) {
					_log( e );
					}							
						
				break;
				
				case "csv":
				case "jcsv":
console.log("_parseCSVBlocks()");				
					//_parseCSVBlocks(data);
				break;
			}//end switch
			
			if( typeof postFunc === "function"){
				postFunc();
			}
		}//__parseAjax()
		
	}//end _saveData()

	
	
	function _loadTemplates( postFunc ){
//console.log( "_loadTemplates", postFunc);			
		
		var isLoadTemplates = false;
		
		if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			//_vars["dataStoreType"] = false;
			if( typeof postFunc === "function"){
				postFunc( isLoadTemplates );
			}
		} 
		
		switch(_vars["dataStoreType"]) {				
			case "indexedDB":
				webApp.iDBmodule.getListStores({//store by name 'templates' is exists?
					"dbName" : webApp.iDBmodule.dbInfo["dbName"],
					"callback" : function( listStores ){
//console.log(listStores);				
						for( var n = 0; n < listStores.length; n++){
							var storeName = listStores[n];
							if( storeName === "templates"){
								isLoadTemplates = true;
								
								webApp.iDBmodule.getRecords({
									"dbName": webApp.iDBmodule.dbInfo["dbName"],
									"storeName": "templates",
									"action" : "get_records_obj",
									"callback" : function( data, log ){
//var msg = "webApp.iDBmodule.getRecords(), get storeData as object,";
//console.log(msg, log);
//console.log(data );
										webApp.draw.vars["templates"] = data;
									}
								});
								
								break;
							}
						}//next
						if( typeof postFunc === "function"){
							postFunc( isLoadTemplates );
						}

					}//end callback
				});
				return false;
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
			break;
		}//end switch

		
	}//end _loadTemplates()

	function _saveTemplates( templates ){
//console.log( "_saveTemplates", templates);			

		if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			_vars["dataStoreType"] = false;
		} 
		
		switch(_vars["dataStoreType"]) {				
			case "indexedDB":
				var storeData = [];
				for( var tpl in templates){
					storeData.push({
						"key" : tpl,
						"value" : templates[tpl]
					});					
				}//next
//console.log( storeData, storeData.length);

				if( storeData.length > 0){
					webApp.iDBmodule.addRecords({
						"dbName": webApp.iDBmodule.dbInfo["dbName"],
						"storeName": "templates",
						"storeData" : storeData,
						"callback" : function( log ){
var msg = "webApp.iDBmodule.addRecords()";
console.log(msg,  log);
						}
					});
				} else {
var msg = "webApp.db.saveTemplates(), warning! No templates in array";
console.log(msg);
				}
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
			break;
		}//end switch

	}//end _saveTemplates()
	
	
	//select tid, title from taxonomy_title	
	var _query = function( opt ){
		var startTime = new Date();
		var options = {
			//"dbName": null,
			//"storeName" : "",
			"queryObj" : {//ex: select tid, title from taxonomy_title
				"action" : "", //"select",
				//"order_by" : false,//"ORDER_BY"
				"tableName": "", //"taxonomy_title",
				"targetFields" : "", //["tid", "title"],
				"where" : []
			}, 
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(opt);
		
		//options["queryObj"]["callback"] = _postQuery;
		options["callback"] = opt["callback"];
		options["queryObj"]["callback"] = _postQuery;
		
//console.log( "_query()", options );
		
		_startQuery( options["queryObj"] );
		
		//detect subquery
		function _detectSubQuery( queryObj ){
//console.log("_detectSubQuery(), start!");			
			var subQuery = false;
			var conditions = queryObj["where"];
			
			for( var n = 0; n < conditions.length; n++){
				var condition = conditions[n];
				
				if( condition["value"]["action"] ){
					subQuery = condition["value"];
					subQuery["callback"] = _postSubQuery;
					subQuery["num_condition"] = n;
//console.log( "detect subQuery ", subQuery, " in ", queryObj, n);
//console.log( "detect subQuery ", subQuery);
					
//					if( subQuery["where"][0]["value"]["action"] ){
//console.log("detect subquery2");
//					}
					
					break;
				} else {
					subQuery = false;
				}
				
			}//next condition
			
//console.log("_detectSubQuery(), end");			
			return subQuery;
		}//end _detectSubQuery()
		
		function _startQuery( queryObj ){
//console.log(arguments);

			var tableName = queryObj["tableName"];
//console.log("tableName " + tableName, _vars["tables"][tableName]);

			//if( !_vars["tables"][tableName]){
//console.log("error, _startQuery(), not find information schema for table " + tableName);
				//_postQuery( data )	;
				//return false;
			//}
			
			if( !_vars["tables"][tableName] || 
					!_vars["tables"][tableName]["records"] ||
						_vars["tables"][tableName]["records"].length === 0 ){
				
				switch ( webApp.db.vars["dataStoreType"]){
					case "indexedDB":
						//get records from iDB store
						webApp.iDBmodule.getRecords({
							"storeName" : tableName,
							"callback" : function( data){
var msg = "restart db query, " + tableName;
console.log( msg );
//console.log( data[0], data.length );
								if( data.length > 0){
									
									if( typeof _vars["tables"][tableName] === "undefined"){
										_vars["tables"][tableName] = [];
										//_vars["tables"][tableName]["records"] = [];
									}
									_vars["tables"][tableName]["records"] = data;
									_startQuery( queryObj );//restart db query
								} else {
	var msg = "db.query(), startQuery(), error, table " +tableName+ " empty.... ";
	console.log( msg );
								}

								//_continueQuery(data);
							}
						});
					break;
					
					default:
var msg = "Warning! db.query(), startQuery(), table " +tableName+ " empty.... ";
console.log( msg );
						var url = false;
						if( _vars["numDataURL"] > 0){
							for(var tblName in _vars["tables"]){
								if( tableName === tblName){
									url = _vars["tables"][tableName]["url"];
								}
							}//next
//console.log( "URL:", url );
						}
							
						//server request
						if( url ){
							webApp.app.serverRequest({
								"url" : url,
								"callback": function(data){
//console.log( data );			
									if( _vars["tables"][tableName]["inputDataFormat"] === "csv"){
										//_vars["tables"][tableName]["records"] = _parseCSVBlocks(data);
										_continueQuery( _parseCSVBlocks(data) );
									}
									
								}
							});
						}
							
						
					break;
				}//end switch
				
				return false;
			}

			var result = [];
			var action = queryObj["action"];
			switch( action ){
				
				case "select":
					var tableName = queryObj["tableName"];
					var data = _vars["tables"][tableName]["records"];
//console.log( data.length, tableName);		

					//detect sub query
					var subQuery = _detectSubQuery( queryObj );
					if( !subQuery ){
						_processQuery( data, queryObj );
					} else {
						options["parentQuery"] = queryObj;
						options["subQuery"] = subQuery;
						//options["num_condition"] = subQuery["num_condition"];
						_startQuery( subQuery );
						return false;
					}
//console.log( "test1" );
				break;
				
			}//end switch
		}//end _startQuery()
		
		function _continueQuery( data ){
console.log( "function _continueQuery", options["queryObj"] );
		//console.log( data );
		//console.log( tableName );
			var tableName = options["queryObj"]["tableName"];				
			if( data.length > 0){
				if( typeof _vars["tables"][tableName] === "undefined"){
					_vars["tables"][tableName] = [];
					//_vars["tables"][tableName]["records"] = [];
				}
				_vars["tables"][tableName]["records"] = data;
				_startQuery( options["queryObj"] );//restart db query
			} else {
		var msg = "db.query(), startQuery(), error, table " +tableName+ " empty.... ";
		console.log( msg );
			}
		}//end _continueQuery()	
		
		function _processQuery( records, queryObj ){
//console.log("_processQuery(), ", arguments);			

			var tableName = queryObj["tableName"];
			var targetFields = queryObj["targetFields"];
			var conditions = queryObj["where"];
//console.log( conditions, conditions.length, targetFields );


			var table = [];
			for( var n = 0; n < records.length; n++){
			//for( var n = 0; n < 50; n++){
				
				if( typeof records[n] === "object" ){
					var record = records[n];//json object
				}
				
				var test = true;
				if( conditions.length > 0 ){//process, search by conditions
					test = _checkConditons( record, conditions );
				}
				
				if(test){
					_pushResultRecord( record, table, targetFields);
				}
			}//next record
				
//console.log("unsort:", table[0], table.length);

			if( typeof queryObj["callback"] === "function"){
				
//console.log( queryObj["num_condition"] );
					if( typeof queryObj["num_condition"] === "undefined"){
//console.log( queryObj["callback"] );
						queryObj["callback"](table);
					} else {
//console.log( queryObj["callback"] );//function postSubQuery
//console.log( options["queryObj"]["callback"] );//function from kodif.data, _query()
						
						queryObj["callback"]({
							"data" : table, 
							"baseQuery" : options["queryObj"],
							"parentQuery" : options["parentQuery"],
							"subQuery" : queryObj
						});

					}
			}

		}//end _processQuery()

		function _checkConditons( record, conditions){
//console.log( "function _checkConditons, ", conditions );
//console.log( record);

			record["checkResult"] = [];
			conditions[0]["logic"] = "";

			for( var n = 0; n < conditions.length; n++){
				var condition = conditions[n];
// if( condition["value"] === 5){
// console.log(condition["value"], typeof condition["value"]);
// console.log( record["vid"], typeof record["vid"]);
// }				
				record["checkResult"][n] = false;
				
				var key = condition["key"];
				var compare = condition["compare"];
				
				//convert string or number "value" to array ["value"]
				if( typeof condition["value"] === "string" ||
						 typeof condition["value"] === "number"){
					//condition["value"] = [ condition["value"] ];
					var list_values = [ condition["value"] ];
				} else {
					var list_values = condition["value"];
				}
				
				//var list_values = condition["value"];
				if( list_values.length === 0 ){
	//console.log("Error, _checkConditons(), empty conditions['value']...");
					continue;
				}		
//console.log( condition );				

				switch( compare ) {
				
					case "=":
//console.log( list_values );
						for( var n2 = 0; n2 < list_values.length; n2++){
//if( condition["value"] === 5){
//console.log( key, record[key], condition["value"], n, record["checkResult"] );
//console.log( record);
//}								
							//if( record[key] === list_values[n2].toString() ){
							if( record[key].toString() === list_values[n2].toString() ){
								record["checkResult"][n] = true;	
								
//if( condition["value"] === "стиль"){
//console.log( key, record[key], condition["value"], n, record["checkResult"] );
//name стиль стиль 1 [true, true]
//name стиль стиль 1 [false, true]
//}								
							}
						}//next
					break;

					case "!=":
					case "<>":
						for( var n2 = 0; n2 < list_values.length; n2++){
							if( record[key] !== list_values[n2].toString() ){
								record["checkResult"][n] = true;							
							}
						}//next
					break;

					case "IN":
					// //record["checkResult"][n] = false;
					// for( var n2 = 0; n2 < list_values.length; n2++){
// //console.log(n2, list_values[n2]);

						// //"IN"
						// if( !condition["zapret"] ){

// // if( (record["KOD_MAIN"] === "1" && record["NOMER"] === "170") || 
// // (record["KOD_MAIN"] === "5" && record["NOMER"] === "170")
// // ){
// // console.log(key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record[key] === list_values[n2].toString() );
// // }
							// if( record[key] === list_values[n2].toString() ){
								// record["checkResult"][n] = true;
// //console.log( key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record["checkResult"] );
								// break;
							// } //else {
								// //record["checkResult"][n] = false;
							// //}
							
						// } else { //"NOT IN"
						
							// if( record[key] !== list_values[n2].toString() ){
// //console.log(record[key], key, typeof record[key], list_values[n2], typeof list_values[n2] );
								// record["checkResult"][n] = true;
								// break;
							// }
							
						// }
						
					// }//next
					break;
					
				}//end switch

			}//next condition

	// if( record["NOMER"] === "182"){
//console.log( record, record["checkResult"].length );
	// }			

			var test = false;
			if( conditions.length === 1){
				test = record["checkResult"][0];
				return test;
			}
			
			//Check several conditions (.... AND...OR...AND...)
			var operands = record["checkResult"];
			var compareResult = 0;
			for( var n = 0; n < conditions.length; n++){
				
				if( n > 0 ){//exclude first condition without logic operation
					var logicOp = conditions[n]["logic"];
					switch( logicOp ){
						
						case "AND":
							if( compareResult === 0){
								var num = n - 1;
								compareResult = operands[num] && operands[n];
							} else {
								compareResult = compareResult && operands[n];
							}
						break;
						
						case "OR":
							if( compareResult === 0){
								var num = n - 1;
								compareResult = operands[num] || operands[n];
							} else {
								compareResult = compareResult || operands[n];
							}
						break;
						
					}//end switch
				}
			}//next

//var compareResult = false;
			return compareResult;
		}//end _checkConditons()

		
		function _pushResultRecord( record, table, targetFields){
			var obj = {};
			for( var n1 = 0; n1 < targetFields.length; n1++){
				obj[ targetFields[n1] ] = record[ targetFields[n1] ];
			}
			table.push(obj);
		}//end _pushResultRecord()
		
		function _postQuery( data ){ 
//console.log("_postQuery(), ", "caller: ", _postQuery.caller, data.length);
//console.log(options, data);
			var endTime = new Date();
			var runtime = (endTime - startTime) / 1000;
//console.log("_postQuery(), runtime, sec: " + runtime);
			// //fail query
			// if(!data){
				// if( typeof options["callback"] === "function"){
					// options["callback"]( false );
				// }
				// return false;//wait!!!
			// }
			
			// //run next query
			// if( data.length === 0 && queryObj["next_query"] ){
// console.log("Run next query, ", queryObj["next_query"]);
				// queryObj["next_query"]["callback"] = queryObj["callback"];
				
				// if( queryObj["order_by"] ){
					// queryObj["next_query"]["order_by"] = queryObj["order_by"];
				// }
				// _runQuery( queryObj["next_query"] );
				// return false;//wait!!!
			// }
				
			// if( data.code === "store_not_found" ){
				// _queryAlt( 
					// options["queryObj"], 
					// options["queryObj"]["callback"] 
				// );
				// return false;//wait!!!
			// }
				
			if( typeof options["callback"] === "function"){
//console.log("Run query, end process");
//console.log(options["callback"]);
				options["callback"]( data );
				return false;//wait!!!
			} else {
console.log("not callback....use return function");
				return data;
			}
			
		};//end _postQuery()
		
		//filter subquery results and run base query
		function _postSubQuery( opt ){
//console.log("_postSubQuery()", arguments, "caller: ", _postSubQuery.caller );
//console.log("_postSubQuery()", opt );
//console.log(options);

			var num_condition = opt["subQuery"]["num_condition"];
			//var targetField = opt["baseQuery"]["where"][num_condition]["key"];
			var targetField = opt["subQuery"]["targetFields"][0];
			var data = opt["data"]; 
//console.log(data, data.length, num_condition, targetField);

			var filter = [];
			if( data.length > 0){
				for( var n = 0; n < data.length; n++){
//console.log(data[n], data[n][targetField], targetField);
					filter.push( data[n][targetField] );
				}
			}
//console.log( filter );

			if( opt["parentQuery"] ){
				opt["parentQuery"]["where"][num_condition]["value"] = filter;
			} else {
				opt["baseQuery"]["where"][num_condition]["value"] = filter;
//console.log(opt["baseQuery"]);
			}

			//detect sub query in opt["subQuery"]
			//if( opt["subQuery"]["where"][0]["value"]["action"] ){
//console.log(opt["subQuery"], num_condition);
				//opt["baseQuery"]["where"][num_condition]["value"] = opt["subQuery"];
			//}
			//var subQuery = _detectSubQuery( opt["subQuery"] );
//console.log( subQuery );
				
			_query( {
				"queryObj" : opt["baseQuery"],
				"callback" : options["callback"]
			});

		};//end _postSubQuery()
		
	};//end _query()
	
	
	function _parseXML(xml){

		//var xmlRoot = xml.getElementsByTagName("pma_xml_export");
//console.log( xmlRoot, xmlRoot.item(0) ) ;
//return;
		var xmlDoc = xml.getElementsByTagName("database");
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;

		//fix for Chrome, Safari (exclude tag <pma:database>)
		if( xmlDoc.length === 1){
			var records = xmlDoc.item(0).getElementsByTagName("table");
		}
		if( xmlDoc.length === 2){
			var records = xmlDoc.item(1).getElementsByTagName("table");
		}
//console.log( records, records.length ) ;
//console.log( records.item(0).text ) ;
//console.log( records.item(0).textContent ) ;
//console.log( "textContent" in records.item(0) ) ;
//console.log( "text" in records.item(0) ) ;
//return;

		for( var n = 0; n < records.length; n++){
			//var record = records[n];
			//var tableName = record["attributes"]["name"].nodeValue;
			var record = records.item(n);
			var tableName = record.attributes.getNamedItem("name").nodeValue;
//console.log( tableName );

			var columns = record.getElementsByTagName("column");
			var recordObj = {};
			for( var n2 = 0; n2 < columns.length; n2++){
				//var column = columns[n2];
				//var columnName = column["attributes"]["name"].nodeValue;
				//recordObj[columnName] = column.textContent;
				var column = columns.item(n2);
				var columnName = column.attributes.getNamedItem("name").nodeValue;
				if ("textContent" in column){
					recordObj[columnName] = column.textContent;
				} else {
					recordObj[columnName] = column.text;
				}
				
			}//next
			
			//var recordObj = {"a":1};
//console.log(tableName, _vars["tables"][tableName]);
			if( typeof _vars["tables"][tableName] === "undefined"){
				_vars["tables"][tableName] = [];
				//_vars["tables"][tableName]["fields"] = [];
				_vars["tables"][tableName]["records"] = [];
			}
			_vars["tables"][tableName]["records"].push( recordObj );
		}//next
		
	}//end _parseXML()

/*	
	function _parseCSVBlocks( data ){
		var importData = data.split( webApp.vars["import"]["csv_delimiterByLines"] );
//console.log( importData );

		//detect block info
		webApp.vars["import"]["blocks"] = [];
		var tableName = "";
		for( var n = 0; n < importData.length; n++){
			var record = importData[n];
			
			if( record.indexOf("#HEAD") !== -1 ){
//console.log( n, record.indexOf("#HEAD"), record );				
				var p = record.replace("#HEAD", "");
//console.log( p );
				var jsonObj = JSON.parse( p, function(key, value) {
//console.log( key, value );
					return value;
				});							
//console.log( jsonObj );

				// var obj = {};
				// for( var key in jsonObj){
					// obj[key] = jsonObj[key];
				// }
				// obj["startPos"] = n+1;
				// webApp.vars["import"]["blocks"].push( obj );
				tableName = jsonObj["name"];
				var fieldsInfo = jsonObj["fields"];
			} else {
				
//console.log( tableName );
				if( tableName.length > 0){
					var recordObj = _convertCSV_JSON( 
						record, 
						fieldsInfo, 
						webApp.vars["import"]["csv_delimiterByFields"] 
					);
					webApp.db.vars["tables"][tableName]["records"].push( recordObj );
				} else {
	console.log("Warn! Skip record", record);				
				}
				
			}
			
		}//next
		
		function _convertCSV_JSON( record, keys, delimiterByFields ){
	//console.log( "function _convertCSV_JSON(), ", arguments);
			if( typeof record !== "string" ){
	console.log("_convertCSV_JSON(), error, input record is not in CSV format");
				return false;
			}
				
			if( record.length === 0 ){
	console.log("_convertCSV_JSON(), error, input record is empty!");
				return false;
			}

			var recordObj = {};
			//create keys(fieldnames)
			for( var n1 = 0; n1 < keys.length; n1++){
				var key = keys[n1];
				recordObj[ key ] = "";
			}//next field
			
			
			//filter, replace commas within "text value"
			var regexp = /\"(.*?)\"/g;
			var filter = [];
			while( result = regexp.exec( record )){
	//console.log(result);
			  var s1 = result[1];
			  if(s1.indexOf(",") !== -1){
				var s2 = s1.replace(/,/g,"&#44;");
	//console.log(s1, s2);
				var obj = {
				  "raw": s1,
				  "filtered": s2
				};
				filter.push(obj);
			  }
			}
	//console.log(filter);
			
			for( var n1 =0; n1 < filter.length; n1++){
				var s1 = filter[n1]["raw"];
				var s2 = filter[n1]["filtered"];
				record = record.replace( s1, s2 );
			}
			
			record = record.replace(/"/g,"");
//console.log( record );

			var csv_values = record.split( delimiterByFields );
//console.log( csv_values, csv_values.length );

			var num = 0;
			for( var key in recordObj){
				//restore commas in text value
				if( csv_values[num].length === 0){
					csv_values[num] = "NULL";
				}
				recordObj[key] = csv_values[num];
				num++;
			}//next key
				
	//console.log(recordObj);			
			return recordObj;
		}//_convertCSV_JSON()
		
	}//end _parseCSVBlocks()
*/
	
	function _parseCSVBlocks( data ){
		var jsonData = [];		
		var csvData = [];
		
//------------ test
//data = data.replace(/\r\n/g, "<br>");
//console.log(data);
//------------
		csvData = data.split( webApp.vars["import"]["csv_delimiterByLines"] );
		//csvData = data.split( "\"\n" );
//console.log(csvData);

		if( csvData.length === 0){
console.log( "error CSV parse..." );
			return false;
		}
		
		if( webApp.vars["import"]["csv_header"] ){
			var d = webApp.vars["import"]["csv_delimiterByFields"] ;
			
			//var tableName = jsonObj["name"];
			var fieldsInfo = csvData[0].split( d );
//console.log( fieldsInfo );

			for( var n = 1; n < csvData.length; n++){
				var record = csvData[n];
				
				var recordObj = _convertCSV_JSON( 
					record, 
					fieldsInfo, 
					webApp.vars["import"]["csv_delimiterByFields"] 
				);
//console.log( recordObj );
				jsonData.push( recordObj );
			}//next

		}
		return jsonData;


		function _convertCSV_JSON( record, keys, delimiterByFields ){
//console.log( "function _convertCSV_JSON(), ", arguments);
//console.log( record, record.length);
			if( typeof record !== "string" ){
	console.log("_convertCSV_JSON(), error, input record is not in CSV format");
				return false;
			}
				
			if( record.length === 0 ){
console.log("_convertCSV_JSON(), error, input record is empty!");
				return false;
			}

			var recordObj = {};
			//create keys(fieldnames)
			for( var n1 = 0; n1 < keys.length; n1++){
				var key = keys[n1];
				recordObj[ key ] = "";
			}//next field
			
			
			//filter, replace commas within "text value"
			var regexp = /\"(.*?)\"/g;
			var filter = [];
			while( result = regexp.exec( record )){
	//console.log(result);
			  var s1 = result[1];
			  if(s1.indexOf(",") !== -1){
				var s2 = s1.replace(/,/g,"&#44;");
	//console.log(s1, s2);
				var obj = {
				  "raw": s1,
				  "filtered": s2
				};
				filter.push(obj);
			  }
			}
	//console.log(filter);
			
			for( var n1 =0; n1 < filter.length; n1++){
				var s1 = filter[n1]["raw"];
				var s2 = filter[n1]["filtered"];
				record = record.replace( s1, s2 );
			}
			
			record = record.replace(/"/g,"");
//console.log( record );

			var csv_values = record.split( delimiterByFields );
//console.log( csv_values, csv_values.length );

			var num = 0;
			for( var key in recordObj){
				//restore commas in text value
				if( csv_values[num].length === 0){
					csv_values[num] = "NULL";
				}
				recordObj[key] = csv_values[num];
				num++;
			}//next key
				
//console.log(recordObj);			
			return recordObj;
		}//_convertCSV_JSON()
		
	}//end _parseCSVBlocks()

	
//==================================
// async API
//==================================
/*
	function _getVocabularyByName( opt ){
		var options = {
			"vocName" : "",
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["vocName"].length === 0 ){
_log("<p>db.getVocabularyByName(),   error, vocName <b class='text-danger'>is empty</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "vocabulary",
				"targetFields" : ["vid"],
				"where" : [
					{"key" : "name", "value" : options["vocName"], "compare": "="}
				]
			},
			"callback" : function( res ){
				if( typeof options["callback"] === "function"){
					options["callback"](res);//return vid
				}
			}//end callback
		};
		webApp.db.query( queryParams);
		
	}//end _getVocabularyByName()
*/

/*
	function _getTermByName( opt ){
		var options = {
			"vid" : null,
			"termName" : "",
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["termName"].length === 0 ){
_log("<p>db.getTermByName(),   error, termName <b class='text-danger'>is empty</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "vid", "value" : options["vid"], "compare": "="},
					{"logic": "AND", "key" : "name", "value" : options["termName"], "compare": "="}
				]
			},
			"callback" : function( res ){
//console.log(res, res.length );	
				if( typeof options["callback"] === "function"){
					options["callback"](res);//return tid
				}
			}//end callback
		};
		webApp.db.query( queryParams);

	}//end _getTermByName()
*/


	function _getChildTerms( opt ){
		var p = {
			"termins" : null,
			"terminTree" : null,
			"counter" : null,
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["termins"] ){
console.log("db.getChildTerms(),  error, not defined termins: " + p["termins"]);
//console.log( p["callback"].toSource() );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		var termin = p["termins"][p.counter];
		webApp.db.query({
			"queryObj" : webApp.app.formQueryObj({
				"queryTarget" : "getChildTerms",
				"vid" : termin["vid"], 
				"tid" : termin["tid"]
			}),
			"callback" : function( res2 ){
	// //console.log(res2, counter, res.length);
				if( res2.length > 0){
					p["terminTree"][p.counter]["childTerms"] = res2;
				}
				p["counter"]++;
				if( p["counter"] < p["termins"].length ){
					_getChildTerms( p );
				} else {
//console.log("--- terminTree : ", p["terminTree"]);
					if( typeof p["callback"] === "function"){
						p["callback"]();
					}
				}
			}//end callback
		});
		
	}//end _getChildTerms()
	
	function _getTerminNodes( opt ){
		var p = {
			"tid" : null,
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["tid"] ){
_log("<p>db.getTerminNodes(),   error, <b class='text-danger'>'tid' is empty</b></p>");
			return false;
		}

		var subQuery = {
			"action" : "select",
			"tableName": "term_node",
			"targetFields" : ["nid"],
			"where" : [
				{"key" : "tid", "compare": "=", "value" : p["tid"]}
			]
		};
		var baseQuery = {
			"queryObj" : {
				"action" : "select",
				"tableName": "node",
				//"targetFields" : ["nid", "title", "created", "changed"],
				"targetFields" : ["nid", "title"],
				"where" : [
					{"key" : "nid", "compare": "=", "value" : subQuery}
				]
			},
			"callback" : _postQuery
		};
		webApp.db.query( baseQuery );
		return false;
		
		function _postQuery( res ){
//console.log( res );
			if( typeof p["callback"] === "function"){
				p["callback"](res);
			}
			
		}//end _postQuery()
		
// SELECT * FROM  node WHERE  nid IN (
	// SELECT nid FROM  term_node WHERE  tid =105
// )

// SELECT * 
// FROM  `node_revisions` 
// WHERE  `nid` =53

// SELECT * 
// FROM  `content_field_filename` 
// WHERE  `nid` =53

// SELECT * 
// FROM  `content_type_photogallery_image` 
// WHERE  `nid` =53

// SELECT * 
// FROM  `comments` 
		
	}//end _getTerminNodes()

	

	function _getBlockContent( opt ){
		var p = {
			"contentType" : false,//"getTerminByName",
			"vocName" : "",
			"termName" : "",
			"callback" : null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( p["contentType"].length === 0 ){
console.log("error in _getBlockContent(), empty 'contentType'....");
			return false;
		}

		switch( p.contentType ) {
			
			case "getTerminByName":
				if( p["vocName"].length === 0 ){
_log("<p>db.getBlockContent(), error, empty  <b class='text-danger'>vocName</b></p>");
					return false;
				}
				if( p["termName"].length === 0 ){
_log("<p>db.getBlockContent(),   error, <b class='text-danger'>termName</b></p>");
					return false;
				}
				
				webApp.db.query({
					"queryObj" : webApp.app.formQueryObj({
						"queryTarget" : p["contentType"],//"getTerminByName",
						"vocName" : p["vocName"], 
						"termName" : p["termName"],
					}),
					"callback" : function( res ){
//console.log("Tech, end test query!!!", res, res.length);
						var terminTree = [];
						terminTree = res;

						_getChildTerms({
							"termins" : res, 
							"terminTree" : terminTree, 
							"counter" : 0,
							"callback" : function(){
								if( typeof p["callback"] === "function"){
//console.log("TEST1", p, terminTree );			
//console.log( p["callback"].toSource() );
						
									p["callback"](  terminTree  );
								}
							}//end callback
						});

					}//end callback
				});
					
			break;
			
			//case "":
			//break;

		}//end switch
		
	}//end _getBlockContent()


/*	
	function _replaceUrl( opt ){
		var p = {
			"data" : null,
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] ){
_log("<p>db.replaceUrl(),   error, data <b class='text-danger'>is empty</b></p>");
			return false;
		}
		var numRec = 0;
		__getUrlAlias(numRec);
		
		function __getUrlAlias(numRec){
//console.log( numRec, p["data"].length, numRec >= p["data"].length );
			
			if( numRec >= p["data"].length ){
//console.log(p);
				if( typeof p["callback"] === "function"){
					p["callback"]( p["data"] );
				}
				return false;
			}
			
			var record = p["data"][numRec];
			var srcUrl = record["url"];
			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					"tableName": "url_alias",
					"targetFields" : ["dst"],
					"where" : [
						{"key" : "src", "value" : srcUrl, "compare": "="}
					]
				},
				"callback" : function( res ){
//console.log( res );
					if( res.length > 0 && 
							typeof res[0] !== "undefined"){
						p["data"][numRec]["url"] = res[0]["dst"];
						p["data"][numRec]["url"] = "#?q=" + p["data"][numRec]["url"];
					}
					numRec++;
					__getUrlAlias(numRec);						
				}//end callback
				
			});
		
		}//end __getUrlAlias
		
	}//end _replaceUrl()
*/

	function _nodeLoad( opt ){
//console.log("_nodeLoad()", arguments);
		var p = {
			"nid": null,
			"title" : "",
			"alias" : "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		webApp.db.query({
			"queryObj" : {
				"action" : "select",
				"tableName": "node",
				//"targetFields" : ["nid","vid","type","language","title","uid","status","created","changed","comment","promote","moderate","sticky","tnid","translate"],
				"targetFields" : ["title", "type"],
				"where" : [
					{"key" : "nid", "value" : p["nid"], "compare": "="}
				]
			},
			"callback" : function( res ){
//console.log( res );

			if( !res || res.length === 0){
				if( typeof p["callback"] === "function"){
					p["callback"](node);
				}
				return false;
			}

				var node = res[0];
				node["nid"] = p["nid"];
				
				__getNodeBody(function( body ){
//console.log( body );						
					node["body"] = body;
					
					__getNodeFields( node, function( fields ){
						node["fields"] = fields;
						
						_getNodeTerms({
							"nid" : node["nid"],
							"callback" : function(res){
//console.log(res);								
								node["nodeTerms"] = res;
								if( typeof p["callback"] === "function"){
									p["callback"](node);
								}
							}
						});//end get node terms
					});//end get fields node
				});//end get body
				
			}//end callback
		});
		
		return  false;

		function __getNodeBody( callback ){
			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					
					"tableName": "node_revisions",
					"targetFields" : ["body"],
					//"tableName": "field_data_body",
					//"targetFields" : ["body_value"],
					
					"where" : [
						{"key" : "nid", "value" : p["nid"], "compare": "="}
						//{"key" : "entity_id", "value" : p["nid"], "compare": "="}
						
					]
				},
				"callback" : function( res ){
//console.log( res );
					if( typeof callback === "function"){
						if(!res){
							callback( res );
						} else {
							callback( res[0]["body"]);
						}
					}
				}//end callback
			});
			return false;
		}//__getNodeBody()

		function __getNodeFields( node, callback ){
//console.log( "__getNodeFields()");
			var tableName = "content_type_" + node["type"];
			// var fieldsList = [
// "field_num_page_value",
// "field_author_value",
// "field_create_date_value",
			// "field_img1_gallery_fid",
			// "field_img1_gallery_list",
			// "field_img1_gallery_data",
// "field_title_value",
// "field_preview_img_value",
// "field_big_img_value",
// "field_original_img_value",
			// "field_info_value",
			// "field_info_format",
// "field_preview_img_preset_value",
// "field_zoom_img_value"
// ];
			var fieldsList = [];
//field_filename - NOT MULPTIPLE VALUES!!!
//-----------------

			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					"tableName": "content_node_field_instance",
					"targetFields" : ["field_name"],
					"where" : [
						{"key" : "type_name", "value" : node["type"], "compare": "="}
					]
				},
				"callback" : function( res ){
//console.log( res );
					if(!res){
						if( typeof callback === "function"){
							callback( res );
						}
						return false;
					}
					
					for( var n = 0; n < res.length; n++){
						var fieldName = res[n]["field_name"];
						fieldsList.push( fieldName + "_value");
					}
//console.log( fieldsList );
					
					webApp.db.query({
						"queryObj" : {
							"action" : "select",
							"tableName": tableName,
							"targetFields" : fieldsList,
							"where" : [
								{"key" : "nid", "value" : node["nid"], "compare": "="}
							]
						},
						"callback" : function( res ){
//console.log( res );
							if( typeof callback === "function"){
								callback( res[0] );
							}
						}//end callback
					});

				}//end callback
			});

//-----------------
			return false;
		}//__getNodeFields()

	}//end _nodeLoad()

/*
SELECT * 
FROM  `term_node` 
WHERE  `nid` =20
LIMIT 0 , 30

*/	
	function _getNodeTerms( opt ){
//console.log("_getNodeTerms()", arguments);
		var p = {
			"nid": null,
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		webApp.db.query({
			"queryObj" : webApp.app.formQueryObj({
				"queryTarget" : "getNodeTerms",
				"nid" : p["nid"]
				}),
			"callback" : function( res ){
//console.log(res);
				if( typeof p["callback"] === "function"){
					p["callback"](res);
				}
			}//end callback
		});
		
	}//end _getNodeTerms()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		saveData:	function( opt ){ 
			return _saveData( opt ); 
		},
		loadTemplates : function( postFunc ){
			return _loadTemplates( postFunc );
		},
		saveTemplates: _saveTemplates,
		
		query:	function( opt ){ 
			return _query( opt ); 
		},
		
		//async API
		//getVocabularyByName:	function( opt ){ 
			//return _getVocabularyByName( opt ); 
		//},
		//getTermByName:	function( opt ){ 
			//return _getTermByName( opt ); 
		//},
		getChildTerms:	function( opt ){ 
			return _getChildTerms( opt ); 
		},
		getTerminNodes:	function( opt ){ 
			return _getTerminNodes( opt ); 
		},
		getBlockContent:	function( opt ){ 
			return _getBlockContent( opt ); 
		},
		//replaceUrl:	function( opt ){ 
			//return _replaceUrl( opt ); 
		//},
		nodeLoad:	function( opt ){ 
			return _nodeLoad( opt ); 
		},
		getNodeTerms: _getNodeTerms
	};
}//end _db()
