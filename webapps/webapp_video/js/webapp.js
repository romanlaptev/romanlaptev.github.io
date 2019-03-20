var webApp = {
	
	"vars" : {
		"app_title" : "video collection",
		"logMsg" : "",
		//"messages" : {
			////"storeNotFound" : "<p class='alert alert-danger'>Object store not exists in DB!!!</p>"
			//"nodeNotFound" : "<p class='alert alert-danger'>node not found!!!</p>",
			//"templateNotFound" : "<p class='alert alert-danger'>Not find template, id: <b>{{templateID}}</b></p>"
		//},
		//"templates_url" : "tpl/templates.xml",
		//"GET" : {},
		"DB" : {
			"dataUrl" : "db/export_video.xml",
			//"dataUrl" : "../../test_code/xml/notes.xml",
			//"dataUrl" : "../../test_code/xml/bookmarks.xml",
			//"dataUrl" : "../webapp_lib/tpl/templates.xml",

			"dbType" : "xml",
			//"data_url" :"db/art_correct.json",
			//"db_type" : "json",
		},		
	},
	
	"init" : function( postFunc ){
console.log("init webapp!");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		this["vars"]["log"] = func.getById("log");
		this["vars"]["btnToggle"] = func.getById("btn-toggle-log");
		
		defineEvents();
		
		_loadData(function(){
//console.log(arguments);
//console.log(window.location);	
		});
		
		//_loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		//});
				
		if( typeof postFunc === "function"){
			postFunc();
		}
	},//end init()
	
};//end webApp()
console.log(webApp);

function defineEvents(){

/*
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
*/

	$("#btn-clear-log").on("click", function(e){
console.log("click...", e);			
		webApp.vars["log"].innerHTML="";
	});//end event
	
	$("#btn-toggle-log").on("click", function(e){
console.log("click...", e);			
		if( webApp.vars["log"].style.display==="none"){
			webApp.vars["log"].style.display="block";
			webApp.vars["btnToggle"].innerHTML="-";
		} else {
			webApp.vars["log"].style.display="none";
			webApp.vars["btnToggle"].innerHTML="+";
		}
	});//end event
	
}//end defineEvents()


	function _urlManager( target ){
console.log(target);
/*
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
			
			case "test":
				_test();
			break;
			
			case "node":
console.log("-- start build page --");
				var timeStart = new Date();
				webApp.app.buildPage({
					"nid" : webApp.vars["GET"]["nid"],
					"callback" : function(){

					var timeEnd = new Date();
					var ms = timeEnd.getTime() - timeStart.getTime();
					var msg = "Generate content block, nid: " + this.nid +", runtime:" + ms / 1000 + " sec";
_log("<p>"+msg+"</p>");			
console.log(msg);
console.log("-- end build page --");
					webApp.app.vars["runtime"].push({
						"source" : msg,
						"ms" : ms,
						"sec" : ms / 1000
					});

					}//end callback
				});
			break;

//taxonomy&?tid=105
//taxonomy/term/105
//category/info/stil/modern
			case "taxonomy":
				if( webApp.vars["GET"]["tid"] ){
					
					var block_title = "";
					if( target.innerHTML.length > 0){
						block_title = target.innerHTML;
					}
					
					_buildBlock({//draw content block
						"name" : "block-content",
						//"title" : "termin_nodes", 
						"title" : block_title, 
						"templateID" : "tpl-block-content",
						"contentTpl" : "tpl-termin_nodes",
						"contentListTpl" : "tpl-termin_nodes_list",
						"content" : function(args){
							
							webApp.db.getTerminNodes({//get list termin nodes
								"tid" : webApp.vars["GET"]["tid"],
								"callback" : function( res ){
//console.log(res);
									if( typeof args["callback"] === "function"){
										args["callback"]( res );
									}

								}//end callback
							});
						}//end callback
						
					});
					
					
				} else {
console.log("Warn! not find 'tid' in query string", webApp.vars["GET"]["tid"] );
				}
				
			break;
			
				

			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
*/
		
	}//end _urlManager()




