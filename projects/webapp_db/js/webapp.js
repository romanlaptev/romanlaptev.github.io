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
console.log( navigator.userAgent );

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
//1. select vid from vocabulary where name="info" -- 5
//1. select tid from term_data where name="жанр" -- 95
//2. select tid from term_hierarchy where parent=95 -- "100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226"
//3. select name from term_data where vid=5 and tid in ("100", "101", "102", "104", "111", "113", "114", "132", "149", "176", "178", "187", "196", "226")
//4. select dst from url_alias where -- pid=???
//src="taxonomy/term/" + tid

//======================= static block
	var opt = {
		"name" : "block-1",
		"title" : "Title", 
		//"templateID" : "tpl-block",
		"content" : "<h3>static block</h3>"
	};
	buildBlock( opt );
	
//======================= dynamic block
	var _vocabularyName = "info";
	var _termName = "жанр";//"техника";//"стиль";
	
	//get block data
	webApp.db.getVocabularyByName({
		"vocName" : _vocabularyName,
		"callback" : function(res){
//console.log(res, res.length );	
			var _vid = res[0]["vid"];
			webApp.db.getTermByName({
				"vid" : _vid, 
				"termName" : _termName,
				"callback" : function(res){
//console.log(res, res.length );
					var _tid = res[0]["tid"];
//console.log( _vid, _tid );			

					webApp.db.getChildTerms({
						"vid" : _vid,
						"tid" : _tid,
						"callback" : function(res){
							_drawBlockGenre( res );
						}//end callback
					});
					
				}//end callback
			});
			
		}//end callback
	});
	
//===========================
	var opt = {
		"name" : "block-style",
		"title" : "стиль", //"техника",//"жанр",
		"templateID" : "tpl-info_termins_style-block",
		"content" : function( args ){
			// var queryStr = "\
// select name from term_data where vid=(\
	// select vid from vocabulary where name='info'\
// ) and tid in (\
	// select tid from term_hierarchy where parent=(\
		// select tid from term_data where name='жанр'\
	// )\
// )";

			var queryObj = {
				"action" : "select",
				"tableName": "vocabulary",
				"targetFields" : ["vid"],
				"where" : [
					{"key" : "name", "value" : _vocabularyName, "compare": "="}
				]
			};
			
			webApp.db.query({
				"queryObj" : queryObj,
				"callback" : function( res ){
console.log(res, res.length );	
					if( typeof args["callback"] === "function"){
						args["callback"]( res );
					}

				}//end callback()
			});
			
		}//end callback()
	};
	buildBlock( opt );
	
});//end webApp initialize

console.log(webApp);



