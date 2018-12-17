var nodes_obj = {
	//"nodes_size" : 0,
	"get_node" : function( params ){
		//return _get_node( params );
		return _getNode( params );
	},
	//"get_xml_nodes" : function( params ){
		//return _get_xml_nodes( params );
	//},
	"getNodes" : function( opt ){
		return _getNodes( opt );
	},
	"get_termin_nodes" : function( params ){
		//return _get_termin_nodes( params );
		return _getTerminNodes( params );
		//return _getTerminNodesXML( params );
		//return _getTerminNodesJquery( params );
		//return _getTerminNodesJS( params );
		//return _getTerminNodesStorage(params);
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

/*
function _get_termin_nodes( params )
{
	if( typeof lib.vars["nodes"] === "undefined")
	{
		var log = "- error, not found lib.vars[nodes], function get_termin_nodes()";
//console.log(message);
		//lib.vars["info"].push( message );
lib.vars["logMsg"] = log;
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		
		return;
	}

	var termin_nodes = [];
	for( var node in lib.vars["nodes"] )
	{
if( typeof lib.vars["nodes"][node]["tid"] === "undefined")
{
continue;
}
		for( var n = 0; n < lib.vars["nodes"][node]["tid"].length; n++)
		{
			if( params["tid"] === lib.vars["nodes"][node]["tid"][n] )
			{
//console.log( node,  lib.vars["nodes"][node]  );
				termin_nodes.push( lib.vars["nodes"][node] );
			}
		}//next node tid
	}//next node
	
//console.log(termin_nodes);
	return termin_nodes;
}//end _get_termin_nodes()
*/
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
						_terminNodes.push( node );
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
lib.vars["logMsg"] = "error, not found termins tid, function _getTerminNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
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
lib.vars["logMsg"] = "error, not found termins tid, function _getTerminNodesStorage()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		return false;
	}
	var terminNodes = [];
	
//======================= TEST
delete lib.vars["nodes"];
delete lib.vars["xml"];

	//var taxonomy_index = [];
	//var xml = lib.vars["xml"];
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
	//storage.putItem("taxonomy_index", taxonomy_index, function(){
//console.log(arguments);				
	//});

	if( lib.vars["waitWindow"] ){
		lib.vars["waitWindow"].style.display="block";
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
			if( lib.vars["waitWindow"] ){
				lib.vars["waitWindow"].style.display="none";
			}
console.log("--- continue of the execution process...");
			if( readValue && readValue.length > 0){
				lib.vars["termin_nodes"] = __getTerminNodes(readValue);
				if( lib.vars["termin_nodes"].length > 0){
					_formBreadcrumb( p.target );
					draw_page();
lib.vars["timeEnd"] = new Date();
lib.vars["runTime"] = (lib.vars["timeEnd"].getTime() - lib.vars["timeStart"].getTime()) / 1000;
lib.vars["logMsg"] = "- nodes_obj.get_termin_nodes("+lib.vars["GET"]["tid"]+"), runtime: <b>" + lib.vars["runTime"] + "</b> sec";
func.log("<p class='alert alert-info'>" + lib.vars["logMsg"] + "</p>");
//console.log( lib.vars["logMsg"] );
					
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


	//storage.getItem("taxonomy_index", _callback );
	//storage.getItem("nodes", _callback );
	
console.log(terminNodes);
//terminNodes = [];
	return terminNodes;

	//function _callback(readValue, err){
//console.log("--- continue of the execution process...");						
//console.log(readValue, err);	

////setTimeout(function(){
	//if( lib.vars["waitWindow"] ){
		//lib.vars["waitWindow"].style.display="none";
	//}
////}, 1000*3);

	//}//end _callback()

	function _deferred_req(){
		
		var $d = $.Deferred();

		storage.getItem("nodes", function(readValue, err){
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
lib.vars["logMsg"] = "error, not found termins tid, function _getTerminNodesJquery()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		return false;
	}
		
	var terminNodes = [];
	var xml = lib.vars["xml"];

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
lib.vars["logMsg"] = "error, not found termins tid, function _getTerminNodes()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
		return false;
	}
		
	var terminNodes = [];
	var xml = lib.vars["xml"];

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
lib.vars["logMsg"] = "- найдено книг: "+ nodes.length;
func.log("");
func.log("<div class='alert alert-info'>" + lib.vars["logMsg"] + "</div>");
//console.log( lib.vars["logMsg"] );
	return nodes;
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
lib.vars["logMsg"] = "error in parameters, not found node nid, function _get_node()";
//func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return false;
	}

	var node = false;
	for( var n = 0; n < lib.vars["nodes"].length; n++){
		if( p.nid === lib.vars["nodes"][n]["nid"] ){
			node = lib.vars["nodes"][n];
			
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
/*
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
*/
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

	if( lib.vars["nodes"] ){
		
		if( typeof p["postFunc"] === "function"){
			p["postFunc"]( lib.vars["nodes"] );//return
		}
		
	} else {
	
		var key = "nodes";
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
