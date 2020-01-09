//console.log for old IE
if(!window.console){
	console = {
		log : function(message){
			alert(message);
		}
	}
}


var _timer = {};
var _set_timer = function (){
	var d = new Date;
	return d.getTime();
};

var _get_timer = function (timer){
	var d = new Date;
	return parseFloat((d.getTime() - timer)/1000);
};


function _log( msg, id){
	if(!id) id = "log";
	if( msg.length === 0){
		document.getElementById(id).innerHTML = "";
	}
	//if( window.console && window.console.log) {
		//console.log(msg)
	//};
	document.getElementById(id).innerHTML += "<p>" + msg + "</p>";
}


//var _timer = {};
var db_info = [];
//db_info["import"] = [];

db_info["dbname"] = "mobapp";
//db_info["version"] = 0;
db_info["useIndex"] = false;

db_info["tables"] = [];
db_info["tables"]["SL_KODIF"] = {
	// "fields" : [
		// "TABLE_NAME",
		// "BLOCK_NAME",
		// "FIELD_NAME",
		// "FIELD_MAIN_NAME",
		// "KLASS_NOM",
		// "KLASS_TYPE",
		// "KOD_TEXT",
		// "ARCHIVE_STAT",
		// "CONDITION",
		// "FIELDS",
		// "PERM_NAME",
		// "ORDER_BY",
		// "LUS_POINT",
		// "ID"],
	"fields" : [
"TASK_NAME",
"DB_TABLE_NAME",
"TABLE_NAME",
"BLOCK_NAME",
"FIELD_NAME",
"FIELD_MAIN_NAME",
"FIELD_TYPE",
"KLASS_NOM",
"KLASS_TYPE",
"FULL_MODE",
"FILL_1_MODE",
"LIST_TYPE",
"KLASS_LANG",
"N_LEVEL",
"CONDITION",
"FIELDS",
"OPER_TRUE",
"OPER_FALSE",
"PERM_NAME",
"USER_ROLE",
"USER_ROLE_ON",
"TIME_STAMP",
"ORDER_BY",
"KOD_TEXT",
"LUS_POINT",
"ITEM_TYPE",
"MAIN_TASK",
"K2K_ITEM",
"K2K_ITEM_NULL",
"K2K_NAME",
"K2K_REV",
"LOV_LEN",
"ARCHIVE_STAT",
"TRANSLIT_LANG",
"IEST_DISPL",
"LOV_LANG",
"USE_TXT",
"USER_ROLE_ON_SET",
"ID",
"GO_NEXT",
"UNIQ_COLUMN",
"INS_USER",
"INS_DATE",
"UPD_USER",
"UPD_DATE"
		],
	//"keyName" : "ID",
	"partSize" : 1
};

db_info["tables"]["AR_ADR_LVL_1"] = {
	"fields" : [
"KOD",
"TXT",
"TXT_LOV",
"ORD_LOV",
"ARCHIVE_STAT"
		],
		"keyName" : "KOD",
		"partSize" : 1
};	

db_info["tables"]["AR_ADR_LVL_2"] = {
	"fields" : [
"KOD",
"TXT",
"TXT_LOV",
"TXT_D",
"ORD_LOV",
"ARCHIVE_STAT",
"LVL_1_KOD"
		],
		//"keyName" : "",
		"partSize" : 1
};	

db_info["tables"]["AR_ADR_LVL_3"] = {
	"fields" : [
"KOD",
"TXT",
"TXT_LOV",
"TXT_D",
"ORD_LOV",
"ARCHIVE_STAT",
"LVL_1_KOD",
"LVL_2_KOD",
"TXT_D2"
		],
		//"keyName" : "",
		"partSize" : 1
};	

db_info["tables"]["AR_ADR_LVL_4"] = {
	"fields" : [
"KOD",
"TXT",
"TXT_LOV",
"TXT_D",
"ORD_LOV",
"ARCHIVE_STAT",
"LVL_1_KOD",
"LVL_2_KOD",
"LVL_3_KOD",
"TXT_D2"
		],
		//"keyName" : "",
		"partSize" : 1
};	

db_info["tables"]["AR_ADR_LVL_5"] = {
	"fields" : [
"KOD",
"TXT",
"TXT_LOV",
"ARCHIVE_STAT",
"ORD_LOV",
"LVL_1_KOD",
"LVL_2_KOD",
"LVL_3_KOD",
"LVL_4_KOD",
"PASTS_IND"
		],
		//"keyName" : "",
		"partSize" : 1
};	


db_info["tables"]["PANT"] = {
	"fields" : [
"PANT_VEID_KOD",
"PANTS",
"ZIME",
"DALA",
"APAKS_DALA",
"NOSAUK",
"PANT_ID",
"ARCHIVE_STAT"
		],
	"keyName" : "PANT_ID",
	"partSize" : 1
};	


