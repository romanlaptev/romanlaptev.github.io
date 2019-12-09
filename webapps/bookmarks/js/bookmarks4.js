//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);

var webApp = {
	"vars" : {
		"app_title" : "Bookmarks",
		//"log" : [],
		"logMsg" : "",
		
		"dataUrl" : "https://raw.githubusercontent.com/romanlaptev/bookmarks/master/db/bookmarks.json",
		//"dataUrl" : "http://vbox5/2018.11.01",
		//"dataUrl" : "db/bookmarks.json",
		//"dataUrl" : "db/lib.json",
		
		"use_localcache": true,
		"cache" : {
			"dataType" : "json",//xml, csv
			"dbName": "localcache",
			"dataStoreName" : "bookmarks.json",
			"dataTableName" : "bookmarks_json",
			"cacheUpdate": false,
			"dataTableFieldsInfo_webSQL": {"jsonStr" : "TEXT"}
		},
		
		"userDataUrl" : func.getById("user-data-url"),
		"userDataFile" : func.getById("user-data-file"),
		
		"GET" : {},
		"pageContainer" : func.getById("content-column"),
		"insertContainer" : func.getById("insert-json"),
		"btnParse" : func.getById("btn-parse"),
		
		"wait" : func.getById("wait"),
		"waitWindow" : func.getById("win1"),
		"loadProgress" : func.getById("load-progress")	,
		"loadProgressBar" : func.getById("load-progress-bar")	,
		"numTotalLoad" : func.getById("num-total-load"),
		"percentComplete" : func.getById("percent-complete"),
		"totalBytes" : func.getById("total"),
		"totalMBytes" : func.getById("total-mb"),
		"loaded" : func.getById("loaded"),
		"loadInfo" : func.getById("load-info"),
		
		"log" : func.getById("log"),
		"btnToggle" : func.getById("btn-toggle-log"),
		
		"targetHtmlBlockID" : "insert-json",
		
		// "templates" : {
			// "container_tpl" : "<div class='panel panel-primary'>\
// <div class='panel-heading'>\
// <ul class='breadcrumb breadcrumb-custom'>{{breadcrumbs}}</ul></div>\
// <div class='panel-body'>{{children}}</div>\
// </div>",
			// "folder_tpl" : "<div class='folder2'>\
// <a class='' href='#q=view-container&id={{id}}' title='{{tooltip}}'>{{title}}</a>\
// {{annos}}\
// </div>",
			// "link_tpl" : "<div class='link'>\
// <a class='' href='{{uri}}' target='_blank' title='{{tooltip}}'>{{iconuri}}{{title}}</a>\
// {{annos}}\
// </div>",
			// "annos_tpl" : "<div class='annos'>{{annos}}</div>",
			// "iconuri_tpl" : "<img class='icon-uri' src='{{iconuri}}'/>",
			// "tooltip_tpl" : "created: {{dateAdded}}, modified:{{lastModified}}",
			// "breadcrumbs_item_tpl" : "<li><a href='#q=view-container&id={{id}}'>{{title}}</a></li>"
		// },
		
		"breadcrumbs": {},
		"imageNotLoad": "img/image_not_load.png",

		"support" : func.testSupport(),
		
		"timers": {
			"loadData" : {},
			"updateCache": {}
		}
		
	},//end vars{}
	
	"init" : function( postFunc ){
console.log("init webapp!");
//console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.app.init();
		
		if( webApp.vars["userDataUrl"]){
			webApp.vars["userDataUrl"].value = "";
		}
		
		var app_title = func.getById("app-title");
		if( app_title){
			app_title.innerHTML = this.vars["app_title"];
		}
		webApp.vars["loadProgress"].style.display="none";
		
//---------------
		if( webApp.vars["support"]["supportTouch"]){
webApp.vars["logMsg"] = "mobile device, supportTouch:" + webApp.vars["support"]["supportTouch"];
func.logAlert( webApp.vars["logMsg"], "info");
//console.log( webApp.vars["logMsg"] );
		}

//for test
//webApp.vars["support"]["dataStoreType"] = "webSQL";

		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
	},//end init()
	
	"app" : _app()//,
	//"run" : _runApp
};//end webApp()
console.log(webApp);

//==================================
function _getRunTime( timer){
	return ( timer.end.getTime() - timer.start.getTime() ) / 1000;
}//end _getRunTime()

