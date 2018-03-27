/*
//======================== build block with static content
	var opt = {
		"name" : "block-1",
		"title" : "Tехника",
		"templateID" : "tpl-info_termins_tech-block",//optional
		"contentTpl" : "tpl-menu",//optional
		
		"content" : "<h3>static block-1</h3>" 
			or
		"content" : function( args ){ //function for getting content data
				var res = [.....];
				if( typeof args["callback"] === "function"){
					args["callback"]( res );
				}
		}//end callback
	};
	buildBlock( opt );
//========================
*/
var webApp = {
	
	"vars" : {
		"app_title" : "Video collection",
		"log" : [],
		"messages" : {
			//"storeNotFound" : "<p class='alert alert-danger'>Object store not exists in DB!!!</p>"
			"nodeNotFound" : "<p class='alert alert-danger'>node not found!!!</p>"
		},
		 "import" : {
			//"data_url" : "../../projects/webapp_db/db/art.xml",
			//"inputDataFormat" : "xml",
			
			//"data_url" :"db/art_correct.json",
			//"inputDataFormat" : "json",
			
			"data_url" : {
"node": "db/node.csv",
"node_revision": "db/node_revision.csv",
"node_type" : "db/node_type.csv",

"field_data_body" : "db/field_data_body.html",
"field_data_field_filename" : "db/field_data_field_filename.csv",
"field_data_field_img_cover" : "db/field_data_field_img_cover.csv",
"field_data_field_roles" : "db/field_data_field_roles.csv",
"field_data_field_subfolder" : "db/field_data_field_subfolder.csv",
"field_data_field_year" : "db/field_data_field_year.csv",
"field_data_field_taxonomy" : "db/field_data_field_taxonomy.csv",
"field_data_field_taxonomy_alpha" : "db/field_data_field_taxonomy_alpha.csv",

"menu_links" : "db/menu_links.csv",
"book" : "db/book.csv",

"taxonomy_index" : "db/taxonomy_index.csv",
"taxonomy_term_data" : "db/taxonomy_term_data.csv",
"taxonomy_term_hierarchy" : "db/taxonomy_term_hierarchy.csv"
			},
			
			"inputDataFormat" : "csv",
			
			"csv_header" : true,// field name in first row of csv file
			"csv_delimiterByFields" : ",",
			//"csv_delimiterByLines" : "\r\n"//,
			"csv_delimiterByLines" : "\n",
			
			//"request_url" : "db/art_{{DATE}}.xml",
			//"request_url_PHP" : "api/request.php",
			//"request_url_ASPX" : "api/request.aspx"
		},
		"templates_url" : "tpl/templates.xml",
		//"testUrlPHP": "api/test.php",
		//"testUrlASPX": "api/test.aspx",
		"GET" : {},
		"pageContainer" : getById("page-container"),
		"wait" : getById("wait"),
		"waitWindow" : getById("wait-window"),
		"loadProgress" : getById("load-progress"),
		"loadProgressBar" : getById("load-progress-bar"),
		"saveProgressBar" : getById("save-progress-bar")
	},
	
	"init" : function( postFunc ){
//console.log("init webapp!", arguments);
console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.db.init();
		//webApp.iDBmodule.init();
//console.log(iDBmodule, typeof iDBmodule);			
		webApp.draw.init();
		webApp.app.init();
		
		var app_title = getById("app-title");
		if( app_title){
			app_title.innerHTML = this.vars["app_title"];
		}
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
		//this.dBase();
	},//end init()
	
	"db" : _db(),
	"iDBmodule" : iDBmodule(),
	"draw" : _draw(),
	"app" : _app(),
	
	// "loadTemplates" : function( frame ){
// //console.log( frame.contentWindow.document.body.innerHTML);
// //console.log( frame.contentWindow.document.body.innerHTML.length );
		// var isLoaded = frame.contentWindow.document.body.innerHTML.length > 0;
// //console.log( isLoaded );
		// if( isLoaded ){
			// webApp.draw.formTemplates();
			// webApp.run();
		// } else {
// console.log("<p>webApp.init(),  error, dont load templates from <b class='text-danger'>IFRAME</b></p>");
			// return false;
		// }
	// },
	
	"run" : _runApp
	
};//end webApp()
console.log(webApp);

	//start
	webApp.app.loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		_runApp();
	});

