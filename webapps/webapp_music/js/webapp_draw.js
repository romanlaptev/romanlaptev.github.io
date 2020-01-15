function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"templates":{
			
			"blockPlayer" : {
				"html" : '<div class="uk-card uk-card-default">\
						<div class="row">\
							<div class="uk-float-right">\
									<a data-toggle="#block-player" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body w60">\
							<div>\
								<b>Yankee_doodle.mp3</b><br>\
								<audio controls="controls" class="w100">\
										<source src="../../test_code/js/test_media/audio/Yankee_doodle.mp3" />\
				Tag <b>audio</b> not supported by this browser.... \
								</audio>\
							</div>\
							<div class="uk-hidden">\
				<iframe type="text/html" id="iframe-player" src="" style="display: none;" width="640" height="385" frameborder="1"></iframe>\
								<video id="player1" controls="controls" src="" width="640" height="385">\
										<source src="">\
										Tag <b>video</b> not supported by this browser.... \
								</video>\
							</div>\
							<div id="player-buttons">\
								<ul class="button-group uk-list">\
									<button id="btn-play" class="btn btn-blue">play</button>\
									<button id="btn-pause" class="btn btn-blue">pause</button>\
									<li><a href="?q=prev-track" class="uk-button uk-button-small uk-button-primary">previous track</a></li>\
									<li><a href="?q=next-track" class="uk-button uk-button-small uk-button-default">next track</a></li>\
								</ul>\
							</div>\
						</div>\
						<div id="block-tracklist" class="">\
							<div class="wrapper">\
								<div class="row">\
									<div class="uk-float-left">\
										<h4>new playlist</h4>\
									</div>\
									<div class="uk-float-right">\
											<a data-toggle="#block-player" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
									</div>\
								</div>\
								<div class="pls-buttons">\
									<ul class="menu-track-action button-group uk-list">\
		<li><a href="#?q=clear-tracklist" class="uk-button uk-button-danger uk-button-small">clear track list</a></li>\
		<li><a href="#?q=insert-track" title="insert track (local file or url)" class="uk-button uk-button-primary uk-button-small">insert track</a></li>\
		<li><a href="#?q=load-tracklist" title="load track list from JSON file" class="uk-button uk-button-primary uk-button-small">Load track list</a></li>\
		<li><a href="#?q=save-tracklist" title="save track list to JSON file" class="uk-button uk-button-primary uk-button-small">Save track lists</a></li>\
									</ul>\
								</div>\
								<div class="">\
									<ul id="playlist" class="list-unstyled">\
										<li class="list-group-item">\
											<div class="uk-clearfix">\
												<div class="uk-float-left">\
													<a class="track-name" href="#?q=load-track&amp;num=0">test MP4</a>\
												</div>\
												<div class="uk-float-right">\
		<a class="edit-track" href="#?q=edit-track&amp;num=0">edit</a> | \
		<a class="remove-track" href="#?q=remove-track&amp;num=0" title="Remove this track from playlist">x</a>\
												</div>\
											</div>\
										</li>\
										<li class="list-group-item active">\
											<div class="uk-clearfix">\
												<div class="uk-float-left">\
		<a class="track-name" href="#?q=load-track&amp;num=1">test WEBM</a>\
												</div>\
												<div class="uk-float-right">\
		<a class="edit-track" href="#?q=edit-track&amp;num=0">edit</a> | \
		<a class="remove-track" href="#?q=remove-track&amp;num=0" title="Remove this track from playlist">x</a>\
												</div>\
											</div>\
										</li>\
									</ul>\
								</div>\
							</div>\
						</div>\
					</div>'
			},
			
			"blockTags" : {
				"html" : "{{block-tag-groups}} {{block-taglist}}"
			},
			
			"blockTagGroups" : {
				"html" : '\
						<div class="uk-card uk-card-primary">\
						<div class="row">\
							<div class="uk-float-left uk-padding-small">\
								<b>Tag groups</b>\
							</div>\
							<div class="uk-float-right">\
								<a data-toggle="#block-tags" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
							<ul class="uk-list tag-list">\
								<li><a data-toggle="#tags-music-syles" href="#get-tag-group&vid=2">music_styles</a>	</li>\
								<li><a data-toggle="#tags-music-formats" href="#get-tag-group&vid=3">music_formats</a></li>\
								<li><a data-toggle="#tags-country" href="#get-tag-group&vid=4">country</a></li>\
								<li><a data-toggle="#tags-alpha" href="#get-tag-group&vid=5">alphabetical_voc</a></li>\
								<li><a data-toggle="#tags-music-band" href="#get-tag-group&vid=8">music_band</a></li>\
								<li><a data-toggle="#tags-music-genre" href="#get-tag-group&vid=9">music_genre</a></li>\
							</ul>\
						</div>\
					</div>'
			},
			
			"blockTagList" : {
				"html" : '\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-syles">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
					<li><a  href="#?q=get-tag&vid=2&tid=10">heavy metal</a></li>\
					<li><a  href="#?q=get-tag&vid=2&tid=11">speed</a></li>\
					<li><a  href="#?q=get-tag&vid=2&tid=12">power</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-formats">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
					<li><a  href="#?q=get-tag&vid=3&tid=120">studio album</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class="uk-card uk-card-secondary collapse" id="tags-country">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
					<li><a  href="#?q=get-tag&vid=4&tid=143">Австрия</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class="uk-card uk-card-secondary collapse" id="tags-alpha">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
					<li><a  href="#?q=get-tag&vid=53tid=5">А</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-band">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
								</ul>\
							</div>\
						</div>\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-genre">\
							<div class="uk-card-body uk-padding-small">\
								<ul class="uk-list tag-list">\
					<li><a  href="#?q=get-tag&vid=9&vid=122">Рок</a></li>\
								</ul>\
							</div>\
						</div>'
			},
			
			"blockFileManager" : {
				"html" : '\
					<div class="uk-card uk-card-default">\
						<div class="row">\
							<div class="uk-float-left uk-padding-small">\
									<b>File manager</b>\
							</div>\
							<div class="uk-float-right">\
		<a data-toggle="#block-file-manager" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
							<div class="wrapper">\
								<div class="">\
									<ul class="menu-file-action button-group">\
										<button id="checkAll">select all</button>\
										<button id="clearAll">clear all</button>\
		<li><a href="#modal-rename" class="rename uk-button uk-button-small uk-button-default">rename selected</a></li>\
		<li><a class="group-remove uk-button uk-button-small uk-button-danger" href="#">delete selected</a></li>\
		<li><a href="#modal-" class="uk-button uk-button-small uk-button-primary">add track to playlist</a></li>\
									</ul>\
								</div>\
								<div class="uk-padding-small">\
									<a class="up-link btn" href="/mnt/d2"><span class="icon-level-up"></span></a>\
									<span class="dirname">/mnt/d2/music</span>\
								</div>\
								<div class="wfm">\
											<ul class="folders-list uk-list uk-list-striped">\
												<li>\
													<input name="file[]" value="E" type="checkbox">\
													<a class="subfolder" href="/mnt/d2/music/E"><span class="icon-folder"></span> E</a>\
												</li>\
												<li>\
													<input name="file[]" value="0" type="checkbox">\
													<a class="subfolder" href="/mnt/d2/music/0"><span class="icon-folder"></span> 0</a>\
												</li>\
											</ul>\
											<ul class="files-list uk-list uk-list-striped">\
												<li>\
													<div class="file">\
														<input name="file[]" value="log.txt" type="checkbox">\
														<a href="/music/log.txt" target="_blank">log.txt</a>\
													</div>\
												</li>\
											</ul>\
								</div><!-- /wfm -->\
							</div><!-- /files -->\
						</div>\
					</div>'
			},
			
			"blockPager" : '<div class="row">\
							<div class="uk-float-left">\
				total records: <b><span id="total-records">40</span></b>, \
				number of pages: <b><span id="total-pages">4</span></b>\
							</div>\
							<div class="uk-float-right">\
				<form name="formSearch" id="form-search" action="?q=search" method="GET">\
								<ul class="button-group">\
									<li><input name="keyword" id="input-keyword" placeholder="enter keyword" autocomplete="off" value="" type="text" class="uk-input"></li>\
									<li><button type="submit" class="uk-button uk-button-small uk-button-primary">\
									<span class="icon-search"></span></button></li>\
									<li><button type="reset" class="uk-button uk-button-small uk-button-danger">\
									<span class="icon-remove"></span></button></li>\
								</ul>\
				</form>\
							</div>\
					</div>\
					<div class="row">\
						<div class="block-num-page uk-float-left w20">\
							<button id="page-number-less" class="">-</button>\
							<input id="page-number" type="text" value="1" size="3" maxlength="3" autocomplete="off" class="only-numbers">\
							<button id="page-number-more" class="">+</button>\
						</div>\
						<div class="uk-float-left w60 box-range">\
				<input id="page-range" type="range" min="1" max="10" step="1" value="1" autocomplete="off" class="range uk-width-1-1">\
						</div>\
						<div class="uk-float-right">\
							<label class="uk-label">sort by</label>\
							<select id="select-sort" class="" autocomplete="off">\
								<option value="title" selected="">title</option>\
								<option value="published">publication date</option>\
							</select>\
						</div>\
			</div>',
			
			"blockNodes" : '{{content}}',
			"blockList" : '<div>{{list}}</div>',
			"blockListItem" : '<div class="uk-card uk-card-default node pls-8">\
						<div class="uk-card-header uk-padding-small block-titles">\
								<h3>{{title}}</h3>\
							</div>\
					<div class="uk-card-body uk-padding-small block-images">\
<img src="{{img_path}}" alt="{{title}}" title="{{title}}">\
					</div>\
						<div class="toggle-content">\
							<button class="btn-dropdown icon-chevron-down"></button>\
							<div class="uk-card-body uk-padding-small block-content" style="display:block">\
								<ul class="uk-list">\
<li><a href="#?q=load_playlist&url={{playlist_filepath}}" class="btn btn-blue-c4 btn-load-playlist">add to playlist</a></li>\
<li><a data-toggle="#modal-edit-node" href="#modal" class="btn btn-blue-c4">edit</a></li>\
								</ul>\
{{related_links}}\
								<div class="description">{{description}}</div>\
{{node_tags}}\
							</div>\
						</div>\
			</div>',

"relatedLinksList" : '<ul class="related-links">{{list}}</ul>', 
"relatedLinksListItem" : '<li><a href="{{url}}" target="_blank">{{title}}</a></li>',

"nodeTagList" : '<ul class="list-inline node-tags">{{list}}</ul>', 
"nodeTagListItem" : '<li><a href="#" data-group-name="{{data_group_name}}">{{text}}</a></li>',
			
		"blockLinks" : '<!-- <h2>{{block_title}}</h2>-->\
<div class="uk-card uk-card-primary">\
{{content}}\
</div>',
		"blockLinksList" : '<ul class="uk-card-body uk-text-center">{{list}}</ul>',
		//"blockLinksListItem" : '<li class="uk-inline"><a class="" href="{{url}}" target="_blank">{{title}}</a></li>',
		"blockLinksListItem" : '<li><a class="" href="{{url}}" target="_blank">{{title}}</a></li>',
		"blockLinksListItem3" : '<li>use specific template: {{template}},<br> {{url}} {{title}}</li>'//,
		
		//"blockLinksListItem6" : '<li>use specific template: {{template}}, {{url}} {{titles}}</li>',
		//"blockLinksListItem6_listTpl" : '<ul>{{list}}</ul>',
		//"blockLinksListItem6_itemTpl" : '<li>{{url}} {{title}}</li>'
		}//end templates
		
	};

	var _init = function(){
//console.log("init _draw");
	};
	
	var _buildPage = function( opt ){
		var p = {
		};
		//extend options object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(opt);

		//for( var n = 0; n < webApp.vars["blocks"].length; n++){
			//_buildBlock( webApp.vars["blocks"][n] );
		//}//next
		_buildBlock( webApp.vars["blocks"][5] );
		//_buildBlock( webApp.vars["blocks"][6] );
		
	};//end _buildPage()


	var _buildBlock = function(opt){
//console.log("_buildBlock()", arguments);
		var timeStart = new Date();
		var p = {
			"title": "",
			"content" : "",
			"templateID" : "tpl-block",
			//"contentType" : "",
			//"contentTpl" : "tpl-list",//"tpl-menu"
			//"contentListTpl" : false,
			"callback" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);			
			}//,//end callback
		};
		//extend p object
		for(var key in opt ){
			p[key] = opt[key];
		}
