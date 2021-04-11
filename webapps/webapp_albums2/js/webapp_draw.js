function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {};
	_vars["templates"] = {};

	var _init = function(){
//console.log("init _draw");
	};
	
/*
	//function _formTemplates( frame ){
	function _formTemplates(){
		//var $tplDoc = frame.contentDocument;
		//https://learn.javascript.ru/iframes
		//var $tplDoc = frame.contentWindow.document;
		
		//_vars["tplDoc"] = window.frames[ "tpl_frame" ].document;
		var $tplDoc = window.frames[ "tpl_frame" ].document;
//console.log( window.frames[ "tpl_frame" ].document );

		_vars["templates"]["tpl-list"] = _getTplMod("tpl-list", $tplDoc);
		_vars["templates"]["tpl-list_list"] = _getTplMod("tpl-list_list", $tplDoc);
		_vars["templates"]["tpl-menu"] = _getTplMod("tpl-menu", $tplDoc);
		_vars["templates"]["tpl-menu_list"] = _getTplMod("tpl-menu_list", $tplDoc);
		_vars["templates"]["tpl-termin_nodes"] = _getTplMod("tpl-termin_nodes", $tplDoc);
		_vars["templates"]["tpl-termin_nodes_list"] = _getTplMod("tpl-termin_nodes_list", $tplDoc);
		
		_vars["templates"]["tpl-node"] = _getTplMod("tpl-node", $tplDoc);
		_vars["templates"]["tpl-node"] = _vars["templates"]["tpl-node"].replace(/#/g, "");
		
		_vars["templates"]["tpl-block-1"] = _getTplMod("tpl-block-1", $tplDoc);
		_vars["templates"]["tpl-info_termins_style-block"] = _getTplMod("tpl-info_termins_style-block", $tplDoc);
		_vars["templates"]["tpl-info_termins_tech-block"] = _getTplMod("tpl-info_termins_tech-block", $tplDoc);
		_vars["templates"]["tpl-info_termins_genre-block"] = _getTplMod("tpl-info_termins_genre-block", $tplDoc);
		_vars["templates"]["tpl-block-content"] = _getTplMod("tpl-block-content", $tplDoc);
	}//end _formTemplates()
	
	function _getTplMod( id, $tplDoc ){
//console.log($tplDoc);		
		var tpl = _getById(id, $tplDoc );
		var html = tpl.innerHTML;
		return html;
		
		function _getById( id, $doc ){
//console.log(id, $doc);		
			if( $doc.querySelector ){
				var obj = $doc.querySelector("#"+id);
				return obj;
			}
			
			if( $doc.getElementById ){//old browsers
				var obj = $doc.getElementById(id);
				return obj;
			}
			
			if( $doc.all ){//old IE
				var obj = $doc.all[id];
				return obj;
			}
		}//end _getById()
	}//end _getTplMod()
*/	
/*
	function _getTpl( id ){
//console.log(id);
		var tpl = getById(id);
		var html = tpl.innerHTML;
		
		//clear document
		//if ( tpl.parentNode ) {
			//tpl.parentNode.removeChild( tpl );
		//}
		//tpl.removeChild( tpl );
		
		//remove all child nodes
		// while (tpl.firstChild) {
		  // tpl.removeChild(tpl.firstChild);
		// }

//console.log( tpl, html );
//for( var key in tpl){
//console.log( key +" : "+ tpl[key] );
//}
		
		//if template contain list items
		// var list = document.getElementsByClassName("tpl-list");
// console.log( list, list.length );
		// if( list.length > 0){
			// var listHtml = list[0].outerHTML;
			// //tpl.remove(list);
			// return {
				// "html" : html,
				// "listHtml" : listHtml
			// };
		// }
		
		return html;
	}//end _getTpl()
*/	