//======================================= LOAD DATA
function _loadData( postFunc ){
console.log("_loadData() ", arguments);
	//if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
		webApp.vars["dataStoreType"] = false;
	//} 
		switch(webApp.vars["dataStoreType"]) {				
			case "indexedDB":
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;

			default:
				if( !webApp.vars["DB"]["dataUrl"] ||
					webApp.vars["DB"]["dataUrl"].length === 0 ){
webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
					return false;
				}

				func.runAjax( {
					"requestMethod" : "GET", 
					"url" : webApp.vars["DB"]["dataUrl"], 
					//"onProgress" : function( e ){},
					"onLoadEnd" : function( headers ){
console.log( headers );
					},
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["DB"]["dataUrl"];
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
						//if( typeof callback === "function"){
							//callback(false);
						//}
						//return false;
					},

					"callback": function( data ){

webApp.vars["logMsg"] = "Load data file " + webApp.vars["DB"]["dataUrl"];
func.log("<p class='alert alert-success'>" + webApp.vars["logMsg"] + "</p>");
//console.log( webApp.vars["logMsg"] );

//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( !data ){
webApp.vars["logMsg"] = "error, no data in " + webApp.vars["DB"]["dataUrl"];
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
							if( typeof callback === "function"){
								callback(false);
							}
							return false;
						}

						_parseAjax( data );
						
						if( typeof callback === "function"){
							callback();
						}

					}//end callback()
				});

			break;
		}//end switch
		
		//return false;
		
		function _parseAjax( data ){
			if( webApp.vars["DB"]["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + webApp.vars["DB"]["dbType"];
//func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			switch( webApp.vars["DB"]["dbType"] ){
				case "xml":
					_parseXML( data );
				break;
				
				case "json":
				break;
				
				case "csv":
					//_parseCSVBlocks(data);
				break;
			}//end switch
			
		}//_parseAjax()
		
	}//end _loadData()


	function _parseXML(xml){
console.log("function _parseXML()");
		//var rootTagName = xml.documentElement.nodeName;
		//var xmlDoc = xml.getElementsByTagName( rootTagName);
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;

		xmlNodes = func.parseXmlToObj( xml );
console.log(xmlNodes);
/*
		var xmlNodes = __convertXmlToObj({
					//"idKey": "nid",
					"valueKey": "video",
					"xml": $(xml).find("database").find("video"),
					"type": "getChildNode"//"getAttribute"//get attribute value or value child node
				})
<table_book_filename>
	<item entity_id="8" bundle="library_book" delta="0">
		<value>DOM_wikipedia_collection.pdf</value>
	</item>
*/

/*
		$( $(xml).find("database").find("video").find("published") ).each(function( index, value ){
//console.log( $(this) );
console.log( index, value );
		});//next
*/				
	
/*
		//var records = xmlDoc.item(0).getElementsByTagName("video");
//console.log( records, records.length ) ;
//console.log( records.item(0).text ) ;
//console.log( records.item(0).textContent ) ;
//console.log( "textContent" in records.item(0) ) ;
//console.log( "text" in records.item(0) ) ;
		for( var n = 0; n < records.length; n++){
			//var record = records[n];
			//var tableName = record["attributes"]["name"].nodeValue;
			var record = records.item(n);


			var tableName = record.attributes.getNamedItem("name").nodeValue;
//console.log( tableName );

			var columns = record.getElementsByTagName("column");
			var recordObj = {};
			for( var n2 = 0; n2 < columns.length; n2++){
				//var column = columns[n2];
				//var columnName = column["attributes"]["name"].nodeValue;
				//recordObj[columnName] = column.textContent;
				var column = columns.item(n2);
				var columnName = column.attributes.getNamedItem("name").nodeValue;
				if ("textContent" in column){
					recordObj[columnName] = column.textContent;
				} else {
					recordObj[columnName] = column.text;
				}
				
			}//next
			
			//var recordObj = {"a":1};
//console.log(tableName, _vars["tables"][tableName]);
			if( typeof _vars["tables"][tableName] === "undefined"){
				_vars["tables"][tableName] = [];
				//_vars["tables"][tableName]["fields"] = [];
				_vars["tables"][tableName]["records"] = [];
			}
			_vars["tables"][tableName]["records"].push( recordObj );
		}//next
*/
	}//end _parseXML()

	function __convertXmlToObj(opt){
console.log("function __convertXmlToObj", opt);
		var p = {
			//"idKey": null,//nid="28"
			"valueKey": null,//tid="38"
			"xml": null,//<record nid="28" tid="38"/>....
			"type": "getAttribute"//get attribute value or value child node
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		
		//var idKey = p["idKey"];
		var valueKey = p["valueKey"];
		var xml = p["xml"];
		
		//var obj = {};
		var nodes = [];
		$(xml).each(function( index, value ){
//console.log( $(this) );
//console.log( index, value );
/*
			//var key = $(this).attr(idKey);
			
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
				//if( !obj[key] ){
					//obj[key] = [];
				//}
				//obj[key].push( _value );
				nodes.push( _value);
			}
*/			
		});//next
//console.log( xml, obj );
		
		//return nodes;
	}//end __convertXmlToObj()
			
/*
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
		
		function _loadTemplatesFromFile(){
			
			if( webApp.vars["templates_url"].length === 0 ){
	console.log("error in draw.loadTemplates(), not find 'templates_url' !");
				return false;
			}
			runAjax( {
				"requestMethod" : "GET", 
				"url" : webApp.vars["templates_url"], 
				"callback": function( data ){
	var msg = "load " + webApp.vars["templates_url"] ;
	console.log(msg);
	//webApp.vars["log"].push(msg);
	//console.log( data );
					if( !data ){
	console.log("error in draw.loadTemplates(), not find data templates'....");
						return false;
					}
					
					xmlNodes = _parseXmlToObj( data );
	//console.log(xmlNodes);
					if( xmlNodes.length > 0 ){
						for( var n= 0; n < xmlNodes.length; n++){
							var key = xmlNodes[n]["name"];

							var value = xmlNodes[n]["html_code"]
							.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
							.replace(/\t/g,"")
							.replace(/\n/g,"");
							
							webApp.draw.vars["templates"][key] = value;
						}//next
						
						webApp.db.saveTemplates( webApp.draw.vars["templates"] );
						
						if( typeof callback === "function"){
							callback();
						}
						
					} else {
	console.log("error in draw.loadTemplates(), cannot parse templates data.....");
					}

				}//end callback()
			});
		}//end _loadTemplatesFromFile()
		
*/
	}//end _loadTemplates()

/*
		function _loadTemplates( callback ){
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
*/
