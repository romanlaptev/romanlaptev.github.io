//=================================== STORAGE methods
		var storage = {
			"tables": {
				"nodes": {//<table_node>
					//status: "",
					records: [],
					//getRecords: __getRecords
				},
				"taxonomy": {
					records: []
				},
				"hierarchyList": {
					records: []
				}

				
				//"book_filename": {//<table_book_filename>
					//status: "",
					//records: [],
					//getRecords: function(){
						//return [{"a":1}];
					//}
				//},
				
				//"book_url": {//<table_book_url>
					//status: "",
					//records: [],
					//getRecords: function(){
						//return [{"a":1}];
					//}
				//}, 
				
				//"book_links": {//<table_book_links>
					//status: "",
					//records: [],
					//getRecords: function(){
						//return [{"a":1}];
					//}
				//}, 
				
				//"taxonomy_index": {//<taxonomy_index>
					//status: "",
					//records: [],
					//getRecords: function(){
						//return [{"a":1}];
					//}
				//}//,
/*				
				"taxonomy_term_data": {//<taxonomy_term_data>
					status: "",
					records: [],
					getRecords: function(){
						return [{"a":1}];
					}
				},
				
				"taxonomy_term_hierarchy": {//<taxonomy_term_hierarchy>
					status: "",
					records: [],
					getRecords: function(){
						return [{"a":1}];
					}
				},
				
				"taxonomy_vocabulary": {//<taxonomy_vocabulary>
					status: "",
					records: [],
					getRecords: function(){
						return [{"a":1}];
					}
				}
*/				
			},
			
			"need_update": false,
			
			"init": function(){
				return _init_cache();
			},
			
			"getXml": function(){
				_get_xml_from_storage();
			},

			"putItem": function(key, value, callback){
				if ( config["use_localcache"] ) {
					return _put_to_storage( key, value, callback );
				}
			},
			
			"getItem": function(key, callback){
				if ( config["use_localcache"] ) {
					return _getItemFromStorage( key, callback );
				}
			},
			
			"checkAppData": function(opt){
				if ( config["use_localcache"] ) {
					return _checkAppData( opt );
				}
			},
			"saveAppData": function(opt){
				if ( config["use_localcache"] ) {
					return _saveAppData( opt );
				}
			}//,
			//"getAppData": function(opt){
				//return _getAppData( opt );
			//}
			
		};//end storage
//console.log("storage object:", storage);

		function _init_cache() {

			var test = test_db();
//console.log(test);
			if ( !test["localStorage"] &&
					!test["WebSQL"] &&
						!test["indexedDB"]){

				lib.vars["logMsg"] = "error, not support web-storages...";
		 func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );

				config["use_localcache"] = false;
				return false;
			}
			
		//-----------------	
			var _driver = [];
			if(test["indexedDB"]){
				_driver.push(localforage.INDEXEDDB);
			}
			if(test["WebSQL"]){
				_driver.push(localforage.WEBSQL);
			}
			if(test["localStorage"]){
				_driver.push(localforage.LOCALSTORAGE);
			}
