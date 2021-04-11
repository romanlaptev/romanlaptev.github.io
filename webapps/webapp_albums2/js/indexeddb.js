/*
	ADD RECORD:
			module.addRecord({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"recordKey" : "key1",
				"recordValue" : "some value",
				"callback" : function( log ){
					var msg = "module.addRecord(), " + log;
					console.log(msg);
				}
			});

	ADD RECORDS:
			module.addRecords({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"storeData" : storeData,
				"callback" : function( log ){
					var msg = "mobappDb.addRecords(), " + log;
					console.log(msg);
				}
			});
		
	
	GET RECORD:
			module.getRecord({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"recordKey" : "key1",
				"callback" : function( data, log ){
					var msg = "module.getRecord(), " + log;
					console.log(msg);
					console.log(data);
				}
			});

			
	GET ALL RECORDS:
			module.getRecords({
				"dbName" : dbName,
				"storeName" : storeName,
				"callback" : function( data, log ){
					var msg = "module.getRecords() " + log;
					console.log(msg);
					console.log(data );
				}
			});
	
	GET STORE DATA Records AS OBJECT
			module.getRecords({
				"dbName" : dbName,
				"storeName" : storeName,
				"action" : "get_records_obj",
				"callback" : function( data, log ){
					var msg = "mobappDb.getRecords(), get storeData as object, " + log;
					console.log(msg);
					console.log(data );
			}
		});
	
	
	NUM RECORDS:
			module.numRecords({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"callback" : function( num, log ){
					var msg = "module.numRecords(), " + num + " records, " + log;
					console.log(msg);
				}
			});
	
	
	DELETE RECORD:
			module.deleteRecord({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"recordKey" : "key1",
				"callback" : function( log ){
					var msg = "module.deleteRecord(), " + log;
					console.log(msg);
				}
			});

	
	DROP DATABASE:
			module.dropDB({
				"dbName": "mobapp",
				"callback" : function( log, runtime ){
					var msg = "module.dropDB(), "+ log +", runtime: " + runtime;
					console.log(msg);
				}
			});
	
	CREATE STORE:
			module.createStore({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"callback" : function( log, runtime ){
					var msg = "module.createStore(), "+ log + ", " +runtime + " sec";				
					console.log(msg);
				}
			});

		
	DELETE STORE:
			module.deleteStore({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"callback" : function( log, runtime ){
					var msg = "module.deleteStore(), "+ log + ", " +runtime + " sec";				
					console.log(msg);
				}
			});

			
	CLEAR STORE:
			module.clearStore({
				"dbName": "mobapp",
				"storeName": "object_store_name",
				"callback" : function( log, runtime ){
					var msg = "module.clearStore(), "+ log + ", " +runtime + " sec";				
					console.log(msg);
				}
			});

	GET_LIST_STORES	
			module.getListStores({
				"dbName" : dbName,
				"callback" : function( res ){
					var msg = "module.getListStores(), "+ res.length;
					console.log(msg, res);
				}
			});
	
	GET INFO: return total size iDB stores
		var bytes = module.getInfo()
console.log("Total size: ", bytes);
	
*/
(function() {
	var iDBmodule = function(opt){
//console.log(arguments);

		
		// private variables and functions
		var _init = function(){
//console.log("init iDB module...");
			var testDB = "indexedDB" in window;
			if( !testDB) {
				var msg = "_iDBmodule(), IndexedDB not supported, clear methods";
console.log(msg);
				addRecord = null;
console.log( addRecord );
				dropDB = null;
				createStore = null;
				deleteStore = null;
				clearStore = null;
				getListStores = null;
				addRecord = null;
				addRecords = null;
				getRecord = null;
				getRecords = null;
				numRecords = null;
				deleteRecord = null;
			}
		};
		
		// var _build = function(target){
			// var html = "Table " + target + " is building....";
			// return html;
		// };
		var dbInfo = []; 
		//do not calculate store size
		dbInfo["calc_store_size"] = false;
		dbInfo["allowIndexedDB"] = true;//use IndexedDB, program switch
		dbInfo["dbName"] = "webapp_db";
		dbInfo["import"] = [];
		dbInfo["tables"] = [];
		dbInfo["callbackFunc"] = [];
		
//******************************** indexedDB: methods of extension ********************************

		var _addRecord = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test){	
				// if(!testDB) {
// var msg = "_addRecord(), IndexedDB not supported!!!";
// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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
	var msg = "_addRecord(), error, argument 'storeName' empty.... ";
	console.log( msg );
				return false;
			}
			if( options["recordKey"].length === 0){
	var msg = "_addRecord(), error, argument 'recordKey' empty.... ";
	console.log( msg );
				return false;
			}
			if( options["recordValue"].length === 0){
	var msg = "_addRecord(), error, argument 'recordValue' empty.... ";
	console.log( msg );
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

			function _postFunc(log){ 
	//console.log("callback, add_record, ", options["storeName"], options["recordKey"], options["recordValue"]);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//console.log("Runtime: ", runtime_s);
				log += ", runtime:" + runtime_s;
				
				if( typeof options["callback"] == "function"){
					options["callback"](log);
				}

			}//end _postFunc()
		};//end _addRecord()

		
		var _addRecords = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_addRecords(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
				"storeName": "",
				"storeData": [],//[ {"key":"","value":""}, {"key":"","value":""} ....],
				"callback": null
			};
			//extend options object
			for(var key in opt ){
				options[key] = opt[key];
			}
	//console.log(options);

			if( options["storeName"].length === 0){
	var msg = "_addRecords(), error, argument 'storeName' empty.... ";
	console.log( msg );
				return false;
			}
			if( !options["storeData"] ||
					options["storeData"].length === 0 && typeof options["storeData"] !== "object"){
	var msg = "_addRecords(), error, argument 'storeData = [ {key:'key1', value:'some value'}, ....]' is empty.... ";
	console.log( msg );
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

			function _postFunc( statInfo ){ 
	//console.log("callback, add_records, " + options["storeName"]);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
	var msg = "_addRecords(), runtime: " + runtime_s;				
	console.log(msg);
				if( typeof options["callback"] == "function"){
					options["callback"](  statInfo  );
				}

			}//end _postFunc()
		};//end _addRecords()
		

//*если opt["recordKey"] является массивом, то выбрать все записи, перечисленные в opt["recordKey"]
		var _getRecord = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_getRecord(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
				"storeName": "",
				"recordKey": "",
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
				return false;
			}
			if( options["recordKey"].length === 0){
	var msg = "_getRecord(), error, argument 'recordKey' empty.... ";
	console.log( msg );
				return false;
			}

			var timeStart = new Date();
			iDB({
				"dbName" : options["dbName"],
				"storeName" : options["storeName"],
				"recordKey" : options["recordKey"],
				"action" : options["action"],
				"callback" : _postFunc
			});


			function _postFunc(data, log){ 
	//console.log("callback, getRecord, ", options["storeName"], options["recordKey"], options["recordValue"]);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
	//console.log("Runtime: ", runtime_s);
				log += ", runtime: " + runtime_s;
				
				if( typeof options["callback"] == "function"){
					options["callback"](data, log);
				}

			}//end _postFunc()
		};//end _getRecord()

		
		var _getRecords = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			var testDB = "indexedDB" in window;
			if( !testDB) {
				test = false;
			}
			if(!test) {
				// if(!testDB) {
	// var msg = "_getRecords(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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
				return false;
			}

			var timeStart = new Date();
			iDB({
				"dbName" : options["dbName"],
				"storeName" : options["storeName"],
				"storeData" : options["storeData"],
				"action" : options["action"],
				"callback" : _postFunc
			});


			function _postFunc(  data, _resObj ){ 
	//console.log("callback, getRecords, " + options["storeName"], _resObj, options["callback"], "caller:" , _postFunc.caller);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
// var log = "getRecords(), runtime: " +runtime_s + " sec";				
// if( data.length ){
	// log += ", num records: " + data.length;				
// }
// console.log(log);
// console.log(data);
				if( typeof options["callback"] == "function"){
					options["callback"]( data, _resObj);
				}

			}//end _postFunc()
		};//end _getRecords()
		
		
		var _numRecords = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_numRecords(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
				"storeName": "",
				"callback": null
			};
			//extend options object
			for(var key in opt ){
				options[key] = opt[key];
			}
	//console.log(options);

			if( options["storeName"].length === 0){
	var msg = "_numRecords(), error, argument 'storeName' empty.... ";
	console.log( msg );
				return false;
			}

			var timeStart = new Date();
			iDB({
				"dbName" : options["dbName"],
				"storeName" : options["storeName"],
				"action" : "number_records",
				"callback" : _postFunc
			});

			function _postFunc( num ){ 
	//console.log("callback, number_records, " + options["storeName"], num);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
				var log = "runtime: " + runtime_s;

				if( typeof options["callback"] == "function"){
					options["callback"](num, log);
				}

			}//end _postFunc()
		};//end _numRecords()
		
		
		var _deleteRecord = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_deleteRecord(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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
				return false;
			}
			if( options["recordKey"].length === 0){
	var msg = "_deleteRecord(), error, argument 'recordKey' empty.... ";
	console.log( msg );
				return false;
			}

			var timeStart = new Date();
			iDB({
				"dbName" : options["dbName"],
				"storeName" : options["storeName"],
				"recordKey" : options["recordKey"],
				"action" : "delete_record",
				"callback" : _postFunc
			});


			function _postFunc(log){ 
	//console.log("callback, deleteRecord, ", options["storeName"], options["recordKey"]);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
	//console.log("Runtime: ", runtime_s);
				log += ", runtime:" + runtime_s;
				
				if( typeof options["callback"] == "function"){
					options["callback"](log);
				}

			}//end _postFunc()
		};//end _deleteRecord()
		
		
		var _dropDB = function( opt ){
	//console.log(arguments, _dropDB.caller);
			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_dropDB(), IndexedDB not supported!!!";
	// console.log(msg);
				// }
				return false;
			}
			
			var options = {
				"dbName": dbInfo["dbName"],
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
		

		var _createStore = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_createStore(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}
			
			var options = {
				"dbName": dbInfo["dbName"],
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
	//console.log(arguments);
	//console.log("callback, create_store, " + options["storeName"]);

				var timeEnd = new Date();
				var runtime_s = (timeEnd.getTime() - timeStart.getTime()) / 1000;
	//console.log("Runtime: ", runtime_s);

				if( typeof options["callback"] == "function"){
					options["callback"](log, runtime_s);
				}

			}//end _postFunc()
		};//end _createStore()

		
		var _deleteStore = function( opt ){
	//console.log(arguments);

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_deleteStore(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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

			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				// if(!testDB) {
	// var msg = "_deleteStore(), IndexedDB not supported!!!";
	// console.log(message);
				// }
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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

		
		var _getListStores = function( opt ){
	//console.log(arguments);
			var test = true;
			if( !dbInfo["allowIndexedDB"]) {
				test = false;
			}
			// var testDB = "indexedDB" in window;
			// if( !testDB) {
				// test = false;
			// }
			if(!test) {
				var msg = "_getListStores(), not use IndexedDB, allowIndexedDB:" + dbInfo["allowIndexedDB"];
				// if(!testDB) {
						//msg = "_getListStores(), IndexedDB not supported!!!";
				// }
console.log(msg);
				return false;
			}

			var options = {
				"dbName": dbInfo["dbName"],
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
	//console.log(arguments);
	//console.log("callback, getListStores ", res, options["callback"]);
				if( typeof options["callback"] == "function"){
					options["callback"](res);
				}
			}//end _postFunc()
			
		};//end _getListStores()


//************************** indexedDB: base method **************************
		var iDB = function( opt ){
//console.log("iDB, ", iDB.caller, arguments);
			
			var _iDBparams = {
				"dbName": dbInfo["dbName"],
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
//console.log( "iDB(), " + _iDBparams["storeName"] + ", " +_iDBparams["action"] );
			
			switch( _iDBparams["action"] ){
				case "create_store":
				case "delete_store":
					_get_version({
						"dbName": _iDBparams["dbName"],
						"callback" : _set_version
					});
				break;
				
				case "drop_db":
					var req = indexedDB.deleteDatabase( _iDBparams["dbName"] );
					
					req.onsuccess = function(e) {
var msg = "Deleted database " + _iDBparams["dbName"] + " successfully";
//console.log(msg, e);
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
					"dbName": dbInfo["dbName"],
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
	var msg = "dont create "  + _iDBparams["storeName"] + ", store exists....";
	//console.log(msg);
								_iDBparams["runStatus"] = "error";				
								if( typeof _iDBparams["callback"] === "function"){
									_iDBparams["callback"](msg);
								}
								return false;
							};
							
							var store = db.createObjectStore( _iDBparams["storeName"], { autoIncrement:true });  

							// //create DB index
							// var tableName = dbInfo["storeName"];
							// if( dbInfo["import"]["importFormat"] === "json"){
								// if( typeof dbInfo["tables"][tableName] !== "undefined"){
										// if( typeof dbInfo["tables"][tableName]["indexes"] !== "undefined" &&
												// dbInfo["tables"][tableName]["indexes"].length > 0 ){
											// var listIndexes = dbInfo["tables"][tableName]["indexes"];
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
	var msg = "Create store " + _iDBparams["storeName"] + ' in ' + _iDBparams["dbName"];
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
						
						case "add_record":
							if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
								_run_transaction();
							} else {
	var msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
	console.log(msg);
								var __callback = _iDBparams["callback"];
								var __action = _iDBparams["action"];
								var __recordKey = _iDBparams["recordKey"];
								var __recordValue = _iDBparams["recordValue"];
								iDB({
									"dbName" : _iDBparams["dbName"],
									"storeName" : _iDBparams["storeName"],
									"action" : "create_store",
									"callback" : function(){
										iDB({
											"dbName" : _iDBparams["dbName"],
											"storeName" : _iDBparams["storeName"],
											"action" : __action,
											"recordKey" : __recordKey,
											"recordValue" : __recordValue,
											"callback" : __callback
										});
									}
								});

							};
						break;
						
						case "add_records":
							if( db.objectStoreNames.contains( _iDBparams["storeName"] ) ){
								_run_transaction();
							} else {
	var msg = _iDBparams["storeName"] + ' not exists in DB ' + _iDBparams["dbName"];
	console.log(msg);
								var __callback = _iDBparams["callback"];
								var __action = _iDBparams["action"];
								var __storeData = _iDBparams["storeData"];
								iDB({
									"storeName" : _iDBparams["storeName"],
									"action" : "create_store",
									"callback" : function(){
	//var msg = "callback, create_store, "+ _iDBparams["storeName"];									
	//console.log(msg, buffer, storeData);
	//_log(msg);

										iDB({
											"dbName" : _iDBparams["dbName"],
											"storeName" : _iDBparams["storeName"],
											"storeData" : __storeData,
											"action" : __action,
											"callback" : __callback
										});
									}
								});

							};
						break;
						
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
						// if( typeof dbInfo["callbackFunc"]["afterUpdate"] === "function"){
							// dbInfo["callbackFunc"]["afterUpdate"]( e.target.error.name );
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
	console.log(msg);		
	//console.log(msg, _iDBparams["callback"]);		
					if( typeof _iDBparams["callback"] === "function"){
						_iDBparams["runStatus"] = "error";
						_iDBparams["reason"] = msg;
						
						var error = {
							"code": "store_not_found",
							"description": msg
						}
						_iDBparams["callback"](error);
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
					// if( typeof _iDBparams["callback"] === "function"){
						// _iDBparams["callback"]();
					// }
					
					//remove last store
					_deleteStore({
						"storeName" : _iDBparams["storeName"],
						"callback" : function( log, runtime ){
	var msg = "Remove last store, "+ log + ", " +runtime + " sec";				
	console.log(msg);
							_abortUpdate( error );
						}
					});

					function _abortUpdate( error ){
						if (error.name == 'QuotaExceededError') {
	var msg = "transaction.onabort_QuotaExceededError!";
	console.log(msg);

							dbInfo["import"]["status"] = {
								"code" : 2,
								"reason" : "abort_QuotaExceededError"
							};
							
							//save import result info in master table
							_save_stat_info( {
									"callback" : function(){
	//console.log("callback, _save_stat_info");
									
									_addRecord({
										"storeName" : "idb_master",
										"recordKey" : "import_status",
										"recordValue" : "abort_QuotaExceededError",
										"callback" : function( log ){
	var msg = "iDB(), _run_transaction(), _abortUpdate(), status: abort, QuotaExceededError";									
	console.log(msg, log);
	//_log(msg);

											_importAbort();
										}
									});
									
								}//end callback
							});
						}
					}//end _abortUpdate
					
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
	var msg = "add_record(), error add value,  " + e.target.error.name +", "+e.target.error.message;
	console.log(msg,e);
							_iDBparams["runStatus"] = "error";				
							// if( e.target.error.name === "UnknownError"){
	// console.log("test3, " + e.target.error.name);
							// }
							if( typeof _iDBparams["callback"] === "function"){
								_iDBparams["callback"](msg);
							}
						}
						
						request.onsuccess = function(e) {
	var msg = "add_record(), success add value: " + key + " = " + value;
	//console.log(msg, e);
							_iDBparams["runStatus"] = "success";				
							if( typeof _iDBparams["callback"] === "function"){
								_iDBparams["callback"](msg);
							}
						}
						
						//transaction.oncomplete = function(e) {
	//var msg = "transaction add record oncomplete";
	//console.log(msg, e);
						//};
					break;
				
					case 'add_records':
						_putRecords( _iDBparams["storeData"] );
					break;
					
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
						// _iDBsearch( dbInfo["query"] );
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

					if( dbInfo["calc_store_size"] ){
						var sum = 0;
					}

					var result = [];
					if ( !useCursor) {
						if( useIndex ){
							var index = store.index( index_name );
							index.getAll().onsuccess = function(event) {
								var records = event.target.result;
								for( var n = 0; n < records.length; n++){
	//console.log( records[n] );
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( records[n] );
										sum = sum + json.length;
									}
									result.push( records[n] );
								}//next
								
							};
						} else {
							store.getAll().onsuccess = function(event) {
								var records = event.target.result;
								for( var n = 0; n < records.length; n++){

	//if( _iDBparams["storeName"] === "SL_KODIF"){
	//console.log( records[n] );
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( records[n] );
	//console.log( json, json.length );
										sum = sum + json.length;
									}
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
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( cursor.value );
										sum = sum + json.length;
									}
									cursor["continue"]();
								}
							};

						} else {
							store.openCursor().onsuccess = function(event) {
								var cursor = event.target.result;
								if (cursor) {
	//console.log( "cursor: " , cursor, cursor.key, cursor.value );
									result.push( cursor.value );
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( cursor.value );
										sum = sum + json.length;
									}
									cursor["continue"]();
								}
							};
						};
						
					};
						
					transaction.oncomplete = function(event) {
	//var msg = _iDBparams["storeName"] + ", transaction get_records complete.";
	//console.log(msg);
	//console.log( result );
						var _resObj = {
							"storeName" : _iDBparams["storeName"]
						}
						
						if( dbInfo["calc_store_size"] ){
							_resObj["bytes"] = sum;
						}
						
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( result, _resObj );
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
					
					if( dbInfo["calc_store_size"] ){
						var sum = 0;
					}

					var result = {};
					if ( !useCursor ) {
						if( useIndex ){
							var index = store.index( index_name );
							index.getAll().onsuccess = function(event) {
								var records = event.target.result;
								for( var n = 0; n < records.length; n++){
	//console.log( records[n] );
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( records[n] );
										sum = sum + json.length;
									}
									result.push( records[n] );
								}//next
							};
						} else {
							store.getAll().onsuccess = function(event) {
								var records = event.target.result;
								for( var n = 0; n < records.length; n++){

	//if( storeName === "SL_KODIF"){
	//console.log( records[n] );
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( records[n] );
								//console.log( json, json.length );
										sum = sum + json.length;
									}
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
									
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( cursor.value );
										sum = sum + json.length;
									}
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
									
									if( dbInfo["calc_store_size"] ){
										var json = JSON.stringify( cursor.value );
										sum = sum + json.length;
									}
									cursor["continue"]();
								}
							};
						};
						
					};

				
					transaction.oncomplete = function(event) {
	//var msg = _iDBparams["storeName"] + ", transaction get_records complete.!!!";
	//console.log(msg);
	//console.log( result );
						var _resObj = {
							"storeName" : _iDBparams["storeName"]
						}
						if( dbInfo["calc_store_size"] ){
							_resObj["bytes"] = sum;
						}
						
						_iDBparams["runStatus"] = "success";				
						if( typeof _iDBparams["callback"] === "function"){
							_iDBparams["callback"]( result, _resObj );
						}
						
					};
					
				}//end _iDBgetRecordsObj()

			
				function _putRecords( data ){
					
					var total = { 
						"symbols" : 0,
						"bytes" : 0
					};

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
						// if( dbInfo["import"]["importFormat"] === "json" &&
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
							var statInfo = {};
							if( total["bytes"] > 0){
								statInfo["total"] = total;
							}
							_iDBparams["callback"](  statInfo );
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
		
		
		var _checkState = function(opt){
			var p = {
				"listStores": "",
				"callback": null
			};
			
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}

			if( typeof p["callback"] === "function"){
				dbInfo["callbackFunc"]["afterUpdate"] = p["callback"];
			} else {
console.log("Error, iDBmodule(), checkState(), need callback function");				
				return false;
			}
			
			dbInfo["import"]["importType"] = "new";
			if( typeof p["listStores"] !== "undefined" &&
					p["listStores"].length > 0){
				dbInfo["import"]["importType"] = "update";
				//compare dates!!!!
				
			} else {
var msg = "iDBmodule(), not find indexedDB stores, new full import.";
console.log(msg);
			}
			
var msg = "iDBmodule(),  import type:" + dbInfo["import"]["importType"];
console.log(msg);
			if( dbInfo["import"]["importType"] === "new"){
				_iDBimport();//new full import to indexedDB
			}
			
			if( dbInfo["import"]["importType"] === "update"){
				//read "last_date" from idb_master
				var date = "2017-08-07";
				//check update date, before import to indexedDB
				
				//.....get last date modified, run HEAD request
				//.....
				
				//_iDBimport();
				if( typeof dbInfo["callbackFunc"]["afterUpdate"] === "function"){
					dbInfo["callbackFunc"]["afterUpdate"]();
				}
			}//end check
			
		}//end _checkState()
		
		function _iDBimport(){
			var time_start = new Date();
			
			if( webApp.vars["wait"] ){
				webApp.vars["wait"].className="modal-backdrop in";
				webApp.vars["wait"].style.display="block";
			}
			if( webApp.vars["waitWindow"] ){
				webApp.vars["waitWindow"].className="modal-dialog";
				webApp.vars["waitWindow"].style.display="block";
			}
			
			var param = {};
console.log("_iDBimport(), send request to the server", param);

			param["callback"] = _afterRequest;
			webApp.app.serverRequest( param );
			
			function _afterRequest( data ){
//console.log( data );
				//_w.wait({state:false});
				//_u.ajaxProgress	= __ajaxProgress; //restore callback for progress process

				var time_end = new Date();
				var runtime = (time_end.getTime() - time_start.getTime()) / 1000;
console.log("_iDBimport(), response from the server,  runtime: " + runtime +" sec");

				_saveData(data);
				
			};//end _afterRequest();
		}//end _iDBimport()
		
		function _saveData(data){
			if( webApp.vars["import"]["db_type"].length === 0 ){
console.log("error in _db(), not find 'db_type' !");
				return false;
			}
			
			switch( webApp.vars["import"]["db_type"] ){
				case "xml":
//console.log(typeof data);				
					if(typeof data !== "string"){//server answer contains XML
							dbInfo["import"]["xml"] = data;
						__parseXML( data );
						return false;
					}
/*					
					//server answer contains string data ( update data + XML)
					var importData = data.split( "#mark" );
					
//console.log(importData[0]);//new date
					var jsonObj = JSON.parse( importData[0], function(key, value) {
//console.log( key, value );
							return value;
						});							
//console.log( jsonObj );
					if( jsonObj["date"] && jsonObj["date"].length > 0){
						__saveNewDate( jsonObj["date"], _postFunc );
					}
//return false;
					
					function _postFunc(){
						if (window.DOMParser) { // all browsers, except IE before version 9
	//var msg = "window.DOMParser support: " + window.DOMParser;
	//console.log(msg);
							var parser = new DOMParser();
							var xmlsrc = importData[1];
							try {
								var xml = parser.parseFromString( xmlsrc, "text/xml" );
								dbInfo["import"]["xml"] = xml;
								__parseXML( xml );
							} catch (e) {
								// // if text is not well-formed, 
								// // it raises an exception in IE from version 9
	console.log("XML parsing error: ", e);
	// for( var item in e ){
	// console.log(item + ": " + e[item]);
	// }
							};

						} else {  // Internet Explorer before version 9

							var xml_info = _createMSXML();
	console.log( "created  MSXML ActiveXObject, version: " + xml_info.version);		
							var xml = xml_info["xml_obj"];

							// xml.async = "false";
							// xml.loadXML( xmlsrc );	
							// var errorMsg = null;
							// if (xml.parseError && xml.parseError.errorCode != 0) {
								// errorMsg = "XML Parsing Error: " + xml.parseError.reason
										  // + " at line " + xml.parseError.line
										  // + " at position " + xml.parseError.linepos;
							// }
							// if (errorMsg) {
								// log.innerHTML += "<p>" + errorMsg + "</p>";
							// }
							// parse_xml(xml);
						}					
						
					}//end _postFunc
*/					
				break;
				
				case "json":
/*				
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
*/						
					if( typeof dbInfo["callbackFunc"]["afterUpdate"] === "function"){
						dbInfo["callbackFunc"]["afterUpdate"]();
					}
				break;
				
				//case "csv":
				case "jcsv":
					//_parseCSVBlocks(data);
					if( typeof dbInfo["callbackFunc"]["afterUpdate"] === "function"){
						dbInfo["callbackFunc"]["afterUpdate"]();
					}
				break;
			}//end switch
			
			// if( typeof postFunc === "function"){//??????????????????????
				// postFunc();
			// }

			function __parseXML( xml ){
				var xmlDoc = xml.getElementsByTagName("database");
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;

				//fix for Chrome, Safari (exclude tag <pma:database>)
				if( xmlDoc.length === 1){
					var records = xmlDoc.item(0).getElementsByTagName("table");
				}
				if( xmlDoc.length === 2){
					var records = xmlDoc.item(1).getElementsByTagName("table");
				}
		
				
				//get list tables
				var tableName = "";
				//var storeData = [];
				for( var n = 0; n < records.length; n++){
					//var record = records[n];
					//var tableName = record["attributes"]["name"].nodeValue;
					var record = records.item(n);
					
					if( tableName.length > 0 &&
							tableName !== record.attributes.getNamedItem("name").nodeValue){
						dbInfo["tables"].push(tableName);
					}
					tableName = record.attributes.getNamedItem("name").nodeValue;
//if( tableName === "vocabulary" ){
//console.log( tableName, dbInfo["tables"].length );
//}					
				}//next
				
				//push last tableName
				dbInfo["tables"].push(tableName);

				
				//recursively save data block in iDB store
				dbInfo["import"]["counter"] = 0;
				dbInfo["import"]["timer"] = new Date();
				__getTable();
				
			}//end __parseXML()
			
			function __getTable(){
				var num = dbInfo["import"]["counter"];
				
				var xml = dbInfo["import"]["xml"];
				var xmlDoc = xml.getElementsByTagName("database");
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;

				//fix for Chrome, Safari (exclude tag <pma:database>)
				if( xmlDoc.length === 1){
					var records = xmlDoc.item(0).getElementsByTagName("table");
				}
				if( xmlDoc.length === 2){
					var records = xmlDoc.item(1).getElementsByTagName("table");
				}
		
				var tableName = dbInfo["tables"][num];
				var storeData = [];
				for( var n = 0; n < records.length; n++){
					var record = records.item(n);
					
					if( tableName === record.attributes.getNamedItem("name").nodeValue){
						//form record
						var columns = record.getElementsByTagName("column");
						var recordObj = {};
						for( var n2 = 0; n2 < columns.length; n2++){
							var column = columns.item(n2);
							var columnName = column.attributes.getNamedItem("name").nodeValue;
							if ("textContent" in column){
								recordObj[columnName] = column.textContent;
							} else {
								recordObj[columnName] = column.text;
							}
							
						}//next
						
						storeData.push({
							//"key" : recordObj["tid"],
							"value" : recordObj
						});
					}
				}//next
//console.log(tableName, storeData[0], storeData.length);						
				__saveRecords( tableName, storeData );
			}//end __getTable()
			
			function __saveRecords( storeName, storeData ){
//console.log(storeName, storeData[0], storeData.length);						
				var timeStart = new Date();
				_addRecords({
					"storeName" : storeName,
					"storeData" : storeData,
					"callback" : function( statInfo ){
						__callback( statInfo );
					}
				});
				
				function __callback( statInfo ){
//console.log("callback, _saveRecords(), "+ storeName, dbInfo["import"]["counter"], statInfo);

					dbInfo["import"]["counter"]++;
					
					//----------------------- progress indicator
					if( webApp.vars["saveProgressBar"] ){
						var numTotal = dbInfo["tables"].length;
						var numLoaded = dbInfo["import"]["counter"];
						var percentComplete = Math.ceil( numLoaded / numTotal * 100);
		//console.log(percentComplete);
						webApp.vars["saveProgressBar"].className = "progress-bar";
						webApp.vars["saveProgressBar"].style.width = percentComplete+"%";
						webApp.vars["saveProgressBar"].innerHTML = percentComplete+"%";
					}
					
					if( dbInfo["import"]["counter"] < dbInfo["tables"].length ){
						__getTable();
					} else {
						
						var timeStart = dbInfo["import"]["timer"];
						var timeEnd = new Date();
						var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
						dbInfo["import"]["timer"] = runtime;
console.log("All done! save records to indexedDB stores, runtime:" + runtime + " sec");	
						
						delete dbInfo["import"]["xml"];//clear var
						
						if( webApp.vars["wait"] ){
							//webApp.vars["wait"].className="";
							webApp.vars["wait"].style.display="none";
						}
						if( webApp.vars["waitWindow"] ){
							webApp.vars["waitWindow"].style.display="none";
						}
						
						if( typeof dbInfo["callbackFunc"]["afterUpdate"] === "function"){
							dbInfo["callbackFunc"]["afterUpdate"]( data );
						}
					}
					
				};//end __callback()

			}//end __saveRecords()
			
			function __saveNewDate( newDate, callback ){
				dbInfo["import"]["last_date"] = newDate;
				_addRecord({
					"storeName" : "idb_master",
					"recordKey" : "last_date",
					"recordValue" : newDate,
					"callback" : function( log ){
var msg = "Save server up date, " + log;
console.log(msg);
						if( typeof callback === "function"){
							callback();
						}
					}//end callback
				});	
				
			}//end __saveNewDate()
			
		}//end _saveData()

		
		// public interfaces
		return{
			dbInfo:	dbInfo,
			init: _init,
			// build: function(target){ 
				// return _build(target); 
			// }
			
			//indexedDB extension methods		
			dropDB:	function( opt ){ 
				return _dropDB( opt ); 
			},
			createStore:	function( opt ){ 
				return _createStore( opt ); 
			},
			deleteStore:	function( opt ){ 
				return _deleteStore( opt ); 
			},
			clearStore:	function( opt ){ 
				return _clearStore( opt ); 
			},
			getListStores:	function( opt ){ 
				return _getListStores( opt ); 
			},
			addRecord:	function( opt ){ 
				return _addRecord( opt ); 
			},
			addRecords:	function( opt ){ 
				return _addRecords( opt ); 
			},
			getRecord:	function( opt ){ 
				return _getRecord( opt ); 
			},
			getRecords:	function( opt ){ 
				return _getRecords( opt ); 
			},
			numRecords:	function( opt ){ 
				return _numRecords( opt ); 
			},
			deleteRecord:	function( opt ){ 
				return _deleteRecord( opt ); 
			},
			
			getInfo: function(){
				var totalSize = dbInfo["tables"]["total_size"]; 
				return totalSize;
			},
			
			checkState : _checkState
		};
	
	};//end iDBModule()
	
	window.iDBmodule = iDBmodule;
	iDBmodule().init();
	
//})(this);
})();
