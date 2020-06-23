window.onload = function(){
	var webApp = _app();
console.log( webApp );	
	webApp.init();
}//end load

var _app = function ( opt ){
//console.log(arguments);
	var _vars = {
		"init_url" : "?q=load-xml",
		"requestUrl" : "data/export.xml",
		//"requestUrl" : "/mnt/d2/temp/export_mydb_allnodes.xml",
		"templates" : {
			"tpl-node" : _getTpl("tpl-node"),
			"tpl-page-list" : _getTpl("tpl-page-list"),
			"tpl-page-list-item" : _getTpl("tpl-page-list-item"),
			"tpl-booklist" : "<h3>Book list</h3><ul>{{list}}</ul>"
		},
		"appContainer" : getById("App"),
		"contentList" : getById("content-list"),
		//"controlPanel" : getById("control-btn"),
		"log" :  getById("log"),
		"btnToggle" : getById("btn-toggle-log"),
		"$num_notes" : getById("num-notes"),
		"breadcrumbs": {}
	};
	
	
	var _init = function(){
console.log("init webapp!");
		_defineEvents();
		
		var parseUrl = window.location.search; 
		if( parseUrl.length > 0 ){
			_vars["GET"] = parseGetParams(); 
			_urlManager();
		} else {
			if( _vars["init_url"] ){
					//parseUrl = _vars["init_url"].substring(2);
					parseUrl = _vars["init_url"];
console.log(parseUrl);					
			}
			_vars["GET"] = parseGetParams( parseUrl ); 
			_urlManager();
		}
		
	};//end _init()
	
	function _getTpl( id ){
		var tpl = getById(id);
		return tpl.innerHTML;
	}//end _getTpl()
	
	
	function _defineEvents(){
//console.log("_defineEvents()");

		if( !_vars.appContainer ){
_vars["logMsg"] = "error, 'appContainer' undefined, _defineEvents()";
_alert(_vars["logMsg"], "error");
			return false;
		}
			
		_vars.appContainer.onclick = function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event );
// //console.log( this );//page-container
//console.log( target.tagName );
// //console.log( event.eventPhase );
// //console.log( "preventDefault: " + event.preventDefault );
			// //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
			// //event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
			
			if( target.tagName === "A"){
				//if ( target.href.indexOf("#") !== -1){
					if (event.preventDefault) { 
						event.preventDefault();
					} else {
						event.returnValue = false;				
					}
					_vars["GET"] = parseGetParams( target.href ); 
					_urlManager();
				//}
			}
			
		}//end event
		
	}//end _defineEvents()
	
	
	
	function _urlManager( target ){
//console.log(target, _vars["GET"]);

		switch( _vars["GET"]["q"] ) {

			case "toggle-log":
//console.log(webApp.vars["log"]..style.display);
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
						
			case "load-xml":
				loadXml();
			break;
			
			case "book-list"://output content hierarchy
			
				_vars["breadcrumbs"] = {"top":"book list"}//?q=book-list
			
				//form book list (parent_id=0)
				var bookList = _getPageList({
					"parent_id" : "0"
				});
//console.log(bookList);
				var html = _formPageList({
					"pages" : bookList,
					"html": _vars["templates"]["tpl-booklist"]
				});
//console.log(html);
				_vars["contentList"].innerHTML = html;
			break;

			case "view-node"://output single content node with child pages links
				var nodeObj = _getNode({
					"id" : _vars["GET"]["id"]
				});
//console.log(nodeObj);
				if( nodeObj ){
					
					var html = _formNode({"node" : nodeObj});
					_vars["contentList"].innerHTML = html;
					
				} else {
_vars["logMsg"] = "Not find node, nid:" + _vars["GET"]["nid"];
_alert(_vars["logMsg"], "error");
console.log( _vars["logMsg"] );
				}
				
			break;

			
			//case "delete-note":
				//serviceAction({
						//"action" : _vars["GET"]["q"],
						//"id": _vars["GET"]["id"]
					//},
					//function(){
						//loadNotes();
					//});
			//break;
			
			default:
console.log("function _urlManager(),  GET query string: ", _vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()

	
	function loadXml(){

		_vars["contentList"].innerHTML = "";
		
		runAjax( {
			"requestMethod" : "GET", 
			"url" : _vars["requestUrl"], 
			
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
_vars["logMsg"] = "error, not load " + _vars["requestUrl"]
_log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
			},//end callback function
			
			"onLoadEnd" : function( headers ){
//console.log( "onLoadEnd ", headers);
				if( _vars["waitWindow"] ){
					_vars["waitWindow"].style.display="none";
				}
			},//end callback function
			
			"callback": function( data, runtime ){
//console.log(data.length, typeof data, data );
_vars["logMsg"] = "load " + _vars["requestUrl"]  +", runtime: "+ runtime +" sec";
_alert(_vars["logMsg"], "info");
console.log( _vars["logMsg"] );
// //console.log( "_postFunc(), " + typeof data );
// //console.log( data );
// //for( var key in data){
// //console.log(key +" : "+data[key]);
// //}

				if( !data ){
_vars["logMsg"] = "error, no XML data in " + _vars["requestUrl"] ;
_alert(_vars["logMsg"], "error");
console.log( _vars["logMsg"] );
					return false;
				}
					
				var xmlObj = _convertXmlToObj(data);
				_vars["contentObj"] = {
					"content" : xmlObj["xroot"]["childNodes"]["xdata"][0]["childNodes"]["content"],
					"content_links" : xmlObj["xroot"]["childNodes"]["xdata"][0]["childNodes"]["content_links"]
				};
				
				//convert content_links array to objects array {content_id : parent_id}
				var content_links = {};
				for( var n = 0; n < _vars["contentObj"]["content_links"][0]["childNodes"]["item"].length; n++){
					var item = _vars["contentObj"]["content_links"][0]["childNodes"]["item"][n]["attributes"];
					var key = item["content_id"];
					var value = item["parent_id"];
					content_links[key] = value;
				}//next
				_vars["contentObj"]["content_links"] = content_links;
				
				//convert content xml object to js object
				var content = {};
				var num_nodes = 0;
				for( var n = 0; n < _vars["contentObj"]["content"][0]["childNodes"]["node"].length; n++){
					var xmlObj = _vars["contentObj"]["content"][0]["childNodes"]["node"][n];
					
					var nodeObj = {};
					
					for( var key in xmlObj["attributes"]){
						nodeObj[key] = xmlObj["attributes"][key];
					}//next
					
					for( var key in xmlObj["childNodes"]){
						nodeObj[key] = xmlObj["childNodes"][key][0]["text"];
							
						var node_attr = xmlObj["childNodes"][key][0]["attributes"];
						for( var attr in node_attr){
							nodeObj[attr] = node_attr[attr];
						}//next
					}//next
					
					var id = nodeObj["id"];
					content[id] = nodeObj;
					
					num_nodes++;
				}//next
				_vars["contentObj"]["content"] = content;
delete data;
delete xmlObj;
				if( num_nodes > 0 ){//set number of notes
					_vars["$num_notes"].innerHTML  = num_nodes;
					
					_vars["GET"] = parseGetParams("?q=book-list"); 
					_urlManager();
				} else {
					_vars["logMsg"] = "Not find nodes";
					_alert(_vars["logMsg"], "error");
					console.log( _vars["logMsg"] );
				}

				
			}//end callback()
		});
	
	}//end loadXml()

	
	function _getPageList( opt ){
		var p = {
			"parent_id": null
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log( p );

		if( !p["parent_id"]){
			return false;
		}
		
		var nodes=_vars["contentObj"]["content"];
		var content_links=_vars["contentObj"]["content_links"];
		
		var contentIdList = [];
		for( var content_id in content_links){
			var parent_id = content_links[content_id];
			if ( parent_id === p["parent_id"] ){
				contentIdList.push( content_id );
			}
		}//next
//console.log( contentIdList );			
		
		var pageList = [];
		for( var n = 0; n < contentIdList.length; n++){
			var id = contentIdList[n];
			var mainPage = nodes[id];
			//mainPage["child_nodes"] = _getChildNodes( id );
			pageList.push( mainPage );
		}//next
		
		return pageList;
	}//end _getPageList


	function _getNode( opt ){
		try{
			var p = {
				"id": null,
				"nodes" : _vars["contentObj"]["content"],
				"content_links" : _vars["contentObj"]["content_links"]
			};
		} catch(e){
console.log(e);
			_vars["logMsg"] = "error, _getNode()";
			//_vars["logMsg"] .= ", " + e;
			_alert(_vars["logMsg"], "error");
			return false;
		}
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log( p );

		if( !p["id"]){
_vars["logMsg"] = "error, empty node id, _getNode()";
_alert(_vars["logMsg"], "error");
			return false;
		}
		
		var nodeObj = p.nodes[p.id];
		nodeObj["child_nodes"] = _getChildNodes( p.id );
		
		return nodeObj;
	}//end _getNode
	
	
	function _getChildNodes( parent_id ){
		//var childNodes = [];
		var childNodes = _getPageList({
			"parent_id" : parent_id,
		});
		return childNodes;
	}//end _getChildNodes()



	function _formPageList(opt){
		var p = {
			"pages": [],
			"html": _vars["templates"]["tpl-page-list"],
			"itemHtml": _vars["templates"]["tpl-page-list-item"]
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log( p );

		if( p["pages"].length === 0){
_vars["logMsg"] = "error, empty pages list, _drawPageList()";
_alert(_vars["logMsg"], "error");
			return false;
		}
		
		var listHtml = "";
		for( var n = 0; n < p["pages"].length; n++){
			var itemHtml = p["itemHtml"];
			var item = p["pages"][n];
			for( var key in item ){
				var key2 = "{{"+key+"}}";
				if( itemHtml.indexOf( key2) !== -1 ){
//console.log(key, item[key]);
					itemHtml = itemHtml.replace(new RegExp(key2, 'g'), item[key]);
				}
			}//next
			listHtml += itemHtml;
		}//next

		html = p["html"].replace("{{list}}", listHtml);
		return html;
	}//end _formPageList()



	function _formNode(opt){
		var p = {
			"node": false
		};
		
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log( p );

		if( !p["node"]){
_vars["logMsg"] = "error, _drawNode()";
_alert(_vars["logMsg"], "error");
			return false;
		}
		var node = p.node;
		
		//form HTML
		var html =_vars["templates"]["tpl-node"];

//---------------------------------- add linked page, form link				
//delete node["child_nodes"];

		if( node["child_nodes"] ){
			if( node["child_nodes"].length > 0){
				var linkedHtml = _formPageList({
					"pages" : node["child_nodes"]
				});
				html = html.replace("{{child_nodes}}", linkedHtml);
			}
		}

//-------------------------------- convert timestamp to string Data		
		if( node["created"] ){
			if( node["created"].length > 0){
				var createdString = _timeStampToDateStr({
					timestamp : node["created"],
					format : "yyyy-mm-dd hh:min" 
				});
				html = html.replace("{{created}}", createdString);
//console.log(createdString);
			}
		}
		if( node["changed"] ){
			if( node["changed"].length > 0){
				var changedString = _timeStampToDateStr({
					timestamp : node["changed"],
					format : "yyyy-mm-dd hh:min" 
				});
				html = html.replace("{{changed}}", changedString);
			}
		}
		
//------------------------------- insert data into template
		for( var key in node){
//console.log(key, node[key]);
			var key2 = "{{"+key+"}}";
			if( html.indexOf(key2) !== -1 ){
//console.log(key, node[key]);
				if( node[key] ){
					html = html.replace(new RegExp(key2, 'g'), node[key]);
				} else {
_vars["logMsg"] = "warning, undefined key "+key+", title: <b>"+node["title"]+"</b>,_drawNode()";
_alert(_vars["logMsg"], "warning");
					html = html.replace(new RegExp(key2, 'g'), "");
				}
			}
		}//next
		
		
//-------------------------------- form breadcrumbs
		//add container link to breadcrumbs
		_vars["breadcrumbs"][ "key_" + node.id ] = node["title"];
//console.log("add breadcrumb item: ", node.id);
		//form breadcrumbs line
		var breadcrumbs = "";
		var clear = false;
		for( var item in _vars["breadcrumbs"] ){

			if( item === "top"){
				var itemTitle = _vars["breadcrumbs"][item];
				breadcrumbs = "<a href='?q=book-list' class='btn'>" + itemTitle + "</a> > ";
				continue;
			}
			
			var itemID = item.replace("key_", "");
			
			if( clear ){//clear unuseful tail breadrumbs
				delete _vars["breadcrumbs"][item];
			} else {
				var itemTitle = _vars["breadcrumbs"][item];
				if( itemID !== node.id ){
					breadcrumbs += "<a href='?q=view-node&id="+itemID+"' class=''>" + itemTitle + "</a> > ";
				} else {
					breadcrumbs += "<span class='active-item'>" + itemTitle + "</span>";
				}
			}
//console.log( itemID, node.id, itemID === node.id );
//console.log( typeof itemID, typeof node.id );
			if( itemID === node.id ){//detect unuseful tail breadrumbs
				clear = true;
			}
			
		}//next
//console.log( breadcrumbs );

		html = html.replace("{{breadcrumbs}}", breadcrumbs);
//console.log(html);
		return html;
	}//end _formNode()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){
			return _init();
		}
	};
	
};//end _app()