db_info["tables"]["PMLP_ADR_LVL_1"] ={
	"fields" : [
"KOD",
"TXT",
"ORD_LOV",
"ARCHIVE_STAT"
	],
	"keyName" : "KOD",
	"partSize" : 1
};	
	
db_info["tables"]["PMLP_ADR_LVL_2"] = {
		"fields" : [
"KOD",
"TXT",
"TXT_FULL",
"LVL_1_KOD",
"ORD_LOV",
"ARCHIVE_STAT"
 ],
	"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byLVL_1_KOD", "keyPath":['LVL_1_KOD'], "unique": false }
		//],
	"partSize" : 1
};	

	
	
db_info["tables"]["PMLP_ADR_LVL_3"] = {
		"fields" : [
"KOD",
"TXT",
"TXT_FULL",
"LVL_1_KOD",
"LVL_2_KOD",
"ORD_LOV",
"ARCHIVE_STAT"
		],
	"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byLVL_1_KODLVL_2_KOD", "keyPath":['LVL_1_KOD', 'LVL_2_KOD'], "unique": false }
		//],
	"partSize" : 1
};


db_info["tables"]["PMLP_ADR_LVL_4"] = {
		"fields" : [
"KOD",
"TXT",
"LVL_1_KOD",
"LVL_2_KOD",
"LVL_3_KOD",
"ORD_LOV",
"ARCHIVE_STAT"
		],
		//"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byLVL_1_KODLVL_2_KOD", "keyPath":['LVL_1_KOD', 'LVL_2_KOD'], "unique": false },
			//{"name":"byLVL_1_KODLVL_2_KODLVL_3_KOD", "keyPath":['LVL_1_KOD', 'LVL_2_KOD', 'LVL_3_KOD'], "unique": false }
		//],
	"partSize" : 1
};	

	
db_info["tables"]["SIMPLE_SPR"] = {
	"fields" : [
		"NOMER",
		"KOD",
		"KOD_MAIN",
		"TXT",
		"TEXT2",
		"ORDER_BY",
		"ARCHIVE_STAT"
	],
	"keyName" : "NOMERKODKOD_MAIN",
	"partSize" : 1
};
	
db_info["tables"]["_SIMPLE_SPR"] = {
	"fields" : [
		"NOMER",
		"KOD",
		"KOD_MAIN",
		"TXT",
		"TEXT2",
		"ORDER_BY",
		"ARCHIVE_STAT"
	],
	//"keyName" : "NOMERKODKOD_MAIN",
	"partSize" : 1
};
	
db_info["tables"]["SL_KLASS_PERM"] = {
		"fields" : [
"PERM_NAME",
"NOMER",
"TABLE_NAME",
"ZAPRET",
"KOD",
"ID"
		],
	"keyName" : "ID",
	"partSize" : 1
};	


db_info["tables"]["SL_TILTS"] = {
		"fields" : [
"KOD",
"RAJONS_KOD",
"PILSETA_KOD",
"CEL_KOD",
"TXT",
"KM",
"ARCHIVE_STAT"
		],
	"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byRAJONS_KODPILSETA_KODCEL_KOD", "keyPath":['RAJONS_KOD', 'PILSETA_KOD', 'CEL_KOD'], "unique": false }
		//],
	"partSize" : 1
};


db_info["tables"]["SL_LUS"] = {
		"fields" : [
"SL_LUS_ID",
"LUS_TYPE",
"OPER",
"TRUE_LUS_ID",
"FALSE_LUS_ID",
"P1",
"P1_NVL",
"P1_TO_TYPE",
"P1_FORMAT",
"P2",
"P2_NVL",
"P2_TO_TYPE",
"P2_FORMAT",
"ENTRY_NAME",
"ENTRY_COMMENT",
"GO_FIELD",
"ORDER_BY"
		],
	"keyName" : "SL_LUS_ID",
	"partSize" : 1
};


