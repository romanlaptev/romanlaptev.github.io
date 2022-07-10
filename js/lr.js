/*
use module:
//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);

	var func = sharedFunc();
//console.log("func:", func);

	func.vars["logOrderBy"] = "DESC";

	func.sortRecords({
		"records" : terminNodes,
		"sortOrder": "asc", //desc
		"sortByKey": "author"
	});
*/

//(function(){
	var sharedFunc =  sharedFunc || function(){
	
		// private variables and functions
		var _vars = {
			"logOrderBy": "DESC"//"ASC"
		};//end _vars

//----------------------
		if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);

			//$(document).ready(function(){
//....
			//});//end ready
		}


//---------------------- replace console.log for old IE
//---------------------- replace console.log for mobile browsers
		if ( (!window.console ) ||
			('ontouchstart' in window) ){

			window.console = {"log" : function( msg ){
					if( typeof msg === "string"){
						msg = "<small>console.log </small>(&quot;"+ msg + "&quot;)";
					} else {
						msg = "console.log (  "+ typeof msg  + ")";
					}

					var log = _getById( "log" );
					if( log ){
						_alert( msg, "info" );
					} else {
						alert(msg);
						//document.writeln(msg);
					}
				}
			};
		}

		//_defineEvents();
		//function _defineEvents(){
/*
window.onload = function(){
console.log("window event onload");
//console.log("-- document.readyState = " + document.readyState);

	//btn_scroll = getById("btn-scroll-to-top");

//send message to frame
//<iframe width="98%" height="80%" name="content_frame" scrolling=auto style='background-color: silver;' src=""></iframe>
//window.frames['content_frame'].document.write ('hello frame');

}//end load
*/

/* for Mozilla/Firefox/Opera 9 */
//https://developer.mozilla.org/ru/docs/Web/Events/DOMContentLoaded
//https://learn.javascript.ru/onload-ondomcontentloaded
//if (document.addEventListener) {
	//document.addEventListener("DOMContentLoaded", function(){
//console.log("DOMContentLoaded");
//console.log("-- document.readyState = " + document.readyState);
		//_vars["btn_scroll"] = _getById("btn-scroll-to-top");
	//},false);//end dom load
//}


//https://learn.javascript.ru/size-and-scroll-window
//window.onscroll = function(event) {
//    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
//console.log(currentScroll);

//console.log('Текущая прокрутка сверху: ' + window.pageYOffset);
//console.log('Текущая прокрутка слева: ' + window.pageXOffset);


//console.log( "btn_scroll: ", _vars["btn_scroll"].style );
	//if( btn_scroll.style.display === "" || btn_scroll.style.display === "none"){
		//btn_scroll.style.display = "block";
	//}

//	if( window.pageYOffset > 0 ){
		//if( !document.body.classList.contains("scrolled") ){
			//document.body.classList.add("scrolled");
		//}
	//} else {
		//if( document.body.classList.contains("scrolled") ){
			//document.body.classList.remove("scrolled");
		//}
	//}
//}//end event


//window.onresize = function(event) {
//console.log("resize window");
//}//end event


//console.log("window.addEventListener:" + window.addEventListener);
//console.log("window.attachEvent:" + window.attachEvent);
//if ( window.addEventListener ) {
	//window.addEventListener("load", function(e) {
//console.log("window.addEventListener, event load");
	//}, false);
//} else {
	//if (window.attachEvent)	{
		//window.attachEvent("onload", function(){
//console.log("window.attachEvent, event onload");
		//});
	//}
//};

//https://developer.mozilla.org/ru/docs/Web/API/Document/readyState
// альтернатива событию DOMContentLoaded
/*
document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
    initApplication();
  }
}
*/
		//}//end _defineEvents()


		function _getById(id){

			if( document.querySelector ){
				if(id.indexOf("#") === -1){
					id = "#" + id;
				}
				var obj = document.querySelector(id);
				return obj;
			}

			if( document.getElementById ){
				var obj = document.getElementById(id);
				return obj;
			}

			if( document.all ){
				var obj = document.all[id];
				return obj;
			}

			//if( document.layers ){
				//var obj = document.layers[id];
				//return obj;
			//}

			return false;
		}//end _getById()


		//USAGE: var groupBtnDelete = func.getByClass("child-nodes li");
		function _getByClass(className){

			if( typeof window.jQuery === "function"){
				if(className.indexOf(".") === -1){
					className = "." + className;
				}
				var group = $(className);
				return group;
			}

			if( document.querySelector ){
				if(className.indexOf(".") === -1){
					className = "." + className;
				}
				var group = document.querySelectorAll(className);
				return group;
			}

//document.getElementsByTagName('head')
			if( typeof document.getElementsByClassName === "function" ){
				var group = document.getElementsByClassName(className);
				return group;
			}

			return false;
		}//end _getByClass()


		function _push( ar, item){
			if( ar.push ){
				ar.push(item);
			} else {
				var num = ar.length;
				ar[num] = item;
			}
		}// end _push()


		var _timer = {};
		var _set_timer = function (){
			var d = new Date;
			return d.getTime();
		};

		var _get_timer = function (timer){
			var d = new Date;
			return parseFloat((d.getTime() - timer)/1000);
		};

		function _getRunTime( timer){
			return ( timer.end.getTime() - timer.start.getTime() ) / 1000;
		}


		function _get_attr_to_obj( attr ){
			if( attr.length === 0){
				return false;
			}
			var item_attr = {};
			for(var item = 0; item < attr.length; item++) {
				item_attr[attr[item].name] = attr[item].value;
			}
			return item_attr;
		}//end _get_attr_to_obj()


		function _log( msg, id){
//console.log(arguments);
//alert(arguments.length);
//		for( var n = 0; n < arguments.length; n++){
//			var _s = "<li> arguments." + n +" = "+ arguments[n] + "</li>";
//alert( _s );
//		}
			var id = id || arguments[1];//IE4 fix
//alert( msg );
//alert( id );

			if(!id){
				var id = "log";
			}

			var output = _getById(id);
			if( output ){
				if( msg.length == 0){
					output.innerHTML = "";
				} else {

					if( _vars["logOrderBy"] === "DESC"){
						output.innerHTML = msg+output.innerHTML;
					} else {
						output.innerHTML += msg;
					}

				}

			} else {
				console.log(msg);
				//alert(msg);
				//document.writeln(msg);
			}

			//if( typeof _showHiddenLog === "function"){
		//console.log(_showHiddenLog);
				//_showHiddenLog();
			//}
			if( output && output.style.display !== "block"){
				output.style.display = "block";
			}

		}//end _log()


		function _alert(opt){
			var p = {
				"message" : null,
				"level": "",
				"id": "#log",
				"timer": null
			};

			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}

