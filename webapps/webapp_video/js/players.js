if( typeof window.jQuery === "function"){
//var msg = 'jQuery version: ' + jQuery.fn.jquery;
//func.log(msg);

	$(document).ready(function(){
//console.log("document ready");

	$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				title: "Bubble",
				m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
				oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
			});
		},
		//swfPath: "../../dist/jplayer",
		swfPath: "players",
		supplied: "m4a, oga",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
	
/*	
	var myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [
		{
			title:"Cro Magnon Man",
			artist:"The Stark Palace",
			mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
			oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
			poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
		}
	], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "players",
		supplied: "webmv, ogv, m4v, oga, mp3",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true
	});
*/
	var playList1 = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_N",
			cssSelectorAncestor: "#jp_container_N"
		}, [
			{
				title:"test MP4",
				artist:"test artist",
				free:true,
				m4v: "/sites/romanlaptev.github.io/test_code/html/test_media/video/video.mp4"
				//m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
				//ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
				//webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
				//poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
			},
			{
				type: "youtube", // Remember to add this
				title:"Life in da trash",
				artist:"LITTLE BIG",
//http://site-content/video/videoclips/L/Little%20Big/LITTLE%20BIG%20-%20Life%20in%20da%20trash.mp4				
				//+m4v: "http://youtube.com/embed/UVrjzOUZJI4",
				m4v: "https://www.youtube.com/watch?v=UVrjzOUZJI4"
			},
			{
				title:"AK-47",
				artist:"LITTLE BIG",
				m4v: "http://ok.ru/videoembed/1147112392106"
			},
			{
				title:"test FLV",
				artist:"test artist",
				free:true,
				flv: "/sites/romanlaptev.github.io/test_code/html/test_media/video/hippo.flv"
			},

		], {
			swfPath: "players",
			supplied: "flv, webmv, ogv, m4v",
			// supplied: "m4v, ogv, m4a, mp3, oga",
			// supplied: "ogv, m4v, oga, mp3, m4a",
			// supplied: "m4v, ogv, mp3, oga",
			// supplied: "oga, mp3",
			// supplied: "m4v, ogv",
			// supplied: "m4a, mp3, m4v",
			// supplied: "m4v, mp3",
			// supplied: "mp3, m4v",
			// supplied: "m4v",
			// supplied: "rtmpv",
			
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true
		});//end playlist
		
//console.log( playList1 );

//================================= 
//https://www.codeseek.co/renandecarlo/jplayer-playlist-with-youtube-video-yJqpPW
//https://www.codeseek.co/renandecarlo/jplayer-playlist-with-youtube-video-yJqpPW

// Youtube Integration Setup
	var setupYoutube = function(whereDivTo, width, height) {
		$("<div>").attr("id", "ytplayer").appendTo(whereDivTo);

		onYouTubeIframeAPIReady = function() {
	 		youtubeApi = new YT.Player("ytplayer", {
				width: width,
				height: height,
        videoId: "UVrjzOUZJI4",
				playerVars: {
					"autoplay": 1,
					"color": "white",
					"modestbranding": 1,
					"rel": 0,
					"showinfo": 0,
					"theme": "light"
				},
				events: {
					"onReady": function() {
						$(document).trigger("ready.Youtube");
					},
					"onStateChange": "youtubeStateChange"
				}
			});
	 	}

 		$.getScript("//www.youtube.com/player_api");
	},
	loadYoutubeListeners = function(player, jplayer, id) {
		var container = $(player.options.cssSelector.gui, player.options.cssSelectorAncestor);

		youtubeStateChange = function(ytEvent) {
 			switch(ytEvent.data) {
 				case -1:
 					$(ytEvent.target.getIframe()).show();
 					$(jplayer).find('video').hide();
				 	container.css({ 'opacity' : 0, 'z-index': -1, 'position' : 'relative' });
				 	container.find('.jp-interface').slideUp("slow");
 				break;

 				case YT.PlayerState.ENDED:
 					$(jplayer).trigger($.jPlayer.event.ended);
 				break;

 				case YT.PlayerState.CUED:
 					$(jplayer).find('video').show();
 					$(ytEvent.target.getIframe()).hide();
 					container.css({ 'opacity' : 1, 'z-index': 0 });
 					container.find('.jp-interface').slideDown("slow");

 			}
		};

 		youtubeApi.loadVideoById(id);
	}
	
	
	$(document).on($.jPlayer.event.setmedia, function(jpEvent) {
		var player = jpEvent.jPlayer,
			url = player.status.src;

		if(!player.html.video.available) return;
	 	if(typeof player.status.media.type === "undefined" || player.status.media.type != 'youtube') {
	 		if(window['youtubeApi'])
	 			if(youtubeApi.getPlayerState() != YT.PlayerState.CUED && youtubeApi.getPlayerState() != YT.PlayerState.ENDED)
					return youtubeApi.stopVideo();

	 		return;
	 	}

	 	var youtubeId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]

		if(window['youtubeApi'])
			loadYoutubeListeners(player, jpEvent.target, youtubeId);
		else {
			setupYoutube(jpEvent.target, player.status.width, player.status.height);

		 	$(document).on("ready.Youtube", function() {
		 		loadYoutubeListeners(player, jpEvent.target, youtubeId);
		 	});
		}
	});//end event
	
//=================================

	});//end ready
	
}
