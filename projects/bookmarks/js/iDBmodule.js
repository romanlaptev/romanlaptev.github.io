/*
var indexedDatabase = iDBmodule();
console.log("indexedDatabase module:", indexedDatabase);
*/
var iDBmodule =  function(){
//console.log("init iDBmodule.....");
	
	// private variables and functions
	_vars = {
"logMsg" : "",
		
//"indexedDBsupport" : window.indexedDB ? true : false,
//window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
		
//"webSQLsupport" : window.openDatabase  ? true : false,
//"localStorageSupport" : window['localStorage']  ? true : false,
		
//"version": 0,
"useIndex" : false,
"iDBparams" : {},
"errorDescription": ""
	}//end vars{}

	var _createStore = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
	//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "_createStore(), error, argument 'storeName' empty.... ";
			_error = true;
		}
		
		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
		
		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : "create_store",
			"callback" : _postFunc
		});

		function _postFunc(log){ 
//console.log(p);
//console.log(arguments);
			
			var timeEnd = new Date();
			var runtime_s = ( timeEnd.getTime() - timeStart.getTime() ) / 1000;
	//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
console.log( _vars.iDBparams );
				
				p["callback"](log, runtime_s);
			}

		}//end _postFunc()
		
	};//end _createStore()



	var _dropDB = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["dbName"].length === 0){
			_vars["errorDescription"]  = "_dropDB(), error, argument 'dbName' empty.... ";
			_error = true;
		}
	
		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
		
		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"action" : "drop_db",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log("_dropDB(), end process...." + p["dbName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _dropDB()



	var _deleteStore = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "_deleteStore(), error, argument 'storeName' empty.... ";
			_error = true;
		}
		
		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : "delete_store",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log(arguments);
//console.log("callback, delete_store, " + p["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _deleteStore()




	var _getListStores = function( opt ){
	//console.log(arguments);
		var p = {
			"dbName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
	//console.log(p);
	
		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}
		
		if( p["dbName"].length === 0){
_vars["errorDescription"] = "_getListStores(), error, argument 'dbName' empty.... ";
			_error = true;
		}
		
		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
		
		iDB({
			"dbName" : p["dbName"],
			"action" : "get_list_stores",
			"callback" : _postFunc
		});

		function _postFunc( res ){ 
	//console.log(p);
	//console.log("callback, getListStores ", res, p["callback"], p["storeName"]);
			if( typeof p["callback"] == "function"){
				p["callback"](res);
			}
		}//end _postFunc()
		
	};//end _getListStores()



	var _numRecords = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "Parameters error, required 'storeName'";			
			_error = true;
		}

		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}

		//var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : "number_records",
			"callback" : _postFunc
		});


		function _postFunc( num ){ 
//console.log("callback, number_records, " + p["storeName"], num);
			// var timeEnd = new Date();
			// var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
// //console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"](num);
			}

		}//end _postFunc()
	};//end _numRecords()




	var _getRecords = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"action": "get_records",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "_getRecords(), error, argument 'storeName' empty.... ";
			_error = true;
		}

		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
		
		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : p["action"],
			"callback" : _postFunc
		});


		function _postFunc( data ){ 
//console.log("callback, get_records, " + p["storeName"]);
			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);
//console.log(data );
			if( typeof p["callback"] == "function"){
				p["callback"]( data, runtime_s );
			}
		}//end _postFunc()
		
	};//end _getRecords()




//*доработка - если opt["recordKey"] является массивом, то выбрать все записи, перечисленные в opt["recordKey"]
	var _getRecord = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"action": "get_record",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p, p["recordKey"].length, p["recordKey"] || p["recordKey"].length === 0);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( !p["storeName"] || p["storeName"].length === 0){
			_vars["errorDescription"]  = "_getRecord(), error, argument 'storeName' empty.... ";
			_error = true;
		}
		if( !p["recordKey"] || p["recordKey"].length === 0){
			_vars["errorDescription"]  = "_getRecord(), error, argument 'recordKey' empty.... ";
			_error = true;
		}

		if( _error ){
			_vars["iDBparams"]["runStatus"] = "error";
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
		
		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : p["action"],
			"recordKey" : p["recordKey"],
			"callback" : _postFunc
		});

		function _postFunc( data ){ 
//console.log("callback, get_record, " + p["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"]( data, runtime_s );
			}

		}//end _postFunc()
		
	};//end _getRecord()



	var _clearStore = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( !p["storeName"] || p["storeName"].length === 0){
			_vars["errorDescription"]  = "_clearStore(), error, argument 'storeName' empty.... ";
			_error = true;
		}
	
		if( _error ){
			_vars["iDBparams"]["runStatus"] = "error";
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}
	
		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : "clear_store",
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log(p);
//console.log("callback, clear_store, " + p["storeName"], log, _vars["iDBparams"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