function init(){
console.log(db_info);
	
	document.getElementById("dbname").value = db_info["dbname"];
	document.getElementById("btn-list").click();
	_listStories();
	
	document.getElementById("btn-list").onclick = function(){
		_listStories();
	}//end event

	document.getElementById("btn-dropDB").onclick = function(){
		_dropDB({
			"dbName" : document.getElementById("dbname").value,
			"callback" : function( log, runtime ){
			var msg = "_dropDB(), "+ log +", runtime: " + runtime;
console.log(msg);
_log(msg);
				_log("", "store-list");
			}
		});
	}//end event

	document.getElementById("btn-drop").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		_deleteStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
var msg = "_deleteStore(), "+ log +", runtime: " + runtime;
console.log(msg);
_log(msg);
				_listStories();
			}
		});
		
		
	}//end event

	document.getElementById("btn-create").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		_createStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( log, runtime ){
var msg = "_createStore(), "+ log +", runtime: " + runtime;
console.log(msg);
_log(msg);
				_listStories();
			}
		});
	}//end event

	
	document.getElementById("btn-add-record").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		_addRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			"recordKey" : document.getElementById("record-key").value,
			"recordValue" : document.getElementById("record-value").value,
			"callback" : function( runtime ){
var msg = "_addRecord(), "+ dbName +", "+ storeName +", runtime: " + runtime;
console.log(msg);
_log(msg);
			}
		});
		
	}//end event
	
	document.getElementById("btn-add-records").onclick = function(){
		
		var storeData = [];
		storeData.push({"value" : "value1"});
		storeData.push({"value" : "value2"});
		storeData.push({"value" : "value3"});
		
		_addRecords({
			"dbName" : document.getElementById("dbname").value,
			"storeName" : document.getElementById("storename").value,
			"storeData" : storeData,
			"callback" : function( runtime ){
//var msg = "_addRecords(), runtime: " + runtime;				
//console.log(msg);
//_log(msg);
			}
		});
		
	}//end event
	

	document.getElementById("btn-num-records").onclick = function(){
		_numRecords({
			"dbName" : document.getElementById("dbname").value,
			"storeName" : document.getElementById("storename").value,
			"callback" : function( num ){
				var msg = "_numRecords(), store:" + document.getElementById("storename").value + ", " + num + " records.";
console.log(msg);
_log(msg);
			}
		});
		
	}//end event


	document.getElementById("btn-get-records").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		_getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"callback" : function( data, runtime ){
//var msg = "_getRecords(), "+ dbName +"."+ storeName + ", " +runtime + " sec, num records: " + data.length;				
//_log(msg);
//console.log(msg);
console.log(data );
			}
		});
		
	}//end event
	
	document.getElementById("btn-get-records-obj").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		_getRecords({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "get_records_obj",
			"callback" : function( data, runtime ){
var msg = "_getRecords(), get storeData as object, "+ dbName +"."+ storeName + ", " +runtime + " sec";				
_log(msg);
console.log(msg);
console.log(data );
			}
		});
		
	}//end event
	
	document.getElementById("btn-get-record").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		
		var recordKey = parseInt( document.getElementById("record-key").value );
//console.log(recordKey);
		if( isNaN(recordKey) ){
			var recordKey = document.getElementById("record-key").value;
		}
		
		_getRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "get_record",
			"recordKey" : recordKey,
			"callback" : function( data, runtime ){
var msg = "_getRecord(), "+ dbName +"."+ storeName + ", " +runtime + " sec";				
msg += ", success get record with key " + recordKey;
_log(msg);
console.log(data);
				if(data){
					_log(data );
				} else {
					_log(typeof data );
				}
				
			}
		});
		
	}//end event
	
	document.getElementById("btn-delete-record").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		
		var recordKey = parseInt( document.getElementById("record-key").value );