function _db( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"data" : false,
		"format" : false,
		
		// "schema" : {
			// "root" : {
				// "tag" : "database",
				// "attributes" : ["name"],
				// "child": {
					// "tag" : "table",
					// "attributes" : ["name"],
					 // "child": {
						// "tag" : "column",
						// "attributes" : ["name"]
					// }
				// }
			// }//end root node
		// },
		
		"tables": {
			// "taxonomy_menu" :[{ 
				// "tid" : "",  
				// "title" : ""
			// }],
			
			"taxonomy_title" : {
				"fields" : ["tid", "title"],
				"records" : []
			},  
			
			"term_data" :{
				"fields" : ["tid",  "vid", "name", "description", "weight"],
				"records" : []
			},  
			
			"term_hierarchy" :{
				"fields" : [ "tid",  "parent"],
				"records" : []
			},  
			
			"term_image" :{
				"fields" : ["tid",  "path"],
				"records" : []
			},
			
			"term_node" :{
				"fields" : ["nid",  "vid", "tid"],
				"records" : []
			},  
			
			//"term_relation" :[{}],  
			//"term_synonym" :[{}],  
			"vocabulary" :{
				"fields" : [ "vid", "name", "description", "help", "relations", "hierarchy",
"multiple",
"required",
"tags",
"module",
"weight"
				],
				"records" : []
			},
			
			"url_alias" :{
				"fields" : ["pid",  "src", "dst", "language"],
				"records" : []
			},  
			
		}//end tables
	};

	var _init = function( opt ){
//console.log("init _db!");
		for(var key in opt ){
			_vars[key] = opt[key];
		}

		if( !_vars["data"] ){
console.log("error in _db(), not find 'data' !");			
		}
		if( !_vars["format"] ){
console.log("error in _db(), not find 'format' !");			
		}
		
		switch( _vars["format"] ){
			case "xml":
				_parseXML( _vars["data"] );
			break;
			
			case "json":
			break;
			
			case "csv":
			break;
		}//end switch
		

	};//end _init()

	//select tid, title from taxonomy_title	
	var _query = function( opt ){
//console.log(arguments);
		var options = {
			//"dbName": null,
			//"storeName" : "",
			"queryObj" : {//ex: select tid, title from taxonomy_title
				"action" : "", //"select",
				"order_by" : false,//"ORDER_BY"
				"tableName": "", //"taxonomy_title",
				"targetFields" : "", //["tid", "title"],
				"where" : [], /*[
					{"key" : "KOD_MAIN", "value" : "[1,5]", "compare": "IN"},
					{"logic": "AND", "key" : "NOMER", "value" : 170, "compare": "="}
				],*/
			}, 
			"callback": null
		};
		
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
		options["queryObj"]["callback"] = _postQuery;
console.log( "_query()", options );

		// if( options["dbName"].length === 0){
// var msg = "_getListStores(), error, argument 'dbName' empty.... ";
// console.log( msg );
			// return false;
		// }
		
		var result = [];
		var action = options["queryObj"]["action"];
		switch( action ){
			
			case "select":
				var tableName = options["queryObj"]["tableName"];
				var data = _vars["tables"][tableName]["records"];
				_processQuery( data, options["queryObj"] );
			break;
		}//end switch

		function _processQuery( records, queryObj ){
			var tableName = queryObj["tableName"];
			var targetFields = queryObj["targetFields"];
			var conditions = queryObj["where"];
//console.log( conditions, conditions.length, targetFields );

			var table = [];
			for( var n = 0; n < records.length; n++){
			//for( var n = 0; n < 50; n++){
				
				if( typeof records[n] === "object" ){
					var record = records[n];//json object
				}
				
				var test = true;
				if( conditions.length > 0 ){//process, search by conditions
					test = _checkConditons( record, conditions );
				}
				
				if(test){
					_pushResultRecord( record, table, targetFields);
				}
			}//next record
				
//console.log("unsort:", table[0], table.length);

			if( typeof queryObj["callback"] === "function"){
					queryObj["callback"](table);
			}

		}//end _processQuery()

		function _checkConditons( record, conditions){
//console.log( "function _checkConditons, ", conditions );

			record["checkResult"] = [];
			conditions[0]["logic"] = "";

			for( var n = 0; n < conditions.length; n++){
				var condition = conditions[n];
				
				record["checkResult"][n] = false;
				
				var key = condition["key"];
				var compare = condition["compare"];
				
				//convert string or number "value" to array ["value"]
				if( typeof condition["value"] === "string" ||
						 typeof condition["value"] === "number"){
					condition["value"] = [ condition["value"] ];
				}
				
				var list_values = condition["value"];
				if( list_values.length === 0 ){
	//console.log("Error, _checkConditons(), empty conditions['value']...");
					continue;
				}		
//console.log( condition );				

				switch( compare ) {
				
					case "=":
						for( var n2 = 0; n2 < list_values.length; n2++){
							if( record[key] === list_values[n2].toString() ){
								record["checkResult"][n] = true;							
	//console.log( key, record[key], condition["value"], n, record["checkResult"] );
							}
						}//next
					break;

					case "!=":
					case "<>":
						for( var n2 = 0; n2 < list_values.length; n2++){
							if( record[key] !== list_values[n2].toString() ){
								record["checkResult"][n] = true;							
							}
						}//next
					break;

					case "IN":
/*
					//record["checkResult"][n] = false;
					for( var n2 = 0; n2 < list_values.length; n2++){
//console.log(n2, list_values[n2]);

						//"IN"
						if( !condition["zapret"] ){

// if( (record["KOD_MAIN"] === "1" && record["NOMER"] === "170") || 
// (record["KOD_MAIN"] === "5" && record["NOMER"] === "170")
// ){
// console.log(key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record[key] === list_values[n2].toString() );
// }
							if( record[key] === list_values[n2].toString() ){
								record["checkResult"][n] = true;
//console.log( key, record[key], typeof record[key], list_values[n2], typeof list_values[n2], n, record["checkResult"] );
								break;
							} //else {
								//record["checkResult"][n] = false;
							//}
							
						} else { //"NOT IN"
						
							if( record[key] !== list_values[n2].toString() ){
//console.log(record[key], key, typeof record[key], list_values[n2], typeof list_values[n2] );
								record["checkResult"][n] = true;
								break;
							}
							
						}
						
					}//next
*/					
					break;
					
				}//end switch

			}//next condition

	// if( record["NOMER"] === "182"){
//console.log( record, record["checkResult"].length );
	// }			

			var test = false;
			if( conditions.length === 1){
				test = record["checkResult"][0];
				return test;
			}
			
			//Check several conditions (.... AND...OR...AND...)
			var operands = record["checkResult"];
			var compareResult = 0;
			for( var n = 0; n < conditions.length; n++){
				
				if( n > 0 ){//exclude first condition without logic operation
					var logicOp = conditions[n]["logic"];
					switch( logicOp ){
						
						case "AND":
							if( compareResult === 0){
								var num = n - 1;
								compareResult = operands[num] && operands[n];
							} else {
								compareResult = compareResult && operands[n];
							}
						break;
						
						case "OR":
							if( compareResult === 0){
								var num = n - 1;
								compareResult = operands[num] || operands[n];
							} else {
								compareResult = compareResult || operands[n];
							}
						break;
						
					}//end switch
				}
			}//next

//var compareResult = false;
			return compareResult;
		}//end _checkConditons()

		
		function _pushResultRecord( record, table, targetFields){
			var obj = {};
			for( var n1 = 0; n1 < targetFields.length; n1++){
				obj[ targetFields[n1] ] = record[ targetFields[n1] ];
			}
			table.push(obj);
		}//end _pushResultRecord()
		
		function _postQuery( data ){ 
//console.log("_postQuery(), ", "caller: ", _postQuery.caller, data.length);
//console.log(data);

			// //fail query
			// if(!data){
				// if( typeof options["callback"] === "function"){
					// options["callback"]( false );
				// }
				// return false;//wait!!!
			// }
			
			// //run next query
			// if( data.length === 0 && queryObj["next_query"] ){
// console.log("Run next query, ", queryObj["next_query"]);
				// queryObj["next_query"]["callback"] = queryObj["callback"];
				
				// if( queryObj["order_by"] ){
					// queryObj["next_query"]["order_by"] = queryObj["order_by"];
				// }
				// _runQuery( queryObj["next_query"] );
				// return false;//wait!!!
			// }
				
			// if( data.code === "store_not_found" ){
				// _queryAlt( 
					// options["queryObj"], 
					// options["queryObj"]["callback"] 
				// );
				// return false;//wait!!!
			// }
				
			if( typeof options["callback"] === "function"){
//console.log("Run query, end process");
//console.log(options["callback"]);
				options["callback"]( data );
				return false;//wait!!!
			} else {
				return data;
			}
			
		};//end _postQuery()
		
	};//end _query()
	
	
	function _parseXML(xml){

		var xmlDoc = _vars["data"].getElementsByTagName("database");
		var records = xmlDoc.item(0).getElementsByTagName("table");
//console.log( records, records.length ) ;
		for( var n = 0; n < records.length; n++){
			var record = records[n];
			var tableName = record["attributes"]["name"].nodeValue;
//console.log( tableName );

			var columns = record.getElementsByTagName("column");
			var recordObj = {};
			for( var n2 = 0; n2 < columns.length; n2++){
				var column = columns[n2];
				var columnName = column["attributes"]["name"].nodeValue;
				recordObj[columnName] = column.textContent;
			}//next
			
			//var recordObj = {"a":1};
			_vars["tables"][tableName]["records"].push( recordObj );
		}//next
		
	}//end _parseXML()

