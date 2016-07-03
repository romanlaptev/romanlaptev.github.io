var database = [];
database["dbname"] = "mobapp";
database["import_type"] = "json";

//input JSON file format
var INDEX_KOD = "kod";
var INDEX_TEXT = "text";
var INDEX_TEXT_TRANSLIT = "text_transliter";

//console.log for old IE
if(!window.console){
	console = {
		log : function(message){
			alert(message);
		}
	}
}
/*
var translit_table = [
	{"latin":"U", "latvian":0x16a},//Ū
	{"latin":"E", "latvian":0x112},//Ē
	{"latin":"C", "latvian":0x10C},//Č
	{"latin":"Z", "latvian":0x17B},//Ž
	{"latin":"S", "latvian":0x160},//Š
	{"latin":"K", "latvian":0x136},//Ķ
	{"latin":"N", "latvian":0x145},//Ņ
	{"latin":"I", "latvian":0x12A},//Ī
	{"latin":"A", "latvian":0x100},//Ā
	{"latin":"L", "latvian":0x13B},//Ļ
	{"latin":"G", "latvian":0x122}//Ģ
];
*/
/*
for( var n = 0; n < translit_table.length; n++){
	var symbol_latvian = String.fromCharCode( translit_table[n]["latvian"] );
console.log( "Latin:" + translit_table[n]["latin"] +", Latvian: " + symbol_latvian);
}//next
var test = String.fromCharCode(0x16a);
console.log("Ū", "Ū".length, "Ū" == test, test );
*/

function add_data( args ){
	
	if( !args ){
console.log( "error, undefined DB params" );
		return false;
	}
	if( !args["storename"] ){
console.log( "error, undefined 'storename'" );
		return false;
	}
//console.log( args );

	//detect import_type and parse input data
	if( args["import_type"].length > 0){
		database["import_type"] = args["import_type"];
	}
	switch( args["import_type"] ) {
	
		case "json":
			var parse_data = JSON.parse( args["load_data"] );
		break;
		
		case "csv":
			var parse_data = args["load_data"].split('\n');
		break;
		
		default:
var message = "import_type error, 'json' or 'csv' only"		
console.log(message);
			return false;
	}
	
	var params = {
		"dbname"	:	args["dbname"],
		"storename":	args["storename"],
		"action"	:	"add_records",
		"load_data"	:	parse_data,
		"fields"	:	args["fields"],
		"callback"	:	function( res ){ 
console.log("add_data, callback function.", res);
			var exec_end = new Date();
			res["runtime"] = (exec_end.getTime() - exec_start.getTime()) / 1000;
			output( res );
		}
	};
//console.log( params );

	var html = "<h2>Load data in &quot;"+ args["storename"] + "&quot;, waiting...</h2>"
	document.getElementById("progress-txt").innerHTML = html;
	
	var exec_start = new Date();
	DB( params );


	function output( params ){
//console.log("function output() ", params);
		var total = params["total"];//info size in bytes
		var runtime = params["runtime"];
		
		document.getElementById("progress-txt").innerHTML = "";
		//get number of added records
		var params = {
			"dbname":args["dbname"],
			"store_name":args["storename"],
			"action":"number_records",
			"callback":function( num ){ 
//console.log("number_records, callback function.", arguments);
				var html = "<p class='text-info'>";
				html += "Database <b>"+args["dbname"]+"</b>, ";
				html += "object store <b>" +args["storename"]+ "</b>, ";
				html += "add <b>"+num+"</b> records, ";
				html += "total size: <b>" + total["bytes"] + "</b> bytes ";
				html += "(<small>" + total["symbols"] + " symbols</small>), ";
				if( total["Kbytes"] ){
					html += "<b>" + total["Kbytes"] + "</b> Kb, ";
				}
				if( total["Mbytes"] ){
					html += "<b>" + total["Mbytes"] + "</b> Mb, ";
				}
				html += "runtime: <b>" + runtime + "</b> sec";
				html += "</p>";
				log.innerHTML += html;
			}
		};
		DB( params );
	}//end output
	
}//end add_data()

