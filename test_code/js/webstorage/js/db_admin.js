_vars = {
	"_vars.logMsg" : "",
	
	"indexedDBsupport" : window.indexedDB ? true : false,
	//window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
	
	"webSQLsupport" : window.openDatabase  ? true : false,
	"localStorageSupport" : window['localStorage']  ? true : false,
	"dataStoreType" : _detectDataStore(),
	
	"dbName" : "bookmarks"
	
}//end vars{}

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

console.log( _vars );

var dbInfo = [];
//dbInfo["version"] = 0;
dbInfo["useIndex"] = false;

console.log(dbInfo);

window.onload = function(){
	_vars.logMsg = navigator.userAgent;
	_alert( _vars.logMsg, "info" );
	
	if( _vars["dataStoreType"] === "indexedDB"){
		init();
	} else {
	_vars.logMsg = "window.indexedDB API NOT supported....";
	_alert( _vars.logMsg, "error" );
	}
	
};//end window.load


function init(){
	document.getElementById("dbname").value = _vars["dbName"];
	//document.getElementById("btn-list").click();
	_listStories();
	defineEvents();
}//end init()	


function _changeValue( fid, value ){
//console.log( value );	
	document.getElementById( fid ).value = value;	
}


	function _loadSpr( opt ){
//console.log(arguments);
		var p = {
			"url" : "",
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		var url = p["url"];
		
		timeStart = new Date();

		var xhr = createRequestObject();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function(){
//console.log("State:" + xhr.readyState );
			if( xhr.readyState === 4){
//console.log("Status: " + xhr.status );
				if( xhr.status === 200){
//document.getElementById("log").innerHTML += xhr.responseText;

					if( document.getElementById("load-progress") ){
						document.getElementById("load-progress").value = 0;
					}
					
					var timeEnd = new Date();
					var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
					
					//_timer["ajax_load"] = "ajax load url: " + url + ", runtime: " + runtime +" sec";
					_log("ajax load url: " + url + ", runtime: " + runtime +" sec");
					
					if( typeof p["callback"] === "function"){
						p["callback"]( xhr.responseText );
					}

				} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
				}
			}
		};
		xhr.onprogress = function(e){
			var percentComplete = 0;
			if(e.lengthComputable) {
				percentComplete = Math.ceil(e.loaded / e.total * 100);
			}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
			if( document.getElementById("load-progress") ){
				document.getElementById("load-progress").value = percentComplete;
			}
		};
		xhr.send();
		
		return false;
	}//end _loadSpr
	
	function createRequestObject(){

		var request = false;
		if (window.XMLHttpRequest) { // Mozilla, Safari, Opera ...
			request = new XMLHttpRequest();
		} 

		if(!request) { // IE
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(!request) {
			request=new ActiveXObject('Msxml2.XMLHTTP');
		}
		return request;
	}//end createRequestObject()


	function __parseCSVTable( rawData, tableName ){
		
//console.log( rawData.indexOf("\r\n") );
//console.log( rawData.indexOf("\n") );

		if( rawData.indexOf("\r\n") !== -1 ){
			var _importData = rawData.split('\r\n');
		} else {
			var _importData = rawData.split('\n');
		}
//console.log( _importData );

		if( dbInfo["tables"][tableName] &&
			dbInfo["tables"][tableName]["fields"]){
			var _listFields = dbInfo["tables"][tableName]["fields"];
		} else {
var msg = "Error,  not find field info for " +tableName+ " in dbInfo['tables']";		
console.log( msg );
_log( msg );
			return false;
		}
//console.log( _listFields );
		
		var _json = _parseCSV( _importData, _listFields );
		if(!_json){
var msg = "Error, can't parse CSV input data.";		
console.log( msg );
_log( msg );
			return false;
		}
		
//console.log( _json );
		return _json;
	}//end __parseCSVTable()

	function _parseCSV( importData, keys ){
//console.log( "function _parseCSV(), ", arguments);

		var json = false;

//----------------
//try detect data format 		
var testFormat = importData[2].substr(0, 2);
if( testFormat.length > 0 && testFormat === "*,"){
	var filterData = true;
}
console.log(testFormat, filterData);
//----------------
		

		for( var n1 = 0; n1 < importData.length; n1++){
		//for( var n1 = 0; n1 < 10; n1++){
			
//----------------
if( filterData){
	var test_value = importData[n1][0];
	if( test_value !== "*" && test_value !== "-"){
			continue; //skip lines without '*', '-'
	} else {
		var record = importData[n1].replace("*,","");	
	}
	
} else {
			var record = importData[n1];
}
//----------------

			record = record.replace(/\"/g,"");
			
			var recordObj = _parseRecord( record, keys );
			if( recordObj ){
				if( !json ){
					json = [];
				}
				json.push( recordObj );
			}
			
		}//next

//console.log( json );
		return json;
		
		
		function _parseRecord( record, listFields ){
//console.log( record, typeof record);
			if( typeof record !== "string" ){
console.log("_parseCSV(), error, input record is not in CSV format");
				return false;
			}
			
			if( record.length === 0 ){
console.log("_parseCSV(), error, input record is empty!");
				return false;
			}

			var recordObj = {};
			
			//create keys(fieldnames)
			for( var n1 = 0; n1 < listFields.length; n1++){
				var key = listFields[n1];
				recordObj[ key ] = "";
			}//next field

			//filter, replace commas within 'text value'
			var regexp = /'(.*?)'/g;
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
//console.log( str );

			record = record.replace(/'/g,"");
			var f_values = record.split(",");
//console.log( f_values, f_values.length );

			var num = 0;
			for( var key in recordObj){
				//restore commas in text value
				if( f_values[num].indexOf("&#44;") !== -1){
					f_values[num] = f_values[num].replace(/&#44;/g, ",");
				}

				//filter '$'
				if( f_values[num].indexOf("$") !== -1){
					f_values[num] = f_values[num].replace(/\$/g,"&#36;");
				}
//rawData = rawData.replace(/\$/g,"&#36;");	
				
				recordObj[key] = f_values[num];
//if( key === "ID"){
//console.log(key, recordObj[key], num, f_values[num]);
//}
				num++;
			}//next field
			
//console.log(recordObj);				
			return recordObj;
		}//end _parseRecord()
		
	}//_parseCSV()
	

	function _saveRecords( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName" : "",
			"json" : [], 
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
console.log(options);
		

		if( options["json"].length === 0){
var msg = "Error, nothing to save, json data is empty...";			
console.log(msg);
_log(msg);
			return false;
		}
		if( options["storeName"].length === 0 ){
var msg = "Error, parameter 'storeName' is empty...";			
console.log(msg);
_log(msg);
			return false;
		}

		var dbName = options["dbName"];
		var storeName = options["storeName"];
		var json = options["json"];
		
		var storeData = [];
		// Get unique key from keyName
		if( dbInfo["tables"][storeName] &&
			dbInfo["tables"][storeName]["keyName"] &&
			dbInfo["tables"][storeName]["keyName"].length > 0){
				
			var keyName = dbInfo["tables"][storeName]["keyName"];
			
		} else {
var msg = "Warning,  not find 'keyName' info for " +storeName+ " in dbInfo['tables']";		
msg += ", use numeric key...";		
console.log( msg );
_log( msg );
		}
		
		for(var n1 = 0; n1 < json.length; n1++){
			var recordObj = json[n1];
			var obj = {
				"value" : recordObj
			};
			
			// add unique key from keyName
			if( keyName ){
				
				if( recordObj[keyName] ){
					obj["key"] = "key_" + recordObj[keyName];
				} else {
var msg = "Warning,  not find 'keyName' info for " +storeName+ " in json";		
console.log( msg );
_log( msg );
				}
			}
			
			storeData.push( obj );
		}//next
//console.log( storeData );
		
		if( storeData.length > 0 ){
			_addRecords({
				"dbName" : dbName,
				"storeName" : storeName,
				"storeData" : storeData,
				"callback" : function( runtime ){
//var msg = "_addRecords(), runtime: " + runtime;				
//console.log(msg);
//_log(msg);
					if( typeof options["callback"] == "function"){
						options["callback"](msg, runtime);
					}

				}
			});
		}
		
	}//end _saveRecords()


	var _runQuery = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName" : "",
			"queryObj" : {//ex: SELECT KOD, TXT, KOD_MAIN FROM SIMPLE_SPR WHERE KOD IN (1,5) AND NOMER=945
				"action" : "", //"select",
				//"distinct" : false,
				"orderBy" : false,//"ORDER_BY"
				"tableName": "", //"SIMPLE_SPR",
				"targetFields" : "", //["KOD", "TXT", "KOD_MAIN"],
				"where" : [], /*[
					{"key" : "KOD_MAIN", "value" : "(1,5)", "compare": "IN"},
					{"logic": "AND", "key" : "NOMER", "value" : 170, "compare": "="}
				],*/
				"callback" : null
			}, 
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
		dbInfo["query"] = options;		
//console.log(options);

		//detect and run subquery
		var conditions = options["queryObj"]["where"];
		var test = false;
		for( var n = 0; n < conditions.length; n++){
			var condition = conditions[n];
			if( condition["value"]["action"] ){
console.log("detect subquery!", condition["value"]);
				test = true;
				condition["value"]["callback"] = postSubQuery;
				condition["value"]["num_condition"] = n;
				/*
//-----------------
database["subquery_num"] = n;
database["subquery_targetField"] = condition["value"]["targetFields"][0];
//-----------------
				_iDBquery( condition["value"] );
				*/
				_startQuery( options["dbName"], condition["value"] );
break;//????				
			} else {
				test = false;
			}
		}//next condition
					
		//run base query
		if(!test){
			_startQuery( options["dbName"], options["queryObj"] );
			//clear for next query_obj
			//database["query"]=[];
		}

		
		// //Run query, end process
		// if( typeof options["callback"] == "function"){
			// options["callback"]([]);
		// }
		return false;
				

		function _startQuery( dbName, queryObj ){
//console.log(arguments);
			var action = queryObj["action"];
			switch( action ){
				
				case "select":
					_getRecords({
						"dbName": dbName,
						"storeName": queryObj["tableName"],
						"callback" : function( data ){
// var msg = "_runQuery, _getRecords(), callback function...";
// _log(msg);
// console.log(msg);
// console.log(data );
							var tableName = queryObj["tableName"];
							if( dbInfo["tables"][tableName] &&
								dbInfo["tables"][tableName]["fields"]){
								var _listFields = dbInfo["tables"][tableName]["fields"];
//console.log( _listFields );

//-------------------------------									
//detect part in data array (read data from indexedDB)
	var _parts = [];
	for( var n = 0; n < data.length; n++){
		var record = data[n];
		if( typeof record === "object" ){
			if( record.length > 0){
				for( var n2 = 0; n2 < record.length; n2++){
//console.log( n, n2, record );
					_parts.push( record[n2] );
				}
			}
		}
	}//next record
					
//if(query_obj["tableName"] === "PMLP_ADR_LVL_3"){
//console.log( _parts[_parts.length-1], _parts.length );
//}
	if( _parts.length > 0){
var msg = "Unpack data store!";		
console.log( msg );
_log( msg );
		data = _parts;
	}
//-------------------------------									
									_processQuery( data, _listFields, queryObj );
									
							} else {
var msg = "Error,  not find field info for " +tableName+ " in dbInfo['tables']";		
console.log( msg );
_log( msg );
								return false;
							}
						}
					});
				break;
				
			}//end switch
		}//end _startQuery()
		
		function _processQuery( records, listFields, queryObj ){
//if(query_obj["tableName"] === "PMLP_ADR_LVL_2"){
//console.log(typeof records[0], records[0], records.length);
//}								

					var targetFields = queryObj["targetFields"];
					var conditions = queryObj["where"];
//console.log( conditions, targetFields, conditions.length );
					var orderBy = queryObj["orderBy"];
					
					var table = [];
					for( var n = 0; n < records.length; n++){
					//for( var n = 0; n < 50; n++){
						
						// if( typeof records[n] === "string" ){
							// var record = _parseCSV( records[n], listFields );
							
							// //test
							// if( !record ){
								// continue;
							// }
						// }
						
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
				
//console.log("unsort:", table, table.length);

					//sort result
					if ( orderBy ){
console.log("SORT by field " + orderBy);
						//var sortField = "ORDER_BY";
						var sortField = orderBy;
						table.sort( function (a, b){
							
							if( sortField === "ORDER_BY") {
								var a_order = parseInt( a[sortField] );
								var b_order = parseInt( b[sortField] );
							}
							
							if( sortField === "ORD_LOV") {
								var a_order = parseInt( a[sortField] );
								var b_order = parseInt( b[sortField] );
							}
							
							if( sortField === "TXT") {
								var a_order = a[sortField];
								var b_order = b[sortField];
							}
							
							if (a_order > b_order) {
								return 1;
							}
							if (a_order < b_order) {
								return -1;
							}
							// a === b
							return 0;
						});			
					}
					
					//-------------- remove duplicate records
					// //if ( query_obj["distinct"] ){
					// if ( query_obj["distinct"] && 
							// query_obj["tableName"] === "SIMPLE_SPR" && 
								// table.length < 500){
// //console.log( table.length, table.length < 500 );  
// console.log("Check and remove duplicate records, table.length: ", table.length);

						// var result = [];

						// // for( var n1 = 0; n1 < table.length; n1++){
							// // var testRecord = JSON.stringify( table[n1] );
// // //console.log( n1, "testRecord =" + testRecord);  
							// // var double_item = false;
							// // for( var n2 = 0; n2 < result.length; n2++){
								// // var sRecord = JSON.stringify( result[n2] );
								// // if( testRecord === sRecord ){
// // console.log( n1, "testRecord =" + testRecord);  
// // console.log( n2, "double_item, sRecord =" + sRecord );  
									// // double_item = true;
									// // break;
								// // } else{
									// // double_item = false;
								// // }
							// // }
							
							// // if(!double_item){
								// // result.push( JSON.parse(testRecord) );
// // //console.log( n1, "result =", result );  
							// // }
						// // }//next

						// for( var n1 = 0; n1 < table.length; n1++){
							// var testTXT = table[n1]["TXT"];
							// var testKOD = table[n1]["KOD"];
							// var double_item = false;
							// for( var n2 = 0; n2 < result.length; n2++){
								// var sTXT = result[n2]["TXT"];
								// var sKOD = result[n2]["KOD"];
								// if( testTXT === sTXT &&
										// testKOD === sKOD ){
// //console.log( n1, "testRecord =", testTXT, testKOD);  
// //console.log( n2, "double_item, sRecord =", sTXT, sKOD );  
									// double_item = true;
									// break;
								// } else{
									// double_item = false;
								// }
							// }
							
							// if(!double_item){
								// result.push( table[n1] );
// //console.log( n1, "result =", result );  
							// }
						// }//next
// //console.log( test, test.length );  
// //console.log( result, result.length );  
						// table = result;
					// }
					// //---------------------------------
					
//console.log( typeof queryObj["callback"], queryObj["callback"]);
					if( typeof queryObj["callback"] === "function"){
					
						// //fix
						// if(!condition){
							// condition = [];
							// condition["value"] = [];
						// }

// //console.log( condition["value"]["num_condition"], condition, query_obj["num_condition"], database["subquery_num"] );
// //console.log( table);
// //--------------------------
// if( table.length === 0){
	// if( typeof query_obj["next_query"] !== "undefined"){
		// var table = {
			// "next_query" : query_obj["next_query"]
		// };
	// }
// }
// //--------------------------
//console.log( queryObj["num_condition"] );
						if( !queryObj["num_condition"] ){
							
							queryObj["callback"]({
								"data" : table, 
								"callback" : options["callback"]								
							});
							
						} else {
							
							queryObj["callback"]({
								"data" : table, 
								"baseQuery" : options["queryObj"],
								"subQuery" : queryObj
							});

						}
						
						
						// //if( typeof condition["value"]["num_condition"] === "undefined"){
						// if( typeof database["subquery_num"] === "undefined" ||
								// database["subquery_num"] === 0){
							// query_obj["callback"]( table);
						// } else{
// //console.log( condition["value"]["num_condition"], query_obj["targetFields"] );								
// //console.log( table);								
							// //database["storeName"] = tableName_tmp;
							// query_obj["callback"]( table, 
								// condition["value"]["num_condition"],
								// query_obj["targetFields"] );
						// }
						
					}
					
		}//end _processQuery()
/*				
		function _checkConditons( record, conditions){
//console.log( "function _checkConditons, ", conditions );
			
			record["checkResult"] = [];
			conditions[0]["logic"] = "";

			for( var n = 0; n < conditions.length; n++){
				var condition = conditions[n];
				
				record["checkResult"][n] = false;
				
				var key = condition["key"];
				var compare = condition["compare"];
				switch(compare) {
				
					case "=":
						if( record[key] === condition["value"] ){
							//result = true;
							record["checkResult"][n] = true;							
//console.log( key, record[key], condition["value"], n, record["checkResult"] );
						}
					break;

					case "!=":
					case "<>":
						if( record[key] !== condition["value"] ){
							record["checkResult"][n] = true;							
						}
					break;

					case "IN":

						var list_values = condition["value"];

						//record["checkResult"][n] = false;
						for( var n2 = 0; n2 < list_values.length; n2++){

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

					break;
					
				}//end switch
				
			}//next condition

// if( record["KOD"] === "-98130005575" && record["LVL_1_KOD"] === "-980200"){
// console.log(record["checkResult"], record["checkResult"].length);
// }			
// if( record["KOD"] === "-66762506615" && record["LVL_1_KOD"] === "-660200"){
// console.log(record["checkResult"], record["checkResult"].length);
// }			

			//count result check ("AND")
			// var test = false;
			// for( var n = 0; n < record["checkResult"].length; n++){
				// if( record["checkResult"][n] ){
					// test = true;
				// } else {
					// test = false;
					// break;
				// }
			// }//next
			
			//count result check ("OR")
			// var test = false;
			// for( var n = 0; n < record["checkResult"].length; n++){
				// if( record["checkResult"][n] ){
					// test = true;
					// break;
				// } else {
					// test = false;
				// }
			// }//next
			
			var test = false;
			var _checkStr = "";
			
			//var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1];
			//var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1] + " || " + record["checkResult"][2];
			
			for( var n = 0; n < record["checkResult"].length; n++){
				_checkStr += conditions[n]["logic"];
				_checkStr += record["checkResult"][n];
			}//next
			
			_checkStr = _checkStr
			.replace(/AND/g, " && ")
			.replace(/OR/g, " || ");
			
			test = eval( _checkStr );
//if(test){
//console.log(record["checkResult"], test, _checkStr);
//}			
			return test;
		}//end _checkConditons()
*/

		function _checkConditons( record, conditions){
	//console.log( "function _checkConditons, ", conditions );
			
			record["checkResult"] = [];
			conditions[0]["logic"] = "";

			for( var n = 0; n < conditions.length; n++){
				var condition = conditions[n];
				
				record["checkResult"][n] = false;
				
				var key = condition["key"];
				var compare = condition["compare"];
				
				//convert string or number "value" to array ["value"]
				if( typeof condition["value"] === "string" ||
						 typeof condition["value"] === "number"){
					condition["value"] = [ condition["value"] ];
				}
				
				var list_values = condition["value"];
				if( list_values.length === 0 ){
	console.log("Error, _checkConditons(), empty conditions['value']...");
					continue;
				}		
				
				switch(compare) {
				
					case "=":
						for( var n2 = 0; n2 < list_values.length; n2++){
							if( record[key] === list_values[n2].toString() ){
								record["checkResult"][n] = true;							
	//console.log( key, record[key], condition["value"], n, record["checkResult"] );
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

					break;
					
				}//end switch
				
			}//next condition

	// if( record["NOMER"] === "182"){
	// console.log(record, record["checkResult"].length);
	// }			

			var test = false;
/*
			var _checkStr = "";
			
			//var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1];
			//var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1] + " || " + record["checkResult"][2];
			
			for( var n = 0; n < record["checkResult"].length; n++){
				_checkStr += conditions[n]["logic"];
				_checkStr += record["checkResult"][n];
			}//next
			
			_checkStr = _checkStr
			.replace(/AND/g, " && ")
			.replace(/OR/g, " || ");
			//_checkStr = "true && true";
			
			//test = eval( _checkStr );
			//create self-self-invoking function from string
			//test = Function("return "+_checkStr)();
			test = _checkConditons.constructor("return "+_checkStr)();
// if(test){
// console.log(record["checkResult"], test, _checkStr);
// }			
*/
			if( conditions.length === 1){
				test = record["checkResult"][0];
				return test;
			}
/*
var operands = [true, true, false, true];
var numRepeat = operands.length - 1;


for( var n2 = 0; n2 < numRepeat; n2++ ){
		test = operands[ n2 ] && operands[ n2 + 1];
console.log(n2, test);  
}
*/
			var operands = record["checkResult"];
			//var numRepeat = operands.length - 1;
			var compareResult = 0;
			
			//if( conditions.length === 2){
				
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
			
				return compareResult;
			//}
			
// if(test){
// console.log(record["checkResult"], test);
// }			

		}//end _checkConditons()
		
		function _pushResultRecord( record, table, targetFields){
			var obj = {};
			for( var n1 = 0; n1 < targetFields.length; n1++){
				obj[ targetFields[n1] ] = record[ targetFields[n1] ];
			}
			// if( record[ "ARCHIVE_STAT" ] ){
				// obj[ "ARCHIVE_STAT" ] = record[ "ARCHIVE_STAT" ];
			// }
			table.push(obj);
		}//end _pushResultRecord()


		//filter subquery results and run base query
		function postSubQuery( opt ){
//console.log(arguments);
//console.log("postSubQuery()", opt["data"].length, opt["data"]);
//console.log(options);

			var data = opt["data"]; 
			var num_condition = opt["subQuery"]["num_condition"];
			var targetField = opt["baseQuery"]["where"][num_condition]["key"];
			
			var filter = [];
			if( data.length > 0){
				for( var n = 0; n < data.length; n++){
//console.log(data[n], data[n][key], key);
					// //change condition "IN" to "NOT IN"
					// if( data[n]["ZAPRET"] === "Y" ){
						// conditions[num_condition]["zapret"] = true;
					// }
					filter.push( data[n][targetField] );
				}
			}
//console.log( filter );						
			opt["baseQuery"]["where"][num_condition]["value"] = filter;
console.log(opt["baseQuery"]);
			
			_startQuery( options["dbName"], opt["baseQuery"] );
			
			// if( typeof options["callback"] == "function"){
				// options["callback"](data);
			// }
		};//end postSubQuery()
		
	}//end _runQuery()


	function _listStories(){
		//_log("", "store-list");
		//_log("<p><b>list DB stores</b></p>", "store-list");
		_getListStores({
			"dbName" : document.getElementById("dbname").value,
			"callback": function( listStores ){
//console.log("callback, getListStores ", listStores);

				if( typeof listStores !== "undefined" &&
						listStores.length > 0){
							
					// var html = "<ol>";						
					// for( var n = 0; n < listStores.length; n++){
						// html += "<li>" + listStores[n] + "</li>";
					// }
					// html += "</ol>";
					
					// _log(html, "store-list");
//console.log(html);
					
					var select = document.getElementById("sel1");
					select.innerHTML = "";
					for( var n = 0; n < listStores.length; n++){
						var opt = document.createElement("option");
						opt.value= listStores[n];
						opt.innerHTML = listStores[n];
						select.appendChild(opt);
					}//next
					
				} else {
					var select = document.getElementById("sel1");
					select.innerHTML = "";
					document.getElementById("storename").innerHTML = "";
					
					var msg = "Empty list iDB stores";
					console.log(msg);
					//_log("<p>" + msg + "</p>", "store-list");
					_log("<p>" + msg + "</p>");
				}

			}
		});
	}//end _listStories()

	var _createStore = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_createStore(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}
		
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "create_store",
			"callback" : _postFunc
		});

		function _postFunc(log){ 
//console.log(options);
//console.log(arguments);
			
			var timeEnd = new Date();
			var runtime_s = ( timeEnd.getTime() - timeStart.getTime() ) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](log, runtime_s);
			}

		}//end _postFunc()
		
	};//end _createStore()


	var _getListStores = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);
		
		if( options["dbName"].length === 0){
var msg = "_getListStores(), error, argument 'dbName' empty.... ";
console.log( msg );
			return false;
		}
		iDB({
			"dbName" : options["dbName"],
			"action" : "get_list_stores",
			"callback" : _postFunc
		});

		var callback = function( res ){ 
		}
		
		function _postFunc( res ){ 
//console.log(options);
//console.log("callback, getListStores ", res, options["callback"], options["storeName"]);
			if( typeof options["callback"] == "function"){
				options["callback"](res);
			}
		}//end _postFunc()
		
	};//end _getListStores()


	
	var _dropDB = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["dbName"].length === 0){
var msg = "_dropDB(), error, argument 'dbName' empty.... ";
console.log( msg );
			return false;
		}
	
		
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"action" : "drop_db",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log("_dropDB(), end process...." + options["dbName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _dropDB()

	
	var _deleteStore = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_deleteStore(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}
	
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "delete_store",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log(arguments);
//console.log("callback, delete_store, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _deleteStore()
	


	var _clearStore = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_clearStore(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}
	
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "clear_store",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log(options);
//console.log("callback, clear_store, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _clearStore	()
	
	
	var _addRecord = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"recordValue": "",
			"recordKey": "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "Parameters error, needed 'storeName'";			
console.log( msg );
_log(msg);
			return false;
		}
		if( options["recordKey"].length === 0){
var msg = "Parameters error, needed 'recordKey'";			
console.log( msg );
_log(msg);
			return false;
		}
		if( options["recordValue"].length === 0){
var msg = "Parameters error, needed 'recordValue'";			
console.log( msg );
_log(msg);
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"recordKey" : options["recordKey"],
			"recordValue" : options["recordValue"],
			"action" : "add_record",
			"callback" : _postFunc
		});


		function _postFunc(){ 
//console.log("callback, add_record, ", options["storeName"], options["recordKey"], options["recordValue"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](runtime_s);
			}

		}//end _postFunc()
		
	};//end _addRecord()

	
	var _addRecords = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"storeData": [ {"key":"","value":""}, {"key":"","value":""} ],
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "Parameters error, needed 'storeName'";			
console.log( msg );
_log(msg);
			return false;
		}
		if( options["storeData"].length === 0 &&
			typeof options["storeData"] !== "object"){
console.log( "Parameters error, needed 'storeData = [...]'" );
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"storeData" : options["storeData"],
			"action" : "add_records",
			"callback" : _postFunc
		});


		function _postFunc(){ 
//console.log("callback, add_records, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//var msg = "_addRecords(), runtime: " + runtime_s;				
//console.log(msg);
//_log(msg);
			if( typeof options["callback"] == "function"){
				options["callback"](runtime_s);
			}

		}//end _postFunc()
		
	};//end _addRecords()
	

	var _numRecords = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "Parameters error, needed 'storeName'";			