function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	//var _vars = {
		//"	" : "#?q=get-data"
	//};// _vars
	
	var _init = function( opt ){
//console.log("init app!");
		storage.init();// _init_cache
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
					
					//if ( target.indexOf("#?q=") !== -1){
					if ( target.href.indexOf("#q=") !== -1){
						
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}
						
						_getHashParams( target.href );
					}
					
				}
				
			}//end event
		}

		if( webApp.vars.btnParse ){
			webApp.vars.btnParse.onclick = function( event ){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
				
//----------------------
					hideModalWindow();
					
//----------------------
				if( webApp.vars["userDataUrl"].value.length === 0){
					webApp.vars["userDataUrl"].value = "";
webApp.vars["logMsg"] = "error, not find URL, empty input field...";
func.logAlert( webApp.vars["logMsg"], "warning");
					return false;
				}

				if( target.tagName === "A"){
					//if ( target.href.indexOf("#") !== -1){
					//if ( target.href.indexOf("#?q=") !== -1){
					if ( target.href.indexOf("#q=") !== -1){
						
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}
						
						_getHashParams( target.href );
						
					}
				}
				
			}//end event
		}

		$("#btn-clear").on("click", function(e){
//console.log("click...", webApp.vars["userDataUrl"].value);			
			if( webApp.vars["userDataUrl"].value.length > 0){
				webApp.vars["userDataUrl"].value = "";
			}
		});//end event
		
		$(webApp.vars["userDataFile"] ).on("change", function(event){
			event = event || window.event;
console.log("change...", event.target.files);
console.log("FileList support is " + window.FileList , typeof window.FileList);
			if( window.FileList ){
				_parseLocalFile( event.target.files );
			} else {
				webApp.logMsg = "Your browser does not support File API";
				func.logAlert( webApp.logMsg, "warning");
				
//----------------------
				hideModalWindow();
				
				return false;
			}
		});//end event
		
		$("#btn-update-cache").on("click", function(e){
//----------------------
			hideModalWindow();
			
//----------------------
			if( webApp.vars["waitWindow"] ){
				webApp.vars["waitWindow"].style.display="block";
			}
		
			webApp.vars["cache"]["cacheUpdate"] = true;
			webApp.vars["timers"]["updateCache"]["start"] = new Date();
			_serverRequestAppDate( function(data){
//console.log("end update..", data);
				if( webApp.vars["waitWindow"] ){
					webApp.vars["waitWindow"].style.display="none";
				}
				if( data ){
					_parseAjax( data );
				}
				
				webApp.vars["timers"]["updateCache"]["end"] = new Date();
				//webApp.vars["logMsg"] = "Update cache, total runtime: </small>" + _getRunTime( webApp.vars["timers"]["updateCache"] ) + " sec</small>";
				//func.logAlert( webApp.vars["logMsg"], "info");
				
			});
		});//end event
		
		function _getHashParams( url ){
			//var search = target.href.split("?"); 
			//var parseStr = search[1]; 
		//console.log( window.location, url );
			if( url.length > 0 ){
				webApp.vars["GET"] = func.parseHashParams( url ); 
				webApp.app.urlManager();
			} else {
		console.log( "Warn! error parse url in " + url );
			}
		}//end _getHashParams()
		
	}//end defineEvents()


	function _urlManager(){

		if( webApp.vars["GET"]["data_url"] && webApp.vars["GET"]["data_url"].length > 0){
			webApp.vars["dataUrl"] = webApp.vars["GET"]["data_url"];
			webApp.vars["use_localcache"] = false;
		}

		switch( webApp.vars["GET"]["q"] ) {
			
			//case "hide-log":
				//webApp.vars["log"].style.display="none";
			//break;
			//case "view-log":
				//webApp.vars["log"].style.display="block";
			//break;
			
			case "toggle-log":
//console.log(webApp.vars["log"]..style.display);
				if( webApp.vars["log"].style.display==="none"){
					webApp.vars["log"].style.display="block";
					webApp.vars["btnToggle"].innerHTML="-";
				} else {
					webApp.vars["log"].style.display="none";
					webApp.vars["btnToggle"].innerHTML="+";
				}
			break;
		
			case "clear-log":
				webApp.vars["log"].innerHTML="";
			break;
			
			case "view-container": //The container ID search starts with root
//console.log("Start parsing....");				
				if( webApp.vars["wait"] ){
					webApp.vars["wait"].className="modal-backdrop in";
					webApp.vars["wait"].style.display="block";
				}
				
				var id = parseInt( webApp.vars["GET"]["id"] );
				_getContainerByID( id, webApp.vars["jsonObj"] );
				
				//var t = setTimeout(function(){
				//console.log("end of wait..", arguments);				
					if( webApp.vars["wait"] ){
						webApp.vars["wait"].style.display="none";
					}
//console.log("end of parsing..");		
				//}, 1000*3);
			break;

			case "get-data":
				if( webApp.vars["waitWindow"] ){
					//waitWindow.className="modal-dialog";
					webApp.vars["waitWindow"].style.display="block";
				}
			
				webApp.vars["timers"]["loadData"]["start"] = new Date();
if ( window.console ){ 
	if("time" in console){
console.time( "timer_loadData" );
	}
}
				_loadData(function( data ){
						//var t = setTimeout(function(){
//console.log("end of wait..", arguments);				
							if( webApp.vars["waitWindow"] ){
								webApp.vars["waitWindow"].style.display="none";
							}
//console.log("end loading..");		
						//}, 1000*3);
//console.log( data );
						if( data ){
							_parseAjax( data );
							webApp.vars["timers"]["loadData"]["end"] = new Date();
if ( window.console ){ 
	if("timeEnd" in console){
console.timeEnd( "timer_loadData");
	}
}

webApp.vars["logMsg"] = "Load application data, total runtime: </small>" + _getRunTime( webApp.vars["timers"]["loadData"] ) + " sec</small>";
func.logAlert( webApp.vars["logMsg"], "info");
						}
						
				});
				
			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()
	

//======================================= LOAD DATA
function _loadData( postFunc ){
//console.log("_loadData() ", arguments);

		//do not use localcache if requested dataUrl is not the default value
		if( webApp.vars["userDataUrl"].value.length > 0){
			webApp.vars["support"]["dataStoreType"] = false;
		}
		
		if( !webApp.vars["use_localcache"] ){
			webApp.vars["support"]["dataStoreType"] = false;
		} 

		if ( webApp.vars["support"]["dataStoreType"] && webApp.vars["support"]["dataStoreType"].length > 0) {
			
				//Get application data from cache
				storage.getAppData({
					"dataStoreType": webApp.vars["support"]["dataStoreType"],
					"callback": function(data){
//console.log(data);
						if( !data ){
							webApp.vars["cache"]["cacheUpdate"] = true;
							_serverRequestAppDate( postFunc );
						} else {
							if( typeof postFunc === "function"){
								postFunc(data);
							}
						}

					}
				});
/*			
				storage.checkAppData({
					"callback": function( lastModified ){
console.log( "storage.checkAppData(), end process, lastModified: ", lastModified, typeof lastModified);

						if( !lastModified ){
							webApp.vars["cache"]["cacheUpdate"] = true;
							_serverRequestAppDate();
						} 
							
						if( lastModified ){
							if( webApp.vars["support"]["promiseSupport"] ){
	
								__checkDatePromise( lastModified ).then(
								function( cacheUpdate ) {
console.log("cacheUpdate: ", cacheUpdate);

									if( cacheUpdate ){
											webApp.vars["cache"]["cacheUpdate"] = true;
										_serverRequestAppDate();
										
									} else {
										
										//Get application data from cache
										storage.getAppData({
											"callback": function(data){
//console.log(data);												
												if( typeof postFunc === "function"){
													postFunc(data);
												}
												
											}
										});
										
									}
									
								}, 
								function(error){
console.log( "promise reject, ", error );
								});

							} else {
								//.....use jQuery deferred object
							}
							
							if( typeof postFunc === "function"){
								postFunc(false);
							}
						}
							
					}//end callback
				});//end storage.checkAppData()
*/				
		}
		
		if ( !webApp.vars["support"]["dataStoreType"] || webApp.vars["support"]["dataStoreType"].length === 0) {
			_serverRequestAppDate( postFunc );
		}
		
		return false;
		
/*		
		//function __checkDatePromise( dateStr ){
		function __checkDatePromise( cacheDate ){
//console.log("test2: ", cacheDate, typeof cacheDate);

			return new Promise( function(resolve, reject) {
				//get cache date, yyyy-mm-dd hh:mm  (2019-06-03 09:58)
				// dateStr = dateStr.replace(/-/g, "");
				// var sYear = dateStr.substr(0,4);
				// var sMonth = dateStr.substr(4,2);
				// var sDay = dateStr.substr(6,2);
				
				// var sTime = dateStr.substr(9, dateStr.length ).split(":");
// console.log( dateStr, sYear, sMonth, sDay, sTime[0], sTime[1] );
					
				// var intYear = parseInt( sYear );
				// var intMonth = parseInt( sMonth );
				// intMonth = intMonth - 1;
				// var intDay = parseInt( sDay );
				// var intHour = parseInt( sTime[0] );
				// var intMin = parseInt( sTime[1] );
				
				// var cacheDate = new Date( intYear, intMonth, intDay, intHour, intMin );
// console.log( cacheDate );
				func.runAjax( {
					"requestMethod" : "HEAD", 
					"url" : webApp.vars["dataUrl"], 
					
					"onLoadEnd" : function( headers, xhr ){
	//console.log( headers );
//console.log(xhr.getResponseHeader("last-modified") );
						var serverDate = new Date( xhr.getResponseHeader("last-modified") );
//console.log( serverDate, " more than > ", cacheDate, serverDate > cacheDate );
						webApp.vars["cache"]["serverDate"] = serverDate;
						resolve( serverDate > cacheDate );
					},
					
					"onError" : function( xhr ){
	console.log( "onError ", arguments);
						reject( xhr.statusText );
					},

					"callback": function( data, runtime ){
	//console.log( "func.runAjax, ", typeof data );
	//console.log( data );
	//for( var key in data){
	//console.log(key +" : "+data[key]);
	//}
					}//end callback()
				});
			
			});//end promise
		}//end __checkDate()
*/				

	}//end _loadData()


	function _serverRequestAppDate( postFunc ){
//console.log( webApp.vars["userDataUrl"] );
//console.log( webApp.vars["userDataUrl"].value );
		if( webApp.vars["userDataUrl"].value.length > 0){
			webApp.vars["dataUrl"] = webApp.vars["userDataUrl"].value;
		}
		
		if( !webApp.vars["dataUrl"] ||
			webApp.vars["dataUrl"].length === 0 ){
webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
func.logAlert( webApp.vars["logMsg"], "error");
//console.log( webApp.vars["logMsg"] );
			if( typeof postFunc === "function"){
				postFunc();
			}
			return false;
		}

		webApp.vars["loadProgress"].style.display="block";
		func.runAjax( {
			"requestMethod" : "GET", 
			"url" : webApp.vars["dataUrl"], 
			//"noCache" : true,
			//"responseType":"json",
			
			"onProgress" : function( e ){

				var percentComplete = 0;
				
				if(e.lengthComputable) {
					percentComplete = Math.ceil(e.loaded / e.total * 100);
				}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
//for( var key in e){
//console.log( key +" : " + e[key]);
//}
				webApp.vars["totalBytes"].innerHTML = e.total;
				webApp.vars["totalMBytes"].innerHTML = (( e.total / 1024) / 1024).toFixed(2);
				webApp.vars["loaded"].innerHTML = e.loaded;

				if( webApp.vars["loadProgressBar"] ){
					//webApp.vars["loadProgressBar"].className = "progress-bar";
					webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
					webApp.vars["percentComplete"].innerHTML = percentComplete+"%";
					//webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
				}
				
			},
				
			"onLoadEnd" : function( headers, xhr ){
//console.log( headers );
//console.log(xhr.getResponseHeader("last-modified") );
					//var serverDate = new Date( xhr.getResponseHeader("last-modified") );
					//webApp.vars["cache"]["serverDate"] = serverDate;
					
					//window.location.replace("index.html");
					//window.location.search = "";
				webApp.vars["loadProgress"].style.display="none";
				//webApp.vars["logMsg"] = webApp.vars["loadInfo"].innerHTML;
				var logMsg = webApp.vars["loadInfo"].textContent.trim();
//console.log("--  " + logMsg);				
				func.logAlert( logMsg, "warning");
			},
			
			"onError" : function( e ){
//console.log( "onError ", arguments);
				for( var key in e){
					webApp.vars["logMsg"] = "<b>"+key +"</b> : "+ e[key];
					func.logAlert( webApp.vars["logMsg"], "error");
				//console.log( webApp.vars["logMsg"] );
				}//next

				webApp.vars["userDataUrl"].value = "";

webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );

				if( typeof postFunc === "function"){
					postFunc();
				}
				//return false;
			},

			"callback": function( data, runtime ){
webApp.vars["logMsg"] = "load <b>" + webApp.vars["dataUrl"]  +"</b>, runtime: "+ runtime +" sec";
func.logAlert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );
console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}

				if( !data){
webApp.vars["logMsg"] = "error, no data in " + webApp.vars["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
					if( typeof postFunc === "function"){
						postFunc(false);
					}
				} 

				if( data && data.length > 0){
					
					if( webApp.vars["cache"]["cacheUpdate"] ){
webApp.vars["logMsg"]= "need to update cache data - " + webApp.vars["dataUrl"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( webApp.vars["logMsg"] );
						storage.saveAppData({
							"dataStoreType": webApp.vars["support"]["dataStoreType"],
							"data": data,
							"callback" : function( state ){
//webApp.vars["logMsg"]= "Update cache data, " + webApp.vars["dataUrl"];
//func.logAlert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );
								webApp.vars["cache"]["cacheUpdate"] = false;
							}
						});
					}
					
					if( typeof postFunc === "function"){
						postFunc(data);
					}
				}

			}//end callback()
		});
	}//end _serverRequestAppDate()				


	function _parseAjax( data ){
		if( webApp.vars["cache"]["dataType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + webApp.vars["cache"]["dataType"];
//func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
			return false;
		}
		
		switch( webApp.vars["cache"]["dataType"] ){
			case "xml":
				//_parseXML( data );
			break;
			
			case "json":
				_parseJSON( data );
			break;
			
			case "csv":
				//_parseCSVBlocks(data);
			break;
		}//end switch
		
	}//_parseAjax()

	
	function _parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( webApp.vars["logMsg"] );
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");

		}//end catch
		
		webApp.vars["jsonObj"] = jsonObj;
//--------------------------------

		webApp.vars["dateAdded"] = __parseDate( jsonObj["dateAdded"] );
		webApp.vars["lastModified"] = __parseDate( jsonObj["lastModified"] );
		webApp.vars["logMsg"] = "dateAdded : " + webApp.vars["dateAdded"] + ", lastModified : " + webApp.vars["lastModified"];
		func.logAlert( webApp.vars["logMsg"], "info");
		
//--------------------------------
		// for( var key in jsonObj ){
// console.log( key, jsonObj[key], typeof jsonObj[key]  );
			// var result = jsonObj[key] instanceof Array;
// //console.log( key, result );
			// if( result && jsonObj[key].length > 0){
				// _parseChildren( jsonObj[key] );
			// }
		// }//next
//console.log( typeof jsonObj.children );
//console.log( jsonObj.children.length );
/*
guid: toolbar_____ string
title: \CF\E0\ED\E5\EB\FC \E7\E0\EA\EB\E0\E4\EE\EA string
index: 1 number
dateAdded: 1526981203879000 number
lastModified: 1526981210071000 number
id: 3 number
typeCode: 2 number
type: text/x-moz-place-container string
root: toolbarFolder string
children: [object Object],[object Object] object
*/		
		//first level
		if( jsonObj["children"] && jsonObj["children"].length > 0){
			for( var n = 0; n < jsonObj["children"].length; n++){
				var container = jsonObj["children"][n];
				
				//\F2\EE\EB\FC\EA\EE \EC\E5\ED\FE \E7\E0\EA\EB\E0\E4\EE\EA
				if( container["root"] === "bookmarksMenuFolder"){
					_getContainerByID( container["id"], webApp.vars["jsonObj"] );
					break;
				}
				
			}//next
		}
		
	}//end _parseJSON()

	function __parseDate( _date ){
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
	}//end _parseDate()
	
	function _getContainerByID( id, jsonObj ){
//console.log( id );

		if( jsonObj["children"] && jsonObj["children"].length > 0){
			for( var n = 0; n < jsonObj["children"].length; n++){
				var container = jsonObj["children"][n];
//console.log( container["id"] );
				if( container["id"] === id ){
					_viewContainer( container );
					break;
				}
				
				//recursive search ID
				if( container["children"] && container["children"].length > 0){
					_getContainerByID( id, container );
				}
				
			}//next
		}
		
	}//end _getContainerByID()


	function _viewContainer( container ){
//console.log( container );
/*
dateAdded: 1526981203879000
?guid: "menu________"
?id: 2
?index: 0
?lastModified: 1526988976626000
?root: "bookmarksMenuFolder"
?title: "\8C\E5\ED\FE \E7\E0\EA\EB\E0\E4\EE\EA"
*/

/*
		var dateAdded = __parseDate( container["dateAdded"] );
		var lastModified = __parseDate( container["lastModified"] );
		webApp.vars["logMsg"] = "Title: " + container["title"]+ ", dateAdded : " + dateAdded + ", lastModified : " + lastModified;
		func.log("");
		func.log("<div class='alert'>" + webApp.vars["logMsg"] + "</div>");
*/
		//-------------------------------- form breadcrumbs
		//add container link to breadcrumbs
		webApp.vars["breadcrumbs"][ "key_" + container.id ] = container["title"];
//console.log("add breadcrumb item, id: ", container.id);
		
		//form breadcrumbs line
		var breadcrumbs = "";
		var clear = false;
		for( var item in webApp.vars["breadcrumbs"] ){
			var itemID = item.replace("key_", "");
			
			if( clear ){//clear unuseful tail breadrumbs
				delete webApp.vars["breadcrumbs"][item];
			} else {
				var itemTitle = webApp.vars["breadcrumbs"][item];
				breadcrumbs += templates[ webApp.vars.tplName ]["breadcrumbs_item_tpl"]
				.replace("{{id}}", itemID)
				.replace("{{title}}", itemTitle);
			}
			
//console.log( itemID, container["id"], itemID === container["id"] );
//console.log( typeof itemID, typeof container["id"] );
			if( parseInt( itemID ) === container["id"] ){//detect unuseful tail breadrumbs
				//break;
				clear = true;
			}
			
		}//next
//console.log( breadcrumbs );

		//-------------------------------- insert breadcrumbs
		webApp.vars["htmlCode"] = templates[ webApp.vars.tplName ]["container_tpl"]
		.replace("{{breadcrumbs}}", breadcrumbs );
				
		if( !container["children"] || container["children"].length === 0){
			return;
		}
		//------------------------------ insert children block		
		var htmlChildren = "";
		if( container["children"] && container["children"].length > 0){
			htmlChildren = _parseChildren( container["children"] );
		}
//console.log(htmlChildren);
		webApp.vars["htmlCode"] = webApp.vars["htmlCode"].replace("{{children}}", htmlChildren );
		func.log( "", webApp.vars["targetHtmlBlockID"]);
		func.log( webApp.vars["htmlCode"], webApp.vars["targetHtmlBlockID"]);

		//------------------------ Image load error
		//var pageContainer = func.getById("page-container");
		//var pageContainer = webApp.vars["insertContainer"];
//console.log( pageContainer.innerHTML );
		var images = webApp.vars["insertContainer"].getElementsByTagName("img");
//console.log( "images =  ", images, images.length);
		for( var n = 0; n < images.length; n++){
			if( images[n].clientHeight === 0 ){
//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
//console.log( "img load error: ", images[n].getAttribute("src") );	
				images[n].onerror = function(e){
webApp.vars["logMsg"] = "error, image not load: " + e.target["src"];
webApp.vars["logMsg"] += ", waiting time: " + e["timeStamp"] / 1000 + " sec";
//func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
//console.log( webApp.vars["logMsg"] );
					e.target.src = webApp.vars["imageNotLoad"];
				}
				
			};
		};
		//------------------------
		
	}//end _viewContainer()
	
	function _parseChildren( obj ){
		//webApp.vars["currentContainerChildren"] = obj;
		
		var html = "";
		for( var n = 0; n <  obj.length; n++ ){
//console.log( n, obj[n], typeof obj[n]  );
			var _child = obj[n];
				//for( var key in _child){
//console.log( key + ": " + _child[key], typeof _child[key]  );
				//}//next

			var annos = "";
			if( _child["annos"] && _child["annos"].length > 0){
//console.log( _child["annos"] );
				if( _child["annos"][0]["value"].length > 0){
					annos = templates[ webApp.vars.tplName ]["annos_tpl"].replace( "{{annos}}", _child["annos"][0]["value"] );
				}
			}
			
			var iconUri = "";
			if( _child["iconuri"] && _child["iconuri"].length > 0){
//console.log( _child["iconuri"] );
				iconUri = templates[ webApp.vars.tplName ]["iconuri_tpl"].replace( "{{iconuri}}", _child["iconuri"] );
			}

			var toolTip = templates[ webApp.vars.tplName ]["tooltip_tpl"];
			var dateAdded = "";
			var lastModified = "";
			
			if( _child["dateAdded"] ){
//console.log( _child["dateAdded"] );
				dateAdded = __parseDate( _child["dateAdded"] );
				toolTip = toolTip.replace( "{{dateAdded}}", dateAdded );
			}
			if( _child["lastModified"] ){
//console.log( _child["lastModified"] );
				lastModified = __parseDate( _child["lastModified"] );
				toolTip = toolTip.replace( "{{lastModified}}", lastModified );
			}
			
			if( _child["type"] === "text/x-moz-place-container"){
				html += templates[ webApp.vars.tplName ]["folder_tpl"]
				.replace("{{annos}}", annos )
				.replace("{{id}}", _child["id"] )
				.replace("{{tooltip}}", toolTip )
				.replace("{{title}}", _child["title"] );				
			}
			
			if( _child["type"] === "text/x-moz-place"){

				//Skip RecentTags link
				if( _child["uri"].indexOf("place:") !== -1){ 
					continue;
				}

				html += templates[ webApp.vars.tplName ]["link_tpl"]
				.replace("{{annos}}", annos )
				.replace("{{iconuri}}", iconUri )
				.replace("{{uri}}", _child["uri"] )
				.replace("{{tooltip}}", toolTip )
				.replace("{{title}}", _child["title"] );				
			}
			
		}//next
		return html;
	}//end _parseChildren()
	
	//function _loadTemplates( callback ){
