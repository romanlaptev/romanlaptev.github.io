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
				"content" : function(){
					var html = webApp.app.formHtmlTagList({
						"vid" : webApp.vars["GET"].vid,
						"group_name": webApp.vars["GET"].group_name
					});
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
				}
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
				"visibility":true//,
				// "content" : function(){
					// var html = webApp.app.formHtmlPager();
					// if( html && html.length > 0){
						// this.content = html;
						// webApp.draw.buildBlock( this );
					// }
				// }
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
					webApp.draw.updatePager();
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
		"blocksByName": {},
		"imageNotLoad": "img/image_not_load.png",
		
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

		this["vars"]["blocksByName"]["blockTagGroups"] = 	this.vars["blocks"][1];
		this["vars"]["blocksByName"]["blockPager"] = 	this.vars["blocks"][4];
		this["vars"]["blocksByName"]["blockTagList"] = 	this.vars["blocks"][2];
		this["vars"]["blocksByName"]["blockNodes"] = 	this.vars["blocks"][5];
		this["vars"]["blocksByName"]["blockFooterLinks"] = 	this.vars["blocks"][6];
		
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
	webApp.app.defineEvents();

	//start block
	if( webApp["vars"]["waitWindow"] ){
		webApp["vars"]["waitWindow"].style.display="block";
	}
	
	webApp.vars["GET"]["q"] = webApp.vars["init_action"]; 
	var parseUrl = window.location.search; 
	if( parseUrl.length > 0 ){
			webApp.vars["GET"] = func.parseGetParams(); 
	}		
	webApp.app.urlManager();

}//end _runApp()




function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		duration : 600//speed toggle animation
	};// _vars
	
	//var _init = function( opt ){
//console.log("init app");
	//};//end _init()

	function _defineEvents(){
		
		// webApp.vars.$closeButtons = $("a[href='#close']");
		// webApp.vars.$closeButtons.on("click", function(e){
	// //console.log( e.target );
				// var _target = $( e.target ).data("toggle");
	// //console.log( _target );
				// $( _target ).slideToggle( _vars.duration , function(e){
	// //console.log(arguments)
				// });
			// });//end event
		
//---------------------------------
		$(document).on("click", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event );
//console.log( this );//page-container
//console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
			//event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
			//event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
			_clickHandler( target );
		});
		
		$(document).on("keydown", function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log(e);
//console.log("e.keyCode = " + e.keyCode );

//----------------------------
			//if (e.keyCode == 27) {
	//console.log("press ESC ", e.target);
				//_closeModal( "#modal-edit-node" );
			//}
			
//---------------------------- input page number
			if( target.getAttribute("id") === "page-number"){
//console.log("event.keyCode = " + event.keyCode );

				if (event.keyCode == 13) {
					//return;
//console.log(target.value);
//console.log( parseInt(target.value) );
//console.log( isNaN(target.value) );
					var num = parseInt( target.value );
					if( !isNaN(num) ){
		
						if( num === 0 ){
console.log( "--error, wrong num page:", num, webApp.db.vars["numPages"], num > webApp.db.vars["numPages"]);
							num = 1;
							$("#page-number").val( num );
						}
						if( num > webApp.db.vars["numPages"] ){
console.log( "--error, wrong num page:", num, webApp.db.vars["numPages"], num > webApp.db.vars["numPages"]);
							num = webApp.db.vars["numPages"];
							$("#page-number").val( num );
						}
						
						$("#page-range").val( num );
						// var url = "?q=list_nodes&num_page="+num;
						// webApp.vars["GET"] = func.parseGetParams( url ); 
						// _urlManager();
					} else {
 webApp.vars["logMsg"] = "-- error, incorrect input, only numbers...";
// func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
					}
				}
				
				if ( event.keyCode == 46 || 
					event.keyCode == 8 || 
					event.keyCode == 9 || 
					event.keyCode == 27 ||
						(event.keyCode == 65 && event.ctrlKey === true) ||
							(event.keyCode >= 35 && event.keyCode <= 39)
				) {
					return;
				} else {
					if ( (event.keyCode < 48 || event.keyCode > 57) &&
						(event.keyCode < 96 || event.keyCode > 105 )
					) {
						event.preventDefault();
					}
				}

			}//end event
			
		});//end event
		
		function _clickHandler( target ){
//console.log( target.tagName );

//---------------------------- toggle node
				if( target.className.indexOf("btn-dropdown") !== -1){
//console.log( target );
					var _p = target.parentNode;
					var $blockContent = $(_p).find(".block-content");
			//console.log( $blockContent );
					$blockContent.slideToggle(_vars.duration);
					
					var $buttonDropDown = $(target);
			//console.log( $buttonDropDown );
					var test = $buttonDropDown.hasClass("icon-chevron-down");
					if( test ){
						$buttonDropDown.removeClass("icon-chevron-down");
						$buttonDropDown.addClass("icon-chevron-up");
						//$blockContent.slideDown(_vars.duration);
					} else {
						$buttonDropDown.removeClass("icon-chevron-up");
						$buttonDropDown.addClass("icon-chevron-down");
						//$blockContent.slideUp(_vars.duration);
					}

				}//end event

//-------------------------------
				if( target.tagName === "A"){
					if ( target.href.indexOf("#close") !== -1){
						var id = $( target ).data("toggle");
	//console.log( id );
						$( id ).slideToggle( _vars.duration , function(e){
	//console.log(arguments)
						});
					}
				}//end event

				if( target.tagName === "A"){
					
//------------------------------- get tag list
//#?q=get-tag-group&vid=2				
					if ( target.href.indexOf("get-tag-group") !== -1){
						webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.app.urlManager();
					}
				
//------------------------------- get node tags
//#?q=get-nodes-by-tag&vid=2&tid=110&group_name=music_styles
					if ( target.href.indexOf("get-nodes-by-tag") !== -1){
						webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.vars["GET"]["tag_name"] = $(target).text();
						webApp.app.urlManager();
					}
					
				}//end event
				
//------------------------------- page number
//console.log( target.getAttribute("id") );
				if( target.getAttribute("id") === "btn-page-number-more"){
					var num = parseInt( $("#page-number").val() );
					if( num < webApp.db.vars["numPages"] ){
						$("#page-number").val( num+1 );
						$("#page-range").val( num+1 );
						// var url = "?q=list_nodes&num_page=" + (num+1);
						// webApp.vars["GET"] = func.parseGetParams( url ); 
						// _urlManager();
					}
				}//end event
				
				if( target.getAttribute("id") === "btn-page-number-less"){
					var num = parseInt( $("#page-number").val() );
					if( num > 1){
						$("#page-number").val( num-1 );
						$("#page-range").val( num-1 );
						// var url = "?q=list_nodes&num_page=" + (num-1);
						// webApp.vars["GET"] = func.parseGetParams( url ); 
						// _urlManager();
					}					
				}//end event

		}//end _clickHandler()
		
	}//end _defineEvents()

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
			//case "nodes-by-tag":
			//break;
			
			//case "clear-query-result":
			//break;
			
