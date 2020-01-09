var db;//indexeddb link

function test_indexeddb() {
	if("indexedDB" in window) {
		return true;
	} else {
	
		var message = "IndexedDB not supported";
		if (window.console){
console.log( message );
		} else {
alert( message );
		}
		return false;
	};
}//end test_indexeddb()
	
function connect_indexedDB( dbname, store_name ){

	var idbSupported = test_indexeddb();
console.log( arguments, idbSupported );
	if(idbSupported) {
		get_version_indexedDB( dbname, callback);
	}
	
	function callback (db_version){
		var new_version = db_version + 1;
//console.log("function callback(), ", db_version, new_version);

		try{
			var request = indexedDB.open( dbname, new_version );
console.log( request );
			process( request );
		} catch(e) {
console.log(e);
		};
	}//end callback()
	
	function process( request ){
		
		request.onupgradeneeded = function(e) {
		
var message = 'Upgrading...';
console.log(message);				
log.innerHTML += "<li>" + message + "</li>";
//console.dir(e);

			db = e.target.result;
			db.onerror = function(event) {
				var message = 'Error opening database.';
console.log(message);				
				log.innerHTML += "<li>" + message + "</li>";
			};
			db.onabort = function(event) {
				var message = 'Database opening aborted!';
console.log(message);				
				log.innerHTML += "<li>" + message + "</li>";
			};
			db.onversionchange = function(event) {
				var message = 'db.onversionchange';
console.log(message);				
				log.innerHTML += "<li>" + message + "</li>";
				var message = "a database change has occurred; you should refresh this browser window, or close it down and use the other open version of this application, wherever it exists.";
				log.innerHTML += "<p>" + message + "</p>";
			};
			
			if(!db.objectStoreNames.contains( store_name )) {
				var store = db.createObjectStore( store_name, {autoIncrement: true} );
			}
			//var titleIndex = store.createIndex("by_title", "title");
//var message = "onupgradeneeded, db.version = " + db.version;
//console.log(message, db);				
//log.innerHTML += "<li>" + message + "</li>";
			//document.getElementById("current-version").innerHTML = db.version;
		}//end request callback
 
		request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
			db = e.target.result;
			var message = "onsuccess, db.version = " + db.version, db;
			log.innerHTML += "<p class='text-success'>" + message + "</p>";
console.log(message);				
			document.getElementById("current-version").innerHTML = db.version;
		}
 
		request.onerror = function(e) {
			var message = "error " + e.target.error.name+", "+ e.target.error.message;
			log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message);				
console.dir(db);
		}
	}//end process
	
}//end connect_indexedDB()

function get_version_indexedDB( dbname, callback ){
	var idbSupported = test_indexeddb();
//console.log( "function get_version_indexedDB(), ", arguments, idbSupported );
	
	if(idbSupported) {
		var request = indexedDB.open( dbname );
 
		//request.onupgradeneeded = function(e) {
			//var message = "get_version_indexedDB(), Upgrading...";
//console.log(message);				
			//log.innerHTML += "<p>" + message + "</p>";
//console.dir(e);
		//}
 
		request.onsuccess = function(e) {
//console.log(e, e.target.result.objectStoreNames);			
			//var message = "get_version_indexedDB(), Success!";
//console.log(message);				
			//log.innerHTML += "<p>" + message + "</p>";
//console.dir(e);
			db = e.target.result;
			var message = "get_version_indexedDB(), db.version = " + db.version, db;
console.log(message);				
			log.innerHTML += "<p>" + message + "</p>";
			document.getElementById("current-version").innerHTML = db.version;
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
	if( idbSupported ){
		if(db){
			db.close();
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
	}
}//end drop_db()

function add_value( dbname, store_name, value, key ){
//console.log(arguments. key);
	var request = indexedDB.open( dbname );
	request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
		db = e.target.result;
console.log(db);
		var params = {
			"action":"add_value",
			"store_name": store_name,
			"key": ( (!key) ? false : key),
			"value": value
			};
console.log(params);
		run_transaction( params );
	}
	request.onerror = function(e) {
		var message = "add_value(), error " + e.target.error.name+", "+ e.target.error.message;
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.dir(db);
	}
}//end add_value()

function delete_record( dbname, store_name, key ){
	var request = indexedDB.open( dbname );
	request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
		db = e.target.result;
		var params = {
			"action":"delete_record",
			"store_name": store_name,
			"key": ( (!key) ? false : key)
			};
console.log(params);
		run_transaction( params );
	}
	request.onerror = function(e) {
		var message = "delete_record(), error " + e.target.error.name+", "+ e.target.error.message;
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.dir(db);
	}

}//end delete_record()

function get_record( dbname, store_name, key ){
	var request = indexedDB.open( dbname );
	request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
		db = e.target.result;
		var params = {
			"action":"get_record",
			"store_name": store_name,
			"key": ( (!key) ? false : key)
			};
console.log(params);
		run_transaction( params );
	}
	request.onerror = function(e) {
		var message = "get_record(), error " + e.target.error.name+", "+ e.target.error.message;
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.dir(db);
	}
}//end get_record()

