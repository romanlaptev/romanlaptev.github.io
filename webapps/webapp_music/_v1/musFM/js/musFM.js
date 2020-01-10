﻿/*
//Module MusicFM
(function(){
	var MusicFM = MusicFM || function(options){

		// private variables and functions
		var _init = function(){
console.log("init!!!");
		};
		
		var _build = function(target){
			var html = "Table " + target + " is building....";
			return html;
		};
		
		// public interfaces
		return{
			init:	function(){ 
				return _init(); 
			},
			build:	function(target){ 
				return _build(target); 
			}
		};
	};
	window.MusicFM = MusicFM;
	MusicFM().init();
})();
*/
//http://jplayer.org/latest/demo-02-jPlayerPlaylist/
//https://www.soundhelix.com/audio-examples

$(document).ready(function(){
	
	var musfm = MusicFM();
console.log ("music file manager = ", musfm);

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

});//end ready

window.onload = function(){
}//end load


var MusicFM = function( options ){
	
	// init vars
	var vars = {
		"log" : [],
		"messages" : {
			"emptyPls" : "<p class='alert alert-danger'>Playlist is empty.</p>",
			"errorPlsFilename" : "<p class='alert alert-danger'>Playlist file not found.</p>",
			"emptyFilename" : "<p class='alert alert-error'>error, empty filename!!!</p>",
			"noMarkedFiles" : "<p class='alert alert-error'>error, need to mark music track file</p>"
		},
		"templates" : {
			"subfolder_tpl" : "",
			"file_tpl" : "",
			"btn_edit" : "<a class='btn jp-playlist-item-edit' href='#numTrack'>edit</a>"
			//"btn_edit" : "<div><a class='btn jp-playlist-item-edit' href='#numTrack'>edit</a></div>"
		},
		"testUrlPHP": "api/test.php",
		"testUrlASPX": "api/aspx/test.aspx",
		
		//"alias" : "/music/",
		"alias" : "/music",
		
		"content_location" : "./",
		
		//"protocol" : "file://",
		//"protocol" : "",
		
		"dirname" : "",
		"filelist_url" : "",
		"copy_url" : "",
		"rename_url" : "",
		"remove_url" : "",
		"mkdir_url" : "",
		"save_pls_url" : "",
		"filelist_src" : "",
		"filename_new_playlist" : "new_playlist.json",
		"playlist" : ""
	};
console.log( "vars:" , vars );

	if (navigator.userAgent.indexOf ('Windows')!= -1){
		vars["OS"] = "Windows";
		//vars["disk_symbol"] = "D:";
		//vars["content_location"] = "/music";
	}
	if (navigator.userAgent.indexOf ('Linux')!= -1){
		vars["OS"] = "Linux";
		//vars["content_location"] = "/mnt/d2/music";
	}
	
//vars["content_location"] = "/home/www";
//------------------ replace fs path to web alias, TEST!!!!!
/*
vars["alias"] = "/music/";
vars["dirname"] = "/mnt/d2/music/D/Def Leppard/1983 - Pyromania";
var pos1 = vars["dirname"].indexOf( vars["alias"] );
//var pos2 = pos1 + vars["alias"].length;
console.log(pos1);
var newLinkPath = vars["dirname"].substring( pos1, vars["dirname"].length );
console.log(newLinkPath);
*/

/*
//----------------------- get relative path
vars["content_location"] = "/mnt/d2/temp";
vars["dirname"] = "/mnt/d2/temp/D/Def Leppard/1983 - Pyromania";
var relativePath = vars["dirname"].substring( vars["content_location"].length, vars["dirname"].length );
console.log( relativePath );
console.log( vars["alias"] + relativePath );
//-----------------
*/
vars["content_location"] = "d:/documents/laptev/www/music";
vars["alias"] = "/www/music",

//vars["disk_symbol"] = "C:";
//vars["content_location"] = "/temp/music";

	vars["GET"] = parseGetParams(); 

	if( vars["GET"]["content_location"] ){
		vars["content_location"] = vars["GET"]["content_location"];
	}

	if( vars["GET"]["alias"] ){
		vars["alias"] = "/" + vars["GET"]["alias"];
	}
	
	//var dirname = $("input[name=init_dirname]").val();
	vars["dirname"] = vars["content_location"];
	if ( vars["GET"]["dirname"] ) {
		vars["dirname"] = vars["GET"]["dirname"];
	}

	if ( vars["GET"]["pls"] ) {
		vars["playlist"] = vars["GET"]["pls"];
	}
	

	//protocol
	if (window.location.protocol == "file:"){
		vars["filelist_src"] = "file:///"+ vars["dirname"];
	}
	if (window.location.protocol == "http:"){
		vars["filelist_src"] = "http://"+ window.location.host + vars["alias"];
	}

	var get_filelist;
	var get_filelist_php;
	var myPlaylist;
	
	initApp();

function initApp(){

		//read template
		vars["templates"]["subfolder_tpl"] = $(".subfolder-tpl").html();
		vars["templates"]["file_tpl"] = $(".file-tpl").html();
		
		//vars["protocol"] = window.location.protocol;
		//vars["hostname"] = window.location.hostname;
		vars["website"] = window.location.protocol +"//"+ window.location.hostname;
		
		$("#modal-save-pls input[name=new_name]").val( vars["filename_new_playlist"] );		
		
		//--------------------------
		$(".up-link").hide();
		$("#listing").hide();
		$("#filelist").hide();

/*		
		if (window.location.protocol == "file:"){
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
*/

		if (window.location.protocol == "http:"){

			test_php(function(res){
//console.log(res);				

				if(res){//use PHP
					vars["filelist_url"] = "api/filelist.php";
					vars["copy_url"] = "api/copy.php";
					vars["rename_url"] = "api/rename.php";
					vars["remove_url"] = "api/remove.php";
					vars["mkdir_url"] = "api/mkdir.php";
					vars["save_pls_url"] = "api/save_pls.php";
				
					get_filelist = get_filelist_php;
					get_filelist( vars["filelist_url"], vars["dirname"], ".right-panel", true );
				
					$("#listing").show();
					$(".up-link").show();
				}
				
				if(!res){
					var msg = "error, not support PHP, try use ASPX...";
					vars["log"].push(msg);
					
					test_aspx(function(res){
//console.log(res);				
						if( res ){//use ASPX
							vars["filelist_url"] = "api/aspx/filelist.aspx";
							vars["copy_url"] = "api/aspx/copy.aspx";
							vars["rename_url"] = "api/aspx/rename.aspx";
							vars["remove_url"] = "api/aspx/delete.aspx";
							vars["mkdir_url"] = "api/aspx/mkdir.aspx";
							vars["save_pls_url"] = "api/aspx/save_pls.aspx";							
							get_filelist( vars["filelist_url"], vars["dirname"], ".right-panel", true);
						} else {
							var msg = "error, not support PHP and ASPX scripts.....";
							vars["log"].push(msg);
						}
						
					});
				}
				
				
			});

			
			$("#listing").show();
			$(".up-link").show();
		}

		//init player
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
console.log(myPlaylist);
		$("#jp_container_N .jp-playlist ul").sortable({
			change : function(){
//console.log("sort change!");				
			},
			update : function( event, ui ){
//console.log("sort update!", ui);
//console.log( ui["item"] );
				var oldNum = ui["item"].data("num");
//console.log( "oldNum : " + oldNum );

				// reorder tracks
				var newNum = false;
				//var reCalc = false;
				var playlist = [];
				$("#jp_container_N .jp-playlist ul li").each( function(key, value){ 
//console.log( key, value );
//console.log( key, $(this).data("num") );
/*
					if( $(this).data("num") === oldNum ){
						newNum = key;
console.log( "newNum : " +newNum );
						$(this).find(".jp-playlist-item-edit").attr("href", "#track"+newNum);
						var trackObj = myPlaylist.playlist[oldNum];
						playlist.push( trackObj );
						//delete myPlaylist.playlist[oldNum];
					} else {
						//change link for edit track
						$(this).find(".jp-playlist-item-edit").attr("href", "#track"+key);
					}
					
					//copy track item
					//if( myPlaylist.playlist[key] ){
						//playlist.push( myPlaylist.playlist[key] );
					//}
*/
					$(this).find(".jp-playlist-item-edit").attr("href", "#track"+key);
					playlist.push( myPlaylist.playlist[ $(this).data("num") ] );
				});//end each
//console.log( playlist );
				myPlaylist.playlist = playlist;
				
				//reorder <li>
				$("#jp_container_N .jp-playlist ul li").each( function(key, value){ 
					$(this).data("num", key);
				});//end each
				
				var plsTitle = "*" + vars["filename_new_playlist"];
				$("#playlist-title").text( plsTitle );
				
			},
		});//end sortable

		
		//------------------------------------ mark active panel
		$(document).on( "click", ".left-panel", function(e){
//console.log(e, e.target);
//console.log( $("#jp_container_N").is(":visible") );
			if( $(".left-panel #jp_container_N").is(":visible") ){
				return false;
			}
			
			$(".right-panel").removeClass("active-panel");
			$(this).addClass("active-panel");
		});//end event
		
		$(document).on( "click", ".right-panel", function(e){
			$(".left-panel").removeClass("active-panel");
			$(this).addClass("active-panel");
		});//end event

		
		$(".topmenu .view-file-panel").on("click", function(){
			$("#jp_container_N").hide();
			$(".left-panel .files").remove();
			$(".right-panel .files").clone(true).appendTo(".left-panel").addClass("left-panel-files");
			$(".view-media-player").removeClass("active");
			$(this).addClass("active");
			return false;
		});//end event
		
		
		$(".topmenu .view-media-player").on("click", function(){
			$(".left-panel .files").remove();
			$("#jp_container_N").show();

			$(".left-panel, .right-panel").removeClass("active-panel");
			$(".right-panel").addClass("active-panel");
			
			$(".view-file-panel").removeClass("active");
			$(this).addClass("active");
			
			return false;
		});//end event
		
		
		//COPY / MOVE FILES
		$(document).on( "click", ".copy, .move", function(e){
			var panels = get_panels_info();
			var num_checked = 0;
			var num_checked = $( panels["active"] + " .wfm input[type=checkbox]:checked").length;
			if ( num_checked > 0){
				
				var src_folder = $( panels["active"] + " .files .dirname").text();
				var dst_folder = $( panels["destination"] + " .files .dirname").text();

				//$("#modal-copy").modal("show");
				$("#modal-copy input[name=src_folder]").val( src_folder );
				$("#modal-copy input[name=dst_folder]").val( dst_folder );

				if ( $(this).hasClass("move") ){
					$("#modal-copy input[name=movefiles]").val(1);
					$(".file-op").text( "move" );
				} else {
					$("#modal-copy input[name=movefiles]").val(0);
					$(".file-op").text( "copy" );
				}
			} else {
//console.log ("checked - " +  num_checked );
				$("#modal-copy").modal("hide");
			}
		
			return false;
		});//end event

		$("#modal-copy .action-btn").click(function(){
			$("#modal-copy").modal("hide");

			var panels = get_panels_info();
			
			var src_path = $( panels["active"] + " .dirname").text();
			var fsPathSrc = src_path;
			// if ( vars["OS"] === "Windows" ){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// fsPathSrc = vars["disk_symbol"] + fsPathSrc;
				// }
			// }
			
			var dst_path  = $("#modal-copy input[name=dst_folder]").val();
			var fsPathDst = dst_path;
			// if ( vars["OS"] === "Windows" ){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// fsPathDst = vars["disk_symbol"] + fsPathDst;
				// }
			// }

			var file = new Array();
			$( panels["active"] + " .wfm input[type=checkbox]:checked").each(function(){
					file.push( $(this).val() );
			});				

			param = new Object();
			param = {
				src_path: fsPathSrc, 
				dst_path: fsPathDst, 
				file: file
			};
			if( $("#modal-copy input[name=movefiles]").val() == 1){
				param ["move_files"]=1;
			}

			$.ajax({
				type: "POST",
				url: vars["copy_url"],
				data: (param), 
				success: function( data,textStatus ){
//console.log( "textStatus: " + textStatus );
						$("#log").append( data );
						get_filelist( vars["filelist_url"], src_path, panels["active"], false );
						get_filelist( vars["filelist_url"] , dst_path, panels["destination"], false );
				},
				
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						$("#log").append( "<p class='alert alert-error'><b>textStatus:</b> " + textStatus +"</p>");
						$("#log").append( "<p class='alert alert-error'><b>errorThrown</b>: " + errorThrown +"</p>" );
				}
			});

			return false;
		});//end event

		//RENAME FILE
		$(document).on( "click", ".rename", function(e){
			var panels = get_panels_info();
			var old_name = "";
			$( panels["active"] + " .wfm input[type=checkbox]:checked").each(function(){
				old_name = $(this).val();
				return false;
			});		
			
			if ( old_name == "" ){
				$("#modal-rename").modal("hide");
			}
			$("#modal-rename input[name=old_name]").val( old_name );
			$("#modal-rename input[name=new_name]").val( old_name );

			return false;
		});//end event

		$("#modal-rename .action-btn").click(function(){
			$("#modal-rename").modal("hide");
			var panels = get_panels_info();
			
			
			var file = new Array();
			file.push( $("#modal-rename input[name=old_name]").val() );
			file.push( $("#modal-rename input[name=new_name]").val() );

			//var dirname = $( panels["active"] + " .dirname").text();
			var dirname = vars["dirname"];
			var fsPath = dirname;
			// if ( vars["OS"] === "Windows" ){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// fsPath = vars["disk_symbol"] + dirname;
				// }
			// }
			
			$.ajax({
				type: "POST",
				url: vars["rename_url"],
				data: ({fs_path: fsPath, file: file}),
				success: function( data,textStatus ){
//console.log( "textStatus: " + textStatus );
						//$("#log").html( textStatus );
						$("#log").append( data );
						get_filelist( vars["filelist_url"] , dirname, panels["active"], false );
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						$("#log").append( "<p class='alert alert-error'><b>textStatus:</b> " + textStatus +"</p>");
						$("#log").append( "<p class='alert alert-error'><b>errorThrown</b>: " + errorThrown +"</p>" );
				}
			});
			return false;
		});//end event

		
		//GROUP DELETE
		$(".group-remove").on("click", function(){
			var panels = get_panels_info();
			
			//var dirname = $( panels["active"] + " .dirname").text();
			var dirname = vars["dirname"];
			
			var file = [];
			$( panels["active"] + " .wfm input[type=checkbox]:checked").each(function(){
				file.push( $(this).val() );
			});				
//console.log(file);
			var fsPath = dirname;
			// if ( vars["OS"] === "Windows" ){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// fsPath = vars["disk_symbol"] + dirname;
				// }
			// }
			
			$.ajax({
				//async: false,
				type: "POST",
				url: vars["remove_url"],
				data: ({fs_path: fsPath, file: file}),
				//dataType: "html",
				//dataType: 'script',
				beforeSend: function(){
//console.log(arguments);					
					//return false; //cancel
				},
				success: function( data, textStatus ){
//console.log(arguments);					
//console.log( "textStatus: " + textStatus );
						//$("#log").html( textStatus );
						//vars["log"].push( data );
						
						$("#log").append( data );
						get_filelist( vars["filelist_url"] , dirname, panels["active"], false );
				},
				
				error: function (XMLHttpRequest, textStatus, errorThrown){
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						$("#log").append( "<p class='alert alert-error'><b>textStatus:</b> " + textStatus +"</p>");
						$("#log").append( "<p class='alert alert-error'><b>errorThrown</b>: " + errorThrown +"</p>" );
				}
			});

			return false;
		});//end event

		//MKDIR
		$("#modal-mkdir .action-btn").on("click", function(){
			$("#modal-mkdir").modal("hide");
			var panels = get_panels_info();
			
			//var dirname = $( panels["active"] + " .dirname").text();
			var dirname = vars["dirname"];
			
			var fsPath = dirname;
			// if ( vars["OS"] === "Windows" ){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// fsPath = vars["disk_symbol"] + dirname;
				// }
			// }
			
			var newfolder = $("#modal-mkdir input[name=new_name]").val();
			$.ajax({
				type: "GET",
				url: vars["mkdir_url"],
				data: ({fs_path: fsPath, newfolder: newfolder}),
				success: function( data,textStatus ){
						$("#log").html( data );
						get_filelist ( vars["filelist_url"] , dirname, panels["active"], false );
					},
				error: function (XMLHttpRequest, textStatus, errorThrown){
//console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
						$("#log").append( "<p class='alert alert-error'><b>textStatus:</b> " + textStatus +"</p>");
						$("#log").append( "<p class='alert alert-error'><b>errorThrown</b>: " + errorThrown +"</p>" );
					}
			});
			return false;
		});//end event

		//CHANGE FOLDER
		//$(".subfolder").live("click",
		$(document).on( "click", ".right-panel .up-link, .right-panel .subfolder", function(e){//jquery > 1.7.2
			var dirname = $(this).attr("href");
			$(".right-panel .wfm .subfolder-tpl").empty();
			get_filelist( vars["filelist_url"], dirname, ".right-panel", false );
			
			$(".left-panel").removeClass("active-panel");
			$(".right-panel").addClass("active-panel");
			
			return false;
		});
		
		$(document).on( "click", ".left-panel .up-link, .left-panel .subfolder", function(e){
			var dirname = $(this).attr("href");
			$(".left-panel .wfm .subfolder-tpl").empty();
			get_filelist( vars["filelist_url"], dirname, ".left-panel", false );
			
			$(".right-panel").removeClass("active-panel");
			$(".left-panel").addClass("active-panel");
			
			return false;
		});//end event

		$(document).on("click", ".file a", function(e){
//console.log(e.target);
//console.log( $(this) );
			var $input = $(this).siblings("input[type=checkbox]");
			if( $input.prop("checked")){
				$input.prop("checked", false);
			} else {
				$input.prop("checked", true);
			}
		});
/*
		$("#btn-load-filelist").on("click", function(e){
//console.log(e);			
			//var dirname = $(".files .dirname").text();
			var files_panel = ".right-panel";
			
			//get_filelist( vars["filelist_url"], dirname, files_panel, true );
			get_filelist( vars["filelist_url"], vars["dirname"], files_panel, true );
			
			$("#playlist-title").text( vars["filename_new_playlist"] );
			return false;
		});//end event
*/

		//-------------------------------
		$("#clear-log").on("click", function(){
			$("#log").empty();
		});//end event


		
		//-------------------- PLAYLIST events
		$("#btn-clear-playlist").on("click", function(e){
//console.log(e);			
			myPlaylist.setPlaylist([]);
			$("#playlist-title").empty();
			vars["playlist"]="";
			
		});//end event
		
		//LOAD action
		$("#load-pls, #btn-load-pls").click(function(){
			
			$("#modal-load-pls").modal("show");
			$("#modal-load-pls input[name=filename]").val( vars["alias"] );
			
			var marked_files = get_marked_files();
			if ( marked_files.length == 1 ){
//console.log("marked_file:", marked_files[0]);
				$("#modal-load-pls input[name=filename]").val( marked_files[0] );
			} else {
				//var log_message = vars["messages"]["errorPlsFilename"];
				//$("#log").append( log_message );
			}
			return false;
		});//end event
		
		$("#modal-load-pls  .action-btn").click(function(e){
			$("#modal-load-pls").modal("hide");
			var log_message = "";
			var filename = $("#modal-load-pls input[name=filename]").val();
//console.log("filename:", filename, filename.length);
			
			if ( filename.length > 0){
				load_playlist( filename );
				var panels = get_panels_info();
				var $activePanel = $( panels["active"] );
				clearCheckbox( $activePanel );
			} else {
				log_message += vars["messages"]["emptyFilename"];
			}

			$("#log").append( log_message );
		});//end event

		
		
		//SAVE action
		$("#save-pls").on("click", function(e){
//console.log(e);	
			var filename = $("#modal-save-pls input[name=new_name]").val() ;
//console.log( filename, filename === vars["filename_new_playlist"]);

			if ( filename === vars["filename_new_playlist"] ){
				var panels = get_panels_info();
				var fsPathSrc = $( panels["active"] + " .dirname").text();
				// if ( vars["OS"] === "Windows" ){
					// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
						// fsPathSrc = vars["disk_symbol"] + fsPathSrc;
					// }
				// }
				filename = fsPathSrc + "/"+ vars["filename_new_playlist"];
			}
			$("#modal-save-pls input[name=new_name]").val( filename );
		});//end event
		
		$("#modal-save-pls  .action-btn").click(function(e){
			$("#modal-save-pls").modal("hide");
			var log_message = "";
			if ( myPlaylist.playlist.length > 0 ){
				
				var filename = $("#modal-save-pls input[name=new_name]").val() ;
				if ( filename.length > 0){
					var panels = get_panels_info();
					vars["dirname"] = $( panels["active"] + " .dirname").text();
//console.log( vars["dirname"] );				
					
					//filename = vars["dirname"] + "/"+ filename;
					save_playlist( filename, myPlaylist.playlist );
					
					//var playlistName = filename.substring( vars["dirname"].length+1, filename.legth );
					$("#playlist-title").text( filename );
					
				} else {
					log_message += vars["messages"]["emptyFilename"];
				}

			} else {
				log_message += vars["messages"]["emptyPls"];
			}
			$("#log").append( log_message );
		});//end event
		
		
		//--------------------
		$("#add-track").click(function(){
			var marked_files = get_marked_files();
//console.log( marked_files );

			if ( marked_files.length > 0){
				addTrack(marked_files);
			} else {
				//var log_message = vars["messages"]["noMarkedFiles"];
				//$("#log").append( log_message );
				//return false;
				
				var num = myPlaylist.playlist.length;
				$("#modal-edit-pls input[name=trackNum]").val( num );
				$('#modal-edit-pls').modal('show');
			}
			
		});//end event

		// $("#edit-pls").click( function(){
			// var marked_files = get_marked_files();
			// if( marked_files.length === 1){
// console.log("edit playlist", marked_files, marked_files.length);
			// }
		// });//end event
		
		$("#modal-edit-pls  .action-btn").on("click", function(e){
			$("#modal-edit-pls").modal("hide");
			
			// var log_message = "";
			// if ( myPlaylist.playlist.length == 0 ){
				// log_message += vars["messages"]["emptyPls"];
				// $("#log").append( log_message );
				// return false;
			// }
				
			var num = parseInt( $("#modal-edit-pls input[name=trackNum]").val() );
			var trackTitle = $("#modal-edit-pls input[name=trackTitle]").val();
//console.log(num, trackTitle );
			var trackUrl = $("#modal-edit-pls input[name=trackUrl]").val();
			//myPlaylist.playlist[num]["mp3"] = trackUrl;
			
			if (trackUrl.toLowerCase().lastIndexOf('.mp3') > 0){
				var track = {
					title: trackTitle,
					//artist:"The Stark Palace",
					mp3: trackUrl//,
					//oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg",
					//poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png",
					//free: false // Optional - Generates links to the media
				}
			}
			
			if (trackUrl.toLowerCase().lastIndexOf('.ogg') > 0){
				var track = {
					"title": trackTitle,
					"oga": trackUrl//,
					//free: false // Optional - Generates links to the media
				}
			}
			
			if (trackUrl.toLowerCase().lastIndexOf('.wav') > 0){
				var track = {
					"title": trackTitle,
					"wav": trackUrl//,
					//free: false // Optional - Generates links to the media
				}
			}

			//if( !myPlaylist.playlist[num] ){
				//myPlaylist.playlist[num]={};
			//}
			myPlaylist.playlist[num] = track;

			//replace text
			$("#jp_container_N .jp-playlist ul li").each( function(key, value){ 
				if( key === num){
					$(this).find(".jp-playlist-item").text( trackTitle );
				}
			});//end each
			
			//myPlaylist.remove(num);
			//myPlaylist.add(track);			
			
			changePlaylistItem( "*" + vars["filename_new_playlist"] );
			
			//save changes
			// var filename = $("#modal-save-pls input[name=new_name]").val() ;
// //console.log( filename );
			// if ( filename.length === 0){
				// log_message += vars["messages"]["emptyFilename"];
				// $("#log").append( log_message );
				// return false;
			// }
			// save_playlist( filename, myPlaylist.playlist );
			// $("#playlist-title").text(filename);
			
		});//end event


		
		$("#checkAll").on("click", function(){
			
			var panels = get_panels_info();
			$( panels["active"] + " .wfm input[type=checkbox]" ).each(function(num, item){
//console.log(num, item);
				//item.setAttribute("checked", "checked");
				$(item).prop("checked", true);
			});		
			
		});//end event
		
		$("#clearAll").on("click", function(){
			var panels = get_panels_info();
			var $activePanel = $( panels["active"] );
			/*
			$( panels["active"] + " .wfm input[type=checkbox]" ).each(function(num, item){
//console.log(num, item);
				//item.removeAttribute("checked");
				$(item).prop("checked", false);
			});		
			*/
			clearCheckbox( $activePanel );
		});//end event
		
};//end initApp()


	function clearCheckbox( $panel ){
		$panel.find(".wfm :checkbox:checked").each(function(num, item){
//console.log(num, item);
			$(item).prop("checked", false);
		});		
	}//end clearCheckbox
	
	var get_marked_files = function(){
		var panels = get_panels_info();
		vars["dirname"] = $( panels["active"] + " .dirname").text();
		var marked_files = [];
		$( panels["active"] + " .wfm .files-list input[type=checkbox]:checked").each(function(num, item){
			
			// var newLink = vars["dirname"] +"/" + $(this).val();
// console.log( newLink );
			// marked_files.push ( newLink );
			
/*			
//------------------ replace fs path to web alias
//vars["dirname"] = "/documents/laptev/www/music/Def Leppard/1983 - Pyromania";
var pos1 = vars["dirname"].indexOf( vars["alias"] );
//var pos2 = pos1 + vars["alias"].length;
//console.log(pos1, pos2);
var newLinkPath = vars["dirname"].substring( pos1, vars["dirname"].length );
//console.log(newLinkPath);
marked_files.push ( newLinkPath +"/" + $(this).val() );
//-----------------
*/

//----------------------- get relative path
var relativePath = vars["dirname"].substring( vars["content_location"].length, vars["dirname"].length );
//console.log( "relativePath: " + relativePath );
var newLinkPath = vars["alias"] + relativePath;
//console.log( "newLinkPath: " + newLinkPath );
marked_files.push ( newLinkPath +"/" + $(this).val() );
//-----------------

			//$(this).removeAttr("checked");
			$(item).prop("checked", false);
		});		
		return marked_files;
	}//end  get_marked_files()

	var get_panels_info = function() {
		var panels = [];
		if ( $(".left-panel").hasClass("active-panel") ){
			panels["active"] = ".left-panel";
			panels["destination"] = ".right-panel";
			return panels;
		}
		if ( $(".right-panel").hasClass("active-panel") ){
			panels["active"] = ".right-panel";
			panels["destination"] = ".left-panel";
			return panels;
		}
		return false;
	}//end get_panels_info

	
	

	//TEST PHP
	function test_php( callback ){
		$.ajax({
			type: "GET",
			url: vars["testUrlPHP"],
			success:function(data, status){
console.log("test status - " + status);
console.log("data - " + data);			
				if (data == "4"){
					vars["testPHP"] = true;
				} else {
					vars["testPHP"] = false;
				}
				
				if( typeof callback === "function"){
					callback( vars["testPHP"] );
				}
			},
			
			error:function (XMLHttpRequest, textStatus, errorThrown) {
//console.log( "XMLHttpRequest: ", XMLHttpRequest );
//console.log( "textStatus: ", textStatus );
//console.log( "errorThrown: ", errorThrown );
				vars["testPHP"] = false;
				if( typeof callback === "function"){
					callback( vars["testPHP"] );
				}
			}
		});
	}// enf test_php()

	//TEST ASPX
	function test_aspx(  callback ){
		$.ajax({
			type: "GET",
			url: vars["testUrlASPX"],
			success:function(data, status){
//console.log("test status - " + status);
//console.log("data - " + data);					
				if (data == "4"){
					vars["testASPX"] = true;						
				} else {
					vars["testASPX"] = false;						
				}
				
				if( typeof callback === "function"){
					callback( vars["testASPX"] );
				}
				
			},
			
			error:function (XMLHttpRequest, textStatus, errorThrown) {
console.log( "XMLHttpRequest: " + XMLHttpRequest );
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );
				vars["testASPX"] = false;						
				if( typeof callback === "function"){
					callback( vars["testASPX"] );
				}
			}
		});
		
	}// enf test_aspx()

	
	//function get_filelist( url, dirname, panel, reload_pls )
	//get_filelist = function( url, dirname, panel, reload_pls ){
	get_filelist = function( url, dirname, panel ){
		
		var fsPath = dirname;
		// if ( vars["OS"] === "Windows" ){
			// //dirname = dirname.replace("file:///","");
			// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
				// fsPath = vars["disk_symbol"] + dirname;
			// }
		// }

		
		$.ajax({
			//async: false,
			type: "GET",
			url: url,
			//data: ({dir: dirname}),
			data: ({dir: fsPath}),
			//dataType: "xml",
			
			beforeSend: function(){
//console.log("beforeSend");
//console.log(arguments);
			},
			
			success: function( xml,textStatus, xhr ){
//console.log(arguments);
//console.log(data, textStatus, xhr);
//for( var item in xml){
//console.log(item, " : " ,xml[item]);
//}
/*
$(xml).find('dir').each(function(num, item){
//console.log(arguments);
console.log( $(item ).text() );
console.log( $(this).text() );
});
*/
					//var log_message = "<p>" + textStatus +", function get_filelist( "+url+" ) </p>";
					//$("#log").append( log_message );
				
					//$("#log").append( xml );
					//var all_headers = xhr.getAllResponseHeaders();
					//$("#log").append( all_headers );
				
					var filelist_parse_res = parse_filelist_xml( xml );
					vars["filelist"] = filelist_parse_res;

					//reload_file_panel( filelist_parse_res, dirname, panel, reload_pls );
					reload_panel( filelist_parse_res, dirname, panel );
			},
				
			error: function (xhr, textStatus, errorThrown){
console.log(arguments);
console.log( "textStatus: " + textStatus );
console.log( "errorThrown: " + errorThrown );

					var msg = "function get_filelist( "+url+" ), " + textStatus +", "+errorThrown;
					vars["log"].push(msg);
					var log_message = "<p class='alert alert-error'>"+ msg +"</p>";
					$("#log").append( log_message );
			},
			
			complete: function(xhr, textStatus){
//console.log("complete");
//console.log(arguments);
			},
			
		});

		
	}// end get_filelist

	//function get_filelist_php( url, dirname, panel, reload_pls )
	//get_filelist_php = function( url, dirname, panel, reload_pls ){
	get_filelist_php = function( url, dirname, panel ){
			var subfolders_html = "";
			var files_html = "";
			$.getJSON(url,
				{ dir: dirname },
				function(data){
//console.log(data);		
					vars["filelist"] = data;
					reload_panel( vars["filelist"], dirname, panel );
				}
			);// end getJSON

	}//end get_filelist_php()
	
	
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

	
	function parse_filelist_xml( xml ){
		
		//var url = vars["protocol"];
		var url = "file://";
		
		var filelist = [];
		filelist["subfolders"] = [];
		filelist["files"] = [];
	
		$(xml).find('dir').each(function(){
			var filename = $(this).text();
			
			//var file = url + "/" + filename.replace("\\","\/");
			var file = filename.replace("\\","\/");
			// if ( vars["OS"] === "Windows"){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// file = file.replace( vars["disk_symbol"],"");
				// }
			// }
			
			filelist["subfolders"].push( file );
		});//end each
		
		$(xml).find('file').each(function(){
			var filename = $(this).text();
			
			//var file = url + "/" + filename.replace("\\","\/");
			var file = filename.replace("\\","\/");
			// if ( vars["OS"] === "Windows"){
				// if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
					// file = file.replace( vars["disk_symbol"],"");
				// }
			// }
			
			filelist["files"].push( file );
		});//end each

//console.log ( "filelist: ", filelist );
		return filelist;
	}// end parse_filelist_xml()

	
	function prep_playlist( filelist ){
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
				mp3: filelist[file]//,
				//free: false, // Optional - Generates links to the media
				};
				playlist.push(track);
			}
			if (filename.toLowerCase().lastIndexOf('.ogg') > 0)
			{
				var track = {
				title: filename,
				oga: filelist[file]//,
				//free: false, // Optional - Generates links to the media
				};
				playlist.push(track);
			}
			if (filename.toLowerCase().lastIndexOf('.wav') > 0)
			{
				var track = {
				title: filename,
				wav: filelist[file]//,
				//free: false, // Optional - Generates links to the media
				};
				playlist.push(track);
			}
		}
		return playlist;
	}//end prep_playlist()


	//function reload_file_panel( filelist, dirname, panel, reload_pls ){
	function reload_panel( filelist, dirname, panel ){
//console.log(arguments);
/*		
		if ( reload_pls == true){//-------------------------- insert playlist
//test	
// for (var n = 0; n < filelist["files"].length; n++){
	// filelist["files"][n] = filelist["files"][n].replace("file:///D:","");
// }//next
// console.log( filelist );		
			var playlist = prep_playlist( filelist["files"] );
			myPlaylist.setPlaylist( playlist );
		}
*/
		//insert playlist
		if ( vars["playlist"] ){
			load_playlist( vars["playlist"] );			
		}

		var subfolders_html = "";
		var files_html = "";
		for ( var item in filelist){
//console.log(item);			
			if ( item=="subfolders" ){
				var subfolders = filelist[item];
	//console.log( "Subfolders = " + subfolders );
				for (var subfolder in subfolders) {
	//console.log( "Subfolder = " + subfolders[subfolder] );
					var subfolder_url = subfolders[subfolder];
					var last_slash_pos = subfolders[subfolder].lastIndexOf('/')+1;
					var subfolder_name = subfolders[subfolder].substring( last_slash_pos);

					subfolders_html += vars["templates"]["subfolder_tpl"].replace("#", subfolder_url).replace(/sname/g, subfolder_name);
				}//next
			}

			if ( item=="files") {
				var files = filelist[item];
				for(file in files) {
					var last_slash_pos = files[file].lastIndexOf('/')+1;
					var filename = files[file].substring( last_slash_pos );
					
					//files_html += vars["templates"]["file_tpl"].replace("#", files[file] ).replace(/fname/g, filename);
//----------------------- get relative path and form file link
var relativePath = files[file].substring( vars["content_location"].length, files[file].length );
//console.log( "relativePath: " + relativePath );
var fileLink = vars["alias"] + relativePath;
//console.log( "fileLink: " + fileLink );
files_html += vars["templates"]["file_tpl"]
.replace("#", fileLink )
.replace(/fname/g, filename);
//-----------------
					
				}//next
			}
		}//next

		$( panel + " .subfolder-tpl").html( subfolders_html );
		
		var up_link = dirname.substring( 0, dirname.lastIndexOf("/") );
		if( up_link.length === 0){
			up_link = "/";
		}
		/*
		if ( vars["OS"] === "Windows" ){
			//up_link = "file:///"+up_link;
			if( vars["disk_symbol"] && vars["disk_symbol"].length > 0){
				up_link = vars["disk_symbol"] + up_link;
			}
		}
		*/
		vars["up_link"] = up_link;
	
		$( panel + " .up-link").attr("href", up_link );
		$( panel + " .dirname").text(dirname);
		vars["dirname"] = dirname;

		$( panel + " .file-tpl").html( files_html );
				
	}//end reload_panel()

	function addTrack( tracks ){
//console.log( tracks );
		
		var playlist = [];
		for ( var item in tracks){
			var track = tracks[ item ] ;
			
			track = vars["website"] + track;
			
			var filename = track.substring( track.lastIndexOf('/')+1, track.length);
			var filetype = track.substring( track.lastIndexOf('/')+1, track.length);

			var playlist = myPlaylist.playlist;
			var add = false;
			if (filename.toLowerCase().lastIndexOf(".mp3") > 0){
				add = { "title":filename, "mp3": track//, free: false 
				};
			}
			if (filename.toLowerCase().lastIndexOf('.ogg') > 0){
				add = { "title":filename, "oga": track//, free: false 
				};
			}
			if (filename.toLowerCase().lastIndexOf('.wav') > 0){
				add = { "title":filename, "wav": track//, free: false 
				};
			}
			
			if( add ){
				playlist.push( add );
			}
			
		}//next
		
		if( playlist.length > 0){
			myPlaylist.setPlaylist( playlist );
			changePlaylistItem( "*" +vars["filename_new_playlist"] );
		}
	}//end addTrack()
	
	function load_playlist( url ){
		//var url = "pls/" + filename;
		$.getJSON( url )
			.done( function( json ) {
				
			myPlaylist.setPlaylist( json );
			changePlaylistItem( url );
			
			var filename = url.substring( url.lastIndexOf('/')+1, url.length);
			$("#playlist-title").text( filename );
			$("#modal-save-pls input[name=new_name]").val( vars["dirname"] + "/" + filename );
		})
			.fail( function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
console.log( "textStatus: " + textStatus );
console.log( "error: " + error );
				var log_message = "<p class='alert alert-error'>function load_playlist( "+url+" ), " + textStatus +", "+error +"</p>";
				$("#log").append( log_message );
		});
	}

	function save_playlist( filename, playlist ){
//console.log( filename, playlist );

		//correct track path, remove http://website
		for( var n = 0; n < playlist.length; n++){
//console.log( n, playlist[n] );
			if( playlist[n]["mp3"] && 
					playlist[n]["mp3"].indexOf( vars["website"] ) !== -1){
				playlist[n]["mp3"] = playlist[n]["mp3"].replace( vars["website"], "");
			}
			if( playlist[n]["wav"] && 
					playlist[n]["wav"].indexOf( vars["website"] ) !== -1){
				playlist[n]["wav"] = playlist[n]["wav"].replace( vars["website"], "");
			}
			if( playlist[n]["ogg"] && 
					playlist[n]["ogg"].indexOf( vars["website"] ) !== -1){
				playlist[n]["ogg"] = playlist[n]["ogg"].replace( vars["website"], "");
			}
		}
//console.log( filename, playlist );

		var param = {
			"filename": filename, 
			"playlist": playlist
		};

		//correct for aspx send query
		if(vars["testASPX"]){
/*
			var title = ["ABBA - SOS.mp3", "Afric Simone - Hafanana.mp3"];
			var url = ["/music/A/ABBA%20-%20SOS.mp3", "/music/A/Afric Simone - Hafanana.mp3"];
			var attr = [true, true];
			
			param["title"] = title;
			param["url"] = url;
			param["attr"] = attr;
*/
			param = { "filename" : filename, "json" : JSON.stringify( playlist ) };
		}	
		
		$.ajax({
			type: "POST",
			url: vars["save_pls_url"],
			//dataType: "json",
			data: param, 
			
			beforeSend: function(){
//console.log("beforeSend:", arguments);					
				//return false; //cancel
			},
			
			success: function( data,textStatus ){
console.log( arguments );
				//$("#log").html( textStatus );
				$("#log").append( data );

				var dirname = $(".files .dirname").text();
				var files_panel = ".right-panel";
				get_filelist( vars["filelist_url"], dirname, files_panel, true );

			},
			error: function (XMLHttpRequest, textStatus, errorThrown){
//console.log( "textStatus: " + textStatus );
//console.log( "errorThrown: " + errorThrown );
				var msg = "<p class='alert alert-error'>";
				msg += "<b>url:</b> " + vars["save_pls_url"] +", ";
				msg += "<b>textStatus:</b> " + textStatus +", ";
				msg += "<b>errorThrown</b>: " + errorThrown;
				msg += "</p>";
				$("#log").append( msg );
			}
		});

	}//end save_playlist

	function changePlaylistItem( plsName ){

		//myPlaylist.setPlaylist( playlist );//async  action??????

		var timerId = setTimeout(function(){// wait 1 sec. for refresh playlist !!!
		
			$("#jp_container_N .jp-playlist ul li").each( function(key, value){ 
				$(this).data("num", key);
			});//end each
			
			$("#jp_container_N .jp-playlist ul li").each( function(key, value){ 
//console.log( key, value );

				//add Edit button in playlist
				var btn_edit = vars["templates"]["btn_edit"].replace("#numTrack", "#track" + key);
				var test = $(this).children("div").find(".jp-playlist-item-edit");
//console.log( test.length );
				if( test.length === 0){
					
					//$(this).append( btn_edit );
					$(this).children("div").append( btn_edit );
					//$(this).find(".jp-free-media").hide();
							
					$(this).on("click", ".jp-playlist-item-edit", function(e){
//console.log("click!!!", $(this).attr("href") );
						editPlaylistItem( $(this) );
					});//end event
				}
				//----------------------
				//add mouse  events (for sort process)
/*				
				$(this)[0].onmousemove = function(event){
//console.log( "onmousemove!!!", event );
					//event = event || fixEvent.call(this, window.event);
// console.log( event.clientX, event.clientY );
// console.log( event.pageX, event.pageY );
// console.log( event.screenX, event.screenY );
				};//end event
				
				$(this)[0].onmousedown = function(event){
console.log( "onmousedown!!!", event );
				};//end event
	
				$(this)[0].onmouseup = function(event){
console.log( "onmouseup!!! Stop drag & drop...");
				};//end event
*/
				// $(this).on("mousedown", function(event){
// console.log( "onmousedown!!!", event );
				// });//end event
				
				// $(this).on("mouseup", function(event){
// console.log( "onmouseup!!! Stop drag & drop...");
// console.log( $(this).data() );
				// });//end event
	
			});//end each

//console.log( $("#jp_container_N .jp-playlist").html() );
		}, 1*1000 );

		$("#playlist-title").text( plsName );
				
		var panels = get_panels_info();
		var $activePanel = $( panels["active"] );
		clearCheckbox( $activePanel );
	}//end changePlaylistItem
	
	//Edit playlist item
	function editPlaylistItem( $btn ){
		var num = $btn.attr("href").replace("#track", "");
		var trackTitle = myPlaylist.playlist[num]["title"];
		var trackUrl = myPlaylist.playlist[num]["mp3"];
		
		$("#modal-edit-pls input[name=trackNum]").val( num );
		$("#modal-edit-pls input[name=trackTitle]").val( trackTitle );
		$("#modal-edit-pls input[name=trackUrl]").val( trackUrl );
		$('#modal-edit-pls').modal('show');

	}//end editPlaylistItem()
	
	return "Web Music player + File manager";
	
}//end MusicFM