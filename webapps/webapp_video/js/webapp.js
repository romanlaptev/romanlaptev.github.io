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
		"templates_url" : "tpl/templates.xml",
		"templates" : {},
		"breadcrumb": {},
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
		
		defineEvents();

		//start block
		if( this["vars"]["waitWindow"] ){
			this["vars"]["waitWindow"].style.display="block";
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
		
			if( typeof postFunc === "function"){
				postFunc();
			}
		});
		
				
	}//end init()
	
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
console.log("function _parseXML()");
		//var rootTagName = xml.documentElement.nodeName;
		//var xmlDoc = xml.getElementsByTagName( rootTagName);
//console.log( xmlDoc, xmlDoc.item(0),  xmlDoc.length) ;

//---------------------------- 
var timeStart = new Date();

		try{
			xmlNodes = func.convertXmlToObj( xml );
console.log(xmlNodes);
delete xml;
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
		
//---------------------------- 
/*
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

*/

/*
		$( $(xml).find("database").find("video").find("published") ).each(function( index, value ){
//console.log( $(this) );
console.log( index, value );
		});//next
*/				
		//_vars["taxonomy"] = __formTaxonomyObj();
		//_vars["nodes"] = __formNodesObj();
		//_vars["hierarchyList"] = __formHierarchyList();

	}//end _parseXML()

	function __formNodesObj(){
	}//end __formNodesObj()

	function __formTaxonomyObj(){
	}//end __formTaxonomyObj()
	
	function __formHierarchyList(){
	}//end __formHierarchyList()
			




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
