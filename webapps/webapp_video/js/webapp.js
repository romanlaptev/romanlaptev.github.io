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
			"tagNameFilms": "video"
		},
		"templates_url" : "tpl/templates.xml",
		"templates" : {},
		"breadcrumb": {},
		"init_url" : "#?q=node&nid=6",
	},
	"init" : function( postFunc ){
console.log("init webapp!");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		this["vars"]["log"] = func.getById("log");
		this["vars"]["btnToggle"] = func.getById("btn-toggle-log");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		//this["vars"]["parseProgressBar": func.getById("parse-progress-bar");
		this["vars"]["numTotalLoad"] = func.getById("num-total-load");
		this["vars"]["waitWindow"] = func.getById("win1");
		
		_loadTemplates(function(){
//console.log("Load templates end...", webApp.vars["templates"] );		
			_runApp();
		});
		
	}//end init()
	
};//end webApp()
console.log(webApp);


function _runApp(){

	defineEvents();

	//start block
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
		//$("#load-progress").hide();
	}


	_loadData(function(){
//console.log(arguments);
//console.log(window.location);	

		//clear block
//setTimeout(function(){
		if( webApp["vars"]["waitWindow"] ){
			webApp["vars"]["waitWindow"].style.display="none";
		}		
//}, 1000*3);

	//_loadTemplates(function(){
	//console.log("Load templates end...", webApp.draw.vars["templates"] );		
	//});

		var parse_url = window.location.search; 
		if( parse_url.length > 0 ){
			webApp.vars["GET"] = func.parseGetParams(); 
			_urlManager();
		} else {
			if( webApp.vars["init_url"] ){
				//parse_url = webApp.vars["init_url"].substring(2);
				parse_url = webApp.vars["init_url"];
	//console.log(parse_url);
			}
			webApp.vars["GET"] = func.parseGetParams( parse_url ); 
			_urlManager();
		}

		if( typeof postFunc === "function"){
			postFunc();
		}
	});

	
}//end _runApp()



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
//console.log("click...", e);			
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
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {
/*
			
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
*/

			case "node":
console.log("-- start build page --");
				//var timeStart = new Date();
				_buildPage({
					//"nid" : webApp.vars["GET"]["nid"],
					"callback" : function(){

					//var timeEnd = new Date();
					//var ms = timeEnd.getTime() - timeStart.getTime();
					//var msg = "Generate content block, nid: " + this.nid +", runtime:" + ms / 1000 + " sec";
//_log("<p>"+msg+"</p>");			
//console.log(msg);
console.log("-- end build page --");
					//webApp.app.vars["runtime"].push({
						//"source" : msg,
						//"ms" : ms,
						//"sec" : ms / 1000
					//});
					
					}//end callback
				});
			break;
/*			

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
			
				

*/
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()




//======================================= LOAD DATA
function _loadData( postFunc ){
//console.log("_loadData() ", arguments);
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
					
					"onProgress" : function( e ){
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
						if( webApp.vars["loadProgressBar"] ){
							webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							
							webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
						}
						
					},
						
					"onLoadEnd" : function( headers ){
//console.log( headers );
					},
					
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["DB"]["dataUrl"];
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
						if( typeof postFunc === "function"){
							postFunc();
						}
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
							if( typeof postFunc === "function"){
								postFunc(false);
							}
							return false;
						}

						_parseAjax( data );
						
						if( typeof postFunc === "function"){
							postFunc();
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
//console.log("function _parseXML()");

var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj( xml );
//console.log(xmlObj);
delete xml;
			webApp.vars["DB"]["nodes"] = _formNodesObj(xmlObj);
delete xmlObj;
			//_vars["taxonomy"] = __formTaxonomyObj();
			//_vars["hierarchyList"] = __formHierarchyList();

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
console.log( error );
		}//end catch
		
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
func.log("<div class='alert alert-info'>" + webApp.vars["logMsg"] + "</div>");
console.log( webApp.vars["logMsg"] );
		

	}//end _parseXML()

	function _formNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		var databases = xmlObj["xroot"]["children"]["database"];
		var dbName = "video";
		var tagName = webApp.vars["DB"]["tagNameFilms"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < databases.length; n++){
			if( databases[n]["name"] && databases[n]["name"] === dbName){
//console.log();
				var tagNodes = xmlObj["xroot"]["children"]["database"][n]["children"][tagName];
			}
		}//next
		
		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n]["type"]
				};

				for(var item in tagNodes[n]["children"]){
					var _content = tagNodes[n]["children"][item][0]["text"];
//"producer"
//"roles"
//"creators"
//"description"
//"published"
//"updated"
					
					if( !_content ){
//tags
//title
//ul
						_content = __convertMultipleField( tagNodes[n]["children"][item][0]["children"]);
					}
					obj[item] = _content;
				}
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
				
			}//next
		}
		
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
				for(var item2 in _xf){
					
					if( _xf[item2]["children"] ){
						var _xff = _xf[item2]["children"];
						//var obj = {};
						for( var key3 in _xff ){
							//obj[key3] = _xff[key3];
							fields.push( _xff[key3][0] );//<li><a...>(only one tag!!!)</li>
						}
					} else {
						fields.push( _xf[item2] );
					}
				}
			}
			return fields;
		}//end __convertMultipleField()
		
	}//end _formNodesObj()

	function _formTaxonomyObj(){
	}//end _formTaxonomyObj()
	
	function __formHierarchyList(){
	}//end _formHierarchyList()
			




