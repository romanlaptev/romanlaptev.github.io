//console.log for old IE
if(!window.console){
	console = {
		log : function(message){
			alert(message);
		}
	}
}

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

var _timer = {};
var db_info = [];
db_info["import"] = [];

db_info["tables"] = [];

db_info["tables"]["SL_KODIF"] = {
	"fields" : [
		"TABLE_NAME",
		"BLOCK_NAME",
		"FIELD_NAME",
		"FIELD_MAIN_NAME",
		"KLASS_NOM",
		"KLASS_TYPE",
		"KOD_TEXT",
		"ARCHIVE_STAT",
		"CONDITION",
		"FIELDS",
		"PERM_NAME",
		"ORDER_BY",
		"LUS_POINT",
		"ID"],
	//"keyName" : "ID",
	//"partSize" : 1
	"numRec" : 48,
	"testValues" : {
		"TABLE_NAME" : "SIMPLE_SPR",
		"BLOCK_NAME" : "EUCARIS",
		"FIELD_NAME" : "SL_VALSTS",
		"FIELD_MAIN_NAME" : "NULL",
		"KLASS_NOM" : "145",
		"KLASS_TYPE" : "1",
		"KOD_TEXT" : "NULL",
		"ARCHIVE_STAT" : "0",
		"CONDITION" : "1=1",
		"FIELDS" : "NULL",
		"PERM_NAME" : "NULL",
		"ORDER_BY" : "order_by",
		"LUS_POINT" : "NULL",
		"ID" : "488481"
	}
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
		//"keyName" : "PANT_ID",
		//"partSize" : 100
	"numRec" : 4389,
	"testValues" : {
		"PANT_VEID_KOD" : "116",
		"PANTS" : "1",
		"ZIME" : "1",
		"DALA" : "1",
		"APAKS_DALA" : "1",
		"NOSAUK" : "1",
		"PANT_ID" : "796871",
		"ARCHIVE_STAT" : "0"
	}
};	


