var webApp = {
	
	"vars" : {
		"app_title" : "video collection",
		"logMsg" : "",
		//"messages" : {
			////"storeNotFound" : "<p class='alert alert-danger'>Object store not exists in DB!!!</p>"
			//"nodeNotFound" : "<p class='alert alert-danger'>node not found!!!</p>",
			//"templateNotFound" : "<p class='alert alert-danger'>Not find template, id: <b>{{templateID}}</b></p>"
		//},
		//"templates_url" : "tpl/templates.xml",
		//"GET" : {},
		"DB" : {
			"dataUrl" : "db/export_video.xml",
			"dbType" : "xml",
			//"data_url" :"db/art_correct.json",
			//"db_type" : "json",
			"dbName": "video",
			"tagNameFilms": "video",
			"numRecordsPerPage":10,
			"dateFormat": "dd-mm-yyyy hh:mm:ss",
			"sortOrder": "asc",
			"sortByKey": "title", //"published", 
			"queryRes": []
		},

		"blocks": [
			{
				"locationID" : "block-playlist",
				"title" : "Playlist", 
				"templateID" : "tpl-block-playlist",
				"content" : "",
				"visibility" : true,//"frontPage"
				"buildBlock" : function(){
//console.log(this);
					for(var n = 0; n < webApp.modPlayer.vars["playlist"]["tracks"].length; n++){
						webApp.modPlayer.vars["playlist"]["tracks"][n]["number"] = n;
					}//next
					
					var html = _draw_wrapData({
						"data": webApp.modPlayer.vars["playlist"]["tracks"],
						"templateID": "tpl-playlist",
						"templateListItemID": "tpl-playlist-item"
					});
//console.log( html);
//var html = "<h1>...test</h1>";
					if( html && html.length > 0){
						this.content = html;
						_draw_buildBlock( this );
					}
					
					if( webApp.modPlayer.vars["playlist"]["tracks"].length > 0 ){
						_draw_setActiveTrack(0);
					}

				}
			},//end block
			
			{
				"locationID" : "block-links",
				"title" : "footer links", 
				"templateID" : "tpl-block-links",
				"content" : "",
				"visibility":true,
				"buildBlock" : function(){
					_draw_buildBlock( this );
				}
			}, //end block
			
			
			{
				"locationID" : "block-taglist",
				"title" : "block-taglist!!!!!!!",
				"templateID" : "tpl-block-taglist",
				"content" : "...",
				"visibility":true,
				"buildBlock" : function(){
					
					var html = _draw_wrapData({
						"data": webApp.vars["DB"]["tags"],
						"templateID": "tpl-taglist",
						"templateListItemID": "tpl-taglist-item"
					});
//console.log( html);
					if( html && html.length > 0){
						this.content = html;
						_draw_buildBlock( this );
					}
				}
			}, //end block

			{
				"locationID" : "block-search",
				"title" : "block-search",
				"templateID" : "tpl-block-search",
				"content" : "",
				"visibility":true,
				"refresh" : false,
				"buildBlock" : function(){
					_draw_buildBlock( this );
				}
			} //end block

		],
		
		"templates_url" : "tpl/templates.xml",
		"templates" : {
			"localVideoBtn" : "create link",
			"embedVideoBtn" : "open video in new tab",
			"localVideoBtnUpdated" : "<a href='{{url}}' class='btn btn-primary' target='_blank'>open local video file in new tab</a>"
		},
		"init_url" : "#?q=list_nodes&num_page=1"
	},//end vars
	
//Modules
	"modPlayer" : modulePlayer(),
	
	"init" : function( postFunc ){
console.log("init webApp...");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		this["vars"]["log"] = func.getById("log");
		this["vars"]["btnToggle"] = func.getById("btn-toggle-log");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		//this["vars"]["parseProgressBar": func.getById("parse-progress-bar");
		this["vars"]["numTotalLoad"] = func.getById("num-total-load");
		this["vars"]["waitWindow"] = func.getById("win1");
		
		webApp.modPlayer.init();
		
		_loadTemplates(function(){
//console.log("Load templates end...", webApp.vars["templates"] );		
			_runApp();
		});
		
	}//end init()
	
};//end webApp()
console.log(webApp);


function _runApp(){

	defineEvents();

	//start block
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
		//$("#load-progress").hide();
	}


	_loadData(function(res){
//console.log(arguments);
//console.log(window.location);	

		//clear block
//setTimeout(function(){
		if( webApp["vars"]["waitWindow"] ){
			webApp["vars"]["waitWindow"].style.display="none";
		}		
//}, 1000*3);

//if( webApp.vars["loadDataRes"] ){
if( webApp.vars["DB"]["nodes"] && webApp.vars["DB"]["nodes"].length > 0){
		var parse_url = window.location.search; 
		if( parse_url.length > 0 ){
			webApp.vars["GET"] = func.parseGetParams(); 
			_urlManager();
		} else {
			if( webApp.vars["init_url"] ){
				//parse_url = webApp.vars["init_url"].substring(2);
				parse_url = webApp.vars["init_url"];
	//console.log(parse_url);
			}
			webApp.vars["GET"] = func.parseGetParams( parse_url ); 
			_urlManager();
		}
}

		if( typeof postFunc === "function"){
			postFunc();
		}
	});

	
}//end _runApp()