function search( args ){
	var exec_start = new Date();
	
	if( args["code"] && args["code"].length > 0){
		var params = {
			"dbname" : args["dbname"],
			"store_name" : args["store_name"],
			"action" : "search_code",
			"code" : args["code"],
			"use_index" : args["use_index"],
			"use_cursor" : args["use_cursor"],
			"callback" : function( result ){ 
console.log("search code, callback function.....", arguments)
				output( result );
			}
		};
		var s_value = params["code"];
	}
	
	if( args["text"]  && args["text"].length > 0){
	
		var params = {
			"dbname" : args["dbname"],
			"store_name" : args["store_name"],
			"action" : "search_text",
			"value" : args["text"],
			"use_index" : args["use_index"],
			"use_cursor" : args["use_cursor"],
			"callback" : function( result ){ 
//console.log("search text, callback function.....", arguments)
				output( result );
			}
		};
		var s_value = params["value"];
		
/*		
		//detect translit in search query ("SKERSIELA" === "ŠĶĒRSIELA")
	"ŠKERSIELA"
	"SĶERSIELA"
	"SKĒRSIELA"
	"ŠKERSIELA"
	"SKERSĪELA"
	"SKĒRSIELA"
	"SKERSIEĻA"
	"SKERSIELĀ"
	
		var s_value = s_value.toUpperCase();
		for( var n1 = 0; n1 < s_value.length; n1++){
console.log( s_value[n1] );
			for( var n2 = 0; n2 < translit_table.length; n2++){
				var test = translit_table[n2]["latin"];
				if( s_value[n1] === test ){
console.log( "translit detected, needed advanced search....");
					var symbol_latvian = String.fromCharCode( translit_table[n2]["latvian"] );
					if( !params["latvian_values"] ){
						params["latvian_values"] = [];
					}
					var latvian_value = s_value.replace( s_value[n1], symbol_latvian );
					params["latvian_values"].push( latvian_value );
				}
			}//next
		}//next symbol
*/		
	}
	
	if( params ){
//console.log( params );
		var html = "<h2>Search &quot;"+ s_value + "&quot;, waiting...</h2>"
document.getElementById("search-result").innerHTML = html;
		DB( params );
	}
	
	
	function output( res ){
		var exec_end = new Date();
		var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
		var html = "";
		html += "<div class='text-info'>";
		html += "<b>search time:</b> " + runtime_s + " sec";
		if( res.length > 0 ){
			html += "<ol>";
			for( var n = 0; n < res.length; n++){
//console.log( res[n] );
				html += "<li>";
				html += res[n][INDEX_KOD] + " , " + res[n][INDEX_TEXT];
				if( res[n][INDEX_TEXT_TRANSLIT] && res[n][INDEX_TEXT_TRANSLIT].length > 0){
					html += " , " + res[n][INDEX_TEXT_TRANSLIT];
				}
				html += "</li>";
			}//next
			html += "</ol>";
		} else {
			html += "<p class='text-danger'>not found</p>";
		}
		html += "</div>";
		document.getElementById("search-result").innerHTML = html;
	}//end output()
	
}//end search()


