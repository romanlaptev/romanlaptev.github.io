/*
Usage: 

var webSqlDb = webSQLmodule();
console.log("webSQLmodule:", webSqlDb);

//--------------------------------------------- INSERT
	webSqlDb.insertRecord({
		"tableName" : "table1", 
		"values" : { "field1" : "123", "field2" : "789" },
		"callback": function( response ){
//console.log("Response: ", response);
			if( !response["executeSql"]){
var logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
console.log( logMsg );
			}
			
		}
	});
	

//--------------------------------------------- CREATE
	var _fieldsInfo = {
		"id" : "INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT",
		"name" : "TEXT NOT NULL DEFAULT 'John Doe'",
		"calories": "REAL",
		"insertDay": "DATETIME"
	};
	webSqlDb.createTable({
		"tableName" : "table1", 
		"fieldsInfo" : _fieldsInfo,
		"callback": function(  response  ){
console.log("Response: ", response);

			if( !response["executeSql"]){
var logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
console.log( logMsg );
			} 
			
		}
	});

//--------------------------------------- CLEAR
	webSqlDb.clearTable( "table1" );

//--------------------------------------- SELECT
	var _fieldsInfo = {
		"id" : "",
		"name" : "",
		"calories": "",
		"insertDay": ""
	};
	webSqlDb.selectRecords({
		"tableName" :"table1",
		"fields" : _fieldsInfo,
		"operators": "LIMIT 0,10",
		"callback": function( response ){
console.log("Response: ", response);
			if( !response["executeSql"]){
var logMsg = "SQL error, code:" +response["errorSql"].code+ ", "+response["errorSql"].message;
console.log( logMsg );
			}
		}
	});


*/

