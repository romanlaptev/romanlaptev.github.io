var Wfm = function( options )
{
//------------------------------- init vars
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

//------------------------------ protocol
	if (window.location.protocol == "file:")
	{
		var filelist_src = "file:///"+ dirname;
	}
	if (window.location.protocol == "http:")
	{
		var filelist_src = "http://"+ window.location.host + music_alias;
	}

	var get_filelist;
	var get_filelist_php;
	var myPlaylist;

	var subfolder_tpl;
	var file_tpl;

	var filelist_url;
	var copy_url;
	var rename_url;
	var remove_url;
	var mkdir_url;
	var save_pls_url;

	var text_new_playlist = "new playlist";

$(document).ready(function(){

//-------------------------- read template
		subfolder_tpl = $(".subfolder-tpl").html();
		file_tpl = $(".file-tpl").html();

		//--------------------------
		$(".up-link").hide();
		$("#listing").hide();
		$("#filelist").hide();

		if (window.location.protocol == "file:")
		{
			//-------------------------- load local frame 
			if ( filelist_src.length > 0 )
			{
				$("iframe#filelist").attr("src", filelist_src);
				$("#filelist").show();
			}
			//----------------------------- parse local frame
			$("iframe#filelist").load(function(){
//console.log("iframe load!");
//alert($('#filelist').contents().find('body').html());		
				var filelist_parse_res = parse_local_filelist( filelist.document.URL, filelist.document );
				var playlist = prep_playlist( filelist_parse_res );
				myPlaylist.setPlaylist( playlist );
			});
		}

		if (window.location.protocol == "http:")
		{
//----------------------------------------------			
			test_php();
//----------------------------------------------			
			$("#listing").show();
			$(".up-link").show();
		}

//------------------------------------ player
		myPlaylist = new jPlayerPlaylist({
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

//------------------------------------ copy / move files
		$(document).on( "click", ".copy, .move", function(e)
			{
				var panels = get_panels_info();
				var num_checked = 0;
				var num_checked = $( panels["active"] + " .wfm input[type=checkbox]:checked").length;
				if ( num_checked > 0)
				{
					var src_folder = $( panels["active"] + " .files .dirname").text();
					var dst_folder = $( panels["destination"] + " .files .dirname").text();

					//$("#modal-copy").modal("show");
					$("#modal-copy input[name=src_folder]").val( src_folder );
					$("#modal-copy input[name=dst_folder]").val( dst_folder );

					if ( $(this).hasClass("move") )
					{
						$("#modal-copy input[name=movefiles]").val(1);
						$(".file-op").text( "move" );
					}
					else
					{
						$("#modal-copy input[name=movefiles]").val(0);
						$(".file-op").text( "copy" );
					}
				}
				else
				{
//console.log ("checked - " +  num_checked );
					$("#modal-copy").modal("hide");
				}
			
				return false;
			}
		);

		$("#modal-copy .action-btn").click(
			function()
			{
				$("#modal-copy").modal("hide");

				var panels = get_panels_info();
				var src_path = $( panels["active"] + " .dirname").text();
				var dst_path  = $("#modal-copy input[name=dst_folder]").val();

				var file = new Array();
				$( panels["active"] + " .wfm input[type=checkbox]:checked").each
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
				if( $("#modal-copy input[name=movefiles]").val() == 1)
				{
					param ["move_files"]=1;
				}

				$.ajax({
					type: "POST",
					url: copy_url,
					data: (param),
					success: 
						function( data,textStatus )
						{
console.log( "textStatus: " + textStatus );
							$("#log").append( data );
							get_filelist( filelist_url, src_path, panels["active"], false );
							get_filelist( filelist_url , dst_path, panels["destination"], false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
							$("#log").append( "<p class='error'><b>textStatus:</b> " + textStatus +"</p>");
							$("#log").append( "<p class='error'><b>errorThrown</b>: " + errorThrown +"</p>" );
						}
				});

				return false;
			}
		);

//------------------------------------ rename file
		$(document).on( "click", ".rename", function(e)
			{
				var panels = get_panels_info();
				var old_name = "";
				$( panels["active"] + " .wfm input[type=checkbox]:checked").each
				(
					function()
					{
						old_name = $(this).val();
						return false;
					}
				);		
				
				if ( old_name == "" )
				{
					$("#modal-rename").modal("hide");
				}
				$("#modal-rename input[name=old_name]").val( old_name );
				$("#modal-rename input[name=new_name]").val( old_name );

				return false;
			}
		);

		$("#modal-rename .action-btn").click(
			function()
			{
				$("#modal-rename").modal("hide");
				var panels = get_panels_info();
				var dirname = $( panels["active"] + " .dirname").text();
				var file = new Array();
				file.push( $("#modal-rename input[name=old_name]").val() );
				file.push( $("#modal-rename input[name=new_name]").val() );

				$.ajax({
					type: "POST",
					url: rename_url,
					data: ({fs_path: dirname, file: file}),
					success: 
						function( data,textStatus )
						{
//console.log( "textStatus: " + textStatus );
							//$("#log").html( textStatus );
							$("#log").append( data );
							get_filelist( filelist_url , dirname, panels["active"], false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
							$("#log").append( "<p class='error'><b>textStatus:</b> " + textStatus +"</p>");
							$("#log").append( "<p class='error'><b>errorThrown</b>: " + errorThrown +"</p>" );
						}
				});
				return false;
			}
		);

		//------------------------------------- group delete
		$(".group-remove").click(
			function()
			{
				var panels = get_panels_info();
				var dirname = $( panels["active"] + " .dirname").text();
				var file = [];
				$( panels["active"] + " .wfm input[type=checkbox]:checked").each
				(
					function()
					{
						file.push( $(this).val() );
					}
				);				

				$.ajax({
					//async: false,
					type: "POST",
					url: remove_url,
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
//console.log( "textStatus: " + textStatus );
							//$("#log").html( textStatus );
							$("#log").append( data );
							get_filelist( filelist_url , dirname, panels["active"], false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
							$("#log").append( "<p class='error'><b>textStatus:</b> " + textStatus +"</p>");
							$("#log").append( "<p class='error'><b>errorThrown</b>: " + errorThrown +"</p>" );
						}
				});

				return false;
			}
		);

//------------------------------- mkdir
		$("#modal-mkdir .action-btn").click(
			function()
			{
				$("#modal-mkdir").modal("hide");
				var panels = get_panels_info();
				var dirname = $( panels["active"] + " .dirname").text();
				var newfolder = $("#modal-mkdir input[name=new_name]").val();
				$.ajax({
					type: "GET",
					url: mkdir_url,
					data: ({fs_path: dirname, newfolder: newfolder}),
					success: 
						function( data,textStatus )
						{
							$("#log").html( data );
							get_filelist ( filelist_url , dirname, panels["active"], false );
						},
					error:
						function (XMLHttpRequest, textStatus, errorThrown) 
						{
//console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
							$("#log").append( "<p class='error'><b>textStatus:</b> " + textStatus +"</p>");
							$("#log").append( "<p class='error'><b>errorThrown</b>: " + errorThrown +"</p>" );
						}
				});
				return false;

			}
		);

//------------------------------------ change folder
		//$(".subfolder").live("click",
		$(document).on( "click", ".right-panel .up-link, .right-panel .subfolder", function(e) //jquery > 1.7.2
			{
				var dirname = $(this).attr("href");
				$(".right-panel .wfm .subfolder-tpl").empty();
				get_filelist( filelist_url, dirname, ".right-panel", false );
				return false;
			}
		);
		$(document).on( "click", ".left-panel .up-link, .left-panel .subfolder", function(e)
			{
				var dirname = $(this).attr("href");
				$(".left-panel .wfm .subfolder-tpl").empty();
				get_filelist( filelist_url, dirname, ".left-panel", false );
				return false;
			}
		);

//------------------------------- PANELS

		//------------------------------------ mark active panel
		$(document).on( "click", ".left-panel, .right-panel", function(e)
			{
				$(".left-panel, .right-panel").removeClass("active-panel");
				$(this).addClass("active-panel");
			}
		);

		$(".topmenu .view-file-panel").click(
			function()
			{
				$("#jp_container_N").hide();
				$(".left-panel .files").remove();
				$(".right-panel .files").clone(true).appendTo(".left-panel").addClass("left-panel-files");
				$(".view-media-player").removeClass("active");
				$(this).addClass("active");
				return false;
			}
		);
		$(".topmenu .view-media-player").click(
			function()
			{
				$(".left-panel .files").remove();
				$("#jp_container_N").show();
				$(".view-file-panel").removeClass("active");
				$(this).addClass("active");
				return false;
			}
		);

//-------------------------------
		$(".reload-pls").click(
			function()
			{
				var dirname = $(".files .dirname").text();
				var files_panel = ".right-panel";
				get_filelist( filelist_url, dirname, files_panel, true );
				$("#playlist-title").text( text_new_playlist );
				return false;
			}
		);
//-------------------------------
		$(".clear-log").click(
			function()
			{
				$("#log").empty();
			}
		);
//-------------------------------
		$("#load-pls").click(function(){
			var checked_files = get_checked_files();
			if ( checked_files.length == 1 )
			{
				load_playlist( checked_files[0] );
				var filename = checked_files[0].substring( checked_files[0].lastIndexOf('/')+1, checked_files[0].length);
				$("#playlist-title").text( filename );
			}
			else
			{
				var log_message = "<p class='error'>Playlist file not found....</p>";
				$("#log").append( log_message );
			}
			return false;
		});

//--------------------
		$("#modal-save  .action-btn").click(function(){
			$("#modal-save").modal("hide");
			var log_message = "";
			if ( myPlaylist.playlist.length > 0 )
			{
				var panels = get_panels_info();
				var filename = $("#modal-save input").val() ;
				if ( filename.length > 0)
				{
					var dirname = $( panels["active"] + " .dirname").text();
					filename = dirname + "/"+ filename;
					save_playlist( filename );
					$("#playlist-title").empty();
				}
				else
				{
					log_message += "<p class='error'>Enter filename</p>";
				}
			}
			else
			{
				log_message += "<p class='error'>Playlist is empty....</p>";
			}
			$("#log").append( log_message );
		});
//--------------------
		$("#add-track").click(function(){
			var checked_files = get_checked_files();
			var playlist = [];
			for ( var item in checked_files)
			{
				var track = checked_files[ item ] ;
				var filename = track.substring( track.lastIndexOf('/')+1, track.length);
				var filetype = track.substring( track.lastIndexOf('/')+1, track.length);

				var playlist = myPlaylist.playlist;
				if (filename.toLowerCase().lastIndexOf(".mp3") > 0)
				{
					var add = { "title":filename, "mp3": track, free: true };
				}
				if (filename.toLowerCase().lastIndexOf('.ogg') > 0)
				{
					var add = { "title":filename, "oga": track, free: true };
				}
				if (filename.toLowerCase().lastIndexOf('.wav') > 0)
				{
					var add = { "title":filename, "wav": track, free: true };
				}
				playlist.push( add );
			}
			myPlaylist.setPlaylist( playlist );
//console.log ("myPlaylist.playlist = ", myPlaylist.playlist);

		});


});//end teady

	var get_checked_files = function()
	{
		var panels = get_panels_info();
		var dirname = $( panels["active"] + " .dirname").text();
		var checked_files = [];
		$( panels["active"] + " .wfm input[type=checkbox]:checked").each(	function(){
			checked_files.push ( dirname +"/" + $(this).val() );
			$(this).removeAttr("checked");
		});		
		return checked_files;
	}//end  get_checked_files()

	var get_panels_info = function() {
		var panels = [];
		if ( $(".left-panel").hasClass("active-panel") )
		{
			panels["active"] = ".left-panel";
			panels["destination"] = ".right-panel";
			return panels;
		}
		if ( $(".right-panel").hasClass("active-panel") )
		{
			panels["active"] = ".right-panel";
			panels["destination"] = ".left-panel";
			return panels;
		}
		return false;
	}//end get_panels_info

	//function get_filelist_php( url, dirname, panel, reload_pls )
	get_filelist_php = function( url, dirname, panel, reload_pls )
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
			if (filename.toLowerCase().lastIndexOf('.ogg') > 0)
			{
				var track = {
				title: filename,
				oga: files[file],
				free: true, 
				};
				playlist.push(track);
			}
			if (filename.toLowerCase().lastIndexOf('.wav') > 0)
			{
				var track = {
				title: filename,
				wav: files[file],
				free: true, 
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

	function test_php()//------------------- test php
	{
		$.ajax(
			{
				type: "GET",
				url:"api/test.php",
				success:function(data, status)
				{
	//console.log("test status - " + status);
	//console.log("data - " + data);					
					if (data == "4")
					{
						filelist_url = "api/filelist.php";
						copy_url = "api/copy.php";
						rename_url = "api/rename.php";
						remove_url = "api/remove.php";
						mkdir_url = "api/mkdir.php";
						save_pls_url = "api/save_pls.php";
					
						get_filelist = get_filelist_php;
						get_filelist( filelist_url, dirname, ".right-panel", true );
					
						$("#listing").show();
						$(".up-link").show();
					}
					else
					{
						test_aspx();
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) 
				{
	console.log( "XMLHttpRequest: " + XMLHttpRequest );
	console.log( "textStatus: " + textStatus );
	console.log( "errorThrown: " + errorThrown );
					test_aspx();
				}
			}
		);
	}//----------------------- enf func

	function test_aspx()//------------------- test aspx
	{
		$.ajax(
			{
				type: "GET",
				url:"api/aspx/test.aspx",
				success:function(data, status)
				{
	//console.log("test status - " + status);
	//console.log("data - " + data);					
					if (data == "4")
					{
						filelist_url = "api/aspx/filelist.aspx";
						copy_url = "api/aspx/copy.aspx";
						rename_url = "api/aspx/rename.aspx";
						remove_url = "api/aspx/delete.aspx";
						mkdir_url = "api/aspx/mkdir.aspx";
						get_filelist( filelist_url, dirname, ".right-panel", true);
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) 
				{
	console.log( "XMLHttpRequest: " + XMLHttpRequest );
	console.log( "textStatus: " + textStatus );
	console.log( "errorThrown: " + errorThrown );
				}
			}
		);
	}//----------------------- enf func

	//function get_filelist( url, dirname, panel, reload_pls )
	get_filelist = function( url, dirname, panel, reload_pls )
	{
		if (navigator.userAgent.indexOf ('Windows')!= -1) 
		{
			dirname = dirname.replace("file:///","");
		}

		$.ajax({
			//async: false,
			type: "GET",
			url: url,
			data: ({dir: dirname}),
			dataType: "xml",
			success: 
				function( data,textStatus, xhr )
				{
					//var log_message = "<p>" + textStatus +", function get_filelist( "+url+" ) </p>";
					//$("#log").append( log_message );
				
					//$("#log").append( data );
					//var all_headers = xhr.getAllResponseHeaders();
					//$("#log").append( all_headers );
				
					var filelist_parse_res = parse_filelist_xml( data );
					reload_file_panel( filelist_parse_res, dirname, panel, reload_pls );
				},
			error:
				function (XMLHttpRequest, textStatus, errorThrown) 
				{
	console.log( "textStatus: " + textStatus );
	console.log( "errorThrown: " + errorThrown );
					var log_message = "<p class='error'>function get_filelist( "+url+" ), " + textStatus +", "+errorThrown +"</p>";
					$("#log").append( log_message );
				}
		});

		
	}//----------------------- enf func

	function parse_local_filelist( url, page )
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
	//console.log ( filelist_parse );
		return filelist_parse;
	}//----------------------- enf func

	function parse_filelist_xml( filelist )
	{
		var url = "file://";
		var filelist_parse = [];
		filelist_parse["subfolders"] = [];
		filelist_parse["files"] = [];
	
		$(filelist).find('dir').each(
			function()
			{
				var filename = $(this).text();
				var file = url + "/" + filename.replace("\\","\/");
				filelist_parse["subfolders"].push( file );
			}
		);//---------------------- end each
		$(filelist).find('file').each(
			function()
			{
				var filename = $(this).text();
				var file = url + "/" + filename.replace("\\","\/");
				filelist_parse["files"].push( file );
			}
		);//---------------------- end each

	//console.log ( filelist_parse );
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


	function reload_file_panel( filelist, dirname, panel, reload_pls )
	{
		if ( reload_pls == true)//-------------------------- insert playlist
		{
			var playlist = prep_playlist( filelist["files"] );
			myPlaylist.setPlaylist( playlist );
		}

		var subfolders_html = "";
		var files_html = "";
		for (item in filelist) 
		{
			if ( item=="subfolders")
			{
				var subfolders = filelist[item];
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

			if ( item=="files")
			{
				var files = filelist[item];
				for(file in files)
				{
					var last_slash_pos = files[file].lastIndexOf('/')+1;
					var filename = files[file].substring( last_slash_pos );
					files_html += file_tpl.replace("#", files[file] ).replace(/fname/g, filename);
				}
			}
		}//------------------------- end for

		$( panel + " .subfolder-tpl").html( subfolders_html );
		var up_link = dirname.substring( 0, dirname.lastIndexOf("/") );
		if (navigator.userAgent.indexOf ('Windows')!= -1) 
		{
			up_link = "file:///"+up_link;
		}
	
		$( panel + " .up-link").attr("href",up_link );
		$( panel + " .dirname").text(dirname);
	
		$( panel + " .file-tpl").html( files_html );
				
	}//----------------------- enf func

	function load_playlist( url )
	{
		//var url = "pls/" + filename;
		$.getJSON( url )
			.done( function( json ) {
			myPlaylist.setPlaylist( json );
		})
			.fail( function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
console.log( "textStatus: " + textStatus );
console.log( "error: " + error );
				var log_message = "<p class='error'>function load_playlist( "+url+" ), " + textStatus +", "+error +"</p>";
				$("#log").append( log_message );
		});
	}

	function save_playlist( filename )
	{
		$.ajax({
			type: "POST",
			url: save_pls_url,
			data: ({filename: filename, json: myPlaylist.playlist}),
			success: 
				function( data,textStatus )
				{
console.log( "textStatus: " + textStatus );
					//$("#log").html( textStatus );
					$("#log").append( data );

					var dirname = $(".files .dirname").text();
					var files_panel = ".right-panel";
					get_filelist( filelist_url, dirname, files_panel, true );

				},
			error:
				function (XMLHttpRequest, textStatus, errorThrown) 
				{
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
					$("#log").append( "<p class='error'><b>textStatus:</b> " + textStatus +"</p>");
					$("#log").append( "<p class='error'><b>errorThrown</b>: " + errorThrown +"</p>" );
				}
		});
	}//end save_playlist

	return "Web Music player + File manager";
}//end Wfm