console.log( msg );
_log(msg);
			return false;
		}

		//var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "number_records",
			"callback" : _postFunc
		});


		function _postFunc( num ){ 
//console.log("callback, number_records, " + options["storeName"], num);

			// var timeEnd = new Date();
			// var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
// //console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](num);
			}

		}//end _postFunc()
		
	};//end _numRecords()
	
	var _getRecords = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"action": "get_records",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_getRecords(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : options["action"],
			"callback" : _postFunc
		});


		function _postFunc( data ){ 
//console.log("callback, get_records, " + options["storeName"]);
			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);
//console.log(data );
			if( typeof options["callback"] == "function"){
				options["callback"]( data, runtime_s );
			}
		}//end _postFunc()
		
	};//end _getRecords()

//*доработка - если opt["recordKey"] является массивом, то выбрать все записи, перечисленные в opt["recordKey"]
	var _getRecord = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"action": "get_record",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_getRecord(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}
		if( options["recordKey"].length === 0){
var msg = "_getRecord(), error, argument 'recordKey' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : options["action"],
			"recordKey" : options["recordKey"],
			"callback" : _postFunc
		});

		function _postFunc( data ){ 
//console.log("callback, get_record, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"]( data, runtime_s );
			}

		}//end _postFunc()
		
	};//end _getRecord()
	
	
	var _deleteRecord = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"recordKey": "",
			"action": "delete_record",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["storeName"].length === 0){
var msg = "_deleteRecord(), error, argument 'storeName' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}
		if( options["recordKey"].length === 0){
var msg = "_deleteRecord(), error, argument 'recordKey' empty.... ";
console.log( msg );
_log(msg);
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : options["action"],
			"recordKey" : options["recordKey"],
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log("callback, delete_record, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"]( log, runtime_s );
			}

		}//end _postFunc()
	};//end _deleteRecord()
	
	
	var iDB = function( opt ){
//console.log("iDB, ", iDB.caller, arguments);
		
		var _iDBparams = {
			"dbName": dbInfo["dbname"],
			"storeName": "",
			"storeData" : "",
			"action": "",
			"recordKey" : null,
			"recordValue" : "",
			"callback": null
		};
		dbInfo["iDBparams"] = _iDBparams;
		
		//extend options object
		for(var key in opt ){
			_iDBparams[key] = opt[key];
		}
//console.log( "iDB(), " + _iDBparams["action"], _iDBparams["dbName"], _iDBparams["storeName"] );
		
		switch( _iDBparams["action"] ){
			case "create_store":
			case "delete_store":
				//if( db){
					//db.close();
				//}
				
				// if( dbInfo["version"] === 0){
					// _get_version({
						// "dbName": _iDBparams["dbName"],
						// "callback" : _set_version
					// });
				// } else {
					// dbInfo["version"]++;
// console.log( "new_version = " + dbInfo["version"] );					
					// try{
						// var request = indexedDB.open( _iDBparams["dbName"], dbInfo["version"] );
// //console.log( request );
						// _upgrade(request);
					// } catch(e) {
// console.log("1.indexedDB error, ", e);//?
					// };
					
				// }
				
				_get_version({
					"dbName": _iDBparams["dbName"],
					"callback" : _set_version
				});
				
				
			break;
			
			case "drop_db":
				var req = indexedDB.deleteDatabase( _iDBparams["dbName"] );
				
				req.onsuccess = function(e) {
var msg = "Deleted database " + _iDBparams["dbName"] + " successfully";
console.log(msg, e);
					_iDBparams["runStatus"] = "success";
					_iDBparams["reason"] = msg;
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( msg );
					}
				};
				
				req.onerror = function(e) {
var msg = "Couldn't delete database " + _iDBparams["dbName"];
console.log(msg, e);				
					_iDBparams["runStatus"] = "error";
					_iDBparams["reason"] = msg;
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( msg );
					}
				};
				
				req.onblocked = function(e) {
var msg = "Couldn't delete database " + _iDBparams["dbName"] + " due to the operation being blocked";
console.log(msg);				
					_iDBparams["runStatus"] = "error";
					_iDBparams["reason"] = msg;
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( msg );
					}
				};
				
			break;
			
			default:
				try{
					var request = indexedDB.open( _iDBparams["dbName"]);
//console.log( request );
					_upgrade(request);
				} catch(e) {
console.log("indexedDB error, ", e);//?
				};
			break;
		}//end switch

		function _get_version( opt ){
//console.log(arguments);
			var options = {
				"dbName": dbInfo["dbname"],
				"callback": null
			};
			//extend options object
			for(var key in opt ){
				options[key] = opt[key];
			}
//console.log(options);
			
			try{
				var request = indexedDB.open( options["dbName"] );
//console.log( request );
				request.onsuccess = function(e){
					db = e.target.result;
//var msg = options["dbName"] + ", db.version = " + db.version, db;
//console.log(msg);				
					db.close();
					
					if( typeof options["callback"] === "function"){
						options["callback"]( db.version );
					}
				}
				
				request.onerror = function(e){
var msg = "get_version(), error " + e.target.error.name +", "+ e.target.error.message;
console.log(msg);
					// if( e.target.error.name === "UnknownError"){
// console.log("error name: " + e.target.error.name);
					// }
				}
			} catch(e) {
console.log("error indexedDB.open ", e);
			};
			
		}//end _get_version()
		
		function _set_version( current_db_version ){
//console.log( arguments );			
			var new_version = current_db_version + 1;
			dbInfo["version"] = new_version;
//console.log("function set_version_iDB(), ", current_db_version, new_version);
			try{
				var request = indexedDB.open( _iDBparams["dbName"], new_version );
//console.log( request );
				_upgrade( request );
			} catch(e) {
console.log("_set_version(), error indexedDB.open ", e);//?
			};
		}//end _set_version()
		
		function _upgrade( request){
			request.onupgradeneeded = function(e) {
//var msg = 'Upgrading ' + _iDBparams["dbName"];
//console.log(msg, e);	
					
				db = e.target.result;
				
				switch( _iDBparams["action"] ){
				
					case "create_store":
						if( db.objectStoreNames.contains( _iDBparams["storeName"] )) {
var msg = "data store <b>"  + _iDBparams["storeName"] + "</b> not created, store exists....";
//console.log(msg);
							_iDBparams["runStatus"] = "error";				
							if( typeof _iDBparams["callback"] === "function"){
								_iDBparams["callback"](msg);
							}
							return false;
						};
						
						var store = db.createObjectStore( _iDBparams["storeName"], { autoIncrement:true });  

						// //create DB index
						// var tableName = database["storeName"];
						// if( database["import"]["importFormat"] === "json"){
							// if( typeof database["tables"][tableName] !== "undefined"){
									// if( typeof database["tables"][tableName]["indexes"] !== "undefined" &&
											// database["tables"][tableName]["indexes"].length > 0 ){
										// var listIndexes = database["tables"][tableName]["indexes"];
										// for(var n = 0; n < listIndexes.length; n++){
											// var indexName = listIndexes[n]["name"];
											// var keyPath = listIndexes[n]["keyPath"];
											// var uniq = listIndexes[n]["unique"];
											// store.createIndex( indexName, keyPath, {unique : uniq});
										// }//next index
									// }
							// }
						// }

							
						store.transaction.oncomplete = function(event) {
var msg = "Create store <b>" + _iDBparams["storeName"] + "</b>, database: <b>" + _iDBparams["dbName"] +"</b>";
//console.log(msg, e);
							_iDBparams["runStatus"] = "success";				
							if( typeof _iDBparams["callback"] === "function"){
								_iDBparams["callback"](msg);
							}
						};
					break;
					
					case "delete_store":
						//var store = db.deleteObjectStore( _iDBparams["storeName"]);//?
var msg = "";						
						if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
							db.deleteObjectStore( _iDBparams["storeName"] );
msg = "Delete store " + _iDBparams["storeName"] + ' from ' + _iDBparams["dbName"];
//console.log(msg);				
							_iDBparams["runStatus"] = "success";				
						} else {
msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
//console.log(msg);
							_iDBparams["runStatus"] = "error";				
						}
						
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"](msg);
						}
						
					break;
					
				}//end switch
				
			}//end upgradeneeded callback
		 
			request.onsuccess = function(e) {
//var msg = "request.onsuccess";
//console.log(msg, e);
				db = e.target.result;
				
				// //refresh store-list
				// if( document.getElementById("store-list") ){
					// document.getElementById("store-list").innerHTML = "";
					// for( var n = 0; n < db.objectStoreNames.length; n++){
						// document.getElementById("store-list").innerHTML += "<li>" +db.objectStoreNames[n]+ "</li>";
					// }//next
				// }
				
				db.onerror = function(e) {
var msg = '(request.onsuccess, db.onerror), database ' + _iDBparams["dbName"] + ', action error!';
console.log(msg, e);				
				};
				db.onabort = function(e) {
var msg = '(request.onsuccess, db.onabort), database ' + _iDBparams["dbName"] + ', action aborted!';
console.log(msg, e);				
				};
				db.onversionchange = function(e) {
var msg = '(request.onsuccess, db.onversionchange), database ' + _iDBparams["dbName"] + ', action onversionchange!';
console.log(msg, e);				
				};

				switch( _iDBparams["action"] ){
					case "add_records":
						if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
							_run_transaction();
						} else {
//var msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
//console.log(msg);
//_log(msg);

							var buffer = _iDBparams["callback"];
							var storeData = _iDBparams["storeData"];
							iDB({
								"dbName" : _iDBparams["dbName"],
								"storeName" : _iDBparams["storeName"],
								"action" : "create_store",
								"callback" : function(){
//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
//console.log(msg, buffer, storeData);
//_log(msg);

									iDB({
										"dbName" : _iDBparams["dbName"],
										"storeName" : _iDBparams["storeName"],
										"storeData" : storeData,
										"action" : _iDBparams["action"],
										"callback" : buffer
									});
								}
							});

						};
					break;

					case "add_record":
						if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
							_run_transaction();
						} else {
var msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
console.log(msg);
_log(msg);

							var buffer = _iDBparams["callback"];
							iDB({
								"dbName" : _iDBparams["dbName"],
								"storeName" : _iDBparams["storeName"],
								"action" : "create_store",
								"callback" : function(){
//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
//console.log(msg, buffer, storeData);
//_log(msg);
									iDB({
										"dbName" : _iDBparams["dbName"],
										"storeName" : _iDBparams["storeName"],
										"recordKey" : _iDBparams["recordKey"],
										"recordValue" : _iDBparams["recordValue"],
										"action" : _iDBparams["action"],
										"callback" : buffer
									});
								}
							});

						};
					break;
					
					// case "update_master":
						// if( db.objectStoreNames.contains( database["storeName"] ) ){
							// _run_transaction();
						// } else {
