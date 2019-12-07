var logMsg;
var vars={
//"dataUrl":"https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr"
"dataUrl":"http://romanlaptev.github.io/projects/schedule/data/2019-04-26.json"
//"dataUrl":"http://romanlaptev.github.io/test_code/js/test_json/test_filters_jsonp/phones.json"
};

//window.location.href="https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr";

//console.log("000000000000", webApp.vars["DB"]["dataUrl"]);

//$.getJSON(webApp.vars["DB"]["dataUrl"], function(){
//console.log(arguments);
//});
//my_func({a:1});
/*
  var url = "https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-04-26&transport_types=suburban&system=esr&show_systems=esr";
	//var url = "http://i5/webapps/";
	//var url="https://github.com/romanlaptev/romanlaptev.github.io/tree/master/test_code";

	var tmpElem = document.createElement("div");
	tmpElem.className = "container";

  tmpElem.innerHTML = '<iframe name="test_frame" id="test-frame" src="' + url + '" width="100%" height="40%" onload="getFrameInfo(this)">';

  var frame = tmpElem.firstChild;

	var debug = true;
	if (!debug) {
		frame.style.display = 'none';
	}

	document.body.appendChild(frame);

//for( var key in iframe.contentDocument){
//console.log(key, iframe.contentDocument[key]);
//}
*/

function loadData(){
	var url = url_field.value;
	if( url.length === 0){
		logMsg = "enter url...";
		log.innerHTML += "<p class='alert alert-danger'>" +logMsg+"</p>";
		return;
	}
	
/*
	$.ajax({
		type: "GET",
		url: webApp.vars["DB"]["dataUrl"],
		dataType: "text",
		
		beforeSend: function(XMLHttpRequest){
console.log("ajax beforeSend, ", arguments);
		},				
		
		complete: function(xhr, state){
console.log("ajax load complete, ", arguments);
		},
		
		success: function( data ){
console.log( data );
		},
		
		error: function( data, status, errorThrown ){
console.log( "error", arguments );
		}
	})
	.done(function () {
console.log("$.ajax, Done...");
	})
	.fail(function (xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
console.log("textStatus:" + textStatus);
	});
*/	
	try{
		var xhr = new XMLHttpRequest();
		
		//xhr.open("GET", "https://cors-anywhere.herokuapp.com/"+url, true);
		xhr.open("GET", url, true);
		
		//xhr.setRequestHeader("authorization", "Token xxxxxx");
		//xhr.setRequestHeader("Version", "1");
		//xhr.setRequestHeader("Origin", "http://vbox5");
		//xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
		xhr.responseType = "json";
		
		xhr.onreadystatechange  = function(e){
console.log("event type:" + e.type +", state " + xhr.readyState + ", status: " + xhr.status);
			if( xhr.readyState == 4) {
				if( xhr.status === 200){
console.log( "xhr.response: ", xhr.response );
console.log( "responseType: " + xhr.responseType );
				}
			}
		};
		
		xhr.onload = function(e) {
// console.log(arguments);
console.log("event type:" + e.type);
// console.log("time: " + e.timeStamp);
// console.log("total: " + e.total);
// console.log("loaded: " + e.loaded);	
console.log( this.response );
			//var ins = document.querySelector("#insert-data");
			//ins.innerHTML = this.responseText;
		}//end onload
		
		xhr.onerror = function() {
console.log(arguments);		
			logMsg =  "error, status: " + this.status;
			log.innerHTML += "<p class='alert alert-danger'>" +logMsg+"</p>";
		}
		
		xhr.onloadend = function(e){
//console.log(xhr.getResponseHeader('X-Powered-By') );
console.log( xhr.getAllResponseHeaders() );

			// try{
				// logMsg =  "Access-Control-Allow-Origin: " + xhr.getResponseHeader("Access-Control-Allow-Origin");
				// log.innerHTML += "<p class='alert alert-info'>" +logMsg+"</p>";
			// } catch(e){
// console.log(e);	
			// }
			
		}//end onloadend
		
		xhr.send();
		
	} catch(e){
console.log(e);	
	}	
	
}//end loadData()



	function _serverRequestAppDate( postFunc ){
//console.log( webApp.vars["userDataUrl"] );
//console.log( webApp.vars["userDataUrl"].value );
		// if( webApp.vars["userDataUrl"].value.length > 0){
			// webApp.vars["dataUrl"] = webApp.vars["userDataUrl"].value;
		// }
	
		// if( !webApp.vars["dataUrl"] ||
			// webApp.vars["dataUrl"].length === 0 ){
// webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
// _alert( webApp.vars["logMsg"], "error");
// //console.log( webApp.vars["logMsg"] );
			// return false;
		// }
		var url = url_field.value;
		if( url.length === 0){
			logMsg = "enter url...";
			log.innerHTML += "<p class='alert alert-danger'>" +logMsg+"</p>";
			return;
		}

		runAjax( {
			"requestMethod" : "GET", 
			"url" : url, 
			//"noCache" : true,
			//"responseType":"json",
			
			"onProgress" : function( e ){
				var percentComplete = 0;
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
			},
				
			"onLoadEnd" : function( headers, xhr ){
console.log( headers );
//console.log(xhr.getResponseHeader("last-modified") );
					//var serverDate = new Date( xhr.getResponseHeader("last-modified") );
					//webApp.vars["cache"]["serverDate"] = serverDate;
			},
			
			"onError" : function( xhr ){
console.log( "onError ", arguments);

				if( typeof postFunc === "function"){
					postFunc();
				}
				//return false;
			},

			"callback": function( data, runtime ){
// webApp.vars["logMsg"] = "load <b>" + webApp.vars["dataUrl"]  +"</b>, runtime: "+ runtime +" sec";
// _alert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );

console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
				if( typeof postFunc === "function"){
					postFunc(data);
				}

			}//end callback()
		});
	}//end _serverRequestAppDate()				



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
function runAjax( opt ){
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
		"async" :  true,
		"callback" : null,
		"onProgress" : null,
		"onError" : null,
		"onLoadEnd" : null,
		"noCache" : false
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
console.log(p);

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
			//url += "&noCache=" + (new Date().getTime()) + Math.random(); //no cache
		} else {
			//url += "?noCache=" + (new Date().getTime()) + Math.random(); //no cache
		}

		if( p["noCache"] ){
			if( url.indexOf("?") !== -1 ){
				url += "&noCache=" + (new Date().getTime()) + Math.random(); //no cache
			} else {
				url += "?noCache=" + (new Date().getTime()) + Math.random(); //no cache
			}
		}
		
	//}


	if( !url || url.length === 0){
		var msg = "Parameters error, needed 'url'";			
console.log( msg );
//_log( "<p  class='text-danger'>" +msg+"</p>");
		return false;
	}

	
	var xhr = _createRequestObject();
