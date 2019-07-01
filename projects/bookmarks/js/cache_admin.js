var support=false;
var cacheSupport=false;
var swSupport=false;

var logMsg;
logMsg = navigator.userAgent;
_alert(logMsg, "info");

//--------------------------
logMsg = "navigator.onLine: " + navigator.onLine;
if ( navigator.onLine ) {
	_alert(logMsg, "success");
} else {
	_alert(logMsg, "danger");
}
//--------------------------

var test =  typeof window.Promise !== "undefined";
logMsg = "window.Promise support: " + test;
if( test ){
	_alert(logMsg, "success");
} else {
	_alert(logMsg, "error");
}

test =  "caches" in window;
logMsg = "CacheStorage API, window.caches support: " + test;
if (test) {
	cacheSupport=true;
	_alert(logMsg, "success");
} else {
	_alert(logMsg, "error");
}

test = "serviceWorker" in navigator;
logMsg = "navigator.serviceWorker support: " + test;
if (test) {
	swSupport=true;
	_alert(logMsg, "success");
} else {
	_alert(logMsg, "error");
}

if( cacheSupport && swSupport){
	support = true;
}

if( window.location.protocol !== "https:"){
	logMsg = "error,  serviceWorker requires 'https:' protocol....";
	logMsg += "but used: " + window.location.protocol;
	_alert(logMsg, "error");
	support = false;
}
//console.log(support);

if( support ){
	//registerServiceWorker();
	
	var field_swUrl = document.querySelector("#field-sw-url");
	var btn_swList = document.querySelector("#btn-sw-list");
	var btn_swUnReg = document.querySelector("#btn-sw-unregister");
	var btn_swUpd = document.querySelector("#btn-sw-update");

	defineEvents();
}


function registerServiceWorker() {
	
	logMsg = "-- navigator.serviceWorker registration in progress.";
	_alert(logMsg, "info");
	
	window.addEventListener('load', function() {
		navigator.serviceWorker.register("sw.js").then(function(reg) {
			logMsg = "-- navigator.serviceWorker registration succeeded. Scope is " + reg.scope;
_alert(logMsg, "success");
			
			if(reg.installing) {
logMsg="Service worker installing";
_alert( logMsg, "info" );
			}
			if(reg.waiting) {
logMsg="Service worker waiting";
_alert( logMsg, "info" );
			}
			if(reg.active) {
logMsg="Service worker active";
_alert( logMsg, "info" );
			}
			
			support = true;
			_getListCaches();
		}, 

		function(err) {
logMsg="ServiceWorker registration failed";
_alert( logMsg, "error" );
console.log(err);
		})
		
		.catch( function(error) {
logMsg = "Registration failed."
_alert(logMsg, "error");
console.log(error);
		});
	 
	});//end event

}//end registerServiceWorker()

