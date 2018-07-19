import {dataStore} from "./components/DataStore";

//export function sayHi() {
  //alert("Hello!");
//};

export function eventHandler( event ){	
//console.log("dataStore.eventHandler()", event);
	//e.preventDefault();		
//<a href="#?q=view-container&id=79"
	//window.location.hash = "";
	
	urlManager( event.target.href );

};//end eventHandler()



export function urlManager( path ){
//console.log( "_urlManager()", arguments);

	var p = path.split("?");
	var parseStr = p[1]; 
//console.log( "_urlManager()", p, parseStr );
	
	if( !parseStr || parseStr.length === 0 ){
console.log( "Warn! error parse url in _urlManager()."  );
		return;
	}

	dataStore["GET"] = _parseGetParams( parseStr ); 
	var $_GET = _parseGetParams(parseStr); 
//console.log( $_GET);

	switch( $_GET["q"] ){
		case "view-container":
			if( $_GET["id"] ){
				dataStore.components["Container"]._getContainerByID( $_GET["id"], dataStore.jsonObj, 
					function( res, _this ){
//console.log("CHANGE container:", res, _this);
//console.log( res["id"], res["title"] );
						dataStore.components["Container"].setState({
							container: res
						});

						//UPDATE Breadcrumb								
						dataStore.components["Container"].props.updateState({
							"title": res["title"],
							"id": "container_" + res["id"]
						}, "updateBreadcrumb");

				});
			}
		break;
		
		case "clear-log":
			document.querySelector("#log").innerHTML = "";
			document.querySelector("#log-wrap").style.display = "none";
		break;
		
		case "get-json":

			if( !dataStore["dataUrl"] || dataStore["dataUrl"].length === 0){
dataStore.logMsg = "error, not defined 'dataUrl' "
//_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log(dataStore.logMsg);
			} else {
				loadJson( dataStore["dataUrl"], function(jsonStr){
//console.log("jsonStr:", jsonStr);
					parseJSON( jsonStr );
				});
			}
		break;

		
		default:
console.log("function _urlManager(),  GET query string: ", $_GET );
		break;
		
	}//end switch
	
}//end _urlManager

function _parseGetParams( parseStr ) { 

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		parse_url = parseStr.split("&"); 
	}
//console.log(parse_url);
	
	var $_GET = {}; 
	for(var n = 0; n < parse_url.length; n++) { 
	var getVar = parse_url[n].split("="); 
		//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
		if( typeof(getVar[1]) === "undefined" ){
			$_GET[ getVar[0] ] = "";
		} else {
		 $_GET[ getVar[0] ] = getVar[1];
		}
	}//next
	return $_GET; 
}//end parseGetParams() 




export function parseDate( _date ){
	var timestamp = _date / 1000;
	var date = new Date();
	date.setTime( timestamp);
//console.log( date );

	var sYear = date.getFullYear();
	
	var sMonth = date.getMonth() + 1;
//console.log( sMonth, typeof sMonth );
	if( sMonth < 10){
		sMonth = "0" + sMonth;
	}
	
	var sDate = date.getDate();
	if( sDate < 10){
		sDate = "0" + sDate;
	}
	
	var sHours = date.getHours();
	if( sHours < 10){
		sHours = "0" + sHours;
	}
	
	var sMinutes = date.getMinutes();
	if( sMinutes < 10){
		sMinutes = "0" + sMinutes;
	}
	
	var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;

	return dateStr;
}//end parseDate()



function loadJson(url, postFunc){

//dataStore.logMsg = "loadJson()"+url;
//console.log(dataStore.logMsg);

	if( dataStore["waitWindow"] ){
		dataStore["waitWindow"].style.display="block";
	}

	runAjax( {
		"requestMethod" : "GET", 
		"url" : url, 
		"onProgress" : function( e ){

			var percentComplete = 0;
			if(e.lengthComputable) {
				percentComplete = Math.ceil(e.loaded / e.total * 100);
			}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

			if( dataStore.loadProgressBar ){
				dataStore.loadProgressBar.className = "progress-bar";
				dataStore.loadProgressBar.style.width = percentComplete+"%";
				dataStore.loadProgressBar.innerHTML = percentComplete+"%";
			}

		},//end callback function
		
		"onError" : function( xhr ){
console.log( "onError ", xhr);
		},//end callback function
		
		"onLoadEnd" : function( headers ){
//console.log( "onLoadEnd ", headers);
			if( dataStore["waitWindow"] ){
				dataStore["waitWindow"].style.display="none";
			}
		},//end callback function
		
		"callback": function( data, runtime ){
dataStore.logMsg = "load " + dataStore.dataUrl  +", runtime: "+ runtime +" sec";
_log("<div class='ant-alert ant-alert-info'>" + dataStore.logMsg + "</div>");
//console.log( dataStore.logMsg );

//console.log( "_postFunc(), " + typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}

/*
//setTimeout(function(){
			if( dataStore["waitWindow"] ){
				dataStore["waitWindow"].style.display="none";
			}
//}, 1000*3);
*/

			if( data.length > 0){
				if( typeof postFunc === "function"){
					postFunc(data);
				}
			} else {
dataStore.logMsg = "error, no JSON data in " + dataStore.dataUrl;
_log("<p class='ant-alert ant-alert-error'>" + dataStore.logMsg + "</p>");
console.log( dataStore.logMsg );
			}

		}//end callback()
	});

}//end loadJson()



