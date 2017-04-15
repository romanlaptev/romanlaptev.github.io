//------------------------- init vars
var music_alias = "/music/";
if (navigator.userAgent.indexOf ('Windows')!= -1) 
{
	var music_coll_location = "F:/clouds/cloud_mail/music";
}
if (navigator.userAgent.indexOf ('Linux')!= -1) 
{
	var music_coll_location = "/mnt/terra/clouds/cloud_mail/music";
}

//var dirname = $("input[name=init_dirname]").val();
var dirname = getenv("dirname");
if ( !dirname )
{
	var dirname = music_coll_location;
}

if (window.location.protocol == "file:")
{
	var filelist_src = "file:///"+ dirname;
}
if (window.location.protocol == "http:")
{
	var filelist_src = "http://"+ window.location.host + music_alias;
}

//------------------- test php
var is_php_use = false;
$.ajax(
	{
		type: "GET",
		url:"include/test.php",
		success:function(data, status)
			{
//console.log("data - " + data);					
console.log("test status - " + status);
				is_php_use = true;
			},
		error:function (XMLHttpRequest, textStatus, errorThrown) 
			{
console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
			}
	}
);


$(document).ready(
	function()
	{
		//------------------------------------ player
		var myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_N",
			cssSelectorAncestor: "#jp_container_N"}, 
			[], 
			{
				playlistOptions: {
				enableRemoveControls: true
			},
			swfPath: "jQuery.jPlayer.2.5.0/js",
			//supplied: "webmv, ogv, m4v, oga, mp3",
			//supplied: "mp3, m4a",
			supplied: "wav, mp3, oga",
			//supplied: "mp3",
			smoothPlayBar: true,
			keyEnabled: true,
			audioFullScreen: true
		});

		//-------------------------- read template
		var subfolder_tpl = $(".subfolder-tpl").html();
		var file_tpl = $(".file-tpl").html();

		//--------------------------

		$(".up-link").hide();
		$("#listing").hide();
		$("#filelist").hide();
		
console.log("is_php_use - " + is_php_use);
		if (is_php_use == true)
		{
			var url = "include/filelist.php";
			get_filelist_php( url, dirname, ".right-panel", true );
			$("#listing").show();
			$(".up-link").show();
		}
		else
		{
			//-------------------------- load frame 
			if ( filelist_src.length > 0 )
			{
				$("iframe#filelist").attr("src", filelist_src);
				$("#filelist").show();
			}
		}

		//----------------------------- parse frame
		$("iframe#filelist").load(function(){
//console.log("iframe load!");
//alert($('#filelist').contents().find('body').html());		
			var filelist_parse_res = parse_filelist( filelist.document.URL, filelist.document );
			var playlist = prep_playlist( filelist_parse_res );
			myPlaylist.setPlaylist( playlist );
		});

		
		//------------------------------------ mark active panel
		$(document).on( "click", ".left-panel, .right-panel", function(e)
			{
				$(".panels .cols").removeClass("active-panel");
				$(this).addClass("active-panel");
			}
		);

		//------------------------------------ change folder
		//$(".subfolder").live("click",
		$(document).on( "click", ".right-panel .up-link, .right-panel .subfolder", function(e) //jquery > 1.7.2
			{
				var dirname = $(this).attr("href");
//console.log("dirname - "+dirname);
				$(".right-panel .wfm .subfolder-tpl").empty();
				get_filelist_php( url, dirname, ".right-panel", false );
				return false;
			}
		);
		$(document).on( "click", ".left-panel .up-link, .left-panel .subfolder", function(e)
			{
				var dirname = $(this).attr("href");
				$(".left-panel .wfm .subfolder-tpl").empty();
				get_filelist_php( url, dirname, ".left-panel", false );
				return false;
			}
		);

