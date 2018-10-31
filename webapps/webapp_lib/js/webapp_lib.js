//(function(){

	var Lib =  Lib || function(){
//console.log(config);

		// private variables and functions
		//var message = "";
		
		var _vars = {
"xml": null,
"templates_url" : "tpl/templates.xml",
"templates" : {},
"log": func.getById("log"),
"btnToggle": func.getById("btn-toggle-log"),
"loadProgressBar": func.getById("load-progress-bar"),
"numTotalLoad": func.getById("num-total-load"),
"parseProgressBar": func.getById("parse-progress-bar"),
"waitWindow": func.getById("win1"),
"breadcrumb": {},
"runtime": {},
"appContainer": func.getById("App"),
"info": []

		};
		_vars["updateStore"] = false;

		function _init(){
			
			_vars["info"].push( navigator.userAgent + "<br>\n");
			
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="block";
			}
			$("#load-progress").hide();
			
//-----------------
//console.log(typeof document.queryCommandSupported);
try{
//console.log( document.queryCommandSupported("copy") );
	if( document.queryCommandSupported("copy") ){
			var logMsg = "<p class='alert alert-success'>execCommand COPY supported...</p>";
			//func.log(logMsg);
			_vars["info"].push(logMsg);
			
			//load clipboard script
			var script = document.createElement('script');
			//script.src = "js/vendor/clipboard.min.js";
			//script.src = "../../test_code/js/lib/clipboard.js";
			script.src = config["clipboardPath"];
			
			document.getElementsByTagName('head')[0].appendChild(script);
			
			script.onload = function() {
//console.log( "onload " + this.src);
var logMsg = "<p class='alert alert-success'>onload " + this.src +"</p>";
//func.log(logMsg);
_vars["info"].push(logMsg);

//console.log( "ClipboardJS: ", typeof ClipboardJS );
				if( typeof ClipboardJS === "undefined" ){
					config["addCopyLink"] = false;
				}
				
			};
			
			script.onerror = function(e) {
				alert( "error load script " + this.src);
				config["addCopyLink"] = false;
			}; 
			
			
	} else {
			var logMsg = "<p class='alert alert-danger'>This browser is not supported COPY action</p>";
			func.log(logMsg);
			config["addCopyLink"] = false;
	}
} catch(e) {
//console.log( "- name: " + e.name );
//console.log( "- message: " + e.message );
//console.log( "- result: " + e.result );
				_vars["logMsg"] = "error, check document.queryCommandSupported('copy') failed...";
				_vars["logMsg"] += e.name+", "+e.message+", result: " + e.result;
				func.log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				_vars["info"].push("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
				
				config["addCopyLink"] = false;

}
//-----------------			

			if ( config["use_localcache"] ) {
				
				//load localforage script
				var script = document.createElement('script');
				//script.src = "js/vendor/localforage.min.js";
				script.src = config["localforagePath"];
				document.getElementsByTagName('head')[0].appendChild(script);
				
				script.onload = function() {
//console.log( "onload " + this.src);
var logMsg = "<p class='alert alert-success'>onload " + this.src +"</p>";
//func.log(logMsg);
_vars["info"].push(logMsg);
					var res = init_cache();
					if( res ){
//----------- hide not used progress bar
//$(_vars["loadProgressBar"]).parent().parent().hide();
//$("#load-progress").hide();
//-----------
						get_xml_from_storage();
					} else {
						load_xml({
							filename : config["xml_file"],
							callback: after_load
						});
					}
					
				};
				
				script.onerror = function(e) {
					alert( "error load script " + this.src);
				}; 
				
			} else {

				load_xml({
					filename : config["xml_file"],
					callback: after_load
				});
/*
				loadXml({
					filename : config["xml_file"],
					callback: after_load
				});
*/				
			}
			
		}//end _init()
		
		
		function load_xml( params ) {

			var timeStart = new Date();
			
			$("#load-progress").show();
			
			$.ajax({
				type: "GET",
				url: params["filename"],
				dataType: "text",
				//dataType: "xml",
				//data: {},
				cache: false,
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
//func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );

					//if( _vars["waitWindow"] ){
						//_vars["waitWindow"].style.display="none";
					//}
					
				},
				
				success: function( data ){
//_vars["logMsg"] = "Successful download xml file " + params["filename"];
//func.log("<p class='alert alert-success'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
					params.callback( data );	
				},
				
				error: function( data, status, errorThrown ){
//console.log( "error", arguments );
//_vars["logMsg"] = "error ajax load " + params["filename"]+ ", " + errorThrown["message"];
_vars["logMsg"] = "error ajax load " + params["filename"]+ ", " + errorThrown;
 func.log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );

console.log( "status:" + status );
console.log( "errorThrown:" + errorThrown );
//for(var key in errorThrown){
//console.log( key +" : "+ errorThrown[key] );
//}
					params.callback(false);	
				}
			})
			.done(function () {
console.log("$.ajax, Done...");
			})
			.fail(function (xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
console.log("textStatus:" + textStatus);
			});
		}//end load_xml();
		
/*		
		function loadXml(p){
			
			var timeStart = new Date();
			
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="block";
			}
			
			fn.runAjax( {
				"requestMethod" : "GET", 
				"responseType" : "text", //arraybuffer, blob, document, ms-stream, text
				"url" : p["filename"], 
				"onProgress" : function( e ){
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

				},//end callback function
				
				"onError" : function( xhr ){
console.log( "onError ", arguments);
_vars["logMsg"] = "error ajax load " + params["filename"];
 func.log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				},//end callback function
				
				"onLoadEnd" : function( headers ){
console.log( "onLoadEnd ", headers);
					//if( webApp.vars["waitWindow"] ){
						//webApp.vars["waitWindow"].style.display="none";
					//}
					var timeEnd = new Date();
					var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
					
					_vars["runtime"]["ajax_load"] = {
						"time" : runTime
					};
				},//end callback function
				
				"callback": function( data, runtime, xhr ){
_vars["logMsg"] = "load " + p["filename"]  +", runtime: "+ runtime +" sec";
func.log("<div class='alert'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
//console.log( typeof data );
//console.log( "xhr.responseText: ", xhr.responseText );

					p.callback( xhr.responseText );	
				}//end callback()
			});
			
		}//end loadXml()
*/		
		
		function after_load( data ) {
			//lib = Lib( xml );
	//console.log(lib);
			_vars["xml"] = data;
			
			_vars["GET"] = func.parseGetParams(); 
//console.log( _vars["GET"],  get_object_size( _vars["GET"] ) );

			_loadTemplates(function(){
//console.log("Load templates end...", arguments );
				callback_init();
			});
	
		}//end after_load()
		
		
		function init_cache() {

			var test = test_db();
//console.log(test);
			if ( !test["localStorage"] &&
					!test["WebSQL"] &&
						!test["indexedDB"]){

				_vars["logMsg"] = "error, not support web-storages...";
		 func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );

				config["use_localcache"] = false;
				return false;
			}
			
		//-----------------	
			var _driver = [];
			if(test["indexedDB"]){
				_driver.push(localforage.INDEXEDDB);
			}
			if(test["WebSQL"]){
				_driver.push(localforage.WEBSQL);
			}
			if(test["localStorage"]){
				_driver.push(localforage.LOCALSTORAGE);
			}
console.log( "localforage config: ", localforage._config );
//console.log( "localforage version: " + localforage._config.version );
			localforage.config({
/*
				driver: [localforage.INDEXEDDB,
						 localforage.WEBSQL,
						 localforage.LOCALSTORAGE],
*/						 
				//driver: [localforage.WEBSQL],
				//driver: [localforage.LOCALSTORAGE],
				driver: _driver,
				name: config["dbName"]
			});

			localforage.ready(function() {
console.log('localForage ready');
console.log('localforage.driver():', localforage.driver());
			});

			localforage.length(function(err, numberOfKeys) {
console.log('length of the database - ' + numberOfKeys);
console.dir(err);
			});
			
			return true;

			//var test_db = function(){
			function test_db(){
				var test = {}

				test["localStorage"] = false;
				if( 'localStorage' in window && window['localStorage'] !== null ) {
					test["localStorage"] = true;
				} 

			//console.log ("openDatabase = " + typeof(openDatabase));
				test["WebSQL"] = false;
				if(window.openDatabase) {
					test["WebSQL"] = true;
				}

			//console.log ("indexedDB = " + typeof(indexedDB));
				test["indexedDB"] = false;
				if("indexedDB" in window) {
					test["indexedDB"] = true;
				}

				//var message = navigator.userAgent + "<br>\n";
				var message = "";

				if ( test["localStorage"] ) {
					message += "LocalStorage is available<br>\n";
				} else {
					message += "LocalStorage is not available<br>\n";
				}

				if ( test["WebSQL"] ){
					message += "Your browser supports WebSQL<br>\n";
				} else {
					message += "Your browser does not have support for WebSQL<br>\n";
				}

				if( test["indexedDB"] ) {
					message += "Your browser supports indexedDB.<br>\n";
				} else {
					message += "Your browser does not have support for indexedDB.<br>\n";
				}

				_vars["info"].push(message);
console.log( message );
				return test;
			};//end _test()
			
		};//end _init_cache()
		
		function get_xml_from_storage() {
//console.log( "function get_xml_from_storage()", localforage );

			var timeStart = new Date();
			localforage.keys( function(err, keys) {//test in array of keys
//console.log(err, keys, err === null);				
				if( err === null ){
					_getItem( keys );
				}
			});
			
			function _getItem( keys ){
				var j_keys = keys.join();
				var pos = j_keys.indexOf( config["storage_key"] );
				if( pos >= 0){

					localforage.getItem( config["storage_key"], function(err, readValue) {
//console.log('Read: ', config["storage_key"], readValue.length);
//console.log(err);
						var timeEnd = new Date();
						var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
						
						var cache_size = readValue.length; 
						var cache_size_kb = cache_size / 1024 ;
						var cache_size_mb = cache_size_kb / 1024;
						
						var log = "- get storage element " + config["storage_key"];
						log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
						log += ", runtime: <b>" + runTime + "</b> sec";
						log += ", error: " + err;
						
_vars["logMsg"] = log;
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
						_vars["info"].push("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
						
					
						_vars["runtime"]["get_storage"] = {
							"time" : runTime
						};
						//params.callback( readValue, true, log );	

						if( err === null){
							after_load( readValue);
						} else {
console.log("error, localforage.getItem("+config["storage_key"]+")", err);
						}
						
					 });
					 
				} else {
					load_xml({
						filename : config["xml_file"],
						callback: function( xmlStr ){
							put_to_storage( config["storage_key"], xmlStr, __postFunc);
						}
					});
					/*
					loadXml({
						filename : config["xml_file"],
						callback: function( xmlStr ){
							put_to_storage( config["storage_key"], xmlStr, __postFunc);
						}
					});
					*/
				}
			}//end _getItem()
			
			function __postFunc( value, err){
//console.log( arguments );				

				if( err === null ){
					after_load( value );
				} else {
					_vars["logMsg"] = "error, failed save element to the storage", err;
					func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
//for(var key in err){
//console.log( key +": "+ err[key] );				
//}

					var driverStr = localforage.driver();
//console.log('localforage.driver():', driverStr);
//console.log( err["name"] );//NS_ERROR_DOM_QUOTA_REACHED
//console.log( err["code"] );//1014
//console.log( err["message"] );

					//LocalStorage error handler
					if( driverStr === "localStorageWrapper"){
						
						if( err["code"] === 1014){
							localforage.clear( function(err){
					_vars["logMsg"] = "Clear storage...";
					func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
					console.log( _vars["logMsg"], err );

								//localforage.removeItem( config["storage_key"], function(err) {
					//_vars["logMsg"] = "Remove " +config["storage_key"];
					//func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
					//console.log( _vars["logMsg"], err );

								 //});

							});
						}
					}

					//indexedDB error handler
					if( driverStr === "asyncStorage"){
						if( err["name"] === "QuotaExceededError"){
							localforage.clear( function(err){
					_vars["logMsg"] = "Clear storage...";
					func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
					console.log( _vars["logMsg"], err );
							});
						}
					}

_vars["logMsg"] = "Use memory...";
func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
					after_load( value );

				}
				
			}//end __postFunc()
			
		}//end get_xml_from_storage()

		function put_to_storage( key, value, callback ) {

			var timeStart = new Date();

			localforage.setItem( key, value, function(err, v) {
//console.log('function put_to_storage, saved in cache ' + config["storage_key"]);
//console.log(err, v);
				var timeEnd = new Date();
				var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
				
				var cache_size = value.length; 
				var cache_size_kb = cache_size / 1024 ;
				var cache_size_mb = cache_size_kb / 1024;
				var log = "- save in cache element " + key;
				log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
				log += ", runtime: <b>" + runTime + "</b> sec";
				
				//var status = true;
				if( err !== null){
					log = "- error, no save " + key + ", " + err;
					//status = false;
					_vars["logMsg"] = "error, failed SAVE element, localforage.setItem("+ key +")", err;
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				}
				
				//_vars["info"].push(log);
				_vars["logMsg"] = log;
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );

				_vars["runtime"]["put_storage"] = {
					"time" : runTime
				};

				if( typeof callback === "function" ){
					callback( value, err );
				}

			});

		}//end put_to_storage();
		

		function _getItemFromStorage( key, callback ){

			var timeStart = new Date();
			
			localforage.getItem( key, function(err, readValue) {
//console.log("Read: " + key, arguments);
//console.log(err);
					var timeEnd = new Date();
					var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
					var log = "- get storage element <b>" + key + "</b>";
					
					if( readValue ){
						var cache_size = readValue.length; 
						var cache_size_kb = cache_size / 1024 ;
						var cache_size_mb = cache_size_kb / 1024;
						log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
					}
										
					log += ", runtime: <b>" + runTime + "</b> sec";
					log += ", error: " + err;
					
					//_vars["info"].push(log);
_vars["logMsg"] = log;
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
					
					//if( err !== null){
						//_vars["logMsg"] = "error, faled READ element, localforage.getItem("+ key +")", err;
//func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
					//}
				
					_vars["runtime"]["get_storage"] = {
						"time" : runTime
					};

					if( typeof callback === "function" ){
						callback( readValue, err );
					}

			});
				 
		}//end _getItem()

		
		
		function callback_init() {
			
//if(_vars["xml"]){
			var res = get_content();
			if(res){
//console.log("TEST2");				
				_urlManager();			
				draw_page();
				define_event();
			}
//}			
			
			_vars["timeEnd"] = new Date();
			_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
			_vars["logMsg"] = "Init application, runtime: <b>" + _vars["runTime"]  + "</b> sec";
			func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
	
//setTimeout(function(){
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="none";
			}
