/*
//======================== build block with static content
	var opt = {
		"name" : "block-1",
		"title" : "Tехника",
		"templateID" : "tpl-info_termins_tech-block",//optional
		"contentTpl" : "tpl-menu",//optional
		
		"content" : "<h3>static block-1</h3>" 
			or
		"content" : function( args ){ //function for getting content data
				var res = [.....];
				if( typeof args["callback"] === "function"){
					args["callback"]( res );
				}
		}//end callback
	};
	buildBlock( opt );
//========================
*/

var webApp = {
	
	"vars" : {
		"log" : [],
		 "import" : {
			"data_url" : "db/art.xml",
			"db_type" : "xml",
			//"data_url" :"db/art_correct.json",
			//"db_type" : "json",
			
			// "data_url" : "db/art_correct.csv",
			// "db_type" : "jcsv",
			"delimiterByFields" : ",",
			"delimiterByLines" : "\r\n"//,
			
			//"request_url" : "db/art_{{DATE}}.xml",
			//"request_url_PHP" : "api/request.php",
			//"request_url_ASPX" : "api/request.aspx"
		},
		"templates_url" : "tpl/templates.xml",
		//"testUrlPHP": "api/test.php",
		//"testUrlASPX": "api/test.aspx",
		"GET" : {},
		"pageContainer" : getById("page-container"),
		"wait" : getById("wait"),
		"waitWindow" : getById("wait-window"),
		"loadProgress" : getById("load-progress"),
		"loadProgressBar" : getById("load-progress-bar"),
		"saveProgressBar" : getById("save-progress-bar")
	},
	
	"init" : function( postFunc ){
//console.log("init webapp!", arguments);
console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.db.init();
		//webApp.iDBmodule.init();
		webApp.draw.init();
		webApp.app.init();
		
//console.log(iDBmodule, typeof iDBmodule);			
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
		//this.dBase();
	},//end init()
	
	"db" : _db(),
	"iDBmodule" : iDBmodule(),
	"draw" : _draw(),
	"app" : _app(),
	
	// "loadTemplates" : function( frame ){
// //console.log( frame.contentWindow.document.body.innerHTML);
// //console.log( frame.contentWindow.document.body.innerHTML.length );
		// var isLoaded = frame.contentWindow.document.body.innerHTML.length > 0;
// //console.log( isLoaded );
		// if( isLoaded ){
			// webApp.draw.formTemplates();
			// webApp.run();
		// } else {
// console.log("<p>webApp.init(),  error, dont load templates from <b class='text-danger'>IFRAME</b></p>");
			// return false;
		// }
	// },
	
	"run" : _runApp
	
};//end webApp()
console.log(webApp);

	//start
	webApp.draw.loadTemplatesAjax(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		_runApp();
	});