//console.log(p);
			if( !p.message){
				return false;
			}

			if(p.id.indexOf("#") === -1 ){
				p.id = "#" + p.id;
			}
			var output = document.querySelector( p.id );
			if( !output ){
console.log("error, undefined log wrapper: ", output);
				return false;
			}

			switch (p.level) {
				case "info":
					p.message = "<p class='alert alert-info'>" + p.message + "</p>";
				break;

				case "warning":
					p.message = "<p class='alert alert-warning'>" + p.message + "</p>";
				break;

				case "danger":
				case "error":
					p.message = "<p class='alert alert-danger'>" + p.message + "</p>";
				break;

				case "success":
					p.message = "<p class='alert alert-success'>" + p.message + "</p>";
				break;

				default:
					p.message = "<p class='alert'>" + p.message + "</p>";
				break;
			}//end switch
			output.innerHTML = p.message;

			if( p.timer ){
				setTimeout(function(){ output.innerHTML=""}, p.timer);
			}
		}//end _alert()

		function _alert_log( message, level ){
			switch (level) {
				case "info":
					message = "<p class='alert alert-info'>" + message + "</p>";
					_log(message);
				break;

				case "warning":
					message = "<p class='alert alert-warning'>" + message + "</p>";
					_log(message);
				break;

				case "danger":
				case "error":
					message = "<p class='alert alert-danger'>" + message + "</p>";
					_log(message);
				break;

				case "success":
					message = "<p class='alert alert-success'>" + message + "</p>";
					_log(message);
				break;

				default:
					_log(message);
				break;
			}//end switch

		}//end _alert_log()

		function _wrapLogMsg( message, level ){
			switch (level) {
				case "info":
					message = "<p class='alert alert-info'>" + message + "</p>";
					return message;
				break;

				case "warning":
					message = "<p class='alert alert-warning'>" + message + "</p>";
					return message;
				break;

				case "danger":
				case "error":
					message = "<p class='alert alert-danger'>" + message + "</p>";
					return message;
				break;

				case "success":
					message = "<p class='alert alert-success'>" + message + "</p>";
					return message;
				break;

				default:
					return message;
				break;
			}//end switch

		}//end _wrapLogMsg()


		function _addEvent( element, eventName, func ) {
			if ( element.addEventListener ) {
				return element.addEventListener(eventName, func, false);
			} else if ( element.attachEvent ) {
				return element.attachEvent("on" + eventName, func);
			}
		};//end _addEvent()



		// SORT by key, alphabetical sorting
		function _sortRecords(opt){
		//console.log(opt);
			var p = {
				records: [],
				"sortOrder": "asc", //desc
				"sortByKey": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
		//console.log(p);

			if(p.records.length === 0 ){
				var logMsg = "error, not found sorting records, function sortRecords()";
		_log("<div class='alert alert-danger'>" + logMsg + "</div>");
console.log( logMsg );
				return false;
			}

			if(!p.sortByKey){
				var logMsg = "error, not found 'sortByKey', function sortRecords()";
		_log("<div class='alert alert-danger'>" + logMsg + "</div>");
console.log( logMsg );
				return false;
			}

			p.records.sort(function(a,b){
		//console.log(a, b);
				var s1 = a[p.sortByKey];
				var s2 = b[p.sortByKey];
				switch(p.sortOrder){
					case "asc":
						if (s1 > s2) {
							return 1;
						}
						if (s1 < s2) {
							return -1;
						}
						// s1 === s2
						return 0;
					break

					case "desc":
						if (s1 > s2) {
							return -1;
						}
						if (s1 < s2) {
							return 1;
						}
						// s1 === s2
						return 0;
					break
				}//end swith()
			});//end sort

		}//end _sortRecords()


		//**************************************
		//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
		//$_GET = parseGetParams();
		//or
		//$_GET = parseGetParams("?test=1");
		//console.log( $_GET);
		//**************************************
		function _parseGetParams( parseStr ) {
//console.log(parseStr);
//console.log(window.location);

			if( !parseStr ){
				var parse_url = window.location.search.substring(1).split("&");
			} else {
				p = parseStr.split("?");
			//console.log(p);
				parseStr = p["1"];
				var parse_url = parseStr.split("&");
			}

			var $_GET = {};
			for(var n = 0; n < parse_url.length; n++) {
			var getVar = parse_url[n].split("=");
				//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
				if( typeof(getVar[1])=="undefined" ){
					$_GET[ getVar[0] ] = "";
				} else {
				 $_GET[ getVar[0] ] = getVar[1];
				}
			}//next
			return $_GET;
		}//end _parseGetParams()



		function _parseHashParams( parseStr ) {
//console.log(parseStr);
//console.log(window.hash);
			if( !parseStr ){
				var parse_url = window.location.hash.substring(1).split("&");
			} else {
				p = parseStr.split("#");
			//console.log(p);
				parseStr = p["1"];
				var parse_url = parseStr.split("&");
			}

			var $_GET = {};
			for(var n = 0; n < parse_url.length; n++) {
			var getVar = parse_url[n].split("=");
				if( typeof(getVar[1])=="undefined" ){
					$_GET[ getVar[0] ] = "";
				} else {
				 $_GET[ getVar[0] ] = getVar[1];
				}
			}//next
			return $_GET;
		}//end _parseHashParams()


//-------------------------
		function _sendRequest( opt ){
			var p = {
				"useFetch": false,
				"requestMethod" : "GET", //"HEAD", PUT, DELETE
				"responseType" : "", //"", "arraybuffer", "blob", "document","json","text","moz-chunked-arraybuffer","ms-stream"
				"async" :  true,
				"dataUrl" : false,
				"requestParams": false,//{dir: p.dirName}
				"formData": null,
				"headers": null,// { 'x-my-custom-header': 'some value'},
//"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//"Content-Type": 'application/json;charset=utf-8'
//Authentication: 'secret'
				"onLoadStart" : null,
				"onLoad" : null,
				"onLoadEnd" : null,
				"onProgress" : null,
				"onError" : null,
				"setUploadCallbacks" : null,
				"callback" : function(){
console.log(arguments);
				}//end callback
			};
//console.log(opt);

	//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			var logMsg = "";

			if( !p["dataUrl"] || p["dataUrl"].lehgth === 0){
				logMsg = "sendRequest(), error, empty dataUrl...", p["dataUrl"];
				this.logAlert( logMsg, "error");
	//console.log( logMsg );
				p["callback"]({
					"status" : "error",
					"msg" : logMsg
				});
				return false;
			}

			this.vars["support"] = this.testSupport();
//File API
//FormData
//ActiveXObject
//XHR2

			if ( this.vars["support"]["fetch"] && p.useFetch){
				_fetchRequest( p.dataUrl, p);
				return;
			}

			if ( this.vars["support"]["XMLHttpRequest"]){
				_xmlHttpRequest(p);
				return;
			}

		}//end sendRequest()


		function _fetchRequest(dataUrl, opt){
//console.log("function _fetchRequest()");

			var p = {
				method : opt.requestMethod,
				//body: JSON.stringify({ items: obj, name: n.name.value, phone: n.phone.value, code: n.code.value }),
				//referrer: "about:client",
				//referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
				//referrerPolicy: ""
				//mode: "cors", // same-origin, no-cors
				//credentials: "include",//"same-origin", "omit",
				//cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
				//redirect: "follow", // manual, error
				//integrity: "",
				//keepalive: false, // true
				//signal: undefined, // AbortController
				//window: window // null
			};

			if(opt.headers){
				p.headers = opt.headers
			}
//console.log(p);

			fetch( dataUrl, p)
				.then( thenFunc )
				.then( thenFunc2 )
				.catch(catchFunc);

			function thenFunc(response){
console.log( response);
//Content-Type	application/xml
				return response.text();
				//return response.json();
			}

			function thenFunc2(res){
console.log('Request successful', res);
				if( typeof opt.callback === "function"){
					opt.callback(res);
					return;
				}
			}

			function catchFunc(err) {
console.log('Fetch Error : ', err);
				if( typeof  opt["onError"] === "function"){
					opt["onError"]({
						"msg" : "Fetch Error: " + err,
						"status" :"error",
						//"errorObj" : err
					});
				}

			}

		}//end fetchRequest()


		function _xmlHttpRequest(p){
//console.log("function _xmlHttpRequest()", p);
			var timeStart = new Date();
			var logMsg;

			var url = p.dataUrl;
			//get values from params and form paramsStr....
			if( p.requestMethod === "GET"){
				var num=0;
				if( p.requestParams ){
					var paramsStr = "";
					for( var item in p.requestParams ){
						var value = encodeURIComponent( p.requestParams[item] );
						if( num > 0){
							paramsStr += "&";
						}
						paramsStr += item + "=" + value;
						num++;
					}//next
					url += "?"+ paramsStr;
				}
			}
//console.log(url);

			var xhr = _createRequestObject();
			if ( !xhr ) {
				logMsg = "XMLHttpRequest create error";
console.log( logMsg, xhr );
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"msg" : logMsg,
						"status" :"error",
						"errorObj" : e
					});
				}
				p.callback(false);
				return false;
			}

			try{
				xhr.open( p.requestMethod, url, p.async );
			} catch(e){
				logMsg = "xhr.open error...";
//for( var key in e){
	//console.log(key +" : "+ e[key]);
//}
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"msg" : logMsg + e.message,
						"status" :"error",
						"errorObj" : e
					});
				}
				p.callback(false);
				return false;
			}//end catch

