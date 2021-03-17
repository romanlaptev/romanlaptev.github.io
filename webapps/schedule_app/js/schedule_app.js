var func = sharedFunc();
//console.log("func:", func);

window.onload = function(){
//console.log("onload");
_message( navigator.userAgent, "info");
	
	//Start webApp
	if( typeof webApp === "object"){
		_runApp();
	}

	function _runApp(){
		webApp.init(function(){
console.log("end webApp initialize....");
		});
	}//end _runApp()
	
};//end onload

var webApp = {
	
	"vars" : {
		"app_title" : "Расписание транспорта",
		
		"requestParams" : {
			"from" : {
				"title" : "Новосибирск-восточный",
				"esr_code" : 851508
			},
			"to" : {
				"title" : "Раздолье (3362 км)",
				"esr_code" : 851635
			},
		},
		"apikey" : "b07a64bc-f237-4e79-9efb-b951ec68eaf7",
		"logMsg" : "",
		
		"copyRight": {
			//"url": "https://cors-anywhere.herokuapp.com/\
//https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
			"url": "https://romanlaptev-cors.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/copyright/?apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&format=json",
			"data": ""
		},
		
		"DB" : {
			//"dataUrl" : "data/2019-04-26.xml",
			"dataUrl" : "v1/data/2019-04-26.json",
/*
			"dataUrl" : "https://cors-anywhere.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/search/?\
from={{from_code}}&\
to={{to_code}}&\
apikey={{apikey}}&\
date={{date}}&\
transport_types=suburban&\
system=esr&\
show_systems=esr",
*/
/*
			"dataUrl" : "https://romanlaptev-cors.herokuapp.com/\
https://api.rasp.yandex.net/v3.0/search/?\
from={{from_code}}&\
to={{to_code}}&\
apikey={{apikey}}&\
date={{date}}&\
transport_types=suburban&\
system=esr&\
show_systems=esr",
*/
			"dbType" : "" //application/xml 
		},

		"blocks": [
			{
				"locationID" : "block-schedule",
				"title" : "transport schedule", 
				"templateID" : "tpl-schedule",
				"content" : "",
				//"visibility" : true,
				"buildBlock" : function(){
//console.log(this);
					var html = _buldScheduleHtml();
					if( html && html.length > 0 ){
						this.content = html;
						_draw_buildBlock( this );
					}
				}
			}, //end block

			{
				"locationID" : "block-copyright",
				"title" : "copy Right!", 
				"templateID" : "tpl-copyright",
				"content" :  "",
				"buildBlock" : function(){
//console.log(this);
					var data = webApp.vars["copyRight"]["data"];
					var html = _draw_wrapData({
						"data": data,
						"templateID": "tpl-copyright-content",
					});
//console.log(html);
					if( html && html.length > 0 ){
						this.content = html;
						_draw_buildBlock( this );
					}
				}
			}, //end block

		],
		
		"templates_url" : "tpl/templates.xml",
		"templates" : {},
		"init_url" : "?q=list-nodes",
		"timers": {
			"request":{}
		}
	},//end vars
	
	
	"init" : function( postFunc ){
console.log("init webapp!");

		// var appTitle = func.getById("app-title");
		// if( appTitle){
			// appTitle.innerHTML = this.vars["app_title"];
		// }
		
		this["vars"]["log_btn"] = func.getById("log-btn");
		this["vars"]["log"] = func.getById("log");
		this["vars"]["btnToggle"] = func.getById("btn-toggle-log");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		this["vars"]["waitWindow"] = func.getById("win1");
		this["vars"]["numTotalLoad"] = func.getById("num-total-load");
		
		var today = _timeStampToDateStr( new Date() );
//console.log(today);
		$("#date-widget").val(today);
		//$("#date-widget").attr("max", today);
		$("#from-title").val( webApp.vars["requestParams"]["from"]["title"] );
		$("#to-title").val( webApp.vars["requestParams"]["to"]["title"] );

		$("#from-title").data("code", webApp.vars["requestParams"]["from"]["esr_code"]);
		$("#to-title").data("code", webApp.vars["requestParams"]["to"]["esr_code"]);
		
		_loadTemplates(function(){
//console.log("Load templates end...", webApp.vars["templates"] );		
			defineEvents();
			
			_runRequest({
				callback : postFunc
			});
			
		});
		
	}//end init()
	
};//end webApp()
console.log(webApp);