function _runApp(){
	webApp.init(function(){
		
		webApp.db.loadData(function(){
	//console.log(arguments);
	//console.log(window.location);	
				var parse_url = window.location.search; 
				if( parse_url.length > 0 ){
					webApp.vars["GET"] = parseGetParams(); 
					webApp.app.urlManager();
				} else {
					if( webApp.app.vars["init_url"] ){
						//parse_url = webApp.app.vars["init_url"].substring(1).split("&");
						parse_url = webApp.app.vars["init_url"].substring(2);
	//console.log(parse_url);					
					}
					webApp.vars["GET"] = parseGetParams( parse_url ); 
					webApp.app.urlManager();
				}
				
			}//end callback
		);
		
	});//end webApp initialize
}//end _runApp()


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
		"tables": {
			//// "taxonomy_menu" :[{ 
				//// "fields" : ["tid", "title"],
				//// "records" : []
			//// }],
			
			//"taxonomy_title" : {
				//"fields" : ["tid", "title"],
				//"records" : []
			//},  
			
			//"term_data" :{
				//"fields" : ["tid",  "vid", "name", "description", "weight"],
				//"records" : []
			//},  
			
			//"term_hierarchy" :{
				//"fields" : [ "tid",  "parent"],
				//"records" : []
			//},  
			
			//"term_image" :{
				//"fields" : ["tid",  "path"],
				//"records" : []
			//},
			
			//"term_node" :{
				//"fields" : ["nid",  "vid", "tid"],
				//"records" : []
			//},  
			
			////"term_relation" :[{}],  
			////"term_synonym" :[{}],  
			//"vocabulary" :{
				//"fields" : [ "vid", "name", "description", "help", "relations", "hierarchy",
//"multiple",
//"required",
//"tags",
//"module",
//"weight"
				//],
				//"records" : []
			//},
			
			//"url_alias" :{
				//"fields" : ["pid",  "src", "dst", "language"],
				//"records" : []
			//},  

			//"node" :{
				//"fields" : [
//"nid",
//"vid",
//"type",
//"language",
//"title",
//"uid",
//"status",
//"created",
//"changed",
//"comment",
//"promote",
//"moderate",
//"sticky",
//"tnid",
//"translate"
//],
				//"records" : []
			//},
			
			//"node_revisions" :{
				//"fields" : [
//"nid",
//"vid",
//"uid",
//"title",
//"body",
//"teaser",
//"log",
//"timestamp",
//"format"
//],
				//"records" : []
			//},  
			
			//"node_type" :{
				//"fields" : [
//"type",
//"name",
//"module",
//"description",
//"help",
//"has_title",
//"title_label",
//"has_body",
//"body_label",
//"min_word_count",
//"custom",
//"modified",
//"locked",
//"orig_type"
//],
				//"records" : []
			//}
			
		}//end tables
	};


	var _init = function( opt ){
//console.log("init _db: ", arguments);
console.log( "indexedDBsupport: " + _vars["indexedDBsupport"] );			
console.log( "webSQLsupport: " + _vars["webSQLsupport"] );			
console.log( "localStorageSupport: " + _vars["localStorageSupport"] );			
console.log( "Data store type: " + _vars["dataStoreType"] );			
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
	
	function _loadData( postFunc ){
//console.log("webApp.db.loadData() ", arguments);

		if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
			_vars["dataStoreType"] = false;
		} 

		switch(_vars["dataStoreType"]) {				
			
			case "indexedDB":
				webApp.iDBmodule.getListStores({//DB exists?
					"dbName" : webApp.iDBmodule.dbInfo["dbName"],
					"callback" : function( listStores ){
//console.log(listStores);				
						webApp.iDBmodule.checkState({
							"listStores" : listStores,
							"callback" : postFunc//draw page
						});
//console.log("test!");				
					}//end callback
				});
				return false;
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;
			
			default:
				if( webApp.vars["import"]["data_url"].length === 0 ){
		console.log("error in _db(), not find 'data_url' !");
					return false;
				}
				
				runAjax( {
					"requestMethod" : "GET", 
					"url" : webApp.vars["import"]["data_url"], 
					"callback": function( data ){
						
		var msg = "load " + webApp.vars["import"]["data_url"] ;
		console.log(msg);
		//webApp.vars["log"].push(msg);
		//console.log( "_postFunc(), " + typeof data );
		//console.log( data );
		//for( var key in data){
		//console.log(key +" : "+data[key]);
		//}
						if( !data ){
		console.log("error in _db(), _loadData(), not find 'data'.... ");			
							return false;
						}
						__parseAjax( data );
					}//end callback()
				});
			break;
		}//end switch
		
			//return false;
			
		function __parseAjax( data ){
			
			if( webApp.vars["import"]["db_type"].length === 0 ){
console.log("error in _db(), not find 'db_type' !");
				return false;
			}
			
			switch( webApp.vars["import"]["db_type"] ){
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
				
				//case "csv":
				case "jcsv":
					_parseCSVBlocks(data);
				break;
			}//end switch
			
			if( typeof postFunc === "function"){
				postFunc();
			}
		}//__parseAjax()
		
	}//end _loadData()
	
	
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
			if( !_vars["tables"][tableName] || 
					_vars["tables"][tableName]["records"].length === 0){
				
				if( webApp.db.vars["dataStoreType"] === "indexedDB"){
					//get records from iDB store
					webApp.iDBmodule.getRecords({
						"storeName" : tableName,
						"callback" : function( data){
//var msg = "restart db query, " + tableName;
//console.log( msg );
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
							
						}
					});
					return false;
				}

var msg = "db.query(), startQuery(), error, table " +tableName+ " empty.... ";
console.log( msg );
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
/*
					//record["checkResult"][n] = false;
					for( var n2 = 0; n2 < list_values.length; n2++){
//console.log(n2, list_values[n2]);

						//"IN"
						if( !condition["zapret"] ){

// if( (record["KOD_MAIN"] === "1" && record["NOMER"] === "170") || 
// (record["KOD_MAIN"] === "5" && record["NOMER"] === "170")
// ){
// console.log(key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record[key] === list_values[n2].toString() );
// }
							if( record[key] === list_values[n2].toString() ){
								record["checkResult"][n] = true;
//console.log( key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record["checkResult"] );
								break;
							} //else {
								//record["checkResult"][n] = false;
							//}
							
						} else { //"NOT IN"
						
							if( record[key] !== list_values[n2].toString() ){
//console.log(record[key], key, typeof record[key], list_values[n2], typeof list_values[n2] );
								record["checkResult"][n] = true;
								break;
							}
							
						}
						
					}//next
*/					
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

	function _parseCSVBlocks( data ){
		var importData = data.split( webApp.vars["import"]["delimiterByLines"] );
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
						webApp.vars["import"]["delimiterByFields"] 
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
	
	
//async API

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


	function _getChildTerms( opt ){
		var options = {
			"vid" : null,
			"tid" : null,
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( !options["tid"] ){
_log("<p>db.getChildTerms(),   error, options[tid]: <b class='text-danger'>"+options["tid"]+"</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "term_hierarchy",
				"targetFields" : [
	"tid",
	"parent"
	],
				"where" : [
					{"key" : "parent", "value" : options["tid"], "compare": "="}
				]
			},
			"callback" : _postQuery
		};
		webApp.db.query( queryParams);

		function _postQuery( result ){
//console.log( arguments);
			var _listChildTerms = [];
			for( var n = 0; n < result.length; n++){
				_listChildTerms.push( result[n]["tid"] );
			}//next
	//console.log(_listChildTerms);
			
			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					"tableName": "term_data",
					"targetFields" : [
	"tid",
	"vid",
	"name",
	"description",
	"weight"
	],
					"where" : [
						{"key" : "vid", "value" : options["vid"], "compare": "="},
						{"logic": "AND", "key" : "tid", "value" : _listChildTerms, "compare": "="}
					]
				},
				"callback" : function( res ){

					//add url aliases
					for( var n = 0; n < res.length; n++){
						//res[n]["url"] = "?q=taxonomy/term/" + res[n]["tid"];
						res[n]["url"] = "#?q=taxonomy&tid=" + res[n]["tid"];
					}//next
//console.log("end test query!!!", res);

					//_replaceUrl({
						//"data" : res,
						//"callback" : function(res){
							if( typeof options["callback"] === "function"){
								options["callback"](res);
							}
						//}//end callback
					//});

				}//end callback
				
			});
			
		}//end _postQuery()
		
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
		var options = {
			"vocName" : "",
			"termName" : "",
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["vocName"].length === 0 ){
_log("<p>db.getBlockContent(),   error, vocName <b class='text-danger'>is empty</b></p>");
			return false;
		}
		
		if( options["termName"].length === 0 ){
_log("<p>db.getBlockContent(),   error, termName <b class='text-danger'>is empty</b></p>");
			return false;
		}

		//get block data, run queries...
		_getVocabularyByName({
			"vocName" : options["vocName"],
			"callback" : function(res){
//console.log(res, res.length );	
				if( res.length === 0 ){
					if( typeof options["callback"] === "function"){
						options["callback"](res);
					}
					return false;
				}
				
				var _vid = res[0]["vid"];
				_getTermByName({
					"vid" : _vid, 
					"termName" : options["termName"],
					"callback" : function(res){
//console.log(res, res.length );
						if( res.length === 0 ){
							if( typeof options["callback"] === "function"){
								options["callback"](res);
							}
							return false;
						}
						var _tid = res[0]["tid"];
//console.log( _vid, _tid );			

						_getChildTerms({
							"vid" : _vid,
							"tid" : _tid,
							"callback" : function(res){
//console.log(res);
								if( typeof options["callback"] === "function"){
									options["callback"](res);
								}
							}//end callback
						});
						
					}//end callback
				});
				
			}//end callback
		});
		
	}//end _getBlockContent()

	
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
//console.log( node );
				var node = res[0];
				node["nid"] = p["nid"];
				
				__getBody(function( body ){
//console.log( res );						
					node["body"] = body;
					
					__getFields( node, function( fields ){
						node["fields"] = fields;
						if( typeof p["callback"] === "function"){
							p["callback"](node);
						}
						
					});//end get fields node
					
				});
			}//end callback
		});
		
		return  false;

		function __getBody( callback ){
			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					"tableName": "node_revisions",
					"targetFields" : ["body"],
					"where" : [
						{"key" : "nid", "value" : p["nid"], "compare": "="}
					]
				},
				"callback" : function( res ){
//console.log( res );
					if( typeof callback === "function"){
						callback( res[0]["body"]);
					}
				}//end callback
			});
			return false;
		}//__getBody()

		function __getFields( node, callback ){
//console.log( "__getFields()");
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
		}//__getFields()

	}//end _nodeLoad()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		loadData:	function( opt ){ 
			return _loadData( opt ); 
		},
		query:	function( opt ){ 
			return _query( opt ); 
		},
		//async API
		getVocabularyByName:	function( opt ){ 
			return _getVocabularyByName( opt ); 
		},
		getTermByName:	function( opt ){ 
			return _getTermByName( opt ); 
		},
		getChildTerms:	function( opt ){ 
			return _getChildTerms( opt ); 
		},
		getTerminNodes:	function( opt ){ 
			return _getTerminNodes( opt ); 
		},
		
		getBlockContent:	function( opt ){ 
			return _getBlockContent( opt ); 
		},
		replaceUrl:	function( opt ){ 
			return _replaceUrl( opt ); 
		},
		nodeLoad:	function( opt ){ 
			return _nodeLoad( opt ); 
		}
	};
}//end _db()



