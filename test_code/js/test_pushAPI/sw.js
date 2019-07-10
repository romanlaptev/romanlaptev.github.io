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