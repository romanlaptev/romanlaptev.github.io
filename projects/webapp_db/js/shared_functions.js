//console.log for old IE
if (!window.console){ 
	window.console = {
		"log" : function( msg ){
			var log = getDOMobj("log");
			if(log){
				log.innerHTML += msg +"<br>";
			} else {
				alert(msg);
				//document.writeln(msg);
			}
		}
	}
};


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
	
	var output = getDOMobj(id);
	if( output ){
	
		if( msg.length == 0){
			output.innerHTML = "";
		} else {
			output.innerHTML += msg;
		}
		
	} else {
		console.log(msg);
		//alert(msg);
		//document.writeln(msg);
	}
}//end _log()

function getDOMobj(id){
	
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
}//end getDOMobj()

//**************************************
//$_GET = parseGetParams(); 
//console.log( $_GET);
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//**************************************
function parseGetParams() { 
   var $_GET = {}; 
   var parse_url = window.location.search.substring(1).split("&"); 
   for(var n = 0; n < parse_url.length; n++) { 
      var getVar = parse_url[n].split("="); 
      //$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
	  if( typeof(getVar[1])=="undefined" )
	  {
		$_GET[ getVar[0] ] = "";
	  }
	  else
	  {
		$_GET[ getVar[0] ] = getVar[1];
	  }
   } 
   return $_GET; 
}//end parseGetParams() 


function getXMLDocument(url)  {  
	var xml;  
	if(window.XMLHttpRequest) {  
		xml=new window.XMLHttpRequest();  
		xml.open("GET", url, false);  
		xml.send("");  
		//alert (xml.responseText);
		return xml.responseXML;  
	}  else  {
		if(window.ActiveXObject) {  
			xml=new ActiveXObject("Microsoft.XMLDOM");  
			xml.async=false;  
			xml.load(url);  
			return xml;  
		}  else  {  
			alert("Загрузка XML не поддерживается браузером");  
			return null;  
		}  
	}
}//end getXMLDocument


/*
	runAjax( {
		"requestMethod" : "GET", 
		"url" : _vars["db_url"], 
		"callback": _postFunc
	});
*/
function runAjax( opt ){
//console.log(arguments);
	
	var options = {
		"requestMethod" : "GET", 
		"url" : false, 
		"params": "",
		"async" :  true,
		"callback" : null
	};
	//extend options object
	for(var key in opt ){
		options[key] = opt[key];
	}
//console.log(options);

	var requestMethod = options["requestMethod"]; 
	var url = options["url"]; 
	var async = options["async"]; 
	var callback = options["callback"]; 
	
	if( !url || url.length === 0){
		var msg = "Parameters error, needed 'url'";			
console.log( msg );
//_log( "<p  class='text-danger'>" +msg+"</p>");
		return false;
	}
	
	var xhr = _createRequestObject();

	if ( !xhr ) {
console.log("error, ", xhr);
		var msg = "_createRequestObject() error";			
console.log( msg, xhr );
//_log( "<p  class='text-danger'>" +msg+"</p>");
		return false;
	}
	
	var timeStart = new Date();
	
	xhr.open( requestMethod, url, async );
	xhr.onreadystatechange  = function() { 
//console.log("state:", xhr.readyState);
		if( xhr.readyState == 4) {
//console.log( xhr  );
//for(var key in xhr){
//console.log( key +" : "+xhr[key] );
//}

//console.log("end request, state " + xhr.readyState + ", status: " + xhr.status);
				if( xhr.status === 200){
					
//console.log(xhr.getResponseHeader('X-Powered-By') );
					var all_headers = xhr.getAllResponseHeaders();
//console.log( all_headers );
					
				var timeEnd = new Date();
				var runtime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
var msg = "ajax load url: " + url + ", runtime: " + runtime +" sec";
console.log(msg);
//console.log( xhr.responseText );
//console.log( xhr.responseXML );
					if( typeof callback === "function"){
						
						if( xhr.responseXML ){
//var test = xhr.responseXML.selectNodes("//pma_xml_export");	
//var test = xhr.responseXML.getElementsByTagName("database");
//console.log( test.item(0).nodeName);
							var data = xhr.responseXML;
							callback(data);
						} else {
							var data = xhr.responseText;
							callback(data);
						}
					}

				} else {
console.log(xhr);					
_log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
_log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
_log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
				}
				
		}
	};
	
	// if( xhr.onabort ){
		// xhr.onabort = function(){
// _log("ajax onabort");
// //console.log(arguments);
		// }
	// }
// console.log( "xhr.onabort " + xhr.onabort  );

	// if( xhr.onerror ){
		// xhr.onerror = function(){
// _log("ajax onerror");
// console.log(arguments);
// console.log(xhr);					
// _log("<p>Ajax load error, url: <b class='text-danger'>" + xhr.responseURL + "</b></p>");
// _log("<p>Ajax load error, status: <b class='text-danger'>" + xhr.status + "</b></p>");
// _log("<p>Ajax load error, statusText: <b class='text-danger'>" + xhr.statusText + "</b></p>");
		// }
	// }
// console.log( "xhr.onerror " + xhr.onerror  );

	// if( xhr.onload ){
		// xhr.onload = function(){
// _log("ajax onload");
// console.log(arguments);
		// }
	// }
// console.log( "xhr.onload " + xhr.onload  );

	// if( xhr.onloadstart ){
		// xhr.onloadstart = function(){
// _log("ajax onloadstart");
// console.log(arguments);
		// }
	// }
// console.log( "xhr.onloadstart " + xhr.onloadstart  );

//console.log( "onprogress" in xhr  );
//console.log( xhr.responseType, typeof xhr.responseType );
//console.log( window.ProgressEvent, typeof  window.ProgressEvent);
	if( "onprogress" in xhr ){
		xhr.onprogress = function(e){
//console.log("ajax onprogress");
//console.log(arguments);
			var percentComplete = 0;
			if(e.lengthComputable) {
				percentComplete = Math.ceil(e.loaded / e.total * 100);
			}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
			if( document.getElementById("load-progress") ){
				document.getElementById("load-progress").value = percentComplete;
			}
		}
		
		//xhr.addEventListener('progress', function(e) {
//console.log("ajax onprogress", e);
		//}, false);
		
//console.log( "xhr.onprogress ", xhr.onprogress);
//console.log( "xhr.onprogress ", xhr.onprogress.handleEvent  );
	}

		
//console.log( "setRequestHeader" in xhr  );
	// if (xhr.setRequestHeader) {
		// xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// }
	// var str = '';
	//xhr.send(str);
	xhr.send();

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


if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);
	$(document).ready(function(){
		
	});//end ready	
}