//}, 1000*7);

/*			
			//??????
			var runtime_all = 0;
			for( var item in _vars["runtime"]){
//console.log(item, _vars["runtime"][item]);				
				runtime_all = runtime_all + _vars["runtime"][item]["time"];
			}
			
_vars["logMsg"] = "count runtime all : <b>" + runtime_all.toFixed(3)  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			_vars["info"].push( "<p>"+_vars["logMsg"]+"</p>" );
*/			
		}//end callback_init()
		
		
		
//============================== TEMPLATES
		function _loadTemplates( callback ){
/*			
			webApp.db.loadTemplates(function( isLoadTemplates ){
	//console.log(isLoadTemplates);			
				if( !isLoadTemplates ){
					_loadTemplatesFromFile();
				} else{
					
					if( typeof callback === "function"){
						callback();
					}
				}
			});//end db.loadTemplates()
*/			
			_loadTemplatesFromFile();
			
			function _loadTemplatesFromFile(){
				
				if( !_vars["templates_url"] || _vars["templates_url"].length === 0 ){
_vars["logMsg"] = "- error in _loadTemplates(), not find 'templates_url'....";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				}
				
				func.runAjax( {
					"requestMethod" : "GET", 
					"url" : _vars["templates_url"], 
					//"onProgress" : function( e ){},
					//"onLoadEnd" : function( headers ){},
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
_vars["logMsg"] = "error ajax load " + _vars["templates_url"];
func.log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
						if( typeof callback === "function"){
							callback(false);
						}
						return false;
					},
				
					
					"callback": function( data ){
_vars["logMsg"] = "- read templates from <b>" + _vars["templates_url"] +"</b>";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
_vars["info"].push( "<div class='alert alert-info'>" + _vars["logMsg"] + "</div>" );
		
//console.log( data );

						if( !data ){
console.log("error in draw.loadTemplates(), not find data templates'....");
							if( typeof callback === "function"){
								callback(false);
							}
							return false;
						}

						xmlNodes = func.parseXmlToObj( data );
//console.log(xmlNodes);
						if( xmlNodes.length > 0 ){
							for( var n= 0; n < xmlNodes.length; n++){
								var key = xmlNodes[n]["name"];

								var value = xmlNodes[n]["html_code"]
								.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
								.replace(/\t/g,"")
								.replace(/\n/g,"");
								
								_vars["templates"][key] = value;
							}//next
							//webApp.db.saveTemplates( webApp.draw.vars["templates"] );
						} else {
console.log("error in draw.loadTemplates(), cannot parse templates data.....");
						}

						if( typeof callback === "function"){
							callback();
						}
					}//end
				});
			}//end _loadTemplatesFromFile()
			
		}//end _loadTemplates()


//====================================== CONTENT
		var get_content = function( params ){
			
			var _total = 5;
			var _numDone = 0;
			var _percentComplete = 0;

			
//------------------ //get nodes
			var timeStart = new Date();
//runtime: 0.668 sec
				var res = _readNodesData();
if(!res){
	return false;
}				
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _readNodesData(), runtime: <b>" + runTime  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			_vars["info"].push("<p>" + _vars["logMsg"] + "</p>");
			
			//_vars["runtime"]["read_nodes_data"] = {
				//"time" : runTime
			//};
		
			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed task: " + _numDone + " of total: " + _total, _percentComplete+"%" );
//func.log( timeEnd, "parse-progress-bar" );

			if( _vars["parseProgressBar"] ){
				_vars["parseProgressBar"].className = "progress-bar";
				_vars["parseProgressBar"].style.width = _percentComplete+"%";
				_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
			}
//------------------
//------------------

			var timeStart = new Date();
//runtime: 4.837 sec+, 
//runtime: 1.394 sec+, 
//runtime: 0.783 sec
				_vars["nodes"] = _getNodes();
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			var log = "- _getNodes(), runtime: <b>" + runTime  + "</b> sec";
			
			//_vars["info"].push( log );
_vars["logMsg"] = log;
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			
			_vars["runtime"]["get_xml_nodes"] = {
				"time" : runTime
			};

			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed task: " + _numDone + " of total: " + _total, _percentComplete+"%" );
//func.log( timeEnd, "parse-progress-bar" );

			if( _vars["parseProgressBar"] ){
				_vars["parseProgressBar"].className = "progress-bar";
				_vars["parseProgressBar"].style.width = _percentComplete+"%";
				_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
			}
//------------------
			

//------------------//get taxonomy termins
			var timeStart = new Date();
//runtime: 0.684 sec
				read_taxonomy_data();
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- read_taxonomy_data, runtime: <b>" + runTime  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			_vars["info"].push("<p>" + _vars["logMsg"] + "</p>");
			
			//_vars["runtime"]["read_taxonomy_data"] = {
				//"time" : runTime
			//};
			
			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed task: " + _numDone + " of total: " + _total, _percentComplete+"%" );
//func.log( timeEnd, "parse-progress-bar" );

			if( _vars["parseProgressBar"] ){
				_vars["parseProgressBar"].className = "progress-bar";
				_vars["parseProgressBar"].style.width = _percentComplete+"%";
				_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
			}
//------------------
			
			
//------------------
			var timeStart = new Date();
			
				_vars["taxonomy"] = taxonomy_obj.get_xml_taxonomy();
				
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
_vars["logMsg"] = "- get taxonomy, runtime: <b>" + runTime  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			_vars["info"].push("<p>" + _vars["logMsg"] + "</p>");
			
			//_vars["runtime"]["get_xml_taxonomy"] = {
				//"time" : runTime
			//};


			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed task: " + _numDone + " of total: " + _total, _percentComplete+"%" );
//func.log( timeEnd, "parse-progress-bar" );

			if( _vars["parseProgressBar"] ){
				_vars["parseProgressBar"].className = "progress-bar";
				_vars["parseProgressBar"].style.width = _percentComplete+"%";
				_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
			}

//------------------


//------------------
			//get book category
			var timeStart = new Date();
//runtime : 0.244 sec			
 //runtime : 0.032 sec			
				_vars["book_category"] = _get_book_category();
				
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
_vars["logMsg"] = "- get_book_category, runtime: <b>" + runTime  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			_vars["info"].push("<p>" + _vars["logMsg"] + "</p>");
			
			//_vars["runtime"]["get_book_category"] = {
				//"time" : runTime
			//};
			
			//message = "";
			//message += "<br>Size _vars['xml_nodes']: " + _vars["xml_nodes"].length  + " bytes";
			//message += "<br>Size _vars['book_category']: " + _vars["book_category"].length  + " bytes";
			//message += "<br>Size _vars['nodes']: " + nodes.nodes_size  + " bytes";
			//message += "<br>Size _vars['taxonomy']: " + _vars["taxonomy"].length  + " bytes";
			//_vars["info"].push( message );
			
			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed task: " + _numDone + " of total: " + _total, _percentComplete+"%" );
//func.log( timeEnd, "parse-progress-bar" );

			if( _vars["parseProgressBar"] ){
				_vars["parseProgressBar"].className = "progress-bar";
				_vars["parseProgressBar"].style.width = _percentComplete+"%";
				_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
			}

//------------------
			delete _vars["xml"];
			
			return true;
			
			//read xml data
			function _readNodesData() {
	//console.log("TEST, _readNodesData()");			
				try{
					var xml = _vars["xml"];
					
		//FF 3.6.2, error parse, fail $(xml)
		//script stack space quota is exhausted
					var table_name_index = "taxonomy_index";
					nodes_obj["taxonomy_index"] = $(xml).find( table_name_index ).find("record");//runtime: 0.244 sec
		//console.log( "1", $ );
		//console.log( "2", typeof nodes_obj["taxonomy_index"] );
		//console.log( "3", nodes_obj["taxonomy_index"] );
					
					var table_name = "table_node";
					nodes_obj["x_nodes"] = $(xml).find( table_name ).find('node');//runtime: 0.253 sec
		//console.log( nodes_obj["x_nodes"] );
		
	//-------------
					var table_name = "table_book_filename";
					nodes_obj["x_filenames"] = $(xml).find( table_name ).find('item');
					
					table_name = "table_book_url";
					nodes_obj["x_url"] = $(xml).find( table_name ).find('item');
					
					table_name = "table_book_links";
					nodes_obj["x_links"] = $(xml).find( table_name ).find('item');
	//-------------
		
					return true;
					
				} catch(e) {
		console.log( e );
					_vars["logMsg"] = "XML parse error ( _readNodesData() ). ";
					_vars["logMsg"] += e.name+", "+e.message;
					func.log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
					return false;
				}
			}//end _readNodesData()
			
			function _getNodes( params ) {
				var nodes = [];

				for( var n = 0; n < nodes_obj["x_nodes"].length; n++){
	//console.log( n, x_nodes[n] );
					var node = {};
					
					//read node attributes
					var item_attr = func.get_attr_to_obj(  nodes_obj["x_nodes"][n].attributes );
					for(var attr in item_attr){
						node[attr] = item_attr[attr];
					}//next attr
				
					var x_node = $( nodes_obj["x_nodes"][n] );
					node["subfolder"] = x_node.children("subfolder").text().trim();
					node["author"] = x_node.children("author").text();
					node["bookname"] = x_node.children("bookname").text();
					node["body_value"] = x_node.children("body_value").text();

					//read node termins
					for( var n2 = 0; n2 < nodes_obj["taxonomy_index"].length; n2++){
						var test_nid = nodes_obj["taxonomy_index"][n2].getAttribute("nid");
						if( test_nid === node["nid"] )
						{
							if( typeof node["tid"] === "undefined") {
								node["tid"] = [];
							}
							node["tid"].push( nodes_obj["taxonomy_index"][n2].getAttribute("tid") );
						}
					}//next termin
					
	//-----------------				
					var params = {"nid" :node["nid"] };
					node["termins"] = get_node_termins( params );
					node["book_files"] = _getBookFilesXML( params );
					node["book_url"] = _getBookUrlXML( params );
					node["book_links"] = _getBookLinksXML( params );
	//-----------------				
					
					nodes.push( node );
				}//next node

//var jsonData = JSON.stringify( nodes );
//console.log( jsonData.length );
				if ( config["use_localcache"] ) {
					
					var key = "nodes";
					_getItemFromStorage(key, function(readValue, err){//try read store Nodes
//console.log("--- _deferred_req(), get data...");						
console.log("- read "+key+" from storage...record: "+readValue.length);
console.log(err);

						if(readValue && readValue.length > 0){
							
							if( _vars["updateStore"]){
								localforage.removeItem(key, function(err) {//remove old version store Nodes
console.log("- remove " +key);
console.dir(err);
									put_to_storage(key, nodes, function(value, err){//save new version store Nodes
console.log("- save "+key+" to local storage...", value, err);
									});
								 });
							}


						} else {
							put_to_storage(key, nodes, function(value, err){//save new version store Nodes
console.log("- save "+key+" to local storage...", value, err);
							});
							
						}
					});
								
					
				}
				
				
				
				return nodes;
			}//end _getNodes()
			
		};//end get_content()


		var nodes_obj = {
			//"nodes_size" : 0,
			"get_node" : function( params ){
				//return _get_node( params );
				return _getNode( params );
			},
			//"get_xml_nodes" : function( params ){
				//return _get_xml_nodes( params );
			//},
			"get_termin_nodes" : function( params ){
				//return _get_termin_nodes( params );
				return _getTerminNodesXML( params );
				//return _getTerminNodesJquery( params );
				//return _getTerminNodesJS( params );
				//return _getTerminNodesStorage(params);
			}, 
			"view_node" : function( params ){
				return _view_node( params );
			},
			"viewNodes" : function( opt ){
				return _viewNodes( opt );
			},
			"searchNodes" : function( opt ){
				return _searchNodes( opt );
			}
			
		};