console.log(xhr);

	if ( !xhr ) {
console.log("error, ", xhr);
		var msg = "_createRequestObject() error";			
console.log( msg, xhr );
//_log( "<p  class='text-danger'>" +msg+"</p>");
		return false;
	}

	var timeStart = new Date();

	xhr.open( requestMethod, url, async );
	
	//Check responseType support:
//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
//Error, "The response type cannot be changed for synchronous requests made from a document."
	// Opera 12 crash!!!!
	if( "responseType" in xhr && p["async"] ){
		xhr.responseType = p["responseType"];
	}


	xhr.onreadystatechange  = function() { 
//console.log("state:", xhr.readyState);
		if( xhr.readyState == 4) {
//console.log( xhr  );
//for(var key in xhr){
//console.log( key +" : "+xhr[key] );
//}

console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
//console.log( "xhr.onerror = ", xhr.onerror  );

					
				if( xhr.status === 200){
					
					var timeEnd = new Date();
					var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
console.log(msg);
//console.log( "xhr.response: ", xhr.response );

					if( "responseType" in xhr){
					// // console.log( "xhr.response: ", xhr.response );
console.log( "responseType: " + xhr.responseType );
					}

					try{
console.log( "xhr.responseText: ", xhr.responseText );
					} catch(e){
console.log( e );
					}

					try{
console.log( "xhr.responseXML: ", xhr.responseXML );
					} catch(e){
console.log( e );
					}

					if( typeof callback === "function"){
						
							var data = xhr.response;
							//fix IE8
//console.log("Content-Type:: " + xhr.getResponseHeader("Content-Type") );
							var contentType = xhr.getResponseHeader("Content-Type");
							if( contentType === "application/xml" ||
								contentType === "text/xml"){
								data = xhr.responseXML;
							} 
							
							if( contentType === "text/plain"){
								data = xhr.responseText;
							} 
							
							callback(data, runtime);
					}
					//if browser not define callback "onloadend"
					var test = "onloadend" in xhr;
					if( !test ){
						_loadEnd();
					}

				} else {
//console.log(xhr);					
console.log("Ajax load error, url: " + xhr.responseURL);
console.log("status: " + xhr.status);
console.log("statusText:" + xhr.statusText);

					if( typeof  p["onError"] === "function"){
						p["onError"](xhr);
					}
					
	// if( !"onloadend" in xhr ){
			// _loadEnd();
		// }//end event callback
	// }
					
				}
				
		}
	};//end xhr.onreadystatechange

	
	if( "onloadstart" in xhr ){
		xhr.onloadstart = function(e){
//console.log(arguments);
console.log("event type:" + e.type);
// console.log("time: " + e.timeStamp);
// console.log("total: " + e.total);
// console.log("loaded: " + e.loaded);
		}
	}

	if( "onload" in xhr ){
		xhr.onload = function(e){
//console.log(arguments);
console.log("event type:" + e.type);
// console.log("time: " + e.timeStamp);
// console.log("total: " + e.total);
// console.log("loaded: " + e.loaded);
		}
	}

	if( "onloadend" in xhr ){
		xhr.onloadend = function(e){
//console.log(arguments);
console.log("event type:" + e.type);
// console.log("time: " + e.timeStamp);
// console.log("total: " + e.total);
// console.log("loaded: " + e.loaded);
//console.log(xhr.getResponseHeader('X-Powered-By') );
			_loadEnd();
		}//end event callback
	}
	
	
	function _loadEnd(){
		var all_headers = xhr.getAllResponseHeaders();
//console.log( all_headers );
		if( typeof  p["onLoadEnd"] === "function"){
			p["onLoadEnd"](all_headers, xhr);
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
console.log("event type:" + e.type);
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


console.log(xhr.upload, typeof xhr.upload);
	if( xhr.upload ){
		
		// xhr.upload.onerror = function(e){
// console.log(arguments);
// console.log("event type:" + e.type);
// console.log("time: " + e.timeStamp);
// console.log("total: " + e.total);
// console.log("loaded: " + e.loaded);
		// };
/*	
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
	if( requestMethod !== "POST"){
		xhr.send();
	} else {

		//http://learn.javascript.ru/xhr-forms
		//form POST body
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
		} else {
			xhr.send( p["formData"] );
		}
	}


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
	
}//end runAjax()



/*
			$.ajax({
				type: "GET", 
				url: "js/test.js",
				dataType:"jsonp",
				jsonpCallback: 'my_func',
				//async: false,
				//contentType: "application/json",
				//jsonp: 'callback',
				//crossDomain: true,
				success: function ( data ){
console.log(data);
					//form_content ( data );
				},
					error:function( data, status, errorThrown ){
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
				}
			});	
*/


var loadFrame = function(){
	var iframe_src = document.querySelector("#iframe-src");
	var url = iframe_src.value;
console.log(url);
	if( url.length === 0){
		logMsg = "enter url...";
		log.innerHTML += "<p class='alert alert-danger'>" +logMsg+"</p>";
		iframe_src.className += " invalid";
		return;
	}

	
//console.log( test_frame );
	try	{
		var iframe = window.frames[ test_frame.name ];
//for(var item in iframe)
//{
//console.log( item +" = "+ iframe[item]);
//}
//alert (document.all.test_frame.src);
//alert (iframe.location);
		iframe.location = iframe_src.value;
//alert (frames[0].document.body.innerHTML);
//alert( iframe.document.body.innerHTML );
	}
	catch(e){
		logMsg = "<p class='alert alert-danger'><b>error</b>: " + e.message + "</p> ";
		log.innerHTML += "<p>" +logMsg+"</p>";
console.log(e);
	}
}//end loadFrame()

function getFrameInfo( frame_tag ){
console.log( frame_tag );

	//var iframe = window.frames[ frame_tag.name ];
	var iframe = frame_tag.contentWindow;	

	logMsg = "<p class='alert alert-info'><b>Main page domain</b> = " + document.domain +"</p>";
	log.innerHTML += logMsg;
	
	try{
		logMsg = "<b>iframe location</b> = " + iframe.location;
		log.innerHTML += "<p class='alert alert-info'> " + logMsg + "</p>";
//console.log( iframe.location );
		if( iframe.location.href === "about:blank"){
			return;
		}
	}
	catch(e){
		logMsg = "<b>iframe location, access error</b>: " + e.message;
		log.innerHTML += "<p class='alert alert-danger'> " + logMsg + "</p>";
		log.innerHTML += "<p class='alert alert-danger'> " + e + "</p>";
console.log(e);
		return;
	}


	try{
		logMsg = "<b>iframe.document</b> = " + iframe.document;
		logMsg += "<ul>";
		for(var item in iframe.document){
			logMsg += "<li>"+item +" : "+ iframe.document[item]+"</li>";
console.log( item +" = "+ iframe.document[item]);
		}
		logMsg += "</ul>";
		log.innerHTML += "<p class='alert alert-info'> " + logMsg + "</p>";
//alert( iframe_name.document.body.innerHTML );
	} catch(e) {
		logMsg = "<b>iframe.document, access error</b>: " + e.message;
		log.innerHTML += "<p class='alert alert-danger'> " + logMsg + "</p>";
console.log(e);
	}

	try{
		logMsg = "<b>frame_tag.contentDocument.body.innerHTML:</b>" + frame_tag.contentDocument.body.innerHTML;
		log.innerHTML += "<p class='alert alert-success'> " + logMsg + "</p>";
console.log( frame_tag.contentDocument.body.innerHTML );
	} catch(e) {
console.log(e);
	}
	
//      window.frames['content_frame'].document.write ('hello frame');
   //document.all.filelist.src="file:///mnt/terra/clouds/cloud_mail/music/";
   
//alert ( window.frames['filelist'].document.body.innerHTML );
//console.log( window.frames['filelist'].document.body.innerHTML );

//var iframe = document.getElementsByTagName('iframe')[0];
//var iframeDoc = iframe.contentWindow.document;
//alert ( iframeDoc.document.body.innerHTML );

	//alert($('#filelist').contents().find('body').html());		
/*
	var frame = window.frames['filelist'];		
	//var frame = frame2.context.body;		
	for (item in frame)
	{
console.log(  "frame["+ item +"] =" + frame[item] );
	}
*/
}//end getFrameInfo()