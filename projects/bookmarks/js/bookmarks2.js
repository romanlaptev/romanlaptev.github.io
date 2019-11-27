var webApp = {
	"vars" : {
		"app_title" : "Bookmarks",
		//"log" : [],
		"logMsg" : "",
		//"data_url" : "db/bookmarks.json",
		"data_url" : "bookmarks-cache/db/bookmarks_notes.json",
		//"data_url" : "db/lib.json",
		"userDataUrl" : getById("user-data-url"),
		"userDataFile" : getById("user-data-file"),
		
		//"templates_url" : "tpl/templates.xml",
		"GET" : {},
		"pageContainer" : getById("content-column"),
		"insertContainer" : getById("insert-json"),
		"btnParse" : getById("btn-parse"),
		"wait" : getById("wait"),
		"waitWindow" : getById("win1"),
		
		"log" : getById("log"),
		"btnToggle" : getById("btn-toggle-log"),
		
		"targetHtmlBlockID" : "insert-json",
		"templates" : {
			"container_tpl" : "<div class='panel panel-primary'>\
<div class='panel-heading'>\
<ul class='breadcrumb breadcrumb-custom'>{{breadcrumbs}}</ul></div>\
<div class='panel-body'>{{children}}</div>\
</div>",
			"folder_tpl" : "<div class='folder2'>\
<a class='' href='#?q=view-container&id={{id}}' title='{{tooltip}}'>{{title}}</a>\
{{annos}}\
</div>",
			"link_tpl" : "<div class='link'>\
<a class='' href='{{uri}}' target='_blank' title='{{tooltip}}'>{{iconuri}}{{title}}</a>\
{{annos}}\
</div>",
			"annos_tpl" : "<div class='annos'>{{annos}}</div>",
			"iconuri_tpl" : "<img class='icon-uri' src='{{iconuri}}'/>",
			"tooltip_tpl" : "created: {{dateAdded}}, modified:{{lastModified}}"
		},
		"breadcrumbs": {},
		"imageNotLoad": "img/image_not_load.png"
	},
	
	"init" : function( postFunc ){
console.log("init webapp!");
//console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.app.init();
		
		if( webApp.vars["userDataUrl"]){
			webApp.vars["userDataUrl"].value = "";
		}
		
		var app_title = getById("app-title");
		if( app_title){
			app_title.innerHTML = this.vars["app_title"];
		}
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
	},//end init()
	
	"app" : _app()//,
	//"run" : _runApp
};//end webApp()
console.log(webApp);