function defineEvents(){
	
	$("#btn-clear-log").on("click", function(event){
//console.log("click...", e);			
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		
		webApp.vars["log"].innerHTML="";
	});//end event
	
//------------------------------------------------------------------
	$("#btn-toggle-log").on("click", function(event){
//console.log("click...", e);			
		event = event || window.event;
		//var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		
		if( webApp.vars["log"].style.display==="none"){
			webApp.vars["log"].style.display="block";
			webApp.vars["btnToggle"].innerHTML="-";
		} else {
			webApp.vars["log"].style.display="none";
			webApp.vars["btnToggle"].innerHTML="+";
		}
	});//end event
	
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

			if( target.name === "video_link"){
				if( $(target).data("type") === "local-file" ){
	//console.log("click...", $(target).data() );
	//console.log( target.form.elements.filepath );
	//console.log( $(target.form).find(".form-local-url") );

					//$(target.form).find(".form-local-url").removeClass("hidden");

					var filePath = target.form.elements.filepath.value;
					if( filePath.length === 0){
webApp.vars["logMsg"] = "local video <b>file path</b> must be define.....";
func.logAlert( webApp.vars["logMsg"], "warning");
						return false;
					} else {
						target.form.elements.filepath.value += target.value;
						
						var url = target.form.elements.filepath.value;
						target.form.elements.filepath.value = "";
						
						//update button
						target.outerHTML = webApp.vars["templates"]["localVideoBtnUpdated"].replace("{{url}}", url);
					}

				} else {
	//console.log(target.value);				
					window.open( target.value );
				}
			}
			
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

//------------------------------------------------------------------

	//$("#list-video").on("submit", function(event){
		//event = event || window.event;
		//var target = event.target || event.srcElement;
////console.log("submit form ", $(target).attr("name") );
		
		//if (event.preventDefault) { 
			//event.preventDefault();
		//} else {
			//event.returnValue = false;
		//}
		
		//if( $(target).attr("name") === "form_local_url"){
////console.log(target.elements.btn_replace.outerHTML);
			//var url = target.elements.filepath.value;
			////target.elements.local_link.outerHTML = "<a href='"+url+"' target='_blank'>open in new tab</a>"
			////window.open( url );
			//target.elements.local_link.innerHTML ="<a href='"+url+"' target='_blank'>open local video file in new tab</a>";
			//target.elements.filepath.value = "";
		//}
		
	//});//end event

	//$("#list-video").on("reset", function(event){
//console.log("reset...", event);
		//event = event || window.event;
		//var target = event.target || event.srcElement;
		
	//});//end event
	
//------------------------------------------------------------------
	$("#list-video").on("change", function(event){
//console.log("change...", event);
		event = event || window.event;
		var target = event.target || event.srcElement;
		
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
		
		if(target.name === "select-protocol"){
			var num = target.selectedIndex;
			var value = target.options[num].value;
//console.log("select ", value, target.form.elements.filepath);
			//var newValue = value + target.form.elements.filepath.value;
			//target.form.elements.filepath.value = newValue;
			target.form.elements.filepath.value = value;
		}
	});//end event

//------------------------------------------------------------------

	
	$("#block-search").on("submit", "#form-search", function(event){
//console.log("Submit form", event, this);
		event = event || window.event;
		var target = event.target || event.srcElement;
		
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
		
		var form = document.forms["formSearch"]
//console.log(form);
//console.log(form.elements.targetField);
//console.log(form.elements.keyword.value);

		//check input values
		var res = true;
				
		var _keyword = form.elements.keyword.value;
		if( _keyword.length === 0 ){
webApp.vars["logMsg"] = "error, empty keyword...";
func.logAlert( webApp.vars["logMsg"], "danger");
//console.log( "-- " + _vars["logMsg"] );
			res = false;
		}
		
		var _targetField = false;
		for( var n = 0; n < form.elements.targetField.length; n++){
//console.log( n, form.elements.targetField[n] );

			var $element = $(form.elements.targetField[n]);
			var _checked = $element.prop("checked");
//console.log( $element.attr("value"), _checked );
			if( _checked){
				_targetField = $element.attr("value");
				break;
			}
		}//next
		
//console.log( "TEST:", _targetField, _targetField.length );

		if( !_targetField || _targetField.length === 0 ){
webApp.vars["logMsg"] = "error, not select search field, 'targetField'...";
func.logAlert( webApp.vars["logMsg"], "danger");
//console.log( webApp.vars["logMsg"] );
			res = false;
		}		
		
		if(res){
			var parseStr = target.action+"&targetField="+_targetField+"&keyword="+_keyword; 
//console.log( parseStr );
			if( parseStr.length > 0 ){
				webApp.vars["GET"] = func.parseGetParams( parseStr ); 
				_urlManager(target);
			} else {
webApp.vars["logMsg"] = "Warning! cannot parse url: " + target.action;
func.logAlert( webApp.vars["logMsg"], "warning");
//console.log( _vars["logMsg"] );
			}
		}
						
	});//end event


	
	$("#page-range").on("input", function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//console.log("input range...", event.target.value);
		$("#page-number").val( target.value );
	});//end event
	
	$("#page-range").change(function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		
//console.log("change range...", target.value);
		$("#page-number").val( target.value );
		//$("#page-number-2").val( target.value );
		
		var url = "?q=list_nodes&num_page="+target.value;
		webApp.vars["GET"] = func.parseGetParams( url ); 
		_urlManager();
		
	});//end event

	//$("#page-number").keyup(function(event){
	//$("#page-number").bind("keyup", function(event){
	$("#page-number").bind("keydown", function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//console.log(event);
//console.log(event.key);

		if(event.keyCode == 13){
//console.log(target.value);
//console.log( parseInt(target.value) );
//console.log( isNaN(target.value) );

			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;				
			}

			if( !isNaN(target.value) && parseInt(target.value) > 0){
//console.log("-0000000000");

				$("#page-range").val(target.value);
				//$("#page-number-2").val(target.value);
				
				var url = "?q=list_nodes&num_page="+target.value;
				webApp.vars["GET"] = func.parseGetParams( url ); 
				_urlManager();
			} else {
webApp.vars["logMsg"] = "error, incorrect input, only numbers...";
func.logAlert( webApp.vars["logMsg"], "danger");
//console.log( webApp.vars["logMsg"] );
			}

		}

	})//end event	
	
	$("#page-number-less").on("click", function(event){
		var num = parseInt( $("#page-number").val() );
		if( num > 1){
			$("#page-number").val( num-1 );
			$("#page-range").val( num-1 );
			var url = "?q=list_nodes&num_page=" + (num-1);
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		}
	})//end event	
	
	$("#page-number-more").on("click", function(event){
		var num = parseInt( $("#page-number").val() );
		if( num < webApp.vars["DB"]["numPages"] ){
			$("#page-number").val( num+1 );
			$("#page-range").val( num+1 );
			var url = "?q=list_nodes&num_page=" + (num+1);
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		}
	})//end event	

