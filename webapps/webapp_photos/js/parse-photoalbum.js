//------------------------- init vars
var xml_file = "xml/photoalbum.xml";
//var test = 1;
var xml_data;
var delimiter = " > ";
var node_per_page = 5;

//html templates
var slider_tab_tpl;
var slide_tpl;
var list_albums_tpl;
var pager_tpl;
var view_album_tpl;
var view_photo_tpl;
var list_photoalbums_tpl;
var related_pages_tpl;

//--- определить расположение файлов фотографий
var photoalbum_fs_path = "clouds/google_drive/photos";
var photoalbum_alias = "photoalbum";
var content_location = "";
//var content_location = "../.."; //если скрипт парсинга находится внутри фотоальбома

if (navigator.userAgent.indexOf ('Windows')!= -1) 
{

	if (window.location.protocol == "file:")
	{
		var content_location = "file:///F:/" + photoalbum_fs_path;
	}
}
if (navigator.userAgent.indexOf ('Linux')!= -1) 
{
	if (window.location.protocol == "file:")
	{
		var content_location = "file:///mnt/terra/" + photoalbum_fs_path;
	}
}

if (window.location.protocol == "http:")
{
	var content_location = "http://"+ window.location.host;
}


var strpos = window.location.href.indexOf("googledrive"); 
if ( strpos !=-1 ) 
{
	var content_location = "https://googledrive.com/host/0B0l5s_9HQLzzTnpfZDJGcUp5UUk/"; //google drive site, folder /photos
}
//-----------------------------------------

	function load_xml( xml_file )
	{
		$("#log").show();
		var log_message = "<p class='ok'>Load '"+ xml_file +"'</p>";
		$("#log .message").append( log_message );

		$.ajax({
			type: "GET",
			url: xml_file,
			dataType: "xml",
			success: function(xml, status)
			{
//console.log("Status - " + status);
//console.log("data - " + data);					
				xml_data = xml;

				var log_message = "<p class='ok'>Load " + status +", parse XML, wait...</p>";
				$("#log .message").append( log_message );

				var exec_start = new Date();
//------------------------- num-info
	var num_albums = $(xml_data).find("nodes").find("node").length;
	var num_photos = $(xml_data).find("photos").find("photo").length;
	var num_fphotos = $(xml_data).find("filename_info").find("filename_photo").length;
	var num_photos = num_photos + num_fphotos;
	var date_update = $(xml_data).find("photoalbum").attr('date-update');

$(".num-albums").text( num_albums );
$(".num-photos").text( num_photos );
$(".date-update").text( date_update );
//-------------------------
				form_slides();
				init_slider();

				var exec_end = new Date();
				var runtime_ms = exec_end.getTime() - exec_start.getTime();
				var log_message = "<p class='ok'>XML parsing done, runtime: " + (runtime_ms / 1000) + " sec </p>";
				$("#log .message").append( log_message );

				setTimeout(function() {
					$("#log").hide();
				}, 5*1000); 

			},
			error:function (XMLHttpRequest, textStatus, errorThrown) 
			{
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
				var log_message = "<p class='error'>function load_xml( "+xml_file+" ), " + textStatus +", "+errorThrown +"</p>";
				$("#log .message").append( log_message );
			}
		});


	}//------------------------- end func

