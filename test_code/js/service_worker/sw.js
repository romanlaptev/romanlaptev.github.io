"use strict";
const CACHE_NAME = "v1";
/*
const FILES_TO_CACHE = [
//"offline.html",
//"pages/",
"pages/index.html",
"pages/style.css",
"pages/app.js",
"pages/image-list.js",
"pages/star-wars-logo.jpg",
"pages/gallery/bountyHunters.jpg",
"pages/gallery/myLittleVader.jpg",
"pages/gallery/snowTroopers.jpg"
];
*/
this.addEventListener('install', function(event) {
console.log("WORKER: install event in progress.", event);
/*
	event.waitUntil(
		caches.open( CACHE_NAME ).then(function(cache) {
		return cache.addAll( FILES_TO_CACHE );
		})
	);
*/
});//end event

this.addEventListener("fetch", function(event) {
console.log("WORKER: fetch event in progress.", event.request.url);
console.log(event);
console.log("-- event.request:", event.request);
console.log("-- event.request.mode:", event.request.mode);
	
	var response;
	event.respondWith( 
/*	
		caches.match( event.request ).catch(function() {
			return fetch( event.request );
		}).then( function(r){
			response = r;
			caches.open( CACHE_NAME ).	then( function(cache){
				cache.put( event.request, response );
			});
			return response.clone();
		}).catch( function(){
			//return caches.match("offline.html");
			return fetch(event.request);			
		})
*/
/*
		fetch(event.request)
		.catch(() => {
			return caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.match("offline.html");
			});
		})
*/

//https://habr.com/ru/post/279291/
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function(cachedResponse) {
console.log("-- cachedResponse:", cachedResponse);

			// выдаём кэш, если он есть
			if (cachedResponse) {
				return cachedResponse;
			}

			// иначе запрашиваем из сети как обычно
			return fetch(event.request).catch(function(res){
console.log( res );
			});
			
		})


/*
//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#5
		caches.open(DATA_CACHE_NAME).then((cache) => {
		return fetch(evt.request)
		.then((response) => {
		// If the response was good, clone it and store it in the cache.
		if (response.status === 200) {
		cache.put(evt.request.url, response.clone());
		}
		return response;
		}).catch((err) => {
		// Network request failed, try to get it from the cache.
		return cache.match(evt.request);
		});
		})
*/	
	);
	
});//end event


this.addEventListener("activate", function(event) {
console.log("WORKER: activate event in progress.", event);
/*
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all( keyList.map(
				(key) => {
					if (key !== CACHE_NAME) {
	console.log("[ServiceWorker]  cache key: ", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
*/
});//end event