function _runRequest( opt ){
		var p = {
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);
	
	webApp.vars["timers"]["request"]["start"] = new Date();
	//view overlay
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
	}
	
	_loadData({
		"postFunc" : function(res){
//console.log(arguments);
//console.log(window.location);	
			//_loadCopyRightCode(function(){
				
				var parse_url = webApp.vars["init_url"];
				webApp.vars["GET"] = func.parseGetParams( parse_url ); 
				_urlManager();
				
				if( typeof p["callback"] === "function"){
					p.callback();
				}
				
			//});
			
		}//end callback
	});
	
}//end _runRequest()


function defineEvents(){
	webApp.vars["log_btn"].onclick = function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//console.log( event );
//console.log( this );//page-container
//console.log( target);
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );

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
//console.log( search, parseStr );
					if( parseStr.length > 0 ){
						webApp.vars["GET"] = func.parseGetParams( parseStr ); 
						_urlManager( target );
					} else {
console.log( "Warn! error parse url in " + target.href );
					}
	
			}
		}

	}//end event
//------------------------------------------------------------------

	$("#date-widget").on("change", function(event) {
console.log(event.type, $("#date-widget").val() );
		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
	});//end event
	
	$("#btn-update").on("click", function(event) {
//console.log("event...", $("#date-widget").val() );

		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
		
	});//end event
	
	$("#btn-change-direction").on("click", function(event) {
//console.log("event...", event.type );
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}

		var code1 = $("#from-title").data("code");
		var title1 = $("#from-title").val();
		
		var code2 = $("#to-title").data("code");
		var title2 = $("#to-title").val();
		
		$("#from-title").data("code", code2);
		$("#from-title").val( title2 );
		
		$("#to-title").data("code", code1);
		$("#to-title").val( title1 );
		
		_runRequest({
			callback : function(){console.log("-- this is the end...")}
		});
		
	});//end event

//------------------------------------------------------------------	
}//end defineEvents()


function _urlManager( target ){
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {

			case "toggle-log":
//console.log(log.style.display);
				if( webApp.vars["log"].style.display==="none"){
					webApp.vars["log"].style.display="block";
				} else {
					webApp.vars["log"].style.display="none";
				}
			break;
			
			case "clear-log":
				webApp.vars["log"].innerHTML="";
			break;

			case "list-nodes":
console.log("-- start build page --");

				_buildPage({"callback" : function(){
					
//hide overlay
//setTimeout(function(){
					if( webApp["vars"]["waitWindow"] ){
						webApp["vars"]["waitWindow"].style.display="none";
					}		
//}, 1000*3);
				webApp.vars["timers"]["request"]["end"] = new Date();
				webApp.vars["logMsg"] = "request runtime: " + _getRunTime( webApp.vars["timers"]["request"] ) + "sec";
				_message( webApp.vars["logMsg"],"info" );

console.log("-- end build page --");
					}
				});
			break;
			
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);
			break;
		}//end switch
		
}//end _urlManager()

//============================== TEMPLATES
	function _loadTemplates( callback ){
		
		_loadTemplatesFromFile();
		
		function _loadTemplatesFromFile(){
			
			if( !webApp.vars["templates_url"] || 
				webApp.vars["templates_url"].length === 0 ){
webApp.vars["logMsg"] = "- error, not found 'templates_url'...";
_message( webApp.vars["logMsg"], "error");
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
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				},
				
				"callback": function( data ){
webApp.vars["logMsg"] = "- read templates from <b>" + webApp.vars["templates_url"] +"</b>";
_message( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );
//console.log( data );

					if( !data ){
console.log("error, loadTemplates(), not find data templates'....");
						if( typeof callback === "function"){
							callback(false);
						}
						return false;
					}
				
					try{
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
							delete xmlNodes;
							
							//webApp.db.saveTemplates( webApp.draw.vars["templates"] );
						} else {
	console.log("error, loadTemplates(), cannot parse templates data.....");
						}
						
					} catch(e){
console.log(e, typeof e);
webApp.vars["logMsg"] = "TypeError: " + e;
_message( webApp.vars["logMsg"], "error");
					}//end try

					if( typeof callback === "function"){
						callback();
					}
				}//end
			});
			
		}//end _loadTemplatesFromFile()
		
	}//end _loadTemplates()