function form_slides()
{
	var html = "";
	var html_ch ="";
	var num=0;
	$(xml_data).find("taxonomy_vocabulary").find('termin').each(function()
		{
			var termin = $(this);
			if ( termin.attr('parent') == '0' )
			{
				html += slider_tab_tpl
.replace(/#tab-title/g, termin.children('term_name').text() )
.replace(/#slide/g, "#" + num )
.replace(/#tid/g, "tid-" + termin.attr('tid') )
.replace(/#parent/g, "parent-" + termin.attr('parent') )
.replace(/tab-tpl/g, "tab" + (num+1) );

				//получить дочернии термины
				if (termin.children('termin').length > 0)
				{
					html_ch = get_child_termins( termin.attr('tid') );
					if (html_ch != "undefined")
					{
						html_ch = slide_tpl
.replace(/#slide/g, html_ch )
.replace(/#num/g, (num + 1) );
						$('#slide_tpl').append( html_ch );
					}
				}

				num++;
			}//------------- end if

		}
	);//---------------------- end each

	if (html != "undefined")
	{
		//$(block).html( html ).show();
		//$('#taxonomy_vocabulary').empty();
		$('#slides .tabs').append( html );
	}

	//------------------------------------- добавить слайд со списком страниц подшивки
	html = get_book_pages();
	$('#list-photoalbums-tpl').html( html );
}//------------------------- end func


function get_child_termins( parent_tid )
{
	var html_termins = "";
	$(xml_data).find('termin').each(
		function()
		{
			var termin = $(this);
			if (termin.attr('parent') == parent_tid)
			{
				html_termins += "<li class='termin parent-" + termin.attr('parent') + "'>";

				var termin_name = termin.children('term_name');
				if (termin_name.length)
				{
html_termins += "<a href='list_albums.html?tid="+ termin.attr('tid')+ "' " 
+ " class='list_albums-link' >" 
+ termin_name.text() + "</a>";
				}

				if (termin.children('termin').length > 0)
				{
					html_termins += get_child_termins( termin.attr('tid')); //получить дочернии термины
				}

				html_termins += "</li>";
			}//------------------------------------- end if

		}//---------------------------------- end func
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
	}//------------------------------------- end if

	return html;	
}//-------------------------------- end func


function list_albums( link )
{

	var tid = getenv( $(link).attr('href'),"tid" );	
//console.log('tid = ' + tid);
	var num_page = getenv( $(link).attr('href'),"num_page" );
//console.log('num_page = ' + num_page);

	//------------------------------- получить дочернии термины
	var html = "";
	html += get_child_termins( tid );
	if (html.length > 0)
	{
		$('#related-albums-ins').html( html );
		$('.child-albums').show();
	}
	else
	{
		$('.child-albums').hide();
	}

	//-------------------------------
	var html = "";
	if (num_page)
	{
		html += get_list_albums( tid, num_page ); //получить ноды термина постранично
	}
	else
	{
		html += get_list_albums( tid, 0); //получить все ноды термина
	}
	$("#list-albums-tpl").html( html );
			//--------------------------
			$('.zoom-img').elevateZoom({
				//zoomType: "inner",
				//cursor: "crosshair",
				//zoomWindowFadeIn: 500,
				//zoomWindowFadeOut: 750,
scrollZoom : true,

				//zoomWindowPosition: 12, 
				//zoomWindowOffetx: 10

				zoomType : "lens",
				lensShape : "round",
				lensSize : 300,
//zoomWindowWidth:300, 
//zoomWindowHeight:300

			}); 


	//--------------------------------- breadcrumb
	var breadcrumb = new Array("главная");
	$( xml_data ).find("taxonomy_vocabulary").find('termin').each(
		function()
		{
			var termin = $(this);
			if (termin.attr('tid') == tid)
			{
				var termin_name = termin.children('term_name').text();
				breadcrumb.push (termin_name);
			}//------------------------------------- end if
		}
	);//----------------------------------- end each


	var html = "";
	for (n1=0; n1 < breadcrumb.length; n1++)
	{
		if (n1==0)
		{
			html += "<a href='#' class='home'>" + breadcrumb[n1] + "</a>";
		}
		else
			html += delimiter + breadcrumb[n1];
	}
	$('#breadcrumb .breadcrumb-links').html( html );

}//------------------------------------------- end func


function get_list_albums( tid, num_page )
{
	var html = "";
	var node_count=0;
	var photos_count=0;
	//---------------------------------
	var start_pos = ( num_page * node_per_page )+1;
//console.log('start_pos = ' + start_pos);

	//var end_pos = (num_page+1) * node_per_page; 
	var end_pos = ( start_pos + node_per_page )-1;
//console.log('end_pos = ' + end_pos);
	//---------------------------------

	$(xml_data).find('nodes').find('node').each(
		function()
		{
			var node = $(this);
			var term_node = node.children('term_node');

			//поиск совпадения среди терминов ноды
			var view_node = 0;
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

				var photos = node.children('photos').children('photo');
				var photos_length = photos.length;
				//---------------------
				var filename = photos.eq(0).children('filename').text();
				if ( photos.length == 0 )
				{
					var files = get_photos( node.attr('nid') );
					var photos_length = files.length;
					var filename = files[0];
				}
				//---------------------
				photos_count = photos_count + photos_length;

			if (node_count >= start_pos)
			{
				if (node_count <= end_pos)
				{
					var html_related_termins = get_related_termins( term_node,tid );
					var paths = get_paths_photo( node.attr('nid') );
					var preview_img = paths[ "preview_img" ];
					var big_img = paths[ "big_img" ];
					var original_img = paths[ "original_img" ];
					var photo_src = content_location + preview_img + "/" + filename;
					var zoom_src = content_location + big_img + "/" + filename;

					html += list_albums_tpl
				.replace(/#nid/g, "nid-" + node.attr('nid') )
				.replace(/#album-num/g, node_count )
.replace(/#album-link/g, "view_album.html?nid=" + node.attr('nid') + "&tid=" + tid)
				.replace(/#css_class/g, "view-album-link" )
				.replace(/#album-title/g, node.attr('title') )
				.replace(/#tags/g, html_related_termins )
				.replace(/#photo-src/g, photo_src )
				.replace(/#zoom-img/g, zoom_src )
				.replace(/#img-alt/g, node.attr('title') )
				.replace(/#total-photo/g, photos_length );

				}//----------------------- end if pager end
			}//----------------------- end if pager start

			}
			

		}//---------------------------------- end func
	);//----------------------------------- end each

	$('#nodes-count').html(node_count);
	$('#photos-count').html(photos_count);

//----------------------------- pager
	if (node_count > node_per_page)
	{
//console.log ("2.node_count - " + node_count);
//console.log ("2.node_per_page - " + node_per_page);
//console.log ("2.num_page - " + num_page);
		html_pager = get_pager( node_count, tid, num_page );
		if (html_pager.length > 0)
		{
			$('.pager').show();
			$('.top-pager ul').html( html_pager );
			$('.bottom-pager ul').html( html_pager );
		}
	}
	else
	{
		$('.top-pager ul').empty();
		$('.bottom-pager ul').empty();
		$('.pager').hide();
	}
//-----------------------------------
	return html;	
}//------------------------------------------- end func

function get_related_termins ( term_node, tid )
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

		html += "<li><a href='list_albums.html?tid=" 
+ term_node.eq(n1).attr('tid') + "' "
+ "class='list_albums-link' >" 
+ term_name + "</a></li>";
	}
	
	html += "</ul>";
	html += "</div>";
	return html;	
}//------------------------------------------- end func

function view_album (link )
{
	var nid = getenv( $(link).attr('href'),"nid" );
	var tid = getenv( $(link).attr('href'),"tid" );
	var mlid = getenv( $(link).attr('href'),"mlid" );
//console.log("mlid = " + mlid );
	var html="";
	var html_related_termins="";
	var html_photos="";
	var html_children_pages = "";
	var html_related_pages = "";

	$(xml_data).find('nodes').find('node').each(
		function()
		{
			var node = $(this);
			if (node.attr('nid') == nid)
			{
				var term_node = node.children('term_node');
				html_related_termins = get_related_termins( term_node, tid );
//------------------------ получить список дочерних страниц подшивки
if (mlid)
{
//console.log("2.mlid = " + mlid );
	html_children_pages = get_book_page( mlid );
}
//-------- если альбом явл-ся страницей подшивки, то получить ссылки перехода по подшивке
if (nid)
{
	html_related_pages = get_related_pages( nid );
//console.log ("html_related_pages.length - " + html_related_pages.length);
}
//-------------------------
				var photos = node.children('photos').children('photo');
				var photos_length = photos.length;
				//---------------------
				if ( photos.length == 0 )
				{
					var files = get_photos( node.attr('nid') );
					var photos_length = files.length;
				}
				//---------------------

				for (n1=0; n1 < photos_length; n1++)
				{
					//---------------------
					var photo_title =  n1 + 1 ;
					if ( photos.length == 0 )
					{
						var filename = files[n1];
						//----------- get photo title
						var strpos = filename.indexOf("#"); 
						if ( strpos !=-1 ) 
						{ 
							var fname = filename.substring( 0, filename.lastIndexOf("#") );
//console.log('fname = ' + fname);
photo_title = filename.substring( filename.lastIndexOf("#") + 1, filename.length );
//console.log('photo_title = ' + photo_title);
							filename = fname;
						}
						//---------------------------
					}
					else
					{
						var filename = photos.eq(n1).children('filename').text();
					}
					//---------------------

					var paths = get_paths_photo( node.attr('nid') );
					var preview_img = paths[ "preview_img" ];
					var big_img = paths[ "big_img" ];
					var original_img = paths[ "original_img" ];
					var photo_src = content_location + preview_img + "/" + filename;
					var photo_url = content_location + big_img + "/" + filename;
					var org_photo_url = content_location + original_img + "/" + filename;
					html_photos += view_photo_tpl
.replace(/#photo-link/g, photo_url )
.replace(/#org-photo-link/g, org_photo_url )
.replace(/#photo-title/g, photo_title )
.replace(/#img-alt/g, photo_title )
.replace(/#css_class/g, "pirobox" )
.replace(/#img-nid/g, node.attr("nid") )
.replace(/#img-num/g, n1 )
.replace(/#photo-src/g, photo_src );
				}//--------------------- end for

				html = view_album_tpl
.replace(/#album-title/g, node.attr('title') )
.replace(/#total-photo/g, photos_length )
.replace(/#tags/g, html_related_termins )
.replace(/#children-pages/g, html_children_pages )
.replace(/#related-pages/g, html_related_pages )
.replace(/#body/g, node.children('body').text() )
.replace(/#photos/g, html_photos );

			}//---------------------------------- end if
			
		}//---------------------------------- end func
	);//----------------------------------- end each

	$('#view-album-tpl').html( html );
//----------------------------
$("#photo-page .children-pages").hide();
if ( html_children_pages.length > 0 )
{
	$("#photo-page .children-pages").show();
}
$(".related-pages").hide();
if ( html_related_pages.length > 0 )
{
	$(".related-pages").show();
}
//----------------------------

	jQuery().piroBox({
		my_speed: 300, //animation speed
		bg_alpha: 0.1, 
		slideShow : true,
		slideSpeed : 6, 
		close_all : ".piro_close,.piro_overlay" 
	});

}//------------------------------------------- end func


function get_pager( all_node_count, tid, num_page)
{
	var num_pages = Math.ceil(all_node_count / node_per_page);
//console.log ('num_pages = ' + num_pages);
//console.log ('num_page = ' + num_page);

	var html = "";
	for (n1=0; n1 < num_pages; n1++)
	{
		var view_num_page = n1+1;
		if (n1 == num_page)
		{
			html += pager_tpl
.replace(/#page-link/g, "#")
.replace(/#css_class/g, "list_albums-link active")
.replace(/#num-page/g, view_num_page );
		}
		else
		{
			html += pager_tpl
.replace(/#page-link/g, "list_albums.html?tid="+ tid +"&num_page=" + n1 )
.replace(/#css_class/g, "list_albums-link")
.replace(/#num-page/g, view_num_page );

		}
	}

	if (html.length > 0)
	{
		return html;	
	}

}//------------------------------------------- end func


function get_paths_photo ( nid )
{
	var paths={};
	$(xml_data).find('path_photos').find('paths').each(
		function()
		{
			if ( $(this).attr('nid') == nid)
			{
				paths["preview_img"] = $(this).children('preview_img').text();
				paths["big_img"] = $(this).children('big_img').text();
				paths["original_img"] = $(this).children('original_img').text();
			}
		}//----------- end func
	);//------------------ end each

	return paths ;
}//----------- end func

function get_photos ( nid )
{
	var files= new Array();
	$(xml_data).find('filename_photo').each(
		function()
		{
			if ( $(this).attr('nid') == nid)
			{
				files.push ( $(this).attr('value') );
			}
		}//----------- end func
	);//------------------ end each

	return files;
}//----------- end func


//----------------- init slider
function init_slider()
{
	$('#slides').slides({
		preload: false,
		preloadImage: 'images/loading.gif',
		generatePagination: false,
		play:0,
		pause: 3500,
		hoverPause: true,
		start: 1,
		animationComplete: function(current){
			// Set the slide number as a hash
			//window.location.hash = '#' + current;
		},
		animationStart: function() {
		},
	});
}//----------- end func


		
function get_exif_info( img_id )
{
	$("#img-exif-info span").empty();

	var img_src = $(img_id).attr("href");
//console.log("img_src = " + img_src);

	var http = new XMLHttpRequest();
	http.open("GET", img_src, true);
	http.responseType = "blob";
	http.onload = function(e) {
	if (this.status === 200) {
	    var image = new Image();
	    image.onload = function() {
		EXIF.getData(image, function() {

//alert(EXIF.pretty(this));
			var ImageDescription = EXIF.getTag(this, "ImageDescription");
			var make = EXIF.getTag(this, "Make");
			var model = EXIF.getTag(this, "Model");
			//var XResolution = EXIF.getTag(this, "XResolution");
			//var YResolution = EXIF.getTag(this, "YResolution");
			var DateTime = EXIF.getTag(this, "DateTime");
			var DateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
			//var DateTimeDigitized = EXIF.getTag(this, "DateTimeDigitized");
			var PixelXDimension = EXIF.getTag(this, "PixelXDimension");
			var PixelYDimension = EXIF.getTag(this, "PixelYDimension");

var id = "#img-exif-info";
			$( id + " .ImageDescription").html( ImageDescription );
			$( id + " .make").html( make );
			$( id + " .model").html( model );
			//$( id + " .XResolution").html( XResolution );
			//$( id + " .YResolution").html( YResolution );
			$( id + " .DateTime").html( DateTime );
			$( id + " .DateTimeOriginal").html( DateTimeOriginal );
			//$( id + " .DateTimeDigitized").html( DateTimeDigitized );
			$( id + " .PixelXDimension").html( PixelXDimension );
			$( id + " .PixelYDimension").html( PixelYDimension );


		});
	    };
	    image.src = URL.createObjectURL(http.response);

	}
	};
	http.send();

	$("#img-exif-info").show();

}//----------- end func


//получить список страниц подшивки
function get_book_pages()
{
	var html = "";
	html = get_book_page(0);//получить страницу вместе с дочерними элементами
	return html;
}//----------- end func

function get_book_page( plid )
{
	var html = "";
	var children_pages_html = "";
	$(xml_data).find("book_pages").find("book_page").each(
		function()
		{
			var page = $(this);
			if ( page.attr("plid") == plid )
			{
				if ( page.attr("has_children") == 1 )
				{
//console.log("nid " +page.attr("nid")+ " has_children!");
					children_pages_html = get_book_page( page.attr("mlid") );
				}
				html += list_photoalbums_tpl
.replace(/#page-title/g, page.attr("link_title") )
.replace(/#url/g, "view_album.html?nid="+ page.attr("nid")  + "&mlid=" + page.attr("mlid") )
.replace(/#children-pages/g, children_pages_html );
				children_pages_html = "";
			}
		}//----------- end func
	);//------------------ end each

	return html;
}//----------- end func


function get_related_pages( nid )
{
	var html = related_pages_tpl;
	var mlid, plid;
	var children_pages = new Array();

	var test_is_book_page = false;
	$(xml_data).find("book_pages").find("book_page").each(
		function()
		{
			var page = $(this);
			if ( page.attr("nid") == nid )
			{
				mlid = page.attr("mlid");
				plid = page.attr("plid");
				test_is_book_page = true;
			}
		}//----------- end func
	);//------------------ end each

	if (!test_is_book_page)
	{
		return "";
	}


	$(xml_data).find("book_pages").find("book_page").each(
		function()
		{
			var page = $(this);
			//получить родительскую страницу
			if ( page.attr("mlid") == plid )
			{
//console.log("parent_page = " + page.attr("link_title") );
				html = html.replace(/#parent-page-title/g, page.attr("link_title") )
.replace(/#parent-page-url/g, "view_album.html?nid="+ page.attr("nid")  + "&mlid=" + page.attr("mlid") );
			}

			//получить дочернии страницы
			if ( page.attr("plid") == plid )
			{
				children_pages.push( page.attr("nid") );
			}
		}//----------- end func
	);//------------------ end each

	//определить левую и правую ссылку в блоке нвагации по подшивке
	for ( n1=0; n1 < children_pages.length; n1++)
	{
		if ( children_pages[n1] == nid )
		{
			var num_left_page = n1-1;
			if ( num_left_page < 0 )
			{
				num_left_page = 0;
			}
			var nid_left_page = children_pages[num_left_page];

			var num_current_page = n1;

			var num_right_page = n1+1;
			if ( num_right_page >= children_pages.length )
			{
				num_right_page = 0;
			}
			var nid_right_page = children_pages[num_right_page];
		}
	}
//console.log(children_pages);
//console.log("num_left_page = " + num_left_page + ", nid = " + nid_left_page);
//console.log("num_current_page = " + num_current_page);
//console.log("num_right_page = " + num_right_page + ", nid = " + nid_right_page);

	$(xml_data).find("book_pages").find("book_page").each(
		function()
		{
			var page = $(this);
			//добавить код ссылок на соседнии страницы подшивки
			if ( page.attr("nid") == nid_left_page )
			{
				html = html.replace(/#left-page-title/g, page.attr("link_title") )
.replace(/#left-page-url/g, "view_album.html?nid="+ page.attr("nid")  + "&mlid=" + page.attr("mlid") );
			}
			if ( page.attr("nid") == nid_right_page )
			{
				html = html.replace(/#right-page-title/g, page.attr("link_title") )
.replace(/#right-page-url/g, "view_album.html?nid="+ page.attr("nid")  + "&mlid=" + page.attr("mlid") );
			}

		}//----------- end func
	);//------------------ end each


	return html;
}//----------- end func



