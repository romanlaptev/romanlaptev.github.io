var webApp = {
	
//Modules
	"db" : _db(),
	//"iDBmodule" : iDBmodule(),
	"draw" : _draw(),
	//"app" : _app(),

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
			{
				"locationID" : "block-player",
				"title" : "block player", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

			{
				"locationID" : "block-tag-groups",
				"title" : "block tag groups", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

			{
				"locationID" : "block-taglist",
				"title" : "block taglist", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

			{
				"locationID" : "block-file-manager",
				"title" : "block file manager", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

			{
				"locationID" : "block-pager",
				"title" : "block pager", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

			{
				"locationID" : "block-list",
				"title" : "block list", 
				"templateID" : "blockLinks",
				"content" : "<u>static text</u>",
			}, //end block

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
/*			
			{
				"locationID" : "block-taglist",
				"title" : "block-taglist!!!!!!!",
				"templateID" : "tpl-block-taglist",
				"content" : "...",
				"visibility":true,
				"buildBlock" : function(){
					
					var html = _draw_wrapData({
						"data": webApp.db.vars["tags"],
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
*/
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
		
		webApp.db.init();
		//webApp.iDBmodule.init();
//console.log(iDBmodule, typeof iDBmodule);			
		webApp.draw.init();
		//webApp.app.init();

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

/*
function testMediaSupport( videoTypes ){
	
	var _video = document.createElement('video');
//for(var key in _video){
	//if( typeof _video[key] === "function"){
//console.log(key, _video[key]);
	//}
//}

	if( typeof _video === "object"){
		if( typeof _video["load"] === "function"){

			for(var ext in videoTypes){
				var testParam = videoTypes[ext]["testParam"];
				for(var n = 0; n < testParam.length; n++){
					var type = testParam[n];
					var test = _video.canPlayType(type);
//console.log( "test: ", test, test.length);
					if( test && test.length > 0){
	//webApp.vars["logMsg"] = "test support for media type <b>"+type+"</b>: "+test;
	//func.log("<div class='alert alert-success'>" + webApp.vars["logMsg"] + "</div>");
						videoTypes[ext]["support"] = true;
						break;
					} else {
webApp.vars["logMsg"] = "not support for media type <b>"+type+"</b>";
func.log("<div class='alert alert-warning'>" + webApp.vars["logMsg"] + "</div>");
	//console.log( "-- test: ", test, test.length);
					}
					
				}//next
				
			}//next
			
		} else {
			webApp.vars["logMsg"] = "creating a object VIDEO failed.";
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
		}
	}
	
	
}//end testMediaSupport()
*/

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
	
/*
	
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
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
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
func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
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
func.log("<div class='alert alert-warning'>" + webApp.vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
			}
		}
						
	});//end event


	
	//$("#page-range").on("input", function(event){
//console.log("input range...", event.target.value);
	//});//end event
	
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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
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
		if( num < webApp.db.vars["numPages"] ){
			$("#page-number").val( num+1 );
			$("#page-range").val( num+1 );
			var url = "?q=list_nodes&num_page=" + (num+1);
			webApp.vars["GET"] = func.parseGetParams( url ); 
			_urlManager();
		}
	})//end event	


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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
//console.log( webApp.vars["logMsg"] );
		}
	});//end event

//------------------------
	$("#select-sort").change(function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
//console.log("change #select-sort...", event, target.value);

		webApp.db.vars["sortByKey"] =  target.value;
		$("#page-number").val( 1 );
		$("#page-range").val( 1 );
		var url = "?q=list_nodes&num_page=1";
		webApp.vars["GET"] = func.parseGetParams( url ); 
		_urlManager();
		
	});//end event



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
	
*/
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




//============================== TEMPLATES
/*
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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
console.log( webApp.vars["logMsg"] );
					if( typeof callback === "function"){
						callback(false);
					}
					return false;
				},
				
				"callback": function( data ){
webApp.vars["logMsg"] = "- read templates from <b>" + webApp.vars["templates_url"] +"</b>";
func.log("<p class='alert alert-info'>" + webApp.vars["logMsg"] + "</p>");
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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
					}//end try

					if( typeof callback === "function"){
						callback();
					}
				}//end
			});
			
		}//end _loadTemplatesFromFile()
		
	}//end _loadTemplates()
*/

