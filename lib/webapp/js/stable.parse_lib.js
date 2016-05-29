var xml_file = "xml/export_lib.xml";
var index_page = "index.html";

//var test = 1;
var xml_data;

//html templates
var list_child_pages_tpl = "<ul class='book-content submenu' id='menu-#plid'>#links</ul>";
var list_child_pages_tpl_repeat_start = "<li class='#type'><a href='#link' data-nid='#nid' class='nav'>#page-title</a>";
var list_child_pages_tpl_repeat_end = "</li>";
var taxonomy_alpha_tpl_url = "";
var taxonomy_alpha_tpl = "";
var voc_library_tpl_url = "";
var voc_library_tpl = "";

//----------------------------------------
var url_lib_location = "http://mycomp";

//var url_lib_location_google = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
//var url_lib_location_google = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
//https://82a6b6dbc001945de98603747fb016b76836cee7.googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk
var url_lib_location_google2 = "https://googledrive.com/host/0BxjK1kq1ZINaOEFkaDBaUlNTNXc";

//var url_lib_location_yandex = "https://docviewer.yandex.ru/?url=ya-disk-public%3A%2F%2Fmo72y3B%2B7T5owUH79EMBvOu8LE8TIvPTEcxtMhANeQc%3D%3A";
//https://docviewer.yandex.ru/?url=ya-disk:///disk/lib/books/CH/CH_detectiv_9piccans.txt&name=CH_detectiv_9piccans.txt
var url_lib_location_yandex = "https://docviewer.yandex.ru/?url=ya-disk:///disk/dont_sync";

var url_lib_location_dropbox = "https://dl.dropboxusercontent.com/u/75717183";

//---------------------------------
var delimiter = " &#187; ";


//---------------------------------
if (navigator.userAgent.indexOf ('Windows')!= -1) 
{
	var content_location = "file:///F:/clouds/0_data";
	//var content_location = "file:///X:";
	//var content_location = "file:///F:/clouds/Dropbox/Public";
	//var content_location = "file:///F:/clouds/google_drive/0_sites";
}
if (navigator.userAgent.indexOf ('Linux')!= -1) 
{
	var content_location = "file:///mnt/terra/clouds/0_data";
	//var content_location = "file:///mnt/wd160";
	//var content_location = "file:///mnt/terra/clouds/Dropbox/Public";
	//var content_location = "file:///mnt/terra/clouds/google_drive/0_sites";
}

//---------------------------------
if ( window.location.hostname.indexOf("mycomp") !== -1  )
{
	var hostname = "http://mycomp/sites/lib.local";
}
if ( window.location.hostname.indexOf("googledrive.com") !== -1 )
{
	var hostname = "https://googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk";
	var url_lib_location = url_lib_location_google2;
	var hide_local_link = 1;
}

/*
https://googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk/lib_xml/image_viewer_pages.html?book_location=https://7dc0167a9f9c5ab1a0696c0dd2db88531c1c94f8.googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc/lib/scan_japan_gravure&amp;page_num=1
*/


