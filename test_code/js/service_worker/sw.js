"use strict";

const CACHE_NAME = "static-cache-v1";
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

this.addEventListener('install', function(event) {
console.log("WORKER: install event in progress.", event);

	event.waitUntil(
		caches.open( CACHE_NAME ).then(function(cache) {
		return cache.addAll( FILES_TO_CACHE );
		})
	);
	
});//end event

this.addEventListener("fetch", function(event) {
console.log("WORKER: fetch event in progress.", event.request.url);
console.log(event, event.request.mode);
	
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
		fetch(event.request)
		.catch(() => {
			return caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.match("offline.html");
			});
		})

	);
	
});//end event


this.addEventListener("activate", function(event) {
console.log("WORKER: activate event in progress.", event);
});//end event