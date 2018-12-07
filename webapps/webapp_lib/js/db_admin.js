//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
	var func = sharedFunc();
console.log("func:", func);
		
$(document).ready(function(){
console.log("Ready!", arguments);

	$("#btn-clear-log").on("click", function(e){
		e.preventDefault();
		$("#log").html("");
	});//end event
	
	$(".btn-test").on("click", function(e){
		e.preventDefault();	
		var GET = parseGetParams(e.target.href);
		var nameTestFunc = GET["func"];
//console.log(nameTestFunc, typeof nameTestFunc);
//console.log( window[nameTestFunc], typeof window[nameTestFunc]);
		window[nameTestFunc]();
	});//end event
	
});//end ready


	function test_storage() {
	  try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
console.dir(e);	
		return false;
	  }
	}

	// Force localStorage to be the backend driver.
	//localforage.setDriver(localforage.LOCALSTORAGE);

	// Supply a list of drivers, in order of preference.
	//localforage.setDriver([localforage.WEBSQL, localforage.INDEXEDDB]);

	localforage.ready(function() {
		console.log('localForage ready', arguments);
		console.log('localforage.driver():', localforage.driver());

	});
	
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