$(document).ready(
	function()
	{
		
		$('#ajaxBusy').hide();
		$("#busy").hide();
		
		$(document).ajaxStart(
			function(){ 
				$('#ajaxBusy').show(); 
			}
		).ajaxStop(
			function()
			{ 
				$('#ajaxBusy').hide();
			}
		);
		
//-----------------
		//$("#list-book-content .book-content .book a").live('click', //jQuery 1.9 метод live is not defined
//-----------------
		$('#main-book-content, #list-book-content, #tpl-breadcrumb').on('click', '.nav', 
			function()
			{
				var url =  $(this).attr("href");
				var title =  $(this).text();

				var mlid = url.replace("#menu-","");
				var nid = $(this).attr("data-nid").replace( /nid-/g, "" );

//--------------- form breadcrumb
				var html = breadcrumb_tpl_url
			.replace( /#item-url/g, url)
			.replace( /#item-title/g, title )
			.replace( /#nid/g, nid )
			.replace( /#mlid/g, "mlid-" + mlid );

				var new_item = 1;
				$("#tpl-breadcrumb > li > a").each(
					function()
					{
						var test_mlid = $(this).attr("data-mlid").replace( /mlid-/g, "" );
						var res = is_child_page( test_mlid, nid );
//console.log("res = " + res);
						if ( res )
						{
							new_item = 0;
						}
						else
						{
							new_item = 1;
						}

					}
				);

				if (new_item == 1)
				{
					$("#tpl-breadcrumb").html( delimiter + html );
				}
				else
				{
					$("#tpl-breadcrumb").append( delimiter + html );
				}

				$("#tpl-breadcrumb a").removeClass("breadcrumb-last-item");
				$("#tpl-breadcrumb a:last").addClass("breadcrumb-last-item");

//--------------------- view page content and children pages
				list_book_content(mlid,"#list-book-content");
				view_node_content( nid );

//----------------
				$(".vocabulary-library").hide();	

			}
		);

//----------------------------- read library termins
		$(".book-tags").click(
			function()
			{
				//read_termins (xml_file);
				read_termins ();
				$("#view-node-content").hide();
				$("#list-book-content").hide();
				$(".vocabulary-library").show();	

			}
		);

//----------------- read templates
		view_node_content_tpl_links = $("#view-node-content .node-links").html();
		$("#view-node-content .node-links").empty();

		view_node_content_tpl = $("#view-node-content").html();
		view_node_content_tpl_url = $("#view-node-content .node-url").html();


		breadcrumb_tpl_url = $("#tpl-breadcrumb").html();
		$("#tpl-breadcrumb").empty();

		taxonomy_alpha_tpl_url = $(".taxonomy-alpha ul").html();
		$(".taxonomy-alpha ul").html("#termin");
		taxonomy_alpha_tpl = $(".taxonomy-alpha").html();

		voc_library_tpl_url = $(".vocabulary-library ul").html();
		$(".vocabulary-library ul").html("#termin");
		voc_library_tpl = $(".vocabulary-library").html();

//----------------- read xml
		get_xml (xml_file);

	}
);//end ready
//----------------------------------------


function get_xml( xml_file )
{
	$.ajax({
		type: "GET",
		url: xml_file,
		dataType: "xml",
		success: function(xml){
			xml_data = xml;

//----------------------------- list_book_content
			$("#busy").show();
			var exec_start = new Date();
	/*
		var sec=0;
		var intervalID = setInterval(function() 
		{ 
			$("#busy .message").text(sec);
			sec++;
		}, 1000);
		clearInterval( intervalID );
	*/
			list_book_content(0,"#main-book-content");

			var exec_end = new Date();
			var runtime_ms = exec_end.getTime() - exec_start.getTime();
			$("#busy .message").html('parse book content done, runtime: ' + (runtime_ms / 1000) + ' sec' + '<br>');

//----------------------------- list taxonomy alpha termins
			var exec_start = new Date();

			var html = list_taxonomy_alpha();	
			$(".taxonomy-alpha").html( html );	

			var exec_end = new Date();
			var runtime_ms = exec_end.getTime() - exec_start.getTime();
			$("#busy .message").append('parse taxonomy alpha done, runtime: ' + (runtime_ms / 1000) + ' sec' + '<br>');


			setTimeout(function() {
				$("#busy").hide();
			}, 5*1000); 

		}
	});
}


function list_book_content(mlid, block)
{
//console.log("mlid - " + mlid);
//console.log("block - " + block);
	var html = "";
	$(xml_data).find('node').each(function()
		{
			var node = $(this);
if ( mlid == 0 )
{
			if ( node.attr('plid') == "0")//<node title="библиотека" nid="1" mlid="384" plid="0"
			{
				html += list_child_pages( node.attr('mlid'), 0 )
			}
}
else
{
			if ( node.attr('mlid') == mlid)
			{
				html += list_child_pages( node.attr('mlid'), 0 )
			}
}


		}
	);//---------------------- end each
//html += list_child_pages( table_node, 410, 1 )

	if (html != "undefined")
	{
		$(block).html( html ).show();
		//$("#list-book-content > ul.book-content").removeClass( "submenu" );
	}
	
}//----------------------------end func


function list_child_pages( plid, recourse )
{
//console.log( "plid = " + plid );
	var html = "";
	$(xml_data).find('node').each(
		function()
		{
			var node = $(this);
			if ( node.attr('plid') == plid )
			{
				html += list_child_pages_tpl_repeat_start
.replace(/#page-title/g, node.attr('title') )
.replace(/#link/g, "#menu-"+node.attr('mlid') )
.replace(/#nid/g, "nid-"+node.attr('nid') )
.replace(/#type/g, node.attr('type') );

				if (node.attr('mlid').length > 0)
				{
					if ( recourse == 1)
					{
						html += list_child_pages( node.attr('mlid'), 1 )
					}
				}
				html = html+list_child_pages_tpl_repeat_end;
			}
		}
	);//---------------------- end each

	if (html != "undefined")
	{
		if (html != "")
		{
			html = list_child_pages_tpl
.replace(/#plid/g, plid )
.replace(/#links/g, html );
		}
		return html;
	}
}//--------------------------- end func



function view_node_content( nid )
{
	var node_url="";
	var html = view_node_content_tpl;
	$(xml_data).find('node').each(function()
		{
			var node = $(this);
			if ( node.attr('nid') == nid)

			{
//console.log( node.attr('title') );
				if ( node.children('author').length > 0 )
				{
					html = html.replace(/#author/g, node.children('author').text() );
				}

				if ( node.children('bookname').length > 0 )
				{
					html = html.replace(/#bookname/g, node.children('bookname').text() );
				}

				if ( node.attr('created').length > 0 )
				{
					html = html.replace(/#created/g, node.attr('created') );
				}
				if ( node.attr('changed').length > 0 )
				{
					html = html.replace(/#changed/g, node.attr('changed') );
				}

				if ( node.children('body_value').length > 0 )
				{
					html = html.replace(/#body_value/g, node.children('body_value').text() );
				}
				else
				{
					html = html.replace(/#body_value/g, "" );
				}

				node_url = get_url_node( nid );
				node_links = get_links_node( nid );
			}
		}
	);//---------------------- end each

	if (html != "undefined")
	{
		$("#view-node-content").html( html );
		if ( node_url.length > 0 )
		{
			$("#view-node-content .node-url").html(node_url);
		}
		if ( node_links.length > 0 )
		{
			$("#view-node-content .node-links").html(node_links);
		}
		$("#view-node-content").show();

//---------------------
		//var fix_height = $(".center.change-content").height();
		//$(".container").height( fix_height );

	}

}//----------------------------end func


function get_url_node( nid )
{
	var html = "";

	var subfolder;
	$(xml_data).find('table_node').find('node').each(function()
		{
			var node = $(this);
			if ( node.attr('nid') == nid)
			{
				subfolder = node.children('subfolder').text().trim();
			}
		}
	);//---------------------- end each

	var filename;
	$(xml_data).find('table_book_filename').find('item').each(function()
		{
			var item = $(this);
			if ( item.attr('entity_id') == nid)
			{
				var test = item.children('value').text();
				if ( test.indexOf("external") != -1 || test.indexOf("http") != -1 ) // external link
				{
					var url = item.children('value').text().trim();
//---------------------------- replace {$hostname}
if ( url.indexOf("{$hostname}") != -1 )
{
	var url = url.replace("http://{$hostname}",  hostname );
}
if ( url.indexOf("{$url_lib_location}") != -1 )
{
	var url = url.replace("{$url_lib_location}",  url_lib_location );
}
if ( url.indexOf("{$book_folder}") != -1 )
{
	var url = url.replace("{$book_folder}",  subfolder );
}
//----------------------------

					//var test = item.children('value').text().trim();
					var test = url;
					if ( test.indexOf("#") != -1 ) // external link
					{
						var link_title = test.substring( test.lastIndexOf('#')+1, test.length );
						var url = test.substring( 0, test.lastIndexOf('#') );
					}
					else
					{
						var link_title = item.children('value').text().trim();
					}

					html += view_node_content_tpl_url
.replace( /#url/g, url)
.replace( /#link-title/g, link_title);
				}
				else //local filename
				{
					filename = item.children('value').text().trim();
					var short_filename = filename.substring( filename.lastIndexOf('/')+1, filename.length );
					html += "<h3>" + short_filename + "</h3>";
					html += form_local_link( nid, subfolder, filename );
				}
			}
		}
	);//---------------------- end each

	return html;

}//----------------------------end func


function form_local_link( nid, subfolder, filename )
{
	var html = "";
	
	$(xml_data).find('table_book_url').find('item').each(function()
	{
		var item = $(this);
		if ( item.attr('entity_id') == nid)
		{
			
			var url = item.children('value').text().trim();
			var link_title = item.children('value').text().trim();
			if ( url.indexOf("http") != -1 ) // old external link
			{
				if ( url == "http://localhost" ) // old external link
				{
					var url = url + "/"+ subfolder + "/"+filename;
					var link_title = url;
				}

			}
			else
			{
				var url = content_location + "/"+ subfolder + "/"+filename;
				var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );
			}

			html += view_node_content_tpl_url
.replace( /#url/g, url)
.replace( /#link-title/g, link_title);
		}
	});//---------------------- end each
	
//------------------------------
	if ( html == "" )
	{
		var url = content_location + "/"+ subfolder + "/"+filename;
		var link_title = filename.substring( filename.lastIndexOf('#')+1, filename.length );
		html += view_node_content_tpl_url
.replace( /#url/g, url)
.replace( /#link-title/g, link_title);
	}
	
//console.log(hide_local_link);
	if( hide_local_link === 1 )
	{
		var html = "";
	}

//----------------- google disk link
/*
	var url = url_lib_location_google + "/"+ subfolder + "/"+filename;
	var link_title = "google cloud link, roman.v.laptev account";
	if ( ( filename.indexOf("txt") != -1) || ( filename.indexOf("xml") != -1) )
	{
		// проверка наличия файла книги на сервере google только для текстового формата
		var google_url_html = view_node_content_tpl_url
		.replace( /#url/g, url)
		.replace( /#link-title/g, link_title);
		//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
		test_exists_book( url, google_url_html, "GET" );
	}
	else
	{
			html += view_node_content_tpl_url
		.replace( /#url/g, url)
		.replace( /#link-title/g, link_title);
	}
*/
	var url = url_lib_location_google2 + "/"+ subfolder + "/"+filename;
	var link_title = "google cloud link, laptev.rv account";
	if ( ( filename.indexOf("txt") != -1) || ( filename.indexOf("xml") != -1) )
	{
		// проверка наличия файла книги на сервере google только для текстового формата
		var google_url_html = view_node_content_tpl_url
		.replace( /#url/g, url)
		.replace( /#link-title/g, link_title);
		//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
		test_exists_book( url, google_url_html, "GET" );
	}
	else
	{
			html += view_node_content_tpl_url
		.replace( /#url/g, url)
		.replace( /#link-title/g, link_title);
	}
//-------------------------------------------------------------

//----------------- dropbox disk link
	var url = url_lib_location_dropbox + "/"+ subfolder + "/"+filename;
	var link_title = "dropbox disk link";
	var dropbox_url_html = view_node_content_tpl_url
	.replace( /#url/g, url)
	.replace( /#link-title/g, link_title);
	//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
	test_exists_book( url, dropbox_url_html, "HEAD" );

//----------------- yandex disk link
	var short_filename = filename.substring( filename.lastIndexOf('/')+1, filename.length );
	var url = url_lib_location_yandex + "/"+ subfolder + "/"+filename+"&name="+short_filename;
	var link_title = "yandex docviewer link";
	html += view_node_content_tpl_url
	.replace( /#url/g, url)
	.replace( /#link-title/g, link_title);

	return html;
}//----------------------------end func




function get_links_node( nid )
{
	var html = "";
	$(xml_data).find('table_book_links').find('item').each(function()
		{
			var item = $(this);
			if ( item.attr('entity_id') == nid)
			{
				
				var url = item.children('value').text().trim();
				var link_title = item.children('value').text().trim();

//console.log("pos # = " + url.lastIndexOf('#')  );
//console.log("new url = " + url.substring( 0, url.lastIndexOf('#') ) );
				if ( url.lastIndexOf('#') != -1)
				{
					url = url.substring( 0, url.lastIndexOf('#') );
				}
				link_title = link_title.substring( link_title.lastIndexOf('#')+1, link_title.length );

				html += view_node_content_tpl_links
.replace( /#url/g, url)
.replace( /#link-title/g, link_title);
			}
		}
	);//---------------------- end each

	return html;

}//----------------------------end func



function is_child_page( test_mlid, nid )
{
	var res = false;
	$(xml_data).find('table_node').find('node').each(function()
		{
			var node = $(this);
			if ( node.attr('plid') == test_mlid)
			{
				if ( node.attr('nid') == nid)
				{
//console.log( node.attr('title') );
					res = true;
				}
			}
		}
	);//---------------------- end each

	return res;
}//----------------------------end func

//--------------------------------------- test exist file
//синхронный запрос к серверу для проверки наличия файла книги на сервере
function is_exists_book( url )
{
	var res = false;
    $.ajax({
    	url: url,
	    type:'HEAD',
	    //type:'GET',
		async:false,
		response:'text',//тип возвращаемого ответа text либо xml
		success:function(data,status)
			{
console.log("status - " + status);
				res = true;
			},
		error:function(data, status, errorThrown)
			{
//console.log("data - " + data);
console.log("status - " + status);
//console.log("errorThrown - " + errorThrown);
			},
		timeout:500//таймаут запроса
	});

//console.log("2.res - " + res);
	return res;
}//----------------------------end func


//асинхронный запрос к серверу для проверки наличия файла книги на сервере и вывода кода ссылки
function test_exists_book( url, html, type_request )
{
    $.ajax({
    	url: url,
	    type:type_request,
		async:true,
		response:'text',//тип возвращаемого ответа text либо xml
		 complete: function(xhr, status) 
			{
			}, 
		success:function(data,status)
			{
console.log("status - " + status +", url - " + url);
				$("#view-node-content .node-url").append( html );
			},
		error:function(data, status, errorThrown)
			{
//console.log("data - " + data);
console.log("status - " + status +", url - " + url);
//console.log("errorThrown - " + errorThrown);
			},
	});

}//----------------------------end func


function list_taxonomy_alpha() 
{
	var vocabulary_name = "alphabetical_voc";
	var vocabulary_vid = 0;
	$(xml_data).find("table_taxonomy_vocabulary").find('item').each(function()
	{
		var item = $(this);
		if ( item.children('name').text() == vocabulary_name )
		{
			vocabulary_vid = item.attr('vid');
		}
	});//---------------------- end each
//console.log("vocabulary_vid = " + vocabulary_vid);

	var html = "";
	$(xml_data).find("table_taxonomy_term_data").find('termin').each(
		function()
		{
			var item = $(this);
			if ( item.attr('vid') == vocabulary_vid )
			{
				var tid = item.attr('tid');
				$(xml_data).find("table_taxonomy_term_hierarchy").find('termin').each(
					function()
					{
						var item2 = $(this);
						if ( item2.attr('tid') == tid && item2.attr('parent') == 0 )
						{
//console.log("child name = " + item.children('name').text() );
							var termin = list_child_termins( vocabulary_vid, tid, 0, taxonomy_alpha_tpl_url );
							html += taxonomy_alpha_tpl
							.replace( /#classname/g, "termin-" + item.attr('tid') )
							.replace( /#termin/g, termin);
						}
					}
				);//---------------------- end each
			}
		}
	);//---------------------- end each

	return html;
}//----------------------------end func


//function read_termins( xml_file )
function read_termins()
{
/*
	$.ajax({
		type: "GET",
		url: xml_file,
		dataType: "xml",
		success: function(xml){
			xml_data = xml;
*/
		$("#busy").show();
		var exec_start = new Date();

//----------------------------- list vocabulary library termins
		var exec_start = new Date();
			var html = list_voc_library(0);	
			$(".vocabulary-library").html( html );	
		var exec_end = new Date();
		var runtime_ms = exec_end.getTime() - exec_start.getTime();
		$("#busy .message").append('parse vocabulary library done, runtime: ' + (runtime_ms / 1000) + ' sec' + '<br>');

			setTimeout(function() {
				$("#busy").hide();
			}, 5*1000); 
/*
		}
	});
*/
}


function list_voc_library( recourse ) 
{
	var vocabulary_name = "library";
	var vocabulary_vid = 0;
	$(xml_data).find("table_taxonomy_vocabulary").find('item').each(function()
	{
		var item = $(this);
		if ( item.children('name').text() == vocabulary_name )
		{
			vocabulary_vid = item.attr('vid');
		}
	});//---------------------- end each
//console.log("vocabulary_vid = " + vocabulary_vid);
	var html = "";
	$(xml_data).find("table_taxonomy_term_data").find('termin').each(
		function()
		{
			var item = $(this);
			if ( item.attr('vid') == vocabulary_vid )
			{
				var tid = item.attr('tid');
				$(xml_data).find("table_taxonomy_term_hierarchy").find('termin').each(
					function()
					{
						var item2 = $(this);
						if ( item2.attr('tid') == tid && item2.attr('parent') == 0 )
						{
//console.log("child name = " + item.children('name').text() );

							var url = index_page+"?action=get-taxonomy-nodes&tid="+ item.attr('tid');
							var link_title = item.children('name').text();
							var termin = voc_library_tpl_url
							.replace( /#url/g, url)
							.replace( /#link-title/g, link_title);

							var child_termins = list_child_termins( vocabulary_vid, tid, recourse, voc_library_tpl_url );
							termin += voc_library_tpl
							.replace( /#classname/g, "child-termins-" + item.attr('tid') )
							.replace( /#termin/g, child_termins);

							html += voc_library_tpl
							.replace( /#classname/g, "termin-" + item.attr('tid') )
							.replace( /#termin/g, termin);

						}
					}
				);//---------------------- end each
			}
		}
	);//---------------------- end each
	return html;
}//----------------------------end func

		
function list_child_termins( vid, tid, recourse, template_termin_url )
{
	var html = "";
	$(xml_data).find("table_taxonomy_term_hierarchy").find('termin').each(
		function()
		{
			var item = $(this);
			if ( item.attr('parent') == tid )
			{
//console.log("child terminn tid = " + item.attr('tid') );
				html += get_termin_name( item.attr('tid'), template_termin_url );
				if ( recourse == 1)
				{
					//html += list_child_termins( vid, item.attr('tid'), 1, template_termin_url );
					var child_termins = list_child_termins( vid, item.attr('tid'), 1, template_termin_url );
					if ( child_termins.length > 0)
					{
						html += voc_library_tpl
						.replace( /#classname/g, "child-termins-" + item.attr('tid') )
						.replace( /#termin/g, child_termins);
					}
				}

			}
		}
	);//---------------------- end each

	return html;
}//----------------------------end func

function get_termin_name( tid, template_termin_url )
{
	var html = "";
	$(xml_data).find("table_taxonomy_term_data").find('termin').each(
		function()
		{
			var item = $(this);
			if ( item.attr('tid') == tid )
			{
//console.log("child termin name = " + item.children('name').text() );
				var url = index_page+"?action=get-taxonomy-nodes&tid="+ item.attr('tid');
				var link_title = item.children('name').text();
				html += template_termin_url
				.replace( /#url/g, url)
				.replace( /#link-title/g, link_title);
			}
		}
	);//-------------- end each

	return html;
}//----------------------------end func