//============================== TEMPLATES
	function _loadTemplates( callback ){
		//webApp.db.loadTemplates(function( isLoadTemplates ){
//console.log(isLoadTemplates);			
			//if( !isLoadTemplates ){
				_loadTemplatesFromFile();
			//} else{
				//if( typeof callback === "function"){
					//callback();
				//}
			//}
		//});//end db.loadTemplates()
		
		function _loadTemplatesFromFile(){
			
			if( !webApp.vars["templates_url"] || 
				webApp.vars["templates_url"].length === 0 ){
webApp.vars["logMsg"] = "- error, _loadTemplates(), not found 'templates_url'...";
func.log("<p class='alert alert-danger'>" + webApps.vars["logMsg"] + "</p>");
//console.log( webApp.vars["logMsg"] );
				if( typeof callback === "function"){
					callback(false);
				}
				return false;
			}
			
			func.runAjax({
				"requestMethod" : "GET", 
				"url" : webApp.vars["templates_url"], 
				//"onProgress" : function( e ){},
				//"onLoadEnd" : function( headers ){},
				"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error ajax load " + webApp.vars["templates_url"];
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				},
				
				"callback": function( data ){
webApp.vars["logMsg"] = "- read templates from <b>" + webApp.vars["templates_url"] +"</b>";
func.log("<p class='alert alert-info'>" + webApp.vars["logMsg"] + "</p>");
//console.log( webApp.vars["logMsg"] );
//console.log( data );

					if( !data ){
console.log("error, loadTemplates(), not find data templates'....");
						if( typeof callback === "function"){
							callback(false);
						}
						return false;
					}

					//xmlNodes = func.convertXmlToObj( data );
					xmlNodes = func.parseXmlToObj( func, data );
//console.log(xmlNodes);
					if( xmlNodes.length > 0 ){
						for( var n= 0; n < xmlNodes.length; n++){
							var key = xmlNodes[n]["name"];

							var value = xmlNodes[n]["html_code"]
							.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
							.replace(/\t/g,"")
							.replace(/\n/g,"");
							
							webApp.vars["templates"][key] = value;
						}//next
						
						//webApp.db.saveTemplates( webApp.draw.vars["templates"] );
					} else {
console.log("error, loadTemplates(), cannot parse templates data.....");
					}

					if( typeof callback === "function"){
						callback();
					}
				}//end
			});
			
/*
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
*/
		}//end _loadTemplatesFromFile()
		
	}//end _loadTemplates()