//==================================
function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"init_url" : "#?q=parse-json"
	};// _vars
	
	var _init = function( opt ){
//console.log("init app!");
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
					if ( target.href.indexOf("#?q=") !== -1){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							//var search = target.href.split("?"); 
							//var parseStr = search[1]; 
							var parseStr = target.href; 
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
					//if ( target.href.indexOf("#") !== -1){
					if ( target.href.indexOf("#?q=") !== -1){
							if (event.preventDefault) { 
								event.preventDefault();
							} else {
								event.returnValue = false;				
							}

								//var search = target.href.split("?"); 
								//var parseStr = search[1]; 
								var parseStr = target.href; 
//console.log( parseStr );
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
				_log("<div class='alert alert-warning'>" + webApp.logMsg + "</div>");
				$("#serviceModal").modal("hide");
				return false;
			}
		});//end event
		
	}//end defineEvents()


	function _urlManager( target ){
//console.log(target);
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

			case "upload":
			break;
			
			case "parse-json":
//console.log( webApp.vars["userDataUrl"] );
//console.log( webApp.vars["userDataUrl"].value );
				if( webApp.vars["userDataUrl"].value.length > 0){
					webApp.vars["data_url"] = webApp.vars["userDataUrl"].value;
				}

				if( webApp.vars["data_url"].length > 0){
//webApp.vars["logMsg"] = "start parsing...." + webApp.vars["data_url"];
//_log("<div class='alert'>" + webApp.vars["logMsg"] + "</div>");
				} else {
webApp.vars["logMsg"] = "error, not defined 'data_url' "
_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
				}
				

				if( webApp.vars["waitWindow"] ){
					//waitWindow.className="modal-dialog";
					webApp.vars["waitWindow"].style.display="block";
				}

				runAjax( {
					"requestMethod" : "GET", 
					"url" : webApp.vars["data_url"], 
					"onProgress" : function( e ){
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

					},//end callback function
					
					"onError" : function( xhr ){
//console.log( "onError ", xhr);
						webApp.vars["userDataUrl"].value = "";
					},//end callback function
					
					"onLoadEnd" : function( headers ){
//console.log( "onLoadEnd ", headers);
						if( webApp.vars["waitWindow"] ){
							webApp.vars["waitWindow"].style.display="none";
						}
					},//end callback function
					
					"callback": function( data, runtime ){
webApp.vars["logMsg"] = "load " + webApp.vars["data_url"]  +", runtime: "+ runtime +" sec";
_log("<div class='alert'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
//console.log( "_postFunc(), " + typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}

//setTimeout(function(){
						if( webApp.vars["waitWindow"] ){
							webApp.vars["waitWindow"].style.display="none";
						}
//}, 1000*3);

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
		
		webApp.vars["jsonObj"] = jsonObj;
//--------------------------------

		webApp.vars["dateAdded"] = __parseDate( jsonObj["dateAdded"] );
		webApp.vars["lastModified"] = __parseDate( jsonObj["lastModified"] );
		webApp.vars["logMsg"] = "dateAdded : " + webApp.vars["dateAdded"] + ", lastModified : " + webApp.vars["lastModified"];
		_log("<div class='alert'>" + webApp.vars["logMsg"] + "</div>");
		
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
		_log("");
		_log("<div class='alert'>" + webApp.vars["logMsg"] + "</div>");
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
				breadcrumbs += "<li><a href='#?q=view-container&id="+itemID+" '>" + itemTitle + "</a></li>";
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
		webApp.vars["htmlCode"] = webApp.vars["templates"]["container_tpl"]
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
		_log( "", webApp.vars["targetHtmlBlockID"]);
		_log( webApp.vars["htmlCode"], webApp.vars["targetHtmlBlockID"]);

		//------------------------ Image load error
		//var pageContainer = getById("page-container");
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
//_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
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
					annos = webApp.vars["templates"]["annos_tpl"].replace( "{{annos}}", _child["annos"][0]["value"] );
				}
			}
			
			var iconUri = "";
			if( _child["iconuri"] && _child["iconuri"].length > 0){
//console.log( _child["iconuri"] );
				iconUri = webApp.vars["templates"]["iconuri_tpl"].replace( "{{iconuri}}", _child["iconuri"] );
			}

			var toolTip = webApp.vars["templates"]["tooltip_tpl"];
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
				html += webApp.vars["templates"]["folder_tpl"]
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

				html += webApp.vars["templates"]["link_tpl"]
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
			//_log("<div class='alert alert-info'>" + webApp.logMsg + "</div>");
			
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
				
				_log("<div class='alert alert-info'>" + webApp.logMsg + "</div>");
				
				$("#serviceModal").modal("hide");
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
	
	
	// public interfaces
	return{
		vars : _vars,
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

//Start tests
function runTests(){
	
	var tests = [];
/*	
	var test = {
		"name" : "window.ActiveXObject",
		"result" : false
	};
	//if(window.ActiveXObject || "ActiveXObject" in window){
	if( window.ActiveXObject ){
		test["result"] = true;
		test["msg"] = "supported";
//console.log(window.ActiveXObject);
	}
	_push( tests, test );
*/	
//--------------------------------------
	var test = {
		"name" : "JSON support",
		"result" : false
	};
	if (typeof JSON === 'object') {
		test["result"] = true;
	} else {
		test["msg"] = "typeof JSON :" + typeof JSON;
		test["msg"] += ", methods JSON.stringify(obj), JSON.parse(json_string) not supported...";
		
	}
	_push( tests, test );
//--------------------------------------

//console.log(tests);
	webApp.vars["tests"] = tests;
	
	//form HTML
	var testTpl = '<li class="list-unstyled"><b>{{name}}</b> : <span class="text-info text-uppercase"><b>{{result}}</b></span></li>';
//	var testTpl = '<li class="panel-group"><b>{{name}}</b> : <span class="text-info text-uppercase"><b>{{result}}</b></span><div class="description"><small>{{msg}}</small></div>{{test_links}}</li>';
	
	//var test_links_tpl = "<ul class='relative-links'><b>relative links</b>: {{links}}</ul>";
//console.log( test_links_tpl );	
	//var test_links_item_tpl = "<li><a href='{{item-link}}' target='_blank'>{{item-text}}</a></li>";
//console.log( test_links_item_tpl );	
	
	var testHtml = "";
	for( var n = 0; n < tests.length; n++){
	
		var html = testTpl.replace("{{name}}", tests[n]["name"])
		.replace("{{result}}", tests[n]["result"]);
		
		var msg = tests[n]["msg"];
		if(!msg){
			msg = "";
		}
		html = html.replace("{{msg}}", msg );
		
		// var test_links = "";
		// if( tests[n]["links"] ){
			// var test_links = tests[n]["links"];
			// if( test_links.length > 0  ){
				// var html_items = "";
				// for( var n2 = 0; n2 < test_links.length; n2++){
					// html_items += test_links_item_tpl
					// .replace("{{item-link}}", test_links[n2]["link"])
					// .replace("{{item-text}}", test_links[n2]["text"]);
				// };//next
				// test_links = test_links_tpl.replace("{{links}}", html_items);
// //console.log( test_links );		
			// }
		// }
		// html = html.replace("{{test_links}}", test_links);
		
		testHtml += html;
	}//next
	
	return "<ul>" + testHtml + "</ul>";
	
}//end runTests()


function _runApp(){
	//---------------------------------
	_log( navigator.userAgent );
	var html = runTests();
	_log( html );
	
	webApp.vars["isRunApp"] = false;
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
	
	if( !webApp.vars["isRunApp"] ){
		webApp.vars["logMsg"] = "error, webApplication is not running in this browser....";
		_log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
		return false;
	}
	//---------------------------------
	
	//webApp.app.loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		webApp.init(function(){

			var parseUrl = window.location.search; 
			if( parseUrl.length > 0 ){
				webApp.vars["GET"] = parseGetParams(); 
				webApp.app.urlManager();
			} else {
				if( webApp.app.vars["init_url"] ){
						parseUrl = webApp.app.vars["init_url"];
//console.log(parseUrl);					
				}
				webApp.vars["GET"] = parseGetParams( parseUrl ); 
				webApp.app.urlManager();
			}


		});//end webApp initialize
	//});
}//end _runApp()

//============================ test modal
/*
	var overlay = getById("overlay");
	if( overlay ){
		//overlay.className="modal-backdrop in";
		overlay.style.display="block";
	}
	var waitWindow = getById("wait-window");
	if( waitWindow ){
		//waitWindow.className="modal-dialog";
		waitWindow.style.display="block";
	}
*/

	//var waitWindow = getById("win1");
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