// var message = database["storeName"] + ' not exists in DB ' + database["dbName"];
// console.log(message);
							// database["action"] = "create_store";
							// var buffer = callback;
							// iDB( function(){
// console.log("callback, create_store, "+ database["storeName"], callback);
								// database["action"] = "update_master";
								// iDB( buffer );
							// });
						// };
					// break;
					
					case "clear_store":
					case "get_records":
					case "get_records_obj":
					case "get_record":
					case "delete_record":
					case "number_records":
						_run_transaction();
					break;
					
					case "get_list_stores":
//console.log("case 'get_list_stores':", _iDBparams["callback"], db.objectStoreNames);
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( db.objectStoreNames );
						}
					break;
					
				}//end switch
				
				db.close();
			}//end success callback

			request.onerror = function(e) {
var msg = "indexedDB request error: " + e.target.error.name+", "+ e.target.error.message;
console.log(msg, e);
_log(msg);
				_iDBparams["runStatus"] = "error";
				_iDBparams["reason"] = msg;
				// if( e.target.error.name === "UnknownError"){
// //alert(msg );
					// if( typeof database["callbackFunc"]["afterUpdate"] === "function"){
						// database["callbackFunc"]["afterUpdate"]( e.target.error.name );
					// }
					// return false;
					
				// }
			}//end error callback
			
			request.onblocked = function (e) {
var msg = "Database " + _iDBparams["dbName"] + " being blocked";
console.log(msg, e);				
			};
		
		}//end _upgrade()	

		//function _run_transaction( args ){
		function _run_transaction(){
//console.log("function _run_transaction() : " + _iDBparams["storeName"], _iDBparams["action"]);
		
			if( !db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
				var msg = "Name object store '" + _iDBparams["storeName"] + "' not exists in DB " + _iDBparams["dbName"];
console.log(msg);		
				if( typeof _iDBparams["callback"] === "function"){
					_iDBparams["runStatus"] = "error";
					_iDBparams["reason"] = msg;
					//if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]();
					//}
				}
				return false;
			}
			
			var type = "readwrite";//"readonly", "version_change"
			if( _iDBparams["action"] === "get_record" ||  
					_iDBparams["action"] === "get_records" ||
					_iDBparams["action"] === "get_records_obj" ||
						_iDBparams["action"]=== "search"
					){
				var type = "readonly";
			}
//if( _iDBparams["storeName"] === "idb_master"){
//console.log(_iDBparams["storeName"], type, database["action"], database["record_key"], database["masterData"] );
//}

			var transaction = db.transaction(
				[ _iDBparams["storeName"] ], 
				type 
			);
			
			transaction.onerror = function(event) {
var msg = "transaction.onerror";
console.log(msg, event);
				_iDBparams["runStatus"] = "error";
				_iDBparams["reason"] = msg;
				if( typeof _iDBparams["callback"] === "function"){
					_iDBparams["callback"]();
				}
			};  
			
			transaction.onabort = function(event) {
				var error = event.target.error;
var msg = "transaction.onabort, " + error.message + ", " + error.name;
console.log(msg, event);
				_iDBparams["runStatus"] = "error";
				_iDBparams["reason"] = msg;
				if( typeof _iDBparams["callback"] === "function"){
					_iDBparams["callback"]();
				}
				
				// //remove last store
				// _deleteStore({
					// "storeName" : _iDBparams["storeName"],
					// "callback" : function(){
						// _abortUpdate( error );
					// }
				// });

				// function _abortUpdate( error ){
					// if (error.name == 'QuotaExceededError') {
// var msg = "transaction.onabort_QuotaExceededError!";
// console.log(msg);
// _u.debug(msg);
						// database["import"]["status"] = {
							// "code" : 2,
							// "reason" : "abort_QuotaExceededError"
						// };
						
						// //save import result info in master table
						// _save_stat_info( {
								// "callback" : function(){
	// //console.log("callback, _save_stat_info");
								
								// //update import status
								// database["masterData"] = [];
								// var obj = {
									// "key" : "import_status",
									// "value" : "abort_QuotaExceededError"
								// };
								// database["masterData"].push( obj );
								// database["storeName"] = "idb_master";
								// database["action"] = "update_master";
								// iDB(function( res ){
// var msg = "iDB(), _run_transaction(), _abortUpdate(), status: abort, QuotaExceededError";									
// _log(msg);
// _u.debug(msg);
									// _importAbort();
								// });
								
							// }//end callback
						// });
					// }
				// }//end _abortUpdate
				
			};//end callback transaction.onabort
			
			var store = transaction.objectStore( _iDBparams["storeName"] );
//console.log(store);
			
			switch ( _iDBparams["action"] ){
			
				case 'add_record':
					var key = _iDBparams["recordKey"];
					var value = _iDBparams["recordValue"];
//console.log(key, typeof key, value, typeof value);

					if(!key){
						//var request = store.add( value );
						var request = store.put( value );
					} else {
						//var request = store.add( value, key );
						var request = store.put( value, key );
					}
					
					request.onerror = function(e) {
var msg = "error add value,  " + e.target.error.name +", "+e.target.error.message;
console.log(msg,e);
						_iDBparams["runStatus"] = "error";				
						// if( e.target.error.name === "UnknownError"){
// console.log("test3, " + e.target.error.name);
						// }
					}
					
					request.onsuccess = function(e) {
//var msg = "success add value";
//console.log(msg, e);
						_iDBparams["runStatus"] = "success";				
					}
					
					transaction.oncomplete = function(e) {
//var msg = "transaction add record oncomplete";
//console.log(msg, e);
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]();
						}
					};
				break;
			
				case 'add_records':
					_putRecords( _iDBparams["storeData"] );
				break;
				
				//case 'update_master':
					// _putRecords( database["masterData"] );
				//break;
				
				case 'number_records':
					var req = store.count();	
					req.onsuccess = function() {
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"](  req.result  );
						}
					};
				break;
				
				case 'delete_record':
					var key = _iDBparams["recordKey"];
					
					var req = store["delete"]( key );