function _runApp(){
	
	webApp.init(function(){
		webApp.db.loadData(function(){
//console.log(arguments);
//console.log(window.location);	
				var parse_url = window.location.search; 
				if( parse_url.length > 0 ){
					webApp.vars["GET"] = parseGetParams(); 
					webApp.app.urlManager();
				} else {
					if( webApp.app.vars["init_url"] ){
						//parse_url = webApp.app.vars["init_url"].substring(1).split("&");
						parse_url = webApp.app.vars["init_url"].substring(2);
	//console.log(parse_url);					
					}
					webApp.vars["GET"] = parseGetParams( parse_url ); 
					webApp.app.urlManager();
				}

			}//end callback
		);
		
	});//end webApp initialize
}//end _runApp()



function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"init_url" : "#?q=node&nid=20",
		//"init_url" : "#?q=node&nid=2",
		"runtime": [],//time for generate blocks
		"node": [{}],
		"queries": {},
		"blocks" : [
			{
				"name" : "block-1",
				"title" : "Title", 
				"templateID" : "tpl-block-1",
				"content" : "<u>static text in block-1</u>"//,
				//"visibility" : "frontPage"
			},//end block
			{
				"name" : "block-style",
				"title" : "стиль", //"техника",//"жанр",
				"templateID" : "tpl-info_termins_style-block",//location and style for block
				"contentTpl" : "tpl-menu",
				//"contentListTpl" : "tpl-menu_list",
				"contentListTpl" : "tpl-taxonomy-menu_list",
				"content" : function( args ){//function for getting content data
					webApp.db.getBlockContent({
						"vocName" : "info",
						"termName" : "стиль",
						"contentType" : "getTerminByName",
						"callback" : function(res){
//console.log(res);							
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
				},//end callback()
				"visibility" : "frontPage"
			},//end block
			
			{
				"name" : "block-tech",
				"title" : "Tехника",
				"templateID" : "tpl-info_termins_tech-block",
				"contentTpl" : "tpl-menu",
				"contentListTpl" : "tpl-taxonomy-menu_list",
				"content" : function( args ){//function for getting content data
					webApp.db.getBlockContent({
						"vocName" : "info",
						"termName" : "техника",
						"contentType" : "getTerminByName",
						"callback" : function(res){
//console.log(res);							
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
				},//end callback()
				"visibility" : "frontPage"
			},//end block
			{
				"name" : "block-genre",
				"title" : "Жанр",
				"templateID" : "tpl-info_termins_genre-block",
				"contentTpl" : "tpl-list",
				"contentListTpl" : "tpl-taxonomy-menu_list",
				"content" : function( args ){//function for getting content data
				
					webApp.db.getBlockContent({
						"vocName" : "info",
						"termName" : "жанр",
						"contentType" : "getTerminByName",
						"callback" : function(res){
//console.log(res);							
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
					
				},//end callback()
				"visibility" : "frontPage"
			},//end block
			
			{
				"name" : "block-alphabetical-voc",
				"title" : "", 
				"templateID" : "tpl-block-content",
				"contentTpl" : "tpl-menu-inline",
				//"contentListTpl" : "tpl-menu_list",
				"contentListTpl" : "tpl-taxonomy-menu_list",
				"content" : function( args ){//function for getting content data
				
					webApp.db.getBlockContent({
						"vocName" : "Alphabetical_voc", 
						"termName" : "alphabetical list",
						"contentType" : "getTerminByName",
						"callback" : function(res){
//console.log(res);							
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
					
				}//,//end callback()
			},//end block
			{
				"name" : "block-alphabetical-ru",
				"title" : "", 
				"templateID" : "tpl-block-content",
				"contentTpl" : "tpl-menu-inline",
				//"contentListTpl" : "tpl-menu_list",
				"contentListTpl" : "tpl-taxonomy-menu_list",
				"content" : function( args ){//function for getting content data
					
					webApp.db.getBlockContent({
						"vocName" : "Alphabetical_voc", 
						"termName" : "алфавитный каталог",
						"contentType" : "getTerminByName",
						"callback" : function(res){
//console.log(res);							
							if( typeof args["callback"] === "function"){
								args["callback"]( res );
							}
						}//end callback
					});
					
				}//,//end callback()
			}//end block
		
		]
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
		
	}//end _urlManager()

	
	
	function _formQueryObj(opt){
		var p = {
			queryTarget : "",//"getTerminByName"
			vocName : "",//"info",
			termName : "",//"жанр"
			"vid" : null,//"5" (info vocabulary)
			"tid" : null,//"97" (техника)
			"nid" : null//"20" (Ballet Mistress)
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( p["queryTarget"].length === 0 ){
console.log("error in _formQueryObj(), empty 'queryTarget'....");
			return false;
		}

		switch( p.queryTarget ) {
			
			case "getTerminByName":
				if( p["vocName"].length === 0 ){
console.log("error in _formQueryObj(), empty 'vocabularyName'....");
					return false;
				}
				if( p["termName"].length === 0 ){
console.log("error in _formQueryObj(), empty 'termName'....");
					return false;
				}
				return __formQueryTerminByName();
			break;
			
			case "getChildTerms":
				if( p["vid"].length === 0 ){
console.log("error in _formQueryObj(), empty 'vid'....");
					return false;
				}
				if( p["tid"].length === 0 ){
console.log("error in _formQueryObj(), empty 'tid'....");
					return false;
				}
				return __formQueryChildTerms();
			break;
			
			case "getNodeTerms":
				if( p["nid"].length === 0 ){
console.log("error in _formQueryObj(), empty 'nid'....");
					return false;
				}
				return __formQueryNodeTerms();
			break;
			
		}//end switch
		
		function __formQueryNodeTerms(){
			var subQuery1 = {
				"action" : "select",
				"tableName": "term_node",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "nid", "value" : p["nid"], "compare": "="}
				]
			};
			var baseQuery = {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : [
"tid",
"vid",
"name"//,
//"description",
//"weight"
],
				"where" : [
					{"key" : "tid", "compare": "=", "value" : subQuery1}
				]
			};
//console.log(baseQuery);
			return baseQuery;
		}//end __formQueryNodeTerms()

		
		function __formQueryChildTerms(){
			var subQuery1 = {
				"action" : "select",
				"tableName": "term_hierarchy",
				"targetFields" : ["tid"],
				"where" : [
						{"key" : "parent", "value" : p["tid"], "compare": "="}
					]
			};
			var baseQuery = {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : [
"tid",
"vid",
"name"//,
//"description",
//"weight"
],
					"where" : [
						{"key" : "vid", "compare": "=", "value" : p["vid"]},
						{"logic": "AND", "key" : "tid", "compare": "=", "value" : subQuery1}
					]
				};

			// webApp.db.query({
				// "queryObj" : baseQuery,
				// "callback" : function( res ){
// console.log(res);
				// }//end callback
			// });
			return baseQuery;
		}//end __formQueryChildTerms()
		
		function __formQueryTerminByName(){
/*
		//form data queries
	//1. select vid from vocabulary where name="info" -- 5
	//1. select tid from term_data where name="жанр" -- 95
	//2. select tid from term_hierarchy where parent=95 -- "100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226"
	//3. select name from term_data where vid=5 and tid in ("100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226")
	//4. select dst from url_alias where src IN ("taxonomy/term/100", "taxonomy/term/101".....)
//test subQuery!!!!!		
				// var queryStr = "\
	// select name from term_data where vid=(\
		// select vid from vocabulary where name='info'\
	// ) and tid in (\
		// select tid from term_hierarchy where parent=(\
			// select tid from term_data where name='жанр'\
		// )\
	// )";
*/		
			var subQuery1 = {
				"action" : "select",
				"tableName": "vocabulary",
				"targetFields" : ["vid"],
				"where" : [
					{"key" : "name", "compare": "=", "value" : p.vocName}
				]
			};
			
			var subQuery3 = {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "name", "compare": "=", "value" : p.termName}
				]
			};
			var subQuery2 = {
				"action" : "select",
				"tableName": "term_hierarchy",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "parent", "compare": "=", "value" : subQuery3}
					//{"key" : "parent", "compare": "=", "value" : 95}
				]
			};

			var baseQuery = {
					"action" : "select",
					"tableName": "term_data",
					"targetFields" : [
	"tid",
	"vid",
	"name"//,
	//"description",
	//"weight"
	],
					"where" : [
						{"key" : "vid", "compare": "=", "value" : subQuery1},
						{"logic": "AND", "key" : "tid", "compare": "=", "value" : subQuery2}
					]
				};
				
			//_vars["queries"]["getTermGenre"] = baseQuery;
//console.log(baseQuery);
			return baseQuery;
		}//end __formQueryTerminByName()
		
	}//end _formQueryObj()
	
	
	var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);

		var timeStart = new Date();
		var p = {
			"title": "block title",
			"content" : "",
			//"contentType" : "",
			"templateID" : "tpl-block",
			
			"contentTpl" : "tpl-list",//"tpl-menu"
			"contentListTpl" : false,
			
			"callback" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);			
				webApp.app.vars["runtime"].push({
					"source" : msg,
					"ms" : ms,
					"sec" : ms / 1000
				});
				
				if( typeof p["callback2"] === "function"){
					p["callback2"]();//return from _buildBlock()
				}
				
			},//end callback
			"callback2" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
// console.log(p);
	
		// if( p["content"].length === 0 ){
// _log("<p>app.buildBlock,   error, content is <b class='text-danger'>empty</b></p>");
			// return false;
		// }

		//dynamic form content
		if( typeof p["content"] === "function"){
			p["content"]({
				"callback" : function( res ){
//console.log(res);								
					var html = webApp.draw.wrapContent({
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
						webApp.draw.insertBlock( p );
					}
					
				}
			});
		} else {
			webApp.draw.insertBlock( p );
		}

	};//end _buildBlock()

	
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		if( webApp.vars["wait"] ){
			webApp.vars["wait"].className="modal-backdrop in";
			webApp.vars["wait"].style.display="block";
		}
		
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
//console.log(options);

	//======================= dynamic block
		// var _vocabularyName = "info";
		// var _termName = "жанр";//"техника";//"стиль";
		
		//get block data
		// webApp.db.getVocabularyByName({
			// "vocName" : _vocabularyName,
			// "callback" : function(res){
	// //console.log(res, res.length );	
				// var _vid = res[0]["vid"];
				// webApp.db.getTermByName({
					// "vid" : _vid, 
					// "termName" : _termName,
					// "callback" : function(res){
	// //console.log(res, res.length );
						// var _tid = res[0]["tid"];
	// //console.log( _vid, _tid );			

						// webApp.db.getChildTerms({
							// "vid" : _vid,
							// "tid" : _tid,
							// "callback" : function(res){
								// _drawBlockGenre( res );
							// }//end callback
						// });
						
					// }//end callback
				// });
				
			// }//end callback
		// });
		
		//draw page content
		if( p["nid"] ){
			
			//get node from DB
			var node = webApp.db.nodeLoad({
				"nid": p["nid"],
				//"title": options["title"]
				"callback" : function( node ){
console.log( node );

					if(!node){
						var log_message = webApp.vars["messages"]["nodeNotFound"];
						_log( log_message );
						if( typeof _showHiddenLog === "function"){
							_showHiddenLog();
						}
						
						if( typeof p["callback"] === "function"){
							p["callback"]();
						}
						return false;
					}

					var _data = {};
					//var _data = {
						//"body" : node["body"],
						//"field_author_value" : "Майкл Паркес"
					//};
					
					_data["title"] = node["title"];
					
					//add node BODY to the content block
					//if( node["body"].length > 0 ){
						_data["body"] = node["body"];
					//}
					
					//add node FIELDS to the content block
					for( var field in node["fields"] ){
						if( !node["fields"][field] ){
							continue;
						}
						if( node["fields"][field] === "NULL" ){
							continue;
						}
						_data[field] = node["fields"][field];
					}//next
					
					//add node TERMS to the content block
//for test!!!
//node["terms"] = [];
					_data["nodeTerms"] = "test";
					if( node["nodeTerms"].length > 0 ){
						_data["nodeTerms"] = node["nodeTerms"];
					}
					
					var opt2 = {
						"data" : _data,
						"templateID" : "tpl-node",
						//"wrapType" : "node",
					};
//console.log( node["type"] );
					if( node["type"].length > 0 ){
						//"templateID" : "tpl-node_photogallery_image",
						opt2["templateID"] = opt2["templateID"]+"_"+node["type"];
					}
					var _html = webApp.draw.wrapContent(opt2);
//console.log( _html);

					if( _html && _html.length > 0){
						//html += _html;
					} else {
console.log("Error form node html!!!");
					}
					
					
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

					
					_buildSidebar({
						"blocks" : _vars["blocks"],
						"callback" : function(){
							if( typeof p["callback"] === "function"){
								p["callback"]();//return from _buildPage()
							}
						}//end callback
					});
					
					
				}//end callback
			});
			
		} else {
console.log( p["nid"] );			
_log("<p>Warn! no page,  'nid' <b class='text-danger'>is empty</b></p>");			
		}

		// //draw sidebar blocks
		// for( var n = 0; n < _vars["blocks"].length; n++){
			// var opt2 = _vars["blocks"][n];
// //console.log(opt2["visibility"], options["title"]);				
			// if( opt2["visibility"]){
				// if( opt2["visibility"].indexOf( p["title"] ) !== -1 ){
					// _buildBlock( opt2 );
				// }
			// } else {
				// _buildBlock( opt2 );
			// }
			
		// }//next
			
		if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="";
			webApp.vars["wait"].style.display="none";
		}
			
	};//end _buildPage()
	
	function _buildSidebar(opt){
		var p = {
			"blocks": null,
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);		

		if( p["blocks"].length === 0){
			var msg = "Warning! no sidebar blocks...";
console.log(msg);			
			return false;
		}
		
		//recursively build blocks
		p["counter"] = 0;
		__buildBlock();
		
		
		function __buildBlock(){
			var n  = p["counter"];
			var block = p["blocks"][n];
			
			block["callback2"] = function(){
//console.log(block);				
				p["counter"]++;
				if( p["counter"] < p["blocks"].length){
					__buildBlock();
				} else {
					if( typeof p["callback"] === "function"){
						p["callback"]();//return from _buildSidebar()
					}
				}
			}//end callback2
			
			_buildBlock( block );
		}//end __buildBlock()
		
	}//end _buildSidebar
	
	
	
	function _serverRequest( opt ){
		var p = {
			//"date": null,
			"url" : null,
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);		
/*
//---------------------- Server TESTS
		if( typeof webApp.vars["supportPHP"] === "undefined" ||
				typeof webApp.vars["supportASPX"] === "undefined"){
			__testPHP(function( supportPHP ){
console.log("supportPHP:" + supportPHP);

				if( supportPHP ){
					__processRequest();
				} else {
					
					__testASPX(function( supportASPX ){
		console.log("supportASPX:" + supportASPX);
						// if( supportASPX ){
							// __processRequest();
						// } else {
							// //next test....
						// }
						__processRequest();
						
					})//end test;
				}
				
			})//end test;
		}
//---------------------
*/
		__processRequest();

		function __processRequest(){
			
			//form url
			//var url = webApp.vars["import"]["request_url"];
			//var url = webApp.vars["import"]["data_url"];
			var url = p["url"];
			if(!url || url.length === 0){
console.log("error, no URL....");				
				return false;
			}
			
			// if( webApp.vars["supportPHP"] ){
				// url = webApp.vars["import"]["request_url_PHP"];
			// }
			// if( webApp.vars["supportASPX"] ){
				// url = webApp.vars["import"]["request_url_ASPX"];
			// }
			
			// if( p["date"] && p["date"].length > 0 ){
				// url +=  "?date="+p["date"];
			// }
			//var url = webApp.vars["import"]["data_url"] + "?date="+p["date"];
			
			runAjax( {
				"requestMethod" : "GET", 
				//"requestMethod" : "HEAD", 
				"url" : url, 
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
				
				"onError" : function( errorCode  ){
console.log(errorCode);
					var msg = "error loading " + url +", "+ errorCode["status"]+", "+errorCode.statusText;
					_log("<div class='alert alert-danger'>"+msg+"</div>");
					if( typeof p["callback"] === "function"){
						p["callback"]([]);
						return false;
					} 
				},
				
				"callback": function( data ){
var msg = "load " + url ;
console.log(msg);

					if( !data || data.length === 0){
	console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					if( typeof p["callback"] === "function"){
						p["callback"](data);
						return false;
					} 
					
				}//end callback()
			});
		}//end __processRequest()
/*
		function __testPHP( callback ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : webApp.vars["testUrlPHP"], 
				"callback": function( data ){
//console.log(data, typeof data, data.length, data[0]);

					if( !data || data.length === 0){
console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					webApp.vars["supportPHP"] = false;
					if (data[0] === "4"){//test success, result of adding 2+2 on PHP
						webApp.vars["testPHP"] = true;
					}
					
					if( typeof callback === "function"){
						callback( webApp.vars["supportPHP"] );
						return false;
					} 
					
				}//end callback()
			});
		}//end __testPHP()
		
		function __testASPX( callback ){
			runAjax( {
				"requestMethod" : "GET", 
				"url" : webApp.vars["testUrlASPX"], 
				"callback": function( data ){
//console.log(data, typeof data, data.length, data[0]);

					if( !data || data.length === 0){
console.log("error in _app(), _serverRequest(), not find 'data'.... ");			
						data = [];
					}
					
					webApp.vars["supportASPX"] = false;
					if (data[0] === "4"){//test success, result of adding 2+2 on ASPX
						webApp.vars["supportASPX"] = true;
					}
					
					if( typeof callback === "function"){
						callback( webApp.vars["supportASPX"] );
						return false;
					} 
					
				}//end callback()
			});
		}//end __testASPX()
*/		
	}//end _serverRequest()
	
	function _loadTemplates( callback ){
		
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
		
	}//end _loadTemplates()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		urlManager:	function( target ){ 
			return _urlManager( target ); 
		},
		
		buildBlock:	function(opt){ 
			return _buildBlock(opt); 
		},
		buildPage:	function(opt){ 
			return _buildPage(opt); 
		},
		serverRequest:	function(opt){ 
			return _serverRequest(opt); 
		},
		loadTemplates : _loadTemplates,
		formQueryObj : _formQueryObj
	};
}//end _app()



