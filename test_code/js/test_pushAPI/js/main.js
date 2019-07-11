var func = sharedFunc();
//console.log("func:", func);

var support = false;
var notificationSupport=false;
var pushSupport=false;
var swSupport=false;

//var isPushEnabled = false;

var logMsg;
logMsg = navigator.userAgent;
func.logAlert(logMsg, "info");

//--------------------------
logMsg = "navigator.onLine: " + navigator.onLine;
if ( navigator.onLine ) {
	func.logAlert(logMsg, "success");
} else {
	func.logAlert(logMsg, "danger");
}

//--------------------------
var test =  typeof window.Notification !== "undefined";
logMsg = "window.Notification support: " + test;
if( test ){
	func.logAlert(logMsg, "success");
	notificationSupport=true;
} else {
	func.logAlert(logMsg, "error");
}

//--------------------------
var test =  typeof window.PushManager !== "undefined";
logMsg = "window.PushManager support: " + test;
if( test ){
	func.logAlert(logMsg, "success");
	pushSupport=true;
} else {
	func.logAlert(logMsg, "error");
}

//--------------------------
test = "serviceWorker" in navigator;
logMsg = "navigator.serviceWorker support: " + test;
if (test) {
	swSupport=true;
	func.logAlert(logMsg, "success");
} else {
	func.logAlert(logMsg, "error");
}


//--------------------------
if( window.location.protocol !== "https:"){
	logMsg = "error,  serviceWorker requires 'https:' protocol....";
	logMsg += "but used: " + window.location.protocol;
	func.logAlert(logMsg, "error");
} else {
	support = true;
}


defineEvents();

	

function defineEvents(){

	var btn_clear_log = document.querySelector("#btn-clear-log");
	btn_clear_log.onclick = function(){
		log.innerHTML = "";
	};

	if( !support ){
		return;
	}

	var btn_notify_req = document.querySelector("#btn-notification-request");
	btn_notify_req.onclick = function(){

	if( !notificationSupport ){
		var test =  typeof window.Notification !== "undefined";
		logMsg = "window.Notification support: " + test;
func.logAlert(logMsg, "error");
		return;
	}
		
		//Notification.requestPermission().then(function(result) {
//console.log(result);
		//});
		
		Notification.requestPermission(function(result) {
console.log(result);
console.log("Notification.permission: ", Notification.permission);

			switch( result ){
				
				case "granted":
logMsg = "The user has explicitly declined permission to show notifications.";
func.logAlert(logMsg, "success");
					//var notification = new Notification("Hi there!");
					var img = 'favicon.ico';
					var timeMs = 18000;
					var text = "This notification will be closed after "+ timeMs / 1000 +" sec....";
					var notification = new Notification("Title!", { 
						tag: "note1",
						body: text, 
						dir: "auto", 
						icon: img 
					});	
					
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


//===================================================== PUSH API
/*
		var btn_push_reg = document.querySelector("#btn-push-reg");
		btn_push_reg.onclick = function(){

		if( !swSupport ){
			var test = "serviceWorker" in navigator;
			logMsg = "navigator.serviceWorker support: " + test;
			func.logAlert(logMsg, "error");
			return;
		}
		registerServiceWorker();
	};//end event

	var btn_push_subscribe = document.querySelector("#btn-push-subscribe");
	btn_push_subscribe.onclick = function(){

		// if( !swSupport ){
			// var test = "serviceWorker" in navigator;
			// logMsg = "navigator.serviceWorker support: " + test;
			// func.logAlert(logMsg, "error");
			// return;
		// }
		if (isPushEnabled) {
			unsubscribe();
		} else {
			subscribe();
		}
		
	};//end event
*/

}//end defineEvents()


/*
function registerServiceWorker() {

	logMsg = "-- navigator.serviceWorker registration in progress.";
	func.logAlert(logMsg, "info");
	
	//window.addEventListener('load', function() {
		navigator.serviceWorker.register("sw.js").then(function(reg) {
			logMsg = "-- navigator.serviceWorker registration succeeded. Scope is " + reg.scope;
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
			
			initialiseState();
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
	 
	//});//end event

}//end registerServiceWorker()
*/

/*
//https://devhub.io/repos/eveness-web-push-api
function initialiseState() {
	// ��������� �������� ����������� ��� ������ Service Worker API
	  if ( !("showNotification" in ServiceWorkerRegistration.prototype) ) {
console.warn('����������� �� �������������� ���������.');
		return;
	}

	// ��������� �� �������� �� ������������ ����� �����������
	if( Notification.permission === "denied" ) {  
console.warn('������������ �������� ����� �����������.');  
		return;  
	}

	// ��������� ��������� Push API
	if ( !("PushManager" in window) ) {  
console.warn("Push-��������� �� �������������� ���������.");  
		return;
	}

  // ��������� ��������������� �� ��� ������-������
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
	
		// ��������� ������� ��������  
		serviceWorkerRegistration.pushManager.getSubscription().then(
			function(subscription) {  
				// ������ ���� ������ ��������
				var pushButton = document.querySelector("#btn-push-subscribe");
				pushButton.disabled = false;

				if( !subscription ) {// ���� ������������ �� ��������
					return;
				}

				// �������� ������� ������ � ����������
				sendSubscriptionToServer( subscription );

				// ������ ��������� ������
				pushButton.textContent = "unsubscribe";  
				isPushEnabled = true;  
		  })  
		.catch( function(err) {  
console.warn('������ ��� ��������� ������ � ����������.', err);
		});
	  
	});  

};//end initialiseState()
*/

/*
//https://devhub.io/repos/eveness-web-push-api
function subscribe() {
	// ��������� ������ �� ����� ������� 
	// ���������� �������� �����������
	var pushButton = document.querySelector("#btn-push-subscribe");
	pushButton.disabled = true;

	navigator.serviceWorker.ready.then( function(serviceWorkerRegistration){
		
		serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then( 
			function(subscription) {
				// �������� ������������
				isPushEnabled = true;
				pushButton.textContent = "unsubscribe";
				pushButton.disabled = false;

				// � ���� ������� ���������� �������������� �����������
				// �� ������� �������, ��������� subscription.endpoint
				return sendSubscriptionToServer( subscription );
			})  
			.catch(function(err) {  
				if (Notification.permission === "denied") {  
				  // ���� ������������ �������� ��������� �����������,
				  // �� �������� ��� �� ����� ���� ������� 
				  // � ���������� �������� ��� �����
console.warn('������������ �������� ��������� �����������');
					pushButton.disabled = true;  
				} else {  
				  // ����������� ������ ��������� �������� -
				  // ������ �����, ���������� gcm_sender_id � ������
console.error('���������� �����������, ������: ', err);
					pushButton.disabled = false;
					pushButton.textContent = "subscribe";
				}  
			});  
	});
	  
};//subscribe()
*/