function delete_store( dbname, store_name, version ){
		/*
var request = db.setVersion('1.0');
   request.onsuccess = function(event) {
     db.deleteObjectStore(objectStore);
   };
   request.onerror = function(event) {...};
   */
		var idbSupported = test_indexeddb();
//console.log( arguments, idbSupported );
		if(idbSupported) {
			get_version_indexedDB( dbname, callback);
		}
		
		function callback (db_version){
			var new_version = db_version + 1;
//console.log("function callback(), ", db_version, new_version);
			try{
				var request = indexedDB.open( dbname, new_version );
console.log( request );
				process( request );
			} catch(e) {
console.log(e);
			};
		}//end callback()
		
		function process( request ){
			request.onupgradeneeded = function(e) {
var message = 'delete_store(), Upgrading...';
console.log(message);				
log.innerHTML += "<li>" + message + "</li>";

				db = e.target.result;
				if( db.objectStoreNames.contains( store_name ) ){
					db.deleteObjectStore(store_name);
				} else {
var message = store_name + ' not exists in DB ' + dbname;
console.log(message);				
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				}
			}
	 
			request.onsuccess = function(e) {
console.log("Success!");
//console.dir(e);
				db = e.target.result;
				var message = "onsuccess, db.version = " + db.version, db;
				log.innerHTML += "<span class='text-success'>" + message + "</span>";
console.log(message);				
				document.getElementById("current-version").innerHTML = db.version;
			}
	 
			request.onerror = function(e) {
				var message = "error " + e.target.error.name+", "+ e.target.error.message;
				log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.log(message);				
console.dir(db);
			}
		}//end process
		
}//end delete_store()

function clear_store( dbname, store_name ){
console.dir(db);
	var request = indexedDB.open( dbname );
	request.onsuccess = function(e) {
//console.log("Success!");
//console.dir(e);
		db = e.target.result;
		var params = {
			"action":"clear_store",
			"store_name": store_name
			};
		run_transaction( params );
	}
	
	request.onerror = function(e) {
		var message = "clear_store(), error " + e.target.error.name+", "+ e.target.error.message;
console.log(message);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
console.dir(db);
	}
}//end clear_store()

function run_transaction( params ){

	var action = params["action"];
	var store_name = params["store_name"];
	if( !db.objectStoreNames.contains( store_name ) ){
var message = store_name + ' not exists in DB ' + dbname;
console.log(message);				
log.innerHTML += "<p class='text-danger'>" + message + "</p>";
		return false;
	}
	
	var type = "readwrite";
	if( action === "get_value"){
		var type = "readonly";
	}
	
	var transaction = db.transaction([store_name], type );
	transaction.oncomplete = function(event) {
		var message = "transaction.oncomplete";
console.log(message, event);				
		log.innerHTML += "<p class='text-success'>" + message + "</p>";
	};
	transaction.onerror = function(event) {
		console.log("transaction.onerror");
		var message = "transaction.onerror";
console.log(message, event);				
		log.innerHTML += "<p class='text-danger'>" + message + "</p>";
	};  

	switch ( action ){
	
		case 'add_value':
			var value = params["value"];
			var key = params["key"];
			var store = transaction.objectStore(store_name);
console.log(store);

			if(!key){
				var request = store.add( value );
			} else {
				//var key = 1;
				//if store autoIncrement is false/true
				var request = store.add( value, key );
			}
			
			request.onerror = function(e) {
				var message = "error add value,  " + e.target.error.name;
	console.log(message);				
				log.innerHTML += "<p class='text-danger'>" + message + "</p>";
			}
			request.onsuccess = function(e) {
				var message = "success add value";
	console.log(message, e);				
				log.innerHTML += "<p class='text-success'>" + message + "</p>";
			}
			//store.put( "3333333", 1);
		break;
		
		case 'get_record':
			var key = params["key"];
			if(!key){
				var message = "error, empty key (required).... " + key;
console.log(message);
				log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}
			
			var store = transaction.objectStore(store_name);
			var request = store.get( key );
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
/*
				if(result) {
					var s = "&lt;h2>Key "+key+"&lt;/h2>&lt;p>";
					for(var field in result) {
						s+= field+"="+result[field]+"&lt;br/>";
					}
					document.querySelector("#result").innerHTML = s;
				} else {
					document.querySelector("#result").innerHTML = "&lt;h2>No match&lt;/h2>";
				} 				
*/				
			}
		break;
		
		case 'delete_record':
			var key = params["key"];
			if(!key){
				var message = "error, empty key (required).... " + key;
console.log(message);
				log.innerHTML += "<p class='text-danger'>" + message + "</p>";
				return false;
			}
			
			var store = transaction.objectStore(store_name);
			var request = store.delete( key );
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
			var store = transaction.objectStore(store_name);
			var request = store.clear();
			request.onerror = function(e) {
				var message = "error clear store, " + e.target.error.name;
console.log(message, e);				
				log.innerHTML += "<p class='text-danger'>" + message + "</p>";
			};
			request.onsuccess = function(e) {
			var message = "success clear " + store_name;
console.log(message, e);				
			log.innerHTML += "<p class='text-success'>" + message + "</p>";
			};
		break;
	}//end switch
	
}//end run_transaction()