//console.log("nodes_obj:", nodes_obj);


/*
		function _get_termin_nodes( params )
		{
			if( typeof _vars["nodes"] === "undefined")
			{
				var log = "- error, not found _vars[nodes], function get_termin_nodes()";
//console.log(message);
				//_vars["info"].push( message );
_vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				
				return;
			}
		
			var termin_nodes = [];
			for( var node in _vars["nodes"] )
			{
if( typeof _vars["nodes"][node]["tid"] === "undefined")
{
	continue;
}
				for( var n = 0; n < _vars["nodes"][node]["tid"].length; n++)
				{
					if( params["tid"] === _vars["nodes"][node]["tid"][n] )
					{
	//console.log( node,  _vars["nodes"][node]  );
						termin_nodes.push( _vars["nodes"][node] );
					}
				}//next node tid
			}//next node
			
//console.log(termin_nodes);
			return termin_nodes;
		}//end _get_termin_nodes()
*/

		function _getTerminNodesXML( opt ){
//console.log(opt);
			var p = {
				"tid" : null,
				"target" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.tid){
_vars["logMsg"] = "error, not found termins tid, function _getTerminNodes()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				return false;
			}
		
			var terminNodes = [];
			
			for( var n = 0; n < nodes_obj["taxonomy_index"].length; n++){
				var tid = $( nodes_obj["taxonomy_index"][n] ).attr("tid");
				if( p["tid"] === tid ){
					
					var node = _getNode({
						"nid" : $( nodes_obj["taxonomy_index"][n] ).attr("nid")
					});
					
					if( node ){
						terminNodes.push( node );
					}
				}
			};//next

			//------------------- SORT by author, alphabetical sorting
			if( terminNodes.length > 0 ){
				func.sortRecords({
					"records" : terminNodes,
					"sortOrder": "asc", //desc
					"sortByKey": "author"
				});
			}
			
//console.log(terminNodes, terminNodes.length);
			return terminNodes;
		}//end _getTerminNodesXML()

/*
		function _getTerminNodesStorage( opt ){
//console.log(opt);
			var p = {
				"tid" : null,
				"target" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.tid){
_vars["logMsg"] = "error, not found termins tid, function _getTerminNodesStorage()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				return false;
			}
			var terminNodes = [];
			
//======================= TEST
delete _vars["nodes"];
delete _vars["xml"];

			//var taxonomy_index = [];
			//var xml = _vars["xml"];
			//var tableName = "table_taxonomy_index";
			//$(xml).find( tableName ).find("item").each( function( num, element ){
////console.log(num, element);				
				//var itemObj = {
					//"tid" : $(this).attr("tid"),
					//"nid" : $(this).attr("nid")
				//};
				//taxonomy_index.push( itemObj );
			//});//next
			
			
////console.log(taxonomy_index);
			//put_to_storage("taxonomy_index", taxonomy_index, function(){
//console.log(arguments);				
			//});

			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="block";
			}


console.log( window.Promise );
	if( typeof window.Promise === "function" ){
		//......
	}
	
console.log($.Deferred);
	if( typeof $.Deferred === "function" ){
		
		//https://api.jquery.com/deferred.then/
		_deferred_req()
			.then(
				function(readValue, err){//A function that is called when the Deferred is resolved.
//console.log( "Promise resolved.", arguments);
					if( _vars["waitWindow"] ){
						_vars["waitWindow"].style.display="none";
					}
console.log("--- continue of the execution process...");
					if( readValue && readValue.length > 0){
						_vars["termin_nodes"] = __getTerminNodes(readValue);
						if( _vars["termin_nodes"].length > 0){
							_formBreadcrumb( p.target );
							draw_page();
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
_vars["logMsg"] = "- nodes_obj.get_termin_nodes("+_vars["GET"]["tid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
							
						}
					}
				},
				function(){//An optional function that is called when the Deferred is rejected. 
console.log( "Promise rejected.", arguments);
				}				
			)
			
			//.progress(
				//function(p){
//console.log( "PROGRESS promise callback...%", p);
			//})
			
			.always(//Add handlers to be called when the Deferred object is either resolved or rejected.
				function() {
//console.log( "ALWAYS promise callback...", arguments );
			})
			
			.fail(//Add handlers to be called when the Deferred object is rejected.
				function() {
//console.log( "FAIL promise callback...", arguments );
			})
			
			.done(//Add handlers to be called when the Deferred object is resolved.
				function() {
//console.log( "DONE promise callback...", arguments );
			});
	}


			//_getItemFromStorage("taxonomy_index", _callback );
			//_getItemFromStorage("nodes", _callback );
			
console.log(terminNodes);
//terminNodes = [];
			return terminNodes;

			//function _callback(readValue, err){
//console.log("--- continue of the execution process...");						
//console.log(readValue, err);	

////setTimeout(function(){
			//if( _vars["waitWindow"] ){
				//_vars["waitWindow"].style.display="none";
			//}
////}, 1000*3);

			//}//end _callback()

			function _deferred_req(){
				
				var $d = $.Deferred();

				_getItemFromStorage("nodes", function(readValue, err){
//console.log("--- _deferred_req(), get data...");						
//console.log(readValue, err);
					if(readValue && readValue.length > 0){
//console.log("1.State:" , $d.state() );

						$d.resolve( readValue, err );
//console.log("2.State:" , $d.state() );

					} else {
						$d.resolve(false);
					}
					//$d.reject();
				});
				return $d;
			}//end _deferred_req()

			function __getTerminNodes(nodes){
//console.log(p["tid"], typeof p["tid"]);

				var _terminNodes = [];
				for( var n = 0; n < nodes.length; n++ ){
					var node = nodes[n];
if( typeof node["tid"] === "undefined"){
	continue;
}
					for( var n1 = 0; n1 < node["tid"].length; n1++){
//console.log(node["tid"][n1], typeof node["tid"][n1]);
						if( p["tid"] === node["tid"][n1] ){
							_terminNodes.push( node );
						}
					}//next termin tid
					
				}//next node

console.log(_terminNodes);
				return _terminNodes;
			}//end __getTerminNodes()
			
		}//end _getTerminNodesStorage()
*/

/*
		function _getTerminNodesJquery(opt){
//console.log(opt);
			var p = {
				"tid" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.tid){
_vars["logMsg"] = "error, not found termins tid, function _getTerminNodesJquery()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				return false;
			}
				
			var terminNodes = [];
			var xml = _vars["xml"];

			var tableName = "table_taxonomy_index";
			$(xml).find( tableName ).find("item").each( function( num, element ){
//console.log(num, element);				
				var tid = $(this).attr("tid");
				if( p["tid"] === tid ){
					
					var node = __getNode({
						"nid" : $(this).attr("nid")
					});
					
					if( node ){
						terminNodes.push( node );
					}
				}
			});//next

console.log(terminNodes);
//terminNodes = [];
			return terminNodes;
			
			function __getNode(opt){
//console.log(opt);
				var nodeObj = false;
				var tableName = "table_node";
				
				if( opt["nid"]){

					$(xml).find( tableName ).find("node").each( function( num, element ){
						var nid = $(this).attr("nid");
						if( opt["nid"] === nid ){
//console.log( $(this).attr("title") );
nodeObj = {
	"title": $(this).attr("title"),
	"author" : $(this).children("author").text(),
	"nid": $(this).attr("nid"),
	"mlid": $(this).attr("mlid"),
	"plid": $(this).attr("plid"),
	"tid": __getNodeTermins( nid ),
	"type": $(this).attr("type"),
	"body_value" : $(this).children("body_value").text(),
	"bookname" : $(this).children("bookname").text(),
	"subfolder" : $(this).children("subfolder").text().trim(),
	"changed": $(this).attr("changed"),
	"created": $(this).attr("created"),
	"weight": $(this).attr("weight")
};
						}
					});//next
					
				}//end if

				return nodeObj;
			}//end __getNode()
			
			function __getNodeTermins(nid){
				var terminsTid = [];
				var tableName = "table_taxonomy_index";
				
				$(xml).find( tableName ).find("item").each( function( num, element ){
	//console.log(num, element);				
					var testNid = $(this).attr("nid");
					if( testNid === nid ){
						terminsTid.push( $(this).attr("tid") );
					}
				});//next
				
				return terminsTid;
			}//end __getNodeTermins
			
		}//end _getTerminNodesJquery()
*/