//console.log(p);
//console.log( typeof p["content"]);

		if( typeof p["content"] === "function"){//dynamic form content
			p["content"]();
		} else {
			_insertBlock( p );
		}
	};//end _buildBlock()
	
	
	var _insertBlock = function( opt ){
		var p = {
			"templateID": false,
			"locationID": "",
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
		if( !webApp.draw.vars["templates"][templateID] ){
webApp.vars["logMsg"] = "_insertBlock(), error, not found template, id:" + templateID;
func.logAlert( webApp.vars["logMsg"], "error");
console.log( "-- " + webApp.vars["logMsg"] );
			if( typeof p["callback"] === "function"){
				p["callback"]();
			}
			return false;
		}
		
		if( !p["content"] || p["content"].length === 0){
webApp.vars["logMsg"] = "_insertBlock(), warning, not found or empty content block " + p["locationID"];
//func.logAlert( webApp.vars["logMsg"], "warning");
console.log( "-- "+webApp.vars["logMsg"] );
			//if( typeof p["callback"] === "function"){
				//p["callback"]();
			//}
			//return false;
		}
		
		var html = webApp.draw.vars["templates"][templateID];
		html = html.replace("{{block_title}}", p["title"]);
		html = html.replace("{{content}}", p["content"]);
		
		var locationBlock = func.getById( p["locationID"] );
		if( locationBlock ){
			locationBlock.innerHTML = html;
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["callback"] === "function"){
			p["callback"]();
		}

	};//end _insertBlock()


	function _wrapData( opt ){
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

		if( !p["data"] || p["data"].length === 0){
console.log("-- _draw.wrapData(), error, incorrect data ...");
			return false;
		}
		if( !p["templateID"] ){
console.log("-- _draw.wrapData(), error, templateID was not defined...");
			return false;
		}
		
		if( !webApp.draw.vars["templates"][p.templateID] ){
console.log("-- _draw.wrapData(),  error, not find template, id: " + p.templateID);
			return false;
		}
		
		var html = "";
//console.log( p["data"].length );

		p["wrapType"] = "item";
		if( p["data"].length > 0 ){
			p["wrapType"] = "list";
		}
		switch( p["wrapType"] ){
			case "item" :
				html = __formNodeHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
			break;
			case "list" :
				if( !p["templateListItemID"] ){
webApp.vars["logMsg"] = "-- wrapData(), error, var templateListItemID incorrect...";
console.log(webApp.vars["logMsg"]);							
					return false;
				}
				html = __formListHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
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

			return _html;
		}//end __formNodeHtml()
		
		function __formListHtml( data, _html ){
//console.log( data);
//console.log( data instanceof Array, data);
			var test = data instanceof Array;
			if( !test){
console.log("-- error, info block data  is not instanceof Array: ", typeof data, data );
				return false;
			}
			
			var listHtml = "";
			for( var n = 0; n < data.length; n++){
//console.log( n );
//console.log( data[n], typeof data[n], data.length);

				//form list items
				var item = data[n];
				
				var itemHtml = webApp.draw.vars["templates"][ p.templateListItemID];
				//load unique template for data element
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.draw.vars["templates"][ tplName ] ){
						itemHtml = webApp.draw.vars["templates"][ tplName ];
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
//console.log( tplKeys, p.templateListItemID, item, itemHtml );
				//}
//---------------

				//make copy object item
				var jsonNode = JSON.stringify( item );
				var _tmp = JSON.parse( jsonNode);
				
				//for( var key2 in item){
				for( var n1 = 0; n1 < tplKeys.length; n1++){
					var key2 = tplKeys[n1];
//console.log(item[key2] instanceof Array, key2, item[key2]);
//if(n === 1){
//console.log(key2, item[key2]);
//}

					if( item[key2] instanceof Array ){//child array in data element
						if(item[key2].length === 0){
console.log("-- warning, empty field....", key2, item[key2]);
//continue;	
							item[key2] = "<span class='not-found-item'>not found " + key2 +"</span>";
						} else {
							var subOrdList = item[key2]["listTpl"];
							var itemTpl = item[key2]["itemTpl"];
//console.log(subOrdList);
//console.log(itemTpl);
//console.log(item[key2], key2);
				
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

	}//end _wrapData()

	
	// public interfaces
	return{
		vars : _vars,
		init:	function(){ 
			return _init(); 
		},
		buildPage: _buildPage,
		buildBlock: _buildBlock,
		insertBlock:	function( opt ){ 
			return _insertBlock( opt ); 
		},
		wrapData:	function( opt ){ 
			return _wrapData( opt ); 
		}
	};
}//end _draw()




/*
	var _buildPage = function( opt ){
//console.log("_buildPage()", arguments);

		//if( webApp.vars["wait"] ){
			//webApp.vars["wait"].className="modal-backdrop in";
			//webApp.vars["wait"].style.display="block";
		//}
		
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

		// //draw static blocks
		// for( var n = 0; n < webApp.vars["blocks"].length; n++){
			// var _opt = webApp.vars["blocks"][n];
// // //console.log(_opt["visibility"], p["title"]);				
			// if( _opt["visibility"]){
				// // if( opt["visibility"].indexOf( p["title"] ) !== -1 ){
					// _draw_buildBlock( _opt );
				// // }
			// }
			
		// }//next

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
func.log("<p class='alert alert-danger'>" + webApp.vars["logMsg"] + "</p>");
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


		if( typeof p["callback"] === "function"){//return from _buildPage()
			p["callback"]();
		}
			
	};//end _buildPage()
	
*/






	function _draw_updatePager(opt){
		func.log("", "total-records");
		func.log(opt["total_records"], "total-records");

		var numRecordsPerPage = webApp.db.vars["numRecordsPerPage"];
		var numPages = Math.ceil( opt["total_records"] / numRecordsPerPage);
		webApp.db.vars["numPages"] = numPages;

		//$("#page-number").val(numPages);
		func.log("", "total-pages");
		func.log(numPages, "total-pages");
		
		$("#page-number").val( opt["page_number"] );

		$("#page-range").val(opt["page_number"]);
		$("#page-range").attr("max", numPages);
		
		//$("#page-number-2").attr("max", numPages);
	}//end _draw_updatePagers()
