//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);

var _vars = {
	"logMsg": "",
	"config": {
		"useCache": true,
		"dbName": "db1"
	},
	"tests": {
		"indexedDB": false,
		"WebSQL": false,
		"localStorage": false,
		"template": "<li>\
<b>{{name}}</b> : <span class='text-info text-uppercase'><b>{{result}}</b></span>\
<p><small>{{msg}}</small></p>\
</li>	"
	}
};
console.log("_vars:", _vars);

var res = initCache();
window.onload = function(e){
console.log("onLoad", e);
//---------------------------------
		var ua = document.getElementById("ua");
		var tpl = ua.innerHTML;
		var html = tpl
		.replace("{{userAgent}}", navigator.userAgent);
		ua.innerHTML = html;

		var tests_out = document.getElementById("tests-out");
		tests_out.innerHTML = _vars["tests"]["html"];
//--------------------------------------

	if(res){
			runApp();
	} else {
	_vars["logMsg"] = "error, not support web-storages...";
	 func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
	//console.log( _vars["logMsg"] );
	}
};//end window.load	

function runApp(){
console.log("function runApp()");
}//end runApp()

$(document).ready(function(){
console.log("Ready!", arguments);

	// $("#btn-clear-log").on("click", function(e){
		// e.preventDefault();
		// $("#log").html("");
	// });//end event
	
	// $(".btn-test").on("click", function(e){
		// e.preventDefault();	
		// var GET = parseGetParams(e.target.href);
		// var nameTestFunc = GET["func"];
// //console.log(nameTestFunc, typeof nameTestFunc);
// //console.log( window[nameTestFunc], typeof window[nameTestFunc]);
		// window[nameTestFunc]();
	// });//end event
	
});//end ready


/*	
window.onload = function(){

	if( document.querySelector)
	{
		var list = document.querySelector("#list");
		var input_key = document.querySelector("#key");
		var input_value = document.querySelector("#value");
	}
	else
	{
		var list = document.getElementById("list");
		var input_key = document.getElementById("key");
		var input_value = document.getElementById("value");
	}

	localforage.length(function(err, numberOfKeys) {
console.log(numberOfKeys);
console.dir(err);
		out = 'length of the database - ' + numberOfKeys;
		list.innerHTML = out;
	});
	
	document.getElementById("localstorage-btn1").onclick = function(){
		var test = test_storage();
		if (!test)
		{
alert("Your browser does not have support localStorage");
		}
		else
		{
//alert("LocalStorage is supported");
			localStorage.clear();
console.log(window.localStorage);
			document.getElementById("btn-list-localstorage").click();
		}
	}
	
	document.getElementById("localstorage-btn2").onclick = function(){
		var test = test_storage();
		if (!test) {
alert("Your browser does not have support localStorage");
		} else {
			
			try {
				localStorage.setItem("a", 1);
				localStorage.setItem("b", 2);
				localStorage["c"] = 3;
			} catch (e) {
				if (e.description == 'QUOTA_EXCEEDED_ERR') {
					alert('localStorage: QUOTA_EXCEEDED_ERR');
				} else {
					alert('localStorage: undefined error');
				}
			}
			
console.log(window.localStorage);
			document.getElementById("btn-list-localstorage").click();
		}
	}//end event
	
	document.getElementById("btn-list-localstorage").onclick = function(){
		var out = "";
		
//console.log(localStorage.remainingSpace);		
		if( localStorage.remainingSpace ){
			out += "remainingSpace = " + localStorage.remainingSpace + " bytes<br>";
		} else {
			out += "max size: (1024 * 1024 * 5) bytes <br>";
		}
		out += "data length = " + localStorage.length + "<br>";

		for(var item in localStorage){
			out += "<li>";
			out += item + " = " + localStorage[item];
			out += "</li>";
		}
		//list.innerHTML = out;
		func.log(out);		
		
	}//end event

	document.getElementById("localforage-set").onclick = function(){
		var key = input_key.value;
		var value = input_value.value;
		var out = "";
        localforage.setItem(key, value, function() {
console.log('Saved: ' + value);
			out = 'Saved: ' + value;
			list.innerHTML = out;
         });
	}//end event

	document.getElementById("btn-localforage-get").onclick = function(){
		var key = input_key.value;
		var out = "";
        localforage.getItem(key, function(err, readValue) {
console.log('Read: ', readValue);
			out = 'Read ' + key + " = " + readValue;
			//list.innerHTML = out;
			func.log(out);
         });
	}//end event
	
	document.getElementById("localforage-remove").onclick = function(){
		var key = input_key.value;
		var out = "";
        localforage.removeItem(key, function(err) {
console.log("Remove " +key);
console.dir(err);
			out = 'Remove ' + key;
			list.innerHTML = out;
         });
	}//end event
	
	document.getElementById("localforage-clear").onclick = function(){
		var out = "";
		localforage.clear(function(err) {
console.log('Clear storage');
console.dir(err);
			out = 'Clear storage ';
			list.innerHTML = out;
		});
	}//end event

	document.getElementById("localforage-key").onclick = function(){
//Get the name of a key based on its ID.	
		var keyIndex = parseInt( input_key.value );
		localforage.key( keyIndex, function(err, keyName) {
console.log(keyName);
			out = 'keyName ' + keyName;
			list.innerHTML = out;
		});
		 
	}//end event
	
	document.getElementById("btn-localforage-keys").onclick = function(){
		// An array of all the key names.
		//var keyIndex = input_key.value;
		localforage.keys( function(err, keys) {
console.log(keys);
			out = keys;
			//list.innerHTML = out;
			func.log( out );
		});
	}//end event
	

	
	document.getElementById("localforage-iterate").onclick = function(){
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
		var out = "";
		localforage.iterate(function(value, key, iterationNumber) {
console.log([key, value]);
			out += "<p>" + key + ' - ' + value + "</p>";
		}, function(err) {
			if (!err) {
console.log('Iteration has completed');
				out += '<p>Iteration has completed</p>';
			}
			list.innerHTML = out;
		});
		
	}//end event
	

};//end window.load	
*/