//xhr.abort();

			//set responce type
			//Check responseType support:
//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
//Error, "The response type cannot be changed for synchronous requests made from a document."
// Opera 12 crash!!!!
			if( "responseType" in xhr && p["async"] ){
				xhr.responseType = p["responseType"];
//xhr.responseType = "json";
			}
//console.log(xhr.responseType);

			//set headers
//xhr.setRequestHeader("authorization", "Token xxxxxx");
//xhr.setRequestHeader("Version", "1");
//xhr.setRequestHeader("Origin", "http://vbox5");
//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
//xhr.setRequestHeader("X-Yandex-API-Key", _vars["apiKey"] );
//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
			if(p.headers && p.headers.length > 0){
				for(var key in p.headers){
					xhr.setRequestHeader(key, p.headers[key] );
				}//next
			}

			xhr.onreadystatechange = function(){
				_onreadystatechange();
			};//

			if( "onloadstart" in xhr ){
				xhr.onloadstart = function(e){
//console.log("event type:" + e.type);
					if( typeof  p["onLoadStart"] === "function"){
						p["onLoadStart"](e);
					}
				}
			}

			if( "onabort" in xhr ){
				xhr.onabort = function(e){
console.log("event type:" + e.type);
				}
			}

//console.log( "onprogress" in xhr  );
			if( "onprogress" in xhr ){
				xhr.onprogress = function( e ){
					if( typeof  p["onProgress"] === "function"){
						p["onProgress"](e);
					} else {
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable );
					}
				}//
			};

			if( "onload" in xhr ){
				xhr.onload = function(e){
					if( typeof  p["onLoad"] === "function"){
						p["onLoad"](e);
					} else {
						_onload(e);
					}
				}
			}

			if( "onloadend" in xhr ){
				xhr.onloadend = function(e){
//console.log(xhr.getResponseHeader('X-Powered-By') );
//console.log( xhr.getAllResponseHeaders() );
					if( typeof  p["onLoadEnd"] === "function"){
						p["onLoadEnd"](e);
					}
				}//
			}

			if( "onerror" in xhr ){
				xhr.onerror = function(e) {
//console.log(arguments);
					logMsg = "error, ajax request failed...";
					if( typeof  p["onError"] === "function"){
						p["onError"]({
							"message" : logMsg,
							"url" : xhr.responseURL,
							"status" : xhr.status,
							"statusText" : xhr.statusText,
							"errorObj": e
						});
					} else {
console.log("event type:" + e.type);
						p.callback(false);
					}
				}//
			}

//console.log(xhr.upload);
			if( xhr.upload ){
					if( typeof  p["setUploadCallbacks"] === "function"){
						p["setUploadCallbacks"](e);
					}
			}

//---------------------------
			try{
				xhr.send();
			}catch(e){
//console.log(e);
				logMsg = "error send XHR...";
				logMsg += "url: " + url;
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"message" : logMsg,
						"status" :"error"
					});
				}
				p.callback(false);
				return false;
			}