/*
		function _getTerminNodesJS(opt){
//console.log(opt);
			var p = {
				"tid" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.tid){
_vars["logMsg"] = "error, not found termins tid, function _getTerminNodes()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				return false;
			}
				
			var terminNodes = [];
			var xml = _vars["xml"];

			var tableName = "table_taxonomy_index";
			var xmlDoc = xml.getElementsByTagName( tableName );
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;
//console.log( xmlDoc.childNodes.length ) ;
//console.log( xmlDoc.item(0).childNodes.item(1).nodeName ) ;
// for(var key in xmlDoc){
// console.log( key +", "+ xmlDoc[key]+ ", " + typeof xmlDoc[key]);
// }

			for (var n = 0; n < xmlDoc.item(0).childNodes.length; n++) {
				var nodeXML = xmlDoc.item(0).childNodes.item(n);
//console.log( nodeXML, typeof nodeXML);
//console.log( "nodeType: "+ nodeXML.nodeType);
				if (nodeXML.nodeType !== 1){// not Node.ELEMENT_NODE
					continue;
				}
				var tid = nodeXML.attributes.getNamedItem("tid").nodeValue;
				var nid = nodeXML.attributes.getNamedItem("nid").nodeValue;
				if( p["tid"] === tid ){
					
					var node = __getNode({
						"nid" : nid
					});
					
					if( node ){
						terminNodes.push( node );
					}
				}
			}//next
			
console.log(terminNodes);
//terminNodes = [];
			return terminNodes;
			
			function __getNode(opt){
//console.log(opt);
				var nodeObj = false;
				var tableName = "table_node";
				
				if( opt["nid"]){
					var xmlDoc = xml.getElementsByTagName( tableName );
					for (var n = 0; n < xmlDoc.item(0).childNodes.length; n++) {
						var nodeXML = xmlDoc.item(0).childNodes.item(n);
		//console.log( nodeXML, typeof nodeXML);
		//console.log( "nodeType: "+ nodeXML.nodeType);
						if (nodeXML.nodeType !== 1){// not Node.ELEMENT_NODE
							continue;
						}
						var nid = nodeXML.attributes.getNamedItem("nid").nodeValue;
						if( opt["nid"] === nid ){
//console.log( nodeXML.attributes.getNamedItem("title").nodeValue );
//console.log( nodeXML.getElementsByTagName("author").item(0) );
//for(var key in nodeXML.getElementsByTagName("author").item(0)){
//console.log( key, nodeXML.getElementsByTagName("author").item(0)[key] );
//}
//var childNodes = nodeXML.childNodes;

var childNode = nodeXML.getElementsByTagName("author").item(0);
//console.log( "type:", typeof childNode, childNode );
if (childNode !== null){
	if ("textContent" in childNode){
		var author = childNode.textContent;
	} else {
		var author = childNode.text;
	}
	//console.log( "author:", author );
} else {
//console.log( "length:", childNodes, childNodes.length );
	continue;
} 
	
childNode = nodeXML.getElementsByTagName("body_value").item(0);
if (childNode !== null){
	if ("textContent" in childNode){
		var body_value = childNode.textContent;
	} else {
		var body_value = childNode.text;
	}
} else {
	continue;
} 
	
nodeObj = {
	"title": nodeXML.attributes.getNamedItem("title").nodeValue,
	"author" : author,
	"nid": nodeXML.attributes.getNamedItem("nid").nodeValue,
	"mlid": nodeXML.attributes.getNamedItem("mlid").nodeValue,
	"plid": nodeXML.attributes.getNamedItem("plid").nodeValue,
	"tid": __getNodeTermins( nid ),
	"type": nodeXML.attributes.getNamedItem("type").nodeValue,
	"body_value" : body_value,
	"bookname" : nodeXML.getElementsByTagName("bookname").item(0).textContent,
	"subfolder" : nodeXML.getElementsByTagName("subfolder").item(0).textContent,
	"changed": nodeXML.attributes.getNamedItem("changed").nodeValue,
	"created": nodeXML.attributes.getNamedItem("created").nodeValue,
	"weight": nodeXML.attributes.getNamedItem("weight").nodeValue
};

						}
					}//next
					
				}//end if

				return nodeObj;
			}//end __getNode()
			
			function __getNodeTermins(nid){
				var terminsTid = [];
				var tableName = "table_taxonomy_index";
				
				var xmlDoc = xml.getElementsByTagName( tableName );
				for (var n = 0; n < xmlDoc.item(0).childNodes.length; n++) {
					var nodeXML = xmlDoc.item(0).childNodes.item(n);
					
					if (nodeXML.nodeType !== 1){// not Node.ELEMENT_NODE
						continue;
					}
					
					var testNid = nodeXML.attributes.getNamedItem("nid").nodeValue;
					if( testNid === nid ){
						var tid = nodeXML.attributes.getNamedItem("tid").nodeValue;
						terminsTid.push( tid );
					}
				}//next
				
				return terminsTid;
			}//end __getNodeTermins
			
		}//end _getTerminNodesJS()
*/

		function _searchNodes( opt ){
//console.log(opt);
			var p = {
				"keyword" : null,
				"targetField" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.keyword){
_vars["logMsg"] = "error, not found search keyword, _searchNodes()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}
		
			if(!p.targetField){
_vars["logMsg"] = "error, not found search 'targetField', _searchNodes()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}
		
			var _targetField = p.targetField.toLowerCase();
			var _keyword = p.keyword.toLowerCase();
			
			var nodes = [];
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++){
				var x_node = $( nodes_obj["x_nodes"][n] );
				
				var node = {};
				var _test = x_node.children( _targetField ).text().toLowerCase();
				if( _test.indexOf(p.keyword) !== -1){
//console.log(x_node);
					var node = _getNode({
						"xmlObj" : x_node
					});
					if( node ){
						nodes.push( node );
					}
					
				}
			}//next node

			//------------------- SORT by author, alphabetical sorting
			if( nodes.length > 0 ){
				func.sortRecords({
					"records" : nodes,
					"sortOrder": "asc", //desc
					"sortByKey": "author"
				});
			}

//console.log(nodes, nodes.length);
_vars["logMsg"] = "- найдено книг: "+ nodes.length;
func.log("");
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			return nodes;
		}//end _searchNodes()
		

		function _viewNodes( opt ) {
//console.log("_viewNodes() ", arguments, "caller: " , _viewNodes.caller);
//console.log(opt);
			var p = {
				"nodes" : null,
				"nodes_tpl": _vars["templates"]["nodes_tpl"],
				"node_tpl": _vars["templates"]["nodes_item_tpl"]
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if( !p["nodes"]){
_vars["logMsg"] = "- error, not found nodes, _viewNodes()";
//func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return "";
			}
			if( p["nodes"].length === 0){
_vars["logMsg"] = "- error, not found nodes, _viewNodes()";
//func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return "";
			}

			var html = "";
			for( var n = 0; n < p["nodes"].length; n++){
				var node = p["nodes"][n];

if(node["type"] === "library_book"){
				html += p.node_tpl
				.replace("{{nid}}", node["nid"])
				.replace("{{bookname}}", '"'+node["bookname"]+'"')
				.replace("{{author}}", node["author"]);
}				

if(node["type"] === "author"){
				html += p.node_tpl
				.replace("{{nid}}", node["nid"])
				.replace("{{bookname}}", node["title"])
				.replace("{{author}}", "");
}

			}//next
			
			html = p["nodes_tpl"].replace("{{list}}", html);
			
			return html;
		}//end _viewNodes()


/*
		function _get_node( opt ){
//console.log(opt);
			var p = {
				"nid" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(!p.nid){
_vars["logMsg"] = "error in parameters, not found node nid, function _get_node()";
 //func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}

			var node = false;
			for( var n = 0; n < _vars["nodes"].length; n++){
				if( p.nid === _vars["nodes"][n]["nid"] ){
					node = _vars["nodes"][n];
					
					//get book url
					var params = {"nid" :node["nid"] };
					//node["book_files"] = [];
					//node["book_url"] = [];
					//node["book_links"] = [];
					
					node["termins"] = get_node_termins( params );
					
//node["book_files"] = get_book_files( params );
					node["book_files"] = _getBookFiles( params );
					
//node["book_url"] = get_book_url( params );
					node["book_url"] = _getBookUrl( params );
					
//node["book_links"] = get_book_links( params );
					node["book_links"] = _getBookLinks( params );
					
				}
			}//next node
//console.log( node  );
			return node;
		}//end _get_node()
*/

		function _getNode( opt ){
//console.log(opt);
			var p = {
				"nid" : null,
				"xmlObj": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);

			if(p.nid){
				return __getNodeByNid(p.nid);
			}
			
			if(p.xmlObj){
				return __getNodeXmlObj(p.xmlObj);
			}
			
			return false;

			function __getNodeXmlObj( xmlObj ){
//console.log("TEST!!!", xmlObj);				
				var node = {};
				
				var $node = $(xmlObj);
				
				//read node attributes
				var nodeAttr = func.get_attr_to_obj( xmlObj[0].attributes );
				for(var attr in nodeAttr){
//console.log(attr, nodeAttr[attr]);
					node[attr] = nodeAttr[attr];
				}//next attr
				node["author"] = $node.children("author").text().trim();
				node["bookname"] = $node.children("bookname").text().trim();
				
				return node;
			}//end __getNodeXmlObj()

			function __getNodeByNid( nid ){
				var node = {};
				for( var n = 0; n < nodes_obj["x_nodes"].length; n++){
					
					var x_node = $( nodes_obj["x_nodes"][n] );
					if( nid !== x_node.attr("nid") ){
						continue;
					}
					
					//read node attributes
					var nodeAttr = func.get_attr_to_obj( x_node[0].attributes );
					for(var attr in nodeAttr){
				//console.log(attr, nodeAttr[attr]);
						node[attr] = nodeAttr[attr];
					}//next attr

					node["subfolder"] = x_node.children("subfolder").text().trim();
					node["author"] = x_node.children("author").text().trim();
					node["bookname"] = x_node.children("bookname").text().trim();
					node["body_value"] = x_node.children("body_value").text().trim();

					//read node termins
					for( var n2 = 0; n2 < nodes_obj["taxonomy_index"].length; n2++){
						var testNid = nodes_obj["taxonomy_index"][n2].getAttribute("nid");
						if( testNid === node["nid"] ){
							if( typeof node["tid"] === "undefined") {
								node["tid"] = [];
							}
							node["tid"].push( nodes_obj["taxonomy_index"][n2].getAttribute("tid") );
						}
					}//next termin
						
					var params = {"nid" :node["nid"] };
					node["termins"] = get_node_termins( params );
					
					node["book_files"] = _getBookFilesXML( params );
					node["book_url"] = _getBookUrlXML( params );
					node["book_links"] = _getBookLinksXML( params );

				//Get children nodes				
				//if( node["type"] === "author"){
				node["node_child_pages"] = book.get_child_pages({
					"plid" : node["mlid"],
					"recourse" : 0
				});
				//}
					
//console.log( node  );
					return node;
				}//next node
				
				return false;
			}//end __getNodeByNid()
			
		}//end _getNode()
		
/*
		function get_book_files( params ){
			var xml = _vars["xml"];
			var files = [];

			var table_name = "table_book_filename";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id )
				{
					var v = $(this).children("value").text().trim();
					files.push( v );
				}
			});//next url

			return files;
		}//end get_book_files()
*/
		function _getBookFilesXML( params ){
			var files = [];
			
			$(nodes_obj["x_filenames"]).each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id ){
					var v = $(this).children("value").text().trim();
					files.push( v );
				}
			});//next url

			return files;
		}//end _getBookFilesXML()
/*
		function get_book_url( params ){
			var xml = _vars["xml"];
			var listUrl = [];

			var table_name = "table_book_url";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id ){
					var v = $(this).children("value").text();
					listUrl.push( v );
				}
			});//next url

			return listUrl;
		}//end get_book_url()
*/
		function _getBookUrlXML( params ){
			var listUrl = [];

			$(nodes_obj["x_url"]).each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id ){
					var v = $(this).children("value").text();
					listUrl.push( v );
				}
			});//next url

			return listUrl;
		}//end _getBookUrlXML()