function initCache(){
	
	runTests();

	if ( !_vars["tests"]["localStorage"] &&
			!_vars["tests"]["WebSQL"] &&
				!_vars["tests"]["indexedDB"]){
		_vars["config"]["useCache"] = false;
		return false;
	}

//-----------------	
	var _driver = [];
	if( _vars["tests"]["indexedDB"] ){
		_driver.push(localforage.INDEXEDDB);
	}
	
	if( _vars["tests"]["WebSQL"] ){
		_driver.push(localforage.WEBSQL);
	}
	
	if( _vars["tests"]["localStorage"] ){
		_driver.push(localforage.LOCALSTORAGE);
	}
	
			localforage.config({
				// driver: [localforage.INDEXEDDB,
						 // localforage.WEBSQL,
						 // localforage.LOCALSTORAGE],

				//driver: [localforage.WEBSQL],
				//driver: [localforage.LOCALSTORAGE],
				driver: _driver,
				name: _vars["config"]["dbName"]
			});

			localforage.ready(function() {
console.log('localForage ready');
console.log('localforage.driver():', localforage.driver());

console.log( "localforage config: ", localforage._config );
console.log( "localforage version: " + localforage._config.version );
			});

			localforage.length(function(err, numberOfKeys) {
console.log('localforage number of keys - ' + numberOfKeys);
console.dir(err);
			});
			return true;
}//end initCache()

function runTests(){

	var tests = [];

	var test = {
		"name" : "indexedDB",
		"result" : false
	};
	if (!window.indexedDB) {
		test["msg"] = "IndexedDB not supported, ";
		// test["msg"] += "<br>window.indexedDB = " + window.indexedDB;
		// test["msg"] += "<br>window.mozIndexedDB = " + window.mozIndexedDB;
		// test["msg"] += "<br>window.webkitIndexedDB = " + window.webkitIndexedDB;
		// test["msg"] += "<br>window.msIndexedDB = " + window.msIndexedDB;
	} else {
		test["result"] = true;
		// test["msg"] = "<br>window.indexedDB = " + window.indexedDB;
		// test["msg"] += "<br>window.mozIndexedDB = " + window.mozIndexedDB;
		// test["msg"] += "<br>window.webkitIndexedDB = " + window.webkitIndexedDB;
		// test["msg"] += "<br>window.msIndexedDB = " + window.msIndexedDB;
		_vars["tests"]["indexedDB"] = true;
	}
	tests.push(test);
//--------------------------------------

	var test = {
		"name" : "Web SQL database",
		"result" : false
	};
	if (window.openDatabase) {
		test["result"] = true;
		_vars["tests"]["WebSQL"] = true;
	}
	tests.push(test);
//--------------------------------------

	var test = {
		"name" : "Local storage",
		"result" : false
	};
	
	  // try {
		// return 'localStorage' in window && window['localStorage'] !== null;
	// } catch (e) {
// console.dir(e);	
	  // }
	if( window['localStorage'] ){
		test["result"] = true;
		_vars["tests"]["localStorage"] = true;
	}
	tests.push(test);
//--------------------------------------

//----------------- form html
	var test_tpl = _vars["tests"]["template"];
//console.log( test_tpl);	
	var html = "";
	for (var n = 0; n < tests.length; n++){
		if( tests[n] ){
			var msg = tests[n]["msg"];
			if(!msg){
				var msg = "";
			}
			
			html += test_tpl
			.replace("{{name}}", tests[n]["name"])
			.replace("{{result}}", tests[n]["result"])
			.replace("{{msg}}", msg);
		}
	}//next

	_vars["tests"]["html"] = html;
}//end runTests()