//async API
	function _getVocabularyByName( opt ){
		var options = {
			"vocName" : "",
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["vocName"].length === 0 ){
_log("<p>db.getVocabularyByName(),   error, vocName <b class='text-danger'>is empty</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "vocabulary",
				"targetFields" : ["vid"],
				"where" : [
					{"key" : "name", "value" : options["vocName"], "compare": "="}
				]
			},
			"callback" : function( res ){
				if( typeof options["callback"] === "function"){
					options["callback"](res);
				}
			}//end callback
		};
		webApp.db.query( queryParams);
		
	}//end _getVocabularyByName()
	
	function _getTermByName( opt ){
		var options = {
			"vid" : null,
			"termName" : "",
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( options["termName"].length === 0 ){
_log("<p>db.getTermByName(),   error, termName <b class='text-danger'>is empty</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "term_data",
				"targetFields" : ["tid"],
				"where" : [
					{"key" : "vid", "value" : options["vid"], "compare": "="},
					{"logic": "AND", "key" : "name", "value" : options["termName"], "compare": "="}
				]
			},
			"callback" : function( res ){
//console.log(res, res.length );	
				if( typeof options["callback"] === "function"){
					options["callback"](res);
				}
			}//end callback
		};
		webApp.db.query( queryParams);

	}//end _getTermByName()
	
	
	function _getChildTerms( opt ){
		var options = {
			"vid" : null,
			"tid" : null,
			"callback" : null
		};
		//extend options object for queryObj
		for(var key in opt ){
			options[key] = opt[key];
		}
//console.log(options);

		if( !options["tid"] ){
_log("<p>db.getChildTerms(),   error, options[tid]: <b class='text-danger'>"+options["tid"]+"</b></p>");
			return false;
		}

		var queryParams = {
			"queryObj" : {
				"action" : "select",
				"tableName": "term_hierarchy",
				"targetFields" : [
	"tid",
	"parent"
	],
				"where" : [
					{"key" : "parent", "value" : options["tid"], "compare": "="}
				]
			},
			"callback" : _postQuery
		};
		webApp.db.query( queryParams);

		function _postQuery( result ){
//console.log( arguments);
			var _listChildTerms = [];
			for( var n = 0; n < result.length; n++){
				_listChildTerms.push( result[n]["tid"] );
			}//next
	//console.log(_listChildTerms);
			
			webApp.db.query({
				"queryObj" : {
					"action" : "select",
					"tableName": "term_data",
					"targetFields" : [
	"tid",
	"vid",
	"name",
	"description",
	"weight"
	],
					"where" : [
						{"key" : "vid", "value" : options["vid"], "compare": "="},
						{"logic": "AND", "key" : "tid", "value" : _listChildTerms, "compare": "="},
					]
				},
				"callback" : function( res ){
//console.log("end test query!!!", res);
					if( typeof options["callback"] === "function"){
						options["callback"](res);
					}
				}//end callback
				
			});
			
		}//end _postQuery()
		
	}//end _getChildTerms()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
//console.log(arguments);
			return _init(args); 
		},
		query:	function( opt ){ 
			return _query( opt ); 
		},
		//async API
		getVocabularyByName:	function( opt ){ 
			return _getVocabularyByName( opt ); 
		},
		getTermByName:	function( opt ){ 
			return _getTermByName( opt ); 
		},
		getChildTerms:	function( opt ){ 
			return _getChildTerms( opt ); 
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
//console.log("init _draw");
		_loadTemplates();
	};

	function _loadTemplates(){
		
		var id = "tpl-block";
		var template = _getTpl(id);
		_vars["templates"][id] = template;
		
		var id = "tpl-info_termins_genre-block_list";
		var template = _getTpl(id);
		_vars["templates"][id] = template;
		
		var id = "tpl-info_termins_genre-block";
		var template = _getTpl(id);
		_vars["templates"][id] = template;
		
		var id = "tpl-info_termins_style-block";
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
		
	};//end _insert()
	
	var _insertBlock = function( opt ){
		
		var options = {
			"templateID": false,
			"title" : "block",
			"content" : false
		};
		//extend options object
		for(var key in opt ){
			options[key] = opt[key];
		}
console.log("draw.insertBlock(), ", options);

		var templateID = options["templateID"];
		if( !_vars["templates"][templateID] ){
_log("<p>draw.insertBlock(),  error, not find template, id: <b class='text-danger'>" + templateID + "</b></p>");
			return false;
		}
		
		if( !options["content"] ){
_log("<p>draw.insertBlock(),   error, data: <b class='text-danger'>" + options["content"] + "</b></p>");
			return false;
		}
		
		var html = _vars["templates"][templateID];
		html = html.replace("{{block_title}}", options["title"]);
		html = html.replace("{{content}}", options["content"]);
		
		var tpl = getDOMobj(templateID);
		tpl.innerHTML = html;
		tpl.className = "";//show block
		
	};//end _insertBlock()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		},
		insert:	function( opt ){ 
			return _insert( opt ); 
		},
		insertBlock:	function( opt ){ 
			return _insertBlock( opt ); 
		}
	};
}//end _draw()