/*
		function get_book_links( params ){
			var xml = _vars["xml"];
			var links = [];

			var table_name = "table_book_links";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id ){
					var v = $(this).children("value").text();
					links.push( v );
				}
			});//next

			return links;
		}//end get_book_links()
*/		
		function _getBookLinksXML( params ){
			var links = [];

			$(nodes_obj["x_links"]).each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id ){
					var v = $(this).children("value").text();
					links.push( v );
				}
			});//next

			return links;
		}//end _getBookLinksXML()

		function get_node_termins(params){
//console.log(params, nodes_obj);	
			//read node termins
			var node_termins = [];
			for( var n1 = 0; n1 < nodes_obj["taxonomy_index"].length; n1++){
				var test_nid = nodes_obj["taxonomy_index"][n1].getAttribute("nid");
				if( test_nid === params["nid"] ){
					//if( typeof node_termins["tid"] === "undefined"){
						//node_termins["tid"] = [];
					//}
					node_termins.push( {"tid" : nodes_obj["taxonomy_index"][n1].getAttribute("tid") } );
				}
			}//next termin			

			for( var voc in _vars["taxonomy"]){
//console.log(  _vars["taxonomy"][voc]);	
				var test_termins = _vars["taxonomy"][voc]["termins"];
				for( var n1 = 0; n1 < test_termins.length; n1++){
					for( var n2 = 0; n2 < node_termins.length; n2++){
						if( test_termins[n1]["tid"] === node_termins[n2]["tid"] ){
//console.log(  test_termins[n1]["tid"],  test_termins[n1]["name"]);	
							node_termins[n2]["name"] = test_termins[n1]["name"];
						}
					}//next tid
				}//next 
			}//next vocabulary
			
			return node_termins;
		};//end get_node_termins()

		function _view_node( params ) {
//console.log(params, nodes_obj);	
			if( !_vars["node"] ) {
				var log = "- error, not found _vars[node]";
//console.log(message);
				//_vars["info"].push( message );
_vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				
				return;
			}
			
			//----------------------
			var bodyValue = "";
//console.log(_vars["node"]["body_value"].length );
//console.log("TEST!!!", _vars["node"]["body_value"] && _vars["node"]["body_value"].length > 0);
			if( _vars["node"]["body_value"] && _vars["node"]["body_value"].length > 0){
				bodyValue = _vars["node"]["body_value"]
				.replace(/&quot;/g,"\"")
				.replace(/&lt;/g,"<")
				.replace(/&gt;/g,">");
//console.log(bodyValue );
			}
			//----------------------

			//----------------------
			var childNodesHtml = "";
			if( _vars["node"]["node_child_pages"] && _vars["node"]["node_child_pages"].length > 0){
//console.log(_vars["node"]);
//console.log(_vars["node"]["node_child_pages"]);
//console.log(_vars["node"]["type"]);

				_vars["logMsg"] = "<p>- в разделе найдено подразделов или книг: <b>" + _vars["node"]["node_child_pages"].length + "</b></p>";
				func.log("");
				func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");

				var childNodesHtml = book.view_child_pages({
					"nid" :  _vars["GET"]["nid"],
					"mlid" :  _vars["GET"]["mlid"],
					"child_pages": _vars["node"]["node_child_pages"]
				});
//console.log("childNodesHtml = " + childNodesHtml);
			}
			//----------------------
			
			var node_tpl = _vars["templates"]["node_tpl"];
			var html = node_tpl
			.replace("{{author}}", _vars["node"]["author"] )
			//.replace("{{node-title}}", _vars["node"]["title"] )
			.replace("{{type}}", _vars["node"]["type"] )
			.replace("{{bookname}}", _vars["node"]["bookname"] )
			.replace("{{changed}}", _vars["node"]["changed"] )
			.replace("{{created}}", _vars["node"]["created"] )
			.replace("{{body_value}}", bodyValue )
			.replace("{{child_pages}}", childNodesHtml );


			if( _vars["node"]["bookname"].length === 0){
				html = html.replace("{{node-title}}", _vars["node"]["title"] );
			} else {
				html = html.replace("{{node-title}}", "" );
			}
			
			var node_tpl_url = _vars["templates"]["node_tpl_url"];

			//form node book local url
			var htmlBookLinks = "";
			if( _vars["node"]["book_files"] && _vars["node"]["book_files"].length > 0) {
				var html_book_url = "";
				var subfolder =  _vars["node"]["subfolder"];
				for( var n = 0; n < _vars["node"]["book_files"].length; n++ ){
					var filename =  _vars["node"]["book_files"][n];
					var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );
					if( filename.lastIndexOf('#') > 0 ) {
						var s_filename = filename.substring( 0, filename.lastIndexOf('#') );
					} else {
						var s_filename = filename;
					}

					if( filename.indexOf("http") !== -1) {//external link
						var url = s_filename;
					} else {//local file
						var url = config["content_location"] + "/"+ subfolder + "/" + s_filename;
					}

					html_book_url += node_tpl_url
							.replace("{{link-title}}", link_title)
							.replace("{{url}}", url);
				}//next book file

				htmlBookLinks = _vars["templates"]["node_tpl_book_links"].replace("{{list}}", html_book_url);
				
			} else {
			}
			html = html.replace("{{book-links}}", htmlBookLinks);

			
			//add cloud disk links
			var htmlWrapCloudLinks = "";
			if( _vars["node"]["book_files"] && _vars["node"]["book_files"].length > 0) {
				var html_cloud_links = add_cloud_links( config["url_book_location_Mail"] );
				html_cloud_links += add_cloud_links( config["url_book_location_Yandex"] );
				//html_cloud_links += add_dropbox_links();
				htmlWrapCloudLinks = _vars["templates"]["node_tpl_cloud_links"].replace("{{list}}", html_cloud_links);
			}
			html = html.replace("{{cloud-links}}", htmlWrapCloudLinks);

