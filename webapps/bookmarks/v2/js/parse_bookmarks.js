//------------------- html templates
var url_tpl ="<a href='#uri' data-param-tags='#tags' target='_blank'>#title_filter</a>";
var annos_tpl ="<div class='annos'>#annos</div>";
var tags_tpl ="<ul class='tags nav nav-pills'>#tags</ul>";
var tags_tpl_item ="<li><a class='tags-link' href='#'>#tag</a></li>";

var tags_arr = [];

$(document).ready(function() {
	var json_filename = $("input[name=filename]").val();
	load_json( json_filename );

	$('.bookmarks-group-title').live('click',
		function()
		{
//console.log('id = ' + $(this).attr('id'));
//$(this).addClass('hidden-group');
//$(':focus').addClass('current-group');

			var bookmarks_title = $(this).attr('id');
			var bookmarks_group = bookmarks_title.replace("title","group");

			$('#'+bookmarks_group).toggle();
			if ( $('#'+bookmarks_group ).is(":visible") )
			{
//console.log("bookmarks_group - " + bookmarks_group);
				$('#'+bookmarks_title +' span').text(" -");
			}
			else
			{
				$('#'+bookmarks_title +' span').text(" +");
			}

			return false;
		}
	);

	$("input[name=action]").click(
		function()
		{
			$('#insert_json').empty();
			var json_filename = $("input[name=filename]").val();
			load_json( json_filename );

			$("#tags").empty();
			tags_arr.length=0;
			if ( tags_arr.length > 0)
			{
				view_tags();
			}
			return false;
		}
	);
	
	$(".tags-link").live("click", function(e) {
			search_tags( $(this).text() );
			$("#tagsModal").modal("show");
			e.preventDefault();
		}
	);
	
/*
		var url = "get_url.php";
		//var url = "http://it-works.tw1.ru/php/get_url.php";
		//var url = "get_url.html";
		//var url = "https://drive.google.com/folderview?hl=ru&id=0B0l5s_9HQLzzTzBfTzFtRVVyNlU#list";

		$.ajax({
			type: "get",
			//dataType: 'text',
			dataType: 'html',
			//dataType: 'json',
			//dataType: 'jsonp',			
			//dataType: 'xml',
			//jsonp: 'callback',
			url: url,
			//username: 'user',
			//password: 'pass',
			//crossDomain : true,
			//xhrFields: {
				//withCredentials: true
			//}
			success:function (data)
					{	
console.log("success !");
					},
			error:function( xhr, textStatus, errorThrown )
				{
console.log("error");
				}
		})
		.done(function( data ) {
console.log("Done!");
//console.log("data: " + data);
$("#siteLoader").html(data);
		  })
		.fail( function(xhr, textStatus, errorThrown) {
alert(xhr.responseText);
alert(textStatus);
		});

*/ 

//===================================
/*
	$("#get-list").click(
		function()
		{
			var url = $(this).attr("href");
			load_content_frame(url);
			return false;
		}
	);
*/

//--------------------------
	$('.top').click(function (e) {
	  e.preventDefault();
	  $('html,body').animate({scrollTop: $('#top').offset().top-150}, 400);
	});
	
});//end ready

/*
function load_content_frame(url)
{
//   alert (frames[0].document.body.innerHTML);
     document.all.content_frame.src=url;
}
*/

function load_json( json_filename )
{

	$('#insert_json').empty();
	var s = "";
	$.getJSON("db/"+json_filename,function(data)
		{
//console.log(JSON.stringify(data)); 
			for (var item in data){
				if (typeof data[item]=='object')
				{
					s += view_children(data[item]);
				}
				else
				{
//----------------------------------------
/*
if (item == 'dateAdded')
{
//http://forum.ru-board.com/topic.cgi?forum=31&topic=15956
//http://likbezz.ru/forum/72-833-1
//s += "unixtime - " + timestamp2date(1233394606);
//s += "toGMTString() - " + timestamp2date(1383534005);
s += "dateAdded - " + timestamp2date_locale(1396696524);
s += ", ";
//1383534005440590
//1396696524617426
s += "dateAdded - " + data[item];
s += ", ";
}
if (item == 'lastModified')
{
s += "lastModified - " + timestamp2date_locale(1383542352);
s += ", ";
//1383542352983684
s += "lastModified - " + data[item];
}
*/
//----------------------------------------			

	s += "<div class='info'><b>" + item + "(<small>" + typeof data[item] + "</small>)</b>: " + data[item] + "</div>";

				}
			}
			
			if (s != "")
			{
				$('#insert_json').html(s);
				$("#title-2").after(" (" + json_filename + ")");
			}
			else
			{
				$('#insert_json').html("<h2>error, not found bookmarks....</h2>");
			}
//----------------------------- tags
			if ( tags_arr.length > 0)
			{
				view_tags();
			}

		}
	);
}//------------ end func