//===============================================
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		//if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="modal-backdrop in";
			//webApp.vars["wait"].style.display="block";
		//}
		
		var p = {
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);

		//draw blocks
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _block = webApp.vars["blocks"][n];
//console.log(_block["title"]);				

			if( typeof _block["buildBlock"] === "function"){//dynamic form content
				//if( _block["visibility"]){
					_block["buildBlock"]();
					//_block["draw"] = true;
				//}
			} else {
//webApp.vars["logMsg"] = "warning, not found buld function....";
//console.log( "-- " + webApp.vars["logMsg"], _block );
					if( _block["content"] && _block["content"].length > 0 ){
						_draw_buildBlock( _block );
					}
			}
			
		}//next
/*
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _opt = webApp.vars["blocks"][n];
			
			//do not redraw existing block
			if( _opt["draw"] && !_opt["refresh"]){
				continue;
			}
			
			if( _opt["visibility"]){
				
				//closures, need for async data getting from indexedDB
				(function(_opt_){
					//setTimeout(function(){ 
						//console.log("-- closure function, ", _opt_); 
					//}, 1000);
					//_draw_buildBlock( _opt_ );
					
					if( typeof _opt_["buildBlock"] === "function"){
						//if( _opt_["visibility"]){
							_opt_["buildBlock"]();
							_opt_["draw"] = true;
						//}
					} else {
webApp.vars["logMsg"] = "warning, not found buld function....";
console.log( "-- " + webApp.vars["logMsg"], _opt_ );
					}
				})(_opt);//end closure
			}

		}//next
*/

		//if( webApp.vars["wait"] ){
			////webApp.vars["wait"].className="";
			//webApp.vars["wait"].style.display="none";
		//}

		if( typeof p["callback"] === "function"){//return from _buildPage()
			p["callback"]();
		}
			
	};//end _buildPage()

//============================================== DATA
function _loadCopyRightCode( postFunc ){
/*	
	$.getJSON(  webApp.vars["copyRight"]["url"], function(data){
console.log(arguments);
		webApp.vars["copyRight"]["data"] = data;
		if( postFunc === "function"){
			postFunc();
		}
	});
	.done(function () {
console.log("$.ajax, Done...");
	})
	.fail(function (xhr, textStatus) {
webApp.vars["logMsg"] = "$.ajax, Fail..." + webApp.vars["copyRight"]["url"];
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"], arguments );
		if( typeof postFunc === "function"){
			postFunc();
		}
	});
*/	
	func.runAjax( {
		"requestMethod" : "GET", 
		"url" :  webApp.vars["copyRight"]["url"], 
		
		"onLoadEnd" : function( headers ){
//console.log( headers );
		},
		
		"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["copyRight"]["url"];
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof  postFunc === "function"){
				postFunc();
			}
			//return false;
		},

		"callback": function( data, runtime, xhr ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
			webApp.vars["copyRight"]["data"] = __parseJSON( data );

			if( typeof postFunc === "function"){
				postFunc();
			}
		}//end callback()
	});
	
	function __parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
//console.log( jsonObj );
			return jsonObj["copyright"];
			
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
_message( webApp.vars["logMsg"], "error");
			return false;
		}//end catch

	}//end __parseJSON()

}//end _loadCopyRightCode()

