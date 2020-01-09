var indexedDatabase = iDBmodule();
console.log("indexedDatabase module:", indexedDatabase);

_vars = {
	"logMsg" : "",
	
	"indexedDBsupport" : window.indexedDB ? true : false,
	//window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
	
	"webSQLsupport" : window.openDatabase  ? true : false,
	"localStorageSupport" : window['localStorage']  ? true : false,
	"dataStoreType" : _detectDataStore(),
	
	"dbName" : "localcache"
	
}//end vars{}
console.log( _vars );


// var dbInfo = [];
// //dbInfo["version"] = 0;
// dbInfo["useIndex"] = false;
// console.log(dbInfo);


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
	_getById("dbname").value = _vars["dbName"];
	//_getById("btn-list").click();
	_listStories();
	defineEvents();
}//end init()	


function _changeValue( fid, value ){
//console.log( value );	
	_getById( fid ).value = value;	
}

/*
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
//_getById("log").innerHTML += xhr.responseText;

					if( _getById("load-progress") ){
						_getById("load-progress").value = 0;
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
			if( _getById("load-progress") ){
				_getById("load-progress").value = percentComplete;
			}
		};
		xhr.send();
		
		return false;
	}//end _loadSpr
*/

/*	
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
*/

/*
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
*/

/*
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
*/	
	
/*
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
*/

/*
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
				"where" : [], //[
					//{"key" : "KOD_MAIN", "value" : "(1,5)", "compare": "IN"},
					//{"logic": "AND", "key" : "NOMER", "value" : 170, "compare": "="}
				//],
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
				
//-----------------
//database["subquery_num"] = n;
//database["subquery_targetField"] = condition["value"]["targetFields"][0];
//-----------------
				//_iDBquery( condition["value"] );
				
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

		// function _checkConditons( record, conditions){
// //console.log( "function _checkConditons, ", conditions );
			
			// record["checkResult"] = [];
			// conditions[0]["logic"] = "";

			// for( var n = 0; n < conditions.length; n++){
				// var condition = conditions[n];
				
				// record["checkResult"][n] = false;
				
				// var key = condition["key"];
				// var compare = condition["compare"];
				// switch(compare) {
				
					// case "=":
						// if( record[key] === condition["value"] ){
							// //result = true;
							// record["checkResult"][n] = true;							
// //console.log( key, record[key], condition["value"], n, record["checkResult"] );
						// }
					// break;

					// case "!=":
					// case "<>":
						// if( record[key] !== condition["value"] ){
							// record["checkResult"][n] = true;							
						// }
					// break;

					// case "IN":

						// var list_values = condition["value"];

						// //record["checkResult"][n] = false;
						// for( var n2 = 0; n2 < list_values.length; n2++){

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

					// break;
					
				// }//end switch
				
			// }//next condition

// // if( record["KOD"] === "-98130005575" && record["LVL_1_KOD"] === "-980200"){
// // console.log(record["checkResult"], record["checkResult"].length);
// // }			
// // if( record["KOD"] === "-66762506615" && record["LVL_1_KOD"] === "-660200"){
// // console.log(record["checkResult"], record["checkResult"].length);
// // }			

			// //count result check ("AND")
			// // var test = false;
			// // for( var n = 0; n < record["checkResult"].length; n++){
				// // if( record["checkResult"][n] ){
					// // test = true;
				// // } else {
					// // test = false;
					// // break;
				// // }
			// // }//next
			
			// //count result check ("OR")
			// // var test = false;
			// // for( var n = 0; n < record["checkResult"].length; n++){
				// // if( record["checkResult"][n] ){
					// // test = true;
					// // break;
				// // } else {
					// // test = false;
				// // }
			// // }//next
			
			// var test = false;
			// var _checkStr = "";
			
			// //var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1];
			// //var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1] + " || " + record["checkResult"][2];
			
			// for( var n = 0; n < record["checkResult"].length; n++){
				// _checkStr += conditions[n]["logic"];
				// _checkStr += record["checkResult"][n];
			// }//next
			
			// _checkStr = _checkStr
			// .replace(/AND/g, " && ")
			// .replace(/OR/g, " || ");
			
			// test = eval( _checkStr );
// //if(test){
// //console.log(record["checkResult"], test, _checkStr);
// //}			
			// return test;
		// }//end _checkConditons()


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

			// var _checkStr = "";
			
			// //var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1];
			// //var _checkStr = record["checkResult"][0] +" && "+ record["checkResult"][1] + " || " + record["checkResult"][2];
			
			// for( var n = 0; n < record["checkResult"].length; n++){
				// _checkStr += conditions[n]["logic"];
				// _checkStr += record["checkResult"][n];
			// }//next
			
			// _checkStr = _checkStr
			// .replace(/AND/g, " && ")
			// .replace(/OR/g, " || ");
			// //_checkStr = "true && true";
			
			// //test = eval( _checkStr );
			// //create self-self-invoking function from string
			// //test = Function("return "+_checkStr)();
			// test = _checkConditons.constructor("return "+_checkStr)();
// // if(test){
// // console.log(record["checkResult"], test, _checkStr);
// // }			

			if( conditions.length === 1){
				test = record["checkResult"][0];
				return test;
			}

// var operands = [true, true, false, true];
// var numRepeat = operands.length - 1;


// for( var n2 = 0; n2 < numRepeat; n2++ ){
		// test = operands[ n2 ] && operands[ n2 + 1];
// console.log(n2, test);  
// }

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
*/


	function _listStories(){
		indexedDatabase.getListStores({
			"dbName" : _getById("dbname").value,
			"callback": function( listStores ){
//console.log("callback, getListStores ", listStores);

				if( typeof listStores !== "undefined" &&
						listStores.length > 0){
							
					var select = _getById("sel1");
					select.innerHTML = "";
					for( var n = 0; n < listStores.length; n++){
						var opt = document.createElement("option");
						opt.value= listStores[n];
						opt.innerHTML = listStores[n];
						select.appendChild(opt);
					}//next
					
				} else {
					var select = _getById("sel1");
					select.innerHTML = "";
					_getById("storename").innerHTML = "";
					
					_vars.logMsg = "Empty list iDB stores";
//console.log(msg);
					_alert( _vars.logMsg, "info");
				}

			}
		});
	}//end _listStories()


