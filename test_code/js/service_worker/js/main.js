	var func = sharedFunc();
//console.log("func:", func);

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
	
	//test = 'serviceWorker' in navigator;
	//logMsg = "serviceWorker support: " + test;
	//if( test ){
		//func.logAlert(logMsg, "success");
		registerServiceWorker();
	//} else {
		//func.logAlert(logMsg, "error");
	//}

	if( window.location.protocol !== "https:"){
		logMsg = "error,  serviceWorker requires 'https:' protocol....";
		logMsg += "but used: " + window.location.protocol;
		func.logAlert(logMsg, "error");
	}
	
	
function registerServiceWorker() {
	var test = "serviceWorker" in navigator;
console.log(test);	
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
//-----------------------------
/*
caches.open( "static-cache-v1" ).then( function(cache) {
console.log("TEST:", cache);	

	cache.keys().then( function(keyList) {
console.log("CACHE key list:", keyList);
	});
	
});
*/

/*
caches.keys().then( function(keyList) {
console.log("CACHE key list:", keyList);

			return Promise.all( keyList.map( function (key) {
console.log(key);
						//return caches.delete(key);
				})
			);
	
});
*/				
//----------------------------
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