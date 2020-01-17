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
				"templateID" : "blockFooterLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-tag-groups",
				"title" : "block tag groups", 
				"templateID" : "blockTagGroups",
				"content" : function(){
					var html = webApp.app.formHtmlTagGroups();
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
			}, //end block

//===========================================
			{
				"locationID" : "block-taglist",
				"title" : "block taglist", 
				"templateID" : "blockTagList",
				//"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-file-manager",
				"title" : "block file manager", 
				"templateID" : "blockFooterLinks",
				"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-pager",
				"title" : "block pager", 
				"templateID" : "blockPager",
				//"content" : "<u>static text</u>",
			}, //end block

//===========================================
			{
				"locationID" : "block-list",
				"title" : "block nodelist", 
				"templateID" : "blockNodes",
				"visibility":true,
				"content" : function(){
					var html = webApp.app.formHtmlNodeList();
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
				"templateID" : "blockFooterLinks",
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
		
		//webApp.app.init();
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
			break;
			
//?q=nodes-by-tag&text="youtube"
			case "nodes-by-tag":
			break;
			
			case "clear-query-result":
			break;


//-------------------------------------------- PLAYLIST
			case "load-track":
			break;

			case "stop-play":
			break;

			case "prev-track":
			break;
			
			case "next-track":
			break;
			
			case "clear-playlist":
			break;

			//case "check-all":
				//_draw_checkAll();
			//break;
			
			//case "clear-all":
				//_draw_clearAll();
			//break;
			
			case "remove-track":
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
	//var _vars = {};// _vars
	
	//var _init = function( opt ){
//console.log("init app");
	//};//end _init()

	function _formHtmlNodeList(){
		
		//fake data					
		webApp.db.vars["nodes"][0]["images"][0]["template"]= "hide";
		webApp.db.vars["nodes"][0]["main_picture"] = webApp.db.vars["nodes"][0]["images"][0]["src"];
		var related_links = webApp.db.vars["nodes"][0]["related_links"];
		for(var n = 0; n < related_links.length; n++){
			var link = related_links[n];
			if( link["data-type"] === "playlist-file"){
				webApp.db.vars["nodes"][0]["playlist_filepath"] = link["href"];
				link["template"] = "hide element";
			}
		}//next

		webApp.db.vars["nodes"][1]["images"][0]["template"]= "hide";
		webApp.db.vars["nodes"][1]["main_picture"] = webApp.db.vars["nodes"][1]["images"][0]["src"];
		webApp.db.vars["nodes"][1]["playlist_filepath"] = "";
						
		var html = webApp.draw.wrapData({
			//"data": webApp.db.vars["blockList"],
			"data": [ 
webApp.db.vars["nodes"][0], 
webApp.db.vars["nodes"][1],
webApp.db.vars["nodes"][0], 
webApp.db.vars["nodes"][1],
webApp.db.vars["nodes"][0], 
webApp.db.vars["nodes"][1] 
],
			"templateID": "blockList",
			"templateListItemID": "blockListItem"
		});
		
//console.log( html );
		return html;
	}//_formHtmlNodeList()


	function _formHtmlTagGroups(){
		var html = "<h2>test</h2>";
//console.log( html );
		return html;
	}//_formHtmlTagGroups()
	
	// public interfaces
	return{
		//vars : _vars,
		init:	function(opt){ 
			return _init(opt); 
		},
		formHtmlNodeList : _formHtmlNodeList,
		formHtmlTagGroups : _formHtmlTagGroups
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