db_info["tables"]["PMLP_ADR_LVL_1"] ={
	"fields" : [
"KOD",
"TXT",
"ORD_LOV",
"ARCHIVE_STAT"
	],
	//"keyName" : "KOD",
	//"partSize" : 1
	"numRec" : 166,
	"testValues" : {
		"KOD" : "30",
		"TXT" : "ABRENES RAJONS",
		"ORD_LOV" : "1",
		"ARCHIVE_STAT" : "1"
	}
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
		//"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byLVL_1_KOD", "keyPath":['LVL_1_KOD'], "unique": false }
		//],
		//"partSize" : 100
	"numRec" : 1695,
	"testValues" : {
		"KOD" : "-010000",
		"TXT" : "RIGA",
		"TXT_FULL" : "RIGA",
		"LVL_1_KOD" : "NULL",
		"ORD_LOV" : "1",
		"ARCHIVE_STAT" : "0"
	}
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
		//"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byLVL_1_KODLVL_2_KOD", "keyPath":['LVL_1_KOD', 'LVL_2_KOD'], "unique": false }
		//],
		//"partSize" : 100//200
	"numRec" : 20201,
	"testValues" : {
		"KOD" : "-010091",
		"TXT" : "CENTRA RAJONS",
		"TXT_FULL" : "CENTRA RAJONS",
		"LVL_1_KOD" : "NULL",
		"LVL_2_KOD" : "-010000",
		"ORD_LOV" : "1",
		"ARCHIVE_STAT" : "0"
	}
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
		//"partSize" : 100
	"numRec" : 46384,
	"testValues" : {
		"KOD" : "-64520706281",
		"TXT" : "1. ATPUTAS IELA",
		"LVL_1_KOD" : "-648500",
		"LVL_2_KOD" : "-648552",
		"LVL_3_KOD" : "-645207",
		"ORD_LOV" : "1",
		"ARCHIVE_STAT" : "0"
	}
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
	//"keyName" : "NOMERKODKOD_MAIN",
	//"partSize" : 100
	"numRec" : 28780,
	"testValues" : {
		"NOMER" : "984",
		"KOD" : "17",
		"KOD_MAIN" : "NULL",
		"TXT" : "UZLIKTS ADMINISTRATIVAIS SODS",
		"TEXT2" : "NULL",
		"ORDER_BY" : "999",
		"ARCHIVE_STAT" : "0"
	}
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
		//"keyName" : "ID",
		//"partSize" : 1
	"numRec" : 229,
	"testValues" : {
		"PERM_NAME" : "CPR_175",
		"NOMER" : "175",
		"TABLE_NAME" : "NULL",
		"ZAPRET" : "N",
		"KOD" : "1",
		"ID" : "977931"
	}
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
		//"keyName" : "KOD",
		//"indexes" : [
			//{"name":"byRAJONS_KODPILSETA_KODCEL_KOD", "keyPath":['RAJONS_KOD', 'PILSETA_KOD', 'CEL_KOD'], "unique": false }
		//],
		//"partSize" : 100
	"numRec" : 1906,
	"testValues" : {
		"KOD" : "517",
		"RAJONS_KOD" : "-320000",
		"PILSETA_KOD" : "NULL",
		"CEL_KOD" : "P0086",
		"TXT" : "TILTS PAR ZALVITE",
		"KM" : "30,2",
		"ARCHIVE_STAT" : "0"
	}
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
		//"keyName" : "SL_LUS_ID",
		//"partSize" : 1
	"numRec" : 575,
	"testValues" : {
		"SL_LUS_ID" : "1223551",
		"LUS_TYPE" : "IF",
		"OPER" : "=",
		"TRUE_LUS_ID" : "1223581",
		"FALSE_LUS_ID" : "NULL",
		"P1" : ":eucaris.sl_valsts",
		"P1_NVL" : "NULL",
		"P1_TO_TYPE" : "NULL",
		"P1_FORMAT" : "NULL",
		"P2" : "DEU",
		"P2_NVL" : "NULL",
		"P2_TO_TYPE" : "NULL",
		"P2_FORMAT" : "NULL",
		"ENTRY_NAME" : "EUCARIS_ENABLE",
		"ENTRY_COMMENT" : "NULL",
		"GO_FIELD" : "NULL",
		"ORDER_BY" : "2"
	}
};
	
	
function init(){
console.log(db_info);
	
	getAllTablesFromDB();

	document.getElementById("btn-list").onclick = function(){
		getAllTablesFromDB();
	}//end event
	
	document.getElementById("websql-create").onclick = function(){
		var tableName = document.getElementById("tablename").value;
		
		if( !db_info["tables"][ tableName ] ||
				db_info["tables"][ tableName ]["fields"].length === 0){
			return false;
		}
		
		createTable({
			"tableName" : tableName, 
			"fieldsInfo" : db_info["tables"][ tableName ]["fields"],
			"executeQuery" : true,
			"displayLog" : true
		});
		
	}//end event

	document.getElementById("websql-drop").onclick = function(){
		var name = document.getElementById("tablename").value;
		dropTable( name );
	}//end event

	document.getElementById("btn-drop-tables").onclick = function(){
		getAllTables(function( list ){
//console.log(list);
			for( var n = 0; n < list.length; n++ ){
				dropTable( list[n] );				
			}
			getAllTablesFromDB();			
		});
	}//end event

	document.getElementById("btn-insert").onclick = function(){
		
		var tableName = document.getElementById("tablename").value;
		
//var sql = "insert into "+ tableName +" (name, shirt) VALUES ('Joe', 'Green');";
//	var sql = "insert into people (name, shirt) VALUES ('Mark', 'Blue');";
//	var sql = "insert into people (name, shirt) VALUES ('Phil', 'Orange');";
//	var sql = "insert into people (name, shirt) VALUES ('jdoe', 'Purple');";

		var db = connectDB();
		//var sql = "insert into {{table_name}} ( {{fields}} ) VALUES ( {{values}} );";
		var sql = "insert into {{table_name}} VALUES ( {{values}} );";
		sql = sql.replace("{{table_name}}", tableName);
		
//for( var n1 = 0; n1 < 100000; n1++ ){
		//var fields = "";
		var values = "";
		for( var n = 0; n < db_info["tables"][tableName]["fields"].length; n++){
			//var fieldName = db_info["tables"][tableName]["fields"][n];
			if(n > 0){
				//fields += ", ";
				values += ", ";
			}
			//fields += fieldName;
			values += "'Test!'";
		}
		//sql = sql.replace("{{fields}}", fields);
		sql = sql.replace("{{values}}", values);
//console.log( sql );
		runTransaction( sql, db, postFunc, true );
//}//next		
		
		function postFunc( result ){
console.log("INSERT record into "+ tableName, result);
		}
		
	}//end event

	document.getElementById("btn-select").onclick = function(){
		var tableName = document.getElementById("tablename").value;
		//var sql = "SELECT * FROM "+ tableName + " LIMIT 2117,1";
		var sql = "SELECT * FROM "+ tableName;
		var db = connectDB();
		var timeStart = new Date();
		runTransaction( sql, db, postFunc, true );
		
		function postFunc( result ){
//console.log( sql, result);
			var timeEnd = new Date();
			var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			_log("");
			var msg = "- " + sql + ", runtime: " + runtime +" sec";
			var listHtml = "";
if( result.rows){
			msg += ", read " + result.rows.length + " records.";
			

			//read first record
			var _list = "<ol>{{list}}</ol>";
			var _items = "";
			_items += "First record:";
			for(var item in result.rows.item(0) ){
				_items += "<li><b>"+ item +"</b> : " + result.rows.item(0)[item] + "</li>";
			}
			listHtml += _list.replace("{{list}}", _items);
			
			//read last record
			var _list = "<ol>{{list}}</ol>";
			var _items = "";
			var len = result.rows.length - 1;
			_items += "Last record:";
			for(var item in result.rows.item( len ) ){
				_items += "<li><b>"+ item +"</b> : " + result.rows.item( len )[item] + "</li>";
			}
			listHtml += _list.replace("{{list}}", _items);
/*
			for(var n = 0; n < result.rows.length; n++){
				var _list = "<ol>{{list}}</ol>";
				var _items = "";
				for(var item in result.rows.item(n) ){
					_items += "<li>"+ item +" : " + result.rows.item(n)[item] + "</li>";
				}
				listHtml += _list.replace("{{list}}", _items);
			}
*/
}
			_log( msg );
			_log( listHtml );
		}
		
	}//end event


	document.getElementById("btn-load").onclick = function(){
		var url = document.getElementById("input_file").value;
		_loadSpr( url );
	}//end event

	document.getElementById("btn-run-test").onclick = function(){
		
		if( !db_info["tables"] ){
			return false;
		}
		
		_timer["total"] = _set_timer();
		
		_log("", "wait");
		_log("Wait...", "wait");
		
		_log("");
		var msg = "- run SAVE test";
		_log(msg);
		
		var count = 0;
		var sql = [];
		for( var tableName in db_info["tables"] ){
//console.log( tableName, db_info["tables"][tableName] );

//------- form create query
			var createQuery = createTable({
				"tableName" :  tableName,
				"fieldsInfo" : db_info["tables"][ tableName ]["fields"],
				//"executeQuery" : false,
				"displayLog" : true
			});
			sql.push( createQuery );
			
//------- form insert query
if( db_info["tables"][tableName]["numRec"] && 
		db_info["tables"][tableName]["testValues"]){
			
			var sqlTemplate = "INSERT INTO {{table_name}} ( {{fields}} ) VALUES ( {{values}} );";
			var dBrecord = db_info["tables"][tableName]["fields"];
			var numRec = db_info["tables"][tableName]["numRec"];
			var record = db_info["tables"][tableName]["testValues"];
			for( var n = 0; n < numRec; n++ ){
			//for( var n = 0; n < 1; n++ ){
				
				var insertQuery = sqlTemplate.replace("{{table_name}}", tableName);
				var sFields = "";
				var sValues = "";
				
				for( var fieldName in record ){
		//console.log( fieldName, record[fieldName] );			

					for( var n1 = 0; n1 < dBrecord.length; n1++){
		//console.log( dBrecord[n1] );
						if( fieldName === dBrecord[n1] ){
							if( n1 > 0){
								sFields += ", ";
								sValues += ", ";
							}
							sFields += fieldName;
							sValues += "'" +record[fieldName] +"'";
						}
					}//next
					
				}//next
		//console.log( sFields);
		//console.log( sValues );
				
				insertQuery = insertQuery.replace("{{fields}}", sFields);
				insertQuery = insertQuery.replace("{{values}}", sValues);
		//console.log( insertQuery );
				
				sql.push( insertQuery );
			}//next		
			
}
			count++;
		}//next
//console.log(sql);

		if( sql.length > 0){
			var db = connectDB();
var msg = "- form queries, run DB transaction.";
_log( msg);
			runTransaction( sql, db, postFunc, false );
		}
		
		function postFunc(){
			_log("", "wait");
			var msg = "- end SAVE test";
			_log( msg);
		
var total = _get_timer( _timer["total"] );		
msg = "<b>DB Mobapp: CREATE " +count+ " tables and INSERT records</b>";
msg += ", total time: " + total + " sec.";		
console.log( msg );
_log(msg);
			testSelect();
		}//end postFunc()
		
		function testSelect(){
			
			var msg = "- run READ test";
			_log(msg);
			
			for( var tableName in db_info["tables"] ){
				//var tableName = "SL_KODIF";
				var sql = "SELECT * FROM "+ tableName;
				runTransaction( sql, db, postSelect, false );
			}//next
			
			function postSelect( result, sql ){
//console.log( result, sql );
				var msg = "- " + sql;
				//var runtime = 0;
				//msg += ", runtime: " + runtime +" sec";
				if( result.rows){
					msg += ", read " + result.rows.length + " records.";
				}
				_log( msg );
			}//end postSelect()
			
		}//end testSelect()

		
	}//end event
	
}//end init()	