//QUERIES

function buildBlock( opt ){
	
	var options = {
		"title": "block title",
		"content" : "test content",
		"templateID" : "tpl-block"
	};
	//extend options object for queryObj
	for(var key in opt ){
		options[key] = opt[key];
	}
console.log(options);

	//dynamic form content
	if( typeof options["content"] === "function"){
		options["content"]({
			"callback" : function( res ){
				
				//_wrapContent();
				var html = "<h1>Test!!!</h1>";
				html += "<h2>Test!!!</h2>";
				html += "<h3>Test!!!</h3>";
				html += "<h4>Test!!!</h4>";
				
				options["content"] = html;
				_draw( options );
			}
		});
	} else {
		_draw( options );
	}
	
	function _draw( options ){
		webApp.draw.insertBlock( options );
	}
}//end buildBlock()



function _drawBlockGenre( res ){

	var opt = {
		"templateId" : "tpl-info_termins_genre-block"
	};

	var  data = {
		"block_title" : "Genre",
		"items" : [
			// {
				// "name" : "миниатюра",
				// "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
			// },
			// {
				// "name" : "иллюстрация",
				// "url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/illustration"
			// }
		]
	};
	
	for( var n = 0; n < res.length; n++){
		var item = {
			"name" : res[n]["name"],
			"url" : "/sites/graphic-art-collection/cms/?q=category/info/zhanr/miniature"
		};
		data["items"].push(item);
	}//next
	
	opt["data"] = data;
	webApp.draw.insert( opt );
}//end _drawBlockGenre()




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