function parseJSON( jsonStr ){
	try{
		var jsonObj = JSON.parse( jsonStr, function(key, value) {
//console.log( key, value );
			return value;
		});
	} catch(error) {
dataStore.logMsg = "error, error JSON.parse server response data...." ;
console.log( dataStore.logMsg );
_log("<div class='ant-alert ant-alert-error'>" + dataStore.logMsg + "</div>");
		return false;
	}//end catch
	
//--------------------------------

	dataStore["dateAdded"] = parseDate( jsonObj["dateAdded"] );
	dataStore["lastModified"] = parseDate( jsonObj["lastModified"] );
	dataStore.logMsg = "dateAdded : " + dataStore["dateAdded"] + ", lastModified : " + dataStore["lastModified"];
	_log("<div class='ant-alert ant-alert-info'>" + dataStore["logMsg"] + "</div>");
	
//--------------------------------
	dataStore.jsonObj = jsonObj;
	
	//first level bookmarks container
	var id = getInitId( dataStore.initContainerName);
//console.log("Init Id:", id);
	if(id > 0){
		var initContainerUrl = dataStore.urlViewContainer.replace("{{id}}",id);
		urlManager( initContainerUrl );		
	}
	
}//end parseJSON



	//getInitId = ( containerName ) => {
	function getInitId( containerName ){

		var initId = dataStore.jsonObj["children"].find( function( element, index){
			if( element["root"] === containerName ){
				return true;
			}
		}, this);//end filter

//console.log("getInitId()", containerName, initId, typeof initId);

		if(initId){
			return initId["id"];
		} else {
			return false;
		}
	}//end getInitId

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
//console.log("runAjax()", opt);

	var p = {
		"requestMethod" : "GET", 
		"responseType" : "", //arraybuffer, blob, document, ms-stream, text
		"enctype" : "application/x-www-form-urlencoded",
		//"enctype" : "multipart/form-data",
		"url" : false, 
		"params": null,//params object
		"formData": null,
		"async" :  true,
		"callback" : null,
		"onProgress" : null,
		"onError" : null,
		"onLoadEnd" : null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	var msg = "";
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
			url += "&noCache=" + (new Date().getTime()) + Math.random(); //no cache
		} else {
			url += "?noCache=" + (new Date().getTime()) + Math.random(); //no cache
		}
	//}
	
	if( !url || url.length === 0){
		msg = "Parameters error, needed 'url'";			
console.log( msg );
		return false;
	}
	
	var xhr = _createRequestObject();

	if ( !xhr ) {
console.log("error, ", xhr);
		msg = "_createRequestObject() error";			
console.log( msg, xhr );
//_log( "<p  class='text-danger'>" +msg+"</p>");
		return false;
	}

/*
	//block overlay and wait window
	var overlay = getById("overlay");
	if( overlay ){
		overlay.className="modal-backdrop in";
		overlay.style.display="block";
	}
	var waitWindow = getById("wait-window");
	if( waitWindow ){
		waitWindow.className="modal-dialog";
		waitWindow.style.display="block";
	}
*/
	
	var timeStart = new Date();

	xhr.open( requestMethod, url, async );
	
	//Check responseType support:
//https://msdn.microsoft.com/ru-ru/library/hh872882(v=vs.85).aspx
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
//Error, "The response type cannot be changed for synchronous requests made from a document."
	// Opera 12 crash!!!!
	// if( "responseType" in xhr && p["async"] ){
		// xhr.responseType = p["responseType"];
	// }
	
	xhr.onreadystatechange  = function() { 
//console.log("state:", xhr.readyState);
		if( xhr.readyState === 4) {
//console.log( xhr  );
//for(var key in xhr){
//console.log( key +" : "+xhr[key] );
//}

//console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
//console.log( "xhr.onerror = ", xhr.onerror  );

/*
//setTimeout(function(){
				//hide block overlay and wait window
				if( overlay ){
					//overlay.className="";
					overlay.style.display="none";
				}
				if( waitWindow ){
					waitWindow.style.display="none";
				}
//}, 1000*3);
*/
					
				if( xhr.status === 200){
					
					var timeEnd = new Date();
					var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
console.log(msg);
//console.log( "xhr.response: ", xhr.response );

// if( "responseType" in xhr){
// // console.log( "xhr.response: ", xhr.response );
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
						
						if( xhr.responseXML ){
//var test = xhr.responseXML.selectNodes("//pma_xml_export");	
//var test = xhr.responseXML.getElementsByTagName("database");
//console.log( test.item(0).nodeName);

							var data = "";
							//fix IE8
//console.log("Content-Type:: " + xhr.getResponseHeader("Content-Type") );
							var contentType = xhr.getResponseHeader("Content-Type");
							if( contentType === "application/xml" ||
								contentType === "text/xml"){
								data = xhr.responseXML;
							} else {
								data = xhr.responseText;
							}

							callback(data, runtime);
						} else {
							data = xhr.responseText;
							callback(data, runtime);
						}
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

// msg += "<p>Ajax load error</p>";
// msg += "<p>url: " + xhr.responseURL + "</p>";
// msg += "<p>status: " + xhr.status + "</p>";
// msg += "<p>status text: " + xhr.statusText + "</p>";
// _log("<div class='alert alert-danger'>" + msg + "</div");

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
		//hide block overlay and wait window
		// if( overlay ){
			// //overlay.className="";
			// overlay.style.display="none";
		// }
		// if( waitWindow ){
			// waitWindow.style.display="none";
		// }
		
		var all_headers = xhr.getAllResponseHeaders();
//console.log( all_headers );
		if( typeof  p["onLoadEnd"] === "function"){
			p["onLoadEnd"](all_headers);
		}
	}//end _loadEnd()
	
//console.log( "onprogress" in xhr  );
//console.log( xhr.responseType, typeof xhr.responseType );
//console.log( window.ProgressEvent, typeof  window.ProgressEvent);
	if( "onprogress" in xhr ){
		xhr.onprogress = function(e){
//console.log("ajax onprogress");
//console.log(arguments);
/*
			var percentComplete = 0;
			if(e.lengthComputable) {
				percentComplete = Math.ceil(e.loaded / e.total * 100);
			}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );

			var loadProgressBar = getById("load-progress-bar");
			if( loadProgressBar ){
				//loadProgress.value = percentComplete;
				loadProgressBar.className = "progress-bar";
				loadProgressBar.style.width = percentComplete+"%";
				loadProgressBar.innerHTML = percentComplete+"%";
			}
*/
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

//console.log(xhr.upload);
	if( xhr.upload ){
		
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
/*
		if(!request){ // IE
console.log("try use Microsoft.XMLHTTP");		
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(!request){
console.log("try use Msxml2.XMLHTTP");		
			request = new ActiveXObject('Msxml2.XMLHTTP');
		}
*/
		return request;
	}//end _createRequestObject()
	
}//end runAjax()





export function _log( msg, id){
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
	
	var output = getById(id);
	if( output ){	
		if( msg.length === 0){
			output.innerHTML = "";
		} else {
			output.innerHTML += msg;

			 var logWrap = getById("log-wrap");
			 if( logWrap ){
 //console.log(logWrap);
 //console.log(logWrap.style.display);
				 if( logWrap.style.display === "none"){
					 logWrap.style.display="block";
				 }
			 }			
	
		}
		
	} else {
		console.log(msg);
		//alert(msg);
		//document.writeln(msg);
	}
	
	// if( typeof _showHiddenLog === "function"){
// //console.log(_showHiddenLog);
		// _showHiddenLog();
	// }
	
}//end _log()

export function getById(id){
	
	if( document.querySelector ){
		var obj = document.querySelector("#"+id);
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
}//end getById()


export function parseLocalFile( fileList){
console.log("parseLocalFile()", fileList);	
}//end _parseLocalFile