function _loadData( opt ){
//console.log("_loadData() ", arguments);
		var p = {
			"postFunc": null,
			"from_code" : $("#from-title").data("code"),
			"to_code" : $("#to-title").data("code"),
			"date": $("#date-widget").val()//2019-04-26
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p.date ||  p.date.length === 0){
webApp.vars["logMsg"] = "error, empty or wrong date...";
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
/*
		if( !p.from_code ||  p.from_code.length === 0){
webApp.vars["logMsg"] = "error, empty or from_code...";
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
		
		if( !p.to_code ||  p.to_code.length === 0){
webApp.vars["logMsg"] = "error, empty or to_code...";
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();
			}
			return false;
		}
*/		
		
		var dataUrl = webApp.vars["DB"]["dataUrl"]
		.replace("{{from_code}}", p["from_code"] )
		.replace("{{to_code}}", p["to_code"] )
		.replace("{{apikey}}", webApp.vars["apikey"] )
		.replace("{{date}}", p.date );
console.log( dataUrl );		
//return;

		func.runAjax( {
			"requestMethod" : "GET", 
			"url" :  dataUrl, 
			
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
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
				if( typeof p["postFunc"] === "function"){
					p["postFunc"]();
				}
				//return false;
			},

			"callback": function( data, runtime, xhr ){
//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
				webApp.vars["DB"]["dbType"] = xhr.getResponseHeader('content-type');
				_parseAjax( data );

				if( typeof p["postFunc"] === "function"){
					p["postFunc"]();
				}
			}//end callback()
		});

		//return false;
		
		function _parseAjax( data ){
			if( webApp.vars["DB"]["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + webApp.vars["DB"]["dbType"];
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			if( webApp.vars["DB"]["dbType"].indexOf("application/xml") !== -1){
				_parseXML( data );
			}
			
			if( webApp.vars["DB"]["dbType"].indexOf("application/json") !== -1){
				_parseJSON( data );
			}
			
		}//_parseAjax()
		
	}//end _loadData()


	function _parseXML(xml){
//console.log("function _parseXML()");

var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj( xml );
//console.log(xmlObj);
delete xml;
			webApp.vars["DB"]["nodes"] = _data_formNodesObj(xmlObj);
//delete xmlObj;
			
			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["loadDataRes"] = true;
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
webApp.vars["logMsg"] = "- convertXmlToObj(), runtime: <b>" + runTime  + "</b> sec";
_message( webApp.vars["logMsg"], "info");
console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj(), error parse XML..." ;
_message( webApp.vars["logMsg"], "error");
console.log( error );
		}//end catch

	}//end _parseXML()

	function _data_formNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		
		var _response = xmlObj["response"]["childNodes"]["segment"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < _response.length; n++){
			var tagNode = _response[n]["childNodes"];
/*			
var node = {
	"arrival" : "",
	
	"tickets_info" : {
		"et_marker": false,
		"place": {
			"currency":"",
			"price": {
				"cents": 0
				"whole":0
			}
			"name": ""
		}
		
	}
	
};
*/			
			for(var key in tagNode){
console.log( key, tagNode[key] );
			}//next
			
		}//next
/*		
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
*/
		return nodes;
		
	}//end _data_formNodesObj()

	function _parseJSON( jsonStr ){
		try{
			var jsonObj = JSON.parse( jsonStr, function(key, value) {
	//console.log( key, value );
				return value;
			});
//console.log( jsonObj );

			//correct departure, duration, arrival
			for( var n = 0; n < jsonObj["segments"].length; n++){
				var record = jsonObj["segments"][n];
				record["duration"] = Math.round( record["duration"] / 60);
				// if( record["duration"] > 60){
					// record["duration"] = record["duration"] / 60;
				// }
				var _d = new Date( record["departure"] );
				record["departure_day"] = _d.getDate() +" "+ func.getMonthByNameNum( _d.getMonth(), "ru" );
				var _min = _d.getMinutes();
				if( _min < 10){
					_min = "0" + _min;
				}
				record["departure_time"] = _d.getHours() +":"+_min;
				delete record["departure"];
				
				var _d = new Date( record["arrival"] );
				record["arrival_day"] = _d.getDate() +" "+ func.getMonthByNameNum( _d.getMonth(), "ru" );
				var _min = _d.getMinutes();
				if( _min < 10){
					_min = "0" + _min;
				}
				record["arrival_time"] = _d.getHours() +":"+_min;
				delete record["arrival"];
			}//next
			
			webApp.vars["DB"]["data"] = jsonObj;
			
		} catch(error) {
webApp.vars["logMsg"] = "error, error JSON.parse server response data...." ;
console.log( error );
_log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
			return;
		}//end catch

	}//end _parseJSON()
	
