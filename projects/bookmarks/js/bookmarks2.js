var webApp = {
	"vars" : {
		"app_title" : "Firefox bookmarks",
		//"log" : [],
		"logMsg" : "",
		"data_url" : "db/bookmarks.json",
		//"data_url" : "db/lib.json",
		//"templates_url" : "tpl/templates.xml",
		"GET" : {},
		"pageContainer" : getById("page-container"),
		"btnParse" : getById("btn-parse"),
		//"wait" : getById("wait"),
		//"waitWindow" : getById("wait-window"),
		//"loadProgress" : getById("load-progress"),
		//"loadProgressBar" : getById("load-progress-bar"),
		//"saveProgressBar" : getById("save-progress-bar")
	},
	
	"init" : function( postFunc ){
console.log("init webapp!", arguments);
console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.app.init();
		
		var app_title = getById("app-title");
		if( app_title){
			app_title.innerHTML = this.vars["app_title"];
		}
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
	},//end init()
	
	"app" : _app(),
	//"run" : _runApp
};//end webApp()
console.log(webApp);

//==================================
function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"init_url" : "#?q=parse-json",
	};// _vars
	
	var _init = function( opt ){
console.log("init app!");
		defineEvents();
	};//end _init()
	
	function defineEvents(){
//console.log( webApp.vars.pageContainer );
		if( webApp.vars.pageContainer ){
			webApp.vars.pageContainer.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
//console.log( this );//page-container
//console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
				//event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
				//event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
				
				if( target.tagName === "A"){
					if ( target.href.indexOf("#") !== -1){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							var search = target.href.split("?"); 
							var parseStr = search[1]; 
//console.log( search, parseStr );
							if( parseStr.length > 0 ){
								webApp.vars["GET"] = parseGetParams( parseStr ); 
								webApp.app.urlManager( target );
							} else {
console.log( "Warn! error parse url in " + target.href );
							}
					}
				}
				
			}//end event
		}

		if( webApp.vars.btnParse ){
			webApp.vars.btnParse.onclick = function( event ){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );

				$("#serviceModal").modal("hide");

				if( target.tagName === "A"){
					if ( target.href.indexOf("#") !== -1){
							if (event.preventDefault) { 
								event.preventDefault();
							} else {
								event.returnValue = false;				
							}

								var search = target.href.split("?"); 
								var parseStr = search[1]; 
//console.log( search, parseStr );
								if( parseStr.length > 0 ){
									webApp.vars["GET"] = parseGetParams( parseStr ); 
									webApp.app.urlManager( target );
								} else {
	console.log( "Warn! error parse url in " + target.href );
								}
					}
				}
				
			}//end event
		}

	}//end defineEvents()


	function _urlManager( target ){
//console.log(target);
		switch( webApp.vars["GET"]["q"] ) {
			
			case "hide-log":
				var log = getById("log-wrap");
				log.style.display="none";
			break;
			case "view-log":
				var log = getById("log-wrap");
				log.style.display="block";
			break;
			case "toggle-log":
				var log = getById("log-wrap");
//console.log(log.style.display);
				if( log.style.display==="none"){
					log.style.display="block";
				} else {
					log.style.display="none";
				}
			break;
			
			case "clear-log":
				var log = getById("log");
				log.innerHTML="";
			break;
			
			case "parse-json":
				var log = getById("log");
				
				if( webApp.vars["data_url"] && webApp.vars["data_url"].length > 0){
//webApp.vars["logMsg"] = "start parsing...." + webApp.vars["data_url"];
//_log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>");
				} else {
webApp.vars["logMsg"] = "error, not defined 'data_url' "
_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
				}
				
				runAjax( {
					"requestMethod" : "GET", 
					"url" : webApp.vars["data_url"], 
/*					
					"onProgress" : function(e){
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
							if( webApp.vars["loadProgress"] ){
								webApp.vars["loadProgress"].value = percentComplete;
							}
							if( webApp.vars["loadProgressBar"] ){
								webApp.vars["loadProgressBar"].className = "progress-bar";
								webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
								webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							}

						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
					},//end onProgress()
*/					

					"onLoadEnd" : function( headers ){
//console.log( typeof headers, headers );
/*
						if( headers && headers.length > 0){
							var arrHeaders = headers.split("\r\n");
//console.log(arrHeaders);
							var objHeaders = {};
							for( var n = 0; n < arrHeaders.length; n++){
								if( !arrHeaders[n]){
									continue;
								}
								if( arrHeaders[n].length === 0){
									continue;
								}
								var headerStr = arrHeaders[n];
								var arrHeader = headerStr.split(":");
								var key = arrHeader[0];
								var value = arrHeader[1].trim();
								objHeaders[ key ] = value;
							}//next
//console.log(objHeaders);
							webApp.vars["reqHeaders"] = objHeaders;
							if( webApp.vars["reqHeaders"]["Last-Modified"] &&
									webApp.vars["reqHeaders"]["Last-Modified"].length > 0){
webApp.vars["logMsg"] = webApp.vars["data_url"] + ", Last-Modified: " + webApp.vars["reqHeaders"]["Last-Modified"] ;
_log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>");
							}
						}
*/						
					},//end onLoadEnd
					
					"callback": function( data ){
//webApp.vars["logMsg"] = "load " + webApp.vars["data_url"] ;
//_log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>");
//console.log( webApp.vars["logMsg"] );
//console.log( "_postFunc(), " + typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( data.length > 0){
							_parseJSON( data );
						} else {
webApp.vars["logMsg"] = "error, no JSON data in " + webApp.vars["data_url"] ;
_log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
						}
						
					}//end callback()
				});
				
			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()
	
	function _parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( webApp.vars["logMsg"] );
_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
		}//end catch
		
		//webApp.vars["jsonObj"] = jsonObj;
		
