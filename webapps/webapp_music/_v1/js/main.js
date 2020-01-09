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

	vars["playlistObj"] = myPlaylist;
//console.log(vars);	

/*
	var playlist = new Array();

	var filename = "test";
	var artist = "test";
	var mp3 = "/music/A/ABBA - SOS.mp3";
	//var mp3 = "/music/A/Amorphis - Thousand lakes.mp3";//error format!
	
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
//=========================================	

	$('.top').click(function (e) {
	  e.preventDefault();
	  $('html,body').animate({scrollTop: $('#top').offset().top-150}, 400);
	});

});