/*
	$("#page-number-2").change(function(event){
//console.log("change #page-number-2...", event);
		if( !isNaN(event.target.value) && parseInt(event.target.value) > 0){
			$("#page-range").val(event.target.value);
			$("#page-number").val(event.target.value);
			
			var url = "?q=list_nodes&num_page="+event.target.value;
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		} else {
webApp.vars["logMsg"] = "error, incorrect input, only numbers...";
func.logAlert( webApp.vars["logMsg"], "danger");
//console.log( webApp.vars["logMsg"] );
		}
	});//end event
*/
//------------------------
	$("#select-sort").change(function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//console.log("change #select-sort...", event, target.value);

		webApp.vars["DB"]["sortByKey"] =  target.value;
		$("#page-number").val( 1 );
		$("#page-range").val( 1 );
		var url = "?q=list_nodes&num_page=1";
		webApp.vars["GET"] = func.parseGetParams( url ); 
		_urlManager();
		
	});//end event

	
	if( webApp.modPlayer.vars["player"].nodeName === "VIDEO"){
		
		webApp.modPlayer.vars["player"].addEventListener('ended',function(e){
//console.log(e);
			var url = "?q=next-track&autoplay=TRUE";
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		},false);//end event
		
		//$("#player1").on("ended", function(e){
	//console.log(e);
		//});//end event
	}
	    

	function _actionClick(target, event){
		var actionLink = true;
		if( $(target).hasClass("toggle-btn") ){
//console.log(target.href);
			actionLink = false;

			//if ( target.href.indexOf("#?q=") !== -1){
				if (event.preventDefault) { 
					event.preventDefault();
				} else {
					event.returnValue = false;				
				}
			//}

			if( target.hash.indexOf("video-") !== -1 ){
				$("#video-list-collapsible .toggle-btn").removeClass("toggle-btn-show");
				$("#video-list-collapsible .toggle-btn").addClass("toggle-btn-hide");
				
				$(target).removeClass("toggle-btn-hide");
				$(target).addClass("toggle-btn-show");
			}
		}
		
	//------------------------------------------------------------------
		//if( $(target).hasClass("btn-add-track-pls") ){
	////console.log("click...", target.href);
			//actionLink = false;

			//if (event.preventDefault) { 
				//event.preventDefault();
			//} else {
				//event.returnValue = false;				
			//}
			
			//_player_addTrack( target );
		//}
		
	//------------------------------------------------------------------
		if( $(target).hasClass("tag-link") ){
	//console.log("click...", target);
			actionLink = false;

			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;				
			}
			var url = target.href+"&text="+ $(target).text();
			webApp.vars["GET"] = func.parseGetParams( url );
			_urlManager();
			
	//console.log("-- test:", $("#collapse-search").hasClass("in") );
			if( $("#collapse-tags").hasClass("in") ){
				$("#collapse-tags").collapse('hide');
			}
			
		}

		if( target.href.indexOf("?q=") === -1){
			actionLink = false;
		}
		
		if(	actionLink ){
			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;				
			}
			webApp.vars["GET"] = func.parseGetParams( target.href );
			_urlManager( target );
		}

	}//end _actionClick()
	
}//end defineEvents()


	function _urlManager( target ){
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {

			case "list_nodes":
console.log("-- start build page --");
				//var timeStart = new Date();

				_draw_updatePager({
					"total_records": webApp.vars["DB"]["queryRes"].length,
					"page_number":webApp.vars["GET"]["num_page"]
				});		
				
				var opt = {
					"records": webApp.vars["DB"]["queryRes"],
					"num_page": webApp.vars["GET"]["num_page"],
					"sortOrder": webApp.vars["DB"]["sortOrder"], //"asc",
					"sortByKey": webApp.vars["DB"]["sortByKey"], //"published", //"title"
					"callback": function(data){
				//console.log(data);
						if( !data || data.length ===0){
							return false;
						};
						
						_buildPage({
							"pageType" : webApp.vars["GET"]["q"],//"list_nodes",
							"pageData" : data,
							"callback" : function(){

				//var timeEnd = new Date();
				//var ms = timeEnd.getTime() - timeStart.getTime();
				//var msg = "Generate content block, nid: " + this.nid +", runtime:" + ms / 1000 + " sec";
				//_log("<p>"+msg+"</p>");			
				//console.log(msg);
console.log("-- end build page --");
								}
							}
						);
					}
				};
				
				_data_getNodes(opt);
			break;
			
//?q=nodes-by-tag&text="youtube"
			case "nodes-by-tag":
				if( webApp.vars["GET"]["text"] ){
					_data_getNodesByTag({//get list termin nodes
						"text" : webApp.vars["GET"]["text"],
						"callback" : function( data ){
//console.log(data);
							if( !data || data.length ===0){
webApp.vars["logMsg"] = "not found records by tag <b>"+ webApp.vars["GET"]["text"] + "</b>...";
func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
								//return false;
							} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records by tag &quot;<b>"+ webApp.vars["GET"]["text"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");

//console.log($("#block-taglist ul li"));
$("#block-taglist ul li a").removeClass("active");
$("#block-taglist ul li a").each(function(index, value){
//console.log(index, value);
	var tag = $(this).text();
	if( tag === webApp.vars["GET"]["text"]){
//console.log( tag );
		$(this).addClass("active");
	}
});
								var url = "?q=list_nodes&num_page=1";
								webApp.vars["GET"] = func.parseGetParams( url ); 
								_urlManager();
							}
							
						}//end callback
					});
				} else {
console.log("Warning! not found tag text value...");
				}
			break;
			
			case "clear-query-result":
				//_data_prepareTemplateData(data);//define unique template for item
				webApp.vars["DB"]["queryRes"] = webApp.vars["DB"]["nodes"];

				var url = "?q=list_nodes&num_page=1";
				webApp.vars["GET"] = func.parseGetParams( url ); 
				_urlManager();
				
				$("#block-taglist ul li a").removeClass("active");
				$("#collapse-tags").collapse('hide');
			break;
				
			case "search":
				$("#collapse-search").collapse('hide');
				
				_data_search({
					"targetField" : webApp.vars["GET"]["targetField"],
					"keyword" : webApp.vars["GET"]["keyword"],
					"callback" : function( data ){
//console.log(data);

						if( !data || data.length ===0){
webApp.vars["logMsg"] = "no records found by keyword <b>"+ webApp.vars["GET"]["keyword"] + "</b>...";
func.logAlert( webApp.vars["logMsg"] , "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							return false;
						};
						
						var url = "?q=list_nodes&num_page=1";
						webApp.vars["GET"] = func.parseGetParams( url ); 
						_urlManager();

					}//end callback
				});
				
			break;


//-------------------------------------------- PLAYLIST
			case "add-track-pls":
				var nodeNum = webApp.vars["GET"]["node-num"];
				webApp.modPlayer.addTrackPlayList({
					"trackInfoNode": webApp.vars["DB"]["queryRes"][nodeNum],
					"nodeNum": webApp.vars["GET"]["node-num"],
					"linkNum": webApp.vars["GET"]["link-num"]
				});
			break;
			
			case "load-track":
				webApp.modPlayer.loadTrack({
					"trackNum": parseInt(webApp.vars["GET"]["num"]),
				});
			break;

			case "stop-play":
				if( !$(webApp.modPlayer.vars["player"]).attr("src")){
console.log( "-- no track url...");
					return false;
				}
				//webApp.modPlayer.vars["player"].stop();
				$(webApp.modPlayer.vars["player"]).attr("src","");
				$("#track-info").text("");
			break;

			case "play":
				webApp.modPlayer.playTrack();
			break;

			case "pause":
				if( !$(webApp.modPlayer.vars["player"]).attr("src")){
console.log( "-- no track url...");
					return false;
				}
				webApp.modPlayer.vars["player"].pause();
			break;

			case "prev-track":
				$(webApp.modPlayer.vars["iframePlayer"]).attr("src", "");
				$(webApp.modPlayer.vars["player"]).attr("src", "");
				
				if( webApp.modPlayer.vars["playlist"]["lastNum"] > 0){
					webApp.modPlayer.vars["playlist"]["lastNum"]--;
				}
				
				var num = webApp.modPlayer.vars["playlist"]["lastNum"];
//console.log( num );
				var track = webApp.modPlayer.vars["playlist"]["tracks"][num];
				if(!track){
console.log( "-- no track!!!!");
					return false;
				}				
				var videoSrc = track["src"];
				
				if( track["dataType"] === "embed-video" ){
					$(webApp.modPlayer.vars["player"]).hide();
					$(webApp.modPlayer.vars["iframePlayer"]).attr("src", videoSrc);
					$(webApp.modPlayer.vars["iframePlayer"]).show();
				} else {
					$(webApp.modPlayer.vars["iframePlayer"]).hide();
					$(webApp.modPlayer.vars["player"]).attr("src", videoSrc);
					$(webApp.modPlayer.vars["player"]).show();
				}
	//console.log( num, webApp.modPlayer.vars["playlist"]["tracks"][num]["title"]);
//$("#player1").attr("src", videoSrc);
	
				var track_info = track["title"];
				$("#track-info").text(track_info);
				_draw_setActiveTrack(num);
				
			break;
			
			case "next-track":
				webApp.modPlayer.nextTrack();
				
				var autoplay = false;
				
				if( webApp.modPlayer.vars["playlist"]["lastNum"] < (webApp.modPlayer.vars["playlist"]["tracks"].length - 1) ){
					
					webApp.modPlayer.vars["playlist"]["lastNum"]++;
					
					if( webApp.vars["GET"]["autoplay"] === "TRUE"){
						autoplay = true;
					}
				}
				
				var num = webApp.modPlayer.vars["playlist"]["lastNum"];
//console.log( num );

				var track = webApp.modPlayer.vars["playlist"]["tracks"][num];
				if(!track){
console.log( "-- no track!!!!");
					return false;
				}				
				
				
				var videoSrc = track["src"];
				if( track["dataType"] === "embed-video" ){
					autoplay = false;
					$(webApp.modPlayer.vars["player"]).hide();
					$(webApp.modPlayer.vars["iframePlayer"]).attr("src", videoSrc);
					$(webApp.modPlayer.vars["iframePlayer"]).show();
				} else {
					$(webApp.modPlayer.vars["iframePlayer"]).hide();
					$(webApp.modPlayer.vars["player"]).attr("src", videoSrc);
					$(webApp.modPlayer.vars["player"]).show();
				}
//console.log( num, webApp.modPlayer.vars["playlist"]["tracks"][num]["title"]);
//console.log( webApp.modPlayer.vars["player"].contentDocument.body.getElementsByTagName("video").item(0) );
//$("#player1").attr("src", videoSrc);
	
				var track_info = track["title"];
				$("#track-info").text(track_info);
				_draw_setActiveTrack(num);
				
				if( autoplay ){
					webApp.modPlayer.vars["player"].play();
				}
				
			break;
			
			case "clear-playlist":
				webApp.modPlayer.vars["playlist"]["tracks"] = [];
				webApp.modPlayer.vars["playlist"]["lastNum"] = 0;
				
				$(webApp.modPlayer.vars["iframePlayer"]).attr("src", "");
				$(webApp.modPlayer.vars["player"]).attr("src", "");
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
			
//--------------------------------------------
			case "remove-track":
				var num = parseInt( webApp.vars["GET"]["num"] );
//console.log(num, typeof num, isNaN(num) );
				if( isNaN(num) ){
					webApp.vars["logMsg"] = "not found track by num: "+ webApp.vars["GET"]["num"];
console.log( "-- " + webApp.vars["logMsg"] );
					return false;
				}
				//delete webApp.modPlayer.vars["playlist"]["tracks"][0];
				webApp.modPlayer.vars["playlist"]["tracks"].splice(num, 1);
//console.log(webApp.modPlayer.vars["playlist"]);

				webApp.modPlayer.vars["playlist"]["lastNum"] = 0;
				
				if( webApp.modPlayer.vars["playlist"]["tracks"].length > 0){
//------------------ LOAD first video to player
					var url = "?q=load-track&num=0";
					webApp.vars["GET"] = func.parseGetParams( url ); 
					_urlManager();
//------------------
					//refresh block-playlist
					var _block = webApp.vars["blocks"][0];
					_block["buildBlock"]();
				} else {
					webApp.modPlayer.vars["playlist"]["tracks"] = [];
					$(webApp.modPlayer.vars["iframePlayer"]).attr("src", "");
					$(webApp.modPlayer.vars["player"]).attr("src", "");
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
			case "load-playlist":

				//if( !webApp.vars.support["promiseSupport"]){
					//_vars["logMsg"] = "error, window.Promise not supported...";
					//func.logAlert( _vars["logMsg"], "error" );
					//return false;
				//}

if( webApp.vars["GET"]["url"] &&
	webApp.vars["GET"]["url"].length > 0
){
				//var _testUrl = "http://localhost/mnt/terra/video/0_playlists/homeland_pls.xml";
				//var _testUrl = "files/homeland_pls.xml";
				//var _testUrl = "http://romanlaptev.github.io/projects/schedule/data/2019-04-26.json";
				
				webApp.modPlayer.loadPlayList({
					"playListUrl": webApp.vars["GET"]["url"],
					"format": webApp.vars["GET"]["format"],
					"callback": function(){
//webApp.vars["logMsg"] = "done, load playlist from URL "+_testUrl;
//func.logAlert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );
//------------------ LOAD first video to player
var url = "?q=load-track&num=0";
webApp.vars["GET"] = func.parseGetParams( url ); 
_urlManager();
//------------------

					}//end callback
				});
}

if( webApp.vars["GET"]["filepath"] &&
	webApp.vars["GET"]["filepath"].length > 0
){
console.log( "load local file..." );
}

			break;
			
//--------------------------------------------

			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()




//======================================= LOAD DATA
function _loadData( postFunc ){
//console.log("_loadData() ", arguments);
	//if( !webApp.iDBmodule.dbInfo["allowIndexedDB"] ){
		webApp.vars["dataStoreType"] = false;
	//} 
		switch(webApp.vars["dataStoreType"]) {				
			case "indexedDB":
			break;
			
			case "webSQL":
			break;
			
			case "localStorage":
			break;

			default:
				if( !webApp.vars["DB"]["dataUrl"] ||
					webApp.vars["DB"]["dataUrl"].length === 0 ){
webApp.vars["logMsg"] = "error, not found or incorrect 'dataUrl'...";
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
					return false;
				}

				func.runAjax( {
					"requestMethod" : "GET", 
					"url" : webApp.vars["DB"]["dataUrl"], 
					
					"onProgress" : function( e ){
						var percentComplete = 0;
						if(e.lengthComputable) {
							percentComplete = Math.ceil(e.loaded / e.total * 100);
						}
console.log( "Loaded " + e.loaded + " bytes of total " + e.total, e.lengthComputable, percentComplete+"%" );
						if( webApp.vars["loadProgressBar"] ){
							webApp.vars["loadProgressBar"].className = "progress-bar";
							webApp.vars["loadProgressBar"].style.width = percentComplete+"%";
							webApp.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							
							webApp.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
						}
						
					},
						
					"onLoadEnd" : function( headers ){
//console.log( headers );
					},
					
					"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error, ajax load failed..." + webApp.vars["DB"]["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
						if( typeof postFunc === "function"){
							postFunc();
						}
						//return false;
					},

					"callback": function( data ){

webApp.vars["logMsg"] = "Load data file " + webApp.vars["DB"]["dataUrl"];
func.logAlert( webApp.vars["logMsg"], "success");
//console.log( webApp.vars["logMsg"] );

//console.log( "runAjax, ", typeof data );
//console.log( data );
//for( var key in data){
//console.log(key +" : "+data[key]);
//}
						if( !data ){
webApp.vars["logMsg"] = "error, no data in " + webApp.vars["DB"]["dataUrl"];
func.logAlert( webApp.vars["logMsg"],  "danger");
console.log( webApp.vars["logMsg"] );
							if( typeof postFunc === "function"){
								postFunc(false);
							}
							return false;
						}

						_parseAjax( data );

						if( typeof postFunc === "function"){
							postFunc();
						}

					}//end callback()
				});

			break;
		}//end switch
		
		//return false;
		
		function _parseAjax( data ){
			if( webApp.vars["DB"]["dbType"].length === 0 ){
webApp.vars["logMsg"] = "error, no found or incorrect " + webApp.vars["DB"]["dbType"];
//func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
				return false;
			}
			
			switch( webApp.vars["DB"]["dbType"] ){
				case "xml":
					_parseXML( data );
				break;
				
				case "json":
				break;
				
				case "csv":
					//_parseCSVBlocks(data);
				break;
			}//end switch
			
		}//_parseAjax()
		
	}//end _loadData()


	function _parseXML(xml){
//console.log("function _parseXML()");

var timeStart = new Date();

		try{
			xmlObj = func.convertXmlToObj_old( xml );
//console.log(xmlObj);
delete xml;
			webApp.vars["DB"]["nodes"] = _data_formNodesObj(xmlObj);
			webApp.vars["DB"]["queryRes"] = webApp.vars["DB"]["nodes"];

			webApp.vars["DB"]["tags"] = _data_formTagObj(xmlObj);
delete xmlObj;
			
			//_vars["hierarchyList"] = __formHierarchyList();
			//webApp.vars["loadDataRes"] = true;
var timeEnd = new Date();
var runTime = (timeEnd.getTime() - timeStart.getTime()) / 1000;
webApp.vars["logMsg"] = "- convertXmlToObj_old(), runtime: <b>" + runTime  + "</b> sec";
func.logAlert( webApp.vars["logMsg"], "info");
console.log( webApp.vars["logMsg"] );

		} catch(error) {
webApp.vars["logMsg"] = "convertXmlToObj_old(), error parse XML..." ;
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( error );
		}//end catch

	}//end _parseXML()

	function _data_formNodesObj(xmlObj){
//console.log(xmlObj["xroot"]["children"]["database"][0]["name"]);
		var databases = xmlObj["xroot"]["children"]["database"];
		var dbName = webApp.vars["DB"]["dbName"];
		var tagName = webApp.vars["DB"]["tagNameFilms"];
		
		//var nodes = {};
		var nodes = [];
		
		for(var n = 0; n < databases.length; n++){
			if( databases[n]["name"] && databases[n]["name"] === dbName){
				var tagNodes = xmlObj["xroot"]["children"]["database"][n]["children"][tagName];
			}
		}//next
		
		if( tagNodes.length > 0){
			for(var n = 0; n < tagNodes.length; n++){
				var obj = {
					"type" : tagNodes[n]["type"]
				};

				for(var item in tagNodes[n]["children"]){
					var _content = tagNodes[n]["children"][item][0]["text"];
//"producer"
//"roles"
//"creators"
//"description"
//"published"
//"updated"
					
					if( !_content ){
//tags
//title
//ul
						_content = __convertMultipleField( tagNodes[n]["children"][item][0]["children"]);
					}
					obj[item] = _content;
				}
				
				//var key = "record_" + (n+1);
				//nodes[key] = obj;
				nodes.push( obj );
				
			}//next
		}

//------------------ form timestamp
		__addTimeStamp();
		__checkMediaSupport();
			
		return nodes;
		
		function __convertMultipleField( xfields){
			var fields = [];
			for(var item1 in xfields){
				var _xf = xfields[item1];
				for(var item2 in _xf){
					
					if( _xf[item2]["children"] ){
						var _xff = _xf[item2]["children"];
						//var obj = {};
						for( var key3 in _xff ){
							//obj[key3] = _xff[key3];
							fields.push( _xff[key3][0] );//<li><a...>(only one tag!!!)</li>
						}
					} else {
						fields.push( _xf[item2] );
					}
				}
			}
			return fields;
		}//end __convertMultipleField()

		function __addTimeStamp(){
			for(var n = 0; n < nodes.length; n++){
				if( nodes[n]["published"] && nodes[n]["published"].length > 0){
					if( webApp.vars["DB"]["dateFormat"] === "dd-mm-yyyy hh:mm:ss"){
						var arr = nodes[n]["published"].split(" ");
						var dateArr = arr[0].split("-");
						var timeArr = arr[1].split(":");
						
						var split_values = {
							"day" : dateArr[0],
							"month" : dateArr[1],
							"year" : dateArr[2],
							"hour" : timeArr[0],
							"min" : timeArr[1],
							"sec" : timeArr[2]
						};
						
						var _day = parseInt( split_values["day"] );
						if ( isNaN( _day ) ){
							_day = 0;
						}

						var _month = 0;
				//"15-Sep-2018 22:13:00";
						var sMonth = split_values["month"];
						switch(sMonth){
							
							case "Jan":
								_month = 1;
							break;
							
							case "Feb":
								_month = 2;
							break;
							
							case "Mar":
								_month = 3;
							break;
							
							case "Apr":
								_month = 4;
							break;
							
							case "May":
								_month = 5;
							break;
							
							case "Jun":
								_month = 6;
							break;
							
							case "Jul":
								_month = 7;
							break;
							
							case "Aug":
								_month = 8;
							break;
							
							case "Sep":
								_month = 9;
							break;
							
							case "Oct":
								_month = 10;
							break;
							
							case "Nov":
								_month = 11;
							break;
							
							case "Dec":
								_month = 12;
							break;
							
						}//end switch

						var _year = parseInt( split_values["year"] );
						if ( isNaN( _year ) ){
							_year = 0;
						}

						nodes[n]["timestamp"] = new Date ( _year, _month -1 , _day).getTime();
					}
				}
			}//next
		}// end __addTimeStamp()
		
		function __checkMediaSupport(){
			for(var n = 0; n < nodes.length; n++){
				var links = nodes[n]["ul"];
				if(!links){
					continue;
				}
				for( var n2 = 0; n2 < links.length; n2++){
					//links[n2]["class-support"] = "";
					if( links[n2]["data-type"] === "local-file"){
						var filepath = links[n2]["href"];
						//get file type
						var arr = filepath.split(".");
						var filetype = arr[ (arr.length-1) ];
						
						//var videoType = webApp.vars["videoTypes"][filetype];
						var videoType = webApp.modPlayer.getMediaTypeInfo(filetype);
//console.log(filetype, videoType);

						if( videoType && videoType["support"]){
							//links[n2]["class-support"] = "1";
						} else {
							links[n2]["class_support"] = "wrong-video-type";
						}
					}
				}
			}//next
		}// end __addTimeStamp()
		
	}//end _data_formNodesObj()


	function _data_formTagObj(xmlObj){
		var databases = xmlObj["xroot"]["children"]["database"];
		var dbName = webApp.vars["DB"]["dbName"];
		var tagListName = "taglist";
		var tagName = "tag";
		
		for(var n = 0; n < databases.length; n++){
			if( databases[n]["name"] && databases[n]["name"] === dbName){
var tagNodes = xmlObj["xroot"]["children"]["database"][n]["children"][tagListName][n]["children"][tagName];
			}
		}//next
		
		if( tagNodes.length > 0){
			func.sortRecords({
				"records" : tagNodes,
				"sortOrder": "asc", //desc
				"sortByKey": "name"
			});
			
			return tagNodes;
		} else {
			return false;
		}
				
	}//end _data_formTagObj()
	
	//function _data_formHierarchyList(){
	//}//end _data_formHierarchyList()
			




//============================== TEMPLATES
	function _loadTemplates( callback ){
		//webApp.db.loadTemplates(function( isLoadTemplates ){
//console.log(isLoadTemplates);			
			//if( !isLoadTemplates ){
				_loadTemplatesFromFile();
			//} else{
				//if( typeof callback === "function"){
					//callback();
				//}
			//}
		//});//end db.loadTemplates()
		
		function _loadTemplatesFromFile(){
			
			if( !webApp.vars["templates_url"] || 
				webApp.vars["templates_url"].length === 0 ){
webApp.vars["logMsg"] = "- error, _loadTemplates(), not found 'templates_url'...";
func.logAlert( webApp.vars["logMsg"], "danger");
//console.log( webApp.vars["logMsg"] );
				if( typeof callback === "function"){
					callback(false);
				}
				return false;
			}
			
			func.runAjax({
				"requestMethod" : "GET", 
				"url" : webApp.vars["templates_url"], 
				//"onProgress" : function( e ){},
				//"onLoadEnd" : function( headers ){},
				"onError" : function( xhr ){
//console.log( "onError ", arguments);
webApp.vars["logMsg"] = "error ajax load " + webApp.vars["templates_url"];
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				},
				
				"callback": function( data ){
webApp.vars["logMsg"] = "- read templates from <b>" + webApp.vars["templates_url"] +"</b>";
func.logAlert( webApp.vars["logMsg"], "info");
//console.log( webApp.vars["logMsg"] );
//console.log( data );

					if( !data ){
console.log("error, loadTemplates(), not find data templates'....");
						if( typeof callback === "function"){
							callback(false);
						}
						return false;
					}

					try{
						//xmlNodes = func.convertXmlToObj( data );
						xmlNodes = func.parseXmlToObj( func, data );
//console.log(xmlNodes);
						if( xmlNodes.length > 0 ){
							for( var n= 0; n < xmlNodes.length; n++){
								var key = xmlNodes[n]["name"];

								var value = xmlNodes[n]["html_code"]
								.replace(/<!--([\s\S]*?)-->/mig,"")//remove comments
								.replace(/\t/g,"")
								.replace(/\n/g,"");
								
								webApp.vars["templates"][key] = value;
							}//next
							delete xmlNodes;
							
							//webApp.db.saveTemplates( webApp.draw.vars["templates"] );
						} else {
	console.log("error, loadTemplates(), cannot parse templates data.....");
						}
						
					} catch(e){
console.log(e, typeof e);
webApp.vars["logMsg"] = "TypeError: " + e;
func.logAlert( webApp.vars["logMsg"], "danger");
					}//end try

					if( typeof callback === "function"){
						callback();
					}
				}//end
			});
			
		}//end _loadTemplatesFromFile()
		
	}//end _loadTemplates()



//===============================================
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);
		
		var p = {
			"nid": null,
			//"templateID" : "tpl-page"
			"title" : "",
			"pageData" : [],
			"pageType" : "node",
			"callback": null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);
/*
		//draw static blocks
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _opt = webApp.vars["blocks"][n];
// //console.log(_opt["visibility"], p["title"]);				
			if( _opt["visibility"]){
				// if( opt["visibility"].indexOf( p["title"] ) !== -1 ){
					_draw_buildBlock( _opt );
				// }
			}
			
		}//next
*/
		for( var n = 0; n < webApp.vars["blocks"].length; n++){
			var _opt = webApp.vars["blocks"][n];
			
			//do not redraw existing block
			if( _opt["draw"] && !_opt["refresh"]){
				continue;
			}
			
			if( _opt["visibility"]){
				
				//closures, need for async data getting from indexedDB
				(function(_opt_){
					//setTimeout(function(){ 
						//console.log("-- closure function, ", _opt_); 
					//}, 1000);
					//_draw_buildBlock( _opt_ );
					
					if( typeof _opt_["buildBlock"] === "function"){
						//if( _opt_["visibility"]){
							_opt_["buildBlock"]();
							_opt_["draw"] = true;
						//}
					} else {
webApp.vars["logMsg"] = "warning, not found buld function....";
console.log( "-- " + webApp.vars["logMsg"], _opt_ );
					}
				})(_opt);//end closure
			}

		}//next

		var _html = _draw_wrapData({
			"data": p["pageData"],
			"templateID": "tpl-videolist",
			"templateListItemID": "tpl-videolist-item--video"
		});
//console.log( _html);


		if( !_html || _html.length === 0){
webApp.vars["logMsg"] = "error generate html...";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
		} else {
//$("#main").html( _html );

			//draw content block
			_draw_buildBlock({
				"locationID" : "list-video",
				"title" : "video list", 
				"templateID" : "tpl-block-videolist",
				"content" : _html
			});
		}

		//if( webApp.vars["wait"] ){
			////webApp.vars["wait"].className="";
			//webApp.vars["wait"].style.display="none";
		//}

//--------------------- add event on collapse block
/*
		$("#video-list-collapsible .collapse").on('shown.bs.collapse', function(e){
func.logAlert('<p>The collapsible content is now fully shown.</p>', "info");
//console.log( e.target.find(".toggle-btn") );
		});
		
		$("#video-list-collapsible .collapse").on('hidden.bs.collapse', function(e){
func.logAlert('<p>The collapsible content is now hidden.</p>', "info");
//console.log( e.target.find(".toggle-btn") );
			//$("#video-list-collapsible .toggle-btn").removeClass("toggle-btn-show");
			//$("#video-list-collapsible .toggle-btn").addClass("toggle-btn-hide");
		});
*/

//---------------------- load images handlers
/*
		$("img").on("load", function( e ){
console.log("-- image load event....", e.target.src);
		});
		
		$("img").on("error", function( e ){
console.log("-- image load error", e.target.src);
			//var src = $(this).attr("src");
			//var new_src = sitecontent + src;
//console.log("fixing image source = " + new_src);
			//$(this).attr("src", new_src);
			//$("body").attr("data-image-load-error","1");
			//load_img_error( $(this)[0] );
		});
*/

		if( typeof p["callback"] === "function"){//return from _buildPage()
			p["callback"]();
		}
			
	};//end _buildPage()