function DB( params ){
	if( !params ){
console.log( "error, undefined DB params" );
		return false;
	}
	if( !params["dbname"] ){
console.log( "error, undefined DB params dbname" );
		return false;
	}
	
	var dbname = params["dbname"];
	//db_params["dbname"] = params["dbname"];
	
	var store_name = params["storename"];
	if( params["store_name"] && params["store_name"].length > 0 ){
		var store_name = params["store_name"];
	};

	var action = params["action"];
	
	var data =  params["load_data"];
	if( params["data"] && params["data"].length > 0 ){
		var data = params["data"];
	};
//console.log(data);
	
	var code =  params["code"];
	var key =  params["key"];
	//var index_key =  params["index_key"];
	//var index_value =  params["index_value"];
	var value =  params["value"];
	var callback = params["callback"];
	var use_index = params["use_index"];
	var use_cursor = params["use_cursor"];
	
	var idbSupported = test_indexeddb();
	if( !idbSupported ) {
		return false;
	}
	
	switch( action ){
	
		case "create_store":
			get_version_indexedDB( dbname, set_new_version_DB);
			break;
			
		case "delete_store":
			get_version_indexedDB( dbname, set_new_version_DB);
			break;
		/*	
		case "add_records":
		case "delete_record":
		case "get_record":
		case "number_records":
		case "clear_store":
		case "search_code":
		case "search_text":
			try{
				var request = indexedDB.open( dbname );
//console.log( request );
				upgrade( request, callback );
			} catch(e) {
console.log(e);
			};
			break;
		*/
		default:
			try{
				var request = indexedDB.open( dbname );
//console.log( request );
				upgrade( request, callback );
			} catch(e) {
console.log(e);
			};
			break;
	}//end switch
	
	
	function set_new_version_DB (db_version){
		var new_version = db_version + 1;
//console.log("function set_new_version_DB(), ", db_version, new_version);
		try{
			var request = indexedDB.open( dbname, new_version );
//console.log( request );
			upgrade( request, callback );
		} catch(e) {
console.log(e);
		};
	}//end set_new_version_DB()

	function upgrade( request, callback ){
		request.onupgradeneeded = function(e) {
var message = 'Upgrading ' + dbname;
console.log(message);				
//log.innerHTML += "<li>" + message + "</li>";
			db = e.target.result;
			
			switch( action ){

				case "create_store":
					if(!db.objectStoreNames.contains( store_name )) {
						var store = db.createObjectStore( store_name, { autoIncrement:true });  
						
						//var store = db.createObjectStore( store_name, { keyPath: INDEX_KOD, autoIncrement:true });  
						store.createIndex(INDEX_KOD,INDEX_KOD, {unique:true, multiEntry:false});
						store.createIndex(INDEX_TEXT,INDEX_TEXT, {unique:false});
//var name = 'multiple_index';
//var keyPath = ['kod','text'];
//store.createIndex( name, keyPath );
						
var message = "Create store " + store_name + ' in ' + dbname;
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message);				
						if( callback ){
							callback();
						}
					}
				break;
				
				case "delete_store":
					if( db.objectStoreNames.contains( store_name ) ){
						db.deleteObjectStore(store_name);
var message = "Delete store " + store_name + ' from ' + dbname;
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message);				
					} else {
var message = store_name + ' not exists in DB ' + dbname;
//log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message);				
					}
				break;
			}//end switch
			
		}//end upgradeneeded callback
 
		request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
			db = e.target.result;
			
			//refresh store-list
			document.getElementById("store-list").innerHTML = "";
			document.getElementById("store-list2").innerHTML = "";
			for( var n = 0; n < db.objectStoreNames.length; n++){
				document.getElementById("store-list").innerHTML += "<li>" +db.objectStoreNames[n]+ "</li>";
				document.getElementById("store-list2").innerHTML += "<li>" +db.objectStoreNames[n]+ "</li>";
			}//next

			db.onerror = function(event) {
var message = 'Error opening database.';
console.log(message);				
log.innerHTML += "<li>" + message + "</li>";
			};
			db.onabort = function(event) {
var message = 'Database opening aborted!';
console.log(message, event);				
log.innerHTML += "<li>" + message + "</li>";
			};
			//db.onversionchange = function(event) {
				//var message = 'db.onversionchange';
