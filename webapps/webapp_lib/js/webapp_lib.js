/*
Usage:
	var lib = Lib();
	
	lib.get_content();
	
//------------------	
	lib_obj["templates"] = [];
	lib_obj["nodes"] = [];
	lib_obj["book_category"] = [];
	lib_obj["taxonomy"] = [];
*/
(function(){
	var Lib =  Lib || function(){

		// private variables and functions
		var lib_obj = [];
		var _vars = {};
		
		//lib_obj["breadcrumb"] = [];
		var message = "";
		lib_obj["xml"] = null;
		
		
		_vars["log"] = getById("log");
		_vars["btnToggle"] = getById("btn-toggle-log");
		_vars["loadProgressBar"] = getById("load-progress-bar");
		_vars["numTotalLoad"] = getById("num-total-load");
		_vars["parseProgressBar"] = getById("parse-progress-bar");
		_vars["waitWindow"] = getById("win1");
		_vars["breadcrumb"] = {};
		
		_vars["appContainer"] = getById("App");
		if( !_vars["appContainer"] ){
		_vars["logMsg"] = "error, not found html container (#App) for web-appllication...";
 _log("<div class='alert alert-danger'>" + _vars["logMsg"] + "</div>");
console.log( _vars["logMsg"] );
		} else {
			//init
			_vars["timeStart"] = new Date();
			init();
		}
		
		
		function init(){
			
			if ( config["use_localcache"] ) {
				get_xml_from_storage();
			} else {
				load_xml({
					filename : config["xml_file"],
					callback: after_load
				});
			}
			
		}//end init()
		
		
		function load_xml( params ) {

			var exec_start = new Date();
			
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="block";
			}
			
			$.ajax({
				type: "GET",
				url: params["filename"],
				dataType: "text",
				//dataType: "xml",
				//data: {},
				//cache: false,
				xhr: function(){//https://wcoder.github.io/notes/progress-indicator-with-jquery
					var xhr = new window.XMLHttpRequest();
/*					
					// прогресс загрузки на сервер
					xhr.upload.addEventListener("progress", function(evt){
console.log("xhr, upload progress callback function....", evt);
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							// делать что-то...
console.log(percentComplete);
						}
					}, false);
					
					// прогресс скачивания с сервера
					xhr.addEventListener("progress", function(evt){
console.log("xhr, download progress callback function....", evt);
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							// делать что-то...
console.log(percentComplete);
						}
					}, false);
*/
					xhr.addEventListener("progress", function(e){
//console.log("xhr, download progress callback function....", e);
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
						if( _vars["loadProgressBar"] ){
							_vars["loadProgressBar"].className = "progress-bar";
							_vars["loadProgressBar"].style.width = percentComplete+"%";
							_vars["loadProgressBar"].innerHTML = percentComplete+"%";
							
							_vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
						}
					}, false);
					
					return xhr;
				},
				
				beforeSend: function(XMLHttpRequest){
//console.log("ajax beforeSend, ", arguments);
/*					
					// прогресс загрузки на сервер
					//https://wcoder.github.io/notes/progress-indicator-with-jquery
					XMLHttpRequest.upload.addEventListener("progress", function(evt){
						if (evt.lengthComputable) {  
							var percentComplete = evt.loaded / evt.total;
							// делать что-то...
						}
					}, false);

					// прогресс скачивания с сервера
					XMLHttpRequest.addEventListener("progress", function(evt){
						if (evt.lengthComputable) {  
							var percentComplete = evt.loaded / evt.total;
							// делать что-то...
						}
					}, false);
*/					
				},				
				
				complete: function(xhr, state){
//console.log("ajax load complete, ", arguments);
					var exec_end = new Date();
					var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
					
					config["runtime"]["ajax_load"] = [];
					config["runtime"]["ajax_load"]["time"] = runtime_s;
					
					//_vars["logMsg"] = "ajax load " + params["filename"] + " complete";
					//_vars["logMsg"] += ", runtime: <b>" + runtime_s + "</b> sec";
					//_vars["logMsg"] += ", <b>state</b>: " + state;
//_log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );

					//if( _vars["waitWindow"] ){
						//_vars["waitWindow"].style.display="none";
					//}
					
				},
				
				success: function( data ){
//_vars["logMsg"] = "Successful download xml file " + params["filename"];
//_log("<p class='alert alert-success'>" + _vars["logMsg"] + "</p>");
//console.log( _vars["logMsg"] );
					params.callback( data );	
				},
				
				error: function( data, status, errorThrown ){
//console.log( "error", arguments );
_vars["logMsg"] = "error ajax load " + params["filename"]+ ", " + errorThrown;
 _log("<p class='alert alert-danger'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				}
			})
			.done(function () {
console.log("$.ajax, Done...");
			})
			.fail(function (xhr, textStatus) {
console.log("$.ajax, Fail...", arguments);
			});
		}//end load_xml();
		
		function after_load( data ) {
			//lib = Lib( xml );
	//console.log(lib);
			lib_obj["xml"] = data;
			
			_vars["GET"] = parseGetParams(); 
//console.log( _vars["GET"],  get_object_size( _vars["GET"] ) );

			load_templates({
				callback: callback_init //link to callback function
			});
	
		}//end after_load()
		
		function get_xml_from_storage() {
/*			
			var exec_start = new Date();
			localforage.keys(function(err, keys) {//test in array of keys
				var j_keys = keys.join();
				var pos = j_keys.indexOf( config["storage_key"] );
				if( pos >= 0){
					localforage.getItem( config["storage_key"], function(err, readValue) {
	//console.log('Read: ', config["storage_key"], readValue.length);
	//console.log(err);
						var exec_end = new Date();
						var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
					
						var cache_size = readValue.length; 
						var cache_size_kb = cache_size / 1024 ;
						var cache_size_mb = cache_size_kb / 1024;
						
						var log = "<br>get storage element " + config["storage_key"];
						log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
						log += ", runtime: <b>" + runtime_s + "</b> sec";
						log += ", error: " + err;
						info.push(log);
						config["runtime"]["get_storage"] = [];
						config["runtime"]["get_storage"]["time"] = runtime_s;
						
						//params.callback( readValue, true, log );	
						after_load( readValue);
					 });
				} else {
					var params = {
						filename : config["xml_file"],
						callback: put_to_storage
					};
					load_xml( params );
				}
			});
*/			
		}//end get_xml_from_storage()

		function put_to_storage( xml ) {
/*			
			var exec_start = new Date();
			localforage.setItem( config["storage_key"], xml, function(err, v) {
	//console.log('function put_to_storage, saved in cache ' + config["storage_key"]);
	//console.log(err);
				var exec_end = new Date();
				var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;

				var cache_size = xml.length; 
				var cache_size_kb = cache_size / 1024 ;
				var cache_size_mb = cache_size_kb / 1024;
				var log = "<br>save in cache element " + config["storage_key"];
				log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
				log += ", runtime: <b>" + runtime_s + "</b> sec";
				//var status = true;
				if( err !== null){
					log = "<br>error, no save " + config["storage_key"] + ", " + err;
					//status = false;
				}
				info.push(log);
				config["runtime"]["put_storage"] = [];
				config["runtime"]["put_storage"]["time"] = runtime_s;
				
				//params.callback( key, status, log );	
				after_load( xml );
			});
*/			
		}//end put_to_storage();
		
		
		
		
		function callback_init() {
//runtime : 6.889 sec+, 
//runtime : 3.489 sec+, 
//runtime : 2.697 sec+
//runtime : 2.872 sec+
//runtime : 2.634 sec
			get_content();
			process_get_values();
			draw_page();
			define_event();
			
			
			_vars["timeEnd"] = new Date();
			_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
			_vars["logMsg"] = "Init application, runtime: <b>" + _vars["runTime"]  + "</b> sec";
			_log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
	
//setTimeout(function(){
			if( _vars["waitWindow"] ){
				_vars["waitWindow"].style.display="none";
			}
//}, 1000*3);
			
			var runtime_all = 0;
			for( var item in config["runtime"]){
//console.log(item, config["runtime"][item]);				
				runtime_all = runtime_all + config["runtime"][item]["time"];
			}
			var message = "<br>runtime all : <b>" + runtime_all.toFixed(3)  + "</b> sec";
			info.push( message );
			
		}//end callback_init()
		
		//html templates
		function load_templates( params ) {
			lib_obj["templates"] = [];
			
var exec_start = new Date();
			var url = config["tpl_file"];
			$.ajax({
				url: url,
				type: 'GET',
				async: true,
				response:'text',//text or xml
				complete: function(xhr, status) {}, 
				success:function(data,status) {
//console.log("status - ", status, ", url - " + url);
//var content = $(result.responseText).text();
//alert(content);
					get_tmpl(data);
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br> - read templates from <b>" + config["tpl_file"]+"</b>";
message += ", runtime: <b>" + runtime_s  + "</b> sec";
info.push( message );
config["runtime"]["load_tpl"] = [];
config["runtime"]["load_tpl"]["time"] = runtime_s;
config["runtime"]["load_tpl"]["message"] = message;
					params.callback();	
				},
				error:function(data, status, errorThrown){
				var message = "<br>error ajax load templates file" + config["tpl_file"];
				//message += ", status: " + status;
				message += ", " + errorThrown;
				info.push(message);
console.log("status - ", status);
console.log("errorThrown - ", errorThrown);
				}			
			});
			
			function get_tmpl(data){
				lib_obj["templates"]["html"] = data;
				var templates = $( lib_obj["templates"]["html"] );
				
				//read templates
				//lib_obj["templates"]["block_book_category_item_tpl"] = templates.find("#block-book-category li")[0].outerHTML;
				
				//var item_tpl = $(data).find("#block-book-category-for").html();
				var item_tpl = decodeURI( templates.find("#block-book-category-for").html() );
//console.log( item_tpl);
//fix filter href="{{url}}"				
//if( item_tpl.indexOf("%7B%7B") > 0 ){
//	item_tpl = item_tpl.replace("%7B%7B", "{{")
//}
//if( item_tpl.indexOf("%7D%7D") > 0 ){
//	item_tpl = item_tpl.replace("%7D%7D", "}}")
//}
				lib_obj["templates"]["block_book_category_item_tpl"] = item_tpl;

				var tmp = templates.find("#block-book-category");
				tmp.find("li").remove();
				lib_obj["templates"]["block_book_category_tpl"] = tmp.html();
				lib_obj["templates"]["block_book_category_url_tpl"] = "?q=book_page&nid={{nid}}&mlid={{mlid}}&plid={{plid}}";
				
				lib_obj["templates"]["block_book_child_pages_item_tpl"] = decodeURI(templates.find("#block-book-child-pages-for").html() );
				templates.find("#block-book-child-pages-for").remove();
				lib_obj["templates"]["block_book_child_pages_tpl"] = templates.find("#block-book-child-pages").html();
				
				
				lib_obj["templates"]["node_tpl_url"] = decodeURI( templates.find("#view-node #book-links li")[0].outerHTML );
				lib_obj["templates"]["node_tpl_termins"] = templates.find("#view-node #termins li")[0].outerHTML;
				var tmp = templates.find("#view-node");
				tmp.find("li").remove();
				lib_obj["templates"]["node_tpl"] = tmp.html();
				
				lib_obj["templates"]["taxonomy_list_item_tpl"] = decodeURI( templates.find("#taxonomy-menu li")[0].outerHTML );
				var tmp = templates.find("#taxonomy-menu");
				tmp.find("li").remove();
				lib_obj["templates"]["taxonomy_list_tpl"] = tmp.html();
				lib_obj["templates"]["taxonomy_url_tpl"] = "?q=termin_nodes&vid={{vid}}&tid={{tid}}";
				
				lib_obj["templates"]["block_taxonomy_alpha_item_tpl"] = decodeURI(  templates.find("#block-taxonomy-alpha-for").html() );
				templates.find("#block-taxonomy-alpha-for").remove();
				lib_obj["templates"]["block_taxonomy_alpha_tpl"] = templates.find("#block-taxonomy-alpha").html();

				lib_obj["templates"]["termin_nodes_item_tpl"] = templates.find("#termin-nodes-item").html();
				var tmp = templates.find("#termin-nodes");
				tmp.find("#termin-nodes-item").remove();
				lib_obj["templates"]["termin_nodes_tpl"] = decodeURI( tmp.html() );
				lib_obj["templates"]["termin_nodes_url_tpl"] = "?q=node&nid=#nid";

				
				var tmpl = $(data).find("#cloud-for");
				lib_obj["templates"]["cloud_for_tpl"] = decodeURI( tmpl.html() );
				
				//var tmpl = $(data).find("#external-links");
				//lib_obj["templates"]["external_links_tpl"] = tmpl.html();
				
				lib_obj["templates"]["breadcrumb_item_tpl"] = decodeURI( templates.find("#breadcrumb-tpl").html() );
				
			}//end get_tmpl()	

		}//end load_templates( params )

		var get_content = function( params ){
			
			var _total = 3;
			var _numDone = 0;
			var _percentComplete = 0;
			
			//get nodes
			var exec_start = new Date();
//runtime: 0.668 sec
				read_nodes_data();
				
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- read_nodes_data, runtime: <b>" + runtime_s  + "</b> sec";
			info.push( message );
			config["runtime"]["read_nodes_data"] = [];
			config["runtime"]["read_nodes_data"]["time"] = runtime_s;
			

			var exec_start = new Date();
//runtime: 4.837 sec+, 
//runtime: 1.394 sec+, 
//runtime: 0.783 sec
				lib_obj["nodes"] = nodes_obj.get_xml_nodes();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- nodes_obj.get_xml_nodes(), runtime: <b>" + runtime_s  + "</b> sec";
			info.push( message );
			config["runtime"]["get_xml_nodes"] = [];
			config["runtime"]["get_xml_nodes"]["time"] = runtime_s;

//------------------
			_numDone = 1;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed: " + _numDone + " of total: " + _total, _percentComplete+"%" );
						if( _vars["parseProgressBar"] ){
							_vars["parseProgressBar"].className = "progress-bar";
							_vars["parseProgressBar"].style.width = _percentComplete+"%";
							_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
						}
//------------------

			//get taxonomy termins
			var exec_start = new Date();
//runtime: 0.684 sec
				read_taxonomy_data();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- read_taxonomy_data, runtime: <b>" + runtime_s  + "</b> sec";
			info.push( message );
			config["runtime"]["read_taxonomy_data"] = [];
			config["runtime"]["read_taxonomy_data"]["time"] = runtime_s;
			
			var exec_start = new Date();
//runtime: 1.989 sec+, 
//0.042 sec			
				lib_obj["taxonomy"] = taxonomy_obj.get_xml_taxonomy();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- get taxonomy, runtime: <b>" + runtime_s  + "</b> sec";
			info.push( message );
			config["runtime"]["get_xml_taxonomy"] = [];
			config["runtime"]["get_xml_taxonomy"]["time"] = runtime_s;

//------------------
			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed: " + _numDone + " of total: " + _total, _percentComplete+"%" );
						if( _vars["parseProgressBar"] ){
							_vars["parseProgressBar"].className = "progress-bar";
							_vars["parseProgressBar"].style.width = _percentComplete+"%";
							_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
						}
//------------------


			//get book category
			var exec_start = new Date();
//runtime : 0.244 sec			
 //runtime : 0.032 sec			
				lib_obj["book_category"] = get_book_category();
				
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- get_book_category, runtime: <b>" + runtime_s  + "</b> sec";
			info.push( message );
			config["runtime"]["get_book_category"] = [];
			config["runtime"]["get_book_category"]["time"] = runtime_s;
			
			//message = "";
			//message += "<br>Size lib_obj['xml_nodes']: " + lib_obj["xml_nodes"].length  + " bytes";
			//message += "<br>Size lib_obj['book_category']: " + lib_obj["book_category"].length  + " bytes";
			//message += "<br>Size lib_obj['nodes']: " + nodes.nodes_size  + " bytes";
			//message += "<br>Size lib_obj['taxonomy']: " + lib_obj["taxonomy"].length  + " bytes";
			//info.push( message );
			
//------------------
			_numDone++;
			_percentComplete = Math.ceil(_numDone / _total * 100);
console.log( "Completed: " + _numDone + " of total: " + _total, _percentComplete+"%" );
						if( _vars["parseProgressBar"] ){
							_vars["parseProgressBar"].className = "progress-bar";
							_vars["parseProgressBar"].style.width = _percentComplete+"%";
							_vars["parseProgressBar"].innerHTML = _percentComplete+"%";
						}
//------------------
			
		};//end lib.get_content()


		function process_get_values() {
//console.log( "$_GET: ", _vars["GET"],  get_object_size( _vars["GET"] ) );
			if( get_object_size( _vars["GET"] ) === 0) {
				var message = "<br>No $_GET value";
				info.push( message );
				return;
			}
			
			switch( _vars["GET"]["q"] ) {
				case "node":
/*				
var exec_start = new Date();
						var params = {
							"nid" : _vars["GET"]["nid"]
						};
						_vars["node"] = nodes_obj.get_node( params);
						
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>- nodes_obj.get_node(), runtime: <b>" + runtime_s  + "</b> sec";
info.push( message );
config["runtime"]["get_node"] = [];
config["runtime"]["get_node"]["time"] = runtime_s;
*/
					break;
					
				case "termin_nodes":
/*				
var exec_start = new Date();
						_vars["termin_nodes"] = [];
						var params = {
							//"vid" : _vars["GET"]["vid"],
							"tid" : _vars["GET"]["tid"]
						};
						_vars["termin_nodes"] = nodes_obj.get_termin_nodes( params);
						
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>- nodes_obj.get_termin_nodes(), runtime: <b>" + runtime_s  + "</b> sec";
info.push( message );
config["runtime"]["get_termin_nodes"] = [];
config["runtime"]["get_termin_nodes"]["time"] = runtime_s;
*/
					break;

				case "book_page":
/*				
var exec_start = new Date();
						var params = {
							"nid" : _vars["GET"]["nid"]
						};
						_vars["node"] = nodes_obj.get_node( params);
						
						_vars["book_child_pages"] = [];
						var params = {
							"plid" : _vars["GET"]["mlid"],
							"recourse" : 0
						};
						_vars["book_child_pages"] = book.get_child_pages( params );
//var params = [];
//params["plid"] = "386";
//params["recourse"] = 0;
//lib_obj["test"] = book.get_child_pages( params );//title="художественая литература" nid="3" mlid="386" plid="384" type="book"

						
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>- book.get_child_pages( params), runtime: <b>" + runtime_s  + "</b> sec";
info.push( message );
config["runtime"]["get_child_pages"] = [];
config["runtime"]["get_child_pages"]["time"] = runtime_s;
*/
					break;
				
				default:
					break;
			}//end switch
			
			view_log( info );			
			
		}//end process_get_values()



		
		var nodes_obj = {
			//"nodes_size" : 0,
			"get_node" : function( params ){
				return get_node( params );
			},
			"get_xml_nodes" : function( params ){
				return get_xml_nodes( params );
			},
			"get_termin_nodes" : function( params ){
				return _get_termin_nodes( params );
			}, 
			"view_node" : function( params ){
				var html =  view_node( params );
				return html;
			},
			"view_termin_nodes" : function( params ){
				var html = view_termin_nodes( params );
				return html;
			}
		};

 		//read xml data
//runtime: 0.668 sec		
		function read_nodes_data() {
			var xml = lib_obj["xml"];
			var table_name_index = "table_taxonomy_index";
			nodes_obj["x_table_index"] = $(xml).find( table_name_index ).find('item');//runtime: 0.244 sec
			
			var table_name = "table_node";
			nodes_obj["x_nodes"] = $(xml).find( table_name ).find('node');//runtime: 0.253 sec
			
		}//end read_nodes_data()

/*		
//runtime: 4.6 sec
//runtime: 0.871 sec
		function get_xml_nodes_old( params )
		{
			var nodes = [];
			
			var table_name_index = "table_taxonomy_index";
			var table_index = $(xml).find( table_name_index ).find('item');
			
			var table_name = "table_node";
			$(xml).find( table_name ).find('node').each(function()
			{
				var node = {};
				
				//read node attributes
				var item_attr = get_attr_to_obj( $(this)[0].attributes );
				for(var attr in item_attr)
				{
					node[attr] = item_attr[attr];
				}//next attr
				
				node["subfolder"] = $(this).children("subfolder").text();
				node["author"] = $(this).children("author").text();
				node["bookname"] = $(this).children("bookname").text();
				node["body_value"] = $(this).children("body_value").text();

				//read node termins
				$(table_index).each(function()
				{
					if( $(this).attr("nid") === node["nid"] )
					{
						if( typeof node["tid"] === "undefined")
						{
							node["tid"] = [];
						}
						node["tid"].push( $(this).attr("tid") );
					}
				});//end each

				nodes.push( node );
			});//end each
			return nodes;
		}//end get_xml_nodes_old()
*/

 //runtime: 1.396 sec
 //runtime: 0.783 sec
		function get_xml_nodes( params ) {
			var nodes = [];

			for( var n = 0; n < nodes_obj["x_nodes"].length; n++)	{
//console.log( n, x_nodes[n] );
				var node = {};
				
				//read node attributes
				var item_attr = get_attr_to_obj(  nodes_obj["x_nodes"][n].attributes );
				for(var attr in item_attr)
				{
					node[attr] = item_attr[attr];
				}//next attr
			
				var x_node = $( nodes_obj["x_nodes"][n] );
				node["subfolder"] = x_node.children("subfolder").text().trim();
				node["author"] = x_node.children("author").text();
				node["bookname"] = x_node.children("bookname").text();
				node["body_value"] = x_node.children("body_value").text();

				//read node termins
				for( var n2 = 0; n2 < nodes_obj["x_table_index"].length; n2++){
					var test_nid = nodes_obj["x_table_index"][n2].getAttribute("nid");
					if( test_nid === node["nid"] )
					{
						if( typeof node["tid"] === "undefined") {
							node["tid"] = [];
						}
						node["tid"].push( nodes_obj["x_table_index"][n2].getAttribute("tid") );
					}
				}//next termin
				
				nodes.push( node );
			}//next node
			
			return nodes;
		}//end get_xml_nodes()


		function _get_termin_nodes( params )
		{
			if( typeof lib_obj["nodes"] === "undefined")
			{
				var message = "<br>error, not found lib_obj[nodes], function get_termin_nodes()";
console.log(message);
				info.push( message );
				return;
			}
		
			var termin_nodes = [];
			for( var node in lib_obj["nodes"] )
			{
if( typeof lib_obj["nodes"][node]["tid"] === "undefined")
{
	continue;
}
				for( var n = 0; n < lib_obj["nodes"][node]["tid"].length; n++)
				{
					if( params["tid"] === lib_obj["nodes"][node]["tid"][n] )
					{
	//console.log( node,  lib_obj["nodes"][node]  );
						termin_nodes.push( lib_obj["nodes"][node] );
					}
				}//next node tid
			}//next node
			
			return termin_nodes;
		}//end _get_termin_nodes()
		
		function view_termin_nodes( params ) {
			if( typeof _vars["termin_nodes"] === "undefined")
			{
				var message = "<br>error, not found lib_obj[termin_nodes]";
console.log(message);
				info.push( message );
				return;
			}
			
			var termin_nodes_tpl = lib_obj["templates"]["termin_nodes_tpl"];
			var termin_node_tpl = lib_obj["templates"]["termin_nodes_item_tpl"];
			var url_tpl = lib_obj["templates"]["termin_nodes_url_tpl"];
			var html = "";
			for( var n = 0; n < _vars["termin_nodes"].length; n++)
			{
				var node = _vars["termin_nodes"][n];
				var url = url_tpl.replace("#nid", node["nid"]);
				html += termin_node_tpl
				.replace("#url", url)
				.replace("#bookname", node["bookname"])
				.replace("#author", node["author"]);
				//html += node["title"] + "<br>";
			}
			html = termin_nodes_tpl.replace("#termin_nodes", html);
			return html;
		}//end view_termin_nodes()

		function get_node( params ){
			//for( var node in lib_obj["nodes"] )
			for( var n = 0; n < lib_obj["nodes"].length; n++)
			{
				if( params["nid"] === lib_obj["nodes"][n]["nid"] )
				{
					var node = lib_obj["nodes"][n];
					//get book url
					var params = {"nid" :node["nid"] };
					node["book_files"] = get_book_files( params );
					node["book_url"] = get_book_url( params );
					node["book_links"] = get_book_links( params );
					node["termins"] = get_node_termins( params );
				}
			}//next node
			
//console.log( node  );
			return node;
		}//end get_node()

		function get_book_files( params )
		{
			var xml = lib_obj["xml"];
			var files = [];
			var table_name = "table_book_filename";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id )
				{
					var v = $(this).children("value").text().trim();
					files.push( v );
				}
			});//next url
			return files;
		}//end get_book_files()

		function get_book_url( params )
		{
			var xml = lib_obj["xml"];
			var url = [];
			var table_name = "table_book_url";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id )
				{
					var v = $(this).children("value").text();
					url.push( v );
				}
			});//next url
			return url;
		}//end get_book_url()

		function get_book_links( params )
		{
			var xml = lib_obj["xml"];
			var links = [];
			var table_name = "table_book_links";
			$(xml).find( table_name ).find('item').each(function(){
				var entity_id = $(this).attr("entity_id");
				
				if( params["nid"] === entity_id )
				{
					var v = $(this).children("value").text();
					links.push( v );
				}
			});//next
			return links;
		}//end get_book_links()

		function get_node_termins(params){
//console.log(params, nodes_obj);	
			//read node termins
			var node_termins = [];
			for( var n1 = 0; n1 < nodes_obj["x_table_index"].length; n1++){
				var test_nid = nodes_obj["x_table_index"][n1].getAttribute("nid");
				if( test_nid === params["nid"] ){
					//if( typeof node_termins["tid"] === "undefined"){
						//node_termins["tid"] = [];
					//}
					node_termins.push( {"tid" : nodes_obj["x_table_index"][n1].getAttribute("tid") } );
				}
			}//next termin			

			for( var voc in lib_obj["taxonomy"]){
//console.log(  lib_obj["taxonomy"][voc]);	
				var test_termins = lib_obj["taxonomy"][voc]["termins"];
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

		function view_node( params ) {
			if( typeof _vars["node"] === "undefined") {
				var message = "<br>error, not found lib_obj[node]";
console.log(message);
				info.push( message );
				return;
			}
			
//----------------------
var bodyValue = "";
//console.log(_vars["node"]["body_value"].length );
//console.log("TEST!!!", _vars["node"]["body_value"] && _vars["node"]["body_value"].length > 0);
if( _vars["node"]["body_value"] && _vars["node"]["body_value"].length > 0){
	bodyValue = _vars["node"]["body_value"]
	.replace(/&quot;/g,"\"")
	.replace(/&lt;/g,"<")
	.replace(/&gt;/g,">");
//console.log(bodyValue );
}
//----------------------
			
			var node_tpl = lib_obj["templates"]["node_tpl"];
			var html = node_tpl
			.replace("{{author}}", _vars["node"]["author"] )
			//.replace("{{node-title}}", _vars["node"]["title"] )
			.replace("{{type}}", _vars["node"]["type"] )
			.replace("{{bookname}}", _vars["node"]["bookname"] )
			.replace("{{changed}}", _vars["node"]["changed"] )
			.replace("{{created}}", _vars["node"]["created"] )
			.replace("{{body_value}}", bodyValue );


			if( _vars["node"]["bookname"].length === 0){
				html = html.replace("{{node-title}}", _vars["node"]["title"] );
			} else {
				html = html.replace("{{node-title}}", "" );
			}
			
			var node_tpl_url = lib_obj["templates"]["node_tpl_url"];
			//form node book local url
			if( _vars["node"]["book_files"].length > 0) {
				var html_book_url = "";
				var subfolder =  _vars["node"]["subfolder"];
				for( var n = 0; n < _vars["node"]["book_files"].length; n++ )
				{
					var filename =  _vars["node"]["book_files"][n];
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

				html = html.replace("{{book-list}}", html_book_url);
			} else {
			}
			
			
			//add dropbox disk links
			//add_dropbox_links();
			//var html_dropbox_links = add_dropbox_links();
			//html = html.replace("{{dropbox-list}}", html_dropbox_links);

			var html_cloud_links = add_cloud_links( config["url_book_location_Mail"] );
			html_cloud_links += add_cloud_links( config["url_book_location_Yandex"] );
			html = html.replace("{{cloud-links}}", html_cloud_links);

			//form node book external links
			var html_book_links = "";
			for( var n = 0; n < _vars["node"]["book_links"].length; n++ )
			{
				var link =  _vars["node"]["book_links"][n];
				var link_title = link.substring( link.lastIndexOf('#')+1, link.length );
				if( link.lastIndexOf('#') > 0 ) {
					var s_link = link.substring( 0, link.lastIndexOf('#') );
				} else {
					var s_link = link;
				}

				html_book_links += node_tpl_url
						.replace("{{link-title}}", link_title)
						.replace("{{url}}", s_link);
			}//next book link
			html = html.replace("{{external-links}}", html_book_links);
			
			//form node old book url
			var html_book_url2 = "";
			for( var n = 0; n < _vars["node"]["book_url"].length; n++ ){
				var link =  _vars["node"]["book_url"][n];

				html_book_url2 += node_tpl_url
						.replace("{{link-title}}", link)
						.replace("{{url}}", link);
			}//next book url
			html = html.replace("{{book-old-url}}", html_book_url2);
			
			//form node taxonomy menu
			var html_termin_links = "";
			var node_tpl_url = lib_obj["templates"]["node_tpl_termins"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];

			for( var n = 0; n < _vars["node"]["termins"].length; n++ ) {
				var link = url_tpl
					.replace("{{vid}}", "")
					.replace("{{tid}}", _vars["node"]["termins"][n]["tid"] );
				
				var link_title = _vars["node"]["termins"][n]["name"];

				html_termin_links += node_tpl_url
						.replace("{{link-title}}", link_title)
						.replace("{{url}}", link);
			}//next termin

			html = html.replace("{{termin-links}}", html_termin_links);
			
			return html;
		}//end view_node()




		var taxonomy_obj = {
			"get_xml_taxonomy" : function(){
				return get_xml_taxonomy();
			},
			"view_vocabulary" : function( vocabulary_name, recourse ){
				var html = view_vocabulary( vocabulary_name, recourse );
				return html;
			},
			"view_termin" : function( params ) {
				var html = view_termin( params );
				return html;
			}
		};

		//read xml data
		function read_taxonomy_data()
		{
			var xml = lib_obj["xml"];
			taxonomy_obj["x_voc"] = $(xml).find( "table_taxonomy_vocabulary" ).find('item');
			taxonomy_obj["x_term_hierarchy"] = $(xml).find( "table_taxonomy_term_hierarchy" ).find("termin");
			taxonomy_obj["x_term_data"] = $(xml).find( "table_taxonomy_term_data" ).find('termin');
		}//end read_taxonomy_data()

//runtime: 1.62 sec
//runtime: 1.061 sec
//runtime: 0.065 sec ????
		function get_xml_taxonomy()
		{
			var taxonomy = [];
			$( taxonomy_obj.x_voc ).each(function()
			{
				var item = $(this);
				var name = item.children('m_name').text();
				var vocabulary = {
					//"name" : item.children('name').text(),
					"vid" : item.attr('vid'),
					"termins" : get_termins( item.attr('vid') )
				};
				taxonomy[name] = vocabulary;
			});//end each
			
//runtime: 0.655 sec
/*			
 			var x_voc = $(xml).find( table_name ).find('item');
			for( var n = 0; n < x_voc.length; n++)
			{
//console.log( n, x_nodes[n] );
				var voc = $( x_voc[n] );
				var name = voc.children('m_name').text();
				var vocabulary = {
					"vid" : voc.attr('vid')//,
					//"termins" : get_termins( voc.attr('vid') ),
				};
				taxonomy[name] = vocabulary;
			}//next voc
*/			
			return taxonomy;
			
			function get_termins( vid )
			{
				var termins = [];
				$( taxonomy_obj.x_term_data ).each(function()
				{
					var item = $(this);
					if ( item.attr('vid') === vid ){
						var term_obj = {
							"name" : item.children('name').text(),
							"description" : item.children('description').text(),
							"vid" : item.attr('vid'),
							"tid" : item.attr('tid')//,
							//"parent_value" : get_termin_info( item.attr('tid'), term_hierarchy )
						};
						termins.push( term_obj );
					}
				});//end each

				//get termins hierarchy
				var parent_value = false;
				$( taxonomy_obj.x_term_hierarchy ).each(function()
				{
					var item = $(this);
					var tid = item.attr('tid');
					for( var n = 0; n < termins.length; n++)
					{
						if( tid === termins[n]["tid"])
						{
							termins[n]["parent_value"] = item.attr('parent');
							//break;
						}
					}//next termin
				});//end each

				return termins;
			}//end get_termins()
/*
			function get_termin_info( tid, table )
			{
				var parent_value = false;
				$( table ).each(function()//8412 вхождений.!!!!!!!!!!!!!!!!!
				{
					var item = $(this);
					if ( item.attr('tid') === tid )
					{
						parent_value = item.attr('parent');
						return false;
					}
				});//end each
//console.log(tid, parent_value);
				return parent_value;
			}//end get_termin_info()
*/
		}//end get_xml_taxonomy()
		
		function view_vocabulary ( vocabulary_name, recourse ) {
			if( typeof lib_obj["taxonomy"][vocabulary_name] === "undefined")
			{
console.log("error, vocabulary not found " + vocabulary_name);			
				return;
			}
			
			var item_tpl = lib_obj["templates"]["taxonomy_list_item_tpl"];
			var list_tpl = lib_obj["templates"]["taxonomy_list_tpl"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];
			var block_title = "<h4>book tags:</h4>";
			var html = "";
			for( var n = 0; n < lib_obj["taxonomy"][vocabulary_name]["termins"].length; n++ )
			{
				var termin = lib_obj["taxonomy"][vocabulary_name]["termins"][n];
				if( termin["parent_value"] === "0"){
					var url = url_tpl
					.replace("{{vid}}", termin["vid"])
					.replace("{{tid}}", termin["tid"]);
					
					html += item_tpl
					.replace("{{link-title}}", termin["name"])
					.replace("{{url}}", url);
					
					if( recourse ) {
						var params = [];
						params["termins"] = lib_obj["taxonomy"][vocabulary_name]["termins"]; 
						params["vid"] = termin["vid"];
						params["tid"] = termin["tid"]; 
						params["recourse"] = recourse;
						var html_children_termins = list_children_termins( params );
						if( html_children_termins.length > 0) {
							html += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			html = list_tpl
			.replace("{{block-title}}", block_title)
			.replace("{{list}}", html);
			return html;
			
		}//end view_vocabulary()

		function list_children_termins( params ) {
//console.log(arguments);
			var termins = params["termins"]; 
			var vid = params["vid"];
			var tid = params["tid"]; 
			var recourse = params["recourse"];
			var item_tpl = params["item_tpl"];
			var list_tpl = params["list_tpl"];
			var url_tpl = params["url_tpl"];
			
			var html = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["parent_value"] === tid )
				{
					var url = url_tpl
					.replace("{{vid}}", termin["vid"])
					.replace("{{tid}}", termin["tid"]);
					
					html += item_tpl
					.replace("{{link-title}}", termin["name"])
					.replace("{{url}}", url);
					
					if( recourse ) {
						params["termins"] = termins; 
						params["vid"] = termin["vid"];
						params["tid"] = termin["tid"]; 
						params["recourse"] = recourse;
						params["item_tpl"] = item_tpl;
						params["list_tpl"] = list_tpl;
						params["url_tpl"] = url_tpl;
						var html_children_termins = list_children_termins( params);
						if( html_children_termins.length > 0) {
							html += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			return html;
		}//end list_children_termins();
		
		function view_termin( params )	{
			var termins = params["termins"]; 
			var vid = params["vid"];
			var tid = params["tid"];
			var recourse = params["recourse"];
			var show_only_children = params["show_only_children"];
			
			var item_tpl = params["item_tpl"];
			var list_tpl = params["list_tpl"];
			var url_tpl = params["url_tpl"];
			
			var html = "", html_list = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["tid"] === tid)
				{
					if( !show_only_children )
					{
						var url = url_tpl
						.replace("{{vid}}", termin["vid"])
						.replace("{{tid}}", termin["tid"]);
						
						html_list += item_tpl
						.replace("{{link-title}}", termin["name"])
						.replace("{{url}}", url);
					}
					
					if( recourse )	{
						var params = [];
						params["termins"] = termins; 
						params["vid"] = termin["vid"];
						params["tid"] = termin["tid"]; 
						params["recourse"] = recourse;
						params["list_tpl"] = list_tpl;
						params["item_tpl"] = item_tpl;
						params["url_tpl"] = url_tpl;
						var html_children_termins = list_children_termins( params );
						
						if( html_children_termins.length > 0){
							html_list += list_tpl
							.replace("{{block-title}}", "")
							.replace("{{list}}", html_children_termins);
						}
					}
				}
			}//next
			
			
			html += list_tpl
			.replace("{{block-title}}", "")
			.replace("{{list}}", html_list);
			return html;

		}//end function view_termin()
		


		var book = {
			"get_book_category" : function(){
				get_book_category();
			},
			"get_child_pages" : function( params ) {
				var plid = params["plid"];
				var recourse = params["recourse"];
				var nodes = get_child_pages( plid, recourse );
				return nodes;
			},
			"view_book_category" : function(){
				var html = view_book_category();
				return html;
			},
			"view_child_pages" : function( params ) {
				var html = view_child_pages( params );
				return html;
			}
		};
		
		
		function get_book_category()
		{
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++) {
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') == "0") {
					var nodes = get_child_pages( $(node).attr('mlid'), 0);
				}
			};//next node
			return nodes;
			
		}//end get_book_category()

		function get_child_pages( plid, recourse ){
			var nodes = [];
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++) {
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') === plid )
				{
					nodes.push( node );
					if( $(node).attr('mlid').length > 0 )
					{
						if ( recourse === 1){
							//var children_nodes = list_children_pages( $(node).attr('mlid'), 1 );
var children_nodes = list_child_pages( $(node).attr('mlid'), 1 );
							nodes.push( children_nodes );
						}
					}
				}
			};//next node
			
			return nodes;
		}//end get_child_pages()

		function view_book_category() {
			if( typeof lib_obj["book_category"] === "undefined"){
console.log("error, not found lib_obj[book_category], function parse_book_category( container )");
				return;
			}
			
			var html = "";
			for( var n = 0; n < lib_obj["book_category"].length; n++) {
				var node = lib_obj["book_category"][n];
				
				var url_tpl = lib_obj["templates"]["block_book_category_url_tpl"];
				var url = url_tpl
				.replace("{{nid}}", $(node).attr('nid') )
				.replace("{{mlid}}", $(node).attr('mlid') )
				.replace("{{plid}}", $(node).attr('plid') );
				html += lib_obj["templates"]["block_book_category_item_tpl"]
.replace(/{{page-title}}/g, $(node).attr('title') )
.replace("{{url}}", url )
//.replace("%7B%7Burl%7D%7D", url )
.replace(/{{type}}/g,  $(node).attr('type') );
//console.log("url = " + url, html);				
			}//next

			html = lib_obj["templates"]["block_book_category_tpl"].replace(/{{list}}/g, html );
			return html;
		}//end view_book_category()
		
		function view_child_pages( params ) {
//console.log("function view_child_pages", params);
			if( typeof _vars["book_child_pages"] === "undefined") {
				var message = "<br>error, not found _vars[book_child_pages]";
console.log(message);
				info.push( message );
				return;
			}
			
			if( _vars["book_child_pages"].length === 0) {
console.log("lib_obj['book_child_pages'] is empty!!!", _vars["book_child_pages"].length);
				return;
			}
			
			//list child pages
			var list_tpl = lib_obj["templates"]["block_book_child_pages_tpl"];
			var item_tpl = lib_obj["templates"]["block_book_child_pages_item_tpl"];
			
			var html = "", html_list = "";
			
			for( var n = 0; n < _vars["book_child_pages"].length; n++ ) {
				
				var type = $(_vars["book_child_pages"][n]).attr("type");
				var nid = $(_vars["book_child_pages"][n]).attr("nid");
				var mlid = $(_vars["book_child_pages"][n]).attr("mlid");
				var plid = $(_vars["book_child_pages"][n]).attr("plid");
				var title = $(_vars["book_child_pages"][n]).attr("title");
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
		};//end view_child_pages( params )

		
		function draw_page( params )	{
			
			var html_breadcrumb="";
			
			//content gradient	correct height
			//var h = $(".b-content").height();
			//var h = $("#region-content").height();
//console.log("b-content.height = " + h);			
			//$(".b-content .grad").height(h);
			
			//clear content area
			$("#region-content #block-taxonomy").empty( html );
			$("#region-content #block-nodes").empty( html );
			
			if( typeof lib_obj["book_category"] !== "undefined" ) {
				if( lib_obj["book_category"].length > 0 ) {
					var html = book.view_book_category();
					$("#block-book-category").html( html );
					
					//mark root links for breadcrumb navigation
					$("#block-book-category .nav-click").addClass("root-link");			
			
				}
			} else {
console.log("error, not found lib_obj[book_category]");
			}
			
			
			var html = view_vocabulary( "library", recourse = false );
//			var params = [];
//			params["termins"] = lib_obj["taxonomy"]["library"]["termins"]; 
//			params["vid"] = "2";
//			params["tid"] = "37";//38, 46
//			params["recourse"] = true;
//			params["show_only_children"] = false;
//			var html = taxonomy_obj.view_termin( params );
			$("#block-tags").html( html );
			//mark root links for breadcrumb navigation
			$("#block-tags .nav-click").addClass("root-link");			


			//view alphabetical
			var params = [];
			params["termins"] = lib_obj["taxonomy"]["alphabetical_voc"]["termins"]; 
			params["vid"] = "4";
			params["tid"] = "116";
			params["recourse"] = true;
			params["show_only_children"] = true;
			params["item_tpl"] = lib_obj["templates"]["block_taxonomy_alpha_item_tpl"];
			params["list_tpl"] = lib_obj["templates"]["block_taxonomy_alpha_tpl"];
			params["url_tpl"] = lib_obj["templates"]["taxonomy_url_tpl"];
			var html = taxonomy_obj.view_termin( params );
	
			params["tid"] = "115";
			html += taxonomy_obj.view_termin( params );
			
			$("#block-taxonomy-alpha").html( html );
			
			//mark root links for breadcrumb navigation
			$("#block-taxonomy-alpha .nav-click").addClass("root-link");			
			

			//view termin nodes
			if ( _vars["GET"]["q"] === "termin_nodes" ) {
				
				if( _vars["GET"]["vid"] === "2"){
					//view children termin
					var params = [];
					params["termins"] = lib_obj["taxonomy"]["library"]["termins"]; 
					params["vid"] = _vars["GET"]["vid"];
					params["tid"] = _vars["GET"]["tid"];
					params["recourse"] = true;
					params["show_only_children"] = false;
					
					params["item_tpl"] = lib_obj["templates"]["taxonomy_list_item_tpl"];
					params["list_tpl"] = lib_obj["templates"]["taxonomy_list_tpl"];
					
					params["url_tpl"] = lib_obj["templates"]["taxonomy_url_tpl"];
					var html = taxonomy_obj.view_termin( params );
					$("#region-content #block-taxonomy").html( html );
				}
				
				if ( _vars["termin_nodes"].length > 0)
				{
					var html = nodes_obj.view_termin_nodes( );
					$("#region-content #block-nodes").html( html );
				}
			}
			
			//view book nodes
			if ( _vars["GET"]["q"] === "book_page" ) {
				render_node();
				if( _vars["book_child_pages"].length > 0) {
					var params = {
						"nid" :  _vars["GET"]["nid"],
						"mlid" :  _vars["GET"]["mlid"]
					};
					var html = book.view_child_pages( params );
//console.log("html = " + html);
					$("#region-content #block-nodes").append( html );
				} else {
//console.log("lib_obj['book_child_pages'] is empty!!!!!!!!!!!!!!", _vars["book_child_pages"].length);
				}
				
			}
			
			//view nodes
			if ( _vars["GET"]["q"] === "node" ){
				render_node();
			}
			
			//render breadcrumb
			for( var n = 0; n < lib_obj["breadcrumb"].length; n++){
				var url = lib_obj["breadcrumb"][n]["url"];
				var name = lib_obj["breadcrumb"][n]["name"];
				
				if( n == ( lib_obj["breadcrumb"].length - 1) ){
					html_breadcrumb += name ;
				} else {
					html_breadcrumb += lib_obj["templates"]["breadcrumb_item_tpl"]
					.replace("{{item-url}}", url )
					.replace("{{num}}", n )
					.replace("{{item-title}}", name );
				}
			}

			$("#breadcrumb-tpl").html( html_breadcrumb );
			
			function render_node(){
				var params = {"nid" :  _vars["GET"]["nid"]};
				var html = nodes_obj.view_node( params );
				$("#region-content #block-nodes").html( html );
				
				
				if( _vars["node"]["book_files"].length === 0 ){
					$("#cloud-links").hide();
					$("#book-links").hide();
				}
				
				if( _vars["node"]["book_links"].length > 0 ){
console.log(_vars["node"]["book_links"].length, $("#external-links").attr("id"));
					$("#external-links").show();
				} else {
					$("#external-links").hide();
				}
				
				if( _vars["node"]["termins"].length === 0 ){
					$("#termins").hide();
				} else {
					$("#termins .nav-click").addClass("root-link");			
				}
				
			}//end render_node()
			
		}//end function draw_page( params )


		function define_event() {
			
			
//			$("body").on("click", ".breadcrumb-link", function(e){
//				e.preventDefault();
//console.log("breadcrumb click, num: " +  num);
//				var num = $(this).data("num");
//				for( var n = num+1; n < lib_obj["breadcrumb"].length; n++){
//					delete lib_obj["breadcrumb"][n];
//				}
//			});//end event

/*			
			$('body').on('click', '.nav-click', function(e){
console.log(".nav-click click", e );
//e.ctrlKey
//e.shiftKey
//altKey
				var s_href = $(e.target).attr("href");
				var parse_url = s_href.substring(1).split("&"); 
console.log(s_href, parse_url );
				
				//breadcrumb process
				if( $(e.target).hasClass("root-link") ){
					lib_obj["breadcrumb"] = [];
				}
				
				if( $(e.target).hasClass("breadcrumb-link") ){
					var num = $(this).data("num");
//console.log("breadcrumb click, num: " +  num);

					//for( var n = num+1; n < lib_obj["breadcrumb"].length; n++){
//console.log(n, lib_obj["breadcrumb"][n]);
						////delete lib_obj["breadcrumb"][n]["name"];
						////delete lib_obj["breadcrumb"][n]["url"];
						////delete lib_obj["breadcrumb"][n];
						//lib_obj["breadcrumb"][n] = [];
					//}

					var start_index = num + 1;
					var num_delete = lib_obj["breadcrumb"].length - start_index;
//console.log( start_index, num_delete );
					lib_obj["breadcrumb"].splice( start_index, num_delete );
				}
				
				if( lib_obj["breadcrumb"].length > 0) {
					var test = in_array( s_href, lib_obj["breadcrumb"] );
				} else {
					var test = true;
				}
				if( test ) {
					var obj = {
						name : $(e.target).text(),
						url : s_href
					};
					lib_obj["breadcrumb"].push( obj );
				}
				//-----------------------------
				
//console.log(".nav-click live!", s_href, parse_url, decodeURI(s_href) );
				_vars["GET"] = parseGetParams( parse_url ); 
				process_get_values();
				draw_page();
				
				if( $(".navbar-header").is(":visible") &&
					document.body.clientWidth < 990) {
					//$("#bs-navbar-collapse-1").addClass("collapse");
					$("#bs-navbar-collapse-1").hide("slow");
				}
				
				e.preventDefault();
				//return false;
			});//end event
*/

			$("body").on("click", ".navbar-toggle", function(e){
				var target = $(this).data("target");
//console.log(e, target);
				$(target).slideToggle( "slow" );
				//if( $(target).hasClass("collapse") ){
					//$(target).removeClass("collapse");
				//} else {
					//$(target).addClass("collapse");
				//}
				e.preventDefault();
			});//end event
			

			$("body").on("click", "#info .nav-tabs a", function(e){
				var active_tab = $(this).attr("href");
//console.log( active_tab, $(this).parent() );

				$("#info .nav-tabs li").removeClass("active");
				$(this).parent().addClass("active");
				
				$("#info .tab-content .tab-pane").removeClass("active in");
				$(active_tab).addClass("active in");
				
				if( active_tab === "#info-tab" ){
//breadcrumb object
 					var html = "";
					
					var size_obj = count_object_bytes( lib_obj["nodes"] );
					html += "<li>";
					html += "lib_obj['nodes']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( lib_obj["taxonomy"] );
					html += "<li>";
					html += "lib_obj['taxonomy']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( lib_obj["templates"] );
					html += "<li>";
					html += "lib_obj['templates']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";
					
					var size_obj = count_object_bytes( _vars["termin_nodes"] );
					html += "<li>";
					html += "lib_obj['termin_nodes']: " + size_obj["bytes"] +" bytes";
					if( size_obj["Kbytes"] > 0 ){
						html += ", " + size_obj["Kbytes"] +" Kb";
					}
					html += "</li>";


					$("#size_lib_obj").html( html );
				};
				
				e.preventDefault();
			});//end event



			window.onresize = function(event) {
				if( document.body.clientWidth > 990){
					if( !$("#bs-navbar-collapse-1").is(":visible") ){
console.log("w = " + document.body.clientWidth );
						$("#bs-navbar-collapse-1").show("slow");
					}
				}
			}//end event
			

			if( _vars["appContainer"] ){
				_vars["appContainer"].onclick = function(event){
					event = event || window.event;
					var target = event.target || event.srcElement;
//console.log( event );
	//console.log( this );//page-container
	//console.log( target.textContent );
	//console.log( event.eventPhase );
	//console.log( "preventDefault: " + event.preventDefault );
					//event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
					//event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
					
					if( target.tagName === "A"){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}
						if ( target.href.indexOf("?q=") !== -1){

								//var search = target.href.split("?"); 
								//var parseStr = search[1]; 
								var parseStr = target.href; 
//console.log( parseStr );

								if( parseStr.length > 0 ){
									_vars["GET"] = parseGetParams( parseStr ); 
									_urlManager(target);
								} else {
	console.log( "Warn! error parse url in " + target.href );
								}

						}
					}
					
				}//end event
			}
			
		}//end define_event()
		

		function _urlManager(target){
	//console.log(target, _vars["GET"]);

			switch( _vars["GET"]["q"] ) {
				
				case "toggle-log":
//console.log(_vars["log"]..style.display);
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
				
				case "book_page": 
_vars["timeStart"] = new Date();
						_vars["node"] = nodes_obj.get_node({
							"nid" : _vars["GET"]["nid"]
						});
						_vars["book_child_pages"] = book.get_child_pages({
							"plid" : _vars["GET"]["mlid"],
							"recourse" : 0
						});
						
//-----------------
/*
var s_href = $(target).attr("href");
				if( lib_obj["breadcrumb"].length > 0) {
					var test = in_array( s_href, lib_obj["breadcrumb"] );
				} else {
					var test = true;
				}
				if( test ) {
					var obj = {
						name : $(target).text(),
						url : s_href
					};
					lib_obj["breadcrumb"].push( obj );
				}
*/				
//-----------------

//var params = [];
//params["plid"] = "386";
//params["recourse"] = 0;
//lib_obj["test"] = book.get_child_pages( params );//title="художественая литература" nid="3" mlid="386" plid="384" type="book"
						

					draw_page();
					
					if( $(".navbar-header").is(":visible") &&
						document.body.clientWidth < 990) {
						//$("#bs-navbar-collapse-1").addClass("collapse");
						$("#bs-navbar-collapse-1").hide("slow");
					}
				
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;

_vars["logMsg"] = "- nodes_obj.get_node("+_vars["GET"]["nid"]+"), book.get_child_pages("+ _vars["GET"]["mlid"] +"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 _log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );

//config["runtime"]["get_child_pages"] = [];
//config["runtime"]["get_child_pages"]["time"] = runtime_s;

				break;
				
				case "termin_nodes":
_vars["timeStart"] = new Date();

					_vars["termin_nodes"] = [];
					_vars["termin_nodes"] = nodes_obj.get_termin_nodes({
						//"vid" : _vars["GET"]["vid"],
						"tid" : _vars["GET"]["tid"]
					});
					draw_page();
					if( $(".navbar-header").is(":visible") &&
						document.body.clientWidth < 990) {
						$("#bs-navbar-collapse-1").hide("slow");
					}
						
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
_vars["logMsg"] = "- nodes_obj.get_termin_nodes("+_vars["GET"]["tid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 _log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				
				break;
				
				case "node": 
_vars["timeStart"] = new Date();

					_vars["node"] = nodes_obj.get_node({
						"nid" : _vars["GET"]["nid"]
					});
					draw_page();
					if( $(".navbar-header").is(":visible") &&
						document.body.clientWidth < 990) {
						$("#bs-navbar-collapse-1").hide("slow");
					}
						
_vars["timeEnd"] = new Date();
_vars["runTime"] = (_vars["timeEnd"].getTime() - _vars["timeStart"].getTime()) / 1000;
_vars["logMsg"] = "- nodes_obj.get_node("+_vars["GET"]["nid"]+"), runtime: <b>" + _vars["runTime"] + "</b> sec";
 _log("<p class='alert alert-info'>" + _vars["logMsg"] + "</p>");
console.log( _vars["logMsg"] );
				break;
/*
				case "load-xml-book":
					_vars["requestUrl"] = "parse_notes/xml/export_mydb_notes.xml";
					loadBookXml();
				break;
*/				
				
				default:
console.log("_urlManager(),  GET query string: ", _vars["GET"]);			
				break;
			}//end switch
			
		}//end _urlManager()
		
		function in_array( test_url, test_array ){
//console.log("function check_in_array", test_url, test_array);
			for( var n = 0; n < test_array.length; n++ ){
				if( test_url === test_array[n]["url"] ){
					return false;
				}
			}//next item
			return true;
			
		}//end in_array()


		function add_cloud_links( cloudUrl ) {//form link on cloud file
//console.log("function add_cloud_links", cloudUrl);			
			var html = "";
			
			var node_tpl_url = lib_obj["templates"]["cloud_for_tpl"];
			var subfolder =  _vars["node"]["subfolder"];

			for( var n = 0; n < _vars["node"]["book_files"].length; n++ ){
				var filename =  _vars["node"]["book_files"][n];
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
				
//-------------
if(cloudUrl.indexOf("mail.ru") !== -1 ){
	link_title = "Mail.ru cloud disk: " + link_title;
}
if(cloudUrl.indexOf("yandex") !== -1 ){
	link_title = "Yandex cloud disk: " + link_title;
}
//-------------				
				var html_url = node_tpl_url
						.replace("{{link-title}}", link_title)
						.replace(/{{url}}/g, url);
//-------------
if(cloudUrl.indexOf("mail.ru") !== -1 ){
	html_url += "<br/>direct link: " + url;
}
//-------------				
						
				html += html_url;
			}//next book file
			
//console.log(html);
			return html;
		}//end add_cloud_links()

/*
		function add_dropbox_links() {
			//form node book url and generate ajax-request to Dropbox
			var node_tpl_url = lib_obj["templates"]["dropbox_for_tpl"];
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
		}//end add_dropbox_links()
*/

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
		
		function get_attr_to_obj( attr )	
		{			
			var item_attr = {};				
			for(var item = 0; item < attr.length; item++)
			{
				item_attr[attr[item].name] = attr[item].value;
			}
			return item_attr;
		}//end get_attr_to_obj()




		function get_object_size( obj ) {
			var size = 0;
			for ( var key in obj ){
//console.log( key, typeof obj[key] );
				if ( key.length > 0 ) size++;
			}
			return size;
		};//end  get_object_size( obj ) 
		
		
		
		function count_object_bytes (obj){
			var size_obj = {
				"bytes" : count_bytes( obj ),
				"Kbytes" : 0
			}
			if( size_obj["bytes"] > 1024 ){ 
				size_obj["Kbytes"] = (size_obj["bytes"] /1024).toFixed(2) 
			}
console.log(size_obj);
			return size_obj;
			
			function count_bytes( obj ){
				var size = 0;
				for(var index in obj) {

					if (Object.prototype.toString.call( obj ) !== '[object Array]'){
						size += 2 * index.length;//key size in bytes
			//console.log( index, index.length, typeof index );
					}

			//console.log( index, obj[index], typeof obj[index] );
					switch (typeof obj[index]){

						case 'boolean': 
							size += 4; 
							break;

						case 'number': 
							size += 8; 
							break;

						case 'string': 
							//size += 2 * obj[index].length; 
			//console.log( encodeURIComponent( obj[index] ), unescape(encodeURIComponent( obj[index] )).length );

							size += unescape(encodeURIComponent( obj[index] )).length;
							break;

						case 'object':

							if (Object.prototype.toString.call( obj[index] ) === '[object Array]'){
								var size2 = 0
								size2 += count_bytes( obj[index]);
								size += size2;
			//console.log( size2, size );
							} else {
								size += count_bytes( obj[index]);
							}
							break;

					}//end switch
				}//next item
				return size;
			}//end count_bytes()
			
		}//end count_object_bytes



		// public interfaces
		return{
			lib_obj: lib_obj, 
			vars: _vars//, 
			//load_templates: function( params ){ 
				//return _load_templates( params ); 
			//},
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
	};
	
	window.Lib = Lib;
	
})();
