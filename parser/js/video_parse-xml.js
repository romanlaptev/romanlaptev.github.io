var xml_data = "";
var delimiter = " > ";
//var breadcrumbs = new Array("главная");
var node_per_page = 5;

// определить расположение файлов
	var test_url = window.location.href;
//console.log('test_url = ' + test_url);

	var strpos = test_url.indexOf("http://mycomp"); 
	if ( strpos !=-1 ) 
	{ 
//console.log('strpos = ' + strpos);
		var content_location = "";
	}
	else
		var content_location = "../..";
//console.log('content_location = ' + content_location);

/*
	var strpos = test_url.indexOf("https://googledrive.com"); 
	if ( strpos !=-1 ) 
	{ 
console.log('strpos = ' + strpos);
		var content_location = "../..";
//var content_location = "https://googledrive.com/host/0B0l5s_9HQLzzMW9KU05WZFhNRGs";
	}
*/
//-----------------------------------------


function load_xml(xml_file)
{
/*
	$.ajax ({
			type: "post",
			url: xml_file,
			dataType:"xml",
			//processData:false,
			success:function(data,status)
			{
console.log("status - " + status);
				xml_data = data;
				list_vocabulary();
			},
			error:function(data, status, errorThrown)
			{
console.log("status - " + status);
			}
		}
	);
*/
	$.get( xml_file,
		function(data)
		{
			xml_data = data;
			list_vocabulary();
		}
	);
}//---------------- end func

function list_vocabulary()
{
	var vocabulary = $(xml_data).find("vocabulary");
	var html = "";
	$(vocabulary).find('termin').each(
		function()
		{
			var termin = $(this);
			if (termin.attr('parent') == '0')
			{
				html += "<ul class='main-termin'>";
html += "<li id='termin-"+ termin.attr('tid') +"' class='termin parent-"+ termin.attr('parent') +"' </li>";
				html += "<h2>"+termin.attr('name')+"</h2>";
				html += get_child_termins( termin.attr('tid') ); //получить дочернии термины
				html += "</li>";
				html += "</ul>";
			}
		}
	);//----------------------------------- end each
	html += "</ul>";
	$('#taxonomy-vocabulary').empty();
	$('#taxonomy-vocabulary').append(html);

}//---------------- end func

function get_child_termins(parent_tid)
{
	var html_termins = "";
	$(xml_data).find('termin').each(
		function()
		{
			var termin = $(this);
			if (termin.attr('parent') == parent_tid)
			{
//console.log('termin tid = ' + termin.attr('tid'));
				html_termins += "<li class='termin parent-" + termin.attr('parent') + "'>";
				html_termins += "<a href='view_termin.html?tid="+termin.attr('tid')+"' id='url-"+termin.attr('tid')+"' onClick='view_termin(this, "+termin.attr('tid')+");return false;'>" + termin.attr('name') + "</a>";
				html += get_child_termins( termin.attr('tid') ); //получить дочернии термины
				html_termins += "</li>";
			}
		}
	);//----------------------------------- end each
//console.log ('html_termins length = ' + html_termins.length);
//console.log ('html_termins = ' + html_termins);
	if (html_termins.length > 0)
	{
		var html = "<ul class='child-termins'>";
		html += html_termins;
		html += "</ul>";
	}
	else
	{
		var html = "";
	}

	return html;	
}//-------------------------------- end func

//-----------------------------------------
//получить get-параметры из href ссылки
//-----------------------------------------
function getenv(href,name_var)
 {
	if (!href.length) 
		return false; 

	if (!name_var.length) 
		return false; 

	strpos = href.indexOf("?"+ name_var +"=");
	if (strpos ==-1) 
	{ 
		strpos = href.indexOf("&"+ name_var +"="); 
	}

	if ( strpos == href.length || strpos ==-1 )
	{
		return false; 
	}

	val = href.substring( (strpos + name_var.length) + 2, href.length);

	strpos = val.indexOf("&");
	if ( strpos !=-1 ) 
	{ 
		val = val.substring(0, strpos ); 
	}

	if ( !val.length ) 
	{ 
		return false; 
	}
	else 
	{ 
		return val; 
	}
}

