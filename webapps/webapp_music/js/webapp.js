var webApp = {
	
//Modules
	"app" : _app(),
	"db" : _db(),
	//"iDBmodule" : iDBmodule(),
	"draw" : _draw(),
	"player" : _player(),

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
		
		"blocks": [
//===========================================
			{
				"locationID" : "block-player",
				"title" : "block player", 
				"templateID" : "blockPlayer",
				"content" : function(){
					var html = webApp.app.formHtmlPlayList();
					if( html && html.length > 0){
						this.content = html;
						webApp.draw.buildBlock( this );
					}
					webApp.player.init();
				}
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
				"templateID" : "blockFileManager",
				//"content" : "<u>static text</u>",
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
					webApp.app.imagesLoadEventHandler();
					$("a[href='#?q=load-tracklist&url=']").hide();//hide button if empty playlist_filepath
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
		"menuWidth" : 270,//270px
		
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

		this["vars"]["blocksByName"]["blockPlayer"] = 	this.vars["blocks"][0];
		this["vars"]["blocksByName"]["blockTagGroups"] = 	this.vars["blocks"][1];
		this["vars"]["blocksByName"]["blockTagList"] = 	this.vars["blocks"][2];
		this["vars"]["blocksByName"]["blockFM"] = 	this.vars["blocks"][3];
		this["vars"]["blocksByName"]["blockPager"] = 	this.vars["blocks"][4];
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
		
		this["vars"].$offcanvas = $("#off-canvas2");
		this["vars"].$offcanvasBar = $("#off-canvas2 .my-offcanvas-bar");
		this["vars"].$offcanvasMenu = $("#off-canvas2 .uk-nav-offcanvas > li > a");
		this["vars"].$blockList = document.querySelector("#block-list");
		
		// hide input type="range" if not support
		//https://learn.javascript.ru/dom-polyfill
		var _testRangeType = $("#page-range").attr("type");
//console.log( _testRangeType );
		if( _testRangeType !== "range"){
			$("#page-range").hide();
		}
		
		_runApp();
	},//end init()
	
	
};//end webApp()
console.log(webApp);


function _runApp(){
	//testMediaSupport( webApp.vars["audioTypes"]);

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
		
//------------------------------------------------------------------
		$(document).on("keydown", function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log(e);
//console.log("e.keyCode = " + e.keyCode );

//----------------------------
			if (event.keyCode == 27) {
//console.log("press ESC ", e.target);
				_closeModal( "#modal-edit-node" );
			}
			
//---------------------------- input page number
			if( target.getAttribute("id") === "page-number"){
//console.log("event.keyCode = " + event.keyCode );

				if (event.keyCode == 13) {
					//return;
//console.log(target.value);
//console.log( parseInt(target.value) );
//console.log( isNaN(target.value) );
					_changePage( target.value );
				}
				
				//filter input, only numbers
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
		
		$(document).on("change", function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event.type, event);
//console.log( target, target.value );

//---------------------------- end of moving  'input range'
			if( target.getAttribute("id") === "page-range"){
//console.log( target, target.value );
				$("#page-number").val( target.value );
				_changePage( target.value );
			}//end event
			
//---------------------------- select sort type
			if( target.getAttribute("id") === "select-sort"){
//console.log( target, target.value );
				webApp.db.vars["sortByKey"] =  target.value;
				_changePage( 1 );
			}//end event

		});//end event


//---------------------------- search form submit
		$("#form-search").on("submit", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
			
			if (event.preventDefault) { 
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
//console.log("Submit form", event, this);
			var form = document.forms["formSearch"]
//console.log(form);
//console.log(form.elements.targetField, form.elements.targetField.length);
//console.log(form.elements.keyword.value);
			//------------------- check input values
			var res = true;
			
			var _keyword = form.elements.keyword.value;
			if( _keyword.length === 0 ){
webApp.vars["logMsg"] = "error, empty keyword...";
func.logAlert( webApp.vars["logMsg"], "error");
//console.log( "-- " + _vars["logMsg"] );
				res = false;
			}
			
			var _targetField = false;
//fix
if( form.elements.targetField.length > 0){
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
} else {
	_targetField = form.elements.targetField.value;
}
//console.log( "TEST:", _targetField, _targetField.length );

			// if( !_targetField || _targetField.length === 0 ){
// webApp.vars["logMsg"] = "error, not select search field, 'targetField'...";
// func.logAlert( webApp.vars["logMsg"], "error");
// //console.log( webApp.vars["logMsg"] );
				// res = false;
			// }		

			if(res){
				webApp.vars["GET"] = {
					q: "search",
					"targetField" : _targetField,
					"keyword": _keyword
				}; 
				_urlManager();
			}

		});//end event


//---------------------------- move input range
		$("#page-range").on("input", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log("input range...", event.target.value);
			$("#page-number").val( target.value );
		});//end event

//---------------------------- end input to "#page-number", loss of focus field
		$("#page-number").on("blur", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event.type, event);
			_changePage( target.value );
		});//end event

