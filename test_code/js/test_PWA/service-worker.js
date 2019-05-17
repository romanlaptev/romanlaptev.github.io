"use strict";

const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
"offline.html",
"css/bootstrap335.min.css"
];

console.log('WORKER: executing.');

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
console.log("WORKER: install event in progress.", event);

	event.waitUntil(	// after install service worker open new cache
		caches.open(CACHE_NAME)
			.then(
				function(cache){// add all caching resource URLs
					var _cache = cache.addAll(FILES_TO_CACHE);
console.log("[ServiceWorker] Pre-caching offline recources", _cache);
					return _cache;
				}
			)
		);

	self.skipWaiting();

});//end event

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function(event) {
console.log("WORKER: fetch event in progress.", event.request.url);
console.log(event);


	if (event.request.mode !== "navigate") {// Not a page navigation, bail.
		return;
	}
	event.respondWith(
		fetch(evt.request)
		.catch(() => {
			return caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.match("offline.html");
			});
		})
	);

});

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

});