"use strict";


//self.addEventListener(......
this.addEventListener("install", function(event) {
console.log("WORKER: install event in progress.", event);
});//end event

//self.addEventListener(......
this.addEventListener("fetch", function(event) {
console.log("WORKER: fetch event in progress.", event.request.url);
//console.log(event);
//console.log("-- event.request:", event.request);
//console.log("-- event.request.mode:", event.request.mode);
	
});//end event


this.addEventListener("activate", function(event) {
console.log("WORKER: activate event in progress.", event);
});//end event

/*
self.addEventListener("push", function(event) {
console.log('Получено push-сообщение', event);

	var title = "title: it works!!!";
	var body = "server notification received";
	//var icon = '/icon-192x192.png';
	var tag = 'simple-push-demo-notification-tag';

	event.waitUntil( 
		self.registration.showNotification( title, { 
			body: body,
			//icon: icon,
			tag: tag
		})
	);
  
});//end event
*/