//--------------------------

			function _onreadystatechange(){
//console.log("state:", xhr.readyState);
				if( xhr.readyState === 4){
console.log("end request, state ", xhr.readyState, ", status: ", xhr.status);
					if( xhr.status === 200){
/*
						if( typeof  p["onSuccess"] === "function"){
							var timeEnd = new Date();
							var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
							if( "response" in xhr){
								var data = xhr.response;
		//https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
		//xhr.responseXML

							} else {
								var data = xhr.responseText;
							}
							p["onSuccess"](data, runtime, xhr);
						}
*/
					}

					if( xhr.status !== 200){
/*
			//console.log(xhr);
			//console.log("Ajax load error, url: " + xhr.responseURL);
			//console.log("status: " + xhr.status);
			//console.log("statusText:" + xhr.statusText);
						if( typeof  p["onError"] === "function"){
							p["onError"]({
								"message" : "ajax load request error.",
								"url" : xhr.responseURL,
								"xhr.status" : xhr.status,
								"xhr.statusText" : xhr.statusText
							});
						}
*/
					}

				}
			}//end onreadystatechange

			function _onload(e){
//console.log("event:", e);

				var timeEnd = new Date();
				var runtime = (timeEnd.getTime() - timeStart.getTime());
				logMsg = "server AJAX request,  runtime: " + runtime + " ms, "+ (runtime / 1000)+" sec<br>";
				logMsg += "<div class='pl20 lr-list bg-white fz12'>";
				logMsg += "<li>url: " + decodeURIComponent( e.target.responseURL )+" </li> ";
				//logMsg += "<li>url: " + url +" </li> ";
				logMsg += "<li>total: " + e.total +"bytes </li>";
				logMsg += "<li>loaded: " + e.loaded + " bytes, " + (e.loaded / 1024).toFixed(2)+" Kbytes</li>";
				logMsg += "</div> ";
//console.log(logMsg);

				var _response = false;
				if( "response" in xhr){
					var _response = xhr.response;
				} else {
					var _response = xhr.responseText;
				}
				//_vars["contentType"] = xhr.getResponseHeader('content-type');

				if( typeof p.callback === "function"){
					p.callback({
						"message" : logMsg,
						"status" :"success",
						"response": _response
					});
				}

			}//end onload

		}//end _xmlHttpRequest()


		/*
			runAjax( {
				"requestMethod" : "GET",
				"enctype" : "application/x-www-form-urlencoded",
				"url" : _vars["db_url"],
				"params" : params,// object
				"formData": null, //object formData
				"onProgress" : function(e){	},
				"callback": _postFunc
			});
		*/
		function _runAjax( opt ){
//console.log(arguments);

			var p = {
				"requestMethod" : "GET",

				//https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/responseType
				"responseType" : "", //"", "arraybuffer", "blob", "document","json","text","moz-chunked-arraybuffer","ms-stream"

				"enctype" : "application/x-www-form-urlencoded",
				//"enctype" : "multipart/form-data",
				"url" : false,
				"params": null,//params object
				"formData": null,
				"headers": null,// { 'x-my-custom-header': 'some value'},
				"async" :  true,
				"callback" : null,
				"onProgress" : null,
				"onError" : function(){
console.log(arguments);
				},
				"onLoadEnd" : null,
				"noCache" : false
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			var logMsg;
			var requestMethod = p["requestMethod"];
			var url = p["url"];
			var async = p["async"];
			var callback = p["callback"];

			//get values from params and form paramsStr....
			//if( requestMethod === "GET"){
				var num=0;
				if( p["params"] ){
					var paramsStr = "";
					for( var item in p["params"]){
						var value = encodeURIComponent( p["params"][item] );
						if( num > 0){
							paramsStr += "&";
						}
						paramsStr += item + "=" + value;
						num++;
					}//next
					url += "?"+ paramsStr;
				}
			//}

			if( p["noCache"] ){
				if( url.indexOf("?") !== -1 ){
					url += "&noCache=";
				} else {
					url += "?noCache=";
				}
				url += (new Date().getTime()) + Math.random(); //no cache
			}


			if( !url || url.length === 0){
				logMsg = "error,  empty 'url' value.";
console.log( logMsg );
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"message" : logMsg
					});
				}
				return false;
			}


			var xhr = _createRequestObject();
			if ( !xhr ) {
console.log("error, ", xhr);
				logMsg = "_createRequestObject() error";
console.log( logMsg, xhr );
				if( typeof  p["onError"] === "function"){
					p["onError"]({
						"message" : "error creating XHR...."
					});
				}
				return false;
			}

			var timeStart = new Date();

			try{
				xhr.open( requestMethod, url, async );
			} catch(e){
				//logMsg = "ajax request error...";
//console.log( logMsg );
//for( var key in e){
//console.log(key +" : "+ e[key]);
//}//next
				if( typeof  p["onError"] === "function"){
					p["onError"](e);
				}
				return false;
			}//end catch

			//Check responseType support:
		//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
		//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
		//Error, "The response type cannot be changed for synchronous requests made from a document."
			// Opera 12 crash!!!!
			if( "responseType" in xhr && p["async"] ){
				xhr.responseType = p["responseType"];
			}

			if(p.headers && p.headers.length > 0){
				for(var key in p.headers){
					xhr.setRequestHeader(key, p.headers[key] );
				}//next
			}

			xhr.onreadystatechange  = function() {
		//console.log("state:", xhr.readyState);
				if( xhr.readyState == 4) {
		//console.log( xhr  );
		//for(var key in xhr){
		//console.log( key +" : "+xhr[key] );
		//}

		//console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
		//console.log( "xhr.onerror = ", xhr.onerror  );


						if( xhr.status === 200){

							var timeEnd = new Date();
							var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
//var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
//console.log(msg);
							// if( "responseType" in xhr){
					// console.log( "xhr.response: ", xhr.response );
					// console.log( "responseType: " + xhr.responseType );
							// }

							// try{
					// console.log( "xhr.responseText: ", xhr.responseText );
							// } catch(e){
					// console.log( e );
							// }

							// try{
					// console.log( "xhr.responseXML: ", xhr.responseXML );
							// } catch(e){
					// console.log( e );
							// }

							if( typeof callback === "function"){
//alert("responseText" in xhr);	true in IE6
//alert("response" in xhr);	false in IE6
								if( "response" in xhr){
									var data = xhr.response;
								} else {
									var data = xhr.responseText;
								}

//fix IE8 (not property "responseType")
//console.log("Content-Type:: " + xhr.getResponseHeader("Content-Type") );
								var contentType = xhr.getResponseHeader("Content-Type");
								//if( contentType === "application/xml" || contentType === "text/xml"){
								if( contentType.indexOf("application/xml") !== -1 || contentType.indexOf("text/xml") !== -1 ){
									data = xhr.responseXML;
								}

								//if( contentType === "text/plain"){
								if( contentType.indexOf("text/plain") !== -1){
									data = xhr.responseText;
								}

								callback( data, runtime, xhr );
							}

							//if browser not define callback "onloadend"
							var test = "onloadend" in xhr;
							if( !test ){
								_loadEnd();
							}

						} else {
//console.log(xhr);
//console.log("Ajax load error, url: " + xhr.responseURL);
//console.log("status: " + xhr.status);
//console.log("statusText:" + xhr.statusText);
							if( typeof  p["onError"] === "function"){
								p["onError"]({
									"message" : "ajax load request error.",
									"url" : xhr.responseURL,
									"xhr.status" : xhr.status,
									"xhr.statusText" : xhr.statusText
								});
							}
						}

				}
			};//end xhr.onreadystatechange

			if( "onloadstart" in xhr ){
				xhr.onloadstart = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

			if( "onload" in xhr ){
				xhr.onload = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

			if( "onloadend" in xhr ){
				xhr.onloadend = function(e){
		//console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
		//console.log(xhr.getResponseHeader('X-Powered-By') );
					_loadEnd();
				}//end event callback
			}

			function _loadEnd(){
				var _headers = {
					"all" : xhr.getAllResponseHeaders(),
					"content-type" : xhr.getResponseHeader('content-type')
				};
//console.log( _headers );
				if( typeof  p["onLoadEnd"] === "function"){
					p["onLoadEnd"]( _headers);
				}
			}//end _loadEnd()

		//console.log( "onprogress" in xhr  );
		//console.log( xhr.responseType, typeof xhr.responseType );
		//console.log( window.ProgressEvent, typeof  window.ProgressEvent);
			if( "onprogress" in xhr ){
				xhr.onprogress = function(e){
		//console.log("ajax onprogress");
		//console.log(arguments);

					if( typeof  p["onProgress"] === "function"){
						p["onProgress"](e);
					}
				}

				//xhr.addEventListener('progress', function(e) {
		//console.log("ajax onprogress", e);
				//}, false);

		//console.log( "xhr.onprogress ", xhr.onprogress);
		//console.log( "xhr.onprogress ", xhr.onprogress.handleEvent  );
			}

			if( "onabort" in xhr ){
				xhr.onabort = function(e){
		// console.log(arguments);
		//console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				}
			}

		//console.log( "onerror" in xhr  );
		//console.log( "xhr.onerror " + xhr.onerror  );
			if( "onerror" in xhr ){
		//console.log( "xhr.onerror = ", xhr.onerror  );
				xhr.onerror = function(e){
		//console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
					// if( typeof  p["onError"] === "function"){
						// p["onError"]({
							// "url" : xhr.responseURL,
							// "status" : xhr.status,
							// "statusText" : xhr.statusText
						// });
					// }
				}
			}

console.log(xhr.upload);
			if( xhr.upload ){
/*
				xhr.upload.onerror = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};

				xhr.upload.onabort = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};

				xhr.upload.onload = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};

				xhr.upload.onloadstart = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};

				xhr.upload.onloadend = function(e){
		// console.log(arguments);
		// console.log("event type:" + e.type);
		// console.log("time: " + e.timeStamp);
		// console.log("total: " + e.total);
		// console.log("loaded: " + e.loaded);
				};

				//Listen to the upload progress.
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						var percent = (e.loaded / e.total) * 100;
		console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percent+"%" );
					}
				};

				xhr.upload.ontimeout = function(e){
		console.log(arguments);
		console.log("event type:" + e.type);
		console.log("time: " + e.timeStamp);
		console.log("total: " + e.total);
		console.log("loaded: " + e.loaded);
				};
*/
			}

			//send query
			//if( requestMethod !== "POST"){
			if( requestMethod.toUpperCase() !== "POST" ){
				try{
					xhr.send();
				}catch(e){
console.log(e);
					if( typeof  p["onError"] === "function"){
						p["onError"]({
							"message" : "error send XHR...."
						});
					}
				}
			}

//------------------------------------- form POST body
			//if( requestMethod === "POST"){ //http://learn.javascript.ru/xhr-forms
			if( requestMethod.toUpperCase() === "POST" ){

				if( p["enctype"] === "multipart/form-data"){
					xhr.send( p["formData"] );
				}

				if( p["enctype"] === "application/x-www-form-urlencoded"){

					var test = "setRequestHeader" in xhr;
			//console.log( "setRequestHeader: " + test );
					if (test) {
						xhr.setRequestHeader("Content-Type", p["enctype"]);
					}

					var body = "";
					var n = 0;
					for(var key in p["formData"]){
						var value = p["formData"][key];
						if( n > 0){
							body += "&";
						}
						body += key + "=" + encodeURIComponent(value);
						n++;
					}//next
		//console.log( body );
					xhr.send( body );
				}

			}

		}//end _runAjax()



//-------------------------
		function _createRequestObject() {
			var request = false;

			if (window.XMLHttpRequest) { // Mozilla, Safari, Opera ...
	//console.log("try use XMLHttpRequest");
				request = new XMLHttpRequest();
			}

			if(!request){ // IE
	//console.log("try use Microsoft.XMLHTTP");
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}

			if(!request){
	//console.log("try use Msxml2.XMLHTTP");
				request=new ActiveXObject('Msxml2.XMLHTTP');
			}

			return request;
		}//end _createRequestObject()


//-------------------------
		function _convertDateToStr( opt ){
			var p = {
				"dateObj" : null,
				"format" : "dd-mm-yyyy hh:min",
				"s_case": false//subjective_case, именительный падеж
			};
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log( p );
			var d = p.dateObj;

			var sYear = d.getFullYear();
			var sMonth = d.getMonth() + 1;
	//console.log( sMonth, typeof sMonth );
			if( sMonth < 10){
				sMonth = "0" + sMonth;
			}

			var sDate = d.getDate();
			if( sDate < 10){
				sDate = "0" + sDate;
			}

			var sHours = d.getHours();
			if( sHours < 10){
				sHours = "0" + sHours;
			}

			var sMinutes = d.getMinutes();
			if( sMinutes < 10){
				sMinutes = "0" + sMinutes;
			}

			var sSec = d.getSeconds();
			if( sSec < 10){
				sSec = "0" + sSec;
			}

			var dateStr = dateStr =  sDate + "-" + sMonth + "-" + sYear + " " + sHours + ":" + sMinutes + ":" + sSec;
			switch( p.format ){

				case "dd-mm-yyyy hh:min":
					dateStr =  sDate + "-" + sMonth + "-" + sYear + " " + sHours + ":" + sMinutes + ":" + sSec;
				break;

				case "yyyy-mm-dd":
					dateStr = sYear + "-" + sMonth + "-" + sDate;
				break;

				case "yyyy-mm-dd hh:min":
					dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;
				break;

				case "yyyy-mm-dd hh:min:sec":
					dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes + ":" + sSec;
				break;

				case "dd mm hh:min":
					dateStr = sDate + " " + sMonth +" "+ sHours + ":" + sMinutes;
				break;

				case "dd full-month hh:min":
					sMonth = _getMonthNameByNum(
						d.getMonth(),
						"ru",
						p.s_case
					);
					dateStr = sDate + " " + sMonth +" "+ sHours + ":" + sMinutes;
				break;

				case "dd full-month yyyy":
					sMonth = _getMonthNameByNum(
						d.getMonth(),
						"ru",
						p.s_case
					);
					dateStr = sDate + " " + sMonth +" "+ sYear;
				break;

				case "hh:min":
					dateStr = sHours + ":" + sMinutes;
				break;

			}//end switch
			return dateStr;
		}//end _convertDateToStr()



//================================
//Usage :  var today = func.timeStampToDateStr({
//timestamp : ....timestamp string....,
//format : "yyyy-mm-dd hh:min"
//});
//1331352390 --> 10-Mar-2012 12:06:30

//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
//var date = new Date(unix_timestamp * 1000)
//================================
		function _timeStampToDateStr( opt ){
			var p = {
				"timestamp" : null,
				"format" : "",
				"s_case": false//subjective_case, именительный падеж
			};
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log( p );

			//date.setTime( timestamp);
			if( !p.timestamp || p.timestamp.length === 0){
				var d = new Date();
			} else {
				// multiplied by 1000 so that the argument is in milliseconds, not seconds.
				timestamp = p.timestamp * 1000;
				var d = new Date( timestamp );
			}


			var dateStr = _convertDateToStr({
				"dateObj": d,
				"format": p.format,
				"s_case": p.s_case
			});

			return dateStr;
		}//end _timeStampToDateStr()


//================================
// "15-May-2015 09:58:16" --> 1431662296000
// var arr = "15-May-2015 09:58:16".split(" ");
// var dateArr = arr[0].split("-");
// var timeArr = arr[1].split(":");
// var split_values = {
//	"day" : dateArr[0],
//	"month" : dateArr[1],
//	"year" : dateArr[2],
//	"hour" : timeArr[0],
//	"min" : timeArr[1],
//	"sec" : timeArr[2]
// };
// var timeStamp = func.getTimeStampFromDateStr( split_values );
//================================
		function _getTimeStampFromDateStr( dateObj ){
			var _day = parseInt( dateObj["day"] );
			if ( isNaN( _day ) ){
				_day = 0;
			}

			var _month = 0;
			_month = _getNumMonthByName( dateObj["month"] );

			var _year = parseInt( dateObj["year"] );
			if ( isNaN( _year ) ){
				_year = 0;
			}

			var _hour = parseInt( dateObj["hour"] );
			if ( isNaN( _hour ) ){
				_hour = 0;
			}
			var _min = parseInt( dateObj["min"] );
			if ( isNaN( _min ) ){
				_min = 0;
			}
			var _sec = parseInt( dateObj["sec"] );
			if ( isNaN( _sec ) ){
				_sec = 0;
			}
			var timeStamp = new Date ( _year, _month, _day, _hour, _min, _sec).getTime();
			return timeStamp;
		}//end _getTimeStampFromDateStr()


		function _getMonthNameByNum(
				num,
				lang,
				s_case //вернуть subjective_case, именительный падеж
			)
		{
var sMonth = [
"jan",
"feb",
"mar",
"apr",
"may",
"jun",
"jul",
"aug",
"sep",
"oct",
"nov",
"dec"
];
			if( lang === "RU" || lang === "ru" ){
sMonth = [
"январь",
"февраль",
"март",
"апрель",
"май",
"июнь",
"июль",
"август",
"сентябрь",
"октябрь",
"ноябрь",
"декабрь"];
				if(s_case){
sMonth = [
"января",
"февраля",
"марта",
"апреля",
"мая",
"июня",
"июля",
"августа",
"сентября",
"октября",
"ноября",
"декабря"
];
				}
			}
//console.log(s_case, sMonth);
			return sMonth[num];
		}//end _getMonthNameByNum()


		function _getNumMonthByName( monthName, lang ){
			var sMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			if( lang ){
				if( lang === "RU" || lang === "ru" ){
					sMonth = ["Янв", "Фев", "Март", "Апр", "Май", "Июн", "Июл", "Авг", "Сент", "Окт", "Ноя", "Дек"];
				}
			}
			var num = sMonth.indexOf(monthName);
			return num;
		}//end _getNumMonthByName()


		//Convert str to Hash code
		var _hashCode = function(str){
			var hash = 0;
			if (str.length == 0) return hash;
			for (i = 0; i < str.length; i++) {
				char = str.charCodeAt(i);
				hash = ((hash<<5)-hash)+char;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		};//_hashCode


		function _convertXmlToObj(xml){
//console.log( xml.childNodes.item(0).nodeName );
//console.log( xml.firstChild.nodeName );
//console.log( xml.documentElement.nodeName );
			var rootTagName = xml.documentElement.nodeName;
			var xmlDoc = xml.getElementsByTagName( rootTagName);
//console.log( xmlDoc, typeof xmlDoc) ;
//console.log( xmlDoc.item(0), typeof xmlDoc.item(0)) ;
//console.log( xmlDoc.length) ;
//console.log( xmlDoc.item(0).childNodes.length ) ;
//console.log( xmlDoc.item(0).childNodes.item(1).nodeName ) ;
// for(var key in xmlDoc){
// console.log( key +", "+ xmlDoc[key]+ ", " + typeof xmlDoc[key]);
// }
			var xmlObj = {};
			for(var n1 = 0; n1 < xmlDoc.length; n1++){
//console.log( xmlDoc.item(n1) );
//console.log( xmlDoc.item(n1).childNodes ) ;
				var _node = xmlDoc.item(n1);
				var key = _node.nodeName;
				xmlObj[key] = {};
				_parseChildNodes( _node, xmlObj[key] );
			}
			//console.log(xmlObj);
			return xmlObj;

			function _parseChildNodes( node, nodeObj ){
				var _childNodes = node.childNodes;
// if( !node.children){
// console.log("Internet Explorer (including version 11!) does not support the .children property om XML elements.!!!!");
// }
				if( _childNodes.length > 0){
					if( _childNodes.length === 1 &&
						_childNodes.item(0).nodeType === 3
					){//one child node of type TEXT cannot contain the "children" property!!!!
							//_ch["_itemType"] = ;
					} else {
						nodeObj["childNodes"] = {};
					}
				}

				for(var n = 0; n < _childNodes.length; n++){
					var child = _childNodes.item(n);//<=IE9
//console.log( "nodeType: "+ child.nodeType);
//console.log( "nodeName: "+ child.nodeName);

					if (child.nodeType !== 1){// not Node.ELEMENT_NODE
						if (child.nodeType === 3){// #text

							var _text = "";
							if ("textContent" in child){
								_text = child.textContent;

							} else {
								_text = child.text;
							}

							_text = _text.trim();
							if( _text.length > 0){
								if(
									_text !== "\n" &&
									_text !== "\n\n" &&
									_text !== "\n\n\n"
								){
									nodeObj["text"] = _text;
								}
							}
						}
					} else {
//console.log( "nodeName: "+ child.nodeName);
						var key = child.nodeName;

						//if( !nodeObj["children"] ){
							//nodeObj["children"] = {};
						//}
						if( !nodeObj["childNodes"][key] ){
							nodeObj["childNodes"][key] = [];
						}

						var _ch = {
							//"_length": child.childNodes.length
						};
						var attr = __getAttrToObject(child.attributes);
						if(attr){
							_ch["attributes"] = attr;
						}

						//if( child.childNodes.length === 1){
							////continue;
							//_ch["nodeType"] = child.nodeType;
							//_ch["_child_nodes"] = child.childNodes;
							//_ch["_item"] = child.childNodes.item(0);
							//_ch["_itemType"] = child.childNodes.item(0).nodeType;
						//}

						nodeObj["childNodes"][key].push(_ch);

						_parseChildNodes(child, _ch );
					}
				}
			}//end _parseChildNodes()

			function __getAttrToObject( attr ){
				if( attr.length === 0){
					return false;
				}
				var item_attr = {};
				for(var item = 0; item < attr.length; item++) {
					item_attr[attr[item].name] = attr[item].value;
				}
				return item_attr;
			}//end _get_attr_to_obj()

		}//end _convertXmlToObj()

/*
var func = sharedFunc();
//console.log("func:", func);

xmlNodes = func.parseXmlToObj(
	func, //link on  sharedFunc() !!!!
	xml
);
console.log(xmlNodes);

//------------------
parse XML document to array
<table><note>....</note>, <note>...</note></table>

IN:
<templates>
	<tpl name="tpl-node_photogallery_image">
		<html_code><![CDATA[
......
		]]></html_code>
	</tpl>
.................
</templates>

OUT:
[ { name: "attr value", html_code: "......" },
{ name: "attr value", html_code: "......" }]
ONLY second LEVEL !!!!!!!!!!!!
*/

		function _parseXmlToObj(_func, xml){
		//console.log( xml.childNodes.item(0).nodeName );
		//console.log( xml.firstChild.nodeName );
		//console.log( xml.documentElement.nodeName );
			var rootTagName = xml.documentElement.nodeName;
			var xmlDoc = xml.getElementsByTagName( rootTagName);
		//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;
		//console.log( xmlDoc.childNodes.length ) ;
		//console.log( xmlDoc.item(0).childNodes.item(1).nodeName ) ;
		// for(var key in xmlDoc){
		// console.log( key +", "+ xmlDoc[key]+ ", " + typeof xmlDoc[key]);
		// }
			var xmlObj = [];
			for (var n = 0; n < xmlDoc.item(0).childNodes.length; n++) {
				var child = xmlDoc.item(0).childNodes.item(n);//<=IE9
		//console.log( "nodeType: "+ child.nodeType);
				if (child.nodeType !== 1){// not Node.ELEMENT_NODE
					continue;
				}
				var node = __parseChildNode( child );
		//console.log(node);
				xmlObj.push ( node );
			}//next
		//console.log(xmlObj);
			return xmlObj;

			function __parseChildNode( nodeXml ){
		//console.log( "nodeName: "+ nodeXml.nodeName);
		//console.log( "text: "+ nodeXml.text);
		//console.log( "textContent: "+ nodeXml.textContent);
		// var test = nodeXml;
		// for(var key in test ){
		// console.log( key +", "+ test[key]+ ", " + typeof test[key]);
		// }

				var nodeObj = _func.get_attr_to_obj( nodeXml.attributes ) ;
				for (var n2 = 0; n2 < nodeXml.childNodes.length; n2++) {
					var _child = nodeXml.childNodes.item(n2);
		//console.log( "nodeType: "+ _child.nodeType);
					if ( _child.nodeType !== 1){// not Node.ELEMENT_NODE
						continue;
					}
		// console.log( "nodeName: "+ _child.nodeName);
		// console.log( "text: "+ _child.text);
		// console.log( "textContent: "+ _child.textContent);
					var _name = _child.nodeName;
					if ("textContent" in _child){
						nodeObj[_name] = _child.textContent;
					} else {
						nodeObj[_name] = _child.text;
					}
				}//next

		// if( !record.children){
		// console.log("Internet Explorer (including version 11!) does not support the .children property om XML elements.!!!!");
		// }
				return nodeObj;
			}//end __parseChildNode()

		}//end _parseXmlToObj()



		function _testSupport() {
			return {
				"jsonSupport" : JSON ? true : false,
				"Promise": window.Promise  ? true : false,
				"caches" : window.caches ? true : false,
				"applicationCache": window.applicationCache ? true : false,
				"serviceWorker" : navigator.serviceWorker ? true : false,
				"Worker": window.Worker  ? true : false,
				"indexedDB" : window.indexedDB ? true : false,
				"webSQLsupport" : window.openDatabase  ? true : false,
				"sessionStorage" : window['sessionStorage']  ? true : false,
				"localStorage" : window['localStorage']  ? true : false,
				"dataStoreType" : _detectDataStoreType(),
				"geolocation" :  typeof navigator.geolocation !== "undefined",
				"supportTouch" : _supportTouch(),
				"FileAPI" :  _supportFileAPI(),
				"FormData": typeof window.FormData === "function",
				"TreeWalker": window.TreeWalker  ? true : false,
				"NodeIterator": window.NodeIterator  ? true : false,
				"ActiveXObject": window.ActiveXObject  ? true : false,
				"XMLHttpRequest": window.XMLHttpRequest  ? true : false,
				"XHR2": _supportXHR2(),
				"DOMParser": window.DOMParser  ? true : false, // all browsers, except IE before version 9
				"fetch": window.fetch  ? true : false,
				"WebSocket": window.WebSocket  ? true : false,
				"Notification": window.Notification  ? true : false,
				"PushManager": window.PushManager  ? true : false,
				"EventSource": window.EventSource  ? true : false,
				"InternationalizationAPI": window.Intl  ? true : false,
				"supportCSSvars": _test_CSSvars(),
				//CanvasSupported
				//WebGL support
				//SVG support
				//classList support
				//test media support
				//image attribute loading
			};
		};//end _testSupport()

		function _test_CSSvars(){
			var supportCSSvars = false;
			if (window.CSS &&
				window.CSS.supports &&
				window.CSS.supports('--fake-var', 0)
			){
				supportCSSvars = true;
			}
			return supportCSSvars;
		}//end
		
		function _detectDataStoreType(){
			var dataStoreType = false;
			if( window['localStorage']  ? true : false ){
				dataStoreType = "localStorage";
			}
			if( window.openDatabase  ? true : false ){
				dataStoreType = "webSQL";
			}
			if( window.indexedDB ? true : false ){
				dataStoreType = "indexedDB";
			}
			return dataStoreType;
		}//end _detectDataStoreType()

		var _supportTouch = function() {
			//return !!('ontouchstart' in window);

			var supportTouch = false;
			if ('ontouchstart' in window) {
				//iOS & Android
				supportTouch = true;
			//} else if(window.navigator.msPointerEnabled) { // msPointerEnabled does not detect mobile, it also exists in desktop IE, use msMaxTouchPoints/maxTouchPoints instead!
			} else if(window.navigator.msMaxTouchPoints) {
				//WinPhone
				supportTouch = true;
			}
			return supportTouch;
		};//end _supportTouch

		var _supportFileAPI = function(){
			if( window.File && window.FileList && window.FileReader ){
				return true;
			}
			return false;
		}//end __supportFileAPI()

		var _supportXHR2 =  function(){
			var result = false;

			var xhr = new XMLHttpRequest();

			if ( typeof xhr.responseType !== "undefined" ){
				result = true;
			}
			if ( typeof xhr.response !== "undefined" ){
				result = true;
			}

			return result;
		}//end



		// public interfaces
		return{
			vars : _vars,

			getById: _getById,
			getByClass: _getByClass,

			log:	_log,
			logAlert: _alert_log,
			logAlertParams: _alert,
			wrapLogMsg: _wrapLogMsg,
			addEvent: _addEvent,

			push: _push,
			set_timer: _set_timer,
			get_timer: _get_timer,
			get_attr_to_obj: _get_attr_to_obj,

			sortRecords: _sortRecords,
			parseGetParams: _parseGetParams,
			parseHashParams: _parseHashParams,

			runAjax: _runAjax,
			sendRequest: _sendRequest,

			convertDateToStr: _convertDateToStr,
			timeStampToDateStr: _timeStampToDateStr,
			getTimeStampFromDateStr: _getTimeStampFromDateStr,
			getMonthByNameNum: _getMonthNameByNum,
			getNumMonthByName: _getNumMonthByName,

			hashCode: _hashCode,
			parseXmlToObj: _parseXmlToObj,
			convertXmlToObj: _convertXmlToObj,

			testSupport: _testSupport

			//get_content: function( params ){
				//return get_content( params );
			//}
		};

	};//end sharedFunc

	//window.Lib = Lib;
//})();


//================
function setCookie( name, value, expires, path, domain, secure ){
	var cookie_string = name + "=" + escape ( value );
	if (expires){
		expires = new Date(expires);
	} else {
		expires = new Date();
	}
	cookie_string += "; expires=" + expires.toGMTString();

	if ( path ){
		cookie_string += "; path=" + escape ( path );
	}

	if ( domain ){
		cookie_string += "; domain=" + escape ( domain );
	}

	if ( secure ){
        cookie_string += "; secure";
	}

	document.cookie = cookie_string;
}//end

function getCookie(name){
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++){
		// a name/value pair (a crumb) is separated by an equal sign
		var aCrumb = aCookie[i].split("=");
		if (name == aCrumb[0])
			if(aCrumb[1]) {
				return unescape(aCrumb[1]);
			} else {
				return null;
			}
	}
	// a cookie with the requested name does not exist
	return null;
};//getCookie

function delCookie(name){
		document.cookie = name + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
};

//================
function runAjaxJQuery( params ) {

	var timeStart = new Date();

	$("#load-progress").show();

	$.ajax({
		type: "GET",
		url: params["filename"],
		dataType: "text",
		//dataType: "xml",
		//data: {},
		//cache: false,
		xhr: function(){//https://wcoder.github.io/notes/progress-indicator-with-jquery
			var xhr = new window.XMLHttpRequest();
/*
			// прогресс загрузки на сервер
			xhr.upload.addEventListener("progress", function(evt){
console.log("xhr, upload progress callback function....", evt);
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
console.log(percentComplete);
				}
			}, false);

			// прогресс скачивания с сервера
			xhr.addEventListener("progress", function(evt){
console.log("xhr, download progress callback function....", evt);
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
console.log(percentComplete);
				}
			}, false);
*/
			xhr.addEventListener("progress", function(e){
//console.log("xhr, download progress callback function....", e);
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
				if( _vars["loadProgressBar"] ){
					_vars["loadProgressBar"].className = "progress-bar";
					_vars["loadProgressBar"].style.width = percentComplete+"%";
					_vars["loadProgressBar"].innerHTML = percentComplete+"%";

					_vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
				}
			}, false);

			return xhr;
		},

		beforeSend: function(XMLHttpRequest){
//console.log("ajax beforeSend, ", arguments);
/*
			// прогресс загрузки на сервер
			//https://wcoder.github.io/notes/progress-indicator-with-jquery
			XMLHttpRequest.upload.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
				}
			}, false);

			// прогресс скачивания с сервера
			XMLHttpRequest.addEventListener("progress", function(evt){
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					// делать что-то...
				}
			}, false);
*/
		},

		complete: function(xhr, state){
//console.log("ajax load complete, ", arguments);
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;

			_vars["runtime"]["ajax_load"] = {
				"time" : runTime
			};

			//_vars["logMsg"] = "ajax load " + params["filename"] + " complete";
			//_vars["logMsg"] += ", runtime: <b>" + runTime + "</b> sec";
			//_vars["logMsg"] += ", <b>state</b>: " + state;
//_log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );

			//if( _vars["waitWindow"] ){
				//_vars["waitWindow"].style.display="none";
			//}

		},

		success: function( data ){
//_vars["logMsg"] = "Successful download xml file " + params["filename"];
//_log("<p class='alert alert-success'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
			params.callback( data );
		},

		error: function( data, status, errorThrown ){
//console.log( "error", arguments );
_vars["logMsg"] = "error ajax load " + params["filename"]+ ", " + errorThrown["message"];
_log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );

console.log( "status:" + status );
for(var key in errorThrown){
console.log( key +" : "+ errorThrown[key] );
}

		}
	})
	.done(function () {
console.log("$.ajax, Done...");
	})
	.fail(function (xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
console.log("textStatus:" + textStatus);
	});
}//end runAjaxJQuery();