function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {};
	_vars["templates"] = {};

	var _init = function(){
//console.log("init _draw");
	};
	
/*
	//function _formTemplates( frame ){
	function _formTemplates(){
		//var $tplDoc = frame.contentDocument;
		//https://learn.javascript.ru/iframes
		//var $tplDoc = frame.contentWindow.document;
		
		//_vars["tplDoc"] = window.frames[ "tpl_frame" ].document;
		var $tplDoc = window.frames[ "tpl_frame" ].document;
//console.log( window.frames[ "tpl_frame" ].document );

		_vars["templates"]["tpl-list"] = _getTplMod("tpl-list", $tplDoc);
		_vars["templates"]["tpl-list_list"] = _getTplMod("tpl-list_list", $tplDoc);
		_vars["templates"]["tpl-menu"] = _getTplMod("tpl-menu", $tplDoc);
		_vars["templates"]["tpl-menu_list"] = _getTplMod("tpl-menu_list", $tplDoc);
		_vars["templates"]["tpl-termin_nodes"] = _getTplMod("tpl-termin_nodes", $tplDoc);
		_vars["templates"]["tpl-termin_nodes_list"] = _getTplMod("tpl-termin_nodes_list", $tplDoc);
		
		_vars["templates"]["tpl-node"] = _getTplMod("tpl-node", $tplDoc);
		_vars["templates"]["tpl-node"] = _vars["templates"]["tpl-node"].replace(/#/g, "");
		
		_vars["templates"]["tpl-block-1"] = _getTplMod("tpl-block-1", $tplDoc);
		_vars["templates"]["tpl-info_termins_style-block"] = _getTplMod("tpl-info_termins_style-block", $tplDoc);
		_vars["templates"]["tpl-info_termins_tech-block"] = _getTplMod("tpl-info_termins_tech-block", $tplDoc);
		_vars["templates"]["tpl-info_termins_genre-block"] = _getTplMod("tpl-info_termins_genre-block", $tplDoc);
		_vars["templates"]["tpl-block-content"] = _getTplMod("tpl-block-content", $tplDoc);
	}//end _formTemplates()
	
	function _getTplMod( id, $tplDoc ){
//console.log($tplDoc);		
		var tpl = _getById(id, $tplDoc );
		var html = tpl.innerHTML;
		return html;
		
		function _getById( id, $doc ){
//console.log(id, $doc);		
			if( $doc.querySelector ){
				var obj = $doc.querySelector("#"+id);
				return obj;
			}
			
			if( $doc.getElementById ){//old browsers
				var obj = $doc.getElementById(id);
				return obj;
			}
			
			if( $doc.all ){//old IE
				var obj = $doc.all[id];
				return obj;
			}
		}//end _getById()
	}//end _getTplMod()
*/	
/*
	function _getTpl( id ){
//console.log(id);
		var tpl = getById(id);
		var html = tpl.innerHTML;
		
		//clear document
		//if ( tpl.parentNode ) {
			//tpl.parentNode.removeChild( tpl );
		//}
		//tpl.removeChild( tpl );
		
		//remove all child nodes
		// while (tpl.firstChild) {
		  // tpl.removeChild(tpl.firstChild);
		// }

//console.log( tpl, html );
//for( var key in tpl){
//console.log( key +" : "+ tpl[key] );
//}
		
		//if template contain list items
		// var list = document.getElementsByClassName("tpl-list");
// console.log( list, list.length );
		// if( list.length > 0){
			// var listHtml = list[0].outerHTML;
			// //tpl.remove(list);
			// return {
				// "html" : html,
				// "listHtml" : listHtml
			// };
		// }
		
		return html;
	}//end _getTpl()
*/	
	function _loadTemplatesAjax( callback ){
		
		if( webApp.vars["templates_url"].length === 0 ){
console.log("error in draw.loadTemplatesAjax(), not find 'templates_url' !");
			return false;
		}
		
		runAjax( {
			"requestMethod" : "GET", 
			"url" : webApp.vars["templates_url"], 
			"callback": function( data ){
var msg = "load " + webApp.vars["templates_url"] ;
console.log(msg);
//webApp.vars["log"].push(msg);
//console.log( data );
				if( !data ){
console.log("error in draw.loadTemplatesAjax(), not find data templates'....");
					return false;
				}
				
				xmlNodes = _parseXmlToObj( data );
//console.log(xmlNodes);
				if( xmlNodes.length > 0 ){
					for( var n= 0; n < xmlNodes.length; n++){
						var key = xmlNodes[n]["name"];

						var value = xmlNodes[n]["html_code"]
						.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
						.replace(/\t/g,"")
						.replace(/\n/g,"");
						
						_vars["templates"][key] = value;
					}//next
					
					if( typeof callback === "function"){
						callback();
					}
					
				} else {
console.log("error in draw.loadTemplatesAjax(), cannot parse templates data.....");
				}

			}//end callback()
		});
		
	}//end _loadTemplatesAjax()


	var _insert = function( opt ){
		
		var options = {
			"templateId": false,
			"data" : false
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log("draw.insert(), ", options);

		var templateId = options["templateId"];
		if( !_vars["templates"][templateId] ){
_log("<p>draw.insert(),  error, not find template, id: <b class='text-danger'>" + templateId + "</b></p>");
			return false;
		}
		
		if( !options["data"] ){
_log("<p>draw.insert(),   error, data: <b class='text-danger'>" + options["data"] + "</b></p>");
			return false;
		}
		
		// var html = _vars["templates"][templateId];
		// //var block_title = options["data"]["block_title"];
		// //html = html.replace("{{block_title}}", block_title);
		// for( var key in options["data"]){
			
			// if( typeof options["data"][key] === "string"){
				// html = html.replace("{{"+key+"}}", options["data"][key]);
			// }
			
			// //form list items
			// if( typeof options["data"][key] === "object" &&
				// options["data"][key].length > 0 ){
					
				// // html = html
				// // .replace("{{url}}", options["data"][key][0]["url"])
				// // .replace("{{name}}", options["data"][key][0]["name"]);
				
				// var items = options["data"][key];
				// var itemTpl = _vars["templates"][templateId+"_list"];
				// var listHtml = "";

				// for( var n = 0; n < items.length; n++){
					// listHtml += itemTpl
					// .replace("{{url}}", items[n]["url"])
					// .replace("{{name}}", items[n]["name"]);
				// }//next
				
			// }
			
		// }//next
		
		// var tpl = getById(templateId);
		// tpl.innerHTML = html;
		// tpl.className = "";
		
		// //insert list
		// var list = getById( templateId+"_list" );
// //console.log(list, listHtml, list.innerHTML);
		// list.innerHTML = listHtml;
		
	};//end _insert()
	
	var _insertBlock = function( opt ){
		
		var options = {
			"templateID": false,
			"locationID": "block-1",
			"title" : "block",
			"content" : false,
			"callback":null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log("draw.insertBlock(), ", options);

		var templateID = options["templateID"];
		if( !_vars["templates"][templateID] ){
_log("<p>draw.insertBlock(),  error, not find template, id: <b class='text-danger'>" + templateID + "</b></p>");
			return false;
		}
		
		// if( !options["content"] ){
// _log("<p>draw.insertBlock(),   error, content: <b class='text-danger'>" + options["content"] + "</b></p>");
			// return false;
		// }
		
		var html = _vars["templates"][templateID];
		html = html.replace("{{block_title}}", options["title"]);
		html = html.replace("{{content}}", options["content"]);
		
		var loc = getById( options["name"] );
if( loc){
	loc.innerHTML = html;
}		
		//loc.className = "";//show block
		
		if( typeof options["callback"] === "function"){
			options["callback"]();
		}
	};//end _insertBlock()


	function _wrapContent( opt ){
		var p = {
			"data": null,
			//"type" : "",
			"wrapType" : "menu",
			"templateID" : false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["data"] ){
_log("<p>wrapContent(), error, var data: <b class='text-danger'>" + p["data"] + "</b></p>");
			return false;
		}
		if( !p["templateID"] ){
_log("<p>wrapContent(), error, var templateID <b class='text-danger'>is empty</b></p>");
			return false;
		}
		
		if( !_vars["templates"][p.templateID] ){
_log("<p>draw.wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID + "</b></p>");
			return false;
		}
		var html = "";
			
		switch( p["wrapType"] ){
			case "menu" :
				html = __formMenuHtml( _vars["templates"][ p.templateID ] );
			break;
			
			case "node" :
				html = __formNodeHtml( _vars["templates"][ p.templateID ] );
			break;
		}//end switch
		
//console.log(html);
		return html;

		function __formMenuHtml( _html ){
			
			var listHtml = "";
			for( var key in p["data"]){
//console.log( key );
//console.log( p["data"][key], typeof p["data"][key], p["data"].length);
				
				//if( typeof p["data"][key] === "string"){
					//_html = _html.replace("{{"+key+"}}", p["data"][key]);
				//}
				
				//form list items
				if( typeof p["data"][key] === "object"){
						
					// _html = _html
					// .replace("{{url}}", p["data"][key]["url"])
					// .replace("{{name}}", p["data"][key]["name"]);
					
					var items = p["data"][key];
					
					if( !_vars["templates"][ p.templateID+"_list"] ){
var msg = "<p>draw.wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID+"_list" + "</b></p>";
console.log(msg);							
_log(msg);
						return false;
					}
					var itemHtml = _vars["templates"][ p.templateID+"_list"];
//console.log(itemHtml);

					for( var key2 in items){
//console.log(key2, items[key2]);
						if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
//console.log(key2, items[key2]);
							itemHtml = itemHtml.replace("{{"+key2+"}}", items[key2]);
						}
					}//next
					listHtml += itemHtml;
//console.log(listHtml);
				}
				
			}//next
			_html = _html.replace("{{list}}", listHtml);
			
			return _html;
		}//end __formMenuHtml

		function __formNodeHtml( _html ){
			
			for( var key in p["data"]){
//console.log(key, p["data"][key]);
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, p["data"][key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), p["data"][key]);
				}
			}//next
			
			return _html;
		}//end __formNodeHtml()
		
	}//end _wrapContent

	
	// public interfaces
	return{
		vars : _vars,
		// testing : {
			// getTpl : _getTpl
		// },
		init:	function(){ 
			return _init(); 
		},
		insert:	function( opt ){ 
			return _insert( opt ); 
		},
		insertBlock:	function( opt ){ 
			return _insertBlock( opt ); 
		},
		wrapContent:	function( opt ){ 
			return _wrapContent( opt ); 
		},
		//formTemplates : _formTemplates,
		loadTemplatesAjax : _loadTemplatesAjax
	};
}//end _draw()