// function _drawBlockGenre( res ){

	// var opt = {
		// "templateId" : "tpl-info_termins_genre-block"
	// };

	// var  data = {
		// "block_title" : "Genre",
		// "items" : [
			// // {
				// // "name" : "миниатюра",
				// // "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
			// // },
			// // {
				// // "name" : "иллюстрация",
				// // "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/illustration"
			// // }
		// ]
	// };
	
	// for( var n = 0; n < res.length; n++){
		// var item = {
			// "name" : res[n]["name"],
			// "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
		// };
		// data["items"].push(item);
	// }//next
	
	// opt["data"] = data;
	// webApp.draw.insert( opt );
// }//end _drawBlockGenre()


// function create_MSXML(){// create XML ActiveXObject for Internet Explorer before version 9
	// if (typeof (ActiveXObject) === "undefined") {
		// return false;
	// }
	// var progIDs = [
					// "Msxml2.DOMDocument.6.0", 
					// "Msxml2.DOMDocument.5.0", 
					// "Msxml2.DOMDocument.4.0", 
					// "Msxml2.DOMDocument.3.0", 
					// "MSXML2.DOMDocument", 
					// "MSXML.DOMDocument"
				  // ];
				  
	// for(var n = 0; n < progIDs.length; n++) {
		// try { 
			// var xml = {
				// "xml_obj" : new ActiveXObject( progIDs[n] ),
				// "version" : progIDs[n]
			// }
			// return xml; 
		// } 	catch(e) {