//-------------------------- form node book external links
			var htmlWrapExternalLinks = "";
			if( _vars["node"]["book_links"].length > 0 ){
				
				var html_external_links = "";
				for( var n = 0; n < _vars["node"]["book_links"].length; n++ ){
					var link =  _vars["node"]["book_links"][n];
					var link_title = link.substring( link.lastIndexOf('#')+1, link.length );
					if( link.lastIndexOf('#') > 0 ) {
						var s_link = link.substring( 0, link.lastIndexOf('#') );
					} else {
						var s_link = link;
					}

					html_external_links += node_tpl_url
							.replace("{{link-title}}", link_title)
							.replace("{{url}}", s_link);
				}//next
				htmlWrapExternalLinks = _vars["templates"]["node_tpl_external_links"].replace("{{list}}", html_external_links);
				
			}
			html = html.replace("{{external-links}}", htmlWrapExternalLinks);


			//form node old book url
			var html_book_url2 = "";
			for( var n = 0; n < _vars["node"]["book_url"].length; n++ ){
				var link =  _vars["node"]["book_url"][n];

				html_book_url2 += node_tpl_url
						.replace("{{link-title}}", link)
						.replace("{{url}}", link);
			}//next book url
			html = html.replace("{{book-old-url}}", html_book_url2);



			//form node taxonomy menu
			var htmlWrapTermins = "";
			if( _vars["node"]["termins"].length > 0 ){
				var html_termin_links = "";
				var node_tpl_url = _vars["templates"]["node_tpl_termins_item"];

				for( var n = 0; n < _vars["node"]["termins"].length; n++ ) {
					var link_title = _vars["node"]["termins"][n]["name"];
					html_termin_links += node_tpl_url
							.replace("{{link-title}}", link_title)
							.replace("{{vid}}", "")
							.replace("{{tid}}", _vars["node"]["termins"][n]["tid"] );
							
				}//next termin
				htmlWrapTermins = _vars["templates"]["node_tpl_termins"].replace("{{list}}", html_termin_links);
			}
			html = html.replace("{{termin-links}}", htmlWrapTermins);
			
			return html;
		}//end _view_node()




		var taxonomy_obj = {
			"get_xml_taxonomy" : function(){
				return _get_xml_taxonomy();
			},
			"view_vocabulary" : function( vocabulary_name, recourse ){
				var html = _view_vocabulary( vocabulary_name, recourse );
				return html;
			},
			"view_termin" : function( params ) {
				var html = _view_termin( params );
				return html;
			}
		};

		//read xml data
		function read_taxonomy_data(){
			var xml = _vars["xml"];
			taxonomy_obj["taxonomy_vocabulary"] = $(xml).find( "taxonomy_vocabulary" ).find("record");
			taxonomy_obj["taxonomy_term_hierarchy"] = $(xml).find( "taxonomy_term_hierarchy" ).find("termin");
			taxonomy_obj["taxonomy_term_data"] = $(xml).find( "taxonomy_term_data" ).find('termin');
			
			//taxonomy_obj["taxonomy_index"] = $(xml).find( "taxonomy_index" ).find("record");
			
		}//end read_taxonomy_data()

		function _get_xml_taxonomy(){
			var taxonomy = [];
			$( taxonomy_obj.taxonomy_vocabulary ).each(function()
			{
				var item = $(this);
				var name = item.children('m_name').text();
				var vocabulary = {
					//"name" : item.children('name').text(),
					"vid" : item.attr('vid'),
					"termins" : get_termins( item.attr('vid') )
				};
				taxonomy[name] = vocabulary;
			});//end each
			
//runtime: 0.655 sec
/*			
 			var taxonomy_vocabulary = $(xml).find( table_name ).find('item');
			for( var n = 0; n < taxonomy_vocabulary.length; n++)
			{
//console.log( n, x_nodes[n] );
				var voc = $( taxonomy_vocabulary[n] );
				var name = voc.children('m_name').text();
				var vocabulary = {
					"vid" : voc.attr('vid')//,
					//"termins" : get_termins( voc.attr('vid') ),
				};
				taxonomy[name] = vocabulary;
			}//next voc
*/			

/*
			put_to_storage("taxonomy", taxonomy, function(){
//console.log(arguments);				
			});
*/
			return taxonomy;
			
			function get_termins( vid ){
				var termins = [];
				$( taxonomy_obj.taxonomy_term_data ).each(function()
				{
					var item = $(this);
					if ( item.attr('vid') === vid ){
						var term_obj = {
							"name" : item.children('name').text(),
							"description" : item.children('description').text(),
							"vid" : item.attr('vid'),
							"tid" : item.attr('tid')//,
							//"parent_value" : get_termin_info( item.attr('tid'), term_hierarchy )
						};
						termins.push( term_obj );
					}
				});//end each

				//get termins hierarchy
				var parent_value = false;
				$( taxonomy_obj.taxonomy_term_hierarchy ).each(function()
				{
					var item = $(this);
					var tid = item.attr('tid');
					for( var n = 0; n < termins.length; n++)
					{
						if( tid === termins[n]["tid"])
						{
							termins[n]["parent_value"] = item.attr('parent');
							//break;
						}
					}//next termin
				});//end each

				return termins;
			}//end get_termins()
/*
			function get_termin_info( tid, table )
			{
				var parent_value = false;
				$( table ).each(function()//8412 вхождений.!!!!!!!!!!!!!!!!!
				{
					var item = $(this);
					if ( item.attr('tid') === tid )
					{
						parent_value = item.attr('parent');
						return false;
					}
				});//end each
//console.log(tid, parent_value);
				return parent_value;
			}//end get_termin_info()
*/
		}//end _get_xml_taxonomy()

		
		function _view_vocabulary ( vocabulary_name, recourse ) {
			if( typeof _vars["taxonomy"][vocabulary_name] === "undefined")
			{
console.log("error, vocabulary not found " + vocabulary_name);			
				return;
			}

			var item_tpl = _vars["templates"]["taxonomy_list_item_tpl"];
			var list_tpl = _vars["templates"]["taxonomy_list_tpl"];
			//var url_tpl = _vars["templates"]["taxonomy_url_tpl"];
			
			//var block_title = "<h4>book tags:</h4>";
			var html = "";
			for( var n = 0; n < _vars["taxonomy"][vocabulary_name]["termins"].length; n++ )
			{
				var termin = _vars["taxonomy"][vocabulary_name]["termins"][n];
				if( termin["parent_value"] === "0"){
					
					//var url = url_tpl
					//.replace("{{vid}}", termin["vid"])
					//.replace("{{tid}}", termin["tid"]);
					
					html += item_tpl
					.replace("{{link-title}}", termin["name"])
					.replace("{{vid}}", termin["vid"])
					.replace("{{tid}}", termin["tid"]);
					//.replace("{{url}}", url);
					
					if( recourse ) {
						var params = [];
						params["termins"] = _vars["taxonomy"][vocabulary_name]["termins"]; 
						params["vid"] = termin["vid"];
						params["tid"] = termin["tid"]; 
						params["recourse"] = recourse;
						var html_children_termins = list_children_termins( params );
						if( html_children_termins.length > 0) {
							html += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			html = list_tpl
			//.replace("{{block-title}}", block_title)
			.replace("{{list}}", html);
			return html;
			
		}//end _view_vocabulary()

		function list_children_termins( params ) {
//console.log(arguments);
			var termins = params["termins"]; 
			var vid = params["vid"];
			var tid = params["tid"]; 
			var recourse = params["recourse"];
			var item_tpl = params["item_tpl"];
			var list_tpl = params["list_tpl"];
			//var url_tpl = params["url_tpl"];
			
			var html = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["parent_value"] === tid )
				{
					//var url = url_tpl
					//.replace("{{vid}}", termin["vid"])
					//.replace("{{tid}}", termin["tid"]);
					
					html += item_tpl
					.replace("{{link-title}}", termin["name"])
					.replace("{{vid}}", termin["vid"])
					.replace("{{tid}}", termin["tid"]);
					//.replace("{{url}}", url);
					
					if( recourse ) {
						params["termins"] = termins; 
						params["vid"] = termin["vid"];
						params["tid"] = termin["tid"]; 
						params["recourse"] = recourse;
						params["item_tpl"] = item_tpl;
						params["list_tpl"] = list_tpl;
						//params["url_tpl"] = url_tpl;
						var html_children_termins = list_children_termins( params);
						if( html_children_termins.length > 0) {
							html += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			return html;
		}//end list_children_termins();
		
		function _view_termin( params )	{
//console.log("TEST2", params);			
			var termins = params["termins"]; 
			var vid = params["vid"];
			var tid = params["tid"];
			var recourse = params["recourse"];
			var show_only_children = params["show_only_children"];
			
			var item_tpl = params["item_tpl"];
			var list_tpl = params["list_tpl"];
			//var url_tpl = params["url_tpl"];
			
			var html = "", html_list = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["tid"] === tid)
				{
					if( !show_only_children )
					{
						//var url = url_tpl
						//.replace("{{vid}}", termin["vid"])
						//.replace("{{tid}}", termin["tid"]);
						
						html_list += item_tpl
						.replace("{{link-title}}", termin["name"])
						.replace("{{vid}}", termin["vid"])
						.replace("{{tid}}", termin["tid"]);
						//.replace("{{url}}", url);
					}
					
					if( recourse )	{
						var params = [];
						var html_children_termins = list_children_termins({
"termins": termins,
"vid": termin["vid"],
"tid": termin["tid"], 
"recourse": recourse,
"list_tpl": list_tpl,
"item_tpl": item_tpl
//"url_tpl": url_tpl;
							
						});
						
						if( html_children_termins.length > 0){
							html_list += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			
			html += list_tpl
			.replace("{{block-title}}", "")
			.replace("{{list}}", html_list);
			return html;

		}//end _view_termin()
		


		var book = {
			"get_book_category" : function(){
				_get_book_category();
			},
			"get_child_pages" : function( params ) {
				var plid = params["plid"];
				var recourse = params["recourse"];
				var nodes = _get_child_pages( plid, recourse );
				return nodes;
			},
			"view_book_category" : function(){
				var html = _view_book_category();
				return html;
			},
			"view_child_pages" : function( params ) {
				var html = _view_child_pages( params );
				return html;
			}
		};
		
		
		function _get_book_category(){
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++) {
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') == "0") {
					var nodes = _get_child_pages( $(node).attr('mlid'), 0);
				}
			};//next node
			
			return nodes;
			
		}//end _get_book_category()

		function _get_child_pages( plid, recourse ){
			var nodes = [];
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++) {
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') === plid )
				{
					nodes.push( node );
					if( $(node).attr('mlid').length > 0 )
					{
						if ( recourse === 1){
							//var children_nodes = list_children_pages( $(node).attr('mlid'), 1 );
var children_nodes = list_child_pages( $(node).attr('mlid'), 1 );
							nodes.push( children_nodes );
						}
					}
				}
			};//next node
			
			return nodes;
		}//end _get_child_pages()

		function _view_book_category() {
			if( typeof _vars["book_category"] === "undefined"){
console.log("error, not found _vars[book_category], function parse_book_category( container )");
				return;
			}
			
			var html = "";
			for( var n = 0; n < _vars["book_category"].length; n++) {
				var node = _vars["book_category"][n];
				
				html += _vars["templates"]["book_category_item_tpl"]
.replace(/{{page-title}}/g, $(node).attr('title') )
.replace("{{nid}}", $(node).attr('nid') )
.replace("{{mlid}}", $(node).attr('mlid') )
.replace("{{plid}}", $(node).attr('plid') )
.replace("{{type}}", $(node).attr('type') );
			}//next

			html = _vars["templates"]["book_category_tpl"].replace("{{list}}", html );
			return html;
		}//end _view_book_category()
		
		
		function _view_child_pages( p ) {
//console.log("function view_child_pages", p);

			if( typeof p["child_pages"] === "undefined") {
				var log = "- error, not found child_pages";
//console.log(message);
				//_vars["info"].push( message );
_vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				
				return;
			}
			
			if( p["child_pages"].length === 0) {
console.log("child_pages is empty!!!");
				return;
			}

			//list child pages
			var list_tpl = _vars["templates"]["book_child_pages_tpl"];
			var item_tpl = _vars["templates"]["book_child_pages_item_tpl"];
			
			var html = "", html_list = "";
			
			for( var n = 0; n < p["child_pages"].length; n++ ) {
				
				var type = $(p["child_pages"][n]).attr("type");
				var nid = $(p["child_pages"][n]).attr("nid");
				var mlid = $(p["child_pages"][n]).attr("mlid");
				var plid = $(p["child_pages"][n]).attr("plid");
				var title = $(p["child_pages"][n]).attr("title");
				html_list += item_tpl
				.replace("{{type}}", type)
				.replace("{{nid}}", nid)
				.replace("{{mlid}}", mlid)
				.replace("{{plid}}", plid)
				.replace("{{link-title}}", title);

			}//next child_page
			
			html = list_tpl.replace("{{list}}", html_list);
//console.log( html );

			return html;
		};//end _view_child_pages(p)

		
		function draw_page( params ){
			
			//content gradient	correct height
			//var h = $(".b-content").height();
			//var h = $("#region-content").height();
//console.log("b-content.height = " + h);			
			//$(".b-content .grad").height(h);
			
			//clear content area
			$("#region-content #block-taxonomy").empty( html );
			$("#region-content #block-nodes").empty( html );

//--------------------- BLOCK #sitename-block
			_buildBlock({
				"locationID" : "sitename-block",
				"templateID" : "tpl-block--sitename"//,
				//"content" : "<h1><a class='title' href='./'>my lib</a></h1>" 
			});
//---------------------
			
			if( typeof _vars["book_category"] !== "undefined" ) {
				if( _vars["book_category"].length > 0 ) {
					//var html = book.view_book_category();
					//$("#block-book-category").html( html );
					
//--------------------- BLOCK #block-book-category
					_buildBlock({
						"locationID" : "block-book-category",
						//"title" : "test block",
						"templateID" : "tpl-block--book-category",
						//"contentTpl" : "tpl-termin_nodes",
						//"contentListTpl" : "tpl-termin_nodes_list",
						"content" : book.view_book_category
/*						
						"content" : function(args){ //function for getting content data
console.log(args);							
								//var res = _vars["book_category"];
								//if( typeof args["callback"] === "function"){
									//args["callback"]( res );
								//}
							return "111";
						}//end callback
*/							
					});
//---------------------
					
					//mark root links for breadcrumb navigation
					$("#block-book-category .nav-click").addClass("root-link");			
			
				}
			} else {
console.log("error, not found _vars[book_category]");
			}
			
			
//--------------------- BLOCK
			_buildBlock({
				"locationID" : "block-library",
				"templateID" : "tpl-block--tags",
				"content" : _view_vocabulary( "library", recourse = false )
			});

			//mark root links for breadcrumb navigation
			$("#block-library .nav-click").addClass("root-link");			
//---------------------
			
//--------------------- BLOCK
			_buildBlock({
				"locationID" : "block-tags",
				//"title" : "Tags",
				"templateID" : "tpl-block--tags",
				"content" : _view_vocabulary( "tags", recourse = false )
			});
			//mark root links for breadcrumb navigation
			$("#block-tags .nav-click").addClass("root-link");			
//---------------------

//--------------------- BLOCK
			//view alphabetical

			var html = taxonomy_obj.view_termin({
				"termins": _vars["taxonomy"]["alphabetical_voc"]["termins"],
				"vid": "4",
				"tid": "116",
				"recourse": true,
				"show_only_children": true,
				"item_tpl": _vars["templates"]["tpl-block--taxonomy_alpha_list"],
				"list_tpl": _vars["templates"]["tpl-block--taxonomy_alpha"]//,
				//"url_tpl": _vars["templates"]["taxonomy_url_tpl"]
			});
			
			html += taxonomy_obj.view_termin({
				"termins": _vars["taxonomy"]["alphabetical_voc"]["termins"],
				"vid": "4",
				"tid": "115",
				"recourse": true,
				"show_only_children": true,
				"item_tpl": _vars["templates"]["tpl-block--taxonomy_alpha_list"],
				"list_tpl": _vars["templates"]["tpl-block--taxonomy_alpha"]//,
				//"url_tpl": _vars["templates"]["taxonomy_url_tpl"]
			});
			
			//$("#block-taxonomy-alpha").html( html );
			
			_buildBlock({
				"locationID" : "block-taxonomy-alpha",
				"templateID" : "tpl-block--tags",
				"content" : html
			});
			
			//mark root links for breadcrumb navigation
			$("#block-taxonomy-alpha .nav-click").addClass("root-link");			
//---------------------
			

			//view termin nodes
			if ( _vars["GET"]["q"] === "termin_nodes" ) {
				
				if( _vars["GET"]["vid"] === "2" || _vars["GET"]["vid"] === "1"){
					
if( _vars["GET"]["vid"] === "2" ){
	var termins = _vars["taxonomy"]["library"]["termins"];
}
if( _vars["GET"]["vid"] === "1" ){
	var termins = _vars["taxonomy"]["tags"]["termins"];
}
//console.log("TEST1", termins);			
		
					//view children termin
					var html = taxonomy_obj.view_termin({
						"termins": termins,
						"vid": _vars["GET"]["vid"],
						"tid": _vars["GET"]["tid"],
						"recourse": true,
						"show_only_children": false,
						
						"item_tpl": _vars["templates"]["taxonomy_list_item_tpl"],
						"list_tpl": _vars["templates"]["taxonomy_list_tpl"]//,
						
						//"url_tpl": _vars["templates"]["taxonomy_url_tpl"]
					});
					
					_buildBlock({
						"locationID" : "block-taxonomy",
						"templateID" : "tpl-block--tags",
						"content" : html
					});
					
				}
				
				//if ( _vars["termin_nodes"].length > 0){
					_buildBlock({
						"locationID" : "block-node",
						"templateID" : "tpl-block--termin-nodes",
						"content" : nodes_obj.viewNodes({
							"nodes": _vars["termin_nodes"],
							"nodes_tpl": _vars["templates"]["termin_nodes_tpl"],
							"node_tpl": _vars["templates"]["termin_nodes_item_tpl"]
						})
					});
				//} else {
//console.log("TEST");
				//}
			}
			
			//view book node
			if ( _vars["GET"]["q"] === "book_page" ) {
				render_node();
			}
			
			//view node
			if ( _vars["GET"]["q"] === "node" ){
				render_node();
			}


			if ( _vars["GET"]["q"] === "search" ){
				_buildBlock({
					"locationID" : "block-node",
					"templateID" : "tpl-block--search-nodes",
					"content" : nodes_obj.viewNodes({
						"nodes": _vars["nodes"]
					})
				});
			}


			//hide blocks on small screens
			if ( _vars["GET"]["q"] && _vars["GET"]["q"].length > 0 ){
				if( $(".navbar-header").is(":visible") &&
					document.body.clientWidth < 990) {
					$("#bs-navbar-collapse-1").hide("slow");
				}
			}
			
//---------------------- render breadcrumb
			var html_breadcrumb="";
			var clear = false;

			for( var key in _vars["breadcrumb"]){
				var url = _vars["breadcrumb"][key].url;
				var title = _vars["breadcrumb"][key].title;
				
				if( clear ){//clear unuseful tail breadrumbs
					delete _vars["breadcrumb"][key];
				} else {
					
					if( url !== _vars["currentUrl"]){
						html_breadcrumb += _vars["templates"]["breadcrumb_item_tpl"]
						.replace("{{item-url}}", url )
						.replace("{{item-title}}", title );
					} else {
						html_breadcrumb += "<li class='active-item'>" + title + "</li>";
						//html_breadcrumb += "<span class='btn btn-info active-item'>" + title + "</span>";
					}
					
				}
				
				if( url === _vars["currentUrl"]){
					clear = true;
				}
				
			}//next
			
//console.log(html_breadcrumb);
			$("#breadcrumb-tpl").html( html_breadcrumb );
			
			
			function render_node(){

				//$("#region-content #block-nodes").html( html );
				_buildBlock({
					"locationID" : "block-node",
					"templateID" : "tpl-block--node",
					"content" : function(){
						var html = nodes_obj.view_node({
							"nid" :  _vars["GET"]["nid"]
						});
						
//console.log(html);				
						if(!html){
							_vars["logMsg"] = "- error, render_node("+_vars["GET"]["nid"]+")";
							//func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
							return false;
						}
						return html;
					},
					"postFunc": function(){
//console.log( "render_node(), build block-nodes, postFunc" );
						if( _vars["node"]["book_files"].length === 0 ){
							$("#cloud-links").hide();
							$("#book-links").hide();
						}
						
						if( _vars["node"]["book_links"].length > 0 ){
		//console.log(_vars["node"]["book_links"].length, $("#external-links").attr("id"));
							$("#external-links").show();
						} else {
							$("#external-links").hide();
						}
						
						if( _vars["node"]["termins"].length === 0 ){
							$("#termins").hide();
						} else {
							$("#termins .nav-click").addClass("root-link");			
						}

					}//end postFunc
				});
				
			}//end render_node()
			
		}//end function draw_page()

//====================================

		var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
			var timeStart = new Date();

			var p = {
				"title": "",
				"locationID" : "",
				"content" : "",
				//"contentType" : "",
				"templateID" : "tpl-block",
				
				//"contentTpl" : "tpl-list",//"tpl-menu"
				//"contentListTpl" : false,
				
				"callback" : function(){
					var timeEnd = new Date();
					var ms = timeEnd.getTime() - timeStart.getTime();
					var msg = "Generate block '#" + this.locationID +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
//console.log(msg);

					//_vars["runtime"].push({
						//"source" : msg,
						//"ms" : ms,
						//"sec" : ms / 1000
					//});
					
					if( typeof p["postFunc"] === "function"){
						p["postFunc"]();//return from _buildBlock()
					}
					
				},//end callback
				"postFunc" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
		
			// if( p["content"].length === 0 ){
	// _log("<p>app.buildBlock,   error, content is <b class='text-danger'>empty</b></p>");
				// return false;
			// }

			//render dynamic content
			if( typeof p["content"] === "function"){
				var html = p["content"]();
				if( html && html.length > 0){
					_insertBlock( p );
				}
/*				
				p["content"]({
					"callback" : function( res ){
console.log(res);								

						var html = _wrapContent({
							"data" : res,
							//"type" : "menu",//"list"
							//"contentType" : p["contentType"],
							"templateID" : p["contentTpl"],
							"templateListID" : p["contentListTpl"]
						});
						
//console.log(html);								
						//var html = "<h1>Test!!!</h1>";
						if( html && html.length > 0){
							p["content"] = html;
							_insertBlock( p );
						}
					}
				});
*/				
			} else {//render static content
				_insertBlock( p );
			}

		};//end _buildBlock()
		
		var _insertBlock = function( opt ){
			
			var p = {
				"templateID": false,
				"locationID": "",
				"title" : "",
				"content" : false,
				"callback":null
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log("_insertBlock(): ", p);

			var templateID = p["templateID"];
			if( !_vars["templates"][templateID] ){
_vars["logMsg"] = "_insertBlock(),  error, not find template, id: <b>" + templateID + "</b>";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}

			if( p["locationID"] === "" ){
_vars["logMsg"] = "_insertBlock(),  error, not find template location on page...";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}

			// if( !p["content"] ){
	// _log("<p>draw.insertBlock(),   error, content: <b class='text-danger'>" + p["content"] + "</b></p>");
				// return false;
			// }
			
			var html = _vars["templates"][templateID];
			
			html = html.replace("{{block_title}}", p["title"]);
			html = html.replace("{{content}}", p["content"]);
			
			var locationID = func.getById( p["locationID"] );
			if( locationID){
				locationID.innerHTML = html;
			}		
			
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}

		};//end _insertBlock()
/*		
		function _wrapContent( opt ){
			var p = {
				"data": null,
				//"type" : "",
				//"wrapType" : "menu",
				"templateID" : false,
				"templateListID" : false
			};
			//extend options object
			for(var key in opt ){
				p[key] = opt[key];
			}
console.log(p);

			if( !p["data"] || p["data"].length === 0){
_vars["logMsg"] = "_wrapContent(),  error, empty content data...";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}
			if( !p["templateID"] ){
_vars["logMsg"] = "_wrapContent(),  error, empty templateID...";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}
			
			if( !_vars["templates"][p.templateID] ){
_vars["logMsg"] = "_wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID + "</b>";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}

			var html = "000";
			
console.log( p["data"].length );
			p["wrapType"] = "item";
			if( p["data"].length > 0 ){
				p["wrapType"] = "list";
			}
			
			switch( p["wrapType"] ){
				case "item" :
					//html = __formNodeHtml( p["data"], _vars["templates"][ p.templateID ] );
				break;
				case "list" :
					if( !p["templateListID"] ){
_vars["logMsg"] = "_wrapContent(),  error, not find <b>templateListID</b>";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
						return false;
					}
					html = __formListHtml( _vars["templates"][ p.templateID ] );
				break;
			}//end switch

console.log(html);
			return html;

			function __formListHtml( _html ){
				
				var listHtml = "";
				for( var n = 0; n < p["data"].length; n++){
	//console.log( n );
	//console.log( p["data"][n], typeof p["data"][n], p["data"].length);
					
					//form list items
					var item = p["data"][n];
						
					//var itemTpl = _vars["templates"][ p.templateListID];
					//var itemHtml = __formNodeHtml( item, itemTpl );
					
					var itemHtml = _vars["templates"][ p.templateListID];
					for( var key2 in item){
	//console.log(key2, item[key2]);

						if( key2 === "childTerms" && item["childTerms"].length > 0){
							var subOrdList = _vars["templates"][ p.templateID];
							var itemTpl = _vars["templates"][ p.templateListID];
							var subOrdListHtml = "";
							for( var n2 = 0; n2 < item["childTerms"].length; n2++){
								subOrdListHtml += __formNodeHtml( item["childTerms"][n2], itemTpl );
							}//next
	//console.log( subOrdListHtml );
							subOrdList = subOrdList
							.replace("list-unstyled", "")
							.replace("{{list}}", subOrdListHtml);
	//console.log( subOrdList );
	//itemHtml += subOrdList;
							item["childTerms"] = subOrdList;
							itemHtml = itemHtml.replace("</li>", "{{childTerms}}</li>");
						} //else {
							//itemHtml = itemHtml.replace("{{childTerms}}", "");
						//}
						
						if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
	// //console.log(key2, item[key2]);
							itemHtml = itemHtml.replace("{{"+key2+"}}", item[key2]);
						}
					}//next
						
					listHtml += itemHtml;
	//console.log(items);
	//console.log(listHtml);
				}//next
				
				_html = _html.replace("{{list}}", listHtml);
				return _html;
			}//end __formListHtml

			function __formNodeHtml( data, _html ){
				
				for( var key in data ){
	//console.log(key, data[key]);

					if( key === "nodeTerms" && data["nodeTerms"].length > 0){
						var nodeTermsList = _vars["templates"]["tpl_node_terms"];
						var itemTpl = _vars["templates"]["tpl-taxonomy-menu_list"];
						var _listHtml = "";
						for( var n2 = 0; n2 < data["nodeTerms"].length; n2++){
							_listHtml += __formNodeHtml( data["nodeTerms"][n2], itemTpl );
						}//next
	//console.log( _listHtml );
						nodeTermsList = nodeTermsList.replace("{{list}}", _listHtml);
	//console.log( nodeTermsList );
						data["nodeTerms"] = nodeTermsList;
					}

					if( _html.indexOf("{{"+key+"}}") !== -1 ){
	//console.log(key, p["data"][key]);
						_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
					}
				}//next
				
				return _html;
			}//end __formNodeHtml()
			
		}//end _wrapContent
*/		
//====================================


		function define_event() {

			$("body").on("click", ".navbar-toggle", function(e){
				var target = $(this).data("target");
//console.log(e, target);
				$(target).slideToggle( "slow" );
				//if( $(target).hasClass("collapse") ){
					//$(target).removeClass("collapse");
				//} else {
					//$(target).addClass("collapse");
				//}
				e.preventDefault();
			});//end event
			

			$("body").on("click", "#service-panel .nav-tabs a", function(e){
				var active_tab = $(this).attr("href");
//console.log( active_tab, $(this).parent() );

				$("#sevice-panel .nav-tabs li").removeClass("active");
				$(this).parent().addClass("active");
				
				$("#service-panel .tab-content .tab-pane").removeClass("active in");
				$(active_tab).addClass("active in");
/*				
				if( active_tab === "#info-tab" ){
//breadcrumb object
 					var html = "";
					
					var size_obj = count_object_bytes( _vars["nodes"] );
					html += "<li>";
					html += "_vars['nodes']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( _vars["taxonomy"] );
					html += "<li>";
					html += "_vars['taxonomy']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( _vars["templates"] );
					html += "<li>";
					html += "_vars['templates']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( _vars["termin_nodes"] );
					html += "<li>";
					html += "_vars['termin_nodes']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";


					$("#size__vars").html( html );
				};
*/				
				e.preventDefault();
			});//end event


			//if ( config["use_localcache"] ) {
				$("#btn-localforage-clear").on("click", function(e){
	
if ( config["use_localcache"] ) {
					localforage.clear(function(err) {
var logMsg = "Clear storage, error: " + err;
func.log("<div class='alert alert-info'>" + logMsg + "</div>");
console.log( logMsg );
					});
} else {
var logMsg = "Cannot use storage, error...";
func.log("<div class='alert alert-danger'>" + logMsg + "</div>");
console.log( logMsg );
}	
					$("#service-panel").hide();

				});//end event
				
			//} else {
				//$("#btn-localforage-clear").hide();
			//}	

			$("#btn-load-export").on("click", function(e){
				if (e.preventDefault) { 
					e.preventDefault();
				} else {
					e.returnValue = false;				
				}
				var url = $("#export-script-url").val(); 
				e.href = url;
//console.log(e.href);				
				window.open(e.href);
			});//end event

			$("#btn-load-import").on("click", function(e){
				if (e.preventDefault) { 
					e.preventDefault();
				} else {
					e.returnValue = false;				
				}
				var url = $("#import-script-url").val(); 
				e.href = url;
//console.log(e.href);				
				window.open(e.href);
			});//end event

			window.onresize = function(event) {
				if( document.body.clientWidth > 990){
					if( !$("#bs-navbar-collapse-1").is(":visible") ){
console.log("w = " + document.body.clientWidth );
						$("#bs-navbar-collapse-1").show("slow");
					}
				}
			}//end event

			//Search by parameters
			$("#form-search").on("submit", function(event){
//console.log("Submit form", event, this);
				event = event || window.event;
				var target = event.target || event.srcElement;
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}
				
//console.log(this["targetField"].value);
//console.log(this.keyword.value);


//console.log(target.targetField.value);
//console.log(target.keyword.value);

//console.log(target.keyword.value);
				var form = document.forms["formSearch"]
//console.log(form);
//console.log(form.elements.targetField.value);
//console.log(form.elements.keyword.value);

//for( var key in form.elements.targetField){
//console.log("key:"+key+", value:"+form.elements.targetField[key]);
//}

//console.log( $(form.elements.targetField).val() );


				//check input values
				var res = true;
				
				var _keyword = $(form.elements.keyword).val();
				if( _keyword.length === 0 ){
_vars["logMsg"] = "error, empty field 'keyword'....";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
					res = false;
				}
				
				var _targetField = $(form.elements.targetField).val();
//console.log( _targetField.length );
				if( _targetField.length === 0 ){
_vars["logMsg"] = "error, empty field 'targetField'....";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
					res = false;
				}
				
				if(res){
					var parseStr = target.action+"&targetField="+_targetField+"&keyword="+_keyword; 
//console.log( parseStr );
					if( parseStr.length > 0 ){
						_vars["GET"] = func.parseGetParams( parseStr ); 
						_urlManager(target);
					} else {
_vars["logMsg"] = "Warning! cannot parse url: " + target.action;
func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
					}
				}

			});//end event


			if( _vars["appContainer"] ){
				_vars["appContainer"].onclick = function(event){
					
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
						if ( target.href.indexOf("?q=") !== -1){

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
								_vars["GET"] = func.parseGetParams( parseStr ); 
								_urlManager(target);
							} else {
_vars["logMsg"] = "Warning! cannot parse url: " + target.href;
func.log("<div class='alert alert-warning'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
								}

						}
					}
					
				}//end event
			}
			
		}//end define_event()
		

		function _urlManager(target){
//console.log(target, _vars["GET"]);


			switch( _vars["GET"]["q"] ) {
				
				case "toggle-log":
//console.log(_vars["log"]..style.display);
					if( _vars["log"].style.display==="none"){
						_vars["log"].style.display="block";
						_vars["btnToggle"].innerHTML="-";
					} else {
						_vars["log"].style.display="none";
						_vars["btnToggle"].innerHTML="+";
					}
				break;
				
				case "clear-log":
					_vars["log"].innerHTML="";
				break;
				
				case "service-panel-view":
//console.log( _vars["info"] );
					$("#service-panel .message").html( _vars["info"] );
					$("#service-panel").toggle();
				break;
				
				case "termin_nodes":
_vars["timeStart"] = new Date();

					_vars["termin_nodes"] = [];
					_vars["termin_nodes"] = nodes_obj.get_termin_nodes({
						"tid" : _vars["GET"]["tid"]//,
						//"target" : target
					});
					
					//if( _vars["termin_nodes"].length > 0){
						_formBreadcrumb( target );
						draw_page();
						
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
_vars["logMsg"] = "<p>- nodes_obj.get_termin_nodes("+_vars["GET"]["tid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec</p>";

						//if( _vars["termin_nodes"].length > 0){
							_vars["logMsg"] += "<p>- найдено <b>" + _vars["termin_nodes"].length + "</b> книг, связанных с термином</p>";
						//}
						
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
						
					//} else {
//console.log("--- end of the execution process...");						
					//}
					
				break;
				
				case "book_page": 
				case "node": 
_vars["timeStart"] = new Date();

					_vars["node"] = nodes_obj.get_node({
						"nid" : _vars["GET"]["nid"]
					});
					
					_formBreadcrumb( target );
					draw_page();
					
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
//_vars["logMsg"] = "- nodes_obj.get_node("+_vars["GET"]["nid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec";
_vars["logMsg"] = "- nodes_obj.get_node("+_vars["node"]["nid"]+"), book.get_child_pages("+ _vars["node"]["mlid"] +"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
				break;

				case "search":
					$("#service-panel").hide();
					_vars["nodes"] = nodes_obj.searchNodes({
						"targetField": _vars["GET"]["targetField"],
						"keyword": _vars["GET"]["keyword"]
					});
					draw_page();
				break;

			
				default:
console.log("_urlManager(),  GET query string: ", _vars["GET"]);			
				break;
			}//end switch
			
//---------- fix b-content height
var _newHeight = $("#block-content").height();
//console.log(_newHeight);
$(".b-content").height(_newHeight);
//----------------------

		}//end _urlManager()

		function _formBreadcrumb( target ){
			
			if( $(target).hasClass("root-link") ){
				_vars["breadcrumb"] = {};
			}
			
			//form unique key 
			var breadcrumbKey = _vars["GET"]["q"];
			for( var key in _vars["GET"]){
				if( key === "q"){
					continue;
				}
				breadcrumbKey += _vars["GET"][key];
			}
			//console.log(breadcrumbKey);

			_vars["breadcrumb"][ breadcrumbKey ] = {
				"title" : $(target).text(),
				"url" : $(target).attr("href")
			};
			_vars["currentUrl"] = $(target).attr("href");
		}//end _formBreadCrumb()


		function add_cloud_links( cloudUrl ) {//form link on cloud file
//console.log("function add_cloud_links", cloudUrl);			
			var html = "";
			
			var node_tpl_url = _vars["templates"]["node_tpl_cloud_links_item"];
			var subfolder =  _vars["node"]["subfolder"];
			
			for( var n = 0; n < _vars["node"]["book_files"].length; n++ ){
				var filename =  _vars["node"]["book_files"][n];
				var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );
				if( filename.lastIndexOf('#') > 0 )	{
					var s_filename = filename.substring( 0, filename.lastIndexOf('#') );
				} else {
					var s_filename = filename;
				}

				if( filename.indexOf("http") !== -1){//external link
					var url = s_filename;//?????????????????????
				} else { //local file
					var url = cloudUrl + "/"+ subfolder + "/" + s_filename;
				}
				
var directLink = "";
var btnCopyUrl = "";
var btnOmniReader = "";
var desc = "";
//-------------
if(cloudUrl.indexOf("mail.ru") !== -1 ){
	desc = "Mail.ru cloud disk: ";
	directLink = "<div id='link-"+n+"'>" + url+"</div>";
	
//------------- add COPY LINK BUTTON
	if(config["addCopyLink"]){
		btnCopyUrl = "<button id='btn-copy-"+n+"' class='btn btn-primary btn-sm btn-copy-url' data-clipboard-action='copy' data-clipboard-target='#link-"+n+"'>Copy link to the clipboard</button>";
		
		var clipboard = new ClipboardJS("#btn-copy-"+n);
//console.log( "TEST!", clipboard );

		clipboard.on('success', function(e) {
	console.log("Copy link success, ", e);
//window.location.href = e.text;	
//var params = "";
//window.open(e.text, "name", params)
		});

		clipboard.on('error', function(e) {
	console.log("error copy link", e);
		});
	}
	//-------------
	btnOmniReader = "<a href='http://omnireader.ru/?url="+url+"' rel='noreferrer' target='_blank' class='btn btn-warning'>omnireader.ru</a>";
}

if(cloudUrl.indexOf("yandex") !== -1 ){
	desc = "Yandex cloud disk: ";
}
//-------------				
				var html_url = node_tpl_url
						.replace("{{link-title}}", link_title)
						.replace(/{{url}}/g, url)
						.replace(/{{description}}/g, desc)
						.replace(/{{direct-link}}/g, directLink)
						.replace("{{btn-copy-url}}", btnCopyUrl)
						.replace("{{btn-omnireader}}", btnOmniReader);

				html += html_url;
			}//next book file
			
//console.log(html);
			return html;
			
		}//end add_cloud_links()
		


		function add_dropbox_links() {
	
			var html = "";
			
			var subfolder =  _vars["node"]["subfolder"];
			for( var n = 0; n < _vars["node"]["book_files"].length; n++ ){
				var filename =  _vars["node"]["book_files"][n];
				
				var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );
				if( filename.lastIndexOf('#') > 0 )	{
					var s_filename = filename.substring( 0, filename.lastIndexOf('#') );
				} else {
					var s_filename = filename;
				}

				var html_url = _vars["templates"]["node_tpl_cloud_Dropbox"]
						.replace("{{link-title}}", link_title)
						.replace("{{subfolder}}", subfolder)
						.replace("{{filename}}", s_filename);

				html += html_url;
			}//next book file
			
			return html;
/*
			//form node book url and generate ajax-request to Dropbox
			var node_tpl_url = _vars["templates"]["dropbox_for_tpl"];
			var subfolder =  _vars["node"]["subfolder"];
			for( var n = 0; n < _vars["node"]["book_files"].length; n++ ){
				var filename =  _vars["node"]["book_files"][n];
				var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );//"dropbox disk link";
				if( filename.lastIndexOf('#') > 0 )	{
					var s_filename = filename.substring( 0, filename.lastIndexOf('#') );
				} else {
					var s_filename = filename;
				}

				if( filename.indexOf("http") !== -1){//external link
					var url = s_filename;//?????????????????????
				} else { //local file
					var url = config["url_lib_location_dropbox"] + "/"+ subfolder + "/" + s_filename;
				}
				
				var html = node_tpl_url
						.replace("{{link-title}}", link_title)
						.replace("{{url}}", url);
				//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
				test_exists_book( url, "HEAD", html );
			}//next book file
*/			
		}//end add_dropbox_links()


/*		
		//
		//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
		function test_exists_book( url, type_request, html ){
			$.ajax({
				url: url,
				type: type_request,
				async: true,
				response:'text',//тип возвращаемого ответа text либо xml
				complete: function(xhr, status) 	{}, 
				success:function(data,status) {
console.log("status - " + status +", url - " + url);
					$("#dropbox-list").append( html );
					$("#dropbox-links").show();
				},
				error:function(data, status, errorThrown){
//console.log("data - " + data);
console.log("status - " + status +", url - " + url);
//console.log("errorThrown - " + errorThrown);
					$("#dropbox-links").hide();
				}
			});
		}//end test_exists_book()
*/


/*
		function get_object_size( obj ) {
			var size = 0;
			for ( var key in obj ){
//console.log( key, typeof obj[key] );
				if ( key.length > 0 ) size++;
			}
			return size;
		};//end  get_object_size( obj ) 
*/		
		
/*		
		function count_object_bytes (obj){
			var size_obj = {
				"bytes" : count_bytes( obj ),
				"Kbytes" : 0
			}
			if( size_obj["bytes"] > 1024 ){ 
				size_obj["Kbytes"] = (size_obj["bytes"] /1024).toFixed(2) 
			}
console.log(size_obj);
			return size_obj;
			
			function count_bytes( obj ){
				var size = 0;
				for(var index in obj) {

					if (Object.prototype.toString.call( obj ) !== '[object Array]'){
						size += 2 * index.length;//key size in bytes
			//console.log( index, index.length, typeof index );
					}

			//console.log( index, obj[index], typeof obj[index] );
					switch (typeof obj[index]){

						case 'boolean': 
							size += 4; 
							break;

						case 'number': 
							size += 8; 
							break;

						case 'string': 
							//size += 2 * obj[index].length; 
			//console.log( encodeURIComponent( obj[index] ), unescape(encodeURIComponent( obj[index] )).length );

							size += unescape(encodeURIComponent( obj[index] )).length;
							break;

						case 'object':

							if (Object.prototype.toString.call( obj[index] ) === '[object Array]'){
								var size2 = 0
								size2 += count_bytes( obj[index]);
								size += size2;
			//console.log( size2, size );
							} else {
								size += count_bytes( obj[index]);
							}
							break;

					}//end switch
				}//next item
				return size;
			}//end count_bytes()
			
		}//end count_object_bytes
*/

		// for unit testing with Jasmine
		var _testApi = {
			nodesObj: nodes_obj,
			taxonomyObj: taxonomy_obj,
			bookObj: book,
			drawPage: draw_page
		};

		// public interfaces
		return{
			testApi:	_testApi,
			vars: _vars, 
			runApp: function( config ){ 
				if( !_vars["appContainer"] ){
				_vars["logMsg"] = "error, not found html container (#App) for web-appllication...";
 func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				} else {
					//init
					_vars["timeStart"] = new Date();
					_init();
				}
			}//,
			
			//load_templates: function( params ){ 
				//return _load_templates( params ); 
			//},
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
	};
	
	//window.Lib = Lib;
	
//})();