function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"init_url" : "#?q=node&nid=20",
		"runtime": [],//time for generate blocks
		"node": [{}],
		"queries": {},
		"blocks" : [
			{
				"name" : "block-1",
				"title" : "Title", 
				"templateID" : "tpl-block-1",
				"content" : "<u>static text in block-1</u>"//,
				//"visibility" : "frontPage"
			},
			{
				"name" : "block-style",
				"title" : "стиль", //"техника",//"жанр",
				"templateID" : "tpl-info_termins_style-block",//location and style for block
				"contentTpl" : "tpl-menu",
				"content" : function( args ){//function for getting content data
					webApp.db.getBlockContent({
						"vocName" : "info",
						"termName" : "стиль",
						"callback" : function(res){
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
					
					// webApp.db.query({
						// "queryObj" : _formQueryObj({
							// "queryTarget" : "getVocabulary",
							// "vocName" : "info", 
							// "termName" : "стиль"
							// }),
						// "callback" : function( res ){
	// //console.log("end test query!!!", res);
							// if( typeof args["callback"] === "function"){
								// args["callback"]( res );
							// }
						// }//end callback
					// });
					
				},//end callback()
				"visibility" : "frontPage"
			},
			{
				"name" : "block-tech",
				"title" : "Tехника",
				"templateID" : "tpl-info_termins_tech-block",
				"contentTpl" : "tpl-menu",
				"content" : function( args ){//function for getting content data
					webApp.db.getBlockContent({
						"vocName" : "info",
						"termName" : "техника",
						"callback" : function(res){
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
				
					// webApp.db.query({
						// "queryObj" : _formQueryObj({
							// "queryTarget" : "getVocabulary",
							// "vocName" : "info", 
							// "termName" : "техника",
						// }),
						// "callback" : function( res ){
	// //console.log("end test query!!!", res);
							// if( typeof args["callback"] === "function"){
								// args["callback"]( res );
							// }
						// }//end callback
					// });
					
				},//end callback()
				"visibility" : "frontPage"
			},
			{
				"name" : "block-genre",
				"title" : "Жанр",
				"templateID" : "tpl-info_termins_genre-block",
				"content" : function( args ){//function for getting content data
					webApp.db.query({
						"queryObj" : _formQueryObj({
							"queryTarget" : "getVocabulary",
							"vocName" : "info", 
							"termName" : "жанр"
							}),
						"callback" : function( res ){
	//console.log("end test query!!!", res);
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
				},//end callback()
				"visibility" : "frontPage"
			}
		
		]
	};// _vars
	
	var _init = function( opt ){
console.log("init app!");
		defineEvents();
	};//end _init()
	
	function defineEvents(){
//console.log( webApp.vars.pageContainer );

		if( webApp.vars.pageContainer ){
			webApp.vars.pageContainer.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
//console.log( this );//page-container
console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
				//event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
				//event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
				
				if( target.tagName === "A"){
					if ( target.href.indexOf("#") !== -1){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							var search = target.href.split("?"); 
							var parseStr = search[1]; 
		//console.log( search, parseStr );
							if( parseStr.length > 0 ){
								webApp.vars["GET"] = parseGetParams( parseStr ); 
								webApp.app.urlManager( target );
							} else {
		console.log( "Warn! error parse url in " + target.href );
							}
					}
				}
				
			}//end event
		}
		
	}//end defineEvents()
	
	function _urlManager( target ){
//console.log(target);
		switch( webApp.vars["GET"]["q"] ) {
			
			case "hide-log":
				var log = getById("log-wrap");
				log.style.display="none";
			break;
			case "view-log":
				var log = getById("log-wrap");
				log.style.display="block";
			break;
			case "toggle-log":
				var log = getById("log-wrap");
//console.log(log.style.display);
				if( log.style.display==="none"){
					log.style.display="block";
				} else {
					log.style.display="none";
				}
			break;
			
			case "clear-log":
				var log = getById("log");
				log.innerHTML="";
			break;
			
			case "node":
console.log("-- start build page --");
				var timeStart = new Date();
				webApp.app.buildPage({
					"nid" : webApp.vars["GET"]["nid"],
					"callback" : function(){
console.log("-- end build page --");
					var timeEnd = new Date();
					var ms = timeEnd.getTime() - timeStart.getTime();
					var msg = "Generate page nid: " + this.nid +", runtime:" + ms / 1000 + " sec";
_log("<p>"+msg+"</p>");			
					webApp.app.vars["runtime"].push({
						"source" : msg,
						"ms" : ms,
						"sec" : ms / 1000
					});

					}//end callback
				});
			break;

//taxonomy&?tid=105
//taxonomy/term/105
//category/info/stil/modern
			case "taxonomy":
				if( webApp.vars["GET"]["tid"] ){
					
					var block_title = "";
					if( target.innerHTML.length > 0){
						block_title = target.innerHTML;
					}
					
					_buildBlock({//draw content block
						"name" : "block-content",
						//"title" : "termin_nodes", 
						"title" : block_title, 
						"templateID" : "tpl-block-content",
						"contentTpl" : "tpl-termin_nodes",
						"content" : function(args){
							
							webApp.db.getTerminNodes({//get list termin nodes
								"tid" : webApp.vars["GET"]["tid"],
								"callback" : function( res ){
//console.log(res);
									if( typeof args["callback"] === "function"){
										args["callback"]( res );
									}

								}//end callback
							});
						}//end callback
						
					});
					
					
				} else {
console.log("Warn! not find 'tid' in query string", webApp.vars["GET"]["tid"] );
				}
				
			break;
			
				

			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()

	
	
	function _formQueryObj(opt){
		var p = {
			queryTarget : "",//"getVocabulary"
			vocName : "",//"info",
			termName : ""//"жанр"
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( p["queryTarget"].length === 0 ){
console.log("error in _formQueryObj(), empty 'queryTarget'....");
			return false;
		}

		switch( p.queryTarget ) {
			
			case "getVocabulary":
				if( p["vocName"].length === 0 ){
console.log("error in _formQueryObj(), empty 'vocabularyName'....");
					return false;
				}
				if( p["termName"].length === 0 ){
console.log("error in _formQueryObj(), empty 'termName'....");
					return false;
				}
				return __formVocabularyQuery();
			break;

		}//end switch

		function __formVocabularyQuery(){
/*
		//form data queries
	//1. select vid from vocabulary where name="info" -- 5
	//1. select tid from term_data where name="жанр" -- 95
	//2. select tid from term_hierarchy where parent=95 -- "100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226"
	//3. select name from term_data where vid=5 and tid in ("100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226")
	//4. select dst from url_alias where src IN ("taxonomy/term/100", "taxonomy/term/101".....)
//test subQuery!!!!!		
				// var queryStr = "\
	// select name from term_data where vid=(\
		// select vid from vocabulary where name='info'\
	// ) and tid in (\
		// select tid from term_hierarchy where parent=(\
			// select tid from term_data where name='жанр'\
		// )\
	// )";
*/		
			var subQuery1 = {
				"action" : "select",
				"tableName": "vocabulary",
				"targetFields" : ["vid"],
				"where" : [
					{"key" : "name", "compare": "=", "value" : p.vocName}
				]
			};
			
			var subQuery3 = {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "name", "compare": "=", "value" : p.termName}
				]
			};
			var subQuery2 = {
				"action" : "select",
				"tableName": "term_hierarchy",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "parent", "compare": "=", "value" : subQuery3}
					//{"key" : "parent", "compare": "=", "value" : 95}
				]
			};

			var baseQuery = {
					"action" : "select",
					"tableName": "term_data",
					"targetFields" : [
	"tid",
	"vid",
	"name"//,
	//"description",
	//"weight"
	],
					"where" : [
						{"key" : "vid", "compare": "=", "value" : subQuery1},
						{"logic": "AND", "key" : "tid", "compare": "=", "value" : subQuery2}
					]
				};
				
			//_vars["queries"]["getTermGenre"] = baseQuery;
//console.log(baseQuery);
			return baseQuery;
		}//end __formVocabularyQuery()
		
	}//end _formQueryObj()
	
	
	var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);

		var timeStart = new Date();
		var p = {
			"title": "block title",
			"content" : "",
			//"contentType" : "",
			"templateID" : "tpl-block",
			"contentTpl" : "tpl-list",//"tpl-menu"
			"callback" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);			
				webApp.app.vars["runtime"].push({
					"source" : msg,
					"ms" : ms,
					"sec" : ms / 1000
				});
				
				if( typeof p["callback2"] === "function"){
					p["callback2"]();//return from _buildBlock()
				}
				
			},//end callback
			"callback2" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
	
		// if( p["content"].length === 0 ){
// _log("<p>app.buildBlock,   error, content is <b class='text-danger'>empty</b></p>");
			// return false;
		// }

		//dynamic form content
		if( typeof p["content"] === "function"){
			p["content"]({
				"callback" : function( res ){
//console.log(res);								
					var html = webApp.draw.wrapContent({
						"data" : res,
						//"type" : "menu",//"list"
						//"contentType" : p["contentType"],
						"templateID" : p["contentTpl"]
					});
					
//console.log(html);								
					//var html = "<h1>Test!!!</h1>";
					if( html && html.length > 0){
						p["content"] = html;
						webApp.draw.insertBlock( p );
					}
					
				}
			});
		} else {
			webApp.draw.insertBlock( p );
		}

	};//end _buildBlock()

	
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		if( webApp.vars["wait"] ){
			webApp.vars["wait"].className="modal-backdrop in";
			webApp.vars["wait"].style.display="block";
		}
		
		var p = {
			"nid": null,
			//"templateID" : "tpl-page"
			"title" : "",
			//content : ""
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(options);

	//======================= dynamic block
		// var _vocabularyName = "info";
		// var _termName = "жанр";//"техника";//"стиль";
		
		//get block data
		// webApp.db.getVocabularyByName({
			// "vocName" : _vocabularyName,
			// "callback" : function(res){
	// //console.log(res, res.length );	
				// var _vid = res[0]["vid"];
				// webApp.db.getTermByName({
					// "vid" : _vid, 
					// "termName" : _termName,
					// "callback" : function(res){
	// //console.log(res, res.length );
						// var _tid = res[0]["tid"];
	// //console.log( _vid, _tid );			

						// webApp.db.getChildTerms({
							// "vid" : _vid,
							// "tid" : _tid,
							// "callback" : function(res){
								// _drawBlockGenre( res );
							// }//end callback
						// });
						
					// }//end callback
				// });
				
			// }//end callback
		// });
		
		//draw page content
		if( p["nid"] ){
			
			//get node from DB
			var node = webApp.db.nodeLoad({
				"nid": p["nid"],
				//"title": options["title"]
				"callback" : function( node ){
console.log( node );

/*
					var fieldList = [];
					// // var fieldList = [{
						// // "name" : "field_title_value", 
						// // "value" : "Ballet Mistress, 1994, Майкл Паркес"
					// // }];
					
					for( var field in node["fields"] ){
						if( !node["fields"][field] ){
							continue;
						}
						if( node["fields"][field] === "NULL" ){
							continue;
						}
						fieldList.push({
							"name": field,
							"value" : node["fields"][field]
						});
					}//next
//console.log( fieldList );	
					
					var fields_html = webApp.draw.wrapContent({
						"data" : fieldList,
						"templateID" : "tpl-list-fields"
					});
					
//console.log( fields_html);
					if( fields_html && fields_html.length > 0){
						html += fields_html;
					}
*/
					var _data = {};
					//var _data = {
						//"body" : node["body"],
						//"field_author_value" : "Майкл Паркес"
					//};
					
					//add node BODY to the content block
					//if( node["body"].length > 0 ){
						_data["body"] = node["body"];
					//}
					
					//add node FIELDS to the content block
					for( var field in node["fields"] ){
						if( !node["fields"][field] ){
							continue;
						}
						if( node["fields"][field] === "NULL" ){
							continue;
						}
						_data[field] = node["fields"][field];
					}//next
					
					var opt2 = {
						"data" : _data,
						"templateID" : "tpl-node",
						//"templateID" : "tpl-node_photogallery_image",
						"wrapType" : "node",
					};
//console.log( node["type"] );
					if( node["type"].length > 0 ){
						opt2["templateID"] = opt2["templateID"]+"_"+node["type"];
					}
					var _html = webApp.draw.wrapContent(opt2);
//console.log( _html);

					if( _html && _html.length > 0){
						//html += _html;
					} else {
console.log("Error form node html!!!");
					}
					
					
					//draw content block
					//if( html.length > 0 ){
						_buildBlock({
							"name" : "block-content",
							"title" : node["title"], 
							"templateID" : "tpl-block-content",
							//"content" : _formNodeContent(node)//node["content"]
							"content" : _html
						});
					//}

					
					_buildSidebar({
						"blocks" : _vars["blocks"],
						"callback" : function(){
							if( typeof p["callback"] === "function"){
								p["callback"]();//return from _buildPage()
							}
						}//end callback
					});
					
					
				}//end callback
			});
			
		} else {
console.log( p["nid"] );			
_log("<p>Warn! no page,  'nid' <b class='text-danger'>is empty</b></p>");			
		}

		// //draw sidebar blocks
		// for( var n = 0; n < _vars["blocks"].length; n++){
			// var opt2 = _vars["blocks"][n];
// //console.log(opt2["visibility"], options["title"]);				
			// if( opt2["visibility"]){
				// if( opt2["visibility"].indexOf( p["title"] ) !== -1 ){
					// _buildBlock( opt2 );
				// }
			// } else {
				// _buildBlock( opt2 );
			// }
			
		// }//next
			
		if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="";
			webApp.vars["wait"].style.display="none";
		}
			
	};//end _buildPage()
	
	function _buildSidebar(opt){
		var p = {
			"blocks": null,
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);		

		if( p["blocks"].length === 0){
			var msg = "Warning! no sidebar blocks...";
console.log(msg);			
			return false;
		}
		
		//recursively build blocks
		p["counter"] = 0;
		__buildBlock();
		
		
		function __buildBlock(){
			var n  = p["counter"];
			var block = p["blocks"][n];
			
			block["callback2"] = function(){
//console.log(block);				
				p["counter"]++;
				if( p["counter"] < p["blocks"].length){
					__buildBlock();
				} else {
					if( typeof p["callback"] === "function"){
						p["callback"]();//return from _buildSidebar()
					}
				}
			}//end callback2
			
			_buildBlock( block );
		}//end __buildBlock()
		
	}//end _buildSidebar
	
	
	
	function _serverRequest( opt ){
		var p = {
			//"date": null,
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);		
/*
//---------------------- Server TESTS
		if( typeof webApp.vars["supportPHP"] === "undefined" ||
				typeof webApp.vars["supportASPX"] === "undefined"){
			__testPHP(function( supportPHP ){
console.log("supportPHP:" + supportPHP);

				if( supportPHP ){
					__processRequest();
				} else {
					
					__testASPX(function( supportASPX ){
		console.log("supportASPX:" + supportASPX);
						// if( supportASPX ){
							// __processRequest();
						// } else {
							// //next test....
						// }
						__processRequest();
						
					})//end test;
				}
				
			})//end test;
		}
//---------------------
*/
		__processRequest();

		function __processRequest(){
			
			//form url
			//var url = webApp.vars["import"]["request_url"];
			var url = webApp.vars["import"]["data_url"];
			// if( webApp.vars["supportPHP"] ){
				// url = webApp.vars["import"]["request_url_PHP"];
			// }
			// if( webApp.vars["supportASPX"] ){
				// url = webApp.vars["import"]["request_url_ASPX"];
			// }
			
			// if( p["date"] && p["date"].length > 0 ){
				// url +=  "?date="+p["date"];
			// }
			//var url = webApp.vars["import"]["data_url"] + "?date="+p["date"];
			
			runAjax( {
				"requestMethod" : "GET", 
				//"requestMethod" : "HEAD", 
				"url" : url, 
				"onProgress" : function(e){
					var percentComplete = 0;
					if(e.lengthComputable) {
						percentComplete = Math.ceil(e.loaded / e.total * 100);
						if( webApp.vars["loadProgress"] ){
							webApp.vars["loadProgress"].value = percentComplete;
						}
						if( webApp.vars["loadProgressBar"] ){
							webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
						}

					}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

					
				},//end onProgress()
				"callback": function( data ){
var msg = "load " + url ;
console.log(msg);

					if( !data || data.length === 0){
	console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					if( typeof p["callback"] === "function"){
						p["callback"](data);
						return false;
					} 
					
				}//end callback()
			});
		}//end __processRequest()
/*
		function __testPHP( callback ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : webApp.vars["testUrlPHP"], 
				"callback": function( data ){
//console.log(data, typeof data, data.length, data[0]);

					if( !data || data.length === 0){
console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					webApp.vars["supportPHP"] = false;
					if (data[0] === "4"){//test success, result of adding 2+2 on PHP
						webApp.vars["testPHP"] = true;
					}
					
					if( typeof callback === "function"){
						callback( webApp.vars["supportPHP"] );
						return false;
					} 
					
				}//end callback()
			});
		}//end __testPHP()
		
		function __testASPX( callback ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : webApp.vars["testUrlASPX"], 
				"callback": function( data ){
//console.log(data, typeof data, data.length, data[0]);

					if( !data || data.length === 0){
console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					webApp.vars["supportASPX"] = false;
					if (data[0] === "4"){//test success, result of adding 2+2 on ASPX
						webApp.vars["supportASPX"] = true;
					}
					
					if( typeof callback === "function"){
						callback( webApp.vars["supportASPX"] );
						return false;
					} 
					
				}//end callback()
			});
		}//end __testASPX()
*/		
	}//end _serverRequest()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		urlManager:	function( target ){ 
			return _urlManager( target ); 
		},
		
		buildBlock:	function(opt){ 
			return _buildBlock(opt); 
		},
		buildPage:	function(opt){ 
			return _buildPage(opt); 
		},
		serverRequest:	function(opt){ 
			return _serverRequest(opt); 
		}
	};
}//end _app()