var webSQLmodule =  function(){
	
//console.log("init webSQLmodule.....");
	
	// private variables and functions
	_vars = {
"logMsg" : "",
"dbName" : webApp.vars["cache"]["dbName"],//"localcache"
"version": "1.0",
"displayName": "Web SQL Database....",
//"initSize" : 1*1024*1024,
"initSize" : 2*1024,
"dbLink" : null
	}//end vars{}
//console.log( _vars );

	function _connectDB(){
		
		if( _vars["dbLink"] ){
			return _vars["dbLink"];
		}
		
		try {
			db = openDatabase( 
				_vars["dbName"], 
				_vars["version"], 
				_vars["displayName"], 
				_vars["initSize"],
				function( database ){
	console.log( "Connect to database " +_vars["dbName"]+"...", "success");
	console.log( database );		
				}
			);
	//console.log(db);
			_vars["dbLink"] = db;
			return db;
			
		} catch(e) {
	console.log(e);
	console.log("Failed to connect to database " + _vars["dbName"], "error");
	console.log("Error code: "+e.code+", " + e.message, "error");
	/*
			if (e == 2) {
				// Version number mismatch.
				alert("Invalid database version.");
			} else {
				alert("Unknown error "+e+".");
			}
	*/
		}//end try
	}//end _connectDB()


	//function _runTransaction( sql, db, callBack ){
	function _runTransaction( opt ){
//console.log(arguments);
		var p = {
			"sql": "",
			"callback": null,
			"values": []
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
		var db = _connectDB();
		var callBack = p["callback"];
//console.log( db, callBack);
		
		var response = {};
		
		if( typeof p["sql"] === "string"){
			db.transaction( function(t){
				t.executeSql( p["sql"], p["values"], onSuccess, onError );
			}, errorCB, successCB );
		} else {
/*			
	//console.log( p["sql"] );
			if( p["sql"].length > 0){
				//var timeStart = new Date();
				db.transaction( function(t){
						for( n = 0; n < sql.length; n++ ){
							t.executeSql( sql[n], [], _onSuccess, _onError );
						}//next
					}, _errorCB, _successCB );//end transaction
			}
*/			
		}

		function errorCB(e) {
_vars.logMsg = "- end transaction, error..";		
console.log(_vars.logMsg, e, typeof e);

_vars.logMsg = "<ul>SQLError";
_vars.logMsg += "<li><b>code:</b>" + e.code +"</li>";
_vars.logMsg += "<li><b>message:</b>" + e.message +"</li>";
_vars.logMsg += "</ul>";
func.logAlert(  _vars.logMsg, "error");

			response["error"] = e;
			response["end_transaction"] = false;
			if( typeof callBack === "function"){
				callBack(response);
			}
		}

		function successCB() {
//_vars.logMsg = "- end transaction, success...";
//console.log(_vars.logMsg, arguments);
			response["end_transaction"] = true;
			if( typeof callBack === "function"){
				callBack(response);
			}
		}
		
		function onSuccess( _SQLTransaction, _SQLResultSet) {
//console.log( arguments );
//console.log("success execute SQL: <b>" + sql +"</b>", "success");
			response["SQLTransaction"] = _SQLTransaction;
			response["SQLResultSet"] = _SQLResultSet;
			response["executeSql"] = true;
		}//end onSuccess
		
		function onError( _SQLTransaction, e) {
console.log("onError()", _SQLTransaction);
			response["executeSql"] = false;
			response["errorSql"] = e;
		}//end onError
		
/*		
	//----------------- callbacks for many executeSql
		function _errorCB(e) {
_vars.logMsg = "- end transaction, error processing SQL:";		
console.log(_vars.logMsg, e);
			if( typeof callBack === "function"){
				callBack();
			}
		}
		function _successCB() {
_vars.logMsg = "- end transaction, success...";
console.log(_vars.logMsg, arguments);
			if( typeof callBack === "function"){
				callBack();
			}
		}

		function _onSuccess(t, result) {
console.log("_onSuccess()", result, result.rows.length );
		}//end _onSuccess
		
		function _onError(t, e) {
	console.log("_onError()", e.code, e.message);
		}//end _onError
*/
		
	}//end _runTransaction()


	function _createTable( opt ){
//console.log(arguments);
		var p = {
			"tableName": "",
			"fieldsInfo": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);	

		//var sql = "CREATE TABLE IF NOT EXISTS " + tableName+ " (food_name TEXT PRIMARY KEY, calories REAL, servings TEXT)";
		//var sql = "CREATE TABLE IF NOT EXISTS " + tableName+ "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT 'John Doe', shirt TEXT NOT NULL DEFAULT 'Purple')";
	//insertDay DATETIME	
	//price INTEGER,


		var sql = "CREATE TABLE IF NOT EXISTS {{table_name}} ( {{fields_info}} );";
		sql = sql.replace("{{table_name}}", p["tableName"]);

		if( p["fieldsInfo"] !== ""){
			var sfieldsInfo = "";
			var n = 0;
			for( var fieldName in p["fieldsInfo"] ){
				if(n > 0){
					sfieldsInfo += ", ";
				}
				sfieldsInfo += fieldName +" "+ p["fieldsInfo"][fieldName];
				n++;
			}//next
			sql = sql.replace("{{fields_info}}", sfieldsInfo);
		} else {
			sql = sql.replace(" {{fields_info}} ", "test TEXT");
		}
		
//console.log( sql );
		_runTransaction({ 
			"sql" : sql, 
			"callback" : postFunc 
		});

		function postFunc( response ){
			if( typeof p["callback"] == "function"){
				p["callback"]( response );
			}
		}//end
	}//end _createTable()


	function _dropTable( tableName ) {
		var sql = "DROP TABLE " + tableName;
		//var db = _connectDB();
		//_runTransaction( sql, db, postFunc );
		_runTransaction({ 
			"sql" : sql, 
			"callback" : postFunc 
		});
		
		function postFunc( result ){
console.log( result, typeof result);
		}

	}//end _dropTable()


	function _clearTable( opt ) {
//console.log(arguments);
		var p = {
			"tableName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);		

		_runTransaction({ 
			"sql" : "DELETE FROM " + p["tableName"], 
			"callback" : postFunc 
		});
		
		
		function postFunc( response ){
_vars.logMsg = "table " + name + " was cleared...";
console.log(_vars.logMsg);
func.logAlert( _vars.logMsg, "warning");

			if( typeof p["callback"] == "function"){
				p["callback"]( response );
			}
		}

	}//end _clearTable()

	function _insertRecord( opt ){
//console.log(arguments);
		var p = {
			"tableName": "",
			"values": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

/*
var str  = '{   "items":[     {     "order": 1,     "item_id": 123123,     "quantity": 10,     "price": 1526896,     "total": 15268960   },   {     "order": 2,     "item_id": 113124,     "quantity": 10,     "price": 1526896,     "total": 15268960   },   {     "order": 3,     "item_id": 163125,     "quantity": 10,     "price": 1626896,     "total": 16268960   },   {     "order": 4,     "item_id": 1723165,     "quantity": 10,     "price": 1726896,     "total": 17268960   },   {     "order": 5,     "item_id": 183190,     "quantity": 10,     "price": 1826896,     "total": 18268960   } ],  "other":[           {         "order": 1,         "item": 123123,         "price": 10              },      {         "order": 2,         "item": 123123,         "price": 10              }      ,{         "order": 3,         "item": 123123,         "price": 10      }      ] }';

tx.executeSql('INSERT INTO TA (id, name) VALUES (?,?)',[94,str]);
*/

		var sql = "INSERT INTO {{table_name}} ( {{fields}} ) VALUES ( {{values}} );";
		//var sql = "insert into {{table_name}} VALUES ( {{values}} );";
		sql = sql.replace("{{table_name}}", p["tableName"] );
		
		if( p["values"] === ""){
			return false;
		}
		
		var sFieldNames = sValues = "";
		var _values = [];
		
		var n = 0;
		for( var fieldName in p["values"] ){
			if(n > 0){
				sFieldNames += ", ";
				sValues += ", ";
			}
			sFieldNames += fieldName;
			
			sValues += "?";
			_values.push( p["values"][fieldName] );
			
			n++;
		}//next
		
		sql = sql.replace("{{values}}", sValues).replace("{{fields}}", sFieldNames);
//console.log( sql );

		_runTransaction({ 
			"sql" : sql, 
			"values" : _values,
			"callback" : postFunc 
		});

		
		function postFunc( response ){
//console.log("INSERT record into "+ p["tableName"], response);
			if( typeof p["callback"] == "function"){
				p["callback"]( response );
			}
		}

	}//end _insertRecord()


	function _selectRecords( opt ){
//console.log(arguments);
		var p = {
			"tableName": "",
			"fields": "",
			"operators": ""
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);	
		
		//var sql = "SELECT * FROM "+ tableName + " LIMIT 2117,1";
		var sql = "SELECT {{fields}} FROM {{table_name}} {{operators}} ";
		sql = sql
		.replace("{{table_name}}", p["tableName"] )
		.replace("{{operators}}", p["operators"] );
		
		if( p["fields"] === ""){
			return false;
		}

		var sFieldNames = "";
		
		var n = 0;
		for( var fieldName in p["fields"] ){
			if(n > 0){
				sFieldNames += ", ";
			}
			sFieldNames += fieldName;
			n++;
		}//next
		
		sql = sql.replace("{{fields}}", sFieldNames);
console.log( sql );
		
		var timeStart = new Date();
		
		_runTransaction({ 
			"sql" : sql, 
			"callback" : postFunc 
		});
			
		function postFunc( response ){
console.log( response );

			var timeEnd = new Date();
			response["runtime"] = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
			if( typeof p["callback"] == "function"){
				p["callback"]( response );
			}
		}//end postFunc
		
	}//end _selectRecords()
	

	// public interfaces
	return{
		createTable: _createTable,
		dropTable: _dropTable,
		// deleteStore: _deleteStore,
		// getListStores: _getListStores,
		// numRecords: _numRecords,
		selectRecords: _selectRecords,
		clearTable: _clearTable,
		// insertRecords: _insertRecords,
		insertRecord: _insertRecord,
		// deleteRecord: _deleteRecord,
		dbInfo: _vars
	};

};//end module