//console.log(message);				
				//log.innerHTML += "<li>" + message + "</li>";
			//};

			var message = "onsuccess, "+ dbname + ", db.version = " + db.version;
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message);

			//TRANSACTION
			switch( action ){
				case "clear_store":
					var params = {
						"action":"clear_store",
						"store_name": store_name
						};
					run_transaction( params );
					break;
					
				case "add_records":
					if( db.objectStoreNames.contains( store_name ) ){
//console.log(data, typeof data );
						//if( typeof data === "object" ){
							var params = {
								"dbname"	:	database["dbname"],
								"store_name":store_name,
								"action":"add_records",
								"data": data,
								"callback": callback
							};
							run_transaction( params );
						//}
					} else {
var message = store_name + ' not exists in DB ' + dbname;
console.log(message);				
//log.innerHTML += "<p class='text-danger'>" + message + "</p>";
						var params = {
							"dbname"	:	database["dbname"],
							"store_name":store_name,
							"action":"create_store",
							"callback":function(){ 
								var params = {
									"dbname":dbname,
									"store_name":store_name,
									"action":"add_records",
									"data": data,
									"callback": callback
								};
//console.log("create_store callback...", params);
								DB( params );
							}
						};
						DB( params );
					}
					break;

					
				case "delete_record":
						var params = {
							"action": action,
							"dbname": dbname,
							"store_name": store_name,
							"key": ( (!key) ? false : key)
							};
//console.log("params = ", params, !key);
							
						run_transaction( params );
					break;

				case "get_record":
						var params = {
							"action": action,
							"dbname": dbname,
							"store_name": store_name,
							"key": ( (!key) ? false : key)
							};
//console.log("params = ", params, !key);
						run_transaction( params );
					break;

				case "get_records":
						var params = {
							"action": action,
							"dbname": dbname,
							"store_name": store_name,
							"callback": callback
							};
//console.log("params = ", params, !key);
						run_transaction( params );
					break;

				case "number_records"://number of added records
						var params = {
							"dbname":dbname,
							"store_name":store_name,
							"action":action,
							"callback": callback
						}
						run_transaction( params );
					break;
					
				case "search_code":
						var params = {
							"action": action,
							"dbname": dbname,
							"store_name": store_name,
							"code": ( (!code) ? false : code),
							"use_index": use_index,
							"use_cursor": use_cursor,
							"callback": callback
							};
						run_transaction( params );
					break;
					
				case "search_text":
				
						var params = {
							"action": action,
							"dbname": dbname,
							"store_name": ( (!store_name) ? false : store_name),
							"value": ( (!value) ? false : value),
							"use_index": use_index,
							"use_cursor": use_cursor,
							"callback": callback
							};
//console.log("params = ", params );
						run_transaction( params );
					break;
					
			}//end switch

			db.close();
			
		}//end success callback
 
		request.onerror = function(e) {
			var message = "error " + e.target.error.name+", "+ e.target.error.message;
			log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message, e);				
console.dir(db);
		}//end error callback
		
		request.onblocked = function (e) {
			var message = "Database " + dbname + " being blocked";
console.log(message, e);				
			log.innerHTML += "<p class='text-danger'>" + message + "</p>";
		};
		
	}//end upgrage

}//end connectDB()

function get_version_indexedDB( dbname, callback ){
	var idbSupported = test_indexeddb();
//console.log( "function get_version_indexedDB(), ", arguments, idbSupported );
	
	if(idbSupported) {
		var request = indexedDB.open( dbname );
 
		request.onsuccess = function(e) {
			db = e.target.result;
var message = dbname + ", db.version = " + db.version, db;
console.log(message);				
//log.innerHTML += "<p>" + message + "</p>";
			db.close();
			
			if( callback ){
				callback( db.version );
			}
		}
 
		request.onerror = function(e) {
			var message = "get_version_indexedDB(), error " + e.target.error.name +", "+ e.target.error.message;
			log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message);				
console.dir(db);
		}
 
	}
}//end get_version_indexedDB()

