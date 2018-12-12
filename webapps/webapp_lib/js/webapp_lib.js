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
		//_vars["updateStore"] = false;
		
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


		var taxonomy_obj = {
			"parseTaxonomyFromXml" : function(opt){
				return _parseTaxonomyFromXml(opt);
			},
			"view_vocabulary" : function( opt ){
				var html = _view_vocabulary( opt );
				return html;
			},
			"view_termin" : function( params ) {
				var html = _view_termin( params );
				return html;
			},
			"getTaxonomy" : function( opt ) {
				
				if( _vars["taxonomy"] ){
					
					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]( _vars["taxonomy"] );//return
					}
					
				} else {
					
					
					var key = "taxonomy";
					storage.getItem( key, function(readValue, err){
console.log("- read "+key+" from storage...",readValue);
console.log(err);
						//_vars["taxonomy"] = readValue;
						if( typeof opt["postFunc"] === "function"){
							opt["postFunc"]( readValue );//return
						}
					});
					
				}
			}
		};
		
console.log("storage object:", storage);
console.log("draw object:", draw);
console.log("node object:", nodes_obj);
console.log("book obj:", book);
console.log("taxonomy_obj:", taxonomy_obj);

		
		function _init(){

			_vars["timeStart"] = new Date();

			_vars["info"].push( navigator.userAgent + "<br>\n");
			
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="block";
			}
			$("#load-progress").hide();
			
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
					_postLoadStorageScript();
				};
				
				script.onerror = function(e) {
					alert( "error load script " + this.src);
				}; 
				
			} else {

				load_xml({
					filename : config["xml_file"],
					
					//dataType: "text",
					dataType: "xml",
					
					//callback: after_load
					callback: function(data){
//console.log(typeof data, data[0]);
						//after_load( data );
						
						_parseXML({
							"xml":data
						});
						_loadApp();
					}
				});
			}
			
			
			function _postLoadStorageScript(){
				
				var res = storage.init();
//for TEST!!!
//res = false;
				if( res ){//cache is available
//----------- hide not used progress bar
//$(_vars["loadProgressBar"]).parent().parent().hide();
//$("#load-progress").hide();
//-----------
					storage.checkAppData({
						"callback": function(){
//console.log( "storage.checkAppData(), end process");
//for TEST!!!
//storage["need_update"] = false;
							if(storage["need_update"]){
								_updateStorage();
							} 
								
							if(!storage["need_update"]){
//for TEST!!!
//storage.getXml();
								//storage.getAppData({
									//"callback": function(){
	//console.log( "storage.getAppData(), end process");
										_loadApp();
									//}
								//});
								
							}
								
						}//end callback
					});//end storage.checkAppData()
				}
					
				if( !res ){//cache is unavailable
					config["use_localcache"] = false;
					load_xml({
						filename : config["xml_file"],
						dataType: "text",
						//dataType: "xml",
						callback: function(data){
//console.log(typeof data, data[0]);

							if(!data){
var logMsg = "<p class='alert alert-danger'>Book catalog not loaded.</p>";
func.log(logMsg);
								_hideWaitWindow()
								return false;
							}
							
							_parseXML({
								"xml":data
							});
							_loadApp();
							
							//after_load( data );
						}
					});
				}
					
			}//end _postLoadStorageScript()
			
			function _updateStorage(){
				load_xml({
					filename : config["xml_file"],
					dataType: "xml",
					callback: function(data){
//console.log(typeof data, data);							
				
						if(!data){
				var logMsg = "<p class='alert alert-danger'>Book catalog not loaded.</p>";
func.log(logMsg);
							_hideWaitWindow()
							return false;
						}

						_parseXML({
							"xml":data
						});
							
						storage.saveAppData({
							"callback": function(){
console.log( "storage.saveAppData(), end process");
								_loadApp();
							}
						});
							
					}//end load_xml() callback
				});
			}//end __updateStorage()	
					
										
			function _loadApp(){
				_loadTemplates(function(){
console.log("Load templates end...");
					draw.buildPage({});
					define_event();
					_vars["GET"] = func.parseGetParams(); 
					_urlManager();
					_hideWaitWindow();
				});
			}//end _loadApp();

			function _hideWaitWindow(){
				
				_vars["timeEnd"] = new Date();
				_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
				_vars["logMsg"] = "Init application, runtime: <b>" + _vars["runTime"]  + "</b> sec";
				func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				
				if( _vars["waitWindow"] ){
					_vars["waitWindow"].style.display="none";
				}				
			}//end _hideWaitWindow();


		}//end _init()
		
		
		function load_xml( params ) {

			var timeStart = new Date();
			
			$("#load-progress").show();
			
			$.ajax({
				type: "GET",
				url: params["filename"],
				dataType: params["dataType"],
				//dataType: "xml",//"text"
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
console.log("ajax load complete, ", xhr, state);
				},
				
				success: function( data ){
//_vars["logMsg"] = "Successful download xml file " + params["filename"];
//func.log("<p class='alert alert-success'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );

					var timeEnd = new Date();
					var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
					
					_vars["logMsg"] = "ajax load " + params["filename"] + " complete";
					_vars["logMsg"] += ", runtime: <b>" + runTime + "</b> sec";
					_vars["logMsg"] += ", <b>state</b>: success";
func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );

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
		
		
//=============================================		
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
/*
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
*/			
//------------------
			

//------------------//get taxonomy termins
/*
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
*/			
//------------------
			
			
//------------------
			var timeStart = new Date();
				
				var $xml = $(_vars["xml"]);
				_vars["taxonomy"] = taxonomy_obj.parseTaxonomyFromXml({
					"xml": {
"taxonomy_term_data": $xml.find( "taxonomy_term_data" ).find('termin'),
"taxonomy_term_hierarchy": $xml.find( "taxonomy_term_hierarchy" ).find("termin"),
"taxonomy_vocabulary" :	$xml.find( "taxonomy_vocabulary" ).find("record")
					}
				});
				
			var timeEnd = new Date();
			var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
_vars["logMsg"] = "- get taxonomy, runtime: <b>" + runTime  + "</b> sec";
//func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			_vars["info"].push("<p>" + _vars["logMsg"] + "</p>");
			
			//_vars["runtime"]["parseTaxonomyFromXml"] = {
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
			
		};//end get_content()


		function _parseXML( opt ){
//console.log("function _parseXML", opt);
			var p = {
				"xml" : null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);


//---------------------------- load nodes
			var tableName = "nodes";
			table_name = "table_node";
			
var timeStart = new Date();

			storage.tables[tableName] = {
				//"records": storage.tables[tableName].getRecords({
					//"xml": $(p.xml).find( table_name ).find('node')
				//})
				"xml": $(p.xml).find( table_name ).find('node')
			};
			
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _parseXML(), load "+table_name+", runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
//---------------------------- 

			var tableName = "book_filename";
			table_name = "table_book_filename";
			storage.tables[tableName] = {
				//"records": storage.tables[tableName].getRecords({
					//"xml": $(p.xml).find( table_name ).find('item')
				//})
				//"xml": $(p.xml).find( table_name ).find('item'),
				"obj": __convertXmlToObj({
					"idKey": "entity_id",
					"valueKey": "value",
					"type": "getChildNode", //get attribute value or value child node
					"xml": $(p.xml).find( table_name ).find('item')
				})
			};

			var tableName = "book_url";
			table_name = "table_book_url";
			storage.tables[tableName] = {
				"obj": __convertXmlToObj({
					"idKey": "entity_id",
					"valueKey": "value",
					"type": "getChildNode", //get attribute value or value child node
					"xml": $(p.xml).find( table_name ).find('item')
				})
			};


			var tableName = "book_links";
			table_name = "table_book_links";
			storage.tables[tableName] = {
				"obj": __convertXmlToObj({
					"idKey": "entity_id",
					"valueKey": "value",
					"type": "getChildNode", //get attribute value or value child node
					"xml": $(p.xml).find( table_name ).find('item')
				})
			};


			var tableName = "taxonomy_index";
			table_name = "taxonomy_index";
			storage.tables[tableName] = {
				"obj": __convertXmlToObj({
					"idKey": "nid",
					"valueKey": "tid",
					"xml": $(p.xml).find( table_name ).find('record'),
					"type": "getAttribute"//get attribute value or value child node
				})
			};

//---------------------------- load taxonomy_term_data
			var tableName = "taxonomy_term_data";
			table_name = "taxonomy_term_data";
			
var timeStart = new Date();

			storage.tables[tableName] = {
				"xml": $(p.xml).find( table_name ).find('termin')
			};
			
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _parseXML(), load "+tableName+", runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
//---------------------------- 

			var tableName = "taxonomy_term_hierarchy";
			table_name = "taxonomy_term_hierarchy";
			storage.tables[tableName] = {
				"xml": $(p.xml).find( table_name ).find('termin')
			};


			var tableName = "taxonomy_vocabulary";
			table_name = "taxonomy_vocabulary";
			storage.tables[tableName] = {
				"xml": $(p.xml).find( table_name ).find('record')
			};

//---------------------------- parse taxonomy object
var timeStart = new Date();

			_vars["taxonomy"] = __formTaxonomyObj();
			
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _parseXML(), parse <b>taxonomy object</b>, runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
//---------------------------- 
			
//---------------------------- parse nodes object
var timeStart = new Date();

			_vars["nodes"] = __formNodesObj();
			
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _parseXML(), parse <b>nodes object</b>, runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
//---------------------------- 
			
//---------------------------- parse hierarchy object
var timeStart = new Date();

			_vars["hierarchyList"] = __formHierarchyList();
			
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
			
_vars["logMsg"] = "- _parseXML(), parse <b>hierarchy object</b>, runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
//---------------------------- 

			function __convertXmlToObj(opt){
//console.log("function __convertXmlToObj", opt);
				var p = {
					"idKey": null,//nid="28"
					"valueKey": null,//tid="38"
					"xml": null,//<record nid="28" tid="38"/>....
					"type": "getAttribute"//get attribute value or value child node
				};
				//extend p object
				for(var key in opt ){
					p[key] = opt[key];
				}
//console.log(p);
				
				var idKey = p["idKey"];
				var valueKey = p["valueKey"];
				var xml = p["xml"];
				
				var obj = {};
				$(xml).each(function( index, value ){
//console.log( $(this) );
//console.log( index, value );
					var key = $(this).attr(idKey);
					
					var _value = "";
					if( p["type"] === "getChildNode"){
						_value = $(this).children(valueKey).text().trim();
					}
					if( p["type"] === "getAttribute"){
						_value = value.getAttribute(valueKey);
//var tid = nodeXML.attributes.getNamedItem("tid").nodeValue;
					}
//console.log( "_value:", _value );
					
					if( _value.length > 0){
						if( !obj[key] ){
							obj[key] = [];
						}
						obj[key].push( _value );
					}
					
				});//next
//console.log( xml, obj );
				
				return obj;
			}//end __convertXmlToObj()
			
			
			function __formNodesObj(){

				var xml = {
					"nodes": storage.tables["nodes"]["xml"]//,
					//"taxonomy_index": storage.tables["taxonomy_index"]["xml"]
				};

				var nodes = [];

				for( var n = 0; n < xml.nodes.length; n++){
	//console.log( n, p.xml[n] );
					var node = {};
					//read node attributes
					var item_attr = func.get_attr_to_obj( xml.nodes[n].attributes );
					for(var attr in item_attr){
						node[attr] = item_attr[attr];
					}//next attr

					var x_node = $( xml.nodes[n] );
					node["subfolder"] = x_node.children("subfolder").text().trim();
					node["author"] = x_node.children("author").text().trim();
					node["bookname"] = x_node.children("bookname").text().trim();
					node["body_value"] = x_node.children("body_value").text();

//-----------------
					node["termins"] = _getNodeTerminsXML({
						"nid" :node["nid"],
						"taxonomy_index": storage.tables["taxonomy_index"]["obj"],
						"taxonomy": _vars["taxonomy"]
					});

					var _nid = node["nid"];	
					
					if( storage.tables["book_filename"]["obj"][_nid] ){
						node["book_files"] = storage.tables["book_filename"]["obj"][_nid];
					}
					
					if( storage.tables["book_url"]["obj"][_nid] ){
						node["book_url"] = storage.tables["book_url"]["obj"][_nid];
					}
					
					if( storage.tables["book_links"]["obj"][_nid] ){
						node["book_links"] = storage.tables["book_links"]["obj"][_nid];
					}
					
//-----------------				

					nodes.push( node );
				}//next node

				return nodes;
			}//end __formNodesObj()

			function __formTaxonomyObj(){
				return taxonomy_obj.parseTaxonomyFromXml({
					"xml": {
"taxonomy_term_data": storage.tables["taxonomy_term_data"]["xml"],
"taxonomy_term_hierarchy": storage.tables["taxonomy_term_hierarchy"]["xml"],
"taxonomy_vocabulary" :	storage.tables["taxonomy_vocabulary"]["xml"]
					}
				});
				
			}//end __formTaxonomyObj()
			
			function __formHierarchyList(){
				var xml = {
					"nodes": storage.tables["nodes"]["xml"]
				};
				
				var hList = [];

				for( var n = 0; n < xml.nodes.length; n++){
//console.log( n, xml[n] );
					var $node = $( xml.nodes[n] );
					if ( $node.attr('plid') == "0") {
						var section = {
							"name": $node.attr('title'),
							"nid": $node.attr('nid'),
							"mlid": $node.attr('mlid'),
							"plid": $node.attr('plid'),
							"type": $node.attr('type'),
							"section": __getChildSections( xml, $node.attr('mlid'), 1)
						};
						
						hList.push( section );
					}

				}//next node

//console.log(hList);						
				return hList;
			}//end __formHierarchyList()
			
			
			function __getChildSections(xml, plid, recourse){
				var sections = [];
				for( var n = 0; n < xml.nodes.length; n++) {
					var $node = $( xml.nodes[n] );
					
					if ( $node.attr('plid') === plid ){
						if ( $node.attr('type') === "book" ){
						
							var _section = {
								"name": $node.attr('title'),
								"nid": $node.attr('nid'),
								"mlid": $node.attr('mlid'),
								"plid": $node.attr('plid'),
								"type": $node.attr('type')
							};
							
							if( $node.attr('mlid').length > 0 ){
								if ( recourse === 1){
									var _subSection = __getChildSections( xml, $node.attr('mlid'), 1 );
									if( _subSection.length > 0){
										_section["section"] = _subSection;
									}
								}
							}
							
							sections.push( _section );
						}
					}
				};//next node
				
//console.log(sections);						
				return sections;
			}//end __getChildSections()
			
		};//end _parseXML()



		
		function _getBookFilesXML( opt ){
//console.log("function _getBookFilesXML", opt);
			var p = {
				"nid": null,
				"xml": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			var files = [];
			
			$(p["xml"]).each(function(){
//console.log( $(this), arguments );
				var entity_id = $(this).attr("entity_id");
//console.log( entity_id);
				
				if( p["nid"] === entity_id ){
//console.log("000");
					var v = $(this).children("value").text().trim();
					files.push( v );
				}
			});//next

			return files;
		}//end _getBookFilesXML()

/*
		function _getBookFilesXML_( opt ){
//console.log("function _getBookFilesXML_", opt);
			var p = {
				"nid": null,
				"xml": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			var files = [];
//console.log(p["xml"][0]);
//console.log( $(p["xml"][0]).attr("entity_id"));
//console.log( "child: ", p["xml"][0].childNodes);

			for(var n = 0; n < p["xml"].length; n++){
				var entityId = p["xml"][n].getAttribute("entity_id");
//console.log( "entity_id: ", entityId);

				if( p["nid"] === entityId ){
					for (var n2 = 0; n2 < p["xml"][n].childNodes.length; n2++) {
						var nodeXML = p["xml"][n].childNodes.item(n2);
///console.log( "nodeType: "+ nodeXML.nodeType);
						if (nodeXML.nodeType !== 1){// not Node.ELEMENT_NODE
							continue;
						}
//console.log( nodeXML, typeof nodeXML);
						if ("textContent" in nodeXML ){
							var _value = nodeXML.textContent;
						} else {
							var _value = nodeXML.text;
						}
//console.log( _value );
						files.push( _value );
					}//next
				}

			}//next

			return files;
		}//end _getBookFilesXML_()
*/

		
		function _getBookUrlXML( opt ){
//console.log("function _getBookUrlXML", opt);
			var p = {
				"nid": null,
				"xml": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			var listUrl = [];

			$(p["xml"]).each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( p["nid"] === entity_id ){
					var v = $(this).children("value").text();
					listUrl.push( v );
				}
			});//next url

			return listUrl;
		}//end _getBookUrlXML()

		
		function _getBookLinksXML( opt ){
//console.log("function _getBookLinksXML", opt);
			var p = {
				"nid": null,
				"xml": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			var links = [];

			$(p["xml"]).each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( p["nid"] === entity_id ){
					var v = $(this).children("value").text();
					links.push( v );
				}
			});//next

			return links;
		}//end _getBookLinksXML()