//..................
	//}//end _loadTemplates()

	function _parseLocalFile( fileList){
		if( !fileList || fileList.length === 0){
			return false;
		}
/*
name protokols.json
lastModified 1515750341802
lastModifiedDate Date 2018-01-12T09:45:41.802Z
webkitRelativePath 
slice function slice()
size 47
type application/json
*/
		for( var n = 0; n < fileList.length; n++){
			var file = fileList[n];
			for(var key in file){
console.log(key, file[key]);	
			}//next
			__processFile(file);
		}//next
		
		function __processFile(file){
			//check file type
			//webApp.logMsg = "file type:" + file["type"];
			//func.log("<div class='alert alert-info'>" + webApp.logMsg + "</div>");
			
			var reader = new FileReader();
			
			reader.onabort = function(e){
console.log( "reader, onabort", e );
			};
			
			reader.onerror = function(e){
console.log( "reader, onerror", e );
			};
			
			reader.onload = function(e){
console.log( "reader, onload" );
//console.log(e.target.result);
				_parseJSON( e.target.result );

				webApp.logMsg = "Load file " + file.name;
				webApp.logMsg += ", size: " + file.size;
				webApp.logMsg += ", type: " + file.type;
				webApp.logMsg += ", date: " + file.lastModifiedDate;
	
//need new func!!!!!!!!!!!!!	
				var timestamp = file.lastModified;
				var date = new Date();
				date.setTime( timestamp);
//console.log( date );
				var sYear = date.getFullYear();
				var sMonth = date.getMonth() + 1;
				var sDate = date.getDate();
				var sHours = date.getHours();
				var sMinutes = date.getMinutes();
				var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;

				webApp.logMsg += ", date2: "+ dateStr;
				func.logAlert( webApp.logMsg, "info");
				
//----------------------
				hideModalWindow();
				
			};
			
			reader.onloadstart = function(e){
console.log( "reader, loadstart" );
			};
			
			reader.onloadend = function(e){
console.log( "reader, loadend" );
			};
			
			reader.onprogress = function(e){
console.log( "reader, progress");
			};
			
			reader.readAsText(file);
		}//end __processFile()
		
	}//end _parseLocalFile
	
	
	function hideModalWindow(){
		if( typeof M === "object"){//is used Materialize framework
console.log( "Materialize framework verson: " + M.version );
			$("#serviceModal").modal("close");
		} else {
//console.log( $.fn );
console.log( "Bootstrap JS plugin version: " + $.fn.modal.Constructor.VERSION );
			$("#serviceModal").modal("hide");
		}
	}//end hideModalWindow()
	
	// public interfaces
	return{
		//vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		urlManager:	function( target ){ 
			return _urlManager( target ); 
		}//,
		//loadTemplates : _loadTemplates,
		//serverRequest:	function(opt){ 
			//return _serverRequest(opt); 
		//}
	};
	
}//end _app()