// // console.log("error: " + e);
			// // for( var item in e )	{
// // console.log( item + ": " + e[item]);
			// // }//next
		// };
	// }//end try
// }//end create_MSXML()


/*
	function _parseXML(xml){

		//if(window.ActiveXObject || "ActiveXObject" in window){
		// if( window.ActiveXObject ){
// console.log("ActiveXObject support: " + window.ActiveXObject + ", use MSXML");
		// }
		// else {
// console.log("ActiveXObject not support,  use window.DOMParser");
		// }
		

// //console.log( document.implementation );
		// if( document.implementation ){
			// var hasXmlDom = document.implementation.hasFeature("XML", "2.0");
			// var msg = "support DOM Level 2 XML - " + hasXmlDom;
// console.log(msg);
			
			// var supportsXPath = document.implementation.hasFeature("XPath", "З.0"); 	
			// msg = "support DOM Level 3 XPath - " + supportsXPath;
// console.log(msg);
		// }

			//var rootTag = xml.documentElement.tagName;
			var rootTag = _vars["schema"]["root"]["tag"];
			var msg = "main tagName: " + rootTag;
//console.log(msg);				

			var xmlDoc = xml.getElementsByTagName( rootTag );
console.log( xmlDoc, xmlDoc.item(0).tagName );		
//console.log( xmlDoc.context );		
//var test = xmlDoc.context;
//for(var key in test ){
//console.log( key +" : "+ test[key] );				
//}
		

			var attr = xmlDoc.item(0).attributes;
			var attrName = _vars["schema"]["root"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

			var childTag = _vars["schema"]["root"]["child"]["tag"];
			var tables = xmlDoc.item(0).getElementsByTagName( childTag );
console.log( tables,  tables.item(0).tagName, tables.length );		

			var attr = tables.item(0).attributes;
			var attrName = _vars["schema"]["root"]["child"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

		//__parse( _vars["data"] );
		
		// if (window.DOMParser) { // all browsers, except IE before version 9
			// var msg = "window.DOMParser support: " + window.DOMParser;
// console.log(msg);
			// var parser = new DOMParser();
			
			// //var xmlsrc = _vars["data"].children[0].outerHTML;
// //console.log( xmlsrc );

			// try {
				// //var xml = parser.parseFromString( xmlsrc, "text/xml" );
// //console.log( xml );
				// __parse( _vars["data"] );
				
			// } catch (e) {
				// // if text is not well-formed, 
				// // it raises an exception in IE from version 9
// alert ("XML parsing error: " + e);
				// for( var item in e ){
// console.log(item + ": " + e[item]);
				// }
			// };

		// }
		// else {  // Internet Explorer before version 9

			// var xml_info = _createMSXML();
// console.log( "created  MSXML ActiveXObject, version: " + xml_info.version);		
			// var xml = xml_info["xml_obj"];

			// // xml.async = "false";
			// // xml.loadXML( xmlsrc );	
			// // var errorMsg = null;
			// // if (xml.parseError && xml.parseError.errorCode != 0) {
				// // errorMsg = "XML Parsing Error: " + xml.parseError.reason
						  // // + " at line " + xml.parseError.line
						  // // + " at position " + xml.parseError.linepos;
			// // }
			// // if (errorMsg) {
				// // log.innerHTML += "<p>" + errorMsg + "</p>";
			// // }
			// // parse_xml(xml);

		// }

		//xmldom = xml;

		function __parse( xml ){

				//read schema
				//var pmaSchemas = xml.getElementsByTagName("pma:structure_schemas");
//console.log( pmaSchemas ) ;

				//var pmaDatabase = xml.getElementsByTagName("pma:database");
//console.log( pmaDatabase ) ;

				//var tableList = xml.getElementsByTagName("pma:table");
//console.log( tableList, tableList.length ) ;

				//var x = xml.childNodes;
				//var x = xml.documentElement.childNodes;
//console.log( x ) ;
//console.log( x.length ) ;

				// var test = xml.childNodes;
// //console.log( typeof test );
				// for (var n = 0; n < test.length; n++) {
					// var node = test[n];
					
					// if( node.nodeTypeString ){//IE
// console.log( node.nodeType +", "+ node.nodeTypeString);
					// } else {
// console.log( node.nodeType);
					// }
					
// //console.log(  node.nodeTypeValue );
				// }

				//var test = xml["xml"];
//console.log( "xml - " + typeof test );
				

				//read root
				//var root = xml.documentElement.children;
				// //if( xml.children ){
					// var root = xml.children;
// console.log( typeof root, root );
					// if( root ){
						// for(var key in root){
// console.log( key +" : "+ root[key] );				
						// }
						
						// //read schema
						// var schemaTag = root[0].children[0].tagName;
// var msg = "schema tagName: " + schemaTag;
// console.log(msg);				
					// }
				// //}


			// var itemTags = xml.getElementsByTagName("program");
			// parse_res.innerHTML += "<p> itemTags.length = "+ itemTags.length +"</p>";
			
			// for (var n = 0; n < itemTags.length; n++) 
			// {
				// if ('textContent' in itemTags[n])
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].textContent + "</li>";
				// }
				// else
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].text + "</li>";
				// }
				
			// }//next
			
		}//end __parse()
		
	}//end _parseXML()

*/