//------------------------------------------------------------------
		$(document).on("click", function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
//console.log( event, event.type, target.tagName );
//console.log( this );
//console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );

if( target.tagName === "A" || target.tagName === "SPAN"){
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
}
			_clickHandler( target );
		});
		
//---------------------------------
		$("#btn-toggle-menu").on("click", function(e){
//console.log( e.type );
			_toggleMenu();
		});//end event
		
		$("#btn-close-menu").on("click", function(e){
//console.log( e.type );
			_toggleMenu();
		});//end event
		
		webApp.vars.$offcanvasMenu.on("click", function(e){
//console.log( e.target );
			$(".collapse").hide();
//console.log( $( e.target ).data()  );
			var _target = $( e.target ).data("toggle");
//console.log( _target );
			//$( _target ).slideToggle( _vars.duration, function(e){
			$( _target ).show( _vars.duration, function(e){
//console.log(arguments)
				_toggleMenu();
			});
		});//end event

	
//------------------------------------------------------------------
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

//------------------------------- page number
//console.log( target.getAttribute("id") );
				if( target.getAttribute("id") === "btn-page-number-more"){
					var num = parseInt( $("#page-number").val() );
					if( num < webApp.db.vars["numPages"] ){
						$("#page-number").val( num+1 );
						$("#page-range").val( num+1 );
						_changePage( $("#page-range").val() );
					}
				}//end event
				
				if( target.getAttribute("id") === "btn-page-number-less"){
					var num = parseInt( $("#page-number").val() );
					if( num > 1){
						$("#page-number").val( num-1 );
						$("#page-range").val( num-1 );
						_changePage( $("#page-range").val() );
					}					
				}//end event

				if( target.tagName === "A"){

//------------------------------- close buttons
					if ( target.href.indexOf("#close") !== -1){
						var id = $( target ).data("toggle");
	//console.log( id );
						$( id ).slideToggle( _vars.duration , function(e){
	//console.log(arguments);
							if( id === "#block-tags"){// reset tags select
								webApp.db.vars["queryRes"] = [];
								webApp.vars["GET"]["q"] = "reset_tags_select"; 
								_urlManager();
							}
						});
					}

//------------------------------- get modal window
					if ( target.href.indexOf("edit-node") !== -1){
						webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.app.urlManager();
					}
					if ( target.href.indexOf("#close-modal") !== -1){
						var id = $( target ).data("toggle");
						_toggleModal( id );
					}

//------------------------------- get tag list
//#?q=get-tag-list&vid=2				
					if ( target.href.indexOf("get-tag-list") !== -1){
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
					
//------------------------------- player, tracklist actions
					if ( target.href.indexOf("q=load-tracklist&") !== -1 ){
						webApp.vars["GET"] = func.parseGetParams( target.href );
						webApp.app.urlManager();
					}
					
					if ( target.href.indexOf("q=load-track&") !== -1 ||
							target.href.indexOf("prev-track") !== -1 ||
								target.href.indexOf("next-track") !== -1 ||
									target.href.indexOf("clear-tracklist") !== -1 ||
										target.href.indexOf("remove-track") !== -1 ||
											target.href.indexOf("edit-track") !== -1
					){
						if( webApp.player.vars["trackList"].length > 0){
							webApp.vars["GET"] = func.parseGetParams( target.href );
							webApp.app.urlManager();
						}
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
								_defineEvents();
							}
					}

				});
			break;
			
			case "list_nodes":