function view_termin(link, tid)
{
	var html = "";

	var num_page = getenv($(link).attr('href'),"num_page");
console.log('num_page = ' + num_page);
console.log('tid = ' + tid);
	//-------------------------------

	html += get_child_termins(tid); //получить дочернии термины
	if (num_page)
	{
		html += get_nodes(tid, num_page); //получить ноды термина постранично
	}
	else
		html += get_nodes(tid, 0); //получить все ноды термина

	$('#taxonomy-vocabulary').hide();
	$('#nodes').html(html);
	//$('#nodes').show();
	
/*
//--------------------------------- breadcrumbs
	var breadcrumbs = new Array("главная");
	$(xml_data).find('termin').each(
		function()
		{
			var termin = $(this);
			if (termin.attr('tid') == tid)
			{
				var termin_name = termin.children('term_name').text();
				breadcrumbs.push (termin_name);
				//html_breadcrumbs += delimiter + termin_name;
			}//------------------------------------- end if
		}
	);//----------------------------------- end each


	var html_breadcrumbs = "";
	for (n1=0; n1 < breadcrumbs.length; n1++)
	{
		if (n1==0)
		{
			html_breadcrumbs += "<a href='#' class='home'>" + breadcrumbs[n1] + "</a>";
		}
		else
			html_breadcrumbs += delimiter + breadcrumbs[n1];
	}
	$('#breadcrumbs').html(html_breadcrumbs);
//--------------------------------------
*/

}//------------------------------------------- end func

function get_nodes(tid, num_page)
{
	var html = "<div class='related-nodes'>";
	var node_count=0;
	
//---------------------------------
	var start_pos = (num_page*node_per_page)+1;
//console.log('start_pos = ' + start_pos);

	var end_pos = (start_pos + node_per_page)-1;
//console.log('end_pos = ' + end_pos);
//---------------------------------

	$(xml_data).find('node').each(
		function()
		{
			var term_node = $(this);
console.log('nid = ' + term_node.attr('nid'));
console.log('length term_node= ' + term_node.length);
console.log('tid = ' + term_node.eq(0).attr('tid'));
console.log('text = ' + term_node.eq(0).text());
/*
			var view_node = 0;
			//поиск совпадения среди терминов ноды
			for (n1=0; n1 < term_node.length; n1++)
			{
				if (term_node.eq(n1).attr('tid') == tid)
				{
					view_node = 1;
				}
			}
			
			if (view_node == 1)
			{
				node_count++;

//console.log('2.start_pos = ' + start_pos);
//console.log('2.end_pos = ' + end_pos);

if (node_count >= start_pos)
{
	if (node_count <= end_pos)
	{
//console.log('node count = ' + node_count);
				html += "<div class='node' id='nid-" + node.attr('nid') + "'>";
				html += "	<b>альбом " + node_count + "</b> ";
				
				html += "	<a href='get_node.html?nid=" + node.attr('nid') + "' onClick='get_node(this,"+tid+");return false;'>";
				html += "		<h2>" + node.attr('title') + "</h2> ";
				html += "	</a>";
				
				html += get_related_termins(term_node,tid);

				html += "	<div style='clear:both'></div>";
				html += "</div>";

	}//----------------------- end if pager end
}//----------------------- end if pager start

			}
*/			
		}
	);//----------------------------------- end each


	$('#nodes-count').html(node_count);
	
/*
//----------------------------- pager
	if (node_count > node_per_page)
	{
//console.log ("2.node_count - " + node_count);
//console.log ("2.node_per_page - " + node_per_page);
//console.log ("2.num_page - " + num_page);
		html += get_pager(node_count,tid,num_page);
	}
//-----------------------------------
*/
	html += "</div>";
	
	return html;	
}//------------------------------------------- end func