//===============================================
	var _buildPage = function( opt ){
console.log("_buildPage()", arguments);

		//if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="modal-backdrop in";
			//webApp.vars["wait"].style.display="block";
		//}
		
		var p = {
			"nid": null,
			//"templateID" : "tpl-page"
			"title" : "",
			//content : ""
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);

		//Get data first 10 nodes for main page feed
		var data = [];
		for(var n=0; n < 10; n++){
			data.push( webApp.vars["DB"]["nodes"][n]);
		}//next
//console.log(data);

		var _html = _draw_wrapData({
			"data": data,
			"templateID": "tpl-feed-list",
			"templateListItemID": "tpl-feed-item"
		});
console.log( _html);

		if( !_html || _html.length === 0){
webApp.vars["logMsg"] = "Error generate html...";
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
		} else {
$("#main").html( _html );			
		}

/*		
		//draw content block
		//if( html.length > 0 ){
			_buildBlock({
				"name" : "block-content",
				"title" : node["title"], 
				"templateID" : "tpl-block-content",
				//"content" : _formNodeContent(node)//node["content"]
				"content" : _html
			});
		//}

		//draw sidebar blocks
		_buildSidebar({
			"blocks" : _vars["blocks"],
			"callback" : function(){
				if( typeof p["callback"] === "function"){
					p["callback"]();//return from _buildPage()
				}
			}//end callback
		});
*/					

		//if( webApp.vars["wait"] ){
			////webApp.vars["wait"].className="";
			//webApp.vars["wait"].style.display="none";
		//}

//---------------------------- return from _buildPage()
		if( typeof p["callback"] === "function"){
			p["callback"]();
		}
			
	};//end _buildPage()



//============================================== DRAW
	function _draw_wrapData( opt ){
		var p = {
			"data": null,
			//"type" : "",
			//"wrapType" : "menu",
			"templateID" : false,
			"templateListItemID": false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw_wrapData(), error, incorrect data ...");
			return false;
		}
		if( !p["templateID"] ){
console.log("-- _draw_wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.vars["templates"][p.templateID] ){
console.log("-- _draw_wrapData(),  error, not find template, id: " + p.templateID);
			return false;
		}
		
		var html = "";
//console.log( p["data"].length );

		p["wrapType"] = "item";
		if( p["data"].length > 0 ){
			p["wrapType"] = "list";
		}
		switch( p["wrapType"] ){
			case "item" :
				//html = __formNodeHtml( p["data"], webApp.vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListItemID"] ){
webApp.vars["logMsg"] = "-- wrapData(), error, var templateListItemID incorrect...";
console.log(webApp.vars["logMsg"]);							
					return false;
				}
				html = __formListHtml( webApp.vars["templates"][ p.templateID ] );
			break;
		}//end switch
		
//console.log(html);
		return html;

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
		
		function __formListHtml( _html ){
			
			var listHtml = "";
			for( var n = 0; n < p["data"].length; n++){
//console.log( n );
//console.log( p["data"][n], typeof p["data"][n], p["data"].length);

				//form list items
				var item = p["data"][n];
					
				//var itemTpl = _vars["templates"][ p.templateListID];
				//var itemHtml = __formNodeHtml( item, itemTpl );
				
				var itemHtml = webApp.vars["templates"][ p.templateListItemID];
				for( var key2 in item){
//console.log(item[key2] instanceof Array, key2, item[key2]);

/*				
					if( key2 === "childTerms" && item["childTerms"].length > 0){
						var subOrdList = webApp.vars["templates"][ p.templateID];
						var itemTpl = webApp.vars["templates"][ p.templateListID];
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
*/			

//if( itemHtml.indexOf("{{​​​producer}}") !== -1 ){
//console.log("TEST");
//console.log(item[key2] instanceof Array, key2, item[key2]);
//itemHtml = itemHtml.replace("{{​​​producer}}", item[key2]+"9999");
//}
			
					
					if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
//console.log(key2, item[key2]);
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

	}//end _wrapData()