//console.log(req);
					req.onerror = function(e) {
var msg = "error delete record with key " + key +", "+e.target.error.name;
console.log(msg, e.target.error.name);
						_iDBparams["runStatus"] = "error";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( msg );
						}
					}
					req.onsuccess = function(e) {
var msg = "success delete record with key " + key;
//console.log(msg, e);				
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( msg );
						}
					}
					
//					transaction.oncomplete = function(event) {
//var message = "transaction delete record oncomplete";
//console.log(message, event);				
//					};
				
				break;
				
				case 'get_record':
//console.log("case 'get_record': ", store);
//console.log(_iDBparams["recordKey"], typeof _iDBparams["recordKey"], _iDBparams["recordKey"].length);
					if( typeof _iDBparams["recordKey"] === "string"){
						_getOneRecord();
					}
					if( typeof _iDBparams["recordKey"] === "number"){
						_getOneRecord();
					}
					if( typeof _iDBparams["recordKey"] === "object" &&
							_iDBparams["recordKey"].length > 0){
						_getListRecords();
					}
				break;
				
				case 'get_records':
					_iDBgetRecords();
				break;
				case 'get_records_obj':
					_iDBgetRecordsObj();
				break;
				
				case 'clear_store':
					var request_clear = store.clear();
					request_clear.onerror = function(e) {
var msg = "Clear store error " + e.target.error.name+", "+ e.target.error.message;
console.log(msg, e);				
						_iDBparams["runStatus"] = "error";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"](msg);
						}
					};
					request_clear.onsuccess = function(e) {
var msg = "Success clear " + _iDBparams["storeName"];
//console.log(msg, e);				
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( msg );
						}
					};
				break;

				case "search":
