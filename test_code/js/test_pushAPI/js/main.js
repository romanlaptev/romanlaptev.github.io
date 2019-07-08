var func = sharedFunc();
//console.log("func:", func);

var support = false;
var notificationSupport=false;

var logMsg;
logMsg = navigator.userAgent;
func.logAlert(logMsg, "info");

var test =  typeof window.Notification !== "undefined";
logMsg = "window.Notification support: " + test;
if( test ){
	func.logAlert(logMsg, "success");
	notificationSupport=true;
	support = true;
} else {
	func.logAlert(logMsg, "error");
}

if( window.location.protocol !== "https:"){
	logMsg = "error,  serviceWorker requires 'https:' protocol....";
	logMsg += "but used: " + window.location.protocol;
	func.logAlert(logMsg, "error");
	support = false;
}

var btn_clear_log = document.querySelector("#btn-clear-log");
btn_clear_log.onclick = function(){
	log.innerHTML = "";
};
	
if( support ){
	defineEvents();
}

function defineEvents(){

	var btn_notify_req = document.querySelector("#btn-notification-request");
	btn_notify_req.onclick = function(){
		
		//Notification.requestPermission().then(function(result) {
//console.log(result);
		//});
		
		Notification.requestPermission(function(result) {
console.log(result);
			switch( result ){
				
				case "granted":
logMsg = "The user has explicitly declined permission to show notifications.";
func.logAlert(logMsg, "success");
					//var notification = new Notification("Hi there!");
					var img = 'favicon.ico';
					var timeMs = 18000;
					var text = "This notification will be closed after "+ timeMs / 1000 +" sec....";
					var notification = new Notification("Title!", { body: text, icon: img });	
					
					notification.onshow = function() {
logMsg = "notification.onshow....";
func.logAlert(logMsg, "info");
					};
					
					notification.onclose = function() {
logMsg = "notification.onclose....";
func.logAlert(logMsg, "info");
					};
					
					notification.onerror = function() {
consol.log(arguments);						
logMsg = "notification.onerror....";
func.logAlert(logMsg, "error");
					};

					notification.onclick = function(event) {
						event.preventDefault(); // prevent the browser from focusing the Notification's tab
						window.open('http://www.mozilla.org', '_blank');
logMsg = "notification.onclick....";
func.logAlert(logMsg, "info");
					};
					
					setTimeout( notification.close.bind(notification), timeMs );
					
				break;
				
				case "denied":
logMsg = "The user has granted permission to display notifications, after having been asked previously.";
func.logAlert(logMsg, "warning");
				break;
				
				case "default":
logMsg = "The user hasn't been asked for permission yet, so notifications won't be displayed....";
func.logAlert(logMsg, "info");
				break;
				
				default:
				break;
			}//end switch


		});
		
	};//end event
	
}//end defineEvents()