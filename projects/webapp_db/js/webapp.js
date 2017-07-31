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
		"db_url" : "db/art.xml",
		"db_type" : "xml"
		//"db_url" :"db/art_correct.json",
		//"db_type" : "json"
		//"db_url" : "db/art_correct.csv",
		//"db_type" : "jcsv",
		 //"import" : {
			//"delimiterByFields" : ",",
			//"delimiterByLines" : "\r\n"
		//}
	},
	
	"init" : function( postFunc ){
//console.log("init webapp!", arguments);
console.log( navigator.userAgent );

		webApp.db.init();
		webApp.draw.init();
		webApp.app.init();
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
		//this.dBase();
	},//end init()
	
	"db" : _db(),
	"draw" : _draw(),
	"app" : _app()
	
};//end webApp()

//start
webApp.init(function(){
	webApp.db.loadData(function(){
//console.log(arguments);		
			webApp.app.buildPage({
				"title" : "frontPage",
				"nid" : 1
			});
		}//end callback
	);
});//end webApp initialize
console.log(webApp);


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
		
		"tables": {
			// "taxonomy_menu" :[{ 
				// "fields" : ["tid", "title"],
				// "records" : []
			// }],
			
			"taxonomy_title" : {
				"fields" : ["tid", "title"],
				"records" : []
			},  
			
			"term_data" :{
				"fields" : ["tid",  "vid", "name", "description", "weight"],
				"records" : []
			},  
			
			"term_hierarchy" :{
				"fields" : [ "tid",  "parent"],
				"records" : []
			},  
			
			"term_image" :{
				"fields" : ["tid",  "path"],
				"records" : []
			},
			
			"term_node" :{
				"fields" : ["nid",  "vid", "tid"],
				"records" : []
			},  
			
			//"term_relation" :[{}],  
			//"term_synonym" :[{}],  
			"vocabulary" :{
				"fields" : [ "vid", "name", "description", "help", "relations", "hierarchy",
"multiple",
"required",
"tags",
"module",
"weight"
				],
				"records" : []
			},
			
			"url_alias" :{
				"fields" : ["pid",  "src", "dst", "language"],
				"records" : []
			},  

			"node" :{
				"fields" : [
"nid",
"vid",
"type",
"language",
"title",
"uid",
"status",
"created",
"changed",
"comment",
"promote",
"moderate",
"sticky",
"tnid",
"translate"
],
				"records" : []
			},
			
			"node_revisions" :{
				"fields" : [
"nid",
"vid",
"uid",
"title",
"body",
"teaser",
"log",
"timestamp",
"format"
],
				"records" : []
			},  
			
			"node_type" :{
				"fields" : [
"type",
"name",
"module",
"description",
"help",
"has_title",
"title_label",
"has_body",
"body_label",
"min_word_count",
"custom",
"modified",
"locked",
"orig_type"
],
				"records" : []
			}
			
		}//end tables
	};


	var _init = function( opt ){
//console.log("init _db: ", arguments);
	};//end _init()

	
	function _loadData( postFunc ){
//console.log("webApp.db.loadData() ", arguments);

		if( webApp.vars["db_url"].length === 0 ){
console.log("error in _db(), not find 'db_url' !");
			return false;
		}
		
		runAjax( {
			"requestMethod" : "GET", 
			"url" : webApp.vars["db_url"], 
			"callback": function( data ){
				
var msg = "load " + webApp.vars["db_url"] ;
console.log(msg);
//webApp.vars["log"].push(msg);
//console.log( "_postFunc(), " + typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
				if( !data ){
console.log("error in _db(), not find 'data' !");			
					return false;
				}
				
				if( webApp.vars["db_type"].length === 0 ){
console.log("error in _db(), not find 'db_type' !");
					return false;
				}
			
				switch( webApp.vars["db_type"] ){
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
				
			}//end callback()
		});
		
	}//end _loadData()
	
	//select tid, title from taxonomy_title	
	var _query = function( opt ){
//console.log(arguments);
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
		
		//options["queryObj"]["callback"] = _postQuery;
		options["callback"] = opt["callback"];
		options["queryObj"]["callback"] = _postQuery;
		
console.log( "_query()", options );

		// if( options["dbName"].length === 0){
// var msg = "_getListStores(), error, argument 'dbName' empty.... ";
// console.log( msg );
			// return false;
		// }
		
		//detect and run subquery
		/*
		var test = false;
		var conditions = options["queryObj"]["where"];
		for( var n = 0; n < conditions.length; n++){
			var condition = conditions[n];
			
			if( condition["value"]["action"] ){
console.log("detect subquery!", condition["value"], options, n);
				test = true;
				condition["value"]["callback"] = _postSubQuery;
				condition["value"]["num_condition"] = n;
				_startQuery( condition["value"] );
				// _query({
					// "queryObj" : condition["value"],
					// //"callback" : _postQuery
					// "callback" : options["callback"]
				// });
				
				break;
			} else {
				test = false;
			}
			
		}//next condition
		
		//run base query
		if(!test){
//console.log( options["queryObj"]["callback"] );
			_startQuery( options["queryObj"] );
			//clear for next query_obj
			//dbInfo["query"]=[];
		}
		*/
		
		// var subQuery = _detectSubQuery( options["queryObj"] );
// //console.log( subQuery );
		// if( !subQuery ){//run base query
			// _startQuery( options["queryObj"] );
		// } else {
			// _startQuery( subQuery );
		// }
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
console.log( "detect subQuery ", subQuery);
					
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

//test, detect sub query
//var subQuery = _detectSubQuery( queryObj );
//console.log( subQuery );

			var result = [];
			var action = queryObj["action"];
			switch( action ){
				
				case "select":
					var tableName = queryObj["tableName"];
					var data = _vars["tables"][tableName]["records"];
					
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
console.log("_postQuery(), runtime, sec: " + runtime);
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
						res[n]["url"] = "taxonomy/term/" + res[n]["tid"];
					}//next
//console.log("end test query!!!", res);

					_replaceUrl({
						"data" : res,
						"callback" : function(res){
							if( typeof options["callback"] === "function"){
								options["callback"](res);
							}
						}//end callback
					});

				}//end callback
				
			});
			
		}//end _postQuery()
		
	}//end _getChildTerms()

	
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
console.log(options);

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
				"targetFields" : ["title"],
				"where" : [
					{"key" : "nid", "value" : p["nid"], "compare": "="}
				]
			},
			"callback" : function( node ){
//console.log( node );						
				__getBody(function( res ){
//console.log( res );						
					node[0]["body"] = res[0]["body"];
					if( typeof p["callback"] === "function"){
						p["callback"](node);
					}
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
						callback(res);
					}
				}//end callback
			});
			return false;
		}//__getBody()

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
	var _vars = {
		"templates" : {
			"tpl-list" : _getTpl("tpl-list"),
			"tpl-list_list" : _getTpl("tpl-list_list"),
			"tpl-menu" : _getTpl("tpl-menu"),
			"tpl-menu_list" : _getTpl("tpl-menu_list"),
			"tpl-block-content" : _getTpl("tpl-block-content"),
			"tpl-block-1" : _getTpl("tpl-block-1"),
			"tpl-info_termins_style-block" : _getTpl("tpl-info_termins_style-block"),
			"tpl-info_termins_tech-block" : _getTpl("tpl-info_termins_tech-block"),
			"tpl-info_termins_genre-block" : _getTpl("tpl-info_termins_genre-block")
		}
	};

	var _init = function(){
//console.log("init _draw");
	};

	function _getTpl( id ){
		var tpl = getDOMobj(id);
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
		
		// var tpl = getDOMobj(templateId);
		// tpl.innerHTML = html;
		// tpl.className = "";
		
		// //insert list
		// var list = getDOMobj( templateId+"_list" );
// //console.log(list, listHtml, list.innerHTML);
		// list.innerHTML = listHtml;
		
	};//end _insert()
	
	var _insertBlock = function( opt ){
		
		var options = {
			"templateID": false,
			"title" : "block",
			"content" : false
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
		
		var tpl = getDOMobj(templateID);
		tpl.innerHTML = html;
		tpl.className = "";//show block
		
	};//end _insertBlock()


	function _wrapContent( opt ){
		var p = {
			"data": null,
			//"type" : "",
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
		
		var html = "";
//for test		
// p["data"] = {
	// "name": "Name",
	// "url" : "http://test"
// };
		
		//switch( p["type"] ){
			//case "menu" :
			
				if( !_vars["templates"][p.templateID] ){
_log("<p>draw.wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID + "</b></p>");
					return false;
				}
				html = _vars["templates"][ p.templateID ];
				
				var listHtml = "";
				for( var key in p["data"]){
//console.log(p["data"][key], typeof p["data"][key], p["data"][key].length);
					
					//if( typeof p["data"][key] === "string"){
						//html = html.replace("{{"+key+"}}", p["data"][key]);
					//}
					
					//form list items
					if( typeof p["data"][key] === "object"){
							
						// html = html
						// .replace("{{url}}", p["data"][key]["url"])
						// .replace("{{name}}", p["data"][key]["name"]);
						
						var items = p["data"][key];
						
						if( !_vars["templates"][ p.templateID+"_list"] ){
_log("<p>draw.wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID+"_list" + "</b></p>");
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
				html = html.replace("{{list}}", listHtml);
			//break;
			
			//case "link" :
			//break;
		//}//end switch

		
//console.log(html);
		return html;
	}//end _wrapContent

	
	// public interfaces
	return{
		vars : _vars,
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
		}
	};
}//end _draw()



function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"node": [
			{
//"templateID" : "node.tpl"
"nid" : 1,
"vid" : 1,
"type" : "photogallery_image",
//"language" : "ru",
"title" : "Life Force, 1919", //"frontPage"
//"uid" : 1,
"status" : 1,
"created" : 1335858040,
"changed" : 1491726570,
//"comment" : 0,
//"promote" : 1,
//"moderate" : 0,
//"sticky" : 0,
//"tnid" : 0,
//"translate" : 0
//"content" : "<h1>front page</h1>"
//"format" : 1,
"body" : "<h1>Page body!</h1>"
			}
		],
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
				},//end callback()
				"visibility" : "frontPage"
			},
			{
				"name" : "block-genre",
				"title" : "Жанр",
				"templateID" : "tpl-info_termins_genre-block",
				"content" : function( args ){//function for getting content data
					webApp.db.query({
						"queryObj" : _vars["queries"]["getTermGenre"],
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
		
		var _vocabularyName = "info";
		var _termName = "жанр";
		var subQuery1 = {
			"action" : "select",
			"tableName": "vocabulary",
			"targetFields" : ["vid"],
			"where" : [
				{"key" : "name", "compare": "=", "value" : _vocabularyName}
			]
		};
		
		var subQuery3 = {
			"action" : "select",
			"tableName": "term_data",
			"targetFields" : ["tid"],
			"where" : [
				{"key" : "name", "compare": "=", "value" : _termName}
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
			
		_vars["queries"]["getTermGenre"] = baseQuery;
		
	};//end _init()
	
	
	var _buildBlock = function(opt){
console.log("_buildBlock()", arguments);

		var options = {
			"title": "block title",
			"content" : "",
			"templateID" : "tpl-block",
			"contentTpl" : "tpl-list"//"tpl-menu"
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);
	
		// if( options["content"].length === 0 ){
// _log("<p>app.buildBlock,   error, content is <b class='text-danger'>empty</b></p>");
			// return false;
		// }

		//dynamic form content
		if( typeof options["content"] === "function"){
			options["content"]({
				"callback" : function( res ){
	//console.log(res);								
					var html = webApp.draw.wrapContent({
						"data" : res,
						//"type" : "menu",//"list"
						"templateID" : options["contentTpl"]
					});
					
					//var html = "<h1>Test!!!</h1>";
					if( html && html.length > 0){
						options["content"] = html;
						webApp.draw.insertBlock( options );
					}
					
				}
			});
		} else {
			webApp.draw.insertBlock( options );
		}

	};//end _buildBlock()

	
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		var options = {
			"nid": null,
			//"templateID" : "tpl-page"
			"title" : ""//,
			//content : ""
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
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
		if( options["nid"] ){
			
			//get node from DB
			var node = webApp.db.nodeLoad({
				"nid": options["nid"],
				//"title": options["title"]
				"callback" : function( node ){
//console.log( node );						
					//draw content block
					var opt2 = {
						"name" : "block-content",
						"title" : node[0]["title"], 
						"templateID" : "tpl-block-content",
						//"content" : _formNodeContent(node)//node["content"]
						"content" : node[0]["body"]
					};
//console.log( opt2 );						
					_buildBlock( opt2 );
				}//end callback
			});
			
		} else {
console.log( options["nid"] );			
_log("Warn! no page,  'nid' <b class='text-danger'>is empty</b> ");			
		}

		//draw sidebar blocks
		for( var n = 0; n < _vars["blocks"].length; n++){
			var opt2 = _vars["blocks"][n];
//console.log(opt2["visibility"], options["title"]);				
			if( opt2["visibility"]){
				if( opt2["visibility"].indexOf( options["title"] ) !== -1 ){
					_buildBlock( opt2 );
				}
			} else {
				_buildBlock( opt2 );
			}
			
		}//next
			
	};//end _buildPage()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		buildBlock:	function(opt){ 
			return _buildBlock(opt); 
		},
		buildPage:	function(opt){ 
			return _buildPage(opt); 
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
//Module MusicFM
(function(){
	var MusicFM = MusicFM || function(options){

		// private variables and functions
		var _init = function(){
console.log("init!!!");
		};
		
		var _build = function(target){
			var html = "Table " + target + " is building....";
			return html;
		};
		
		// public interfaces
		return{
			init:	function(){ 
				return _init(); 
			},
			build:	function(target){ 
				return _build(target); 
			}
		};
	};
	window.MusicFM = MusicFM;
	MusicFM().init();
})();
*/


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