// function _drawBlockGenre( res ){

	// var opt = {
		// "templateId" : "tpl-info_termins_genre-block"
	// };

	// var  data = {
		// "block_title" : "Genre",
		// "items" : [
			// // {
				// // "name" : "миниатюра",
				// // "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
			// // },
			// // {
				// // "name" : "иллюстрация",
				// // "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/illustration"
			// // }
		// ]
	// };
	
	// for( var n = 0; n < res.length; n++){
		// var item = {
			// "name" : res[n]["name"],
			// "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
		// };
		// data["items"].push(item);
	// }//next
	
	// opt["data"] = data;
	// webApp.draw.insert( opt );
// }//end _drawBlockGenre()


// function create_MSXML(){// create XML ActiveXObject for Internet Explorer before version 9
	// if (typeof (ActiveXObject) === "undefined") {
		// return false;
	// }
	// var progIDs = [
					// "Msxml2.DOMDocument.6.0", 
					// "Msxml2.DOMDocument.5.0", 
					// "Msxml2.DOMDocument.4.0", 
					// "Msxml2.DOMDocument.3.0", 
					// "MSXML2.DOMDocument", 
					// "MSXML.DOMDocument"
				  // ];
				  
	// for(var n = 0; n < progIDs.length; n++) {
		// try { 
			// var xml = {
				// "xml_obj" : new ActiveXObject( progIDs[n] ),
				// "version" : progIDs[n]
			// }
			// return xml; 
		// } 	catch(e) {