//-------------------------------------------- TAGLIST
//href="#?q=get-tag-group&vid={{vid}}"			
			case "get-tag-group":
//console.log( webApp.vars["GET"] );
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockTagList"] );
			break;
			
			case "get-nodes-by-tag":
//console.log( webApp.vars["GET"] );

				webApp.db.getNodesByTag({
						"tagName" : webApp.vars["GET"]["tag_name"],
						"callback" : function( data ){
//console.log(data);
							if( !data || data.length ===0){
webApp.vars["logMsg"] = "not found records by tag <b>"+ webApp.vars["GET"]["tag_name"] + "</b>...";
func.logAlert(webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records by tag &quot;<b>"+ webApp.vars["GET"]["tag_name"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");

								webApp.db.vars["queryRes"] = data;
								webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
								
								//hide block tag list
								var id = "#"+webApp.vars["blocksByName"]["blockTagList"]["locationID"];
//console.log(id, $( id ) );
								$( id ).slideToggle( _vars.duration , function(e){});
								
							}
						}//end callback
				});
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

	function _formHtmlNodeList(){

//------------ fill output buffer from query result
if( webApp.db.vars["queryRes"].length > 0 ){
	
		webApp.db.vars["outputBuffer"] = [];
		var startPos = webApp.db.vars["numberPage"] - 1;
		var endPos = startPos + webApp.db.vars["numRecordsPerPage"];
//console.log(startPos, endPos, webApp.db.vars["numRecordsPerPage"]);
		
		if( webApp.db.vars["queryRes"].length > webApp.db.vars["numRecordsPerPage"] ){
			for( var n = startPos; n < endPos; n++){
				webApp.db.vars["outputBuffer"].push( webApp.db.vars["queryRes"][n] );
			}
		} else {
			webApp.db.vars["outputBuffer"] = webApp.db.vars["queryRes"];
		}
		
}
		
//filter outputBuffer nodes
		for( var n = 0; n < webApp.db.vars["outputBuffer"].length; n++){
			
			webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.vars["imageNotLoad"];
			if( webApp.db.vars["outputBuffer"][n]["images"] ){
				webApp.db.vars["outputBuffer"][n]["images"][0]["template"]= "hide";
				webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.db.vars["outputBuffer"][n]["images"][0]["src"];
			}
	
	
			if( webApp.db.vars["outputBuffer"][n].related_links ){
				var related_links = webApp.db.vars["outputBuffer"][n].related_links;
//console.log( related_links );
				for(var n2 = 0; n2 < related_links.length; n2++){
					var link = related_links[n2];
					if( link["data-type"] === "playlist-file"){
						webApp.db.vars["outputBuffer"][n]["playlist_filepath"] = link["href"];
						link["template"] = "hide element";
					}
				}//next
			}
			
		}//next
//------------------------

		var html = webApp.draw.wrapData({
			"data": webApp.db.vars["outputBuffer"],
			"templateID": "blockList",
			"templateListItemID": "blockListItem"
		});
		
//console.log( html );
		return html;
	}//_formHtmlNodeList()