function timestamp2date(timestamp) { 
    var theDate = new Date(timestamp * 1000); 
    return theDate.toGMTString(); 
}

function timestamp2date_locale(timestamp) { 
    var theDate = new Date(timestamp * 1000); 
    return theDate.toLocaleString(); 
}

function view_children(obj)
{
//console.log(JSON.stringify(obj)); 
	var html="";
//console.log(JSON.stringify(obj)); 


	for (var item in obj){
//html += "type:" + obj['type'];
//html += "<br>";
//console.log('item = '+ item); 
		if (typeof obj[item]=='object')
		{

			if (obj['type']=='text/x-moz-place-container')
			{
				if (item != 'annos')//искл. описание папки 
				{
html += "<ul style='display:none;' class='bookmarks-group' id='group-" + obj['id'] + "'>";
html += view_children(obj[item]);
html += "</ul>";
				}
//------------------- вывод описания папки
				else
				{
//console.log(JSON.stringify( obj["annos"][0]["name"] ) );
					if ( obj["annos"][0]["name"] == "bookmarkProperties/description" && 
							obj["annos"][0]["value"]) 
					{
						html += "<div class='annos'>";
						html += obj["annos"][0]["value"];
						html += "</div>";
					}
				}
//-------------------
			}
			else
			{
				html += view_children(obj[item]);
			}

		}
		else //text/x-moz-place
		{
			if (obj['type']!='text/x-moz-place-separator')
			{
				if (item == 'title')
				{
					if (obj['uri'] != undefined)
					{
			
		var title = obj['title'];
		//----------------------------------------------
		var title_filter = title.replace("<","&lt");				
		title_filter = title_filter.replace(">","&gt");				
		//if (obj['uri']=='http://www.drupal.ru/node/62561')
		//{
		//console.log(title_filter);
		//}
		//----------------------------------------------
						html += "<li>";
/*
						html += "<a href='";
						html += obj['uri'];
						html += "' target='_blank'>";
						html += title_filter;
						html += "</a>";
*/
						var html_url = url_tpl
.replace( "#uri", obj['uri'] )
.replace( "#title_filter", title_filter );
						//------------------ описание ссылки
						if ( obj["annos"] != undefined && 
								obj["annos"][0]["name"] == "bookmarkProperties/description" &&
									obj["annos"][0]["value"]) 
						{
//console.log(JSON.stringify( obj["annos"][0]["name"] ) );
							var html_annos = annos_tpl.replace( "#annos", obj["annos"][0]["value"] );
						}
						else
						{
							var html_annos = "";
						}

						//------------------- метки
						if ( obj["tags"] != undefined ) 
						{
							if( typeof tags_arr.indexOf === "function"){//IE6 not support array.indexOf
								html_url = html_url.replace( "#tags", "1" );

								var tags = obj["tags"].split(",");
								var html_tags = "";
								for (var item in tags ){
									//save tag in array
										
									if ( tags_arr.indexOf( tags[item] ) == -1 ){
										tags_arr.push( tags[item] );
									}
									//form tag html
									html_tags += tags_tpl_item.replace( "#tag", tags[item] );
								}
								html_url += tags_tpl.replace( "#tags", html_tags );
							}
						}
						else
						{
							html_url = html_url.replace( "#tags", "0" );
						}

						html += html_url;
						html += html_annos;
						html += "</li>";
					}
					else
					{
html += "<div><a href='#' class='bookmarks-group-title' id='title-" + obj['id'] + "'><span>+</span> "+obj['title']+"</a></div>";
					}
				}
			}
		}
	}
	return html
}//--------------- end func

function view_tags()
{
	var html="";
	var html_tags = "";
	for (var item in tags_arr){
		html_tags += tags_tpl_item.replace( "#tag", tags_arr[item] );
	}
	html =tags_tpl.replace("#tags", html_tags) ;
	$("#tags").html( html );
	
}

function search_tags( keyword )
{
	$("#tagsModal #search-keyword").text( keyword );
	var html="";
	$("#insert_json a[data-param-tags='1']").each( function(){
		var test_obj = $(this).parent();
		$(test_obj).find(".tags-link").each(function(){
			if ( $(this).text() == keyword )
			{
				html += $(test_obj).html();
			}
		});
	});
	$("#tagsModal .modal-body").html( html );
}