// // console.log("error: " + e);
			// // for( var item in e )	{
// // console.log( item + ": " + e[item]);
			// // }//next
		// };
	// }//end try
// }//end create_MSXML()


/*
	function _parseXML(xml){

		//if(window.ActiveXObject || "ActiveXObject" in window){
		// if( window.ActiveXObject ){
// console.log("ActiveXObject support: " + window.ActiveXObject + ", use MSXML");
		// }
		// else {
// console.log("ActiveXObject not support,  use window.DOMParser");
		// }
		

// //console.log( document.implementation );
		// if( document.implementation ){
			// var hasXmlDom = document.implementation.hasFeature("XML", "2.0");
			// var msg = "support DOM Level 2 XML - " + hasXmlDom;
// console.log(msg);
			
			// var supportsXPath = document.implementation.hasFeature("XPath", "З.0"); 	
			// msg = "support DOM Level 3 XPath - " + supportsXPath;
// console.log(msg);
		// }

			//var rootTag = xml.documentElement.tagName;
			var rootTag = _vars["schema"]["root"]["tag"];
			var msg = "main tagName: " + rootTag;
//console.log(msg);				

			var xmlDoc = xml.getElementsByTagName( rootTag );
console.log( xmlDoc, xmlDoc.item(0).tagName );		
//console.log( xmlDoc.context );		
//var test = xmlDoc.context;
//for(var key in test ){
//console.log( key +" : "+ test[key] );				
//}
		

			var attr = xmlDoc.item(0).attributes;
			var attrName = _vars["schema"]["root"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

			var childTag = _vars["schema"]["root"]["child"]["tag"];
			var tables = xmlDoc.item(0).getElementsByTagName( childTag );
console.log( tables,  tables.item(0).tagName, tables.length );		

			var attr = tables.item(0).attributes;
			var attrName = _vars["schema"]["root"]["child"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

		//__parse( _vars["data"] );
		
		// if (window.DOMParser) { // all browsers, except IE before version 9
			// var msg = "window.DOMParser support: " + window.DOMParser;
// console.log(msg);
			// var parser = new DOMParser();
			
			// //var xmlsrc = _vars["data"].children[0].outerHTML;
// //console.log( xmlsrc );

			// try {
				// //var xml = parser.parseFromString( xmlsrc, "text/xml" );
// //console.log( xml );
				// __parse( _vars["data"] );
				
			// } catch (e) {
				// // if text is not well-formed, 
				// // it raises an exception in IE from version 9
// alert ("XML parsing error: " + e);
				// for( var item in e ){
// console.log(item + ": " + e[item]);
				// }
			// };

		// }
		// else {  // Internet Explorer before version 9

			// var xml_info = _createMSXML();
// console.log( "created  MSXML ActiveXObject, version: " + xml_info.version);		
			// var xml = xml_info["xml_obj"];

			// // xml.async = "false";
			// // xml.loadXML( xmlsrc );	
			// // var errorMsg = null;
			// // if (xml.parseError && xml.parseError.errorCode != 0) {
				// // errorMsg = "XML Parsing Error: " + xml.parseError.reason
						  // // + " at line " + xml.parseError.line
						  // // + " at position " + xml.parseError.linepos;
			// // }
			// // if (errorMsg) {
				// // log.innerHTML += "<p>" + errorMsg + "</p>";
			// // }
			// // parse_xml(xml);

		// }

		//xmldom = xml;

		function __parse( xml ){

				//read schema
				//var pmaSchemas = xml.getElementsByTagName("pma:structure_schemas");
//console.log( pmaSchemas ) ;

				//var pmaDatabase = xml.getElementsByTagName("pma:database");
//console.log( pmaDatabase ) ;

				//var tableList = xml.getElementsByTagName("pma:table");
//console.log( tableList, tableList.length ) ;

				//var x = xml.childNodes;
				//var x = xml.documentElement.childNodes;
//console.log( x ) ;
//console.log( x.length ) ;

				// var test = xml.childNodes;
// //console.log( typeof test );
				// for (var n = 0; n < test.length; n++) {
					// var node = test[n];
					
					// if( node.nodeTypeString ){//IE
// console.log( node.nodeType +", "+ node.nodeTypeString);
					// } else {
// console.log( node.nodeType);
					// }
					
// //console.log(  node.nodeTypeValue );
				// }

				//var test = xml["xml"];
//console.log( "xml - " + typeof test );
				

				//read root
				//var root = xml.documentElement.children;
				// //if( xml.children ){
					// var root = xml.children;
// console.log( typeof root, root );
					// if( root ){
						// for(var key in root){
// console.log( key +" : "+ root[key] );				
						// }
						
						// //read schema
						// var schemaTag = root[0].children[0].tagName;
// var msg = "schema tagName: " + schemaTag;
// console.log(msg);				
					// }
				// //}


			// var itemTags = xml.getElementsByTagName("program");
			// parse_res.innerHTML += "<p> itemTags.length = "+ itemTags.length +"</p>";
			
			// for (var n = 0; n < itemTags.length; n++) 
			// {
				// if ('textContent' in itemTags[n])
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].textContent + "</li>";
				// }
				// else
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].text + "</li>";
				// }
				
			// }//next
			
		}//end __parse()
		
	}//end _parseXML()

*/