function get_related_termins(term_node,tid)
{
	var html = "";
	html += "<div class='related_termins term-node'>";
	html += "<ul>";
	
	for (n1=0; n1 < term_node.length; n1++)
	{
		if (term_node.eq(n1).attr('tid') == tid)
		{
			var term_name = "<b>" + term_node.eq(n1).text() + "</b>";
		}
		else
			var term_name = term_node.eq(n1).text();

		html += "<li><a href='view_termin.html?tid="+term_node.eq(n1).attr('tid')+"' onClick='view_termin(this);return false;'>" + term_name + "</a></li>";
	}
	
	html += "</ul>";
	html += "</div>";
	return html;	
}//------------------------------------------- end func

function get_node(link,tid)
{
	var nid = $(link).attr('href').replace("get_node.html?nid=","");
//console.log('function get_node(),' + nid);
//console.log('xml_data = ' + xml_data);
console.log('tid = ' + tid);

	var html = "";
	$(xml_data).find('node').each(
		function()
		{
			var node = $(this);
			if (node.attr('nid') == nid)
			{
				html += '<h2>' + node.attr('title') + '</h2>';

				var term_node = node.children('term_node');
				html += get_related_termins(term_node,tid);

				var photos = node.children('photos').children('photo');
				html += "<p>всего фото: " + photos.length + "</p>";
				for (n1=0; n1 < photos.length; n1++)
				{
//console.log('photo-nid = ' + photos.eq(n1).attr('nid'));
					html += "<div class='photo' id='photo-nid-" + photos.eq(n1).attr('nid') + "'>";

					var filename = photos.eq(n1).children('filename').text();
					var preview_img = photos.eq(n1).children('preview_img').text();
					var big_img = photos.eq(n1).children('big_img').text();
					var original_img = photos.eq(n1).children('original_img').text();

//html += "<a href='#' onClick='' title='" + node.attr('title') + "'>";
//html += "<img src='" + content_location + preview_img + "/" + filename + "' alt='" + node.attr('title') + "'>";
//html += "</a>";

html += "<a href='" + content_location + big_img + "/" + filename + "' onClick='' title='" + node.attr('title') + "' ";
html += "class='pirobox'>";
html += "<img src='" + content_location + preview_img + "/" + filename + "' alt='" + node.attr('title') + "'>";
html += "</a>";
html += "<p class='resize'>";
html += "<a target='_blank' href='" + content_location + original_img + "/" + filename + "'>полный размер</a>";
html += "</p>";


					html += "</div>";
				}
				
			}//---------------------------------- end if
			
		}//---------------------------------- end func
	);//----------------------------------- end each

			
	$('#nodes').html(html);
	$('#nodes').show();

	jQuery().piroBox({
		my_speed: 300, //animation speed
		bg_alpha: 0.1, 
		slideShow : true,
		slideSpeed : 6, 
		close_all : ".piro_close,.piro_overlay" 
	});

}//------------------------------------------- end func


function get_pager(all_node_count,tid,num_page)
{
	var num_pages = Math.ceil(all_node_count / node_per_page);
//console.log ('num_pages = ' + num_pages);
//console.log ('num_page = ' + num_page);
 
	var html_pager = "";
	for (n1=0; n1 < num_pages; n1++)
	{
		var view_num_page = n1+1;
		if (n1==num_page)
		{
			html_pager += "<li><b>" + view_num_page +"</b></li>";
		}
		else
		{
html_pager += "<li><a href='view_termin.html?tid="+tid+"&num_page="+n1+"' onClick='view_termin(this);return false;'>" + view_num_page +"</a></li>";
		}
	}

//console.log ('html_pager.length = ' + html_pager.length);
	if (html_pager.length > 0)
	{
		var html = "<div class='pager'>";
		html += "	<ul>";
		html += "<b>страница: </b>";
		html += html_pager;
		html += "	</ul>";
		html += "</div>";
	}
	else
	{
		var html = "";
	}

	return html;	
}//------------------------------------------- end func


