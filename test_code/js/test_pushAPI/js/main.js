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
					var notification = new Notification("Hi there!");
// var img = 'favicon.ico';
// var text = 'HEY! Your task "' + title + '" is now overdue.';
// var notification = new Notification('To do list', { body: text, icon: img });					
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