//============================================== DATA
function _data_getNodes(opt){
	var p = {
		records: [],
		"num_page": null,
		"callback": null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);


//------------------ sort NODES
if(p.sortByKey && p.sortByKey.length > 0){
	if( p.sortByKey !== webApp.vars["DB"]["prevSortKey"]){
		_data_sortNodes({
			records: p.records,
			"sortOrder": p.sortOrder, //"asc", //desc
			"sortByKey": p.sortByKey
		});
		webApp.vars["DB"]["prevSortKey"] = p.sortByKey;
	}
}
//------------------

	var data = [];
	
	var numPage = parseInt( p["num_page"] )-1;
	//var _numPage = numPage - 1;
	
	var numRecordsPerPage = webApp.vars["DB"]["numRecordsPerPage"];
	
	var startPos = numPage * numRecordsPerPage;
	var endPos = startPos + numRecordsPerPage;

	if( startPos > p.records.length ){
webApp.vars["logMsg"] = "warning, incorrect page number, not more than "+webApp.vars["DB"]["numPages"];
func.logAlert( webApp.vars["logMsg"], "warning");
console.log( webApp.vars["logMsg"] );

		if( typeof p["callback"] === "function"){
			p["callback"](data);
		}
		return false;
	}

	if( endPos > p.records.length ){
		var n = endPos - p.records.length;
		endPos = endPos - n;
//console.log("TEST...", n);
	}
//console.log( startPos, numRecordsPerPage, endPos, p.records.length);
//------------------------------------------------- GET NODES
	for(var n = startPos; n < endPos; n++){
		data.push( p.records[n]);
	}//next
/*	
	//copy objects node
	for(var n = startPos; n < endPos; n++){
		var jsonNode = JSON.stringify( p.records[n] );
		data.push( JSON.parse( jsonNode) );
	}//next
*/	

//for test
//var num = webApp.vars["DB"]["nodes"].length-1;
//data[1] =  webApp.vars["DB"]["nodes"][num];

	_data_prepareTemplateData(data);//define unique template for item
	
//console.log(data);

	if( typeof p["callback"] === "function"){
		p["callback"](data);
	}
}//end _data_getNodes()


