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
//console.log("onLoad", e);

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
//console.log("function runApp()");
	_vars["inputKey"] = func.getById("input-key");
	_vars["inputVal"] = func.getById("input-value");
	
	$("#db-name").val( _vars["config"]["dbName"] );
	
	defineEvents();
}//end runApp()

/*
$(document).ready(function(){
console.log("Ready!", arguments);

	// $(".btn-test").on("click", function(e){
		// e.preventDefault();	
		// var GET = parseGetParams(e.target.href);
		// var nameTestFunc = GET["func"];
// //console.log(nameTestFunc, typeof nameTestFunc);
// //console.log( window[nameTestFunc], typeof window[nameTestFunc]);
		// window[nameTestFunc]();
	// });//end event
	
});//end ready
*/

/*	
window.onload = function(){

	
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

			// localforage.length(function(err, numberOfKeys) {
// console.log('localforage number of keys - ' + numberOfKeys);
// console.dir(err);
			// });
			
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

function defineEvents(){
	
	$("#btn-clear-log").on("click", function(e){
		e.preventDefault();
		$("#log").html("");
	});//end event
	

//-------------------------------------	
	document.getElementById("btn-add-localstorage").onclick = function(){
		try {
			localStorage.setItem("a", 1);
			localStorage.setItem("b", 2);
			localStorage["c"] = 3;
		} catch (e) {
			if (e.description == 'QUOTA_EXCEEDED_ERR') {
				func.log('localStorage: QUOTA_EXCEEDED_ERR');
			} else {
				func.log('localStorage: undefined error');
			}
		}
console.log(window.localStorage);
		document.getElementById("btn-list-localstorage").click();
	}//end event
	
//-------------------------------------	
	document.getElementById("btn-clear-localstorage").onclick = function(){
		localStorage.clear();
console.log(window.localStorage);
		document.getElementById("btn-list-localstorage").click();
	}//end event
	
//-------------------------------------	
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
		
		func.log("");
		func.log(out);		
	}//end event
	
//==================================

//-------------------------------------	
	document.getElementById("btn-localforage-keys").onclick = function(){
		// An array of all the key names.
		localforage.keys( function(err, keys) {
console.log(keys);

			out = "<ol>";
			for(var n = 0; n < keys.length; n++){
				out += "<li>";
				out += "key: " + keys[n];
				out += "</li>";
			}
			out += "</ol>";
			
			func.log( out );
		});
	}//end event

//-------------------------------------	
	document.getElementById("localforage-key").onclick = function(){
//Get the name of a key based on its ID.	
		//var keyIndex = parseInt( input_key.value );
		var keyIndex = _vars["inputKey"].value;
//console.log(keyIndex);	
		localforage.key( keyIndex, function(err, keyName) {
console.log(keyName);
			out = "<p>keyName " + keyName + "</p>";
			func.log( out );
		});
	}//end event
	
//-------------------------------------	
	document.getElementById("localforage-set").onclick = function(){
		var key = _vars["inputKey"].value;
		var value = _vars["inputVal"].value;
		
		var out = "";
        localforage.setItem(key, value, function() {
			_vars["logMsg"] = "Saved key " + key + ", value: " + value;
console.log(_vars["logMsg"]);
			out = "<p>"+_vars["logMsg"]+"</p>";
			func.log( out );
		});
	}//end event

//-------------------------------------
	document.getElementById("btn-localforage-get").onclick = function(){
		var key = _vars["inputKey"].value;
		
		var out = "";
		localforage.getItem(key, function(err, readValue) {
			_vars["logMsg"] = "Read key " + key ;
console.log( _vars["logMsg"] + ", value: ", readValue);
			out = "<p>"+ _vars["logMsg"] +"</p>";
			func.log(out);
		});
	}//end event

//-------------------------------------
	document.getElementById("localforage-remove").onclick = function(){
		var key = _vars["inputKey"].value;
		var out = "";
        localforage.removeItem(key, function(err) {
			_vars["logMsg"] = "Remove key " + key ;
console.log(_vars["logMsg"]);
console.dir(err);
			out = "<p>"+ _vars["logMsg"] +"</p>";
			func.log(out);
		});
	}//end event

//-------------------------------------
	document.getElementById("localforage-clear").onclick = function(){
		var out = "";
		localforage.clear(function(err) {
			_vars["logMsg"] = "Clear storage " + localforage._config.name ;
console.log( _vars["logMsg"] );
console.dir(err);
			out = "<p>"+ _vars["logMsg"] +"</p>";
			func.log(out);
		});
		
	}//end event

}//end defineEvents()