// //console.log("case search, ", store["name"] );
					// _iDBsearch( database["query"] );
				break;
				
			}//end switch

			function _iDBgetRecords(){
				
				var useCursor = true;
				if ('getAll' in store) {
					useCursor = false;
				}
				dbInfo["useCursor"] = useCursor;
//useCursor = true;//for test

				var useIndex = dbInfo["useIndex"];
//for test index
//if( _iDBparams["storeName"] === "SIMPLE_SPR_TEST"){
	//var useIndex = true;
	//var index_name = "byKey";
//}
//console.log("get_records, useIndex: ", useIndex);

				// var storeName = _iDBparams["storeName"];
				// if( database["calc_store_size"] ){
					// var sum = 0;
				// }

				var result = [];
				if ( !useCursor) {
					if( useIndex ){
						var index = store.index( index_name );
						index.getAll().onsuccess = function(event) {
							var records = event.target.result;
							for( var n = 0; n < records.length; n++){
//console.log( records[n] );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( records[n] );
									// sum = sum + json.length;
								// }
								result.push( records[n] );
							}//next
							
						};
					} else {
						store.getAll().onsuccess = function(event) {
							var records = event.target.result;
							for( var n = 0; n < records.length; n++){

//if( storeName === "SL_KODIF"){
//console.log( records[n] );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( records[n] );
							// //console.log( json, json.length );
									// sum = sum + json.length;
								// }
//}
								result.push( records[n] );
							}//next
						};
						//store.getAllKeys().onsuccess = function(event) {
							//records["keys"] = event.target.result;
						//};
					}
				};

				if ( useCursor) {
					
					if( useIndex ){
						var index = store.index( index_name );
						index.openCursor().onsuccess = function(event) {
							var cursor = event.target.result;
							if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );
								result.push( cursor.value );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( cursor.value );
									// sum = sum + json.length;
								// }
								cursor["continue"]();
							}
						};

					} else {
						store.openCursor().onsuccess = function(event) {
							var cursor = event.target.result;
							if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );
								result.push( cursor.value );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( cursor.value );
									// sum = sum + json.length;
								// }
								cursor["continue"]();
							}
						};
					};
					
				};
					
				transaction.oncomplete = function(event) {
//var msg = _iDBparams["storeName"] + ", transaction get_records complete.";
//console.log(msg);
//console.log( result );
					// var _resObj = {
						// "storeName" : _iDBparams["storeName"],
					// }
					
					// if( database["calc_store_size"] ){
						// _resObj["bytes"] = sum;
					// }
					
					// if( typeof callBack === "function"){
						// callBack( result, _resObj );
					// }
					_iDBparams["runStatus"] = "success";				
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( result );
					}
					
				};
				
			}//end _iDBgetRecords()


			function _iDBgetRecordsObj(){

				var useCursor = true;
				//if ('getAll' in store) {
					//useCursor = false;
				//}
				_iDBparams["useCursor"] = useCursor;				
				var useIndex = dbInfo["useIndex"];
				
				// if( database["calc_store_size"] ){
					// var sum = 0;
				// }

				var result = {};
				if ( !useCursor ) {
					if( useIndex ){
						var index = store.index( index_name );
						index.getAll().onsuccess = function(event) {
							var records = event.target.result;
							for( var n = 0; n < records.length; n++){
//console.log( records[n] );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( records[n] );
									// sum = sum + json.length;
								// }
								result.push( records[n] );
							}//next
						};
					} else {
						store.getAll().onsuccess = function(event) {
							var records = event.target.result;
							for( var n = 0; n < records.length; n++){

//if( storeName === "SL_KODIF"){
//console.log( records[n] );
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( records[n] );
							// //console.log( json, json.length );
									// sum = sum + json.length;
								// }
//}
								result.push( records[n] );
							}//next
						};
						//store.getAllKeys().onsuccess = function(event) {
							//records["keys"] = event.target.result;
						//};
					}
				};

				if ( useCursor) {
					
					if( useIndex ){
						var index = store.index( index_name );
						index.openCursor().onsuccess = function(event) {
							var cursor = event.target.result;
							if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );

								//result.push( cursor.value );
								result[ cursor.key ] = cursor.value ;
								
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( cursor.value );
									// sum = sum + json.length;
								// }
								cursor["continue"]();
							}
						};

					} else {
						store.openCursor().onsuccess = function(event) {
							var cursor = event.target.result;
							if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );

								//result.push( cursor.value );
								result[ cursor.key ] = cursor.value ;
								
								// if( database["calc_store_size"] ){
									// var json = JSON.stringify( cursor.value );
									// sum = sum + json.length;
								// }
								cursor["continue"]();
							}
						};
					};
					
				};

			
				transaction.oncomplete = function(event) {
//var msg = _iDBparams["storeName"] + ", transaction get_records complete...";
//console.log(msg);
//console.log( result );
					// var _resObj = {
						// "storeName" : _iDBparams["storeName"],
					// }
					// if( database["calc_store_size"] ){
						// _resObj["bytes"] = sum;
					// }
					
					// if( typeof callBack === "function"){
						// callBack( result, _resObj );
					// }
					_iDBparams["runStatus"] = "success";				
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( result );
					}
					
				};
				
			}//end _iDBgetRecordsObj()

		
			function _putRecords( data ){
				// var total = { 
					// "symbols" : 0,
					// "bytes" : 0
				// };
				

				_iDBparams["runStatus"] = "success";				
				for( var n = 0; n < data.length; n++ ){
				//for( var n = 0; n < 9; n++ ){
// //console.log(data[n]);
					var key = data[n]["key"];
					var value = data[n]["value"];
					
					if(!key){
						//var request = store.add( value );
//if( n === 0){
//console.log(value, value.length, typeof value);
//}						
						//try{
							var request = store.put( value);
						//} catch(e){
//console.log(e);
//console.log("1.indexedDB error, store.put", value);
						//}
						
					} else {
//console.log("_putRecords(), add ", value, key);
						//var request = store.add( value, key );
						//try{
							//var request = store.add( value, key );
							var request = store.put( value, key );
						//} catch(e){
//console.log(e);
//console.log("2.indexedDB error, store.put", value, key);
						//}
					}
						
					// //count store info size in bytes and symbols
					// if( database["import"]["importFormat"] === "json" &&
						// typeof value !== "string"){
						// value = JSON.stringify( value );
					// }
					
					// //total["symbols"] = total["symbols"] + value.length;
// //console.log( n, data[n], s_value, s_value.length );
					// var size_bytes = unescape(encodeURIComponent( value )).length;
					// //var size_bytes = 0;
// //console.log("size_bytes : ", size_bytes);
					// total["bytes"] = total["bytes"] + size_bytes;

					request.onerror = function(e) {
var msg = "error add value,  " + e.target.error.name +", "+e.target.error.message;
console.log(msg,e);
						_iDBparams["runStatus"] = "error";				
						
						// if( e.target.error.name === "UnknownError"){
// console.log("test4, " + e.target.error.name);
						// }
						
						//A mutation operation in the transaction failed because a constraint was not satisfied. 
						//For example, an object such as an object store or index already exists and a new one was 
						//being attempted to be created.
						if( e.target.error.name === "ConstraintError"){
 console.log("request.onerror, name: " + e.target.error.name, key, value);
						}
						
					}
					request.onsuccess = function(e) {
//var msg = "success add value";
//console.log(msg, e);
					}
					
				}//next
					
				transaction.oncomplete = function(event) {
//var msg = "transaction add records oncomplete";
//console.log(msg, event);
					if( typeof _iDBparams["callback"] === "function"){
						// var params = {
							// "total": total
						// };
						_iDBparams["callback"]();
					}
				};
				
			}//end _putRecords()
			
			function _getOneRecord(){
				var key = _iDBparams["recordKey"];
				var req = store.get( key );
				//var index = store.index(INDEX_KOD);
				//var request = index.get( key );
//console.log(key, index, request );
				
				req.onerror = function(e) {
var msg = "error get record, " + e.target.error.name;
console.log(msg, e);
					_iDBparams["runStatus"] = "error";				
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]();
					}
				}
				
				req.onsuccess = function(e) {
//var msg = "success get record with key " + key;
//console.log(msg, e, e.target.result);				
					_iDBparams["runStatus"] = "success";				
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"](  e.target.result );
					}
				}
				
				transaction.oncomplete = function(event) {
//var msg = "transaction get record oncomplete";
//console.log(msg, event);
				};
			}//end _getOneRecord()
			
			function _getListRecords(){
				_iDBparams["runStatus"] = "success";				
				var records = [];
				var req = [];
				var keys = _iDBparams["recordKey"];
				
				// for( var n = 0; n < keys.length; n++ ){
					// var key = keys[n];
					// req[n] = store.get( key );
					
					// req[n].onerror = function(e) {
// var msg = "error get list records, " + e.target.error.name;
// console.log(msg, e);
						// _iDBparams["runStatus"] = "error";				
					// }
					
					// req[n].onsuccess = function(e) {
// var msg = "success get list records with key " + key;
// console.log(msg, keys[n], n);				
						// var obj = {
							// "key": key,
							// "value" : e.target.result
						// };
						// records.push(obj);
					// }
				// }//next
				var numKeys = keys.length;
				var count = 0;
				__getRecord({
					"recordKey" : keys[count],
					"callback" : _nextRec
				});
				
				function _nextRec( record ){
					if(record){
						var obj = {
							"key": keys[count],
							"value" : record
						};
						records.push(obj);
					}
					count++;
					if( count < numKeys ){
						__getRecord({
							"records" : records,
							"recordKey" : keys[count],
							"callback" : _nextRec
						});
					} else {
console.log("end read records list info...");
					}
				}//end _nextRec()

				function __getRecord(opt){
					var key = opt["recordKey"];
					req[count] = store.get( key );
					
					req[count].onerror = function(e) {
var msg = "error get list records, " + e.target.error.name;
console.log(msg, e);
						_iDBparams["runStatus"] = "error";				
					}
					
					req[count].onsuccess = function(e) {
//var msg = "success get list records with key " + key;
//console.log(msg);				
						_iDBparams["runStatus"] = "success";				
						if( typeof opt["callback"] === "function"){
							opt["callback"]( e.target.result );
						}
					}
					
				}//end __getRecord()
				
				transaction.oncomplete = function(event) {
//var msg = "transaction get list records oncomplete";
//console.log(msg, event);
//console.log(req);
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]( records );
					}
				};
				
			}//end _getListRecords()
			
		}//end _run_transaction()
	}//end iDB()
	
	