//====================================== TAXONOMY methods
/*
		//read xml data
		function read_taxonomy_data(){
			var xml = _vars["xml"];
			taxonomy_obj["taxonomy_vocabulary"] = $(xml).find( "taxonomy_vocabulary" ).find("record");
			taxonomy_obj["taxonomy_term_hierarchy"] = $(xml).find( "taxonomy_term_hierarchy" ).find("termin");
			taxonomy_obj["taxonomy_term_data"] = $(xml).find( "taxonomy_term_data" ).find('termin');
			
			//taxonomy_obj["taxonomy_index"] = $(xml).find( "taxonomy_index" ).find("record");
			
		}//end read_taxonomy_data()
*/
		function _parseTaxonomyFromXml( opt ){
//console.log(opt);

			var xml = opt["xml"];
			
			var taxonomy = {};
			$( xml.taxonomy_vocabulary ).each(function(){
				var item = $(this);
				var name = item.children('m_name').text();
				var vocabulary = {
					//"name" : item.children('name').text(),
					"vid" : item.attr('vid'),
					"termins" : __get_termins( item.attr('vid') )
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
			storage.putItem("taxonomy", taxonomy, function(){
//console.log(arguments);				
			});
*/
			return taxonomy;
			
			function __get_termins( vid ){
				var termins = [];
				$( xml.taxonomy_term_data ).each(function(){
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
				$( xml.taxonomy_term_hierarchy ).each(function(){
					var item = $(this);
					var tid = item.attr('tid');
					for( var n = 0; n < termins.length; n++){
						if( tid === termins[n]["tid"]){
							termins[n]["parent_value"] = item.attr('parent');
							//break;
						}
					}//next termin
				});//end each

				return termins;
			}//end __get_termins()
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
		}//end _parseTaxonomyFromXml()

		
		function _view_vocabulary ( opt ) {
//console.log("_view_vocabulary()", opt);

			var p = {
				"taxonomy": null,
				"vocabularyName": "",
				"recourse" : false
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p);
			
			var vocName = p["vocabularyName"];
			if( !p["taxonomy"][vocName] ){
_vars["logMsg"] = "error, vocabulary <b>"+ p["vocabularyName"]+"</b> not found ";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
				return false;
			}
			var _vocabulary = p["taxonomy"][vocName];
			
			var item_tpl = _vars["templates"]["taxonomy_list_item_tpl"];
			var list_tpl = _vars["templates"]["taxonomy_list_tpl"];
			//var url_tpl = _vars["templates"]["taxonomy_url_tpl"];
			
			//var block_title = "<h4>book tags:</h4>";
			var html = "";
			for( var n = 0; n < _vocabulary["termins"].length; n++ ){
				var termin = _vocabulary["termins"][n];
				if( termin["parent_value"] === "0"){
					
					//var url = url_tpl
					//.replace("{{vid}}", termin["vid"])
					//.replace("{{tid}}", termin["tid"]);
					
					html += item_tpl
					.replace("{{link-title}}", termin["name"])
					.replace("{{vid}}", termin["vid"])
					.replace("{{tid}}", termin["tid"]);
					//.replace("{{url}}", url);
					
					if( p["recourse"] ) {
						
						var html_children_termins = list_children_termins({
							"termins": _vocabulary["termins"],
							"vid": termin["vid"],
							"tid": termin["tid"], 
							"recourse": p["recourse"]
						});
						
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
		

//====================================== BOOK methods
		
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
			draw.buildBlock({
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
					draw.buildBlock({
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
			draw.buildBlock({
				"locationID" : "block-library",
				"templateID" : "tpl-block--tags",
				"content" : _view_vocabulary({
					"taxonomy": _vars["taxonomy"],
					"vocabularyName": "library", 
					"recourse": false
					})
			});

			//mark root links for breadcrumb navigation
			$("#block-library .nav-click").addClass("root-link");			
//---------------------
			
//--------------------- BLOCK
			draw.buildBlock({
				"locationID" : "block-tags",
				//"title" : "Tags",
				"templateID" : "tpl-block--tags",
				"content" : _view_vocabulary({
					"taxonomy": _vars["taxonomy"],
					"vocabularyName": "tags", 
					"recourse": false
					})
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
			
			draw.buildBlock({
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
					
					draw.buildBlock({
						"locationID" : "block-taxonomy",
						"templateID" : "tpl-block--tags",
						"content" : html
					});
					
				}
				
				//if ( _vars["termin_nodes"].length > 0){
					draw.buildBlock({
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
				draw.buildBlock({
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
				draw.buildBlock({
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

					//_vars["termin_nodes"] = [];
					nodes_obj.get_termin_nodes({
						"tid" : _vars["GET"]["tid"],
						"callback" : function( terminNodes){
//console.log(this);							
							__postFunc(  this.tid, terminNodes );
						 }
					});

					function __postFunc( tid, terminNodes ){
							//_formBreadcrumb( target );
console.log(tid, terminNodes);							
							draw.buildPage({});
							
	_vars["timeEnd"] = new Date();
	_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
	_vars["logMsg"] = "<p>- nodes_obj.get_termin_nodes("+tid+"), runtime: <b>" + _vars["runTime"] + "</b> sec</p>";

								_vars["logMsg"] += "<p>- найдено <b>" + terminNodes.length + "</b> книг, связанных с термином</p>";
							
	func.log("<div class='alert alert-info'>" + _vars["logMsg"] + "</div>");
	//console.log( _vars["logMsg"] );
							
					}//end __postFunc()
					
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

		var _getHierarchy = function( opt ) {
			if( _vars["hierarchyList"] ){
				
				if( typeof opt["postFunc"] === "function"){
					opt["postFunc"]( _vars["hierarchyList"] );//return
				}
				
			} else {
				var key = "hierarchyList";
				storage.getItem( key, function(readValue, err){
console.log("- read "+key+" from storage...",readValue);
console.log(err);
					if( typeof opt["postFunc"] === "function"){
						opt["postFunc"]( readValue );//return
					}
				});
				
			}
		};//end _getHierarchy()


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
			taxonomy: taxonomy_obj, 
			getHierarchy: _getHierarchy,
			runApp: function( config ){ 
				if( !_vars["appContainer"] ){
				_vars["logMsg"] = "error, not found html container (#App) for web-appllication...";
 func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
				} else {
					
//----------------- TEST support COPY command
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
					_init();
				}
			},
			
			postLoad: after_load
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
	};
	
	//window.Lib = Lib;
	
//})();