function _changeValue( fid, value ){
//console.log( value );	
	document.getElementById( fid ).value = value;	
}

function _loadSpr( url ){
	var pos_last_dot = url.lastIndexOf(".");
	var pos_last = url.length;
	var type = url.substring( pos_last_dot + 1, pos_last );
	
	_timer["total"] = _set_timer();
	
	var timeStart = new Date();
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
				
				_timer["ajax_load"] = "ajax load url: " + url + ", runtime: " + runtime +" sec";
				
				var pos_last_slash = url.lastIndexOf("/");
				var tableName = url.substring( pos_last_slash+1, pos_last_dot );
				var table = __parseCSVTable( xhr.responseText, tableName );
				
				_saveRecords( table, tableName );

			} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
			}
		}
	};
	xhr.send();
}//end _loadSpr()		

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
		var importData = rawData.split('\r\n');
	} else {
		var importData = rawData.split('\n');
	}
//console.log( importData );

	//detect table block info (name, size, start postion)
	db_info["import"]["blocks"] = __detectBlockInfo( importData );
	if( db_info["import"]["blocks"]["numBlock"] === 0){
var msg = "Warn! Can't detect data blocks in input data.";		
console.log( msg );
		return false;
	}
	
	var res = __parse( importData, db_info["import"]["blocks"] );
	if(!res){
var msg = "Error! Can't parse data blocks from input data.";		
console.log( msg );
		return false;
	}
			
