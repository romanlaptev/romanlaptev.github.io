$(document).ready(function(){

	var myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	},
	[
	], 
{
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "../players/jPlayer-2.5.0/js",
		//supplied: "webmv, ogv, m4v, oga, mp3",
		supplied: "mp3",
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true
	});


//=========================================	
	$(".set-playlist").click(function() {
/*
		var playlist = new Array();

		var filename = "Blackened";
		var artist = "Metallica";
		var mp3 = "/music/M/Metallica/1988_And_Justice_For_All/01_Blackened.mp3";
		var link_to_media =  true;

		var track = {
			title: filename,
			"artist": artist,
			mp3: mp3,
			free: link_to_media, 
		};
		playlist.push(track);
		myPlaylist.setPlaylist( playlist );
*/		


		var pls_name = $(this).attr("href").replace("#","");
console.log( eval(pls_name) );
		var pls_obj = eval( pls_name )
		myPlaylist.setPlaylist( pls_obj.tracks );

		return false;
	});

//================================================
	$('.top').click(function (e) {
	  e.preventDefault();
	  $('html,body').animate({scrollTop: $('#top').offset().top-150}, 400);
	});

});