/*
	function _parseXML(xml){

		//if(window.ActiveXObject || "ActiveXObject" in window){
		// if( window.ActiveXObject ){
// console.log("ActiveXObject support: " + window.ActiveXObject + ", use MSXML");
		// }
		// else {
// console.log("ActiveXObject not support,  use window.DOMParser");
		// }
		

// //console.log( document.implementation );
		// if( document.implementation ){
			// var hasXmlDom = document.implementation.hasFeature("XML", "2.0");
			// var msg = "support DOM Level 2 XML - " + hasXmlDom;
// console.log(msg);
			
			// var supportsXPath = document.implementation.hasFeature("XPath", "З.0"); 	
			// msg = "support DOM Level 3 XPath - " + supportsXPath;
// console.log(msg);
		// }

			//var rootTag = xml.documentElement.tagName;
			var rootTag = _vars["schema"]["root"]["tag"];
			var msg = "main tagName: " + rootTag;
//console.log(msg);				

			var xmlDoc = xml.getElementsByTagName( rootTag );
console.log( xmlDoc, xmlDoc.item(0).tagName );		
//console.log( xmlDoc.context );		
//var test = xmlDoc.context;
//for(var key in test ){
//console.log( key +" : "+ test[key] );				
//}
		

			var attr = xmlDoc.item(0).attributes;
			var attrName = _vars["schema"]["root"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

			var childTag = _vars["schema"]["root"]["child"]["tag"];
			var tables = xmlDoc.item(0).getElementsByTagName( childTag );
console.log( tables,  tables.item(0).tagName, tables.length );		

			var attr = tables.item(0).attributes;
			var attrName = _vars["schema"]["root"]["child"]["attributes"][0];
			var key = attr.getNamedItem( attrName ).nodeValue ;
console.log( key );				

		//__parse( _vars["data"] );
		
		// if (window.DOMParser) { // all browsers, except IE before version 9
			// var msg = "window.DOMParser support: " + window.DOMParser;
// console.log(msg);
			// var parser = new DOMParser();
			
			// //var xmlsrc = _vars["data"].children[0].outerHTML;
// //console.log( xmlsrc );

			// try {
				// //var xml = parser.parseFromString( xmlsrc, "text/xml" );
// //console.log( xml );
				// __parse( _vars["data"] );
				
			// } catch (e) {
				// // if text is not well-formed, 
				// // it raises an exception in IE from version 9
// alert ("XML parsing error: " + e);
				// for( var item in e ){
// console.log(item + ": " + e[item]);
				// }
			// };

		// }
		// else {  // Internet Explorer before version 9

			// var xml_info = _createMSXML();
// console.log( "created  MSXML ActiveXObject, version: " + xml_info.version);		
			// var xml = xml_info["xml_obj"];

			// // xml.async = "false";
			// // xml.loadXML( xmlsrc );	
			// // var errorMsg = null;
			// // if (xml.parseError && xml.parseError.errorCode != 0) {
				// // errorMsg = "XML Parsing Error: " + xml.parseError.reason
						  // // + " at line " + xml.parseError.line
						  // // + " at position " + xml.parseError.linepos;
			// // }
			// // if (errorMsg) {
				// // log.innerHTML += "<p>" + errorMsg + "</p>";
			// // }
			// // parse_xml(xml);

		// }

		//xmldom = xml;

		// function _createMSXML(){
			// if (typeof (ActiveXObject) === "undefined") {
				// return false;
			// }
			// var progIDs = [
							// "Msxml2.DOMDocument.6.0", 
							// "Msxml2.DOMDocument.5.0", 
							// "Msxml2.DOMDocument.4.0", 
							// "Msxml2.DOMDocument.3.0", 
							// "MSXML2.DOMDocument", 
							// "MSXML.DOMDocument"
						  // ];
						  
			// for(var n = 0; n < progIDs.length; n++) {
				// try { 
					// var xml = {
						// "xml_obj" : new ActiveXObject( progIDs[n] ),
						// "version" : progIDs[n]
					// }
					// return xml; 
				// } 
				// catch(e)	{
// console.log("_createMSXML() error: " + e);
					// for( var item in e ){
// console.log(item + ": " + e[item]);
					// }
				// };
				
			// }//next
		// }//end _createMSXML()
		
		function __parse( xml ){

				//read schema
				//var pmaSchemas = xml.getElementsByTagName("pma:structure_schemas");
//console.log( pmaSchemas ) ;

				//var pmaDatabase = xml.getElementsByTagName("pma:database");
//console.log( pmaDatabase ) ;

				//var tableList = xml.getElementsByTagName("pma:table");
//console.log( tableList, tableList.length ) ;

				//var x = xml.childNodes;
				//var x = xml.documentElement.childNodes;
//console.log( x ) ;
//console.log( x.length ) ;

				// var test = xml.childNodes;
// //console.log( typeof test );
				// for (var n = 0; n < test.length; n++) {
					// var node = test[n];
					
					// if( node.nodeTypeString ){//IE
// console.log( node.nodeType +", "+ node.nodeTypeString);
					// } else {
// console.log( node.nodeType);
					// }
					
// //console.log(  node.nodeTypeValue );
				// }

				//var test = xml["xml"];
//console.log( "xml - " + typeof test );
				

				//read root
				//var root = xml.documentElement.children;
				// //if( xml.children ){
					// var root = xml.children;
// console.log( typeof root, root );
					// if( root ){
						// for(var key in root){
// console.log( key +" : "+ root[key] );				
						// }
						
						// //read schema
						// var schemaTag = root[0].children[0].tagName;
// var msg = "schema tagName: " + schemaTag;
// console.log(msg);				
					// }
				// //}


			// var itemTags = xml.getElementsByTagName("program");
			// parse_res.innerHTML += "<p> itemTags.length = "+ itemTags.length +"</p>";
			
			// for (var n = 0; n < itemTags.length; n++) 
			// {
				// if ('textContent' in itemTags[n])
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].textContent + "</li>";
				// }
				// else
				// {
					// parse_res.innerHTML += "<li>" + itemTags[n].text + "</li>";
				// }
				
			// }//next
			
		}//end __parse()
		
	}//end _parseXML()

*/