console.log("-- start build page --");
				webApp.draw.buildPage();
console.log("-- end build page --");
			break;
			
//?q=edit-node&nid={{nid}}
			case "edit-node":
				_toggleModal( "#modal-edit-node" );
/*
			if( $( target ).attr("href").indexOf("&") !== -1 ){
				var arr = $( e.target ).attr("href").split("&");
				arr = arr[1].split("=");
//console.log(arr);
				var nodeId = arr[1];
//console.log(nodeId);
				if( id === "#modal-edit-node"){
					_getFieldValues(id, nodeId);
				}
			}
			
*/			
			var form = document.forms["form_node"];
//console.log(form);
console.log(form.elements);
				form.elements.id.value = webApp.vars["GET"]["nid"];
			break;
			
			//case "clear-query-result":
			//break;
			
//-------------------------------------------- TAGLIST
//href="#?q=get-tag-list&vid={{vid}}"			
			case "get-tag-list":
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
webApp.vars["logMsg"] = "not found records for tag <b>"+ webApp.vars["GET"]["tag_name"] + "</b>...";
func.logAlert(webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records for tag &quot;<b>"+ webApp.vars["GET"]["tag_name"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");

								webApp.db.vars["queryRes"] = data;
								webApp.db.vars["numberPage"] = 1;
								webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
								
								//hide block tag list
								var id = "#"+webApp.vars["blocksByName"]["blockTagList"]["locationID"];
//console.log(id, $( id ) );
								$( id ).slideToggle( _vars.duration , function(e){});
								
							}
						}//end callback
				});
			break;
			
			case "reset_tags_select":
				webApp.db.vars["queryRes"] = [];
				webApp.db.vars["numberPage"] = 1;
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
			break;

//-------------------------------------------- SEARCH
			case "search":
				
				webApp.db.search({
					"targetField" : webApp.vars["GET"]["targetField"],
					"keyword" : webApp.vars["GET"]["keyword"],
					"callback" : function( data ){
//console.log(data);

						if( !data || data.length ===0){
webApp.vars["logMsg"] = "no records found by keyword <b>&quot;"+ webApp.vars["GET"]["keyword"] + "&quot;</b>...";
func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- " + webApp.vars["logMsg"] );
							return false;
						} else {
webApp.vars["logMsg"] = "found <b>"+data.length+"</b> records by keyword &quot;<b>"+ webApp.vars["GET"]["keyword"] + "</b>&quot;";
func.logAlert( webApp.vars["logMsg"], "success");
						}
						
						webApp.db.vars["queryRes"] = data;
						webApp.db.vars["numberPage"] = 1;
						webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );

					}//end callback
				});
				
			break;
			
//-------------------------------------------- PLAYLIST
			case "load-tracklist":
				//var _nid = webApp.vars["GET"]["nid"];
				webApp.player.loadTrackList({
					//"trackListTitle": webApp.db.vars["nodes"][_nid]["title"][0]["text"],
					"trackListUrl": webApp.vars["GET"]["url"]
				})
				.then(
					function( data, url ){
//console.log( "-- THEN, promise resolve" );
//console.log(data);
						//----------------- add track order number 
						for( var n = 0; n < data.length; n++){
							data[n]["number"] = n+1;
						}//next
						//-----------------
						webApp.player.vars["trackList"] = data;
						webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockPlayer"] );
						_vars["numTrack"] = 0;
						webApp.player.setActiveTrack( _vars["numTrack"] );
					},
					function( error ){
console.log( "-- THEN, promise reject, ", error );
console.log(arguments);					
					}
				);
			break;
			

			case "clear-tracklist":
				webApp.player.vars["trackList"] = [];
				webApp.player.vars["trackListTitle"] = "new_playlist";
				webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockPlayer"] );
			break;