function defineEvents(){

	window.addEventListener("offline", function(e) {
		_vars.logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(_vars.logMsg, "danger");
	});
	window.addEventListener("online", function(e) {
		_vars.logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(_vars.logMsg, "success");
	});

	var btn_clear_log = _getById("btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};
	
	var dbNameField = _getById("dbname");
	var storeNameField = _getById("storename");
	var recordKeyField = _getById("record-key");
	var recordValueField = _getById("record-value");
	
//----------------------------------	
	var btn_list = _getById("btn-list");
	btn_list.onclick = function(e){
//console.log(e);
		if( !_vars["indexedDBsupport"] ){
			return false;
		}
		_listStories();
	}//end event

//----------------------------------	
	var btn_drop_db = _getById("btn-dropDB");
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
		
		indexedDatabase.dropDB({
			"dbName" : dbName,
			"callback" : function( log, runtime ){
_vars.logMsg="_dropDB(), "+ log +", runtime: " + runtime;
_alert( _vars.logMsg, "warning" );
console.log( _vars.logMsg );
			}
		});

	}//end event


//----------------------------------	
	var btn_create = _getById("btn-create");
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
		
		indexedDatabase.createStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
//console.log( indexedDatabase.dbInfo );

				_vars.logMsg="_createStore(), "+ log +", runtime: " + runtime;
				_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
				_listStories();
			}
		});
		
	}//end event


//----------------------------------	
	var btn_delete_store = _getById("btn-delete-store");
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

		indexedDatabase.deleteStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
				_vars.logMsg = "_deleteStore(), "+ log +", runtime: " + runtime;
