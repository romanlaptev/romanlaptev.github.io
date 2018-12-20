var nodes_obj = {
	"get_node" : function( params ){
		return _getNode( params );
	},
	"getNodes" : function( opt ){
		return _getNodes( opt );
	},
	"get_termin_nodes" : function( params ){
		return _getTerminNodes( params );
	}, 
	"view_node" : function( params ){
//console.log( nodes_obj.view_node.caller);
		return _viewNode( params );
	},
	"viewNodes" : function( opt ){
		return _viewNodes( opt );
	},
	"searchNodes" : function( opt ){
		return _searchNodes( opt );
	}
	
};
//console.log("node object:", nodes_obj);

//=================================== NODES methods

function _getTerminNodes( opt ){
//console.log(opt);
	var p = {
		"tid" : null,
		//"target" : null
		"callback": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if(!p.tid){
lib.vars["logMsg"] = "error, not found termins tid, function _getTerminNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		return false;
	}

	var terminNodes = [];
	
	_getNodes({
		"postFunc": function( nodes ){
//console.log(nodes);
			//if( nodes && nodes.length > 0){
			if( nodes ){
				
				terminNodes = _selectTerminNodes(p.tid, nodes);
//console.log(terminNodes, terminNodes.length);

				//------------------- SORT by author, alphabetical sorting
				if( terminNodes.length > 0 ){
					func.sortRecords({
						"records" : terminNodes,
						"sortOrder": "asc", //desc
						"sortByKey": "author"
					});
				}

				if( typeof p["callback"] === "function"){
					p["callback"](terminNodes);
				}
			}
		}//end postFunc()
	});
	
	
	function _selectTerminNodes(tid, nodes){

		var _terminNodes = [];
		
		if( nodes.length ){//nodes is array
			for( var n = 0; n < nodes.length; n++ ){
				var node = nodes[n];
	//if( typeof node["termins"] === "undefined"){
	//continue;
	//}
				for( var n1 = 0; n1 < node["termins"].length; n1++){
	//console.log(node["termins"][n1], typeof node["termins"][n1]);
					if( tid === node["termins"][n1]["tid"] ){
						//_terminNodes.push( node );
						_terminNodes.push({
							"nid": node["nid"],
							"bookname": node["bookname"],
							"author": node["author"],
							"type": node["type"]
						});

					}
				}//next termin tid
				
			}//next node
			
		} else {//nodes is object
			
			for( var key in nodes ){
				var node = nodes[key];
				for( var n1 = 0; n1 < node["termins"].length; n1++){
	//console.log(node["termins"][n1], typeof node["termins"][n1]);
					if( tid === node["termins"][n1]["tid"] ){
						_terminNodes.push( node );
					}
				}//next termin tid
			}//next node
			
		}

		
//console.log(_terminNodes);
		return _terminNodes;
	}//end _selectTerminNodes()
	
}//end _getTerminNodes()



function _searchNodes( opt ){
//console.log(opt);
	var p = {
		"keyword" : null,
		"targetField" : null,
		"callback": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if(!p.keyword){
lib.vars["logMsg"] = "error, not found search keyword, _searchNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return false;
	}

	if(!p.targetField){
lib.vars["logMsg"] = "error, not found search 'targetField', _searchNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return false;
	}

	var _targetField = p.targetField.toLowerCase();
	var _keyword = p.keyword.toLowerCase();

	_getNodes({
		"postFunc": function( nodes ){
//console.log(nodes);
			if( !nodes ){
				if( typeof p["callback"] === "function"){
					p["callback"](nodes);//return
				}
			}
			
			var sNodes = [];
			for(var nid in nodes){
				var _node = nodes[nid];
				
				if( _targetField === "filename"){
//console.log(_node);
					if( _node["book_files"] && _node["book_files"].length > 0){
						
						var res = __searchFilename( _keyword, _node);
						if( res ){
							sNodes.push({
								"nid": _node["nid"],
								"title": _node["title"],
								"bookname": _node["bookname"],
								"author": _node["author"],
								"type": _node["type"]
							});
						}
						
					}
				} else {
					var _testValue = _node[_targetField].toLowerCase();
					if( _testValue.indexOf( _keyword ) !== -1){
	//console.log(_node);
						//sNodes.push( _node );
						sNodes.push({
							"nid": _node["nid"],
							"title": _node["title"],
							"bookname": _node["bookname"],
							"author": _node["author"],
							"type": _node["type"]
						});
					}
				}
			}//next

			//------------------- SORT by author, alphabetical sorting
			if( nodes.length > 0 ){
				func.sortRecords({
					"records" : nodes,
					"sortOrder": "asc", //desc
					"sortByKey": "author"
				});
			}

//console.log(sNodes, sNodes.length);
lib.vars["logMsg"] = "- найдено книг: "+ sNodes.length;
func.log("");
func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );

			if( typeof p["callback"] === "function"){
				p["callback"](sNodes);//return
			}
			
		}//end postFunc()
	});

	function __searchFilename( keyword, node ){
		for( var n = 0; n < node["book_files"].length; n++){
			var _testValue = node["book_files"][n].toLowerCase();
			if( _testValue.indexOf( keyword ) !== -1 ){
//console.log(node);
				return node;
			}
		}//next
		return false;
	}//end __searchFilename
	
}//end _searchNodes()


function _viewNodes( opt ) {
//console.log("_viewNodes() ", arguments, "caller: " , _viewNodes.caller);
//console.log(opt);
	var p = {
		"nodes" : null,
		"nodes_tpl": lib.vars["templates"]["nodes_tpl"],
		"node_tpl": lib.vars["templates"]["nodes_item_tpl"]
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( !p["nodes"]){
lib.vars["logMsg"] = "- error, not found nodes, _viewNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return "";
	}
	if( p["nodes"].length === 0){
lib.vars["logMsg"] = "- error, not found nodes, _viewNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
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


function _getNode( opt ){
//console.log(opt);
	var p = {
		"nid" : null,
		"xmlObj": null,
		"callback": null
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
		_getNodes({
			
			"postFunc": function( nodes ){
				if( nodes ){
					var node = nodes[nid];
					
					//Get children nodes				
					//if( node["type"] === "author"){
					
					//node["node_child_pages"] = book.get_child_pages({
						//"plid" : node["mlid"],
						//"recourse" : 0
					//});
					
					//}
					
//console.log(node);
					if( typeof p["callback"] === "function"){
						p["callback"](node);//return
					}
				}
			}//end postFunc()
		});
		
		return false;
	}//end __getNodeByNid()
	
}//end _getNode()

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

	for( var voc in lib.vars["taxonomy"]){
//console.log(  lib.vars["taxonomy"][voc]);	
		var test_termins = lib.vars["taxonomy"][voc]["termins"];
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

function _getNodeTerminsXML( opt ){
//console.log("function _getNodeTerminsXML()", opt);
	var p = {
		"nid": null,
		"taxonomy_index": null,
		"taxonomy": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);
	var node_termins = [];
	for( var nid in p["taxonomy_index"]){
		if( nid === p["nid"] ){
			for( var n1 = 0; n1 < p["taxonomy_index"][nid].length; n1++){
				var tid = p["taxonomy_index"][nid][n1];
				node_termins.push( {"tid" : tid } );
			}//next
		}
	}//next


	for( var voc in p["taxonomy"]){
//console.log(  opt["taxonomy"][voc]);	
		var test_termins = p["taxonomy"][voc]["termins"];
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
}//end _getNodeTerminsXML()


function _getNodes( opt ) {
//console.log("function _getNodes()", opt);
//console.log( _getNodes.caller );
//console.log( _getNodes.caller.toString() );

	var p = {
		"postFunc": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( lib.vars["books"] ){
		
		if( typeof p["postFunc"] === "function"){
			p["postFunc"]( lib.vars["nodes"] );//return
		}
		
	} else {
	
		var key = "books";
		storage.getItem( key, function(readValue, err){
	//console.log("- read "+key+" from storage...",readValue);
	//console.log(err);
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]( readValue );//return
			}
		});
		
	}
	
	
/*			
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

		//storage.getItem(key, function(readValue, err){//try read store Nodes
////console.log("--- _deferred_req(), get data...");						
//console.log("- read "+key+" from storage...record: "+readValue.length);
//console.log(err);

			//if(readValue && readValue.length > 0){
				
				//if( lib.vars["updateStore"]){
					//localforage.removeItem(key, function(err) {//remove old version store Nodes
//console.log("- remove " +key);
//console.dir(err);
						//storage.putItem(key, nodes, function(value, err){//save new version store Nodes
//console.log("- save "+key+" to local storage...", value, err);
						//});
					 //});
				//}


			//} else {
				//storage.putItem(key, nodes, function(value, err){//save new version store Nodes
//console.log("- save "+key+" to local storage...", value, err);
				//});
				
			//}
		//});


//for TEST
//					storage.putItem(key, nodes, function(value, err){//save new version store Nodes
//console.log("- save "+key+" to local storage...", value, err);
//					});
		
	}
	
	
	return nodes;
*/			
}//end _getNodes()


function _viewNode( opt ) {
//console.log("function _viewNode()", opt);
	var p = {
		"node": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);
//console.log(_viewNode.caller);
	
	if( !p["node"] ) {
		var log = "- error, not found node...";
lib.vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		return;
	}
	
	var _node = p["node"];
	//----------------------
	var bodyValue = "";
//console.log(_node["body_value"].length );
//console.log("TEST!!!", _node["body_value"] && _node["body_value"].length > 0);
	if( _node["body_value"] && _node["body_value"].length > 0){
		bodyValue = _node["body_value"]
		.replace(/&quot;/g,"\"")
		.replace(/&lt;/g,"<")
		.replace(/&gt;/g,">");
//console.log(bodyValue );
	}
	//----------------------

	//----------------------
	var childNodesHtml = "";
	if( _node["node_child_pages"] && _node["node_child_pages"].length > 0){
//console.log(_node);
//console.log(_node["node_child_pages"]);
//console.log(_node["type"]);

		lib.vars["logMsg"] = "<p>- в разделе найдено подразделов или книг: <b>" + _node["node_child_pages"].length + "</b></p>";
		func.log("");
		func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");

		var childNodesHtml = _showChildPages({
			"nid" :  _node["nid"],
			"mlid" :  _node["mlid"],
			"child_pages": _node["node_child_pages"]
		});
//console.log("childNodesHtml = " + childNodesHtml);
	}
	//----------------------
	
	var node_tpl = lib.vars["templates"]["node_tpl"];
	var html = node_tpl
	.replace("{{author}}", _node["author"] )
	//.replace("{{node-title}}", lib.vars["node"]["title"] )
	.replace("{{type}}", _node["type"] )
	.replace("{{bookname}}", _node["bookname"] )
	.replace("{{changed}}", _node["changed"] )
	.replace("{{created}}", _node["created"] )
	.replace("{{body_value}}", bodyValue )
	.replace("{{child_pages}}", childNodesHtml );


	if( _node["bookname"].length === 0){
		html = html.replace("{{node-title}}", _node["title"] );
	} else {
		html = html.replace("{{node-title}}", "" );
	}
	
	var node_tpl_url = lib.vars["templates"]["node_tpl_url"];

	//form node book local url
	var htmlBookLinks = "";
	if( _node["book_files"] && _node["book_files"].length > 0) {
		var html_book_url = "";
		var subfolder =  _node["subfolder"];
		for( var n = 0; n < _node["book_files"].length; n++ ){
			var filename =  _node["book_files"][n];
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

		htmlBookLinks = lib.vars["templates"]["node_tpl_book_links"].replace("{{list}}", html_book_url);
		
	} else {
	}
	html = html.replace("{{book-links}}", htmlBookLinks);

	
	//add cloud disk links
	var htmlWrapCloudLinks = "";
	if( _node["book_files"] && _node["book_files"].length > 0) {
		var html_cloud_links = add_cloud_links( _node, config["url_book_location_Mail"] );
		html_cloud_links += add_cloud_links( _node, config["url_book_location_Yandex"] );
		//html_cloud_links += add_dropbox_links();
		htmlWrapCloudLinks = lib.vars["templates"]["node_tpl_cloud_links"].replace("{{list}}", html_cloud_links);
	}
	html = html.replace("{{cloud-links}}", htmlWrapCloudLinks);

//-------------------------- form node book external links
	var htmlWrapExternalLinks = "";
	if( _node["book_links"] && _node["book_links"].length > 0 ){
		
		var html_external_links = "";
		for( var n = 0; n < _node["book_links"].length; n++ ){
			var link =  _node["book_links"][n];
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
		htmlWrapExternalLinks = lib.vars["templates"]["node_tpl_external_links"].replace("{{list}}", html_external_links);
		
	}
	html = html.replace("{{external-links}}", htmlWrapExternalLinks);


	//form node old book url
	var html_book_url2 = "";
	if( _node["book_url"] && _node["book_url"].length > 0 ){
		for( var n = 0; n < _node["book_url"].length; n++ ){
			var link =  _node["book_url"][n];

			html_book_url2 += node_tpl_url
					.replace("{{link-title}}", link)
					.replace("{{url}}", link);
		}//next book url
	}
	html = html.replace("{{book-old-url}}", html_book_url2);



	//form node taxonomy menu
	var htmlWrapTermins = "";
	if( _node["termins"] && _node["termins"].length > 0 ){
		var html_termin_links = "";
		var node_tpl_url = lib.vars["templates"]["node_tpl_termins_item"];

		for( var n = 0; n < _node["termins"].length; n++ ) {
			var link_title = _node["termins"][n]["name"];
			html_termin_links += node_tpl_url
					.replace("{{link-title}}", link_title)
					.replace("{{vid}}", "")
					.replace("{{tid}}", _node["termins"][n]["tid"] );
					
		}//next termin
		htmlWrapTermins = lib.vars["templates"]["node_tpl_termins"].replace("{{list}}", html_termin_links);
	}
	html = html.replace("{{termin-links}}", htmlWrapTermins);
	
	return html;
	
	function add_cloud_links( node, cloudUrl ) {//form link on cloud file
//console.log("function add_cloud_links", cloudUrl);			
		var html = "";
		
		var node_tpl_url = lib.vars["templates"]["node_tpl_cloud_links_item"];
		var subfolder =  node["subfolder"];
		
		for( var n = 0; n < node["book_files"].length; n++ ){
			var filename =  node["book_files"][n];
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
	
}//end _viewNode()

function _showChildPages( p ) {
//console.log("function _showChildPages", p);

	if( typeof p["child_pages"] === "undefined") {
		var log = "- error, not found child_pages";
//console.log(message);
		//_vars["info"].push( message );
lib.vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		
		return;
	}
	
	if( p["child_pages"].length === 0) {
console.log("child_pages is empty!!!");
		return;
	}

	//list child pages
	var list_tpl = lib.vars["templates"]["book_child_pages_tpl"];
	var item_tpl = lib.vars["templates"]["book_child_pages_item_tpl"];
	
	var html = "", html_list = "";
	
	for( var n = 0; n < p["child_pages"].length; n++ ) {
		
		var type = $(p["child_pages"][n]).attr("type");
		var nid = $(p["child_pages"][n]).attr("nid");
		var mlid = $(p["child_pages"][n]).attr("mlid");
		var plid = $(p["child_pages"][n]).attr("plid");
		var title = $(p["child_pages"][n]).attr("name");
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
};//end _showChildPages(p)


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