//console.log(p["callback"].toString() );
			if( typeof p["callback"] == "function"){
				p["callback"](log, runtime_s);
			}

		}//end _postFunc()
	};//end _clearStore	()



	var _addRecords = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"storeData": [ {"key":"","value":""}, {"key":"","value":""} ],
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "Parameters error, required 'storeName'";			
			_error = true;
		}
		if( p["storeData"].length === 0 &&
			typeof p["storeData"] !== "object"){
console.log( "Parameters error, required 'storeData' " );
			_error = true;
		}

		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"storeData" : p["storeData"],
			"action" : "add_records",
			"callback" : _postFunc
		});

		function _postFunc(){ 
//console.log("callback, add_records, " + p["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//var msg  = "_addRecords(), runtime: " + runtime_s;				
//console.log(msg);
			if( typeof p["callback"] == "function"){
				p["callback"](runtime_s);
			}

		}//end _postFunc()
		
	};//end _addRecords()



	var _addRecord = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"recordValue": "",
			"recordKey": "",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "Parameters error, required 'storeName'";			
			_error = true;
		}
		
		if( p["recordKey"].length === 0){
			_vars["errorDescription"]  = "Parameters error, required 'recordKey'";			
			_error = true;
		}
		
		if( p["recordValue"].length === 0){
			_vars["errorDescription"]  = "Parameters error, required 'recordValue'";			
			_error = true;
		}

		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"recordKey" : p["recordKey"],
			"recordValue" : p["recordValue"],
			"action" : "add_record",
			"callback" : _postFunc
		});


		function _postFunc(){ 
//console.log("callback, add_record, ", p["storeName"], p["recordKey"], p["recordValue"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"](runtime_s);
			}

		}//end _postFunc()
		
	};//end _addRecord()


	var _deleteRecord = function( opt ){
//console.log(arguments);
		var p = {
			"dbName": "",
			"storeName": "",
			"recordKey": "",
			"action": "delete_record",
			"callback": null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		var _error = false;
		
		if( !window.indexedDB ) {
			_vars["errorDescription"] = "IndexedDB is not supported.";
			_error = true;
		}

		if( p["storeName"].length === 0){
			_vars["errorDescription"]  = "_deleteRecord(), error, argument 'storeName' empty.... ";
			_error = true;
		}
		if( p["recordKey"].length === 0){
			_vars["errorDescription"]  = "_deleteRecord(), error, argument 'recordKey' empty.... ";
			_error = true;
		}

		if( _error ){
			//return with error
			if(typeof p["callback"] === "function"){
				p["callback"]( false );
			}
			return false;
		}

		var timeStart = new Date();
		iDB({
			"dbName" : p["dbName"],
			"storeName" : p["storeName"],
			"action" : p["action"],
			"recordKey" : p["recordKey"],
			"callback" : _postFunc
		});

		function _postFunc( log ){ 
//console.log("callback, delete_record, " + p["storeName"]);

			var timeEnd = new Date();
			var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);

			if( typeof p["callback"] == "function"){
				p["callback"]( log, runtime_s );
			}

		}//end _postFunc()
	};//end _deleteRecord()



	var iDB = function( opt ){
//console.log("iDB, ", iDB.caller, arguments);
		
		var _iDBparams = {
			"dbName": "",
			"storeName": "",
			"storeData" : "",
			"action": "",
			"recordKey" : null,
			"recordValue" : "",
			"callback": null
		};

		//_vars["iDBparams"] = _iDBparams;
		indexedDatabase.dbInfo["iDBparams"] = _iDBparams;// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
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
				
				// if( _vars["version"] === 0){
					// _get_version({
						// "dbName": _iDBparams["dbName"],
						// "callback" : _set_version
					// });
				// } else {
					// _vars["version"]++;
// console.log( "new_version = " + _vars["version"] );					
					// try{
						// var request = indexedDB.open( _iDBparams["dbName"], _vars["version"] );
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
				"dbName": "",
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
					_iDBparams["version"] = db.version;
					db.close();
					
					if( typeof options["callback"] === "function"){
						options["callback"]( db.version );
					}
				}
				
				request.onerror = function(e){
var msg = "get_version(), error " + e.target.error.name +", "+ e.target.error.message;
console.log(msg);
					_iDBparams["runStatus"] = "error";
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
			_vars["version"] = new_version;
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
//console.log("function _upgrade()", request);

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
msg = "Delete store <b>" + _iDBparams["storeName"] + "</b> from database <b>" + _iDBparams["dbName"]+"</b>";
//console.log(msg);				
							_iDBparams["runStatus"] = "success";				
						} else {
msg = "<b>"+ _iDBparams["storeName"] + "</b> not exists in DB <b>" + _iDBparams["dbName"] + "</b>";
//console.log(msg);
							_iDBparams["runStatus"] = "error";				
						}
						
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"](msg);
						}
						
					break;
					
				}//end switch
				
			}//end upgradenedeed callback
		 
			request.onsuccess = function(e) {
//var msg = "request.onsuccess";
//console.log(msg, e);
				db = e.target.result;
				
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

							var buffer = _iDBparams["callback"];
							var storeData = _iDBparams["storeData"];
							iDB({
								"dbName" : _iDBparams["dbName"],
								"storeName" : _iDBparams["storeName"],
								"action" : "create_store",
								"callback" : function(){
//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
//console.log(msg, buffer, storeData);

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

							var buffer = _iDBparams["callback"];
							iDB({
								"dbName" : _iDBparams["dbName"],
								"storeName" : _iDBparams["storeName"],
								"action" : "create_store",
								"callback" : function(){
//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
//console.log(msg, buffer, storeData);
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

		function _run_transaction(){
//console.log("function _run_transaction() : " + _iDBparams["storeName"], _iDBparams["action"]);
		
			if( !db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
				var msg = "Name object store '" + _iDBparams["storeName"] + "' not exists in DB " + _iDBparams["dbName"];
//console.log(msg);		
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
				_vars["useCursor"] = useCursor;
//useCursor = true;//for test

				var useIndex = _vars["useIndex"];
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
				var useIndex = _vars["useIndex"];
				
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


	// public interfaces
	return{
		createStore: _createStore,
		dropDB: _dropDB,
		deleteStore: _deleteStore,
		getListStores: _getListStores,
		numRecords: _numRecords,
		getRecords: _getRecords,
		getRecord: _getRecord,
		clearStore: _clearStore,
		addRecords: _addRecords,
		addRecord: _addRecord,
		deleteRecord: _deleteRecord,
		dbInfo: _vars
	};

};//end module