function drop_db( dbname ){
	var idbSupported = test_indexeddb();
//console.log( arguments, idbSupported );
	if( !idbSupported ){
		return false;
	}
	
	var req = indexedDB.deleteDatabase(dbname);
	
	req.onsuccess = function () {
		var message = "Deleted database " + dbname + " successfully";
console.log(message);				
		log.innerHTML += "<p class='text-success'>" + message + "</p>";
	};
	req.onerror = function () {
		var message = "Couldn't delete database " + dbname;
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
	};
	req.onblocked = function () {
		var message = "Couldn't delete database " + dbname + " due to the operation being blocked";
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
	};
	
}//end drop_db()


function run_transaction( params ){
	var action = params["action"];
	var store_name = params["store_name"];
	var dbname = params["dbname"];
	var callback = params["callback"];
	
	if( !store_name ){
var message = "error, undefined 'store_name', name object store...";
console.log(message);				
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
		return false;
	}

	if( !db.objectStoreNames.contains( store_name ) ){
var message = 'Name object store ' + store_name + ' not exists in DB ' + dbname;
console.log(message);				
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
		return false;
	}
	
	var type = "readwrite";//"readonly", "version_change"
	if( action === "get_record" ||  
			action === "get_records" ||  
				action === "search_code" ||
					action === "search_text" ){
		var type = "readonly";
	}
	
	var transaction = db.transaction([store_name], type );
	
	transaction.onerror = function(event) {
console.log("transaction.onerror");
var message = "transaction.onerror";
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message, event);				
	};  
	
	transaction.onabort = function(event) {
console.log("transaction.onabort", event);
		var error = event.target.error;
		if (error.name == 'QuotaExceededError') {
alert("transaction.onabort, QuotaExceededError!");
		}
	};

	var store = transaction.objectStore(store_name);
//console.log( store );
	
	switch ( action ){
	
		case 'add_record':
			var value = params["value"];
			var key = params["key"];

			if(!key){
				//var request = store.add( value );
				var request = store.put( value );
			} else {
				//var request = store.add( value, key );
				var request = store.put( value, key );
			}
			
			transaction.oncomplete = function(event) {
var message = "transaction.oncomplete";
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message, event);				
				if( callback ){
					callback();
				}
			};
			
			request.onerror = function(e) {
var message = "error add value,  " + e.target.error.name +", "+e.target.error.message;
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message,e);
			}
			request.onsuccess = function(e) {
var message = "success add value";
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message, e);
			}
		break;

		
		case 'add_records':
			var data = params["data"];
			var total = { 
				"symbols" : 0,
				"bytes" : 0
			};
			
			for( var n = 0; n < data.length; n++ ){
			//for( var n = 0; n < 9; n++ ){
//console.log(data[n]);
				//var request = store.add( data[n] );
				var request = store.put( data[n] );
				
				//count store info size in bytes and symbols
				var s_value = data[n];
				if( database["import_type"] === "json"){
					var s_value = JSON.stringify( data[n] );
				}
				
				total["symbols"] = total["symbols"] + s_value.length;
//console.log( item, data[item], json_value, json_value.length );
				var size_bytes = unescape(encodeURIComponent( s_value )).length;
//console.log("size_bytes : ", size_bytes);
				total["bytes"] = total["bytes"] + size_bytes;

				request.onerror = function(e) {
var message = "error add value,  " + e.target.error.name +", "+e.target.error.message;
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message,e);
				}
				request.onsuccess = function(e) {
//var message = "success add value";
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
//console.log(message, e);
				}
			}//next
			
			transaction.oncomplete = function(event) {
var message = "transaction add records oncomplete";
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
//console.log(message, event);				
				if( callback ){
				
					if( total["bytes"] > 1024 ){
						total["Kbytes"] = (total["bytes"] / 1024).toFixed(2);
						if( total["Kbytes"] > 1024 ){
							total["Mbytes"] = (total["Kbytes"] / 1024).toFixed(2);
						}
					}
					
					var params = {
						"total": total
					};
					callback( params );
				}

			};
		break;


		
		case 'number_records':