function defineEvents(){

	window.addEventListener("offline", function(e) {
		_vars.logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(_vars.logMsg, "danger");
	});
	window.addEventListener("online", function(e) {
		_vars.logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(_vars.logMsg, "success");
	});

	var btn_clear_log = document.querySelector("#btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};
	
	var dbNameField = document.querySelector("#dbname");
	var storeNameField = document.querySelector("#storename");
	var recordKeyField = document.querySelector("#record-key");
	var recordValueField = document.querySelector("#record-value");
	
//----------------------------------	
	var btn_list = document.querySelector("#btn-list");
	btn_list.onclick = function(e){
//console.log(e);
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		_listStories();
	}//end event

//----------------------------------	
	var btn_drop_db = document.querySelector("#btn-dropDB");
	btn_drop_db.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		_dropDB({
			"dbName" : dbName.value,
			"callback" : function( log, runtime ){
_vars.logMsg="_dropDB(), "+ log +", runtime: " + runtime;
_alert( _vars.logMsg, "warning" );
console.log( _vars.logMsg );
				_listStories();
			}
		});

	}//end event


//----------------------------------	
	var btn_create = document.querySelector("#btn-create");
	btn_create.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		_createStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
//console.log( dbInfo["iDBparams"] );
				_vars.logMsg="_createStore(), "+ log +", runtime: " + runtime;
//_alert( _vars.logMsg, "success" );
				_vars.logMsg = _wrapLogMsg( _vars.logMsg, dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
				_listStories();
			}
		});
		
	}//end event


