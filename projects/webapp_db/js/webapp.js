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
var msg = "load " + webApp.vars["db_url"] ;
console.log("<br>" + msg);
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
		//"prop": "test"
	};

	var _init = function(args){
console.log("init _db!");
		_vars["xmlData"] = args["data"];
//console.log( "_vars:" , _vars["xmlData"].children );

		// var xml = vars["xmlData"].children;
// console.log( xml ) ;
		// for( var item in xml){
// console.log( item +" : "+ xml["item"] ) ;
		// }
		var xml = _vars["xmlData"].getElementsByTagName("database");
		var records = xml.item(0).getElementsByTagName("table");
		
console.log( records.length ) ;

	};

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
		var id = "tpl-info_termins_genre-block";
		
		var template = _getTpl(id);
		// if( typeof template === "string"){
			_vars["templates"][id] = _getTpl(id);
		// } else {
			
// console.log( template );
			// if( template["html"].length > 0 &&
				// template["listHtml"].length > 0 ){
				// _vars["templates"][id] = template["html"];
				// _vars["templates"][id+"-list"] = template["listHtml"];
			// }
			
		// }
		
		
		function _getTpl( id ){
			var tpl = getDOMobj(id);
			var html = tpl.innerHTML;
			
			//if template contain list items
			// var listHtml = document.getElementsByClassName("tpl-list");
// console.log( listHtml, listHtml.length, listHtml.innerHTML);
			// if( listHtml.length > 0){
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
			if( typeof options["data"][key] === "object" &&
				options["data"][key].length > 0 ){

			/*
				var items = options["data"][key];
				var itemsHtml = html;
				for( var n = 0; n < items.length; n++){
					html += itemsHtml
					.replace("{{url}}", items[n]["url"])
					.replace("{{name}}", items[n]["name"]);
				}//next
			*/
				html = html
				.replace("{{url}}", options["data"][key][0]["url"])
				.replace("{{name}}", options["data"][key][0]["name"]);
			}
			
		}//next
		
		var tpl = getDOMobj(templateId);
		tpl.innerHTML = html;
		
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