//console.log(params);
			var req = store.count();	
			req.onsuccess = function() {
				var num_records = req.result;	
var message = "Store <b>" +store_name+ "</b> contains " + num_records +" records.";
//log.innerHTML += "<p class='text-info'>" + message + "</p>";
console.log(message);
				if( callback ){
					callback( num_records );
				}
			}
		break;
		
		case 'get_record':
			var key = params["key"];
			if(!key){
var message = "error, empty key (required).... " + key;
console.log(message);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}
			
			var request = store.get( key );
			//var index = store.index(INDEX_KOD);
			//var request = index.get( key );
//console.log(key, index, request );
			
			request.onerror = function(e) {
var message = "error get record with key " + key;
console.log(message, e.target.error.name);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
			}
			
			request.onsuccess = function(e) {
var message = "success get record with key " + key;
console.log(message, e);				
log.innerHTML += "<p class='text-success'>" + message + "</p>";
				var result = e.target.result;
console.log(result);
				var json_value = JSON.stringify( result );
				log.innerHTML += "<p class='text-success'>" + json_value + "</p>";
			}
			
		break;

		case 'get_records':
			var records = [];
/*			
			var keyRangeValue = IDBKeyRange.only("LVA");
			//store.openCursor().onsuccess = function(event) {
			store.openCursor( keyRangeValue ).onsuccess = function(event) {
				var cursor = event.result || event.target.result;
				if (cursor) {
console.log( "cursor: " , cursor, cursor.key, cursor.value );
					cursor["continue"]();
				}
			};
*/

			//var index = store.index(INDEX_KOD);
			//var keyRangeValue = IDBKeyRange.only("LVA");
			//index.openCursor( keyRangeValue ).onsuccess = function(event) {
			//index.openCursor().onsuccess = function(event) {
			store.openCursor().onsuccess = function(event) {
				var cursor = event.result || event.target.result;
				if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );
					records.push( cursor.value );
					cursor["continue"]();
				}
			};
			
			transaction.oncomplete = function(event) {
var message = "transaction get records complete";
log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message, event);
console.log( records );
				if( callback ){
					callback( records );
				}
			};

		break;
		
		case 'delete_record':
			var key = params["key"];
			if(!key){
var message = "error, empty key (required).... " + key;
console.log(message);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}

			//var request = store.delete( key );
			var request = store["delete"]( key );
			request.onerror = function(e) {
var message = "error delete record with key " + key;
console.log(message, e.target.error.name);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
			}
			request.onsuccess = function(e) {
var message = "success delete record with key " + key;
console.log(message, e);				
log.innerHTML += "<p class='text-success'>" + message + "</p>";
			}
		break;
		
		case 'clear_store':
			var req_clear = store.clear();
			req_clear.onerror = function(e) {
				var message = "error clear store, " + e.target.error.name;
console.log(message, e);				
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
			};
			req_clear.onsuccess = function(e) {
				var message = "success clear " + store_name;
console.log(message, e);				
log.innerHTML += "<p class='text-success'>" + message + "</p>";
			};
		break;

		
		case 'search_code':
			var code = params["code"].toUpperCase();
			if(!code){
var message = "error, empty search line (required).... " + code;
console.log(message);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}
			
			if ('getAll' in store) {
				var use_cursor = false;
			} else {
				var use_cursor = true;
			}
			//checkbox "use_cursor"
			if( typeof params["use_cursor"] !== "undefined"){
				use_cursor = params["use_cursor"];
			}
		
			var result = [];
			if ( !use_cursor) {
				if( params["use_index"]){
					var index = store.index(INDEX_KOD);
					keyRange = IDBKeyRange.only( code );
					index.getAll( keyRange ).onsuccess = function(event) {
						var records = event.target.result;
						process_records ( records, code, INDEX_KOD );
					};
					
				} else {
					store.getAll().onsuccess = function(event) {
						var records = event.target.result;
						process_records ( records, code, INDEX_KOD );
					};
				}
			}
			
			if ( use_cursor) {
				if( params["use_index"]){
					//search in fields "kod"
					var index = store.index(INDEX_KOD);
					//var index = store.index("multiple_index");
						
					keyRange = IDBKeyRange.only( code );
					//http://stackoverflow.com/questions/7086180/indexeddb-fuzzy-search
					//keyRange = IDBKeyRange.bound( code, code + '\uffff');//LIKE 'code%'
					//keyRange = IDBKeyRange.upperBound ( code, false);
					//keyRange = IDBKeyRange.lowerBound ( code, false);
					index.openCursor( keyRange ).onsuccess = function(event) {
						process_cursor_record ( event, code, INDEX_KOD );
					};
				} else {
					store.openCursor().onsuccess = function(event) {
						process_cursor_record ( event, code, INDEX_KOD );
					};
				};
			}
			
			transaction.oncomplete = function(event) {
var message = "transaction search code complete, use_index: " + params["use_index"];
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message, event);
console.log( result );
				if( callback ){
					callback( result );
				}
			};
			
		break;
		
		case "search_text":
			var s_value = params["value"].toUpperCase();
			if(!s_value){
var message = "error, empty search line (required).... " + s_value;
console.log(message);
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}
			
