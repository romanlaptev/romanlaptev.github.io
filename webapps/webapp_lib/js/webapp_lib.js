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
						_vars["taxonomy"] = readValue;
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
//console.log("book obj:", book);
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
					callback: function(data){
//console.log(typeof data, data[0]);
						
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
					defineEvents();
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
//console.log("ajax load complete, ", xhr, state);
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
//console.log("$.ajax, Done...");
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

			_vars["books"] = __formNodesObj();
			
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

				//var nodes = [];
				var books = {};

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

					//nodes.push( node );
					books[_nid] = node;
				}//next node

				return books;
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
				//var hList = {};

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
						//var key = $node.attr('nid');
						//hList[key] = section;
					}

				}//next node

//console.log(hList);						
				return hList;
			}//end __formHierarchyList()
			
			
			function __getChildSections(xml, plid, recourse){
				
				var sections = [];
				//var sections = {};
				
				for( var n = 0; n < xml.nodes.length; n++) {
					var $node = $( xml.nodes[n] );
					
					if ( $node.attr('plid') === plid ){
						//if ( $node.attr('type') === "book" ||
								//$node.attr('type') === "author"
							//){
						
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
var key = $node.attr('nid');
_vars["books"][key]["node_child_pages"] = _subSection;
									}
								}
							}
							
							sections.push( _section );
							
							//var key = $node.attr('nid');
//console.log( key, typeof key);							
							//sections[key] = _section;
							
						//}
					}
				};//next node
				
//console.log(sections);						
				return sections;
			}//end __getChildSections()
			
		};//end _parseXML()