function defineEvents(){

	window.addEventListener("offline", function(e) {
		logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(logMsg, "danger");
	});
	window.addEventListener("online", function(e) {
		logMsg = "navigator.onLine: " + navigator.onLine;
		_alert(logMsg, "success");
	});

	var btn_clear_log = document.querySelector("#btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};
	
	var cacheNameField = document.querySelector("#cache-name");
	var cacheKeyField = document.querySelector("#cache-key");
	
	var btn_list_cache_keys = document.querySelector("#btn-list-cache-keys");
	btn_list_cache_keys.onclick = function(e){
//console.log(e);
		if(!support){
			return false;
		}
		
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
logMsg="<b>Object cache name</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}

		caches.has( cacheName ).then(function(res){
//console.log(res);	
			if( !res){
logMsg="Cache object " +cacheName+ " not found....";
_alert( logMsg, "warning" );
				return false;
			} else {
				_getKeys( cacheName );
			}
		});
	}//end event

	var btn_list_caches = document.querySelector("#btn-list-caches");
	btn_list_caches.onclick = function(e){
		_getListCaches();
	}//end event

	var btn_delete_cache = document.querySelector("#btn-delete-cache");
	btn_delete_cache.onclick = function(e){
		if(!support){
			return false;
		}
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
logMsg="<b>Object cache name</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}
		caches.delete( cacheName ).then( function( res ){
//console.log(res);
			if(res){
logMsg="Cache object " +cacheName+ " was removed....";
_alert( logMsg, "success" );
				_getListCaches();
			} else {
logMsg="Cache object " +cacheName+ " not found....";
_alert( logMsg, "warning" );
			}
		},
		function(err) {
console.log(err);
		});

	}//end event


	var btn_delete_key = document.querySelector("#btn-delete-key");
	btn_delete_key.onclick = function(e){
		if(!support){
			return false;
		}
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
logMsg="<b>Object cache name</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}
		
		//var cacheKey = "css/bootstrap335.min.css";
		var cacheKey = cacheKeyField.value;
//console.log(cacheKey);
		if( !cacheKey || cacheKey.length===0 ){
logMsg="<b>cache key</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}

		caches.open( cacheName ).then(function( cache ){
			cache.delete( cacheKey ).then(function( res ){
				if(res){
logMsg=cacheKey + " was removed....";
_alert( logMsg, "success" );
				} else {
logMsg=cacheKey + " not found....";
_alert( logMsg, "warning" );
				}
				
			});
		});
	}//end event


	var btn_match_key = document.querySelector("#btn-match-key");
	btn_match_key.onclick = function(e){
		if(!support){
			return false;
		}
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
logMsg="<b>Object cache name</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}
		
		var cacheKey = cacheKeyField.value;
//console.log(cacheKey);
		if( !cacheKey || cacheKey.length===0 ){
logMsg="<b>cache key</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}

		caches.open( cacheName ).then(function( cache ){
			cache.match( cacheKey ).then(function( response ){
console.log(response);				
				if( response ){
logMsg=cacheKey + " was cached...";
_alert( logMsg, "success" );
				} else {
logMsg=cacheKey + " not found in cache....";
_alert( logMsg, "warning" );
				}
				
			});
		});
	}//end event


	var btn_addKey = document.querySelector("#btn-add-key");
	btn_addKey.onclick = function(e){
		if(!support){
			return false;
		}
		var cacheName = cacheNameField.value;
//console.log(cacheName);
		if( !cacheName || cacheName.length===0 ){
logMsg="<b>Object cache name</b> is empty....";
_alert( logMsg, "warning" );
			return false;
		}
		
		var url = cacheKeyField.value;
//console.log(cacheKey);
		if( !url || url.length===0 ){
logMsg="<b>URL</b> is empty (field cache key)....";
_alert( logMsg, "warning" );
			return false;
		}

		caches.open( cacheName ).then(function( cache ){
			cache.add( url ).then(function( response ) {//https://developer.mozilla.org/ru/docs/Web/API/Cache/add			
console.log( response );
logMsg="<b>URL " +url+ "</b> loaded and added to cache " +cacheName;
_alert( logMsg, "success" );
			});
		});
	}//end event



	btn_swList.onclick = function(e){
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
console.log( registrations );
			_listSW( registrations );
		})
	}//end event

	btn_swUnReg.onclick = function(e){
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
console.log( registrations );

			var url = field_swUrl.value;
			if( !url || url.length===0 ){
logMsg="<b>service worker URL</b> is empty...";
_alert( logMsg, "warning" );
				return false;
			}

			var result = false;
			//for(let registration of registrations) {
			for(var n=0; n < registrations.length; n++) {
				 var registration = registrations[n];
				
//console.log( registration.active.scriptURL, url, registration.active.scriptURL === url);
				if( registration.active.scriptURL === url ){
					result = true;
					registration.unregister().then( function(res) {
console.log(res);						
						if( res){
logMsg="service worker by URL:<b> "+registration.active.scriptURL+"</b> was unregister...";
_alert( logMsg, "success" );
						} else {
logMsg="service worker by URL:<b> "+registration.active.scriptURL+"</b> was NOT unregister...";
_alert( logMsg, "error" );
						}
						
					});
					break;
				}
			}//next
			
			if(!result){
logMsg="service worker by URL:<b>"+url+"</b> NOT found...";
_alert( logMsg, "error" );
			}

		});
	}//end event

	btn_swUpd.onclick = function(e){
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
console.log( registrations );
			var url = field_swUrl.value;
			if( !url || url.length===0 ){
logMsg="<b>service worker URL</b> is empty...";
_alert( logMsg, "warning" );
				return false;
			}

			var result = false;
			//for(let registration of registrations) {
			for(var n=0; n < registrations.length; n++) {
				 var registration = registrations[n];
				
//console.log( registration.active.scriptURL, url, registration.active.scriptURL === url);
				if( registration.active.scriptURL === url ){
					result = true;
					registration.update().then( function(res) {
console.log(res);						
logMsg="service worker by URL:<b> "+registration.active.scriptURL+"</b> was updated...";
_alert( logMsg, "success" );
					});
					break;
				}
			}//next
			
			if(!result){
logMsg="service worker by URL:<b>"+url+"</b> NOT found...";
_alert( logMsg, "error" );
			}

		})
	}//end event


}//end defineEvents()

function _getListCaches(){
		if(!support){
			return false;
		}

		caches.keys().then( function(keyList) {
console.log( keyList);
			if( keyList.length > 0){
_log("<h4>List cache objects</h4>");
				var html = "<ul class='list-unstyled'>{{list}}</ul>";
				var listHtml = "";
				for( var n = 0; n < keyList.length; n++){
					listHtml += "<li class='list-group-item'>" + keyList[n] + "</li>";					
				}//next
				html = html.replace("{{list}}", listHtml);
_log(html);

				var cacheNameField = document.querySelector("#cache-name");
				cacheNameField.value = keyList[0];

			} else {
logMsg="not found cache objects...";
_alert( logMsg, "warning" );
			}
			
		});
}//end _getListCaches()		

function _getKeys( cacheName ){
	caches.open( cacheName ).then( function(cache) {
//console.log("TEST:", cache);	
		cache.keys().then( function(keyList) {
				if( keyList.length > 0){
console.log("CACHE key list:", keyList);
_log("<h4>Key list, cache object <b>"+cacheName+"</b></h4>");
						var html = "<ol class='list-unstyled'>{{list}}</ol>";
						var listHtml = "";
						for( var n = 0; n < keyList.length; n++){
							listHtml += "<li class='list-group-item'>" + keyList[n]["url"] + "</li>";
						}//next
						html = html.replace("{{list}}", listHtml);
_log(html);
				} else {
logMsg="no keys found in object cache " + cacheName;
_alert( logMsg, "warning" );
				}
			});
	});
}//end _getKeys()


function _listSW( registrations ){
_log("<h4>Servise workers list</h4>");
	var html = "<div class='panel panel-primary'>{{list}}</div>";
	var listHtml = "";
	 for(var n=0; n < registrations.length; n++) {
		 var registration = registrations[n];
		var _scopeHtml = "<p><small>scope:</small> " + registration.scope + "</p>";
		var _stateHtml = "<p><small>state:</small> " + registration.active.state + "</p>";
		var _urlHtml = "<p><small>scriptURL:</small> " + registration.active.scriptURL + "</p>";
		listHtml += "<div class='panel-body'>" + _scopeHtml + _stateHtml + _urlHtml+"</div>";
	}//next
	html = html.replace("{{list}}", listHtml);
_log(html);
	
}//end _listSW()