//----------------------------------	
	var btn_delete_store = document.querySelector("#btn-delete-store");
	btn_delete_store.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		_deleteStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
				_vars.logMsg = "_deleteStore(), "+ log +", runtime: " + runtime;
//_alert( _vars.logMsg, "warning" );
//console.log( _vars.logMsg );
				_vars.logMsg = _wrapLogMsg( _vars.logMsg, dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );

				_listStories();
			}
		});

	}//end event


//----------------------------------	
	var btn_addRecord = document.querySelector("#btn-add-record");
	btn_addRecord.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		var recordKey = recordKeyField.value;
		if( !recordKey || recordKey.length===0 ){
_vars.logMsg="input field <b>record key</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		// recordKey = parseInt( recordKeyField.value );
// console.log(recordKey);
		// if( isNaN( recordKey ) ){
			// recordKey = recordKeyField.value;
		// }
		
		var recordValue = recordValueField.value;
		if( !recordValue || recordValue.length===0 ){
_vars.logMsg="input field <b>record value</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		_addRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			"recordKey" : recordKey,
			"recordValue" : recordValue,
			"callback" : function( runtime ){
_vars.logMsg = "_addRecord(), db: <b>"+ dbName +"</b>, data store: <b>"+ storeName + "</b>, key: <b>"+ recordKey+"</b>, runtime: " + runtime;
//_alert( _vars.logMsg, "warning" );
//console.log( _vars.logMsg );
				_vars.logMsg = _wrapLogMsg( _vars.logMsg, dbInfo["iDBparams"]["runStatus"] );
				_log( _vars.logMsg );
			}
		});

	}//end event


//----------------------------------	
	var btn_addRecords = document.querySelector("#btn-add-records");
	btn_addRecords.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		var storeData = [];
		storeData.push({"value" : "value1"});
		storeData.push({"value" : "value2"});
		storeData.push({"value" : "value3"});
		
		_addRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"storeData" : storeData,
			"callback" : function( runtime ){
_vars.logMsg = "_addRecords(), db: "+ dbName +", store: "+ storeName +", runtime: " + runtime;
_alert( _vars.logMsg, "warning" );
console.log( _vars.logMsg );
			}
		});

	}//end event

//----------------------------------	
	var btn_numRecords = document.querySelector("#btn-num-records");
	btn_numRecords.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		_numRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( num ){
_vars.logMsg = "_numRecords(), store: <b>" + storeName + "</b>, " + num + " records.";
_alert( _vars.logMsg, "info" );
//console.log( _vars.logMsg );
			}
		});

	}//end event

//----------------------------------	
	var btn_getRecords = document.querySelector("#btn-get-records");
	btn_getRecords.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		_getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecords(), db: <b>"+ dbName +"</b>, data store: <b>"+ storeName + "</b>, " +runtime + " sec, num records: " + data.length;
_alert( _vars.logMsg, "info" );
//console.log( _vars.logMsg );
console.log(data );
			}
		});

	}//end event

//----------------------------------	
	var btn_getRecordsObj = document.querySelector("#btn-get-records-obj");
	btn_getRecordsObj.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		_getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "get_records_obj",
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecords(), get storeData as object, db: <b>"+ dbName +"</b>, store:<b>"+ storeName + "</b>, " +runtime + " sec...";
_alert( _vars.logMsg, "info" );
//console.log( _vars.logMsg );
console.log(data );
			}
		});

	}//end event

//----------------------------------	
	var btn_getRecord = document.querySelector("#btn-get-record");
	btn_getRecord.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		var recordKey = recordKeyField.value;
		if( !recordKey || recordKey.length===0 ){
_vars.logMsg="input field <b>record key</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
//console.log(recordKey);
		// recordKey = parseInt( recordKeyField.value );
		// if( isNaN( recordKey ) ){
			// recordKey = recordKeyField.value;
		// }

		_getRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			//"action" : "get_record",//?
			"recordKey" : recordKey,
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecord(), db: "+ dbName +", store:"+ storeName + ", " +runtime + " sec, num records: " + data.length;
_vars.logMsg += ", success get record with key " + recordKey;
_alert( _vars.logMsg, "success" );
console.log(data);

				if(data){
					_log(data );
				} else {
					_log(typeof data );
				}
				
			}
		});

	}//end event


//----------------------------------	
	var btn_deleteRecord = document.querySelector("#btn-delete-record");
	btn_deleteRecord.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		var recordKey = recordKeyField.value;
		if( !recordKey || recordKey.length===0 ){
_vars.logMsg="input field <b>record key</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
//console.log(recordKey);
		// recordKey = parseInt( recordKeyField.value );
		// if( isNaN( recordKey ) ){
			// recordKey = recordKeyField.value;
		// }

		_deleteRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			//"action" : "delete_record",//?
			"recordKey" : recordKey,
			"callback" : function( log ){
_vars.logMsg = "_deleteRecord(), "+ log;
_alert( _vars.logMsg, "warning" );
			}
		});

	}//end event


//----------------------------------	
	var btn_clearStore = document.querySelector("#btn-clear-store");
	btn_clearStore.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

		_clearStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
_vars.logMsg = "_clearStore(), "+ log + ", " +runtime + " sec";
_alert( _vars.logMsg, "warning" );
			}
		});

	}//end event


//----------------------------------	
/*
	if( document.getElementById("btn-load") ){
		document.getElementById("btn-load").onclick = function(){
			_loadSpr({
				"url" : document.getElementById("input_file").value,
				"callback" : function( res ){
console.log("after load...", res.length);				
						// var _dbName = document.getElementById("dbname").value;
						// var _storeName = document.getElementById("storename").value;
						// if( _storeName.length === 0 ){
							// var _url = document.getElementById("input_file").value;
							// var pos_last_dot = _url.lastIndexOf(".");
							// //var pos_last = _url.length;
							// //var type = _url.substring( pos_last_dot + 1, pos_last );
							// var pos_last_slash = _url.lastIndexOf("/");
							// _storeName = _url.substring( pos_last_slash+1, pos_last_dot ).toUpperCase();
						// }

						// var _storeDataJson = __parseCSVTable( res, _storeName );
	// //console.log(_storeDataJson, _storeDataJson.length);					
						// if( _storeDataJson && _storeDataJson.length > 0){
							// _saveRecords({
								// "dbName" : _dbName,
								// "storeName" : _storeName,
								// "json" : _storeDataJson,
								// "callback" : function(){
	// var msg = "Saved records to " + _dbName + "." + _storeName;								
	// console.log(msg);
	// _log(msg);								
								// }
							// });
						// }
				}
			});
			
		}//end event
	}
*/