console.log( "getAll support: " , 'getAll' in store );
console.log( "getAllKeys support: " , 'getAllKeys' in store );
			var get_all_support = 'getAll' in store;
			var message = "DB read method getAll support : " +  get_all_support;
console.log(message);				
			log.innerHTML += "<p class='text-info'>" + message + "</p>";

			if ('getAll' in store) {
				var use_cursor = false;
			} else {
				var use_cursor = true;
			}
			
			//checkbox "use_cursor"
			if( typeof params["use_cursor"] !== "undefined"){
				use_cursor = params["use_cursor"];
			}
			
			var result = [];
			if ( !use_cursor) {
				if( params["use_index"]){
					var index = store.index(INDEX_TEXT);
					keyRange = IDBKeyRange.lowerBound ( s_value, false);
					//keyRange = IDBKeyRange.only( s_value );
					index.getAll( keyRange ).onsuccess = function(event) {
						var records = event.target.result;
						process_records ( records, s_value, INDEX_TEXT );
					};
					
				} else {
					store.getAll().onsuccess = function(event) {
						var records = event.target.result;
						process_records ( records, s_value, INDEX_TEXT );
					};
					
					//store.getAllKeys().onsuccess = function(event) {
						//records["keys"] = event.target.result;
					//};
				}
					
			};

			if ( use_cursor) {
				if( params["use_index"]){
					//search in fields "text"
					var index = store.index(INDEX_TEXT);
					//keyRange = IDBKeyRange.only( s_value );
					
					//keyRange = IDBKeyRange.bound( s_value, s_value + '\uffff');//LIKE 's_value%'
					//keyRange = IDBKeyRange.bound( '0', s_value);//LIKE '%s_value'
					
					//keyRange = IDBKeyRange.upperBound ( s_value, false);
					//index.openCursor( keyRange ).onsuccess = function(event) {
						//process_cursor_record ( event, s_value, INDEX_TEXT );
					//};

					keyRange = IDBKeyRange.lowerBound ( s_value, false);
					index.openCursor( keyRange ).onsuccess = function(event) {
						process_cursor_record ( event, s_value, INDEX_TEXT );
					};
				} else {
					store.openCursor().onsuccess = function(event) {
						process_cursor_record ( event, s_value, INDEX_TEXT );
					};
				};
			};
			
			transaction.oncomplete = function(event) {
var message = "transaction search text complete, use_index: " + params["use_index"];
//log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message, event);
//console.log( result );
				if( callback ){
					callback( result );
				}
			};
		break;//end search text
		
	}//end switch
	
	function process_cursor_record ( event, value, index ){
		var cursor = event.target.result;
		if (cursor) {
//console.log( "cursor: " , cursor, cursor.key, cursor.value );
			
			//Search keyword in records
			//var test_value = cursor.value[INDEX_KOD].toUpperCase();
			//if( test_value.indexOf( value ) !== -1 ){
				//result.push( cursor.value );
			//} else {
			
				var test_value = cursor.value[index].toUpperCase();
				if( test_value.indexOf( value ) !== -1 ){
					result.push( cursor.value );
				};
				
				//detect translit value
				if( cursor.value[INDEX_TEXT_TRANSLIT] && cursor.value[INDEX_TEXT_TRANSLIT].length > 0){
					var test_value = cursor.value[INDEX_TEXT_TRANSLIT].toUpperCase();
					if( test_value.indexOf( value ) !== -1 ){
						result.push( cursor.value );
					};
				}
				
			//}
			//cursor.continue();
			cursor["continue"]();
		}
	}//end process_cursor_record()

	function process_records ( records, value, index ){
		for( var n = 0; n < records.length; n++){
//console.log( records[n] );
			var test_value = records[n][index].toUpperCase();
			if( test_value.indexOf( value ) !== -1 ){
				result.push( records[n] );
			};

			if( index === INDEX_TEXT ){
				//detect translit value (for INDEX_TEXT field)
				if( records[n][INDEX_TEXT_TRANSLIT] && 
						records[n][INDEX_TEXT_TRANSLIT].length > 0){
					var test_value = records[n][INDEX_TEXT_TRANSLIT].toUpperCase();
					if( test_value.indexOf( value ) !== -1 ){
						result.push( records[n] );
					};
				}
			}

		}//next
	}//end process_records()
	
}//end run_transaction()


