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
	var Lib =  Lib || function( xml ){

		// private variables and functions
		var lib_obj = [];
		var $_GET = {}; 
		var message = "";

		//init
var exec_start = new Date();
		init();
		
		function init(){
			var parse_url = window.location.search.substring(1).split("&"); 
			$_GET = parseGetParams( parse_url ); 
//console.log( $_GET,  get_object_size( $_GET ) );

			var params = {
				callback: callback_init //link to callback function
			};
			get_templates( params );
			
		}//end init()
		
		function callback_init()
		{
//runtime : 6.889 sec+, 
//runtime : 3.489 sec+, 
//runtime : 2.697 sec+
//runtime : 2.872 sec+
//runtime : 2.634 sec
			get_content();
			process_get_values();
			draw_page();
			define_event();
			
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>INIT, runtime  : " + runtime_s  + " sec";
info.push( message );
		}//end callback_init()
		
		//html templates
		function get_templates( params )
		{
			lib_obj["templates"] = [];
			$.get( config["tpl_file"], function( data ) {
//console.log( data );			
				lib_obj["templates"]["html"] = data;
				var templates = $( lib_obj["templates"]["html"] );
				
				//read templates
				lib_obj["templates"]["book_category_menu_item_tpl"] = templates.find("#book-category-menu li")[0].outerHTML;
				var tmp = templates.find("#book-category-menu");
				tmp.find("li").remove();
				lib_obj["templates"]["book_category_menu_tpl"] = tmp.html();
				
				
				lib_obj["templates"]["node_tpl_url"] = templates.find("#view-node #book-links li")[0].outerHTML;
				//lib_obj["templates"]["node_tpl_links"] = templates.find("#view-node #book-links li")[0].outerHTML;
				lib_obj["templates"]["node_tpl_termins"] = templates.find("#view-node #termins li")[0].outerHTML;
				var tmp = templates.find("#view-node");
				tmp.find("li").remove();
				lib_obj["templates"]["node_tpl"] = tmp.html();
				
				//lib_obj["templates"]["breadcrumb_tpl_url"] = templates.find("#tpl-breadcrumb").html();
				
				lib_obj["templates"]["taxonomy_menu_item_tpl"] = templates.find("#taxonomy-menu li")[0].outerHTML;
				var tmp = templates.find("#taxonomy-menu");
				tmp.find("li").remove();
				lib_obj["templates"]["taxonomy_menu_tpl"] = tmp.html();
				lib_obj["templates"]["taxonomy_url_tpl"] = templates.find("#taxonomy-url").text();
				
				
				lib_obj["templates"]["termin_nodes_item_tpl"] = templates.find("#termin-nodes-item").html();
				var tmp = templates.find("#termin-nodes");
				tmp.find("#termin-nodes-item").remove();
				lib_obj["templates"]["termin_nodes_tpl"] = tmp.html();
				lib_obj["templates"]["termin_nodes_url_tpl"] = templates.find("#termin-nodes-url").text();

				
				var tmpl = $(data).find("#dropbox-for");
				lib_obj["templates"]["dropbox_for_tpl"] = tmpl.html();
				
				//var tmpl = $(data).find("#external-links");
				//lib_obj["templates"]["external_links_tpl"] = tmpl.html();
				
				var message = "<br>load templates from " + config["tpl_file"];
				info.push( message );
				
				params.callback();	
			});

		}//end get_templates( params )

		var get_content = function( params ){
			
			//get nodes
			var exec_start = new Date();
//runtime: 0.668 sec
				read_nodes_data();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- read_nodes_data, runtime: " + runtime_s  + " sec";
			info.push( message );

			var exec_start = new Date();
//runtime: 4.837 sec+, 
//runtime: 1.394 sec+, 
//runtime: 0.783 sec
				lib_obj["nodes"] = nodes_obj.get_xml_nodes();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- nodes_obj.get_xml_nodes(), runtime: " + runtime_s  + " sec";
			info.push( message );


			//get taxonomy termins
			var exec_start = new Date();
//runtime: 0.684 sec
				read_taxonomy_data();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- read_taxonomy_data, runtime: " + runtime_s  + " sec";
			info.push( message );
			
			var exec_start = new Date();
//runtime: 1.989 sec+, 
//0.042 sec			
				lib_obj["taxonomy"] = taxonomy_obj.get_xml_taxonomy();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- get taxonomy, runtime: " + runtime_s  + " sec";
			info.push( message );

			//get book category
			var exec_start = new Date();
//runtime : 0.244 sec			
 //runtime : 0.032 sec			
				lib_obj["book_category"] = get_book_category();
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
			var message = "<br>- get_book_category, runtime  : " + runtime_s  + " sec";
			info.push( message );
			
			//message = "";
			//message += "<br>Size lib_obj['xml_nodes']: " + lib_obj["xml_nodes"].length  + " bytes";
			//message += "<br>Size lib_obj['book_category']: " + lib_obj["book_category"].length  + " bytes";
			//message += "<br>Size lib_obj['nodes']: " + nodes.nodes_size  + " bytes";
			//message += "<br>Size lib_obj['taxonomy']: " + lib_obj["taxonomy"].length  + " bytes";
			//info.push( message );
			
		};//end lib.get_content()


		function process_get_values()
		{
//console.log( $_GET,  get_object_size( $_GET ) );
			if( get_object_size( $_GET ) === 0)
			{
				var message = "<br>No $_GET value";
				info.push( message );
				return;
			}
			
			switch( $_GET["q"] )
			{
				case "node":
var exec_start = new Date();
						var params = {
							"nid" : $_GET["nid"]
						};
						lib_obj["node"] = nodes_obj.get_node( params);
						
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>- nodes_obj.get_node( params), runtime: " + runtime_s  + " sec";
info.push( message );
					break
				case "termin_nodes":
var exec_start = new Date();
						lib_obj["termin_nodes"] = [];
						var params = {
							//"vid" : $_GET["vid"],
							"tid" : $_GET["tid"]
						};
						lib_obj["termin_nodes"] = nodes_obj.get_termin_nodes( params);
						
var exec_end = new Date();
var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
var message = "<br>- nodes_obj.get_termin_nodes( params), runtime: " + runtime_s  + " sec";
info.push( message );
					break
				default:
					break
			}//end switch
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
				return get_termin_nodes( params );
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
		function read_nodes_data()
		{
			var table_name_index = "table_taxonomy_index";
			nodes_obj["x_table_index"] = $(xml).find( table_name_index ).find('item');
			
			var table_name = "table_node";
			nodes_obj["x_nodes"] = $(xml).find( table_name ).find('node');
			
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

			for( var n = 0; n < nodes_obj["x_nodes"].length; n++)
			{
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
						if( typeof node["tid"] === "undefined")
						{
							node["tid"] = [];
						}
						node["tid"].push( nodes_obj["x_table_index"][n2].getAttribute("tid") );
					}
				}//next termin
				
				nodes.push( node );
			}//next node
			
			return nodes;
		}//end get_xml_nodes()


		function get_termin_nodes( params )
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
		}//end get_termin_nodes()
		
		function view_termin_nodes( params ) {
			if( typeof lib_obj["termin_nodes"] === "undefined")
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
			for( var n = 0; n < lib_obj["termin_nodes"].length; n++)
			{
				var node = lib_obj["termin_nodes"][n];
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
			if( typeof lib_obj["node"] === "undefined") {
				var message = "<br>error, not found lib_obj[node]";
console.log(message);
				info.push( message );
				return;
			}
			
			var node_tpl = lib_obj["templates"]["node_tpl"];
			var html = node_tpl
			.replace("{{author}}", lib_obj["node"]["author"] )
			.replace("{{bookname}}", lib_obj["node"]["bookname"] )
			.replace("{{changed}}", lib_obj["node"]["changed"] )
			.replace("{{created}}", lib_obj["node"]["created"] )
			.replace("{{body_value}}", lib_obj["node"]["body_value"] );

			
			//form node book local url
			var node_tpl_url = lib_obj["templates"]["node_tpl_url"];
			var html_book_url = "";
			var subfolder =  lib_obj["node"]["subfolder"];
			for( var n = 0; n < lib_obj["node"]["book_files"].length; n++ )
			{
				var filename =  lib_obj["node"]["book_files"][n];
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
			
			//add dropbox disk links
			add_dropbox_links();
			//var html_dropbox_links = add_dropbox_links();
			//html = html.replace("{{dropbox-list}}", html_dropbox_links);


			//form node book external links
			var html_book_links = "";
			for( var n = 0; n < lib_obj["node"]["book_links"].length; n++ )
			{
				var link =  lib_obj["node"]["book_links"][n];
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
			for( var n = 0; n < lib_obj["node"]["book_url"].length; n++ ){
				var link =  lib_obj["node"]["book_url"][n];

				html_book_url2 += node_tpl_url
						.replace("{{link-title}}", link)
						.replace("{{url}}", link);
			}//next book url
			html = html.replace("{{book-old-url}}", html_book_url2);
			
			//form node taxonomy menu
			var html_termin_links = "";
			var node_tpl_url = lib_obj["templates"]["node_tpl_termins"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];

			for( var n = 0; n < lib_obj["node"]["termins"].length; n++ ) {
				var link = url_tpl
					.replace("#vid", "")
					.replace("#tid", lib_obj["node"]["termins"][n]["tid"] );
				
				var link_title = lib_obj["node"]["termins"][n]["name"];

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
			"view_termin" : function( 
				termins, 
				vid, 
				tid, 
				recourse, 
				show_only_children 
				)
			{
				var html = view_termin( 
				termins, 
				vid, 
				tid, 
				recourse, 
				show_only_children 
				);
				return html;
			}
		};

		//read xml data
		function read_taxonomy_data()
		{
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
					"termins" : get_termins( item.attr('vid') ),
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
					if ( item.attr('vid') == vid )
					{
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
			
			var item_tpl = lib_obj["templates"]["taxonomy_menu_item_tpl"];
			var menu_tpl = lib_obj["templates"]["taxonomy_menu_tpl"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];
			var html = "";
			for( var n = 0; n < lib_obj["taxonomy"][vocabulary_name]["termins"].length; n++ )
			{
				var termin = lib_obj["taxonomy"][vocabulary_name]["termins"][n];
				if( termin["parent_value"] === "0")
				{
					var url = url_tpl
					.replace("#vid", termin["vid"])
					.replace("#tid", termin["tid"]);
					
					html += item_tpl
					.replace("#link-title", termin["name"])
					.replace("#url", url);
					
					if( recourse )
					{
						var html_children_termins = list_children_termins( 
							lib_obj["taxonomy"][vocabulary_name]["termins"], 
							termin["vid"], 
							termin["tid"], 
							recourse 
						);
						if( html_children_termins.length > 0)
						{
							html += menu_tpl.replace("#links", html_children_termins);
						}
					}
				}
			}//next
			
			html = menu_tpl.replace("#links", html);
			return html;
			
		}//end view_vocabulary()

		function list_children_termins( termins, vid, tid, recourse )
		{
			var item_tpl = lib_obj["templates"]["taxonomy_menu_item_tpl"];
			var menu_tpl = lib_obj["templates"]["taxonomy_menu_tpl"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];
			var html = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["parent_value"] === tid )
				{
					var url = url_tpl
					.replace("#vid", termin["vid"])
					.replace("#tid", termin["tid"]);
					
					html += item_tpl
					.replace("#link-title", termin["name"])
					.replace("#url", url);
					
					if( recourse )
					{
						var html_children_termins = list_children_termins( 
							termins, 
							termin["vid"], 
							termin["tid"], 
							recourse 
						);
						if( html_children_termins.length > 0)
						{
							html += menu_tpl.replace("#links", html_children_termins);
						}
					}
				}
			}//next
			
			return html;
		}//end list_children_termins();
		
		function view_termin( termins, vid, tid, recourse, show_only_children)
		{
			var item_tpl = lib_obj["templates"]["taxonomy_menu_item_tpl"];
			var menu_tpl = lib_obj["templates"]["taxonomy_menu_tpl"];
			var url_tpl = lib_obj["templates"]["taxonomy_url_tpl"];
			var html = "";
			for( var n = 0; n < termins.length; n++ )
			{
				var termin = termins[n];
				if( termin["vid"] === vid && 
						termin["tid"] === tid)
				{
					if( !show_only_children )
					{
						var url = url_tpl
						.replace("#vid", termin["vid"])
						.replace("#tid", termin["tid"]);
						
						html += item_tpl
						.replace("#link-title", termin["name"])
						.replace("#url", url);
					}
					
					if( recourse )
					{
						var html_children_termins = list_children_termins( 
							termins, 
							termin["vid"], 
							termin["tid"], 
							recourse 
						);
						if( html_children_termins.length > 0)
						{
							html += menu_tpl.replace("#links", html_children_termins);
						}
					}
				}
			}//next
			return html;

		}//end function view_termin()
		


		var book = {
			"get_book_category" : function( params ){
				get_book_category( params );
			},
			"view_book_category" : function( params ){
				view_book_category( params );
			}
		};
		
		
		function get_book_category()
		{
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++)
			{
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') == "0")
				{
					var nodes = get_children_pages( $(node).attr('mlid'), 0);
				}
			};//next node
			
			return nodes;
			
		}//end get_book_parent_node()

		function get_children_pages( plid, recourse )
		{
			var nodes = [];
			for( var n = 0; n < nodes_obj["x_nodes"].length; n++)
			{
				var node = nodes_obj["x_nodes"][n];
				if ( $(node).attr('plid') === plid )
				{
					nodes.push( node );
					if( $(node).attr('mlid').length > 0 )
					{
						if ( recourse == 1)
						{
							var children_nodes = list_children_pages( $(node).attr('mlid'), 1 )
							nodes.push( children_nodes );
						}
					}
				}
			};//next node
			
			return nodes;
		}//end get_children_pages()

		function view_book_category( container )
		{
			if( typeof lib_obj["book_category"] == "undefined")
			{
console.log("error, not found lib_obj[book_category], function parse_book_category( container )");
				return;
			}
			
			var html = "";
			for( var n = 0; n < lib_obj["book_category"].length; n++)
			{
				var node = lib_obj["book_category"][n];
				html += lib_obj["templates"]["book_category_menu_item_tpl"]
.replace(/#page-title/g, $(node).attr('title') )
.replace(/#link/g, "#menu-" + $(node).attr('mlid') )
.replace(/#nid/g, "nid-" + $(node).attr('nid') )
.replace(/#type/g,  $(node).attr('type') );
			}//next

			html = lib_obj["templates"]["book_category_menu_tpl"].replace(/#links/g, html );
			$(container).html( html );
		}//end view_book_category()


		
		function draw_page( params )	{
			if( typeof lib_obj["book_category"] !== "undefined" ) {
				if( lib_obj["book_category"].length > 0 ) {
					book.view_book_category("#book-category");
				}
			} else {
console.log("error, not found lib_obj[book_category]");
			}
			
			
			var html = view_vocabulary( "library", recourse = false );
			/*
			var	html = view_termin( 
						lib_obj["taxonomy"]["library"]["termins"], 
						vid = "2", 
						tid = "38", //"46", 
						recourse = true
					);
			*/		
			$("#tags").html( html );

			//var html = taxonomy_obj.view_vocabulary( "alphabetical_voc", recourse = true );
			var html = taxonomy_obj.view_termin(
				lib_obj["taxonomy"]["alphabetical_voc"]["termins"], 
				vid = "4", 
				tid = "116", 
				recourse = true,
				show_only_children = true
			);
			html += taxonomy_obj.view_termin(
				lib_obj["taxonomy"]["alphabetical_voc"]["termins"], 
				vid = "4", 
				tid = "115", 
				recourse = true,
				show_only_children = true
			);
			$("#block-taxonomy-alpha").html( html );
			
			
			//view termin nodes
			if ( $_GET["q"] === "termin_nodes" ) {
				$("#region-content #block-taxonomy").empty( html );
				$("#region-content #block-nodes").empty( html );
				
				if( $_GET["vid"] === "2"){
					//view children termin
					var html = taxonomy_obj.view_termin(
						lib_obj["taxonomy"]["library"]["termins"], 
						vid = $_GET["vid"] , 
						tid = $_GET["tid"] , 
						recourse = true,
						show_only_children = false
					);
					$("#region-content #block-taxonomy").html( html );
				}
				
				if ( lib_obj["termin_nodes"].length > 0)
				{
					var html = nodes_obj.view_termin_nodes( );
					$("#region-content #block-nodes").html( html );
				}
			}
			
			//view nodes
			if ( $_GET["q"] === "node" ){
				var params = {"nid" :  $_GET["nid"]};
				var html = nodes_obj.view_node( params );
				
				$("#region-content #block-nodes").html( html );
				
				$("#dropbox-links").hide();
				if( lib_obj["node"]["book_links"].length > 0 ){
console.log(lib_obj["node"]["book_links"].length, $("#external-links").attr("id"));
					$("#external-links").show();
				} else {
					$("#external-links").hide();
				}
			}
			
			
			//content gradient	correct height
			var h = $(".b-content").height();
			$(".b-content .grad").height(h);
			
			
			
		}//end function draw_page( params )


		function define_event() {
			
			
			$('body').on('click', '.nav-click', function(e){
//e.ctrlKey
//e.shiftKey
//altKey
				var s_href = $(e.target).attr("href");
				var parse_url = s_href.substring(1).split("&"); 
//console.log(".nav-click live!", s_href, parse_url);
				$_GET = parseGetParams( parse_url ); 
				process_get_values();
				draw_page();
				
				e.preventDefault();
				//return false;
			});//end event
			
		}//end define_event()
		
		//parse url
		function parseGetParams( parse_url ) { 
		   var $_GET = {}; 
		   //var parse_url = window.location.search.substring(1).split("&"); 
		   for(var n = 0; n < parse_url.length; n++) 
		   { 
			  var getVar = parse_url[n].split("="); 
			  //$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
			  if( typeof(getVar[1])=="undefined" )
			  {
				$_GET[ getVar[0] ] = "";
			  }
			  else
			  {
				$_GET[ getVar[0] ] = getVar[1];
			  }
		   } 
		   return $_GET; 
		}//end parseGetParams() 

		function add_dropbox_links() {
			//form node book url and generate ajax-request to Dropbox
			var node_tpl_url = lib_obj["templates"]["dropbox_for_tpl"];
			var subfolder =  lib_obj["node"]["subfolder"];
			for( var n = 0; n < lib_obj["node"]["book_files"].length; n++ ){
				var filename =  lib_obj["node"]["book_files"][n];
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
				},
			});
		}//end test_exists_book()
		
		function get_attr_to_obj( attr )	
		{			
			var item_attr = {};				
			for(var item = 0; item < attr.length; item++)
			{
				item_attr[attr[item].name] = attr[item].value;
			}
			return item_attr;
		}//end get_attr_to_obj()

		function get_object_size( obj ) 
		{
			var size = 0;
			for ( var key in obj ) 
			{
				if ( key.length > 0 ) size++;
			}
			return size;
		};//end  get_object_size( obj ) 

		// public interfaces
		return{
			lib_obj: lib_obj//, 
			//get_templates: function( params ){ 
				//return _get_templates( params ); 
			//},
			//get_content: function( params ){ 
				//return get_content( params ); 
			//}
		};
	};
	
	window.Lib = Lib;
})();