//==============================================
function _buldScheduleHtml(){
	if( !webApp.vars["DB"]["data"] ){
webApp.vars["logMsg"] = "error, not find data object..." ;
_message( webApp.vars["logMsg"], "error");
return false;
	}
/*
	var data = webApp.vars["DB"]["data"]["search"];
	data["from_title"] = data["from"]["title"];
	data["to_title"] = data["to"]["title"];
	var htmlSearch = _draw_wrapData({
		"data": data,
		"templateID": "tpl-schedule-search",
		//"templateListItemID": "tpl-playlist-item"
	});
*/
	var htmlTable = webApp.vars["templates"]["tpl-schedule-table"];
	webApp.vars["tplNameList"] = "tpl-schedule-table--tr";
	if( window.screen.width <= 460 ){
//console.log("TEEST");
		var htmlTable = webApp.vars["templates"]["tpl-schedule-mobile"];
		webApp.vars["tplNameList"] = "tpl-schedule-mobile--record";
	}

	var data = webApp.vars["DB"]["data"]["segments"];
	var htmlTableList = "";
	for(var n = 0; n < data.length; n++){
		htmlTableList += __buildTableList( data[n] );
	}//next
	htmlTable = htmlTable.replace("{{list}}", htmlTableList);
	
	//var html = htmlSearch + htmlTable;
	var html = htmlTable;
//console.log( html);

	return html;
	
	function __buildTableList( data ){
		//var htmlList = webApp.vars["templates"]["tpl-schedule-table--tr"];
		var record = {};
		
		//copy data object
		for(var key in data){
//console.log(key, data[key], typeof data[key] );
			if( typeof data[key] === "object"){
				__addObjectFiels( key, data[key], record );
			} else {
				record[key] = data[key];
			}
		}//next
		
//console.log(record);
		
		var htmlList = _draw_wrapData({
			"data": record,
			//"templateID": "tpl-schedule-table--tr",
			"templateID": webApp.vars["tplNameList"],
		});
		return htmlList;
	}//end __buildTableList()
	
	function __addObjectFiels( parentKey, srcObj, dstObj ){
		for(var key in srcObj){
			if( typeof srcObj[key] === "object"){
				__addObjectFiels( key, srcObj[key], dstObj );
			} else {
				var _key = parentKey+"_"+key;
				dstObj[_key] = srcObj[key];
			}
		}//next
	}//end __addObjectFields()
	
}//end _buildScheduleHtml()

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
//console.log(p);

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw_wrapData(), error, incorrect data ...");
			return false;
		}
		if( !p["templateID"] ){
console.log("-- _draw_wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.vars["templates"][p.templateID] ){
webApp.vars["logMsg"] = "-- _draw_wrapData(),  error, not find template, id: " + p.templateID;
_message( webApp.vars["logMsg"], "warning");
console.log(webApp.vars["logMsg"]);
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
				html = __formNodeHtml( p["data"], webApp.vars["templates"][ p.templateID ] );
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
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, data[key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
				}
			}//next
			
//--------------- clear undefined keys (text between {{...}} )
_html = _html.replace( new RegExp(/{{(.*?)}}/g), "");
//--------------------			

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
				
				
				//load unique template for item
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.vars["templates"][ tplName ] ){
						itemHtml = webApp.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
					}
				}

//--------------- get keys from template (text between {{...}} )
				//if(n === 1){
					var tplKeys = itemHtml.match(/{{(.*?)}}/g);
					for(var n1 = 0; n1 < tplKeys.length; n1++){
						tplKeys[n1] = tplKeys[n1].replace("{{","").replace("}}","");
					}//next
//console.log( tplKeys, p.templateListItemID, item );
				//}
//---------------

				//make copy object item
				//var _tmp = {
					//"number": item["number"]
				//};
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							item[key2] = "<span class='not-found-item'>not found " + key2 +"</span>";
						} else {
							var subOrdList = item[key2]["listTpl"];
							var itemTpl = item[key2]["itemTpl"];
	/*						
							if( key2 === "title" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-title"];
							}

							if( key2 === "ul" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-links"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-ul"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}

							if( key2 === "tags" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-tags"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-tag"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}
							
							if( key2 === "pictures" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-pictures"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-img"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
	////console.log( "subOrdListHtml: ", subOrdListHtml );
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
	////console.log( subOrdList );
								//item[key2] = subOrdList;
							}
	*/						
							var subOrdListHtml = "";
							for( var n2 = 0; n2 < item[key2].length; n2++){
//console.log( item[key2][n2]["text"] );
								subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
							}//next
//console.log( subOrdListHtml );
							subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
//console.log( subOrdList );
							//item[key2] = subOrdList;
							
							//do not add HTML code to item object!!!
							_tmp[key2] = subOrdList;
						}							
					}
					
					if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