function test_indexeddb() {
	if("indexedDB" in window) {
		return true;
	} else {
		var message = "IndexedDB not supported!!!";
		var log = document.getElementById("log");
		if( log ){
			log.innerHTML += "<h2 class='text-danger'>" + message + "</h2>";
		}
console.log( message );
		return false;
	};
}//end test_indexeddb()


function isQuotaExceeded(e) {
	var quotaExceeded = false;
	if (e) {
		if (e.code) {
			switch (e.code) {
				case 22://Chrome, IE >= 9
//e.code = 22
//e.name = QuotaExceededError
//e.message = Failed to execute 'setItem' on 'Storage': Setting the value of 'localforage/export_lib4.xml' exceeded the quota.
					quotaExceeded = true;
				break;
				case 1014:// Firefox
//e.code = 1014
//e.message = Persistent storage maximum size reached
//e.name = NS_ERROR_DOM_QUOTA_REACHED
					if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
						quotaExceeded = true;
					}
				break;
				}
			} 
			else 
			{
				if (e.number === -2147024882) // Internet Explorer 8
				{
//e.message = Недостаточно памяти для завершения операции.
//e.description = Недостаточно памяти для завершения операции.
					quotaExceeded = true;
				}
			}
	}
	return quotaExceeded;
}//end isQuotaExceeded()

/*
//http://interestabout.blogspot.ru/2011/08/javascript_15.html
String.prototype.byteLength = function(){
   var str = this, length = str.length, count = 0, i = 0, ch = 0;
   for(i; i < length; i++){
     ch = str.charCodeAt(i);
     if(ch <= 127){
        count++;
     }else if(ch <= 2047){
        count += 2;
     }else if(ch <= 65535){
        count += 3;
     }else if(ch <= 2097151){
        count += 4;
     }else if(ch <= 67108863){
        count += 5;
     }else{
        count += 6;
     }    
  }
  return count;
};

var s = "FEDERATIVA";
console.log( s.length );//10
console.log('Length: ', s.byteLength(), ' byte(s)');//12

var count = unescape(encodeURIComponent(s)).length;//12
console.log(count );
*/