//----------------------------------	
	var btn_runQuery = document.querySelector("#btn-run-query");
	btn_runQuery.onclick = function(e){
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		
		var dbName = dbNameField.value;
//console.log(dbName);
		if( !dbName || dbName.length===0 ){
_vars.logMsg="<b>input field DB name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}
		
		var storeName = storeNameField.value;
//console.log(storeName);
		if( !storeName || storeName.length===0 ){
_vars.logMsg="input field <b>store name</b> is empty....";
_alert( _vars.logMsg, "warning" );
			return false;
		}

/*		
		//SELECT KOD, TXT, KOD_MAIN FROM SIMPLE_SPR WHERE KOD_MAIN IN (1,5) AND NOMER=170
		var queryObj = {
			"action" : "select",
			"tableName": storeName,
			"targetFields" : ["NOMER", "KOD", "TXT", "KOD_MAIN", "ARCHIVE_STAT"],
			"where" : [
				{"key" : "KOD_MAIN", "value" : [1, 5], "compare": "IN"},
				{"logic": "AND", "key" : "NOMER", "value" : "170", "compare": "="},
				{"logic": "AND", "key" : "ARCHIVE_STAT", "value" : "1", "compare": "!="}
 			],
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};
*/

/*
// select distinct txt text,kod kod,kod_main kod_main,null km from SIMPLE_SPR where 
// nomer = 175 and 
// kod_main is null  and 
// kod in(select kod from sl_klass_perm where perm_name='CPR_175' and nomer=175)
		var queryObj = {
			"action" : "select",
			"distinct"	: true,
			"tableName": storeName, //"SIMPLE_SPR",
			"targetFields" : ["NOMER", "KOD", "TXT", "KOD_MAIN", "TEXT2", "ORDER_BY", "ARCHIVE_STAT"],
			"where" : [
				{"key" : "NOMER", "value" : "175", "compare": "="},
				{"logic": "AND", "key" : "KOD_MAIN", "value" : "NULL", "compare": "="},
				{"logic": "AND", "key" : "KOD", "value" : {
					"action" : "select",
					"tableName": "SL_KLASS_PERM",
					"targetFields" : ["KOD", "ZAPRET"],
					"where" : [
						{"key" : "PERM_NAME", "value" : "CPR_175", "compare": "="},
						{"logic": "AND", "key" : "NOMER", "value" : "175", "compare": "="},
					],
					"callback" : function(){}
					
				}, "compare": "IN"}
			],
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};
*/

/*
// select distinct txt text,kod kod,null kod_main,null km from PMLP_ADR_LVL_4 where 
// LVL_1_KOD = "-980200" AND -- VENTSPILS NOVADS
// LVL_2_KOD = "-980213" AND -- PILTENE
// (LVL_3_KOD IS NULL OR (LVL_1_KOD IS NULL AND LVL_3_KOD IS NULL)) 
// order by ord_lov
		
// select * from PMLP_ADR_LVL_4 
// WHERE LVL_1_KOD = "-980200" -- VENTSPILS NOVADS
// AND LVL_2_KOD = "-980213" -- PILTENE
// AND ARCHIVE_STAT !=1
// -- AND  (LVL_3_KOD IS NULL OR (LVL_1_KOD IS NULL AND LVL_3_KOD IS NULL)) 
// order by ord_lov

// select * from PMLP_ADR_LVL_4 
// WHERE LVL_1_KOD = "-980200"
// AND LVL_2_KOD = "-980213"
// OR LVL_1_KOD = "-660200"
// AND ARCHIVE_STAT !=1
// order by ord_lov

		var queryObj = {
			"action" : "select",
			//"distinct" : true,
			"tableName": storeName,
			"targetFields" : ["KOD", "TXT", "ORD_LOV", "ARCHIVE_STAT" ],
			"where" : [
				{"key" : "LVL_1_KOD", "value" : "-980200", "compare": "="},
				{"logic": "AND", "key" : "LVL_2_KOD", "value" : "-980213", "compare": "="},
				{"logic": "OR", "key" : "LVL_1_KOD", "value" : "-660200", "compare": "="},
				{"logic": "AND", "key" : "ARCHIVE_STAT", "value" : "1", "compare": "!="}
				
				//{"key" : "LVL_2_KOD", "value" : "-980213", "compare": "<>"}
 			],
			"orderBy" : "ORD_LOV",
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};
*/

/*
//SELECT * FROM simple_spr where nomer="182" and kod_main is null		
		var queryObj = {
			"action" : "select",
			"tableName": storeName,
			"targetFields" : ["NOMER", "KOD", "TXT", "KOD_MAIN", "ARCHIVE_STAT"],
			"where" : [
				{"key" : "NOMER", "value" : "182", "compare": "="},
				{"logic": "AND", "key" : "KOD_MAIN", "value" : "NULL", "compare": "="}
 			],
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};
*/

/*
(
	( 
		(	(LVL_2_KOD :AR_VT_PP_KOD AND  LVL_2_KOD<>'100003003' ) or 	(LVL_2_KOD is null and LVL_2_KOD :AR_VT_PP_KOD) 	) 
			and 
			(LVL_3_KOD :AR_VT_CM_KOD OR LVL_3_KOD IS NULL) 	
	) 
	or 
	(	
		(	(LVL_2_KOD :AR_VT_PP_KOD and  LVL_2_KOD='100003003') or 	(LVL_2_KOD is null and LVL_2_KOD :AR_VT_PP_KOD) 	) 
		and 
		(LVL_3_KOD :AR_VT_CM_KOD OR LVL_3_KOD IS NULL)
	)
)
// order by ord_lov

*/

//select count(KOD), * from AR_ADR_LVL_4 where 
//lvl_2_kod='100003011' and lvl_2_kod<>'100003003'
//order by ORD_LOV
		var queryObj = {
			"action" : "select",
			"tableName": "AR_ADR_LVL_4",
			"targetFields" : [
"KOD",
"TXT",
"LVL_1_KOD",
"LVL_2_KOD",
"LVL_3_KOD",
"ORD_LOV",
"ARCHIVE_STAT"
],
			"orderBy" : "ORD_LOV",
			"where" : [
				{"logic": "", "key" : "LVL_2_KOD", "value" : "100003011", "compare": "="},
				{"logic": "AND", "key" : "LVL_2_KOD", "value" : "100003003", "compare": "<>"}
 			],
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};


/*
		var queryObj = {
			"action" : "select",
			"tableName": "SIMPLE_SPR",
			"targetFields" : ["NOMER", "KOD", "TXT", "KOD_MAIN", "ARCHIVE_STAT"],
			"where" : [
				{"logic": "", "key" : "NOMER", "value" : "779", "compare": "="},
				{"logic": "OR", "key" : "NOMER", "value" : "984", "compare": "="},
				{"logic": "AND", "key" : "KOD", "value" : "14", "compare": "="}//,
				//{"logic": "AND", "key" : "KOD", "value" : "01", "compare": "!="}
 			],
			
			"callback" : function( opt ){
console.log( "- end query");
//console.log( opt["data"] );

				//Run query, end process
				if( typeof opt["callback"] == "function"){
					opt["callback"]( opt["data"] );
				}

			}
		};
*/
		_runQuery({
			"dbName" : dbName,
			"storeName" : storeName,//"_SIMPLE_SPR",//"SL_KLASS_PERM"
			"queryObj" : queryObj,
			"callback" : function( data ){
_vars.logMsg = "_runQuery(), - end process queries, num records: " + data.length;
_alert( _vars.logMsg, "info" );
console.log( data );
			}
		});

	}//end event

}//end defineEvents()


//====================================
//console.log for old IE
if (!window.console){ 
	window.console = {
		"log" : function( msg ){
			var log = getById("log");
			if(log){
				log.innerHTML += msg +"<br>";
			} else {
				alert(msg);
				//document.writeln(msg);
			}
		}
	}
};

function _push( ar, item){
	if( ar.push ){
		ar.push(item);
	} else {
		var num = ar.length;
		ar[num] = item;
	}
}// end _push()

function getById(id){
	
	if( document.querySelector ){
		var obj = document.querySelector("#"+id);
		return obj;
	}
	
	if( document.getElementById ){
		var obj = document.getElementById(id);
		return obj;
	}
	
	if( document.all ){
		var obj = document.all[id];
		return obj;
	}
	
	//if( document.layers ){
		//var obj = document.layers[id];
		//return obj;
	//}
	
	return false;
}//end getById()

function _log( msg, id){
//console.log(arguments);
//alert(arguments.length);
//		for( var n = 0; n < arguments.length; n++){
//			var _s = "<li> arguments." + n +" = "+ arguments[n] + "</li>";
//alert( _s );
//		}
	var id = id || arguments[1];//IE4 fix
//alert( msg );
//alert( id );

	if(!id){
		var id = "log";
	}
	
	var output = getById(id);
	if( output ){	
		if( msg.length == 0){
			output.innerHTML = "";
		} else {
			output.innerHTML += msg;
			
			// var logWrap = getById("log-wrap");
			// if( logWrap ){
// console.log(logWrap);
// console.log(logWrap.style.display);
				// if( logWrap.style.display === "none"){
					// logWrap.style.display="block";
				// }
			// }			
			
		}
		
	} else {
		console.log(msg);
		//alert(msg);
		//document.writeln(msg);
	}
	
	// if( typeof _showHiddenLog === "function"){
// //console.log(_showHiddenLog);
		// _showHiddenLog();
	// }
	
}//end _log()

function _alert( message, level ){
	switch (level) {
		case "info":
			message = "<p class='alert alert-info'>" + message + "</p>";
			_log(message);
		break;
		
		case "warning":
			message = "<p class='alert alert-warning'>" + message + "</p>";
			_log(message);
		break;
		
		case "danger":
		case "error":
			message = "<p class='alert alert-danger'>" + message + "</p>";
			_log(message);
		break;
		
		case "success":
			message = "<p class='alert alert-success'>" + message + "</p>";
			_log(message);
		break;
		
		default:
			_log(message);
		break;
	}//end switch
	
}//end _alert()

function _wrapLogMsg( message, level ){
	switch (level) {
		case "info":
			message = "<p class='alert alert-info'>" + message + "</p>";
			return message;
		break;
		
		case "warning":
			message = "<p class='alert alert-warning'>" + message + "</p>";
			return message;
		break;
		
		case "danger":
		case "error":
			message = "<p class='alert alert-danger'>" + message + "</p>";
			return message;
		break;
		
		case "success":
			message = "<p class='alert alert-success'>" + message + "</p>";
			return message;
		break;
		
		default:
			return message;
		break;
	}//end switch
	
}//end _wrapLogMsg