
function defineEvents(){
	
//------------------------------------------------------------------
	$("#list-video, #block-taglist, #block-search, #block-playlist, #player-buttons").on("click", function(event){
	//$("#list-video, #block-taglist, #block-search, #block-playlist").on("click", function(event){
//console.log("click...", event);
		event = event || window.event;
		var target = event.target || event.srcElement;
		
		if( target.tagName === "A"){
			_actionClick(target, event);
		}
		
//console.log( target.form, target.form.name );
		//local url click
		if( target.form && 
				target.form.name === "form_local_url" && 
					target.tagName === "BUTTON"){

			
			if( target.name === "add_pls"){
				if( $(target).data("type") === "local-file" ){
					var filePath = target.form.elements.filepath.value;
					if( filePath.length === 0){
webApp.vars["logMsg"] = "local video <b>file path</b> must be define.....";
func.logAlert( webApp.vars["logMsg"], "warning");
						return false;
					} else {
						target.value = filePath + target.value;
					}
				}
//console.log( target.name, target.value );
				_player_addTrack( target );
			}
			
		}
		
	});//end event



	//$("#btn-play").on("click", function(event){
		////webApp.vars["player"].play();
	//});//end event

	//$("#btn-pause").on("click", function(event){
		////webApp.vars["player"].pause();
	//});//end event
	
	if( webApp.vars["player"].nodeName === "VIDEO"){
		
		webApp.vars["player"].addEventListener('ended',function(e){
//console.log(e);
			var url = "?q=next-track&autoplay=TRUE";
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		},false);//end event
		
		//$("#player1").on("ended", function(e){
	//console.log(e);
		//});//end event
	}

	
}//end defineEvents()


	function _urlManager( target ){
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {


//-------------------------------------------- PLAYLIST
			case "load-track":
//console.log(target, $(target).parent() );
//for test
//webApp.vars["GET"]["num"] = "first num";

				var num = parseInt(webApp.vars["GET"]["num"]);
//console.log(num, typeof num, isNaN(num) );
				if( isNaN(num) ){
					webApp.vars["logMsg"] = "not found track by num: "+ webApp.vars["GET"]["num"];
console.log( "-- " + webApp.vars["logMsg"] );
					return false;
				}
				var track = webApp.vars["playlist"]["tracks"][num];
				if(!track){
console.log( "-- no track!!!!");
					return false;
				}				
				
				var videoSrc = track["src"];
				
				if( track["dataType"] === "embed-video" ){
					$(webApp.vars["player"]).hide();
					$(webApp.vars["iframePlayer"]).attr("src", videoSrc);
					$(webApp.vars["iframePlayer"]).show();
				} else {
					$(webApp.vars["iframePlayer"]).hide();
					$(webApp.vars["player"]).attr("src", videoSrc);
					$(webApp.vars["player"]).show();
				}
				
				webApp.vars["playlist"]["lastNum"] = num;
				
				var track_info = track["title"];
				$("#track-info").text(track_info);
				_draw_setActiveTrack(num);
			break;
/*
			case "stop-play":
				//webApp.vars["player"].stop();
				$(webApp.vars["player"]).attr("src","");
				$("#track-info").text("");
			break;
*/			
			case "prev-track":
				$(webApp.vars["iframePlayer"]).attr("src", "");
				$(webApp.vars["player"]).attr("src", "");
				
				if( webApp.vars["playlist"]["lastNum"] > 0){
					webApp.vars["playlist"]["lastNum"]--;
				}
				
				var num = webApp.vars["playlist"]["lastNum"];
//console.log( num );
				var track = webApp.vars["playlist"]["tracks"][num];
				if(!track){
console.log( "-- no track!!!!");
					return false;
				}				
				var videoSrc = track["src"];
				
				if( track["dataType"] === "embed-video" ){
					$(webApp.vars["player"]).hide();
					$(webApp.vars["iframePlayer"]).attr("src", videoSrc);
					$(webApp.vars["iframePlayer"]).show();
				} else {
					$(webApp.vars["iframePlayer"]).hide();
					$(webApp.vars["player"]).attr("src", videoSrc);
					$(webApp.vars["player"]).show();
				}
	//console.log( num, webApp.vars["playlist"]["tracks"][num]["title"]);
//$("#player1").attr("src", videoSrc);
	
				var track_info = track["title"];
				$("#track-info").text(track_info);
				_draw_setActiveTrack(num);
				
			break;
			
			case "next-track":
				$(webApp.vars["iframePlayer"]).attr("src", "");
				$(webApp.vars["player"]).attr("src", "");
				
				var autoplay = false;
				
				if( webApp.vars["playlist"]["lastNum"] < (webApp.vars["playlist"]["tracks"].length - 1) ){
					
					webApp.vars["playlist"]["lastNum"]++;
					
					if( webApp.vars["GET"]["autoplay"] === "TRUE"){
						autoplay = true;
					}
				}
				
				var num = webApp.vars["playlist"]["lastNum"];
//console.log( num );

				var track = webApp.vars["playlist"]["tracks"][num];
				if(!track){
console.log( "-- no track!!!!");
					return false;
				}				
				var videoSrc = track["src"];
				if( track["dataType"] === "embed-video" ){
					autoplay = false;
					$(webApp.vars["player"]).hide();
					$(webApp.vars["iframePlayer"]).attr("src", videoSrc);
					$(webApp.vars["iframePlayer"]).show();
				} else {
					$(webApp.vars["iframePlayer"]).hide();
					$(webApp.vars["player"]).attr("src", videoSrc);
					$(webApp.vars["player"]).show();
				}
//console.log( num, webApp.vars["playlist"]["tracks"][num]["title"]);
//console.log( webApp.vars["player"].contentDocument.body.getElementsByTagName("video").item(0) );
//$("#player1").attr("src", videoSrc);
	
				var track_info = track["title"];
				$("#track-info").text(track_info);
				_draw_setActiveTrack(num);
				
				if( autoplay ){
					webApp.vars["player"].play();
				}
				
			break;
			
			case "clear-playlist":
				webApp.vars["playlist"]["tracks"] = [];
				webApp.vars["playlist"]["lastNum"] = 0;
				
				$(webApp.vars["iframePlayer"]).attr("src", "");
				$(webApp.vars["player"]).attr("src", "");
				$("#track-info").text("");
				
				//reload block-playlist
				_draw_buildBlock({
					"locationID" : "block-playlist",
					"title" : "Playlist", 
					"templateID" : "tpl-block-playlist",
					"content" : ""
				});				
				
			break;

			//case "check-all":
				//_draw_checkAll();
			//break;
			
			//case "clear-all":
				//_draw_clearAll();
			//break;
			
			case "remove-track":
				var num = parseInt( webApp.vars["GET"]["num"] );
//console.log(num, typeof num, isNaN(num) );
				if( isNaN(num) ){
					webApp.vars["logMsg"] = "not found track by num: "+ webApp.vars["GET"]["num"];
console.log( "-- " + webApp.vars["logMsg"] );
					return false;
				}
				//delete webApp.vars["playlist"]["tracks"][0];
				webApp.vars["playlist"]["tracks"].splice(num, 1);
//console.log(webApp.vars["playlist"]);

				webApp.vars["playlist"]["lastNum"] = 0;
				
				if( webApp.vars["playlist"]["tracks"].length > 0){
//------------------ LOAD first video to player
					var url = "?q=load-track&num=0";
					webApp.vars["GET"] = func.parseGetParams( url ); 
					_urlManager();
//------------------
					//refresh block-playlist
					var _block = webApp.vars["blocks"][0];
					_block["buildBlock"]();
				} else {
					webApp.vars["playlist"]["tracks"] = [];
					$(webApp.vars["iframePlayer"]).attr("src", "");
					$(webApp.vars["player"]).attr("src", "");
					$("#track-info").text("");
					
					//reload block-playlist
					_draw_buildBlock({
						"locationID" : "block-playlist",
						"title" : "Playlist", 
						"templateID" : "tpl-block-playlist",
						"content" : ""
					});				
				}

			break;
			
//--------------------------------------------

			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()


	function _draw_setActiveTrack( activeNum ){
//console.log(activeNum);	
		var activeItem = false;
		$("#playlist li").each(function(num, value){
//console.log(num)
			$(this).removeClass("active");
//console.log(num, activeNum, typeof activeNum, num === activeNum);
			if( num === activeNum){
				activeItem = value;//this...
			}
		});//end each
		
		if( activeItem ){
			$(activeItem).addClass("active");
		}
	}//end _draw_setActiveTrack()
/*
	function _draw_checkAll(){
		$("#playlist li input[type=checkbox]").each(function(num, item){
//console.log(num, item);
			$(item).prop("checked", true);
		});//end each
	}//end _draw_checkAll()

	function _draw_clearAll(){
		$("#playlist li input[type=checkbox]").each(function(num, item){
			$(item).prop("checked", false);
		});//end each
	}//end _draw_clearAll()
*/