function _data_sortNodes(opt){
//console.log(opt);
	var p = {
		records: [],
		"sortOrder": "asc", //desc
		"sortByKey": null
	};
	//extend p object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if(p.records.length === 0 ){
		var logMsg = "error, not found sorting records...";
func.logAlert( logMsg, "danger");
console.log( logMsg );
		return false;
	}
			
	if(!p.sortByKey){
		var logMsg = "error, not found 'sortByKey'...";
func.logAlert( logMsg, "danger");
console.log( logMsg );
		return false;
	}
			
	p.records.sort(function(a,b){
//console.log(a, b);

		var s1,s2;
		
		s1 = a[p.sortByKey];
		s2 = b[p.sortByKey];
		
		if( p.sortByKey === "title" ){
			s1 = a[p.sortByKey][0]["text"].toLowerCase();
			s2 = b[p.sortByKey][0]["text"].toLowerCase();
		}
		
		if( p.sortByKey === "published" ){
			s1 = a["timestamp"];
			s2 = b["timestamp"];
		}
		
		switch(p.sortOrder){
			case "asc":
				if (s1 > s2) {
					return 1;
				}
				if (s1 < s2) {
					return -1;
				}
				// s1 === s2
				return 0;
			break
			
			case "desc":
				if (s1 > s2) {
					return -1;
				}
				if (s1 < s2) {
					return 1;
				}
				// s1 === s2
				return 0;
			break
		}//end swith()
	});//end sort
	
}//end _data_sortNodes()