console.log( "localforage config: ", localforage._config );
//console.log( "localforage version: " + localforage._config.version );
			localforage.config({
/*
				driver: [localforage.INDEXEDDB,
						 localforage.WEBSQL,
						 localforage.LOCALSTORAGE],
*/						 
				//driver: [localforage.WEBSQL],
				//driver: [localforage.LOCALSTORAGE],
				driver: _driver,
				name: config["dbName"]
			});

			localforage.ready(function() {
console.log('localForage ready');
console.log('localforage.driver():', localforage.driver());
			});

			localforage.length(function(err, numberOfKeys) {
console.log('length of the database - ' + numberOfKeys);
console.dir(err);
			});
			
			return true;

			//var test_db = function(){
			function test_db(){
				var test = {}

				test["localStorage"] = false;
				if( 'localStorage' in window && window['localStorage'] !== null ) {
					test["localStorage"] = true;
				} 

			//console.log ("openDatabase = " + typeof(openDatabase));
				test["WebSQL"] = false;
				if(window.openDatabase) {
					test["WebSQL"] = true;
				}

			//console.log ("indexedDB = " + typeof(indexedDB));
				test["indexedDB"] = false;
				if("indexedDB" in window) {
					test["indexedDB"] = true;
				}

				//var message = navigator.userAgent + "<br>\n";
				var message = "";

				if ( test["localStorage"] ) {
					message += "LocalStorage is available<br>\n";
				} else {
					message += "LocalStorage is not available<br>\n";
				}

				if ( test["WebSQL"] ){
					message += "Your browser supports WebSQL<br>\n";
				} else {
					message += "Your browser does not have support for WebSQL<br>\n";
				}

				if( test["indexedDB"] ) {
					message += "Your browser supports indexedDB.<br>\n";
				} else {
					message += "Your browser does not have support for indexedDB.<br>\n";
				}

				lib.vars["info"].push(message);
console.log( message );
				return test;
			};//end _test()
			
		};//end _init_cache()


		function _checkAppData( opt ){
//console.log("function _checkAppData()", opt);
			var p = {
				"callback" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);


			//check storage key-tables
			localforage.keys( function(err, keys) {//test in array of keys
//console.log(err, keys, err === null);				

				if( err === null ){
					var j_keys = keys.join();
//console.log(j_keys);						

					for(var key in storage.tables){
						var pos = j_keys.indexOf( key);
//console.log(key, pos);						
						if( pos === -1){
							
lib.vars["logMsg"] = "store key "+key+" not found...";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
							storage.tables[key]["status"] = "store_key_not_found";
							storage["need_update"] = true;
						}
					}//next
				}
				
				if(typeof p["callback"] === "function"){
					p["callback"]();
				}

			});
		}//end _checkAppData()
				

		function _saveAppData( opt ){
//console.log("function _saveAppData()", opt);
			var p = {
				"callback" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
/*
			for(var tableName in storage.tables){
//console.log(tableName, storage.tables[tableName]);

				if( storage.tables[tableName]["records"].length > 0){
							
					//closures
					(function(name){
						//setTimeout(function(){ 
							//console.log("!!!Remove " + name); 
						//}, 1000);
						localforage.removeItem(name, function(err) {
console.log("Remove " + name);
console.dir(err);
							if(!err){
								storage.putItem( 
									name, 
									storage.tables[name]["records"], 
									function(){
										//console.log(arguments);				
									});
							}
							
						 });
						
					})(tableName);//end closure
				}

			}//next
*/			
//================== save application objects
			if( lib.vars["nodes"] ){
				var key1 = "nodes";
				localforage.removeItem(key1, function(err) {
console.log("Remove " + key1);
console.dir(err);
					if(!err){
						storage.putItem( 
							key1, 
							lib.vars[key1], 
							function(){
								//console.log(arguments);				
							});
					}
					
				 });
			}

			if( lib.vars["taxonomy"] ){
				var key2 = "taxonomy";
				localforage.removeItem(key2, function(err) {
console.log("Remove " + key2);
console.dir(err);
					if(!err){
						storage.putItem( 
							key2, 
							lib.vars["taxonomy"], 
							function(){
								//console.log(arguments);				
							});
					}
					
				 });
			}

			if( lib.vars["hierarchyList"] ){
				var key3 = "hierarchyList";
				localforage.removeItem(key3, function(err) {
console.log("Remove " + key3);
console.dir(err);
					if(!err){
						storage.putItem( 
							key3, 
							lib.vars[key3], 
							function(){
								//console.log(arguments);				
							});
					}
					
				 });
			}

					
			if(typeof p["callback"] === "function"){
				p["callback"]();
			}
		}//end _saveAppData()

/*
		function _getAppData( opt ){
//console.log("function _getAppData()", opt);
			var p = {
				"callback" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			//.............
				
			if(typeof p["callback"] === "function"){
				p["callback"]();
			}
		}//end _getAppData()
*/
				
				
		function _get_xml_from_storage() {
//console.log( "function _get_xml_from_storage()", localforage );

			var timeStart = new Date();
			localforage.keys( function(err, keys) {//test in array of keys
//console.log(err, keys, err === null);				
				if( err === null ){
					_getItem( keys );
				}
			});
			
			function _getItem( keys ){
				var j_keys = keys.join();
				var pos = j_keys.indexOf( config["storage_key"] );
				if( pos >= 0){

					localforage.getItem( config["storage_key"], function(err, readValue) {
//console.log('Read: ', config["storage_key"], readValue.length);
//console.log(err);
						var timeEnd = new Date();
						var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
						
						var cache_size = readValue.length; 
						var cache_size_kb = cache_size / 1024 ;
						var cache_size_mb = cache_size_kb / 1024;
						
						var log = "- get storage element " + config["storage_key"];
						log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
						log += ", runtime: <b>" + runTime + "</b> sec";
						log += ", error: " + err;
						
lib.vars["logMsg"] = log;
//func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
						lib.vars["info"].push("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
						
					
						lib.vars["runtime"]["get_storage"] = {
							"time" : runTime
						};
						//params.callback( readValue, true, log );	

						if( err === null){
							lib.postLoad( readValue);
						} else {
console.log("error, localforage.getItem("+config["storage_key"]+")", err);
						}
						
					 });
					 
				} else {
					load_xml({
						filename : config["xml_file"],
						dataType: "text",
						callback: function( xmlStr ){
							storage.putItem( config["storage_key"], xmlStr, __postFunc);
						}
					});
					/*
					loadXml({
						filename : config["xml_file"],
						callback: function( xmlStr ){
							storage.putItem( config["storage_key"], xmlStr, __postFunc);
						}
					});
					*/
				}
			}//end _getItem()
			
			function __postFunc( value, err){
//console.log( arguments );				

				if( err === null ){
					lib.postLoad( value );
				} else {
					lib.vars["logMsg"] = "error, failed save element to the storage", err;
					func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
//for(var key in err){
//console.log( key +": "+ err[key] );				
//}

					var driverStr = localforage.driver();
//console.log('localforage.driver():', driverStr);
//console.log( err["name"] );//NS_ERROR_DOM_QUOTA_REACHED
//console.log( err["code"] );//1014
//console.log( err["message"] );

					//LocalStorage error handler
					if( driverStr === "localStorageWrapper"){
						
						if( err["code"] === 1014){
							localforage.clear( function(err){
					lib.vars["logMsg"] = "Clear storage...";
					func.log("<div class='alert alert-warning'>" + lib.vars["logMsg"] + "</div>");
					console.log( lib.vars["logMsg"], err );

								//localforage.removeItem( config["storage_key"], function(err) {
					//lib.vars["logMsg"] = "Remove " +config["storage_key"];
					//func.log("<div class='alert alert-warning'>" + lib.vars["logMsg"] + "</div>");
					//console.log( lib.vars["logMsg"], err );

								 //});

							});
						}
					}

					//indexedDB error handler
					if( driverStr === "asyncStorage"){
						if( err["name"] === "QuotaExceededError"){
							localforage.clear( function(err){
					lib.vars["logMsg"] = "Clear storage...";
					func.log("<div class='alert alert-warning'>" + lib.vars["logMsg"] + "</div>");
					console.log( lib.vars["logMsg"], err );
							});
						}
					}

lib.vars["logMsg"] = "Use memory...";
func.log("<div class='alert alert-warning'>" + lib.vars["logMsg"] + "</div>");
					lib.postLoad( value );

				}
				
			}//end __postFunc()
			
		}//end _get_xml_from_storage()
/*

		function __getRecords( opt ) {
			var p = {
				"xml" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			var nodes = [];
			for( var n = 0; n < p.xml.length; n++){
//console.log( n, p.xml[n] );
				var node = {};
				//read node attributes
				var item_attr = func.get_attr_to_obj(  p.xml[n].attributes );
				for(var attr in item_attr){
					node[attr] = item_attr[attr];
				}//next attr

				nodes.push( node );
			}//next node
			
			
			return nodes;
		}//end __getRecords()
*/

		function _put_to_storage( key, value, callback ) {

			var timeStart = new Date();

			localforage.setItem( key, value, function(err, v) {
//console.log('function _put_to_storage, saved in cache ' + config["storage_key"]);
//console.log(err, v);
				var timeEnd = new Date();
				var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
				
				var cache_size = value.length; 
				var cache_size_kb = cache_size / 1024 ;
				var cache_size_mb = cache_size_kb / 1024;
				var log = "- save in cache element " + key;
				log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
				log += ", runtime: <b>" + runTime + "</b> sec";
				
				//var status = true;
				if( err !== null){
					log = "- error, no save " + key + ", " + err;
					//status = false;
					lib.vars["logMsg"] = "error, failed SAVE element, localforage.setItem("+ key +")", err;
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
				}
				
				//lib.vars["info"].push(log);
				lib.vars["logMsg"] = log;
func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );

				lib.vars["runtime"]["put_storage"] = {
					"time" : runTime
				};

				if( typeof callback === "function" ){
					callback( value, err );
				}

			});

		}//end _put_to_storage();
		

		function _getItemFromStorage( key, callback ){

			var timeStart = new Date();

			localforage.keys( function(err, keys) {//test in array of keys
//console.log(err, keys, err === null);				

				if( err === null ){
					var j_keys = keys.join();
					
					var pos = j_keys.indexOf( key);
					if( pos >= 0){
						__getItem( key, callback );
						
					} else {
						
						if(typeof callback === "function"){
lib.vars["logMsg"] = "store key "+key+" not found...";
//func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
							callback(null, "store_key_not_found");
						}
					}

				}

			});

			function __getItem( key, callback ){
			
				localforage.getItem( key, function(err, readValue){
//console.log("Read: " + key, arguments);
//console.log(err);
						var timeEnd = new Date();
						var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
						var log = "- get storage element <b>" + key + "</b>";
						
						if( readValue ){
							var cache_size = readValue.length; 
							var cache_size_kb = cache_size / 1024 ;
							var cache_size_mb = cache_size_kb / 1024;
							log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
						}
											
						log += ", runtime: <b>" + runTime + "</b> sec";
						log += ", error: " + err;
						
						//lib.vars["info"].push(log);
lib.vars["logMsg"] = log;
func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
						
						//if( err !== null){
							//lib.vars["logMsg"] = "error, faled READ element, localforage.getItem("+ key +")", err;
	//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
	//console.log( lib.vars["logMsg"] );
						//}
					
						lib.vars["runtime"]["get_storage"] = {
							"storageKey" : key,
							"time" : runTime
						};

						if( typeof callback === "function" ){
							callback( readValue, err );
						}

				});
						
			}//end _getItem()
			
		}//end _getItemFromStorage()