//console.log( res );

	var blocksInfo = db_info["import"]["blocks"];
	for( var blockName in blocksInfo ){
		if( blockName === "numBlock"){
			continue;
		}
		if( blockName === tableName ){
			/*
			//save json in memory
			if( tableName === "SL_KODIF" ||
					tableName === "SL_KLASS_PERM"){
				db_info["tables"][tableName]["json"] = blocksInfo[blockName]["json"];
			}
			
			if( tableName === "PMLP_ADR_LVL_1" ||
				tableName === "PMLP_ADR_LVL_2" ||
				tableName === "PMLP_ADR_LVL_3"){
				db_info["tables"][tableName]["json"] = blocksInfo[blockName]["json"];
			}
			*/
			return blocksInfo[blockName]["json"];
		}
	}//next
	
	
	var table = [];
	return table;
	
}//end __parseCSVTable()

function __detectBlockInfo( importData ){
	var blocksInfo = [];
	var startPos = 0, counter = 0;
	
	//detect table block info (name, size, start postion)
	for( var n = 1; n < importData.length; n++){//exclude first line
		
		//LUS import, skip date
		//if( importData[n] === "skip"){
			//continue;
		//}
			
		var test_value = importData[n].substr(0, 1);
		if( test_value.length > 0 && 
				test_value !== "*" &&
					test_value !== "-"
			){
			
			var startPos = n + 1;
//console.log( importData[n], startPos );
			var block_info = importData[n].split(",")
//console.log( block_info);
			var blockName = block_info[0];
			var blockSize = parseInt( block_info[1] );
			
			if( !blocksInfo[blockName] ){
				blocksInfo[blockName] = [];
			}
			if( !blocksInfo[blockName]["location"] ){
				blocksInfo[blockName]["location"] = [];
			}
			
			if( blockName === "SL_LUS"){
				__correctFormat( startPos, blockSize);
				//startPos = n + 2;
			}
			
			var location = {
					"startPos" : startPos,
					"size" : blockSize
				};
			blocksInfo[blockName]["location"].push(location);
		}
	}//next record
	
	//calculate number of blocks
	var numBlock = 0
	for( var key in blocksInfo){
		numBlock++;
	}
	blocksInfo["numBlock"] = numBlock;
	
	return blocksInfo;
	
	
	function __correctFormat( startPos, size){
//console.log( "__correctFormat()", startPos, typeof startPos, size, typeof size, importData.length);
		//importData[ startPos ] = "skip";//skip date
		//var pos = startPos + 1;
		var pos = startPos;
		for( var n = pos; n < (pos+size); n++){
			//LUS block, correct data format for import
			if( importData[n][0] !== "*" ){
				importData[n] = "*," + importData[n];
			}
		}//next record
	}//end __correctFormat()
	
}//end __detectBlockInfo()