//====================================

		function defineEvents() {

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


			$("#load-import-file").on("change", function(event){
				event = event || window.event;
console.log("change...", event.target.files);
console.log("FileList support is " + window.FileList , typeof window.FileList);

				$("#service-panel").hide();
				if( window.FileList ){
					_loadLocalFile( event.target.files );
				} else {
					_vars.logMsg = "Your browser does not support File API";
					_log("<div class='alert alert-warning'>" + _vars.logMsg + "</div>");
					$("#service-panel").hide();
					return false;
				}
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
				
//console.log(this.targetField.value);
//console.log(this["targetField"].value);
//console.log(this.keyword.value);

//console.log(target.targetField.value);
//console.log(target.keyword.value);

//console.log(target.keyword.value);
				var form = document.forms["formSearch"]
//console.log(form);
//console.log(form.elements.targetField);
//console.log(form.elements.keyword.value);


//console.log( form.elements.targetField );
//console.log( $(form.elements.targetField).val() );


				//check input values
				var res = true;
				
				//var _keyword = $(form.elements.keyword).val();
				var _keyword = form.elements.keyword.value;
				if( _keyword.length === 0 ){
_vars["logMsg"] = "error, empty field 'keyword'....";
func.log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
					res = false;
				}
				
				//var _targetField = $(form.elements.targetField).val();
				//var _targetField = form.elements.targetField.value;
				
				var _targetField = false;
				for( var n = 0; n < form.elements.targetField.length; n++){
//console.log( n, form.elements.targetField[n] );

					var $element = $(form.elements.targetField[n]);
					var _checked = $element.prop("checked");
//console.log( $element.attr("value"), _checked );
					if( _checked){
						_targetField = $element.attr("value");
						break;
					}
				}//next
				
//console.log( "TEST:", _targetField, _targetField.length );

				if( !_targetField || _targetField.length === 0 ){
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
			
		}//end defineEvents()
		

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

					nodes_obj.get_termin_nodes({
						"tid" : _vars["GET"]["tid"],
						"callback" : function( terminNodes){
							__postFunc(  this.tid, terminNodes );
						 }
					});

					function __postFunc( tid, terminNodes ){
						_formBreadcrumb( target );
//console.log(tid, terminNodes);

						draw.buildPage({});//common draw actions
						
						draw.buildBlock({
							"locationID" : "block-node",
							"templateID" : "tpl-block--termin-nodes",
							"content" : nodes_obj.viewNodes({
								"nodes": terminNodes,
								"nodes_tpl": _vars["templates"]["termin_nodes_tpl"],
								"node_tpl": _vars["templates"]["termin_nodes_item_tpl"]
							})
						});
							
						var html = "";	
						if( _vars["GET"]["vid"] === "2" || _vars["GET"]["vid"] === "1"){
							
							if( _vars["GET"]["vid"] === "2" ){
								var termins = _vars["taxonomy"]["library"]["termins"];
							}
							if( _vars["GET"]["vid"] === "1" ){
								var termins = _vars["taxonomy"]["tags"]["termins"];
							}
//console.log("TEST1", termins);			
				
							//view children termin
							html = taxonomy_obj.view_termin({
								"termins": termins,
								"vid": _vars["GET"]["vid"],
								"tid": _vars["GET"]["tid"],
								"recourse": true,
								"show_only_children": false,
								
								"item_tpl": _vars["templates"]["taxonomy_list_item_tpl"],
								"list_tpl": _vars["templates"]["taxonomy_list_tpl"]//,
								
								//"url_tpl": _vars["templates"]["taxonomy_url_tpl"]
							});
							
						}
						draw.buildBlock({
							"locationID" : "block-taxonomy",
							"templateID" : "tpl-block--tags",
							"content" : html
						});
						
						draw.fixStyles();

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
						"nid" : _vars["GET"]["nid"],
						//"callback": __postFuncNode
						"callback": function(node){//FIX FF 3-12
//console.log("test!!!", node);
__postFuncNode( node );		
						}
					});
					
					draw.buildPage({});//common draw actions
					_formBreadcrumb( target );
					
					function __postFuncNode( node ){
//console.log("__postFuncNode()", node);

						draw.buildBlock({
							"locationID" : "block-node",
							"templateID" : "tpl-block--node",
							"content" : function(){
//console.log("content function()", arguments);
								var html = nodes_obj.view_node({
									"node" :  node
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
//console.log( "build block-nodes, postFunc" );
		
								if( node["book_files"] && node["book_files"].length === 0 ){
									$("#cloud-links").hide();
									$("#book-links").hide();
								}
								
								if( node["book_links"] && node["book_links"].length > 0 ){
				//console.log(_vars["node"]["book_links"].length, $("#external-links").attr("id"));
									$("#external-links").show();
								} else {
									$("#external-links").hide();
								}
								
								if( node["termins"] && node["termins"].length === 0 ){
									$("#termins").hide();
								} else {
									//$("#termins .nav-click").addClass("root-link");			
								}
								
								draw.fixStyles();

							}//end postFunc
						});
						
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
_vars["logMsg"] = "- nodes_obj.get_node("+node["nid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec";
//_vars["logMsg"] = "- nodes_obj.get_node("+node["nid"]+"), book.get_child_pages("+ node["mlid"] +"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
					}//end __postFuncNode()

				break;

				case "search":
					$("#service-panel").hide();
					nodes_obj.searchNodes({
						"targetField": _vars["GET"]["targetField"],
						"keyword": _vars["GET"]["keyword"],
						"callback": function( sNodes){
//console.log(sNodes);

							draw.buildBlock({
								"locationID" : "block-node",
								"templateID" : "tpl-block--termin-nodes",
								"content" : nodes_obj.viewNodes({
									"nodes": sNodes,
									"nodes_tpl": _vars["templates"]["termin_nodes_tpl"],
									"node_tpl": _vars["templates"]["termin_nodes_item_tpl"]
								})
							});

						}//end callback
					});
				break;

			
				case "clear-import-url":
					$("#import-url").val("");
				break;

				case "import-url":
					_vars["timeStart"] = new Date();
					
					if( _vars["waitWindow"] ){
						_vars["waitWindow"].style.display="block";
					}
					
					var fileName = $("#import-url").val().trim();
					load_xml({
						filename: fileName,
						//dataType: "text",
						dataType: "xml",
						callback: function(data){
//console.log(typeof data, data[0]);
							_import({
								"fileName": fileName,
								"xml": data,
								"timeStart": _vars["timeStart"]
							});
						}
					});
				
				break;
				
				default:
console.log("_urlManager(),  GET query string: ", _vars["GET"]);			
				break;
			}//end switch
			

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
			
			draw.renderBreadCrumb({
				"breadcrumb": _vars["breadcrumb"],
				"template": _vars["templates"]["breadcrumb_item_tpl"],
				"currentUrl": _vars["currentUrl"]
			});
			
		}//end _formBreadCrumb()


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


//====================================== TAXONOMY methods
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


		function _loadLocalFile( fileList){
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
				if ( file.type !== "text/xml") {
					_vars.logMsg = "Skip file, incorrect file type, only XML... " + file.name +",  " +file.type;
					func.log("<div class='alert alert-warning'>" + _vars.logMsg + "</div>");
					return false;
				}
				
_vars["timeStart"] = new Date();
if( _vars["waitWindow"] ){
	_vars["waitWindow"].style.display="block";
}
					
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
					_import({
						"xml": e.target.result,
						"fileName": file.name,
						"timeStart": _vars["timeStart"]
					});

					_vars.logMsg = "Load file <b>" + file.name + "</b>";
					_vars.logMsg += "<br> size: <b>" + file.size +"</b> bytes";
					_vars.logMsg += "<br> type: <b>" + file.type +"</b>";
					
					var timestamp = file.lastModified;
					var date = new Date();
					date.setTime( timestamp );
//console.log( timestamp, date );
					_vars.logMsg += "<br/> date: " + date;
		

					var sYear = date.getFullYear();
					
					var sMonth = date.getMonth() + 1;
					if(sMonth < 10){
						sMonth = "0"+sMonth;
					}
					
					var sDate = date.getDate();
					
					var sHours = date.getHours();
					if(sHours < 10){
						sHours = "0"+sHours;
					}
					
					var sMinutes = date.getMinutes();
					if(sMinutes < 10){
						sMinutes = "0"+sMinutes;
					}
					
					var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;

					_vars.logMsg += "<br/> date2: "+ dateStr;
					
					func.log("<div class='alert alert-success'>" + _vars.logMsg + "</div>");
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
			
		}//end _loadLocalFile


		function _import(opt){
//console.log("_import", opt);

			var p = {
				"fileName": "",
				"xml": "",
				"timeStart": null
			};
			//extend p object
			for(var key in opt ){
				p[key] = opt[key];
			}
//console.log(p, typeof p.xml );

			_vars["import"] = {
				"books": [], 
				"taxonomy": [], 
				"hierarchyList": []
			}

			__parseXML(p["xml"]);
			__updateAppObjects({
				"objectName": "books",
				"callback": function(){
					__importCompleted();
				}
			});

			function __importCompleted(){
				if( _vars["waitWindow"] ){
					_vars["waitWindow"].style.display="none";
				}				
				
				_vars["timeEnd"] = new Date();
				_vars["runTime"] = (_vars["timeEnd"].getTime() - p["timeStart"].getTime()) / 1000;
				_vars["logMsg"] = "Import "+p.fileName+", runtime: <b>" + _vars["runTime"]  + "</b> sec";
				func.log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
			}//end __importCompleted()

			
			function __parseXML( xml ){
				//var book = {
//title: "Дай Сы-цзе. Бальзак и портниха китаяночка",
//bookname: "Бальзак и портниха китаяночка",
//author: "Дай Сы-цзе",
//subfolder: "/lib/books/D/dai_sycze",
//book_files: ["dai_sycze__balzak_i_portniha_kitayanochka.fb2.zip"]
				//};
				//_vars["import"]["books"].push( book );
				
				var nodeName = "book";
				$(xml).find(nodeName).each(function( index, value ){
//console.log( $(this) );
//console.log( index, value );
//console.log( value.attributes );
//console.log(value.children );
					
					var book = {};
					//read node attributes
					var item_attr = func.get_attr_to_obj( value.attributes );
					for(var attr in item_attr){
						book[attr] = item_attr[attr];
					}//next attr
					
					//var x_node = $( value );
					//book["subfolder"] = x_node.children("subfolder").text().trim();
					//book["author"] = x_node.children("author").text().trim();
					//book["bookname"] = x_node.children("bookname").text().trim();
					//book["book_files"] = [];
					
//for(var key in value.children){
//console.log(key, value.children[key], value.children[key].nodeName );
//}					
					for(var n = 0; n < value.children.length; n++){
						var xBook = value.children[n];
						var _nodeText = $(xBook).text().trim();
						var _nodeName = xBook.nodeName.toLowerCase();
						
						if( _nodeName === "book_filename"){
							if(!book["book_files"]){
								book["book_files"]=[];
							}
							if(_nodeText.length > 0){
								book["book_files"].push(_nodeText);
							}
							continue;
						}
						
						if( _nodeName === "book_url"){
							if(!book["book_url"]){
								book["book_url"]=[];
							}
							if(_nodeText.length > 0){
								book["book_url"].push(_nodeText);
							}
							continue;
						}
						
						book[ _nodeName ] = _nodeText;
					}//next
					_vars["import"]["books"].push( book );
					
				});//next
				
			}//end __parseXML()


			function __updateAppObjects(opt){
//console.log(opt);
				var p = {
					"objectName": "",
					"callback":null
				};
				//extend p object
				for(var key in opt ){
					p[key] = opt[key];
				}
//console.log(p);

				switch( p["objectName"] ){
					
					case "books":
						_getNodes({
							"postFunc": function( books ){
								if( books ){
									//update application data object "books"									
									__updateBooks({
										"books": books,
										"updates": _vars["import"]["books"]
									});
									
									if( typeof p["callback"] === "function"){
										p["callback"]();
									}
								}
							}//end postFunc()
						});
					break;
					
					default:
console.log("__updateAppObjects, application data object name: ", p["objectName"]);
					break;
					
				}//end switch
			}//end __updateAppObjects()			
			
			function __updateBooks(opt){
//console.log(opt);
				var p = {
					"books": {},
					"updates":[]
				};
				//extend p object
				for(var key in opt ){
					p[key] = opt[key];
				}
//console.log(p);
				var updateState = false;
				for(var n1 = 0; n1 < p.updates.length; n1++){
					var updateBook = p.updates[n1];
//console.log(updateBook);
					for( var nid in p.books){
						var book = p.books[nid];
	
						if( updateBook["bookname"].toLowerCase() === book["bookname"].toLowerCase() ){
console.log("update book!!!", updateBook, book, updateBook["book_files"].length);

							//update fields
							if( updateBook["author"] ){
								book["author"] = updateBook["author"];
								updateState = true;
							}
							
							if( typeof updateBook["body_value"] !== "undefined"){//empty <body_value> will clear book["body_value"]
								book["body_value"] = updateBook["body_value"];
								updateState = true;
							}
							
							if( updateBook["book_files"] ){
								if( updateBook["book_files"].length > 0){
									
									for( var n2 = 0; n2 < updateBook["book_files"].length; n2++){
										var file = updateBook["book_files"][n2];
										book["book_files"].push(file);
									}//next
									updateState = true;
									
								} else {//clear field
									delete book["book_files"];
									updateState = true;
								}
							}

							if( updateBook["book_url"] ){
								if( updateBook["book_url"].length > 0){
									
									for( var n2 = 0; n2 < updateBook["book_url"].length; n2++){
										var url = updateBook["book_url"][n2];
										book["book_url"].push(url);
									}//next
									updateState = true;
									
								} else {//clear field
									delete book["book_url"];
									updateState = true;
								}
							}

							if( typeof updateBook["subfolder"] !== "undefined"){
								book["subfolder"] = updateBook["subfolder"];
								updateState = true;
							}
							
							if( updateState ){
								if(!_vars["import"]["updated_books"]){
									_vars["import"]["updated_books"] = [];
								}
								_vars["import"]["updated_books"].push(book);
//console.log("update books!!!", _vars["import"]["updated_books"]);
							}
							
							delete p.updates[n1];
						}
//author: "Леонид Николаевич Андреев"
//book_files: (2) ["andreev_leonid_rasskaz_o_semi_poveshennyh.fb2.zip", "rasskaz_o_semi_poveshennyh.txt"]
//bookname: "Рассказ о семи повешенных"
//subfolder: "lib/books/A"
//title: "Андреев Леонид.Рассказ о семи повешенных"
						
					}//next
					
				}//next
				
					
//console.log(p.books);
//console.log(p.updates );
				var newBooks = p.updates.filter(function(value){ //WithoutZeros
					if(value){ 
						return value 
					}; 
				});
//console.log( newBooks, newBooks.length );
				if( newBooks.length > 0){
					//add new books
					__addBooks({
						"books": p.books,
						"add": newBooks
					});
				}
				
			}//end __updateBooks()
			
			function __addBooks(opt){
//console.log(opt);
				var p = {
					"books": {},
					"add":[]
				};
				//extend p object
				for(var key in opt ){
					p[key] = opt[key];
				}
//console.log(p);
console.log( p.books, p.add );
// use hashCode to get a unique ID!!!!!!!!!

			}//end __addBooks()
			
		}//end _import()
	
	
		// for unit testing with Jasmine
		var _testApi = {
			nodesObj: nodes_obj,
			taxonomyObj: taxonomy_obj//,
			//bookObj: book,
			//drawPage: draw_page
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
			}//,
			
			//postLoad: after_load
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
	};
	
	//window.Lib = Lib;
	
//})();