//if(n === 1){
//console.log(key2, item[key2]);
//}						
						if( typeof item[key2] === "undefined"){
//if(n === 1){
//console.log(key2, item[key2], typeof item[key2]);
//}						
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item'>not found " + key2 +"</span>");
						} else {
							//itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), item[key2] );
							itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), _tmp[key2] );
						}
					}
					
				}//next
					
				listHtml += itemHtml;
//console.log(items);
//console.log(listHtml);
			}//next
			
			_html = _html.replace("{{list}}", listHtml);
			return _html;
		}//end __formListHtml

	}//end _draw_wrapData()


	var _draw_buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
		var timeStart = new Date();
		var p = {
			"title": "",
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
				//webApp.app.vars["runtime"].push({
					//"source" : msg,
					//"ms" : ms,
					//"sec" : ms / 1000
				//});
				
				//if( typeof p["callback2"] === "function"){
					//p["callback2"]();//return from _buildBlock()
				//}
				
			}//,//end callback
			//"callback2" : null
		};
//console.log(opt);
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		_draw_insertBlock( p );
	};//end _draw_buildBlock()


	var _draw_insertBlock = function( opt ){
		var p = {
			"templateID": false,
			"locationID": "block-1",
			"title" : "block",
			"content" : false,
			"callback":null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log("_draw_insertBlock()", p);

		var templateID = p["templateID"];
		if( !webApp.vars["templates"][templateID] ){
webApp.vars["logMsg"] = "_draw_insertBlock(), error, not found template, id:" + templateID;
//_message( webApp.vars["logMsg"], "error");
console.log( "-- " + webApp.vars["logMsg"] );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		if( !p["content"] || p["content"].length === 0){
webApp.vars["logMsg"] = "_draw_insertBlock(), warning, not found or empty content block " + p["locationID"];
//_message( webApp.vars["logMsg"], "warning");
console.log( "-- "+webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"]();
			//}
			//return false;
		}
		
		var html = webApp.vars["templates"][templateID];
		html = html.replace("{{block_title}}", p["title"]);
		html = html.replace("{{content}}", p["content"]);
		
		var locationBlock = func.getById( p["locationID"] );
		if( locationBlock ){
			locationBlock.innerHTML = html;
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
_message( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["callback"] === "function"){
			p["callback"]();
		}

	};//end _draw_insertBlock()

//=================================================
	function _timeStampToDateStr( timestamp ){
		var sYear = timestamp.getFullYear();

		var sMonth = timestamp.getMonth() + 1;
		//console.log( sMonth, typeof sMonth );
			if( sMonth < 10){
				sMonth = "0" + sMonth;
			}
			sMonth = "" + sMonth;
			
			var sDate = timestamp.getDate();
			if( sDate < 10){
				sDate = "0" + sDate;
			}
				
			var dateStr = sYear + "-" + sMonth + "-" + sDate;
			return dateStr;
	}//end _timeStampToDateStr()
	
	function _getRunTime( timer){
		return ( timer.end.getTime() - timer.start.getTime() ) / 1000;
	}//end _getRunTime()


	function _message( message, level ){
		switch (level) {
			case "info":
				message = "<p class='alert alert-info'>" + message + "</p>";
				func.log(message);
			break;
			
			case "warning":
				message = "<p class='alert alert-warning'>" + message + "</p>";
				func.log(message);
			break;
			
			case "danger":
			case "error":
				message = "<p class='alert alert-danger'>" + message + "</p>";
				func.log(message);
			break;
			
			case "success":
				message = "<p class='alert alert-success'>" + message + "</p>";
				func.log(message);
			break;
			
			default:
				func.log(message);
			break;
		}//end switch
		
	}//end _message()