//console.log(recordKey);
		if( isNaN(recordKey) ){
			var recordKey = document.getElementById("record-key").value;
		}
		
		_deleteRecord({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "delete_record",
			"recordKey" : recordKey,
			"callback" : function( log, runtime ){
var msg = "_deleteRecord(), "+ log + ", " +runtime + " sec";				
_log(msg);
			}
		});
		
	}//end event
	
	document.getElementById("btn-clear-store").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		
		_clearStore({
			"dbName" : dbName,
			"storeName" : storeName,
			"action" : "clear_store",
			"callback" : function( log, runtime ){
var msg = "_clearStore(), "+ log + ", " +runtime + " sec";				
_log(msg);
			}
		});
	}//end event
	
	document.getElementById("btn-get-info").onclick = function(){
	}//end event

	
	document.getElementById("btn-load").onclick = function(){
		var url = document.getElementById("input_file").value;
		_loadSpr( url );
	}//end event

	document.getElementById("btn-run-query").onclick = function(){
		var dbName = document.getElementById("dbname").value;
		var storeName = document.getElementById("storename").value;
		
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
select distinct txt text,kod kod,kod_main kod_main,null km from SIMPLE_SPR where 
nomer = 175 and 
kod_main is null  and 
kod in(select kod from sl_klass_perm where perm_name='CPR_175' and nomer=175)
*/

		var queryObj = {
			"action" : "select",
			"distinct"	: true,
			"tableName": "SIMPLE_SPR",
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

/*
		var queryObj = {
					"action" : "select",
					"tableName": "SL_KLASS_PERM",
					"targetFields" : ["KOD", "ZAPRET"],
					"where" : [
						{"key" : "PERM_NAME", "value" : "CPR_175", "compare": "="},
						{"logic": "AND", "key" : "NOMER", "value" : "175", "compare": "="},
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
var msg = "- end process queries, num records: " + data.length;
console.log( msg );
_log(msg);
console.log( data );
			}
		});

	}//end event
	
	document.getElementById("btn-import").onclick = function(){
	}//end event
	
	

/*	
	document.getElementById("btn-run-test").onclick = function(){
	}//end event
*/
	
}//end init()	


function _changeValue( fid, value ){
//console.log( value );	
	document.getElementById( fid ).value = value;	
}


	function _loadSpr( url ){
		var pos_last_dot = url.lastIndexOf(".");
		//var pos_last = url.length;
		//var type = url.substring( pos_last_dot + 1, pos_last );
		var pos_last_slash = url.lastIndexOf("/");
		
		timeStart = new Date();
		//_timer["total"] = _set_timer();
	
		var xhr = createRequestObject();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function(){
//console.log("State:" + xhr.readyState );
			if( xhr.readyState === 4){
//console.log("Status: " + xhr.status );
				if( xhr.status === 200){
//document.getElementById("log").innerHTML += xhr.responseText;
					var timeEnd = new Date();
					var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
					
					//_timer["ajax_load"] = "ajax load url: " + url + ", runtime: " + runtime +" sec";
					_log("ajax load url: " + url + ", runtime: " + runtime +" sec");
					
					var _dbName = document.getElementById("dbname").value;
					var _storeName = document.getElementById("storename").value;
					if( _storeName.length === 0 ){
						_storeName = url.substring( pos_last_slash+1, pos_last_dot ).toUpperCase();
					}

					var _storeDataJson = __parseCSVTable( xhr.responseText, _storeName );
					if( _storeDataJson ){
						_saveRecords({
							"dbName" : _dbName,
							"storeName" : _storeName,
							"json" : _storeDataJson,
							"callback" : function(){
var msg = "Saved records to " + _dbName + "." + _storeName;								
console.log(msg);
_log(msg);								
							}
						});
					}

				} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
				}
			}
		};
		xhr.send();
		
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

		if( db_info["tables"][tableName] &&
			db_info["tables"][tableName]["fields"]){
			var _listFields = db_info["tables"][tableName]["fields"];
		} else {
var msg = "Error,  not find field info for " +tableName+ " in db_info['tables']";		
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
		
		for( var n1 = 0; n1 < importData.length; n1++){
			var record = importData[n1].replace(/\"/g,"");
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

			//filter, replace commas within text value
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
			"dbName": db_info["dbname"],
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
		if( db_info["tables"][storeName] &&
			db_info["tables"][storeName]["keyName"] &&
			db_info["tables"][storeName]["keyName"].length > 0){
				
			var keyName = db_info["tables"][storeName]["keyName"];
			
		} else {
var msg = "Warning,  not find 'keyName' info for " +storeName+ " in db_info['tables']";		
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
			"dbName": db_info["dbname"],
			"storeName" : "",
			"queryObj" : {//ex: SELECT KOD, TXT, KOD_MAIN FROM SIMPLE_SPR WHERE KOD IN (1,5) AND NOMER=945
				"action" : "", //"select",
				"distinct" : false,
				"orderBy" : false,
				"tableName": "", //"SIMPLE_SPR",
				"targetFields" : "", //["KOD", "TXT", "KOD_MAIN"],
				"where" : [], /*[
					{"key" : "KOD_MAIN", "value" : "(1,5)", "compare": "IN"},
					{"logic": "AND", "key" : "NOMER", "value" : 945, "compare": "="}
				],*/
				"callback" : null
			}, 
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
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
							if( db_info["tables"][tableName] &&
								db_info["tables"][tableName]["fields"]){
								var _listFields = db_info["tables"][tableName]["fields"];
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
var msg = "Error,  not find field info for " +tableName+ " in db_info['tables']";		
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
				
		function _checkConditons( record, conditions){
//console.log( "function _checkConditons, ", conditions );
			
			//var result = false;
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
//console.log( key, record[key], condition["value"], n, record["checkResult"][n] );
						}
					break;

					case "!=":
						if( record[key] !== condition["value"] ){
							record["checkResult"][n] = true;							
						}
					break;

					case "IN":

						var list_values = condition["value"];

						//result = false;
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
									//result = true;
									record["checkResult"][n] = true;
//console.log( key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record["checkResult"] );
									break;
								} //else {
									//record["checkResult"][n] = false;
								//}
								
							} else { //"NOT IN"
							
								if( record[key] !== list_values[n2].toString() ){
//console.log(record[key], key, typeof record[key], list_values[n2], typeof list_values[n2] );
									//result = true;
									record["checkResult"][n] = true;
									break;
								}
								
							}
							
						}//next

					break;
					
				}//end switch
				
			}//next condition

// if( record["NOMER"] === "945"){
// console.log(record["checkResult"], record["checkResult"].length);
// }			

			//count result check ("AND")
			var test = false;
			for( var n = 0; n < record["checkResult"].length; n++){
				if( record["checkResult"][n] ){
					test = true;
				} else {
					test = false;
					break;
				}
			}//next condition
			
// if(test){
// console.log(record["checkResult"], test);
// }			
			return test;
			//return result;
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
		_log("", "store-list");
		_log("<p><b>list DB stores</b></p>", "store-list");
		_getListStores({
			"dbName" : document.getElementById("dbname").value,
			"callback": function( listStores ){
//console.log("callback, getListStores ", listStores);

				if( typeof listStores !== "undefined" &&
						listStores.length > 0){
					var html = "<ol>";						
					for( var n = 0; n < listStores.length; n++){
						html += "<li>" + listStores[n] + "</li>";
					}
					html += "</ol>";
					
					_log(html, "store-list");
//console.log(html);
						
				} else {
					var msg = "Empty list iDB stores";
					console.log(msg);
					_log("<p>" + msg + "</p>", "store-list");
				}

			}
		});
	}//end _listStories()

	var _createStore = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": db_info["dbname"],
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
		
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "create_store",
			"callback" : _postFunc
		});

		function _postFunc(log){ 
//console.log(options);
//console.log("callback, create_store, " + options["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof options["callback"] == "function"){
				options["callback"](log, runtime_s);
			}

		}//end _postFunc()
		
	};//end _createStore()


	var _getListStores = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": db_info["dbname"],
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);
		
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
			"dbName": db_info["dbname"],
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["dbName"].length === 0){
var msg = "Parameters error, needed 'dbName'";
console.log( msg );
_log(msg);
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
			"dbName": db_info["dbname"],
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
	
		var timeStart = new Date();
		iDB({
			"dbName" : options["dbName"],
			"storeName" : options["storeName"],
			"action" : "delete_store",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log(options);
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
			"dbName": db_info["dbname"],
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
console.log(arguments);
		var options = {
			"dbName": db_info["dbname"],
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
			"dbName": db_info["dbname"],
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
var msg = "_addRecords(), runtime: " + runtime_s;				
console.log(msg);
_log(msg);
			if( typeof options["callback"] == "function"){
				options["callback"](runtime_s);
			}

		}//end _postFunc()
		
	};//end _addRecords()
	

	var _numRecords = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": db_info["dbname"],
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
			"dbName": db_info["dbname"],
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
var msg = "Parameters error, needed 'storeName'";			
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
var msg = "_getRecords(), "+ options["dbName"] +"."+ options["storeName"] + ", " +runtime_s + " sec, num records: " + data.length;				
_log(msg);
console.log(msg);
//console.log(data );

			if( typeof options["callback"] == "function"){
				options["callback"]( data, runtime_s );
			}

		}//end _postFunc()
		
	};//end _getRecords()

	var _getRecord = function( opt ){
//console.log(arguments);
		var options = {
			"dbName": db_info["dbname"],
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
			"dbName": db_info["dbname"],
			"storeName": "",
			"action": "delete_record",
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
			"dbName": db_info["dbname"],
			"storeName": "",
			"storeData" : "",
			"action": "",
			"recordKey" : null,
			"recordValue" : "",
			"callback": null
		};
		db_info["iDBparams"] = _iDBparams;
		
		//extend options object
		for(var key in opt ){
			_iDBparams[key] = opt[key];
		}
console.log( "iDB(), " + _iDBparams["action"], _iDBparams["storeName"] );
		
		switch( _iDBparams["action"] ){
			case "create_store":
			case "delete_store":
				//if( db){
					//db.close();
				//}
				
				// if( db_info["version"] === 0){
					// _get_version({
						// "dbName": _iDBparams["dbName"],
						// "callback" : _set_version
					// });
				// } else {
					// db_info["version"]++;
// console.log( "new_version = " + db_info["version"] );					
					// try{
						// var request = indexedDB.open( _iDBparams["dbName"], db_info["version"] );
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
				"dbName": db_info["dbname"],
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
var msg = options["dbName"] + ", db.version = " + db.version, db;
console.log(msg);				
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
			db_info["version"] = new_version;
console.log("function set_version_iDB(), ", current_db_version, new_version);
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
var msg = "dont create "  + _iDBparams["storeName"] + ", store is exists....";
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
//var msg = "Create store " + _iDBparams["storeName"] + ' in ' + _iDBparams["dbName"];
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
var msg = '(request.onsuccess)Error opening database '  + _iDBparams["dbName"];
console.log(msg, e);				
				};
				db.onabort = function(e) {
var msg = '(request.onsuccess)Database ' + _iDBparams["dbName"] + ' opening aborted!';
console.log(msg, e);				
				};
				db.onversionchange = function(e) {
var msg = '(request.onsuccess)db.onversionchange';
console.log(msg, e);				
				};

				switch( _iDBparams["action"] ){
					case "add_records":
						if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
							_run_transaction();
						} else {
var msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
console.log(msg);
_log(msg);

							var buffer = _iDBparams["callback"];
							var storeData = _iDBparams["storeData"];
							iDB({
								"storeName" : _iDBparams["storeName"],
								"action" : "create_store",
								"callback" : function(){
//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
//console.log(msg, buffer, storeData);
//_log(msg);

									iDB({
										"storeName" : _iDBparams["storeName"],
										"storeData" : storeData,
										"action" : "add_records",
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
					
					case "add_record":
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
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["callback"]();
					}
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
				db_info["useCursor"] = useCursor;
//useCursor = true;//for test

				var useIndex = db_info["useIndex"];
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
				var useIndex = db_info["useIndex"];
				
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
var msg = _iDBparams["storeName"] + ", transaction get_records complete.!!!";
console.log(msg);
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
						try{
							var request = store.put( value);
						} catch(e){
console.log(e);
console.log("1.indexedDB error, store.put", value);
						}
						
					} else {
						//var request = store.add( value, key );
						try{
							var request = store.put( value, key );
						} catch(e){
console.log(e);
console.log("2.indexedDB error, store.put", value, key);
						}
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
						// if( e.target.error.name === "UnknownError"){
// console.log("test4, " + e.target.error.name);
						// }
						_iDBparams["runStatus"] = "error";				
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
			
		}//end _run_transaction()
	}//end iDB()
	
	
			//for search with index
			// function _iDBsearch( query_obj ){
				// if ('getAll' in store) {
					// var useCursor = false;
				// } else {
					// var useCursor = true;
				// }
				// //var useCursor = true;//for test
				
				// var useIndex = false;
				// var keyRange = false;
				// database["query"]["result"] = [];
// console.log("iDBsearch()", query_obj, store["name"], "useCursor: " + useCursor);

					
				// if( 
// query_obj["fieldName"] === "iestade_kod" ||
// query_obj["fieldName"] === "reg_iestade_kod"
				// ){
					// var indexName = "byNOMERKOD_MAIN";
					// //check exists index
					// useIndex = checkIndexName( indexName, store.indexNames);
					// if( useIndex) {
						// //Run query with index
// /*
// select distinct txt text,kod kod,null kod_main,null km
// from SIMPLE_SPR where KOD_MAIN IN (1,5) 
// and nomer = "170";
// */
						// //get values for searching
						// var n1 = query_obj["where"][0]["value"][0];//KOD_MAIN IN (1,5)
						// var n2 = query_obj["where"][0]["value"][1];
						// var nomer = query_obj["where"][1]["value"];//NOMER = "170"
						
						// try{
							// keyRange = IDBKeyRange.only( [ nomer, n1 ] );//1376
							// _process();
						// }
						// catch(e){
// console.log(e);							
							// useIndex = false;
						// }
								
						// try{
							// keyRange = IDBKeyRange.only( [ nomer, n2 ] );//86
							// _process();
						// }
						// catch(e){
// console.log(e);							
							// useIndex = false;
						// }
						
					// }
				// }//end if fieldname

				
				// //Run query and subquery with index
				// if( 
// query_obj["fieldName"] === "park_noform_kod" //||
// //query_obj["fieldName"] === "pant_veid_kod"
// //query_obj["fieldName"] === "tl_tip_kod" ||
// //soda_veid_kod
// //valuta
// //prot_punkt-pant_veid_kod
// //prot_panti-pant_veid_kod
// //spried_sods-soda_veid_kod
// ){
// /*
// select distinct txt text,kod kod,kod_main kod_main,null km 
// from SIMPLE_SPR where nomer = "175" 
// and kod_main is null -- sl_kodif_row.FIELD_MAIN_NAME === null 
// and kod in(select kod from sl_klass_perm where perm_name="CPR_175" and nomer="175")
// */
					// var indexName = "byNOMERKOD_MAIN";
					// //check exists index
					// //useIndex = checkIndexName( indexName, store.indexNames);
// useIndex = false;
					// if( useIndex) {

						// var nomer = query_obj["where"][0]["value"];
						// var kod_main = query_obj["where"][1]["value"];
// //var kod = runIndexQuery( query_obj["where"][2]["value"]["where"] );
// //["1", "10", "11","12","14","16","17","18","19","20","25","28","3","33","38","39","4","40","41","42","43","5","7","8","9"];
						// try{
							// keyRange = IDBKeyRange.only( [nomer, kod_main] );
							// _process();
						// }
						// catch(e){
// console.log(e);							
							// useIndex = false;
						// }

// /*						
						// var subQuery = query_obj["where"][2]["value"];
						// subQuery["callback"] = callBack;
						// _iDBquery( subQuery );
						
						// function callBack( codes ){ 
// console.log("park_noform_kod, callback function.....", codes);
							// //form keys
							// var nomer = query_obj["where"][0]["value"];
							// var kod_main = query_obj["where"][1]["value"];
							// var keys = [];
							// for( var n = 0; n < codes.length; n++){
								// var key = "key_" + nomer + codes[n]["KOD"] + kod_main;
								// keys.push(key);
							// }
// //console.log(keys);
							// //get records by keys
							// var counter = 0;
							// database["action"] = "get_record";
							// database["storeName"] = query_obj["tableName"];
							// database["record_key"] = keys[counter];
							// iDB( callBack2 );
							
							// function callBack2( record ){ 
// console.log("Get record, callback function, ", record, counter);
								// database["query"]["result"].push(record);
								// counter++;
								// if( counter < keys.length){
									// database["action"] = "get_record";
									// database["storeName"] = query_obj["tableName"];
									// database["record_key"] = keys[counter];
									// iDB( callBack2 );
								// } else {
									// if( typeof query_obj["callback"] === "function"){
										// query_obj["callback"]( database["query"]["result"] );
									// }
								// }
							// }//end callBack2()

						// };//end callBack()
// */
					// }
					
				// }//end if fieldname

				
				// if( 
// query_obj["fieldName"] === "sast_pakape" ||
// query_obj["fieldName"] === "amats" ||
// query_obj["fieldName"] === "pers_status_kod" ||
// query_obj["fieldName"] === "pers_valsts_kod" ||
// query_obj["fieldName"] === "pers_pilson_kod" ||
// query_obj["fieldName"] === "pers_var_kod" ||
// query_obj["fieldName"] === "veid_ietekm_kod" ||
// query_obj["fieldName"] === "promil_kod" ||
// query_obj["fieldName"] === "pers_adr_valsts_kod" ||
// query_obj["fieldName"] === "amt_valsts_kod" ||
// query_obj["fieldName"] === "ipas_valsts_kod" ||
// query_obj["fieldName"] === "ipas_pilson_kod" ||
// query_obj["fieldName"] === "ipas_var_kod" ||
// query_obj["fieldName"] === "ipas_adr_valsts_kod" ||
// query_obj["fieldName"] === "ipas_adr_pilseta_kod" ||
// query_obj["fieldName"] === "ipas_adr_ciems_kod" ||
// query_obj["fieldName"] === "ipas_adr_iela_kod" ||
// query_obj["fieldName"] === "pilseta1_kod" ||
// query_obj["fieldName"] === "ciems1_kod" ||
// query_obj["fieldName"] === "iela1_kod" ||
// query_obj["fieldName"] === "iela2_kod" ||
// query_obj["fieldName"] === "cel1_kod" ||
// query_obj["fieldName"] === "cel2_kod" ||
// query_obj["fieldName"] === "tilts1_kod" ||
// query_obj["fieldName"] === "pers_adr_pilseta_kod" ||
// query_obj["fieldName"] === "pers_adr_ciems_kod" ||
// query_obj["fieldName"] === "pers_adr_iela_kod" ||
// query_obj["fieldName"] === "kont_kod" ||
// query_obj["fieldName"] === "kat_kod" ||
// query_obj["fieldName"] === "marka_kod" ||
// query_obj["fieldName"] === "model_kod" ||
// query_obj["fieldName"] === "krasa1_kod"
				// ){
					
					// //form indexName from condition keys
					// var indexName = "by";
					// //var indexName = "byNOMERKOD_MAIN";
					// //var indexName = "byNOMERKOD_MAINKOD";
					// //var indexName = "byLVL_1_KOD";
					// //var indexName = "byLVL_1_KODLVL_2_KOD";
					// //var indexName = "byLVL_1_KODLVL_2_KODLVL_3_KOD";
					// //var indexName = "byRAJONS_KODPILSETA_KODCEL_KOD";
					// for(var n = 0; n < query_obj["where"].length; n++){
						// var key = query_obj["where"][n]["key"];
						// indexName += key;
					// }
// //console.log("indexName:" + indexName);
					
					// //check exists index
					// useIndex = checkIndexName( indexName, store.indexNames);
					// if( useIndex) {
						// //Run query with index
// /*
	// select distinct kod kod,txt text,kod_main, nomer, null km
	// from SIMPLE_SPR where 
	// nomer = "779" 
	// and kod_main is null 
	// order by order_by

// //select distinct txt text,kod kod,null kod_main,null km 
// //from PMLP_ADR_LVL_2 
// //WHERE LVL_1_KOD="30"
// //order by ORD_LOV

// //select txt text,kod kod, LVL_1_KOD, LVL_2_KOD
// //from PMLP_ADR_LVL_3
// //WHERE LVL_1_KOD="98"
// //AND LVL_2_KOD="9860"
// //ORDER BY ORD_LOV
	
// */
						// //get values for searching
						// //var v1 = query_obj["where"][0]["value"];//NOMER
						// //var v2 = query_obj["where"][1]["value"];//KOD_MAIN
						// //keyRange = IDBKeyRange.only( [v1, v2] );
						// var searchValues = [];
						// for(var n = 0; n < query_obj["where"].length; n++){
							// var value = query_obj["where"][n]["value"];
							// searchValues.push(value);
						// }
// //console.log(searchValues);	
								
						// try{
							// keyRange = IDBKeyRange.only( searchValues );
							// _process();
						// }
						// catch(e){
// //IE does not support compound indices
// console.log(e);							
							// useIndex = false;
						// }
					// }

				// }//end if fieldname
				
				// if( useIndex) {
					// var result = [];
					
					// transaction.oncomplete = function(event) {
// var msg = "_iDBsearch(), transaction complete.";
// console.log(msg);
						// var table = [];
						
						// //select target fields
						// var targetFields = query_obj["targetFields"];
						// for( var n1 = 0; n1 < database["query"]["result"].length; n1++){
							// var record = database["query"]["result"][n1];
							// var obj = {};
							// for( var n2 = 0; n2 < targetFields.length; n2++){
								// obj[ targetFields[n2] ] = record[ targetFields[n2] ];
							// }
							// table.push(obj);
						// }

						// //sorting
						// if ( query_obj["order_by"] ){
// console.log("SORT by field " + query_obj["order_by"]);
								// //var table = database["query"]["result"];
								// var sortField = query_obj["order_by"];
								// table.sort( function (a, b){
									// var a_order = parseInt( a[sortField] );
									// var b_order = parseInt( b[sortField] );
									// if (a_order > b_order) {
										// return 1;
									// }
									// if (a_order < b_order) {
										// return -1;
									// }
									// // a === b
									// return 0;
								// });			
// //console.log( table);  
						// }
						
						// //clear for next query_obj
						// database["query"]=[];
						
						// if( typeof query_obj["callback"] === "function"){
							// query_obj["callback"]( table );
						// }
					// };
					
				// } else {//full text search in store
					// database["action"] = "run_query";
					// //database["storeName"] = "SIMPLE_SPR";
					// //database["query"]["tableName"] = "SIMPLE_SPR";
					// iDB();
				// }
					
				// function _process(){
// console.log("iDBsearch(),_process(), ", "useCursor: " + useCursor, "useIndex: " + useIndex, "indexName: " + indexName );
// //console.log( keyRange );
					// if ( !useCursor ) {
						// if( useIndex ){
							
							// try{
								// var index = store.index( indexName );
								// //keyRange = IDBKeyRange.only( [value1, value2] );
								// index.getAll( keyRange ).onsuccess = function(event) {
									// result = event.target.result;
// //console.log(result);				
									// if(!database["query"]["result"]){
										// database["query"]["result"] = [];
									// }
									// for( var n = 0; n < result.length; n++){
										// database["query"]["result"].push( result[n] );
									// }
									
								// };
							// } catch(e){
// console.log( e );
							// }
							
						// }
					// };
					
					// if ( useCursor ) {
						// if( useIndex ){
							
							// try{
								// var index = store.index( indexName );
								// //keyRange = IDBKeyRange.only( [value1, value2] );
								// index.openCursor( keyRange ).onsuccess = function(event) {
									// if(!database["query"]["result"]){
										// database["query"]["result"] = [];
									// }
									// var cursor = event.target.result;
									// if (cursor) {
// //console.log( "cursor: " , cursor, cursor.key, cursor.value );
										// result.push( cursor.value );
										// database["query"]["result"].push( cursor.value );
										// cursor["continue"]();
									// }
									
								// };
								
							// } catch(e){
	// //IE does not support compound indices
	// //https://github.com/dfahlander/idb-iegap
// console.log( e );
								// useIndex = false;
							// }
							
						// }
					// };
				// }//end _process
				
				// function checkIndexName( indexName, listIndexNames){
					// var useIndex = false;
					// if( listIndexNames.length > 0){
						// for( var n = 0; n < listIndexNames.length; n++){
// //console.log( listIndexNames[n], indexName );
							// if( indexName === listIndexNames[n]){
								// useIndex = true;
								// break;
							// } else {
// //console.log( "Not find index " + indexName + " in " + _iDBparams["storeName"]);
							// }
						// }//next index
					// } else {
// console.log( "Not find indexes in " + _iDBparams["storeName"]);
					// }
// //console.log( "listIndexNames: ", listIndexNames, " useIndex: " + useIndex, "indexName: " + indexName );
					// return useIndex;
				// }//end checkIndexName()
				
				// /*
				// function runIndexQuery( queryObj ){
					// var permName = queryObj["where"][0]["value"];
					// var nomer = query_obj["where"][1]["value"];
				// }//end runIndexQuery()
				// */
				
			// }//end _iDBsearch()
	