function _data_getNodesByTag( opt ){
	var p = {
		"text" : null,
		"callback" : null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	if( !p["text"] ){
webApp.vars["logMsg"] = "_data_getNodesByTag(), error, not found tag text value...";
console.log( webApp.vars["logMsg"] );
		return false;
	}

	var data = [];
	for(var n = 0; n < webApp.vars["DB"]["nodes"].length; n++){
		var node = webApp.vars["DB"]["nodes"][n];
		if( !node["tags"] ){
//console.log(node);		
			continue;			
		}
		var tags = node["tags"];
		for(var n2 = 0; n2 < tags.length; n2++){
			if( tags[n2]["text"] && tags[n2]["text"] === p["text"]){
				data.push( node );
			}
		}//next
		
	}//next

	_data_prepareTemplateData(data);//define unique template for item
	webApp.vars["DB"]["queryRes"] = data;
	

	if( typeof p["callback"] === "function"){
		p["callback"](data);
	}
	//return false;
	
	//function _postQuery( res ){
////console.log( res );
		//if( typeof p["callback"] === "function"){
			//p["callback"](res);
		//}
		
	//}//end _postQuery()
	
	
}//end _data_getNodesByTag()


function _data_search( opt ){
	var p = {
		"targetField" : null,
		"keyword" : null,
		"callback" : null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
//console.log(p);

	var fieldKey = p["targetField"];
	var itemKey;
	
	if( fieldKey === "title"){
		itemKey = "text";
	}
	
	if( fieldKey === "filename"){
		fieldKey = "ul";
		itemKey = "href";
	}
	
	var data = [];
	for(var n = 0; n < webApp.vars["DB"]["nodes"].length; n++){
		var node = webApp.vars["DB"]["nodes"][n];
		var item = node[fieldKey];
//console.log(item);
		if(!item){
			continue;
		}
		
		if( itemKey && itemKey.length > 0){//search into multi fields
			for(var n2 = 0; n2 < item.length; n2++){
				if( item[n2][itemKey]){
					var test = item[n2][itemKey].toLowerCase();
					var keyword = p["keyword"].toLowerCase();
					if( test.indexOf(keyword) !==-1 ){
						data.push( node );
						break;
					}
				}
			}//next
		} else {
//console.log(node[fieldKey], typeof node[fieldKey]);
			if( typeof node[fieldKey] !== "string"){
				continue;
			}
			var test = node[fieldKey].toLowerCase();
			var keyword = p["keyword"].toLowerCase();
			if( test.indexOf(keyword) !==-1 ){
				data.push( node );
			}
		}
		
	}//next

	_data_prepareTemplateData(data);//define unique template for item
	webApp.vars["DB"]["queryRes"] = data;
	

	if( typeof p["callback"] === "function"){
		p["callback"](data);
	}
	
};//end _search()


function _data_prepareTemplateData(data){
	for(var n = 0; n < data.length; n++){
		
		data[n]["number"] = n;
		
		if(data[n]["type"] === "videoclip"){
			data[n]["template"] = "tpl-videolist-item--videoclip";
		}
		
		data[n]["title"]["listTpl"] = webApp.vars["templates"]["tpl-videolist-list-title"];
		data[n]["title"]["itemTpl"] = webApp.vars["templates"]["tpl-videolist-item--title"];
		
		if( data[n]["ul"] ){
			data[n]["ul"]["listTpl"] = webApp.vars["templates"]["tpl-videolist-list-links"];
			data[n]["ul"]["itemTpl"] = webApp.vars["templates"]["tpl-videolist-item--ul"];
			
//-------------- add order number for links
//console.log(data[n]);
for(var n2 = 0; n2 < data[n]["ul"].length; n2++){
	data[n]["ul"][n2]["num"] = n;
	data[n]["ul"][n2]["link_num"] = n2;
}//next
//--------------			
		} else {
			data[n]["ul"] = "";
		}
		
		if( data[n]["tags"] ){
			data[n]["tags"]["listTpl"] = webApp.vars["templates"]["tpl-videolist-list-tags"];
			data[n]["tags"]["itemTpl"] = webApp.vars["templates"]["tpl-videolist-item--tag"];
		} else {
			data[n]["tags"] = "";
		}
			
		if( data[n]["pictures"] ){
			data[n]["pictures"]["listTpl"] = webApp.vars["templates"]["tpl-videolist-list-pictures"];
			data[n]["pictures"]["itemTpl"] = webApp.vars["templates"]["tpl-videolist-item--img"];
		} else {
			data[n]["pictures"] = "";
		}
		
	}//next
	
}//_data_prepareTemplateData()



//============================================== DRAW
	function _draw_wrapData( opt ){
		var p = {
			"data": null,
			//"type" : "",
			//"wrapType" : "menu",
			"templateID" : false,
			"templateListItemID": false
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( !p["templateID"] ){
console.log("-- _draw_wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.vars["templates"][p.templateID] ){
console.log("-- _draw_wrapData(),  error, not find template, id: " + p.templateID);
			return false;
		}
		
		var html = "...no data...";
//console.log( p["data"].length );
		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw_wrapData(), error, incorrect data ...");
			return html;
		}

		p["wrapType"] = "item";
		if( p["data"].length > 0 ){
			p["wrapType"] = "list";
		}
		switch( p["wrapType"] ){
			case "item" :
				//html = __formNodeHtml( p["data"], webApp.vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListItemID"] ){
webApp.vars["logMsg"] = "-- wrapData(), error, var templateListItemID incorrect...";
console.log(webApp.vars["logMsg"]);							
					return false;
				}
				html = __formListHtml( webApp.vars["templates"][ p.templateID ] );
			break;
		}//end switch
		
//console.log(html);
		return html;

		function __formNodeHtml( data, _html ){
			
			for( var key in data ){
//console.log(key, data[key]);
				if( _html.indexOf("{{"+key+"}}") !== -1 ){
//console.log(key, data[key]);
					_html = _html.replace( new RegExp("{{"+key+"}}", "g"), data[key] );
				}
			}//next
			
//--------------- clear undefined keys (text between {{...}} )
_html = _html.replace( new RegExp(/{{(.*?)}}/g), "");
//--------------------			

			return _html;
		}//end __formNodeHtml()
		
		function __formListHtml( _html ){
			
			var listHtml = "";
			for( var n = 0; n < p["data"].length; n++){
//console.log( n );
//console.log( p["data"][n], typeof p["data"][n], p["data"].length);

				//form list items
				var item = p["data"][n];
					
				//var itemTpl = _vars["templates"][ p.templateListID];
				//var itemHtml = __formNodeHtml( item, itemTpl );
				
				var itemHtml = webApp.vars["templates"][ p.templateListItemID];
				
				
				//load unique template for item
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.vars["templates"][ tplName ] ){
						itemHtml = webApp.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
					}
				}

//--------------- get keys from template (text between {{...}} )
				//if(n === 1){
					var tplKeys = itemHtml.match(/{{(.*?)}}/g);
					for(var n1 = 0; n1 < tplKeys.length; n1++){
						tplKeys[n1] = tplKeys[n1].replace("{{","").replace("}}","");
					}//next
//console.log( tplKeys, p.templateListItemID, item );
				//}
//---------------

				//make copy object item
				//var _tmp = {
					//"number": item["number"]
				//};
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							item[key2] = "<span class='not-found-item'>not found " + key2 +"</span>";
						} else {
							var subOrdList = item[key2]["listTpl"];
							var itemTpl = item[key2]["itemTpl"];
	/*						
							if( key2 === "title" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-title"];
							}

							if( key2 === "ul" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-links"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-ul"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}

							if( key2 === "tags" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-tags"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-tag"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
								//item[key2] = subOrdList;
							}
							
							if( key2 === "pictures" ){
								var subOrdList = webApp.vars["templates"]["tpl-videolist-pictures"];
								var itemTpl = webApp.vars["templates"]["tpl-videolist-item--video-img"];
								//var subOrdListHtml = "";
								//for( var n2 = 0; n2 < item[key2].length; n2++){
									//subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
								//}//next
	////console.log( "subOrdListHtml: ", subOrdListHtml );
								//subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
	////console.log( subOrdList );
								//item[key2] = subOrdList;
							}
	*/						
							var subOrdListHtml = "";
							for( var n2 = 0; n2 < item[key2].length; n2++){
//console.log( item[key2][n2]["text"] );
								subOrdListHtml += __formNodeHtml( item[key2][n2], itemTpl );
							}//next
//console.log( subOrdListHtml );
							subOrdList = subOrdList.replace("{{list}}", subOrdListHtml);
//console.log( subOrdList );
							//item[key2] = subOrdList;
							
							//do not add HTML code to item object!!!
							_tmp[key2] = subOrdList;
						}							
					}
					
					if( itemHtml.indexOf("{{"+key2+"}}") !== -1 ){
//if(n === 1){
//console.log(key2, item[key2]);
//}						
						if( typeof item[key2] === "undefined"){
//if(n === 1){
//console.log(key2, item[key2], typeof item[key2]);
//}						
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item'>not found " + key2 +"</span>");
						} else {
							//itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), item[key2] );
							itemHtml = itemHtml.replace( new RegExp("{{"+key2+"}}", "g"), _tmp[key2] );
						}
					}
					
				}//next
					
				listHtml += itemHtml;
