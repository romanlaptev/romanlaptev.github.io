"use strict";

const CACHE_NAME = "cache-and-update-v1";

const FILES_TO_CACHE = [
//"offline.html",
//"css/bootstrap337.min.css"
"db/bookmarks.json"
];

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
console.log("WORKER: install event in progress.", event);

	event.waitUntil(	// after install service worker open new cache
		caches.open(CACHE_NAME).then( function(cache){// add all caching resource URLs
					cache.addAll( FILES_TO_CACHE ).then(function(){
console.log("[ServiceWorker] Pre-caching offline recources");
						self.skipWaiting();//activate SW right now.....
						//return _cache;
					});
				})
		);

});//end event

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function(event) {

console.log("WORKER: fetch event in progress.", event.request.url);
console.log(event, event.request.mode);

	if (event.request.mode !== "navigate") {// Not a page navigation, bail.
		return;
	}
/*	
	event.respondWith(
		fetch(event.request)
		.catch(() => {
			return caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.match("offline.html");
			});
		})
	);
*/
	event.respondWith( 
		caches.match( event.request )
			.then(function(cachedResponse){// ищем запрашиваемый ресурс в хранилище кэша

			if (cachedResponse) {// выдаём кэш, если он есть
				var lastModified = new Date( cachedResponse.headers.get("last-modified") );
console.log("-- cachedResponse:", cachedResponse.url, lastModified);
				return cachedResponse;
			}

				// иначе запрашиваем из сети как обычно
				return fetch(event.request).catch(function(res){
console.log( res );
				});

			})
	);

});//end event

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function(event) {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
console.log("WORKER: activate event in progress.", event);
/*
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all( keyList.map(
				(key) => {
					if (key !== CACHE_NAME) {
	console.log("[ServiceWorker] Removing old cache key ", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	self.clients.claim();
*/
});