//insert-track

			case "stop-play":
			break;

			case "load-track":
				webApp.player.loadTrack({
					"trackNum": webApp.vars["GET"]["num"]
				});
			break;

			case "prev-track":
				webApp.player.prevTrack();
			break;
			
			case "next-track":
				webApp.player.nextTrack();
			break;
			

			//case "check-all":
				//_draw_checkAll();
			//break;
			
			//case "clear-all":
				//_draw_clearAll();
			//break;
			
			case "remove-track":
				webApp.player.removeTrack({
					"trackNum": webApp.vars["GET"]["num"]
				});
			break;

			case "edit-track":
				webApp.player.editTrack({
					"trackNum": webApp.vars["GET"]["num"]
				});
			break;
			
//--------------------------------------------
			default:
console.log("function _urlManager(),  GET query string: ", webApp.vars["GET"]);			
			break;
		}//end switch
		
	}//end _urlManager()



	function _formHtmlNodeList(){

	webApp.db.vars["records"] = webApp.db.vars["nodes"];
	//------------ fill output buffer from query result
	if( webApp.db.vars["queryRes"].length > 0 ){
		webApp.db.vars["records"] = webApp.db.vars["queryRes"];
	}

	//------------------ sort NODES
	if( webApp.db.vars["sortByKey"] && webApp.db.vars["sortByKey"].length > 0){
		//if( p.sortByKey !== webApp.vars["DB"]["prevSortKey"]){
			webApp.db.sortNodes({
				records: webApp.db.vars["records"],
				"sortOrder": webApp.db.vars["sortOrder"], //"asc", //desc
				"sortByKey": webApp.db.vars["sortByKey"]
			});
			//webApp.vars["DB"]["prevSortKey"] = p.sortByKey;
		//}
	}
	//------------------

//--------------------	get page data, copy nodes to outputBuffer
		webApp.db.vars["outputBuffer"] = [];
		
		var numPage = parseInt( webApp.db.vars["numberPage"] )-1;
		var numRecordsPerPage = webApp.db.vars["numRecordsPerPage"];
		var startPos = numPage * numRecordsPerPage;
		var endPos = startPos + numRecordsPerPage;
		
		if( startPos > webApp.db.vars["records"].length ){
webApp.vars["logMsg"] = "-- warning, incorrect page number, not more than " + webApp.db.vars["numPages"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"](data);
			//}
			return false;
		}
		if( endPos > webApp.db.vars["records"].length ){
			var n = endPos - webApp.db.vars["records"].length;
			endPos = endPos - n;
//console.log("TEST...", n);
		}
//console.log( startPos, numRecordsPerPage, endPos, webApp.db.vars["records"].length);
		
		for( var n = startPos; n < endPos; n++){
			webApp.db.vars["outputBuffer"].push( webApp.db.vars["records"][n] );
		}
//console.log( webApp.db.vars["outputBuffer"] );
//--------------------	
		
//------------------- filter outputBuffer nodes
		for( var n = 0; n < webApp.db.vars["outputBuffer"].length; n++){
			
			//webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.vars["imageNotLoad"];
			webApp.db.vars["outputBuffer"][n]["main_picture"] = "";
			if( webApp.db.vars["outputBuffer"][n]["images"] ){
				webApp.db.vars["outputBuffer"][n]["images"][0]["template"]= "hide";
				webApp.db.vars["outputBuffer"][n]["main_picture"] = webApp.db.vars["outputBuffer"][n]["images"][0]["src"];
/*				
				if( webApp.db.vars["outputBuffer"][n]["images"].length === 1){//if only one attached image
//console.log(webApp.db.vars["outputBuffer"][n]["images"]);
					//webApp.db.vars["outputBuffer"][n]["images"] = [];
					delete webApp.db.vars["outputBuffer"][n]["images"];
				}
*/
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

	function _formHtmlPlayList(){

		if( webApp.player.vars["trackList"].length > 0 ){
			var html = webApp.draw.wrapData({
				"data": webApp.player.vars["trackList"], 
				"templateID": "trackList",
				"templateListItemID": "trackListItem"
			});
		} else {
			var html = webApp.draw.vars.templates["trackList"].replace("{{list}}", "");
		}
//console.log( html );
		html = html.replace("{{tracklist_title}}", webApp.player.vars["trackListTitle"]);
		
		return html;
	}//_formHtmlPlayList()


	function _changePage( pageNumValue){
//console.log( pageNumValue );
		//var num = parseInt( target.value );
		var num = parseInt( pageNumValue );
		
		if( isNaN(num) ){
webApp.vars["logMsg"] = "-- error, incorrect input " + num;
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"] );
			num = 1;
			$("#page-number").val( num );
			return false;
		}
			
		if( num === 0 ){
webApp.vars["logMsg"] = "-- error, wrong num page";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"], num, webApp.db.vars["numPages"]);
			num = 1;
			$("#page-number").val( num );
		}
		
		if( num > webApp.db.vars["numPages"] ){
webApp.vars["logMsg"] = "-- error, wrong num page";
func.logAlert( webApp.vars["logMsg"], "danger");
console.log( webApp.vars["logMsg"], num, webApp.db.vars["numPages"]);
			num = webApp.db.vars["numPages"];
			$("#page-number").val( num );
		}
		
		$("#page-range").val( num );
		webApp.db.vars["numberPage"] = num;
		
		webApp.draw.buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
	}//end _changePage()


	function _toggleMenu(){
		var _w = parseInt( webApp.vars.$offcanvasBar.css("width") );
//console.log( webApp.vars.$offcanvasBar.css("width"), _w);
		
		if( _w == 0){
			webApp.vars.$offcanvas.css("display","block");
			webApp.vars.$offcanvasBar.css("width", webApp.vars.menuWidth);
		}

		if( parseInt(_w) == webApp.vars.menuWidth){
			webApp.vars.$offcanvas.css("display","none");
			webApp.vars.$offcanvasBar.css("width", 0);
		}
	}//end _toggleMenu()

	function _toggleModal( id ){
		$modalWindow = $(id);
		if( $modalWindow.hasClass("uk-open") ){
			$modalWindow.hide( _vars.duration );
			//$modalWindow.slideUp( _vars.duration, function () {
			//$modalWindow.fadeOut( 600, function () {
	//console.log("-- end of hide....");				
			//});
			$modalWindow.removeClass("uk-open");
		} else {
			//$modalWindow.show("fast", function () {
			$modalWindow.slideDown( _vars.duration, function () {
			//$modalWindow.fadeIn( 600, function () {
	//console.log("-- end of show....");				
			});
			$modalWindow.addClass("uk-open");
		}
	}//end _toggleModal()
	
	function _closeModal( id ){
		$m = $(id);
		if( $m.hasClass("uk-open") ){
			$m.hide( _vars.duration );
			$m.removeClass("uk-open");
		}
	}//end _toggleModal()
	

	function _imagesLoadEventHandler(){
	//console.log( webApp.vars.$blockList );
		var images = webApp.vars.$blockList.getElementsByTagName("img");
	//console.log( "images =  " + images.length);
	//console.log( "images.onerror =  "+ typeof images[0].onerror);
		for( var n = 0; n < images.length; n++){
			//if( images[n].clientHeight === 0 ){
	//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
	//console.log( "img load error: ", images[n].getAttribute("src") );	
				images[n].onerror = function(e){
	//console.log(e.type, e);
					webApp.vars["logMsg"] = "error, image not load, <small><b>" + e.target["src"] + "</b></small>";
					//webApp.vars["logMsg"] += ", waiting time: " + e["timeStamp"] / 1000 + " sec";
	//console.log(e.target.parentNode);				
					var _blockImages = e.target.parentNode;
					_blockImages.style.background = "transparent";
					e.target.outerHTML = "<div class='img-not-load'>"+ webApp.vars["logMsg"] +"</div>";
				}

				images[n].onload = function(e){
	//console.log(e.type, e);
					var _blockImages = e.target.parentNode;
					_blockImages.style.background = "transparent";
				}
				
			//};
		};//next
	}//end _imagesLoadEventHandler()

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
		formHtmlTagList : _formHtmlTagList,
		formHtmlPlayList : _formHtmlPlayList,
		imagesLoadEventHandler: _imagesLoadEventHandler
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