//--------------------------------
		webApp.vars["dateAdded"] = __parseDate( jsonObj["dateAdded"] );
		webApp.vars["lastModified"] = __parseDate( jsonObj["lastModified"] );
		webApp.vars["logMsg"] = "dateAdded : " + webApp.vars["dateAdded"] + ", lastModified : " + webApp.vars["lastModified"];
//console.log( webApp.vars["logMsg"] );
_log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>", "insert_json");
		
//--------------------------------
		for( var key in jsonObj ){
//console.log( key, jsonObj[key], typeof jsonObj[key]  );
			var result = jsonObj[key] instanceof Array;
//console.log( key, result );
			if( result && jsonObj[key].length > 0){
				__parseChildren( jsonObj[key] );
			}
		}//next
//console.log( typeof jsonObj.children );
//console.log( jsonObj.children.length );

		function __parseChildren( obj ){
			for( var n = 0; n <  obj.length; n++ ){
//console.log( n, obj[n], typeof obj[n]  );

					var container = obj[n];
					//for( var key in container){
//console.log( key + ": " + container[key], typeof container[key]  );
					//}//next
					
//+ ", dateAdded: "+ __parseDate( container["dateAdded"] )+ 					
_log("<div class='panel panel-primary'>\
<div class='panel-heading'>" + container["title"] +"</div>\
<div class='panel-body'></div>\
</div>", "insert_json");
		
/*
guid: toolbar_____ string
title: Панель закладок string
index: 1 number
dateAdded: 1526981203879000 number
lastModified: 1526981210071000 number
id: 3 number
typeCode: 2 number
type: text/x-moz-place-container string
root: toolbarFolder string
children: [object Object],[object Object] object
*/					

			}//next
		}//end __parseChildren()
		
		function __parseDate( _date ){
//dateAdded: 1472905372954000
//lastModified: 1451313156596000
//"dateAdded":1526981203879000,
//"lastModified":1527031412778000
//var timestamp = 1383256393000;

			var timestamp = _date / 1000;
			var date = new Date();
			date.setTime( timestamp);
	//console.log( date );

			var sYear = date.getFullYear();
			var sMonth = date.getMonth() + 1;
			var sDate = date.getDate();
			var sHours = date.getHours();
			var sMinutes = date.getMinutes();
			var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;

			return dateStr;
		}//end __parseDate()
		
	}//end _parseJSON()
	
	function _loadTemplates( callback ){
//..................
	}//end _loadTemplates()
	
	// function _serverRequest( opt ){
		// var p = {
			// //"date": null,
			// "callback": null
		// };
		
		// //extend options object
		// for(var key in opt ){
			// p[key] = opt[key];
		// }
// console.log(p);		
	// }//end _serverRequest()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		urlManager:	function( target ){ 
			return _urlManager( target ); 
		},
		loadTemplates : _loadTemplates//,
		//serverRequest:	function(opt){ 
			//return _serverRequest(opt); 
		//}
	};
	
}//end _app()

function _runApp(){
	//webApp.app.loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		webApp.init(function(){

			var parseUrl = window.location.search; 
			if( parseUrl.length > 0 ){
				webApp.vars["GET"] = parseGetParams(); 
				webApp.app.urlManager();
			} else {
				if( webApp.app.vars["init_url"] ){
						parseUrl = webApp.app.vars["init_url"].substring(2);
//console.log(parseUrl);					
				}
				webApp.vars["GET"] = parseGetParams( parseUrl ); 
				webApp.app.urlManager();
			}
		
		});//end webApp initialize
	//});
}//end _runApp()

//================================== Start
_runApp();
	