//------------------------------------ copy / move files
		$(document).on( "click", ".copy, .move", function(e)
			{

				var active_panel = "";
				if ( $(".left-panel").hasClass("active-panel") )
				{
					var active_panel = ".left-panel";
					var dst_panel = ".right-panel";
				}
				if ( $(".right-panel").hasClass("active-panel") )
				{
					var active_panel = ".right-panel";
					var dst_panel = ".left-panel";
				}
				if ( active_panel =="" )
				{
//console.log( "not active-panel " );
					return false;
				}

				var src_folder = $( active_panel + " .files .dirname").text();
				var dst_folder = $( dst_panel + " .files .dirname").text();

				$("#input-copy-location").show();
				$("#input-copy-location input[name=src_folder]").val( src_folder );
				$("#input-copy-location input[name=dst_folder]").val( dst_folder );

				if ( $(this).hasClass("move") )
				{
					//$("#input-copy-location input[name=movefiles]").show();
					//$("#input-copy-location input[name=movefiles]").attr("checked","checked");
					$("#input-copy-location input[name=movefiles]").val(1);
					$(".file-op").text( "move" );
				}
				else
				{
					//$("#input-copy-location input[name=movefiles]").removeAttr("checked");
					//$("#input-copy-location input[name=movefiles]").hide();
					$("#input-copy-location input[name=movefiles]").val(0);
					$(".file-op").text( "copy" );
				}

				return false;
			}
		);

		$("#input-copy-location .cancel").click(
			function()
			{
				$("#input-copy-location").hide();
				return false;
			}
		);

		$("#input-copy-location .ok").click(
			function()
			{
				$("#input-copy-location").hide();

				var active_panel = "";
				if ( $(".left-panel").hasClass("active-panel") )
				{
					var active_panel = ".left-panel";
					var dst_panel = ".right-panel";
				}
				if ( $(".right-panel").hasClass("active-panel") )
				{
					var active_panel = ".right-panel";
					var dst_panel = ".left-panel";
				}
				if ( active_panel =="" )
				{
//console.log( "not active-panel " );
					return false;
				}

				var src_path = $( active_panel + " .dirname").text();
				var dst_path  = $("#input-copy-location input[name=dst_folder]").val();

				var file = new Array();
				$( active_panel + " .wfm input[type=checkbox]:checked").each
				(
					function()
					{
						file.push( $(this).val() );
					}
				);				

				param = new Object();
				param = {
					src_path: src_path, 
					dst_path: dst_path, 
					file: file
				};
				if( $("#input-copy-location input[name=movefiles]").val() == 1)
				{
					param ["move_files"]=1
				}

				var url = "include/copy.php";
				$.ajax({
					type: "POST",
					url: url,
					data: (param),
					success: 
						function( data,textStatus )
						{
//console.log( "data: " + data );
console.log( "textStatus: " + textStatus );
							$("#log").html( data );
							get_filelist_php( "include/filelist.php" , src_path, active_panel, false );
							get_filelist_php( "include/filelist.php" , dst_path, dst_panel, false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						}
				});

//------------------------ move files
				if ($("#input-copy-location input[name=movefiles]").val() == 1 )
				{
					//$(".group-remove").click();
				}

				return false;

			}
		);

//------------------------------------ rename file
		$(document).on( "click", ".rename", function(e)
			{
				var active_panel = "";
				if ( $(".left-panel").hasClass("active-panel") )
				{
					var active_panel = ".left-panel";
				}
				if ( $(".right-panel").hasClass("active-panel") )
				{
					var active_panel = ".right-panel";
				}
				if ( active_panel =="" )
				{
//console.log( "not active-panel " );
					return false;
				}

				var old_name = "";
				$( active_panel + " .wfm input[type=checkbox]:checked").each
				(
					function()
					{
						old_name = $(this).val();
						return false;
					}
				);				
				$("#input-rename").show();
				$("#input-rename input[name=old-name]").val( old_name );
				$("#input-rename input[name=new-name]").val( old_name );

				return false;
			}
		);

		$("#input-rename .cancel").click(
			function()
			{
				$("#input-rename").hide();
				return false;
			}
		);

		$("#input-rename .ok").click(
			function()
			{
				$("#input-rename").hide();
				var url = "include/rename.php";

				var active_panel = "";
				if ( $(".left-panel").hasClass("active-panel") )
				{
					var active_panel = ".left-panel";
				}
				if ( $(".right-panel").hasClass("active-panel") )
				{
					var active_panel = ".right-panel";
				}
				if ( active_panel =="" )
				{
//console.log( "not active-panel " );
					return false;
				}

				var dirname = $( active_panel + " .dirname").text();
				var file = new Array();
				file.push( $("#input-rename input[name=old-name]").val() );
				file.push( $("#input-rename input[name=new-name]").val() );

				$.ajax({
					type: "POST",
					url: url,
					data: ({fs_path: dirname, file: file}),
					success: 
						function( data,textStatus )
						{
//console.log( "data: " + data );
console.log( "textStatus: " + textStatus );
							$("#log").html( data );
							get_filelist_php( "include/filelist.php" , dirname, active_panel, false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						}
				});
				return false;
			}
		);

		//------------------------------------- group delete
		$(".group-remove").click(
			function()
			{
				var active_panel = "";
				if ( $(".left-panel").hasClass("active-panel") )
				{
					var active_panel = ".left-panel";
				}
				if ( $(".right-panel").hasClass("active-panel") )
				{
					var active_panel = ".right-panel";
				}
				if ( active_panel =="" )
				{
//console.log( "not active-panel " );
					return false;
				}

				var dirname = $( active_panel + " .dirname").text();
				var file = new Array();
				$( active_panel + " .wfm input[type=checkbox]:checked").each
				(
					function()
					{
						file.push( $(this).val() );
					}
				);				

				var url = "include/remove.php";
				$.ajax({
					//async: false,
					type: "POST",
					url: url,
					//data: "file="+file,
					data: ({fs_path: dirname, file: file}),
					//dataType: "html",
					//dataType: 'script',
					//beforeSend:
						//function (XMLHttpRequest) 
						//{
							//this;
							//return false; //отмена запроса
						//},
					success: 
						function( data,textStatus )
						{
//console.log( "data: " + data );
console.log( "textStatus: " + textStatus );
							$("#log").html( data );
							get_filelist_php( "include/filelist.php" , dirname, active_panel, false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						}
				});

				return false;
			}
		);
//-------------------------------
		$(".menu-left-panel .view-file-panel").click(
			function()
			{
				$("#jp_container_N").hide();
				$(".left-panel .files").remove();
				$(".right-panel .files").clone(true).appendTo(".left-panel").addClass("left-panel-files");
				return false;
			}
		);
		$(".menu-left-panel .view-media-player").click(
			function()
			{
				$(".left-panel .files").remove();
				$("#jp_container_N").show();
				return false;
			}
		);

//-------------------------------
		$(".reload-pls").click(
			function()
			{
				var url = "include/filelist.php";
				var dirname = $(".files .dirname").text();
				var files_panel = ".right-panel";
				get_filelist_php( url, dirname, files_panel, true );
			}
		);

//-------------------------------
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
		
//-------------------------------
		//скроллбар списка файлов
		//$('.scroll-pane').jScrollPane();
function get_filelist_php( url, dirname, panel, reload_pls )
{
		var subfolders_html = "";
		var files_html = "";
		$.getJSON(url,
			{ dir: dirname },
			function(data)
			{
				for (item in data) 
				{
					if ( item=='subfolders')
					{
						var subfolders = data[item];
//console.log( "Subfolders = " + subfolders );
						for (subfolder in subfolders) 
						{
//console.log( "Subfolder = " + subfolders[subfolder] );
							var subfolder_url = subfolders[subfolder];
							
							var last_slash_pos = subfolders[subfolder].lastIndexOf('/')+1;
							var subfolder_name = subfolders[subfolder].substring( last_slash_pos);

							subfolders_html += subfolder_tpl.replace("#", subfolder_url).replace(/sname/g, subfolder_name);
						}
					}

					if ( item=='files')
					{
						var playlist = new Array();
						var files = data[item];
//console.log( "files = " + files );
						for(file in files)
						{
							var last_slash_pos = files[file].lastIndexOf('/')+1;
							var filename = files[file].substring( last_slash_pos );
							if ( reload_pls == true)
							{
								if (filename.toLowerCase().lastIndexOf('mp3') > 0)
								{
									var track = {
									title: filename,
									//"artist": files[file],
									//"wav": files[file],
									mp3: files[file],
									free: true, // Optional - Generates links to the media
									//"ogg": files[file]
									};
									playlist.push(track);
								}
							}
							files_html += file_tpl.replace("#", files[file] ).replace(/fname/g, filename);
						}
					}

				}//------------------------- end for
				//var jsonString = JSON.stringify(playlist);

				$( panel + " .subfolder-tpl").html( subfolders_html );
				var up_link = dirname.substring( 0, dirname.lastIndexOf("/") )
				$( panel + " .up-link").attr("href",up_link );
				$( panel + " .dirname").text(dirname);
				
				$( panel + " .file-tpl").html( files_html );
				//-------------------------- insert playlist
				if ( reload_pls == true)
				{
					myPlaylist.setPlaylist( playlist );
				}

			}
		);// end getJSON

}//----------------------- enf func



	}	
);//end ready

function parse_filelist( url, page )
{
	var filelist_parse = [];
	$(page).find(".file").each(
		function()
		{
//console.log ($(this).attr("href") );
//console.log ($(this).text() );
			var filename = $(this).text();
			var file = url + "/" + filename;
			filelist_parse.push( file );
		}
	);	
	return filelist_parse;
}//----------------------- enf func

function prep_playlist( filelist )
{
	var playlist = new Array();
/*
var track = {
title: "Эта музыка будет вечной",
artist: "Наутилус Помпилиус",
mp3: "http://mycomp/music/N/Nautilus/Nautilus Pompilius - Эта музыка будет вечной.mp3",
free: true, // Optional - Generates links to the media
};
	playlist.push(track);

var track2 = {
title:"Circo Iberico",
artist:"Ska-P",
oga:"http://mycomp/music/S/Ska-P/1998%20-%20Eurosis/Ska-P%20-%2001.%20Circo%20Iberico.ogg",
free: true, // Optional - Generates links to the media
};
	playlist.push(track2);
*/
	for(file in filelist )
	{
			var last_slash_pos = filelist[file].lastIndexOf('/')+1;
			var filename = filelist[file].substring( last_slash_pos );

		if (filename.toLowerCase().lastIndexOf('.mp3') > 0)
		{
			var track = {
			title: filename,
			mp3: filelist[file],
			free: true, // Optional - Generates links to the media
			};
			playlist.push(track);
		}
		if (filename.toLowerCase().lastIndexOf('.ogg') > 0)
		{
			var track = {
			title: filename,
			oga: filelist[file],
			free: true, // Optional - Generates links to the media
			};
			playlist.push(track);
		}
		if (filename.toLowerCase().lastIndexOf('.wav') > 0)
		{
			var track = {
			title: filename,
			wav: filelist[file],
			free: true, // Optional - Generates links to the media
			};
			playlist.push(track);
		}
	}
	return playlist;
}//----------------------- enf func