/*
//siteInspector
function _sendAjaxRequest(urlStr){

	siteInspector["GET"] = parseGetParams( urlStr );

	if( !siteInspector["GET"]["domain"] ||
			siteInspector["GET"]["domain"].length === 0) {
console.log("error, empty domain...");
		return false;
	}
	if( !siteInspector["GET"]["q"] ||
			siteInspector["GET"]["q"].length === 0) {
console.log("error, empty action...");
		return false;
	}

	var siteAction = siteInspector["GET"]["q"];

	var urlTpl = "/site_inspector/app.php?q={{action}}";
	var _url = urlTpl.replace("{{action}}", siteAction);

	var _data = {
		"site_domain": siteInspector["site_domain"]
	};

	if( typeof siteInspector.beforeRequest[siteAction] === "function"){
			var result = siteInspector.beforeRequest[siteAction]();
			if(!result){
				return false;
			}
	}

	if(siteAction === "add-site"){
		var options = {
			"taskList": []//["availability", "checkSSL"]
		};

		//read task checkbox flag
		var taskCheckboxes = siteInspector.adminPanel.find("input[type=checkbox]");
		taskCheckboxes.each(function(index, value){
			if( value.checked ){
				options["taskList"].push(value.name);
			}
		});//next

		if( options["taskList"].length === 0){
			var msg = siteInspector.messages["no-tasks"];
console.log(msg);
			//siteInspector.notify.error(msg);
			_alert({
				"message" : msg,
				"level": "warning"
			});
			return false;
		}

		siteInspector["options"] = options;

		var siteList = {};
		var	siteDomain = siteInspector["site_domain"];
		siteList[siteDomain] = siteInspector["options"];
	//console.log(siteList);
		_data["site_list"] = siteList;
	}


	if(siteAction === "update-site-options"){
		_data["options"] = {
			"taskList": []//["availability", "checkSSL"]
		};
		//read task checkbox flag
		var taskCheckboxes = siteInspector.adminPanel.find("input[type=checkbox]");
		taskCheckboxes.each(function(index, value){
			if( value.checked ){
				_data["options"]["taskList"].push(value.name);
			}
		});//next
		siteInspector["options"] = _data["options"];
	}

	$.ajax({
			type: "POST",
			url: _url,
			dataType: "json",
			data: _data
	})
	.done(function(res) {
console.log(res);
		if( res.status ){
			var siteAction = siteInspector["GET"]["q"];
			if( typeof siteInspector.requestDone[siteAction] === "function"){
				siteInspector.requestDone[siteAction](res.data);
			}
		}
	})

	.fail(function(xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
console.log("textStatus:" + textStatus);
	})

	.always(function() {
//console.log("request complete...", arguments);
	});

}//end
*/


