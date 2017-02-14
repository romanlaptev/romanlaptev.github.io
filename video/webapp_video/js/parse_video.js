var Video = function()
{
	var xml_data = [];
	
	var start_time = new Date();
	
	//read html template
	var node_list_item_tpl = $("#node-list-tpl .item").html();
	$("#node-list-tpl .item").empty();

	var node_list_tpl = $("#node-list-tpl").html();
	$("#node-list-tpl").empty();
	
	//load_data();
	//load_xml("db/node.xml", "node" );
	//load_table("json/node.json", "node" );
	load_table("db/node.xml", "node" );
	
	var end_time = new Date();
	var runtime_load = ( end_time.getTime() - start_time.getTime()) / 1000;
			
	var log = "";
	log += "<p>load xml files, runtime: " + runtime_load + " sec</p>";
	$("#log").append( log );

	//$("#log").append("<p>Parse...</p>");
	setTimeout(function()
	{
		//$("#log").append("<p>Done!</p>");
		var html = get_list_nodes( xml_data["node"] );
		$("#app").append("<p>"+html+"</p>");
	}, 0);
	

	function get_list_nodes( xml )
	{
		var html = "";
		//var list_tpl = "<h2>#title</h2><ul>#value</ul>";
		//var list_item_tpl = "<div><ol>#num. <h3>#title</h3></ol><ul><li><b>type:</b>#type</li><li><b>created:</b>#created</li><li><b>changed:</b>#changed</li><ul></div>";
		
		var table_name = $( xml ).find("table").attr("name");
		
		var html_list_items = "";
		var count = 0;
		$( xml ).find("record").each(function(){
			
			var id = $(this).attr("num");
			var type = $(this).find("type").text();
			
			if( type == "video")
			{
				count++;
				var status = $(this).find("status").text();
				var title = $(this).find("title").text();
				var created = $(this).find("created").text();
				var changed = $(this).find("changed").text();
				html_list_items +=   node_list_item_tpl.replace("#id", id)
				.replace("#num", count)
				.replace("#type", type)
				.replace("#title", title)
				.replace("#created", created)
				.replace("#changed", changed);
			}
		});
		html +=  node_list_tpl.replace("#title", table_name).
		replace("#value", html_list_items).
		replace("#count", count);
		
		return html;
	}//end get_list_nodes()
	
	
/*	
	var mVideo = {
		"data": ["a", "b", "c"],
		"init" : function(){
console.log("Init mVideo");
//console.log( node.name );

			var start_time = new Date();
			load_data();
			
			var end_time = new Date();
			var runtime_load = ( end_time.getTime() - start_time.getTime()) / 1000;
			
			var log = "";
			log += "<p>load xml files, runtime: " + runtime_load + " sec</p>";
			$("#log").append( log );
		
console.log( "1. ", xml_data );


		}
	}
	return mVideo;
*/

/*
	function load_data()
	{
console.log("function load_data()");
		//node.load();
		load_xml("db/node.xml", "node" );
		load_xml("db/book.xml", "book" );
		load_xml( "db/field_data_body.xml", "field_data_body" );  
		load_xml( "db/field_data_body_video.xml", "field_data_body_video" );
		load_xml( "db/field_data_field_filename.xml", "field_data_field_filename" );
		load_xml( "db/field_data_field_img_cover.xml", "field_data_field_img_cover" );
		load_xml( "db/field_data_field_roles.xml", "field_data_field_roles" );
		load_xml( "db/field_data_field_subfolder.xml", "field_data_field_subfolder" );
		load_xml( "db/field_data_field_taxonomy.xml", "field_data_field_taxonomy" );
		load_xml( "db/field_data_field_taxonomy_alpha.xml", "field_data_field_taxonomy_alpha" );
		load_xml( "db/field_data_field_year.xml", "field_data_field_year" );
		load_xml( "db/menu_links.xml", "menu_links" );
		load_xml( "db/taxonomy_index.xml",  "taxonomy_index" );
		load_xml( "db/taxonomy_term_data.xml", "taxonomy_term_data" );
		load_xml( "db/taxonomy_term_hierarchy.xml", "taxonomy_term_hierarchy" );
		load_xml( "db/taxonomy_vocabulary.xml", "taxonomy_vocabulary" );
	}//end load_data()
	
	function load_xml(xml_file, table )
	{
		$.ajax ({
				type: "post",
				url: xml_file,
				dataType:"xml",
				//processData:false,
				success:function(data,status)
				{
console.log("status - " + status);
					xml_data[table] = data;
				},
				error:function(data, status, errorThrown)
				{
console.log("status - " + status);
				}
			}
		);
	}//end  load xml
*/	
	
	function load_table(file, table )
	{
		var type = file.indexOf(".json");
		if( type > 0){
			$.getJSON( file, function( data ){
				
				$.each( data, function( key, value){
	console.log(key, value);
				});
				
			})
			.done(function() {
	console.log( "Done" );
			})
			.fail(function( jqxhr, textStatus, error ) {
				
				var err = textStatus + ", " + error;
	console.log( "Request Failed: " + err );

			})
			.always(function() {
				
	console.log( "Always" );

			});	
		}

		var type = file.indexOf(".xml");
console.log(type);
		if( type > 0){
			$.ajax ({
					type: "GET",
					url: file,
					dataType:"xml",
					//processData:false,
					success:function(data,status)
					{
console.log("status - " + status);
						xml_data[table] = data;
					},
					error:function(data, status, errorThrown)
					{
console.log("status - " + status);
					}
				}
			);
		}
		
	}//end  load table
	
/*
	var node = {
		"load" : function(){
			$.ajax ({
					type: "post",
					url: "db/node.xml",
					dataType:"xml",
					success:function(xml, status)
					{
console.log("status - " + status);
						node.xml = xml;
						node.get_name();
					},
					error:function(xml, status, errorThrown)
					{
console.log("status - " + status);
					}
				}
			);
		},
		"get_name":function(){
			this.name = $( node.xml ).find("table").attr("name");
console.log("function node.get_name()" ,this.name );
		},
		"name": "000",
		"xml":"0"
	}
*/
	
}//end module