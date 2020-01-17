var webApp = {
	
//Modules
	"app" : _app(),
	"db" : _db(),
	//"iDBmodule" : iDBmodule(),
	"draw" : _draw(),

	"vars" : {
		"app_title" : "music collection",
		"logMsg" : "",
		//"messages" : {
			////"storeNotFound" : "<p class='alert alert-danger'>Object store not exists in DB!!!</p>"
			//"nodeNotFound" : "<p class='alert alert-danger'>node not found!!!</p>",
			//"templateNotFound" : "<p class='alert alert-danger'>Not find template, id: <b>{{templateID}}</b></p>"
		//},
		"GET" : {},
		"audioTypes" : {
//"ogg" : { testParam:['video/ogg; codecs="theora, vorbis"'], support:false },
		},
		
		"playlist" : {
			tracks:[
//{title:"Anda Jaleo Jaleo", src: "http://www.youtube.com/embed/Td6lN_U7Ecs"}
			],
			lastNum:0
		},
		"blocks": [
//===========================================
			{
				"locationID" : "block-player",
				"title" : "block player", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-tag-groups",
				"title" : "block tag groups", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-taglist",
				"title" : "block taglist", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-file-manager",
				"title" : "block file manager", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-pager",
				"title" : "block pager", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-list",
				"title" : "block node list", 
				"templateID" : "blockNodes",
				"visibility":true,
				"content" : function(){
//fake data					
webApp.db.vars["nodes"][0]["images"][0]["template"]= "hide";
webApp.db.vars["nodes"][0]["main_picture"] = webApp.db.vars["nodes"][0]["images"][0]["src"];
var related_links = webApp.db.vars["nodes"][0]["related_links"];
for(var n = 0; n < related_links.length; n++){
	var link = related_links[n];
	if( link["data-type"] === "playlist-file"){
		webApp.db.vars["nodes"][0]["playlist_filepath"] = link["href"];
	}
}//next
					
					var html = webApp.draw.wrapData({
						//"data": webApp.db.vars["blockList"],
						"data": [ webApp.db.vars["nodes"][0] ],
						"templateID": "blockList",
						"templateListItemID": "blockListItem"
					});
//console.log( html );
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			}, //end block
			
//===========================================
			{
				"locationID" : "block-links",
				"title" : "footer links", 
				"templateID" : "blockLinks",
				"visibility":true,
				"content" : function(){
					//var html = "<i>static text!!!!</i>";
					var html = webApp.draw.wrapData({
						//"data": webApp.db.vars["footerLinks"][0],
						//"templateID": "blockLinksListItem"
						
						"data": webApp.db.vars["footerLinks"],
						"templateID": "blockLinksList",
						"templateListItemID": "blockLinksListItem"
					});
//console.log( html );
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			} //end block
		],
		"init_action" : "get_data",
		"init_url" : "#?q=list_nodes&num_page=1"
	},//end vars
	
	
	"init" : function( postFunc ){
console.log("init webapp!");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		webApp.app.init();
		webApp.db.init();
		//webApp.iDBmodule.init();
//console.log(iDBmodule, typeof iDBmodule);			
		webApp.draw.init();

		this["vars"]["waitWindow"] = func.getById("win1");
		this["vars"]["loadProgress"] = func.getById("load-progress");
		this["vars"]["loadProgressBar"] = func.getById("load-progress-bar");
		this["vars"]["numTotalLoad"] = func.getById("num-total-load");
		this["vars"]["percentComplete"] = func.getById("percent-complete");
		this["vars"]["totalBytes"] = func.getById("total");
		this["vars"]["totalMBytes"] = func.getById("total-mb");
		this["vars"]["loaded"] = func.getById("loaded");
		this["vars"]["loadInfo"] = func.getById("load-info");
		
		_runApp();
	},//end init()
	
	
};//end webApp()
console.log(webApp);


function _runApp(){
	//testMediaSupport( webApp.vars["audioTypes"]);
	defineEvents();

	//start block
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
	}
	
	webApp.vars["GET"]["q"] = webApp.vars["init_action"]; 
	var parseUrl = window.location.search; 
	if( parseUrl.length > 0 ){
			webApp.vars["GET"] = func.parseGetParams(); 
	}		
	_urlManager();
	
}//end _runApp()


function defineEvents(){
	
	webApp.vars.$closeButtons = $("a[href='#close']");
	webApp.vars.$closeButtons.on("click", function(e){
//console.log( e.target );
			var _target = $( e.target ).data("toggle");
//console.log( _target );
			$( _target ).slideToggle( _vars.duration , function(e){
//console.log(arguments)
			});
		});//end event
	
}//end defineEvents()


function _urlManager( target ){
//console.log(target);
		
		switch( webApp.vars["GET"]["q"] ) {
			
			case "get_data":
				webApp.db.getData(function(res){
			//console.log(arguments);
			//console.log(window.location);	
			
//clear block
//setTimeout(function(){
					if( webApp["vars"]["waitWindow"] ){
						webApp["vars"]["waitWindow"].style.display="none";
					}		
//}, 1000*3);
			
					if( webApp.db.vars["nodes"] && webApp.db.vars["nodes"].length > 0){
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

					//if( typeof postFunc === "function"){
						//postFunc();
					//}
				});
			break;
			
			case "list_nodes":
console.log("-- start build page --");
				webApp.draw.buildPage();
console.log("-- end build page --");
/*			
				//var timeStart = new Date();

				_draw_updatePager({
					"total_records": webApp.db.vars["queryRes"].length,
					"page_number":webApp.vars["GET"]["num_page"]
				});		
				
				var opt = {
					"records": webApp.db.vars["queryRes"],
					"num_page": webApp.vars["GET"]["num_page"],
					"sortOrder": webApp.db.vars["sortOrder"], //"asc",
					"sortByKey": webApp.db.vars["sortByKey"], //"published", //"title"
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
*/				
			break;
			
//?q=nodes-by-tag&text="youtube"
			case "nodes-by-tag":
/*			
				if( webApp.vars["GET"]["text"] ){
					_data_getNodesByTag({//get list termin nodes
						"text" : webApp.vars["GET"]["text"],
						"callback" : function( data ){
//console.log(data);
							if( !data || data.length ===0){
webApp.vars["logMsg"] = "not found records by tag <b>"+ webApp.vars["GET"]["text"] + "</b>...";
func.log("<p class='alert alert-warning'>" + webApp.vars["logMsg"] + "</p>");
console.log( "-- " + webApp.vars["logMsg"] );
								//return false;
							} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records by tag &quot;<b>"+ webApp.vars["GET"]["text"] + "</b>&quot;";
func.log("<p class='alert alert-success'>" + webApp.vars["logMsg"] + "</p>");

//console.log($("#block-taglist ul li"));
$("#block-taglist ul li a").removeClass("active");
$("#block-taglist ul li a").each(function(index, value){
//console.log(index, value);
	var tag = $(this).text();
	if( tag === webApp.vars["GET"]["text"]){
console.log( tag );
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
*/				
			break;
			
			case "clear-query-result":
/*			
				//_data_setTemplate(data);//define unique template for item
				webApp.db.vars["queryRes"] = webApp.db.vars["nodes"];

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
func.log("<p class='alert alert-warning'>" + webApp.vars["logMsg"] + "</p>");
console.log( "-- " + webApp.vars["logMsg"] );
							return false;
						};
						
						var url = "?q=list_nodes&num_page=1";
						webApp.vars["GET"] = func.parseGetParams( url ); 
						_urlManager();

					}//end callback
				});
*/				
			break;


//-------------------------------------------- PLAYLIST
			case "load-track":
/*			
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
*/				
			break;

			case "stop-play":
/*			
				//webApp.vars["player"].stop();
				$(webApp.vars["player"]).attr("src","");
				$("#track-info").text("");
*/				
			break;

			case "prev-track":
/*			
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
*/				
			break;
			
			case "next-track":
/*			
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
*/
			break;
			
			case "clear-playlist":
/*			
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
*/				
			break;

			//case "check-all":
				//_draw_checkAll();
			//break;
			
			//case "clear-all":
				//_draw_clearAll();
			//break;
			
			case "remove-track":
/*			
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
*/
			break;
			
//--------------------------------------------
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()



function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
	};// _vars
	
	var _init = function( opt ){
console.log("init app");
	};//end _init()
	
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(opt){ 
			return _init(opt); 
		},
		//urlManager:	function( target ){ 
			//return _urlManager( target ); 
		//},
		
		//buildBlock:	function(opt){ 
			//return _buildBlock(opt); 
		//},
		//buildPage:	function(opt){ 
			//return _buildPage(opt); 
		//},
		//serverRequest:	function(opt){ 
			//return _serverRequest(opt); 
		//},
		//loadTemplates : _loadTemplates,
		//formQueryObj : _formQueryObj
	};
}//end _app()