/*
	var _insert = function( opt ){
		
		var options = {
			"templateId": false,
			"data" : false
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log("draw.insert(), ", options);

		var templateId = options["templateId"];
		if( !_vars["templates"][templateId] ){
_log("<p>draw.insert(),  error, not find template, id: <b class='text-danger'>" + templateId + "</b></p>");
			return false;
		}
		
		if( !options["data"] ){
_log("<p>draw.insert(),   error, data: <b class='text-danger'>" + options["data"] + "</b></p>");
			return false;
		}
		
		// var html = _vars["templates"][templateId];
		// //var block_title = options["data"]["block_title"];
		// //html = html.replace("{{block_title}}", block_title);
		// for( var key in options["data"]){
			
			// if( typeof options["data"][key] === "string"){
				// html = html.replace("{{"+key+"}}", options["data"][key]);
			// }
			
			// //form list items
			// if( typeof options["data"][key] === "object" &&
				// options["data"][key].length > 0 ){
					
				// // html = html
				// // .replace("{{url}}", options["data"][key][0]["url"])
				// // .replace("{{name}}", options["data"][key][0]["name"]);
				
				// var items = options["data"][key];
				// var itemTpl = _vars["templates"][templateId+"_list"];
				// var listHtml = "";

				// for( var n = 0; n < items.length; n++){
					// listHtml += itemTpl
					// .replace("{{url}}", items[n]["url"])
					// .replace("{{name}}", items[n]["name"]);
				// }//next
				
			// }
			
		// }//next
		
		// var tpl = getById(templateId);
		// tpl.innerHTML = html;
		// tpl.className = "";
		
		// //insert list
		// var list = getById( templateId+"_list" );
// //console.log(list, listHtml, list.innerHTML);
		// list.innerHTML = listHtml;
		
	};//end _insert()
*/	
	var _insertBlock = function( opt ){
		
		var options = {
			"templateID": false,
			"locationID": "block-1",
			"title" : "block",
			"content" : false,
			"callback":null
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log("draw.insertBlock(), ", options);

		var templateID = options["templateID"];
		if( !_vars["templates"][templateID] ){
_log("<p>draw.insertBlock(),  error, not find template, id: <b class='text-danger'>" + templateID + "</b></p>");
			return false;
		}
		
		// if( !options["content"] ){
// _log("<p>draw.insertBlock(),   error, content: <b class='text-danger'>" + options["content"] + "</b></p>");
			// return false;
		// }
		
		var html = _vars["templates"][templateID];
		html = html.replace("{{block_title}}", options["title"]);
		html = html.replace("{{content}}", options["content"]);
		
		var loc = getById( options["name"] );
if( loc){
	loc.innerHTML = html;
}		
		//loc.className = "";//show block
		
		if( typeof options["callback"] === "function"){
			options["callback"]();
		}
	};//end _insertBlock()


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

		if( !p["data"] ){
_log("<p>wrapContent(), error, var data: <b class='text-danger'>" + p["data"] + "</b></p>");
			return false;
		}
		if( p["data"].length === 0 ){
			return false;
		}
		if( !p["templateID"] ){
_log("<p>wrapContent(), error, var templateID <b class='text-danger'>is empty</b></p>");
			return false;
		}
		
		if( !_vars["templates"][p.templateID] ){
_log("<p>draw.wrapContent(),  error, not find template, id: <b class='text-danger'>" + p.templateID + "</b></p>");
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
				html = __formNodeHtml( p["data"], _vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListID"] ){
var msg = "<p>wrapContent(), error, var templateListID <b class='text-danger'>is empty</b></p>";
console.log(msg);							
_log(msg);
					return false;
				}
				html = __formListHtml( _vars["templates"][ p.templateID ] );
			break;
		}//end switch
		
//console.log(html);
		return html;

		function __formListHtml( _html ){
			
			var listHtml = "";
			for( var n = 0; n < p["data"].length; n++){
//console.log( n );
//console.log( p["data"][n], typeof p["data"][n], p["data"].length);
				
				//form list items
				var item = p["data"][n];
					
				//var itemTpl = _vars["templates"][ p.templateListID];
				//var itemHtml = __formNodeHtml( item, itemTpl );
				
				var itemHtml = _vars["templates"][ p.templateListID];
				for( var key2 in item){
//console.log(key2, item[key2]);

					if( key2 === "childTerms" && item["childTerms"].length > 0){
						var subOrdList = _vars["templates"][ p.templateID];
						var itemTpl = _vars["templates"][ p.templateListID];
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
		
	}//end _wrapContent

	
	// public interfaces
	return{
		vars : _vars,
		// testing : {
			// getTpl : _getTpl
		// },
		init:	function(){ 
			return _init(); 
		},
		//insert:	function( opt ){ 
			//return _insert( opt ); 
		//},
		insertBlock:	function( opt ){ 
			return _insertBlock( opt ); 
		},
		wrapContent:	function( opt ){ 
			return _wrapContent( opt ); 
		},
		//formTemplates : _formTemplates
	};
}//end _draw()