/*
	function _formHtmlPager(){
		//var html = webApp.draw.vars["templates"]["pageInfo"];
		if( webApp.db.vars["queryRes"].length === 0){
			var totalNodes = webApp.db.vars["nodes"].length;
		} else {
			var totalNodes = webApp.db.vars["queryRes"].length;
		}
		
		var numPages = Math.ceil( totalNodes / webApp.db.vars["numRecordsPerPage"]);
		webApp.db.vars["numPages"] = numPages;
		
		var html = webApp.draw.wrapData({
			"data": {
total_nodes: totalNodes,
num_pages: numPages
			},
			"templateID": "pageInfo"
		});
//console.log( html );
		return html;
	}//_formHtmlPager()
*/

	function _formHtmlTagGroups(){

		var _tagGroupsList = [];
		for( var n =0; n < webApp.db.vars["tagGroups"].length; n++){
			_group = webApp.db.vars["tagGroups"][n];
			var _tagList = _getTagsByGroupName( _group["name"], webApp.db.vars["tagList"] );
			if( _tagList.length > 0 ){
				_group["num"] = _tagList.length;
				_tagGroupsList.push( _group );
			}
		}//next
		
		var html = webApp.draw.wrapData({
			"data": _tagGroupsList, 
			"templateID": "tagGroupsList",
			"templateListItemID": "tagGroupsListItem"
		});		
//console.log( html );
		return html;
	}//_formHtmlTagGroups()
	
	function _formHtmlTagList( opt ){
		var p = {
			"vid" : null,
			"group_name" : null
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
		var _filterList = _getTagsByGroupName(  p["group_name"], webApp.db.vars["tagList"] );
		
		for( var n =0; n < _filterList.length; n++){
			var _nodeList = _getNodesByTag( _filterList[n], webApp.db.vars["nodes"] );
//console.log( _nodeList );
			_filterList[n]["num"] = "0";
			if( _nodeList.length > 0 ){
				_filterList[n]["num"] = _nodeList.length;
			}
		}//next
		
		var html = webApp.draw.wrapData({
			"data": _filterList, 
			"templateID": "tagList",
			"templateListItemID": "tagListItem"
		});		
//console.log( html );
		return html;
		
		
	}//_formHtmlTagList()

	function _getTagsByGroupName( groupName, tagList ){
		var tags = [];
		for( var n =0; n < tagList.length; n++){
			if( tagList[n]["group_name"] === groupName ){
				tags.push( tagList[n] );
			}
		}//next
		return tags;
	}//end _getTagsByGroupName()

	function _getNodesByTag( tagObj, nodeList ){
		var nodes = [];
		for( var n =0; n < nodeList.length; n++){
//console.log(nodeList[n]["node_tags"]);

			if( nodeList[n]["node_tags"]){
				if( nodeList[n]["node_tags"].length > 0){
					
					var _nodeTags = nodeList[n]["node_tags"];
					for( var n2 =0; n2 < _nodeTags.length; n2++){
						
						//if( _nodeTags[n2]["vid"] === tagObj["vid"] ){
						//if( _nodeTags[n2]["tid"] === tagObj["tid"] ){
						if( _nodeTags[n2]["text"] === tagObj["text"] ){
							nodes.push( nodeList[n] );
						}
						
					}//next
					
				}
			}
		}//next
		return nodes;
	}//end _getNodesByTag()


/*
	//------------------------------------------------------------------ EVENTS for dynamic content
	function _setToggleContentEvents(){
		webApp.vars.$toggleContent = $(".toggle-content");
		webApp.vars.$toggleContent.on("click", function(e){
	//console.log( e.target );
				var test = $(e.target).hasClass("icon-chevron-down");
	//console.log( test );
				var test2 = $(e.target).hasClass("icon-chevron-up");
	//console.log( test2 );

				if( test || test2 ){
					var _p = e.target.parentNode;
			//console.log( _p );
					
					var $blockContent = $(_p).find(".block-content");
			//console.log( $blockContent );
					$blockContent.slideToggle(_vars.duration);

					var $buttonDropDown = $(e.target);
			//console.log( $buttonDropDown );
					var test = $buttonDropDown.hasClass("icon-chevron-down");
					if( test ){
						$buttonDropDown.removeClass("icon-chevron-down");
						$buttonDropDown.addClass("icon-chevron-up");
						//$blockContent.slideDown(_vars.duration);
					} else {
						$buttonDropDown.removeClass("icon-chevron-up");
						$buttonDropDown.addClass("icon-chevron-down");
						//$blockContent.slideUp(_vars.duration);
					}
				}
			});//end event
	}//_setToggleContentEvents()
*/	
	// public interfaces
	return{
		//vars : _vars,
		//init:	function(opt){ 
			//return _init(opt); 
		//},
		defineEvents: _defineEvents,
		urlManager:	function(){ 
			return _urlManager(); 
		},
		//formHtmlPager : _formHtmlPager,
		formHtmlNodeList : _formHtmlNodeList,
		formHtmlTagGroups : _formHtmlTagGroups,
		formHtmlTagList : _formHtmlTagList
		//setToggleContentEvents: _setToggleContentEvents
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
