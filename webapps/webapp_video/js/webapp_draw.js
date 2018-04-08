function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {};
	_vars["templates"] = {};

	var _init = function(){
//console.log("init _draw");
	};
	
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
//console.log(p);

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
			var msg = webApp.vars["messages"]["templateNotFound"].replace("{{templateID}}", p.templateID);
			_log( msg );
console.log("draw.wrapContent(),  error, not find template, id: " + p.templateID);
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
