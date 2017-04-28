var webApp = {
	
	"vars" : {
		"log" : [],
		"db_url" : "db/art.xml",
		"db_type" : "xml"
		//"db_url" :"db/art.json",
		//"db_url" : "db/art.csv"
	},
	
	"init" : function( postFunc ){
//console.log("init webapp!", arguments);

		runAjax( {
			"requestMethod" : "GET", 
			"url" : webApp.vars["db_url"], 
			"callback": function( data ){
				
//var msg = "load " + webApp.vars["db_url"] ;
//console.log("<br>" + msg);
//webApp.vars["log"].push(msg);
//console.log( "_postFunc(), " + typeof data );

				webApp.db.init({
					"data" : data,
					"format" : webApp.vars["db_type"]
				});
				
				webApp.draw.init();
				
				if( typeof postFunc === "function"){
					postFunc();
				}
				
			}//end callback()
		});
		
		//this.dBase();
	},//end init()
	
	"db" : _db(),
	"draw" : _draw()
	
};//end webApp()


//start
webApp.init(function(){

	var opt = {
		"templateId" : "tpl-info_termins_genre-block",
		"data" : {
			"block_title" : "Genre",
			"items" : [
				{
					"name" : "миниатюра",
					"url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature",
				},
				{
					"name" : "иллюстрация",
					"url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/illustration",
				}
			]
		}
	};
	webApp.draw.insert( opt );
	
});
console.log(webApp);


function _db( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"data" : false,
		"format" : false
	};

	var _init = function( opt ){
console.log("init _db!");
		for(var key in opt ){
			_vars[key] = opt[key];
		}

		if( !_vars["data"] ){
console.log("error in _db(), not find 'data' !");			
		}
		if( !_vars["format"] ){
console.log("error in _db(), not find 'format' !");			
		}
		
		//_vars["xmlData"] = args["data"];
//console.log( "_vars:" , _vars["xmlData"].children );

		// var xml = vars["xmlData"].children;
// console.log( xml ) ;
		// for( var item in xml){
// console.log( item +" : "+ xml["item"] ) ;
		// }
		
		switch( _vars["format"] ){
			case "xml":
				var xml = _vars["data"].getElementsByTagName("database");
				var records = xml.item(0).getElementsByTagName("table");
console.log( records.length ) ;

				//read schema
				//var pmaSchemas = _vars["data"].getElementsByTagName("pma:structure_schemas");
//console.log( pmaSchemas ) ;

				//var pmaDatabase = _vars["data"].getElementsByTagName("pma:database");
//console.log( pmaDatabase ) ;

				var tableList = _vars["data"].getElementsByTagName("pma:table");
console.log( tableList, tableList.length ) ;

				var x = _vars["data"].documentElement.childNodes;
console.log( x, x.length ) ;

				//read root
				var rootTag = _vars["data"].documentElement.tagName;
				var msg = "main tagName: " + rootTag;
console.log(msg);				

				var xmlDoc = _vars["data"].getElementsByTagName( rootTag );
console.log( xmlDoc );				
for(var key in xmlDoc){
console.log( key, xmlDoc[key] );				
}
//console.log( _vars["data"].children );
console.log( xmlDoc.item(0).children, xmlDoc.length );				

				//read schema
				var schemaTag = xmlDoc[0].children[0].tagName;
				var msg = "schema tagName: " + schemaTag;
console.log(msg);				

			break;
			
			case "json":
			break;
			
			case "csv":
			break;
		}//end switch
		

	};//end _init()

	var _query = function(args){
		var data = 1;
		return data;
	};
	

	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		query:	function(args){ 
			return _query(args); 
		}
	};
}//end _db()


function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"templates" : {
			//"subfolder_tpl" : ""
		}
	};

	var _init = function(){
console.log("init _draw");
		_loadTemplates();
	};

	function _loadTemplates(){
		
		var id = "tpl-info_termins_genre-block_list";
		var template = _getTpl(id);
		_vars["templates"][id] = template;
		
		var id = "tpl-info_termins_genre-block";
		var template = _getTpl(id);
		_vars["templates"][id] = template;
		
		// if( typeof template === "string"){
			// _vars["templates"][id] = template;
		// } else {
// //console.log( template );
			// if( template["html"].length > 0 &&
				// template["listHtml"].length > 0 ){
				// _vars["templates"][id] = template["html"];
				// _vars["templates"][id+"-list"] = template["listHtml"];
			// }
			
		// }
		
		
		function _getTpl( id ){
			var tpl = getDOMobj(id);
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
		
	}//end _loadTemplates()
	
	var _insert = function( opt ){
		
		var options = {
			"templateId": false,
			"data" : false
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
console.log("draw.insert(), ", options);

		var templateId = options["templateId"];
		if( !_vars["templates"][templateId] ){
_log("<p>draw.insert(),  error, not find template, id: <b class='text-danger'>" + templateId + "</b></p>");
			return false;
		}
		
		if( !options["data"] ){
_log("<p>draw.insert(),   error, data: <b class='text-danger'>" + options["data"] + "</b></p>");
			return false;
		}
		
		var html = _vars["templates"][templateId];
		//var block_title = options["data"]["block_title"];
		//html = html.replace("{{block_title}}", block_title);
		for( var key in options["data"]){
			
			if( typeof options["data"][key] === "string"){
				html = html.replace("{{"+key+"}}", options["data"][key]);
			}
			
			//form list items
			if( typeof options["data"][key] === "object" &&
				options["data"][key].length > 0 ){
					
				// html = html
				// .replace("{{url}}", options["data"][key][0]["url"])
				// .replace("{{name}}", options["data"][key][0]["name"]);
				
				var items = options["data"][key];
				var itemTpl = _vars["templates"][templateId+"_list"];
				var listHtml = "";

				for( var n = 0; n < items.length; n++){
					listHtml += itemTpl
					.replace("{{url}}", items[n]["url"])
					.replace("{{name}}", items[n]["name"]);
				}//next
				
			}
			
		}//next
		
		var tpl = getDOMobj(templateId);
		tpl.innerHTML = html;
		tpl.className = "";
		
		//insert list
		var list = getDOMobj( templateId+"_list" );
//console.log(list, listHtml, list.innerHTML);
		list.innerHTML = listHtml;
		
	};
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		},
		insert:	function( opt ){ 
			return _insert( opt ); 
		}
	};
}//end _draw()


/*
//Module MusicFM
(function(){
	var MusicFM = MusicFM || function(options){

		// private variables and functions
		var _init = function(){
console.log("init!!!");
		};
		
		var _build = function(target){
			var html = "Table " + target + " is building....";
			return html;
		};
		
		// public interfaces
		return{
			init:	function(){ 
				return _init(); 
			},
			build:	function(target){ 
				return _build(target); 
			}
		};
	};
	window.MusicFM = MusicFM;
	MusicFM().init();
})();
*/