function __parse( importData, blocksInfo ){
//console.log( "function __parse(), ", arguments );
	for( var blockName in blocksInfo ){
		if( blockName === "numBlock"){
			continue;
		}				
		
		var block = blocksInfo[blockName];
		var location = block["location"];
		
		for( var n = 0; n < location.length; n++){
			var startPos = location[n]["startPos"];
			var size = location[n]["size"];
			
			//processing for one block data
			if( db_info["tables"][blockName] ){
				var listFields = db_info["tables"][blockName]["fields"];
			} else {
var msg = "Error! Can't detect " +blockName+ " in database['tables'].";		
console.log( msg );
				return false;
			}
			

			for( var n2 = startPos; n2 < (startPos + size ); n2++){
//----------------
if( importData[n2][0] === "-"){
console.log( "Warn!!! not to save deleted records...",  importData[n2]);
continue;
}
//----------------
				var record = importData[n2].replace("*,","");
				var recordObj = _parseCSV( record, listFields );
				if( recordObj ){
					if( !block["json"] ){
						block["json"] = [];
					}
					block["json"].push( recordObj );
				}
				
			}//next

			
		}//next
		
	}//next
	
	return true;
}//__parse()


function _parseCSV( str, listFields ){
//console.log( str, typeof str);
	if( typeof str !== "string" ){
console.log("_parseCSV(), error, input record is not in CSV format");
		return false;
	}
	
	if( str.length === 0 ){
console.log("_parseCSV(), error, input record is empty!");
		//return false;
		return false;//test
	}

	var record = {};
	
	//create keys(fieldnames)
	for( var n2 = 0; n2 < listFields.length; n2++){
		var key = listFields[n2];
		record[ key ] = "";
	}//next field

	//filter, replace commas within text value
	var regexp = /'(.*?)'/g;
	var filter = [];
	while( result = regexp.exec( str )){
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
	
	for( var n2 =0; n2 < filter.length; n2++){
		var s1 = filter[n2]["raw"];
		var s2 = filter[n2]["filtered"];
		str = str.replace( s1, s2 );
	}
//console.log( str );
	str = str.replace(/'/g,"");
	var f_values = str.split(",");
//console.log( f_values, f_values.length );

	var num = 0;
	for( var key in record){
		//restore commas in text value
		if( f_values[num].indexOf("&#44;") !== -1){
			f_values[num] = f_values[num].replace(/&#44;/g, ",");
		}

		//filter '$'
		if( f_values[num].indexOf("$") !== -1){
			f_values[num] = f_values[num].replace(/\$/g,"&#36;");
		}
//rawData = rawData.replace(/\$/g,"&#36;");	
		
		record[key] = f_values[num];
//if( key === "ID"){
//console.log(key, record[key], num, f_values[num]);
//}
		num++;
	}//next field
	
//console.log(record);				
	return record;
}//end _parseCSV

function _saveRecords( json, tableName ){
console.log("function _saveRecords(), ", arguments);

	if( !json ){
		return false;
	}
	if( !tableName ){
		return false;
	}
	if( !db_info["tables"][ tableName ] ||
			db_info["tables"][ tableName ]["fields"].length === 0){
		return false;
	}
		
	var sql = [];
	var createQuery = createTable({
		"tableName" :  tableName,
		"fieldsInfo" : db_info["tables"][ tableName ]["fields"],
		//"executeQuery" : false,
		"displayLog" : true
	});
	
	sql.push( createQuery );
	
	var sqlTemplate = "INSERT INTO {{table_name}} ( {{fields}} ) VALUES ( {{values}} );";
	var dBrecord = db_info["tables"][tableName]["fields"];
	for( var n = 0; n < json.length; n++ ){
	//for( var n = 0; n < 1; n++ ){
		
		var insertQuery = sqlTemplate.replace("{{table_name}}", tableName);
		var sFields = "";
		var sValues = "";
		var record = json[n];
		for( var fieldName in record ){
//console.log( fieldName, record[fieldName] );			

			for( var n1 = 0; n1 < dBrecord.length; n1++){
//console.log( dBrecord[n1] );
				if( fieldName === dBrecord[n1] ){
					if( n1 > 0){
						sFields += ", ";
						sValues += ", ";
					}
					sFields += fieldName;
					sValues += "'" +record[fieldName] +"'";
				}
			}//next
			
		}//next
//console.log( sFields);
//console.log( sValues );
		
		insertQuery = insertQuery.replace("{{fields}}", sFields);
		insertQuery = insertQuery.replace("{{values}}", sValues);
//console.log( insertQuery );
		
		sql.push( insertQuery );
	}//next		
	
//console.log(sql);
	if( sql.length > 0){
		var db = connectDB();
		runTransaction( sql, db, postFunc, false );
	}

/*
	
	var db = connectDB();
	var sqlTemplate = "insert into {{table_name}} ( {{fields}} ) VALUES ( {{values}} );";
	
	var dBrecord = db_info["tables"][tableName]["fields"];
	for( var n = 0; n < json.length; n++ ){
	//for( var n = 0; n < 1; n++ ){
		
		var sql = sqlTemplate.replace("{{table_name}}", tableName);
		var sFields = "";
		var sValues = "";
		var record = json[n];
		for( var fieldName in record ){
//console.log( fieldName, record[fieldName] );			

			for( var n1 = 0; n1 < dBrecord.length; n1++){
//console.log( dBrecord[n1] );
				if( fieldName === dBrecord[n1] ){
					if( n1 > 0){
						sFields += ", ";
						sValues += ", ";
					}
					sFields += fieldName;
					sValues += "'" +record[fieldName] +"'";
				}
			}//next
			
		}//next
//console.log( sFields);
//console.log( sValues );
		
		sql = sql.replace("{{fields}}", sFields);
		sql = sql.replace("{{values}}", sValues);
//console.log( sql );
		runTransaction( sql, db, postFunc, false );
	}//next		
*/	
	
	function postFunc(){
var total = _get_timer( _timer["total"] );		
var msg = "- save records to " + tableName;
msg += ", total time: " + total + " sec.";		
msg += ", <i>(" + _timer["ajax_load"] + ")</i>";
console.log( msg );
_log(msg);
	}
		
}//end _saveRecords







function connectDB(){
	
	var dbName = document.getElementById("dbname").value;
	var version = document.getElementById("dbversion").value;//'1.0';
	var displayName = document.getElementById("dbdesc").value;//'mobapp database';
	var initSize = 1*1024*1024;
	
	try {
		db = openDatabase( 
			dbName, 
			version, 
			displayName, 
			initSize/*,
			function( database ){
alert( "DB was created!");
console.log(db, database);		
			}*/
		);   
console.log(db);		
		return db;
		
	} catch(e) {
console.log(e);
_log("Failed to connect to database " + dbName);
_log("<p>Error code: "+e.code+", <b class='text-danger'>" + e.message + "</b></p>");

/*
		if (e == 2) {
			// Version number mismatch.
			alert("Invalid database version.");
		} else {
			alert("Unknown error "+e+".");
		}
*/
	}//end try
}//end connectDB()

function createTable( opts ){
//console.log("createTable(), ", opts);	

	//var sql = "CREATE TABLE IF NOT EXISTS " + tableName+ " (food_name TEXT PRIMARY KEY, calories REAL, servings TEXT)";
	//var sql = "CREATE TABLE IF NOT EXISTS " + tableName+ "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT 'John Doe', shirt TEXT NOT NULL DEFAULT 'Purple')";
	
	var tableName = opts["tableName"];
	var fieldsInfo = opts["fieldsInfo"];
	var displayLog = opts["displayLog"];
	var executeQuery = opts["executeQuery"] || false;

	var sql = "CREATE TABLE IF NOT EXISTS {{table_name}} ( {{fields_info}} );";
	sql = sql.replace("{{table_name}}", tableName);

	var sfieldsInfo = "";
	var fieldParam = "TEXT";// add !!!!!!!!!!!!!!!!!!!!!!!!!!!, 
	for( var n = 0; n < fieldsInfo.length; n++ ){
		var fieldName = fieldsInfo[n];
		if(n > 0){
			sfieldsInfo += ", ";
		}
		sfieldsInfo += fieldName +" "+ fieldParam;
	}
	sql = sql.replace("{{fields_info}}", sfieldsInfo);
//console.log( sql );

	if( executeQuery ){
		
		if( opts["db"] ){
			var db = opts["db"];
		} else {
			var db = connectDB();
		}
		runTransaction( sql, db, postFunc, displayLog );
		
	} else {
		return sql;
	}
	
	function postFunc( result ){
//console.log("postFunc()!!!", result);
console.log("table " +tableName+ " was created!");
		getAllTablesFromDB();
	}

}//end createTables


function dropTable( name ) {
	
	var sql = "DROP TABLE " + name;
	var db = connectDB();
	runTransaction( sql, db, postFunc, true );
	
	function postFunc( result ){
//console.log("postFunc()!!!", result, typeof result);
console.log("table " +name+ " dropped.");
		//getAllTablesFromDB();
	}

}//end dropTable()


function getAllTablesFromDB(){
	
	var sql = 'SELECT tbl_name from sqlite_master WHERE type = "table"';
	var db = connectDB();
	runTransaction( sql, db, postFunc, true );
		
	function postFunc( result ){
//console.log("postFunc()!!!", result, result.rows.length);
		//_log("");
		var _list = "<ol>{{list}}</ol>";
		var _items = "";
		for(var n = 0; n < result.rows.length; n++){
			for(var item in result.rows.item(n) ){
				_items += "<li>"+ item +" : " + result.rows.item(n)[item] + "</li>";
			}
		}
		log.innerHTML += _list.replace("{{list}}", _items);
	}
	
}//end getAllTablesFromDB()

function getAllTables( callBack ){
	var sql = 'SELECT tbl_name from sqlite_master WHERE type = "table"';
	var db = connectDB();
	runTransaction( sql, db, postFunc, true );
		
	function postFunc( result ){
		var list = [];
//console.log("postFunc()!!!", result, result.rows.length);

		for(var n = 0; n < result.rows.length; n++){
			list.push( result.rows.item(n)["tbl_name"] );
		}
		if( typeof callBack === "function"){
			callBack( list );
		}
	}//end postFunc()
	
}//end getAllTables()


function runTransaction( sql, db, callBack, log ){
	
	
	if( typeof sql === "string"){
		//var timeStart = new Date();
		db.transaction( function(t){
			t.executeSql( sql, [], onSuccess, onError );
		}, errorCB, successCB );//end transaction
	} else {
//console.log(sql);
		if( sql.length > 0){
			//var timeStart = new Date();
			db.transaction( function(t){
					for( n = 0; n < sql.length; n++ ){
						t.executeSql( sql[n], [], _onSuccess, _onError );
					}//next
				}, _errorCB, _successCB );//end transaction
		}
	}

	function errorCB(e) {
var msg = "- errorCB(e), end transaction, error processing SQL";		
_log(msg);
console.log(msg, e);
	}

	function successCB() {
var msg = "- successCB(), end transaction, success...";
//_log(msg);
console.log(msg, arguments);
	}
	
	function onSuccess(t, result) {
//console.log("onSuccess()", result, result.rows.length);
		if(log){
_log("onSuccess(): <b>" + sql +"</b>");
		}
		
		//var timeEnd = new Date();
		//var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("onSuccess()", sql, runtime );
		if( typeof callBack === "function"){
			callBack( result, sql );
		}
		
	}//end onSuccess
	
	function onError(t, e) {
console.log("onError()", e.code, e.message, sql);
		if(log){
var msg = "<p>onError(), "+sql+", code: "+e.code+", <b class='text-danger'>" + e.message + "</b></p>";
_log(msg);
		}
	}//end onError
	
//----------------- callbacks for many executeSql
	function _errorCB(e) {
var msg = "- _errorCB(e), end transaction, error processing SQL:";		
_log(msg);
console.log(msg, e);
		if( typeof callBack === "function"){
			callBack();
		}
	}
	function _successCB() {
var msg = "- _successCB(), end transaction, success...";
_log(msg);
console.log(msg, arguments);
		if( typeof callBack === "function"){
			callBack();
		}
	}

	function _onSuccess(t, result) {
//console.log("_onSuccess()", result, result.rows.length );
		if(log){
_log("_onSuccess(), <b>" + sql +"</b>");
		}
	}//end _onSuccess
	
	function _onError(t, e) {
console.log("_onError()", e.code, e.message);

		if(log){
_log("<p>_onError(), code: "+e.code+", <b class='text-danger'>" + e.message + "</b></p>");
		}
	}//end _onError
	
}//end runTransaction()

/*
function insertData(db, title, context) {
	db.transaction(function (e) {
		var day = new Date();
		e.executeSql("INSERT INTO tizenTable(title, content, insertDay) VALUES (?, ?, ?)", [title, context, day], onSuccess, onError);
	});
}//end insertData();
*/

/*
  var db;

    function runExample() {
      createDbAndTables();
      getAllTablesFromDB(getResultSetFromTable);
    }

    function createDbAndTables(callback) {
      db = openDatabase('mydb1', '1.0', 'my first database', 2 * 1024 * 1024);
      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl1 (id INTERGER UNIQUE, name TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl2 (id INTERGER UNIQUE, name TEXT)');
        tx.executeSql('INSERT INTO tbl1 (id,name) VALUES (1,"someone1")');
        tx.executeSql('INSERT INTO tbl1 (id,name) VALUES (2,"someone2")');
        tx.executeSql('INSERT INTO tbl2 (id,name) VALUES (3,"someone3")');
        tx.executeSql('INSERT INTO tbl2 (id,name) VALUES (4,"someone4")');
      });
    }

    function getAllTablesFromDB(callback) {
      db.transaction(function(tx) {
        tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table"', [], function(tx, results) {
          callback(results, processResultSet);
        });
      });
    }

    function getResultSetFromTable(results, callback) {
      var length = results.rows.length;
      var j = 0;
      for (var i = 0; i < length; i++) {
        db.transaction(function(tx) {
          var k=0,tblname=results.rows[j++].tbl_name;
          tx.executeSql('SELECT * FROM ' + tblname , [], function(tx, results) {
            callback(tblname,results);
          });
        });
      }

    }

    function processResultSet(tblname,results) {
      console.log('----------------------'+tblname)
      var len = results.rows.length;
      var tbl = document.createElement('table');
      var trTblName = document.createElement('tr');
      var thTblName = document.createElement('th');
      thTblName.innerHTML = tblname;
      trTblName.colSpan = 2;
      trTblName.appendChild(thTblName);
      tbl.appendChild(trTblName);

      var trHeader = document.createElement('tr');
      var th1 = document.createElement('th');
      th1.innerHTML = 'id';
      var th2 = document.createElement('th');
      th2.innerHTML = 'name';
      trHeader.appendChild(th1);
      trHeader.appendChild(th2);
      tbl.appendChild(trHeader);

      for (var i = 0; i < len; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = results.rows[i].id;
        var td2 = document.createElement('td');
        td2.innerHTML = results.rows[i].name;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
      }
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tbl);
      body.appendChild(document.createElement('hr'));
    }
*/