/*
function registerServiceWorker() {
	const SW_NAME = "sw.js";
	
	webApp.vars["logMsg"] = "-- navigator.serviceWorker registration in progress.";
	func.logAlert( webApp.vars["logMsg"], "info");
	
	window.addEventListener('load', function() {
		navigator.serviceWorker.register( SW_NAME ).then(function(reg) {
			webApp.vars["logMsg"] = "-- navigator.serviceWorker registration succeeded. Scope is " + reg.scope;
func.logAlert(webApp.vars["logMsg"], "success");
			
			if(reg.installing) {
webApp.vars["logMsg"]="Service worker installing";
func.logAlert( webApp.vars["logMsg"], "info" );
			}
			if(reg.waiting) {
webApp.vars["logMsg"]="Service worker waiting";
func.logAlert( webApp.vars["logMsg"], "info" );
			}
			if(reg.active) {
webApp.vars["logMsg"]="Service worker active";
func.logAlert( webApp.vars["logMsg"], "info" );
			}
			support = true;
			//_getListCaches();
		}, 

		function(err) {
webApp.vars["logMsg"]="ServiceWorker registration failed";
func.logAlert( webApp.vars["logMsg"], "error" );
console.log(err);
		})
		
		.catch( function(error) {
webApp.vars["logMsg"] = "Registration failed."
func.logAlert(webApp.vars["logMsg"], "error");
console.log(error);
		});
	 
	});//end event
	
}//end registerServiceWorker()
*/
/*
function _detectDataStore(){
//console.log(arguments);		
//console.log( this );		
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
}//end _detectDataStore()
*/


