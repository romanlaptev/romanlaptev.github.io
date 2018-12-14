//=================================== DRAW methods
var draw = {

	"vars": {
		"blockList": {
			
//--------------------- BLOCK #sitename-block
			"sitename-block":{ 
				build: function(){
					draw.buildBlock({
						"locationID" : "sitename-block",
						"templateID" : "tpl-block--sitename"//,
						//"content" : "<h1><a class='title' href='./'>my lib</a></h1>" 
					});
				},
				state: "add"//"refresh"????
			},
//---------------------
				
//--------------------- BLOCKs alphabetical, tags, library
			"block-taxonomy": {
				build: _buildBlockTaxonomy,
				state: "add"//"refresh"
			},
//---------------------
			
//--------------------- BLOCK #block-book-category
			"block-book-category": {
				build: _buildBookCategory,
				state: "add"//"refresh"
			}
//---------------------
			
		}//end block list
		
	},//end vars

	"buildPage": function(opt){
		return _buildPage(opt);
	},
	"buildBlock": function(opt){
		return _buildBlock(opt);
	}

};//end draw

function _buildPage( opt ){
console.log("_buildPage()");

	var p = {
		//"nid": null,
		//"templateID" : "tpl-page"
		//"title" : "",
		//content : ""
		"callback": null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( draw.vars["blockList"]["sitename-block"].state === "add" ||
			draw.vars["blockList"]["sitename-block"].state === "refresh"
	){
		draw.vars["blockList"]["sitename-block"].build();
		draw.vars["blockList"]["sitename-block"].state = ""; //do not update static block!!!!
	}
	
	if( draw.vars["blockList"]["block-book-category"].state === "add" ||
			draw.vars["blockList"]["block-book-category"].state === "refresh"
	){
		draw.vars["blockList"]["block-book-category"].build();
		draw.vars["blockList"]["block-book-category"].state = ""; //do not update block!!!!
	}
	
	if( draw.vars["blockList"]["block-taxonomy"].state === "add" ||
			draw.vars["blockList"]["block-taxonomy"].state === "refresh"
	){
		draw.vars["blockList"]["block-taxonomy"].build();
		draw.vars["blockList"]["block-taxonomy"].state = ""; //do not update block!!!!
	}
	

};//end _buildPage()


var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
	var timeStart = new Date();

	var p = {
		"title": "",
		"locationID" : "",
		"content" : "",
		//"contentType" : "",
		"templateID" : "tpl-block",
		
		//"contentTpl" : "tpl-list",//"tpl-menu"
		//"contentListTpl" : false,
		
		"callback" : function(){
			var timeEnd = new Date();
			var ms = timeEnd.getTime() - timeStart.getTime();
			var msg = "Generate block '#" + this.locationID +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
//console.log(msg);

			//lib.vars["runtime"].push({
				//"source" : msg,
				//"ms" : ms,
				//"sec" : ms / 1000
			//});
			
			if( typeof p["postFunc"] === "function"){
				p["postFunc"]();//return from _buildBlock()
			}
			
		},//end callback
		"postFunc" : null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	// if( p["content"].length === 0 ){
// _log("<p>app.buildBlock,   error, content is <b class='text-danger'>empty</b></p>");
		// return false;
	// }

	//render dynamic content
	if( typeof p["content"] === "function"){
		//var html = p["content"]();
		//if( html && html.length > 0){
			_insertBlock( p );
		//}
/*				
		p["content"]({
			"callback" : function( res ){
console.log(res);								

				var html = _wrapContent({
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
					_insertBlock( p );
				}
			}
		});
*/				
	} else {//render static content
		_insertBlock( p );
	}

};//end _buildBlock()

		
var _insertBlock = function( opt ){
	
	var p = {
		"templateID": false,
		"locationID": "",
		"title" : "",
		"content" : false,
		"callback":null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log("_insertBlock(): ", p);

	var templateID = p["templateID"];
	if( !lib.vars["templates"][templateID] ){
lib.vars["logMsg"] = "_insertBlock(),  error, not find template, id: <b>" + templateID + "</b>";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return false;
	}

	if( p["locationID"] === "" ){
lib.vars["logMsg"] = "_insertBlock(),  error, not find template location on page...";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
		return false;
	}

	// if( !p["content"] ){
// _log("<p>draw.insertBlock(),   error, content: <b class='text-danger'>" + p["content"] + "</b></p>");
		// return false;
	// }
	
	var html = lib.vars["templates"][templateID];
	
	html = html.replace("{{block_title}}", p["title"]);
	html = html.replace("{{content}}", p["content"]);// function p["content"] return html!!!!
	
	var locationID = func.getById( p["locationID"] );
	if( locationID){
		locationID.innerHTML = html;
	}		
	
	if( typeof p["callback"] === "function"){
		p["callback"]();
	}

};//end _insertBlock()
/*		
	function _wrapContent( opt ){
		var p = {
			"data": null,
			//"type" : "",
			//"wrapType" : "menu",
			"templateID" : false,
			"templateListID" : false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
console.log(p);

		if( !p["data"] || p["data"].length === 0){
lib.vars["logMsg"] = "_wrapContent(),  error, empty content data...";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
			return false;
		}
		if( !p["templateID"] ){
lib.vars["logMsg"] = "_wrapContent(),  error, empty templateID...";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
			return false;
		}
		
		if( !lib.vars["templates"][p.templateID] ){
lib.vars["logMsg"] = "_wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID + "</b>";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
			return false;
		}

		var html = "000";
		
console.log( p["data"].length );
		p["wrapType"] = "item";
		if( p["data"].length > 0 ){
			p["wrapType"] = "list";
		}
		
		switch( p["wrapType"] ){
			case "item" :
				//html = __formNodeHtml( p["data"], lib.vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListID"] ){
lib.vars["logMsg"] = "_wrapContent(),  error, not find <b>templateListID</b>";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
					return false;
				}
				html = __formListHtml( lib.vars["templates"][ p.templateID ] );
			break;
		}//end switch

console.log(html);
		return html;

		function __formListHtml( _html ){
			
			var listHtml = "";
			for( var n = 0; n < p["data"].length; n++){
//console.log( n );
//console.log( p["data"][n], typeof p["data"][n], p["data"].length);
				
				//form list items
				var item = p["data"][n];
					
				//var itemTpl = lib.vars["templates"][ p.templateListID];
				//var itemHtml = __formNodeHtml( item, itemTpl );
				
				var itemHtml = lib.vars["templates"][ p.templateListID];
				for( var key2 in item){
//console.log(key2, item[key2]);

					if( key2 === "childTerms" && item["childTerms"].length > 0){
						var subOrdList = lib.vars["templates"][ p.templateID];
						var itemTpl = lib.vars["templates"][ p.templateListID];
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
					
					if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
// //console.log(key2, item[key2]);
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

		function __formNodeHtml( data, _html ){
			
			for( var key in data ){
//console.log(key, data[key]);

				if( key === "nodeTerms" && data["nodeTerms"].length > 0){
					var nodeTermsList = lib.vars["templates"]["tpl_node_terms"];
					var itemTpl = lib.vars["templates"]["tpl-taxonomy-menu_list"];
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
		
	}//end _wrapContent
*/

function _buildBookCategory(){
	lib.getHierarchy({
		"postFunc": function( hierarchyList ){
//console.log(hierarchyList);	

			if( !hierarchyList ){
lib.vars["logMsg"] = "draw.buildPage(), error, not find data <b>hierarchyList</b>";
func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
console.log( lib.vars["logMsg"] );
				return false;
			}
			
			draw.buildBlock({
				"locationID" : "block-book-category",
				//"title" : "test block",
				"templateID" : "tpl-block--book-category",
				//"contentTpl" : "tpl-termin_nodes",
				//"contentListTpl" : "tpl-termin_nodes_list",
				"content" : _showHierarchy({"hierarchyList": hierarchyList})
			});

				
			//mark root links for breadcrumb navigation
			//$("#block-book-category .nav-click").addClass("root-link");			


		}//end postFunc()
	});

}// end _buildBookCategory()


var _showHierarchy = function(opt){
//console.log("_showHierarchy()", opt);
	var timeStart = new Date();

	var p = {
		"hierarchyList": null,
		"section": null,
		"recourse":false
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	//var bookCategory = p["hierarchyList"][0]["section"];//"библиотека"
	
	var nid = 1;//"библиотека"
	var bookCategory = p["hierarchyList"][nid]["section"];
	
//console.log(bookCategory);
	
	var html = "";
	//for( var n = 0; n < bookCategory.length; n++) {
	for( var key in bookCategory) {
		var _category = bookCategory[key];
		
		if ( _category["type"] == "book" ||
				_category["type"] == "author"){

			html += lib.vars["templates"]["book_category_item_tpl"]
.replace(/{{page-title}}/g, _category["name"] )
.replace("{{nid}}", _category["nid"] )
.replace("{{mlid}}", _category["mlid"] )
.replace("{{plid}}", _category["plid"] )
.replace("{{type}}", _category["type"] );
		}
		
	}//next
	
	html = lib.vars["templates"]["book_category_tpl"].replace("{{list}}", html );
	return html;
	
}//end _showHierarchy()



function _buildBlockTaxonomy(){
	
	lib.taxonomy.getTaxonomy({
		"postFunc": function( taxonomy ){
	//console.log(taxonomy);	

			if( !taxonomy ){
	lib.vars["logMsg"] = "draw.buildPage(), error, not find <b>taxonomy</b>";
	func.log("<div class='alert alert-danger'>" + lib.vars["logMsg"] + "</div>");
	console.log( lib.vars["logMsg"] );
				return false;
			}
			
			var html = lib.taxonomy.view_termin({
				"termins": taxonomy["alphabetical_voc"]["termins"],
				"vid": "4",
				"tid": "116",
				"recourse": true,
				"show_only_children": true,
				"item_tpl": lib.vars["templates"]["tpl-block--taxonomy_alpha_list"],
				"list_tpl": lib.vars["templates"]["tpl-block--taxonomy_alpha"]
			});
	//console.log(html);

			html += lib.taxonomy.view_termin({
				"termins": taxonomy["alphabetical_voc"]["termins"],
				"vid": "4",
				"tid": "115",
				"recourse": true,
				"show_only_children": true,
				"item_tpl": lib.vars["templates"]["tpl-block--taxonomy_alpha_list"],
				"list_tpl": lib.vars["templates"]["tpl-block--taxonomy_alpha"]
			});
						
			draw.buildBlock({
				"locationID" : "block-taxonomy-alpha",
				"templateID" : "tpl-block--tags",
				"content" : html
			});
			//mark root links for breadcrumb navigation
			//$("#block-taxonomy-alpha .nav-click").addClass("root-link");			
				
	//--------------------- BLOCK
			draw.buildBlock({
				"locationID" : "block-library",
				"templateID" : "tpl-block--tags",
				"content" : lib.taxonomy.view_vocabulary({
					"taxonomy": taxonomy,
					"vocabularyName": "library", 
					"recourse": false
					})
			});

			//mark root links for breadcrumb navigation
			//$("#block-library .nav-click").addClass("root-link");			
	//---------------------

	//--------------------- BLOCK
			draw.buildBlock({
				"locationID" : "block-tags",
				//"title" : "Tags",
				"templateID" : "tpl-block--tags",
				"content" : lib.taxonomy.view_vocabulary({
					"taxonomy": taxonomy,
					"vocabularyName": "tags",
					"recourse": false
					})
			});
			//mark root links for breadcrumb navigation
			//$("#block-tags .nav-click").addClass("root-link");			
	//---------------------
			
		}//end postFunc()
	});

}//end _buildBlockTaxonomy()