//console.log(items);
//console.log(listHtml);
			}//next
			
			_html = _html.replace("{{list}}", listHtml);
			return _html;
		}//end __formListHtml

	}//end _draw_wrapData()


	var _draw_buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
		var timeStart = new Date();
		var p = {
			"title": "",
			"content" : "",
			//"contentType" : "",
			"templateID" : "tpl-block",
			"contentTpl" : "tpl-list",//"tpl-menu"
			"contentListTpl" : false,
			
			"callback" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);			
				//webApp.app.vars["runtime"].push({
					//"source" : msg,
					//"ms" : ms,
					//"sec" : ms / 1000
				//});
				
				//if( typeof p["callback2"] === "function"){
					//p["callback2"]();//return from _buildBlock()
				//}
				
			}//,//end callback
			//"callback2" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);

		if( typeof p["content"] === "function"){//dynamic form content
/*			
			p["content"]({
				"callback" : function( res ){
console.log(res);
					var html = _draw_wrapData({
						"data": res,
						"templateID": "tpl-videolist",
						"templateListItemID": "tpl-videolist-item--video"
					});
//console.log( html);
					if( !html || html.length === 0){
webApp.vars["logMsg"] = "error generate html...";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
					} else {
p["content"] = html;						
//console.log(p);
						_draw_insertBlock( p );
						//_draw_buildBlock({
							//"locationID" : "list-video",
							//"title" : "video list", 
							//"templateID" : "tpl-block-videolist",
							//"content" : _html
						//});
					}

					
				}
			});
*/			
		} else {
			_draw_insertBlock( p );
		}

	};//end _draw_buildBlock()


	var _draw_insertBlock = function( opt ){
		var p = {
			"templateID": false,
			"locationID": "block-1",
			"title" : "block",
			"content" : false,
			"callback":null
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log("_draw_insertBlock()", p);

		var templateID = p["templateID"];
		if( !webApp.vars["templates"][templateID] ){
webApp.vars["logMsg"] = "_draw_insertBlock(), error, not found template, id:" + templateID;
//func.logAlert( webApp.vars["logMsg"], "danger");
console.log( "-- " + webApp.vars["logMsg"] );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		if( !p["content"] || p["content"].length === 0){
webApp.vars["logMsg"] = "_draw_insertBlock(), warning, not found or empty content block " + p["locationID"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- "+webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"]();
			//}
			//return false;
		}
		
		var html = webApp.vars["templates"][templateID];
		html = html.replace("{{block_title}}", p["title"]);
		html = html.replace("{{content}}", p["content"]);
		
		var locationBlock = func.getById( p["locationID"] );
		if( locationBlock ){
			locationBlock.innerHTML = html;
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["callback"] === "function"){
			p["callback"]();
		}

	};//end _draw_insertBlock()


	function _draw_updatePager(opt){
		func.log("", "total-records");
		func.log(opt["total_records"], "total-records");

		var numRecordsPerPage = webApp.vars["DB"]["numRecordsPerPage"];
		var numPages = Math.ceil( opt["total_records"] / numRecordsPerPage);
		webApp.vars["DB"]["numPages"] = numPages;

		//$("#page-number").val(numPages);
		func.log("", "total-pages");
		func.log(numPages, "total-pages");
		
		$("#page-number").val( opt["page_number"] );

		$("#page-range").val(opt["page_number"]);
		$("#page-range").attr("max", numPages);
		
		//$("#page-number-2").attr("max", numPages);
	}//end _draw_updatePagers()


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
		
		var track = webApp.modPlayer.vars["playlist"]["tracks"][activeNum];
		var track_info = track["title"];
		$("#track-info").text(track_info);
		
	}//end _draw_setActiveTrack()