if( typeof window.jQuery === "function"){
//var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
//_log(msg);
	$(document).ready(function(){
//console.log("-- document.readyState = " + document.readyState);

		//ввод только цифр
		$('.only-numbers').on('keydown', function(event) {
//console.log("event.keyCode = " + event.keyCode );
			if (event.keyCode == 13) {
				return;
			}

			if ( event.keyCode == 46 ||
				event.keyCode == 8 ||
				event.keyCode == 9 ||
				event.keyCode == 27 ||
					(event.keyCode == 65 && event.ctrlKey === true) ||
						(event.keyCode >= 35 && event.keyCode <= 39)
			) {
				return;
			} else {
				if ( (event.keyCode < 48 || event.keyCode > 57) &&
					(event.keyCode < 96 || event.keyCode > 105 )
				) {
					event.preventDefault();
				}
			}
		});

		//------------------------- scroll to top
		$("#scroll-to-top").click(function(e) {
			e.preventDefault;
			$('html,body').animate({
				scrollTop: 0
				}, 500);
			return false;
		});

		$(".scroll-to").addClass("nolink").on("click", function(){
			if($(this).attr("href")){
				var id = $(this).attr("href");
			} else {
				var id = "#" + $(this).attr("data-target");
			}
//console.log("id: " , id);

			//$('body').scrollTo( elem, 800, {offset: -50});//need jquery.scrollTo-1.4.3.1-min.js!!!!

			var start_scroll_pos = $(id).offset().top;// Get  start position for scroll block
//console.log("start_scroll_pos: " , start_scroll_pos);

			$('html,body').animate({
				scrollTop: start_scroll_pos
				}, 500);
			return false;
		});

	/*
		$(".fancybox").fancybox({
			helpers : {
				overlay : {
					locked : false
				}
			}
		});
*/
//------------------------------ Image load error
		$("img").on("load", function( e ){
console.log("-- image load event....", e.target.src);
		});

		$("img").on("error", function( e ){
console.log("-- image load error", e.target.src);
			//var src = $(this).attr("src");
			//var new_src = sitecontent + src;
//console.log("fixing image source = " + new_src);
			//$(this).attr("src", new_src);
			//$("body").attr("data-image-load-error","1");
			//load_img_error( $(this)[0] );
		});

/*
	$("img").on("load", "#insert-json", function( e ){
console.log("image load event", e);
	});

	$("img").on("error", "#insert-json", function( e ){
console.log("image load error", e);
		//var src = $(this).attr("src");
		//var new_src = sitecontent + src;
//console.log("fixing image source = " + new_src);
		//$(this).attr("src", new_src);
	});
*/
//---------------------- load images handlers


	});//end ready

	$(window).scroll(function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );

			//if ( $(this).scrollTop() > start_scroll_pos  ) {
				//$("#btn-scroll-to-top").show();
			//}

			//if ( $(this).scrollTop() < end_scroll_pos ) {
				//$("#btn-scroll-to-top").hide();
			//}
	});//end scroll

}
