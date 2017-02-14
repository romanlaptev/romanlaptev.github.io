$(document).ready(
function()
{
	$("#front-page").show();

	$("#list-page").hide();
	$('.child-albums').hide();
	$('.pager').hide();

	$("#photo-page").hide();

//------------------------- read templates
	slider_tab_tpl = $("#slides .tabs").html();
	$("#tab-tpl").remove();

	slide_tpl = $("#slide_tpl").html();
	$("#slide_tpl").empty();

	list_albums_tpl = $("#list-albums-tpl").html();
	$("#list-albums-tpl").empty();

	pager_tpl = $("#pager-tpl ul").html();
	$("#pager-tpl ul").empty();

	view_photo_tpl = $("#view-photo-tpl").html();
	$("#view-photo-tpl .photo-img").remove();
	view_photo_tpl = view_photo_tpl.replace(/#photos/g, "");


	list_photoalbums_tpl = $("#list-photoalbums-tpl").html();
	$("#list-photoalbums-tpl").empty();

	related_pages_tpl = $("#related-pages-tpl").html();
	$("#related-pages-tpl").empty();

	view_album_tpl = $("#view-album-tpl").html();
	$("#view-album-tpl").empty();

//-----------------------------------------
	load_xml( xml_file );


//-----------------------------------------
	$('.home').live('click', 
		function()
		{
			$("#front-page").show();
			$("#list-page").hide();
			$("#photo-page").hide();
		}
	);

	$('.list_albums-link').live('click',
		function()
		{
			window.scroll (0,0);
			$("#front-page").hide();
			$("#list-page").show();
			$("#photo-page").hide();
			list_albums( this );
			return false;
		}
	);

	$('.view-album-link').live('click',
		function()
		{
			window.scroll (0,0);
			$("#front-page").hide();
			$("#list-page").hide();
			$("#photo-page").show();
			view_album( this );
			return false;
		}
	);
//-----------------------------------------
	$("#img-exif-info").hide();
	$(".get-exif-info").live('click',
		function()
		{
			var img_id = "#"+$(this).attr("data-exif");
			get_exif_info( img_id );
			return false;
		}
	);

//-----------------------------------------
	$(".print-btn").live('click',
		function()
		{
			$(".replace-preview-btn").show();
			$(".print-btn").hide();
		}
	);
	$(".replace-preview-btn").live('click',
		function()
		{
			$("#view-photo-tpl").find(".photo-img").each(
				function()
				{
					//var preview_img = $(this).find(".pirobox > img").attr("src");
					var medium_img = $(this).find(".pirobox").attr("href");
//console.log("preview_img - " + preview_img );
//console.log("medium_img - " + medium_img );
					$(this).find(".pirobox > img").attr("src", medium_img );
				}
			);
			$(".replace-preview-btn").hide();
			return false;
		}
	);



});


