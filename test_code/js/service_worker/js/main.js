var func = sharedFunc();
//console.log("func:", func);

var support=false;

var logMsg;
logMsg = navigator.userAgent;
func.logAlert(logMsg, "info");

var test =  typeof window.Promise !== "undefined";
logMsg = "Promise support:" + test;
if( test ){
	func.logAlert(logMsg, "success");
} else {
	func.logAlert(logMsg, "error");
}

if( window.location.protocol !== "https:"){
	logMsg = "error,  serviceWorker requires 'https:' protocol....";
	logMsg += "but used: " + window.location.protocol;
	func.logAlert(logMsg, "error");
}

registerServiceWorker();
defineEvents();

function registerServiceWorker() {
	var test = "serviceWorker" in navigator;
//console.log(test);	
	if (!test) {
		logMsg = "CLIENT: service worker is not supported."
		func.logAlert(logMsg, "error");
		return false;
	}
	
	logMsg = "CLIENT: service worker registration in progress.";
	func.logAlert(logMsg, "info");
	
	window.addEventListener('load', function() {
		navigator.serviceWorker.register("sw.js").then(function(reg) {
			logMsg = "Registration succeeded. Scope is " + reg.scope;
func.logAlert(logMsg, "success");
			
			if(reg.installing) {
logMsg="Service worker installing";
func.logAlert( logMsg, "info" );
			}
			if(reg.waiting) {
logMsg="Service worker waiting";
func.logAlert( logMsg, "info" );
			}
			if(reg.active) {
logMsg="Service worker active";
func.logAlert( logMsg, "info" );
			}
			
			support = true;
		}, 

		function(err) {
logMsg="ServiceWorker registration failed";
func.logAlert( logMsg, "error" );
console.log(err);
		})
		
		.catch( function(error) {
logMsg = "Registration failed."
func.logAlert(logMsg, "error");
console.log(error);
		});
	 
	});//end event

}//end registerServiceWorker()

function defineEvents(){

	var btn_clear_log = document.querySelector("#btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};
	
	var cacheNameField = document.querySelector("#cache-name");
	
	var btn_list_cache_keys = document.querySelector("#btn-list-cache-keys");
	btn_list_cache_keys.onclick = function(e){
//console.log(e);
		if(!support){
			return false;
		}
		
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
			return false;
		}

		caches.open( cacheName ).then( function(cache) {
console.log("TEST:", cache);	
			cache.keys().then( function(keyList) {
console.log("CACHE key list:", keyList);
				for( var n = 0; n < keyList.length; n++){
func.logAlert( keyList[n]["url"], "info");					
				}//next
				
			});
	
		});
		
	}//end event

	var btn_list_caches = document.querySelector("#btn-list-caches");
	btn_list_caches.onclick = function(e){
//console.log(e);
		if(!support){
			return false;
		}

		caches.keys().then( function(keyList) {
console.log("CACHE key list:", keyList);
func.log("");					
			for( var n = 0; n < keyList.length; n++){
func.logAlert( keyList[n], "info");					
			}//next
				
					// return Promise.all( keyList.map( function (key) {
		// console.log(key);
								// //return caches.delete(key);
						// })
					// );
		});

	}//end event
	
}//end defineEvents()