function _runApp(opt){
	//var html = runTests();
	//func.log( html );
console.log(opt);
	
	webApp.vars.tplName = opt["tplName"];
	webApp.vars["isRunApp"] = false;
/*
	for( var n = 0; n < webApp.vars["tests"].length; n++ ){
		var _test = webApp.vars["tests"][n];
//console.log(_test);
		if( _test["result"]){
			webApp.vars["isRunApp"] = true;
		} else {
			webApp.vars["isRunApp"] = false;
			break;
		}
	}//next
*/	
	if( webApp.vars["support"]["jsonSupport"]){
		webApp.vars["isRunApp"] = true;
	}

	// if( webApp.vars["support"]["swSupport"] && 
			// webApp.vars["support"]["cacheSupport"] && 
				// webApp.vars["promiseSupport"] ){
		// registerServiceWorker();
	// }
	
	if( !webApp.vars["isRunApp"] ){
		webApp.vars["logMsg"] = "error, webApplication is not running in this browser....";
func.logAlert(webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		return false;
	}
	
	
	//webApp.app.loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		webApp.init(function(){

			var parseUrl = window.location.search; 
			if( parseUrl.length > 0 ){
				webApp.vars["GET"] = func.parseGetParams(); 
			} //else {
				// if( webApp.app.vars["init_url"] ){
						// parseUrl = webApp.app.vars["init_url"];
// //console.log(parseUrl);					
				// }
				// webApp.vars["GET"] = func.parseGetParams( parseUrl ); 
				// webApp.app.urlManager();
			//}
			
			webApp.vars["GET"]["q"] = "get-data"; 
			webApp.app.urlManager();

		});//end webApp initialize
	//});
}//end _runApp()

//============================ test modal
/*
	var overlay = func.getById("overlay");
	if( overlay ){
		//overlay.className="modal-backdrop in";
		overlay.style.display="block";
	}
	var waitWindow = func.getById("wait-window");
	if( waitWindow ){
		//waitWindow.className="modal-dialog";
		waitWindow.style.display="block";
	}
*/

	//var waitWindow = func.getById("win1");
	//if( waitWindow ){
		//waitWindow.style.display="block";
	//}
/*
setTimeout(function(){

		//hide block overlay and wait window
		//if( overlay ){
			//overlay.className="";
			//overlay.style.display="none";
		//}
		if( waitWindow ){
			waitWindow.style.display="none";
		}
}, 1000*3);
*/