//console.log( indexedDatabase.dbInfo );

				_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );

				_listStories();
			}
		});

	}//end event


//----------------------------------	
	var btn_addRecord = _getById("btn-add-record");
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
		
		indexedDatabase.addRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			"recordKey" : recordKey,
			"recordValue" : recordValue,
			"callback" : function( runtime ){
//console.log( indexedDatabase.dbInfo );
				
_vars.logMsg = "_addRecord(), db: <b>"+ dbName +"</b>, data store: <b>"+ storeName + "</b>, key: <b>"+ recordKey+"</b>, runtime: " + runtime;
//_alert( _vars.logMsg, "warning" );
//console.log( _vars.logMsg );
				_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
				_log( _vars.logMsg );
			}
		});

	}//end event


//----------------------------------	
	var btn_addRecords = _getById("btn-add-records");
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
		
		indexedDatabase.addRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"storeData" : storeData,
			"callback" : function( runtime ){
_vars.logMsg = "_addRecords(), db: "+ dbName +", store: "+ storeName +", runtime: " + runtime;
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
//console.log( _vars.logMsg );
			}
		});

	}//end event

//----------------------------------	
	var btn_numRecords = _getById("btn-num-records");
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

		indexedDatabase.numRecords({
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
	var btn_getRecords = _getById("btn-get-records");
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

		indexedDatabase.getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecords(), db: <b>"+ dbName +"</b>, data store: <b>"+ storeName + "</b>, " +runtime + " sec, num records: " + data.length;
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
//console.log( _vars.logMsg );
console.log(data );
			}
		});

	}//end event

//----------------------------------	
	var btn_getRecordsObj = _getById("btn-get-records-obj");
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

		indexedDatabase.getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "get_records_obj",
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecords(), get storeData as object, db: <b>"+ dbName +"</b>, store:<b>"+ storeName + "</b>, " +runtime + " sec...";
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
//console.log( _vars.logMsg );
console.log(data );
			}
		});

	}//end event

//----------------------------------	
	var btn_getRecord = _getById("btn-get-record");
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

		indexedDatabase.getRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			//"action" : "get_record",//?
			"recordKey" : recordKey,
			"callback" : function( data, runtime ){
_vars.logMsg = "_getRecord(), db: "+ dbName +", store:"+ storeName + ", " +runtime + " sec, num records: " + data.length;
_vars.logMsg += ", success get record with key " + recordKey;
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
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
	var btn_deleteRecord = _getById("btn-delete-record");
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

		indexedDatabase.deleteRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			//"action" : "delete_record",//?
			"recordKey" : recordKey,
			"callback" : function( log ){
_vars.logMsg = "_deleteRecord(), "+ log;
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
//_alert( _vars.logMsg, "warning" );
			}
		});

	}//end event


//----------------------------------	
	var btn_clearStore = _getById("btn-clear-store");
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

		indexedDatabase.clearStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
_vars.logMsg = "_clearStore(), "+ log + ", " +runtime + " sec";
_vars.logMsg = _wrapLogMsg( _vars.logMsg, indexedDatabase.dbInfo["iDBparams"]["runStatus"] );
_log( _vars.logMsg );
			}
		});

	}//end event


//----------------------------------	
/*
	if( _getById("btn-load") ){
		_getById("btn-load").onclick = function(){
			_loadSpr({
				"url" : _getById("input_file").value,
				"callback" : function( res ){
console.log("after load...", res.length);				
						// var _dbName = _getById("dbname").value;
						// var _storeName = _getById("storename").value;
						// if( _storeName.length === 0 ){
							// var _url = _getById("input_file").value;
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
if( _getById("btn-run-query") ){
	var btn_runQuery = _getById("btn-run-query");
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
}

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

function _getById(id){
	
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
}//end _getById()

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
	
	var output = _getById(id);
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