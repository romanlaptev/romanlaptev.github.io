function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"templates":{

			"blockPlayer" : '<div class="uk-card uk-card-default uk-margin-small">\
						<div class="row">\
							<div class="uk-float-right">\
									<a data-toggle="#block-player" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body w60 uk-padding-small wrapper">\
							<div>\
								<h5 id="track-info"></h5>\
<audio id="audio-player" controls="controls" class="w100"><source src="" />Tag <b>audio</b> not supported by this browser....</audio>\
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
<!--<button id="btn-play" class="btn btn-blue">play</button>\
<button id="btn-pause" class="btn btn-blue">pause</button>-->\
<li><a href="#?q=prev-track" class="btn btn-blue">previous track</a></li>\
<li><a href="#?q=next-track" class="btn btn-blue">next track</a></li>\
								</ul>\
							</div>\
						</div>\
{{content}}\
					</div>',
			
			"blockTrackList" : '<div class="wrapper">{{content}}</div>',
			"trackList" : '\
<div class="row">\
			<div class="uk-float-left">\
				<h4>{{tracklist_title}}</h4>\
			</div>\
			<div class="uk-float-right">\
					<a data-toggle="#block-tracklist" href="#close" class="uk-button uk-button-small uk-button-danger">x</a>\
			</div>\
</div>\
		<div class="">\
			<ul class="menu-track-action button-group uk-list">\
<li><a href="#?q=clear-tracklist" class="uk-button uk-button-danger uk-button-small">clear track list</a></li>\
<li><a href="#?q=insert-track" title="insert track (local file or url)" class="uk-button uk-button-primary uk-button-small">insert track</a></li>\
<li><a href="#toggle" data-toggle="#field-tracklist-url" title="load track list from JSON file" class="uk-button uk-button-primary uk-button-small">Load track list</a></li>\
<li><a href="#?q=save-tracklist" title="save track list to JSON file" class="uk-button uk-button-primary uk-button-small">Save track lists</a></li>\
			</ul>\
<div id="field-tracklist-url" class="uk-hidden">\
<input type="text" name="input_tracklist_url" value="/music/0_playlists/Korpiklaani.json" placeholder="enter track list url" class="uk-input w80">\
<a href="#?q=get-tracklist-url" class="btn btn-blue">load</a><a data-toggle="#field-tracklist-url" href="#close" class="btn">x</a>\
</div>\
		</div>\
<div class="media-list">\
	<ul id="track-list" class="list-unstyled">{{list}}</ul>\
</div>',
						
			"trackListItem" :  '<li class="list-group-item">\
	<div class="uk-clearfix">\
		<div class="uk-float-left">{{number}}.\
			<a class="track-name" href="#?q=load-track&amp;num={{number}}">{{artist}} {{title}}</a>\
		</div>\
		<div class="uk-float-right">\
<a class="edit-track" href="#?q=edit-track&amp;num={{number}}">edit</a> | \
<a class="remove-track" href="#?q=remove-track&amp;num={{number}}" title="Remove this track from tracklist">x</a>\
		</div>\
	</div>\
</li>',

			
			"blockTags" : "{{block-tag-groups}} {{block-taglist}}",
			"blockTagGroups" : '\
						<div class="uk-card uk-card-primary">\
						<div class="row">\
							<div class="uk-float-left uk-padding-small">\
								<b>Tag groups</b>\
							</div>\
							<div class="uk-float-right">\
<a data-toggle="#block-tags" href="#close" title="reset tags select" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
{{content}}\
						</div>\
					</div>',
			"tagGroupsList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagGroupsListItem" :  '<li><a  href="#?q=get-tag-list&vid={{vid}}&group_name={{name}}">{{name}} </a><small>({{num}})</small></li>',
					
			"blockTagList" : '\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-syles">\
							<div class="uk-card-body uk-padding-small">\
{{content}}\
							</div>\
						</div>',
			"tagList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagListItem" :  '<li><a href="#?q=get-nodes-by-tag&vid={{vid}}&tid={{tid}}&group_name={{group_name}}">{{text}} </a><small>({{num}})</small></li>',
			
			"blockFileManager" : '<div class="uk-card uk-card-default">\
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
					</div>',
			
			"blockPager" : '<div class="row">\
<div class="uk-float-left">\
records: <b><span id="total-records">{{total_nodes}}</span></b> \
(<small><b><span id="num-pages">{{num_pages}}</span></b> pages</small>)\
</div>\
							<div class="uk-float-right">\
<form name="formSearch" id="form-search" action="">\
	<div class="form-group">search by: \
		<label><input type="radio" name="targetField" value="title" checked>title</label>\
<!--		<label><input type="radio" name="targetField" value="description">description</label> -->\
<!--		<label><input type="radio" name="targetField" value="filename" >attached filename</label>-->\
	</div>\
	<ul class="button-group">\
		<li><input name="keyword" id="input-keyword" placeholder="enter keyword" autocomplete="off" value="" type="text" class="uk-input"></li>\
		<li><button type="submit" class="uk-button uk-button-small uk-button-primary no-block-link"><i class="icon-search no-block-link"></i></button></li>\
		<li><button type="reset" class="uk-button uk-button-small uk-button-danger no-block-link"><i class="icon-remove no-block-link"></i></button></li>\
	</ul>\
</form>\
							</div>\
					</div>\
					<div class="row">\
						<div class="block-num-page uk-float-left w20">\
<small>page №:</small>\
<button id="btn-page-number-less" class="">-</button>\
<input id="page-number" type="text" value="" size="3" maxlength="3" autocomplete="off" class="only-numbers">\
<button id="btn-page-number-more" class="">+</button>\
						</div>\
						<div class="uk-float-left w60 box-range">\
<input id="page-range" type="range" min="1" max="5" step="1" value="1" autocomplete="off" class="range uk-width-1-1">\
						</div>\
					</div>\
					<div class="row">\
						<div class="uk-float-right">\
							<label class="uk-label">sort by</label>\
							<select id="select-sort" class="" autocomplete="off">\
								<option value="" selected=""></option>\
								<option value="title">title</option>\
								<option value="updated">update date</option>\
							</select>\
						</div>\
					</div>',
			// "pageInfo" : '<div class="uk-float-left">\
// records: <b><span id="total-records">{{total_nodes}}</span></b> \
// <small>(<b><span id="num-pages">{{num_pages}}</span></b> pages )</small> \
			// </div>',
			
			"blockNodes" : '{{content}}',
			"blockList" : '<div>{{list}}</div>',
			"blockListItem" : '<div class="uk-card uk-card-default node pls-8">\
<div class="node-wrap">\
						<div class="uk-card-header uk-padding-small block-titles">\
{{title}}\
						</div>\
						<div class="uk-card-body uk-padding-small block-images">\
							<img src="{{main_picture}}">\
						</div>\
</div>\
						<div class="toggle-content">\
							<button class="btn-dropdown icon-chevron-down"></button>\
							<div class="uk-card-body uk-padding-small block-content">\
								<ul class="uk-list">\
<li><a href="#?q=load-tracklist&url={{playlist_filepath}}" class="btn btn-blue-c4 btn-load-tracklist">add to tracklist</a></li>\
<li><a href="#?q=edit-node&nid={{nid}}" class="btn btn-blue-c4">edit</a></li>\
								</ul>\
{{related_links}}\
								<div class="description">{{description}}</div>\
{{node_tags}}\
{{images}}\
								<div>\
									<small>published: {{published}},	updated: {{updated}}</small>\
								</div>\
							</div>\
						</div>\
			</div>',

//sub LISTs

			title : {
				"listTpl" : '{{list}}', 
				"itemTpl" : '<h3>{{text}}</h3>',
			},
			images : {
				"listTpl" : '<div class="uk-card-body uk-padding-small">{{list}}</div>', 
				"itemTpl" : '<div class="block-images"><img src="{{src}}" alt="" title=""></div>',
			},
			related_links : {
				"listTpl" : '<ul class="related-links">{{list}}</ul>', 
				"itemTpl" : '<li><a href="{{href}}" data-type="{{data-type}}" target="_blank">{{text}}</a></li>',
			},
			node_tags : {
"listTpl" : '<div><ul class="list-inline node-tags">{{list}}</ul></div>', 
"itemTpl" : '<li><a href="#?q=get-nodes-by-tag&group-name={{group_name}}" class="">{{text}}</a></li>',
			},
			
		"blockFooterLinks" : '<!-- <h2>{{block_title}}</h2>-->\
<div class="uk-card uk-card-primary">\
{{content}}\
</div>',
		"blockLinksList" : '<ul class="uk-card-body uk-text-center">{{list}}</ul>',
		"blockLinksListItem" : '<li class="uk-inline"><a class="no-block-link" href="{{url}}" target="_blank">{{title}}</a></li>',
		//"blockLinksListItem3" : '<li>use specific template: {{template}},<br> {{url}} {{title}}</li>'//,
		
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
		
		_buildBlock( webApp.vars["blocksByName"]["blockTagGroups"] );
		_buildBlock( webApp.vars["blocksByName"]["blockPager"] );
		_buildBlock( webApp.vars["blocksByName"]["blockNodes"] );
		
		_buildBlock( webApp.vars["blocksByName"]["blockPlayer"] );
		_buildBlock( webApp.vars["blocksByName"]["blockTrackList"] );
		
		if( webApp.vars["use_file_manager"] ){
			_buildBlock( webApp.vars["blocksByName"]["blockFM"] );
		}
		
		_buildBlock( webApp.vars["blocksByName"]["blockFooterLinks"] );

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
			"postFunc" : function(){
				var timeEnd = new Date();
				var ms = timeEnd.getTime() - timeStart.getTime();
				var msg = "Generate block '" + this.title +"', "+this.templateID+", runtime:" + ms / 1000 + " sec";
console.log(msg);
				if( typeof p["callback"] === "function"){
					p["callback"]();//return from _buildBlock()
				}
			},//end postFunc
			"callback" : null
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
			"postFunc":null
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
			
			//show block if hidden
			if( locationBlock.style.display === "none"){
				locationBlock.style.display = "block";
			}
//console.log( locationBlock, locationBlock.style.display );
			
		} else {
webApp.vars["logMsg"] = "error, not found block location id: " + p["locationID"];
func.logAlert( webApp.vars["logMsg"], "error");
console.log( webApp.vars["logMsg"] );
		}		
		
		if( typeof p["postFunc"] === "function"){
			p["postFunc"]();
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

		//function __formNodeHtml( data, _html ){
		function __formNodeHtml( data, template ){
//----------------- load unique template for data element
//hide element - write not defined template ID
		if( data["template"]){
//console.log(data);
//console.log(data["template"].length);
			
			if( data["template"].length > 0){
				var tplName = data["template"];
				if( webApp.draw.vars["templates"][ tplName ] ){
					template = webApp.draw.vars["templates"][ tplName ];
				} else {
//console.log("-- warning, no draw element because not defined template: '" + tplName + "'...");
//console.log(data);
					return "";
				}
			}

		}
			
			var _html = template;
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
//----------------- load unique template for data element
				if( item["template"] && item["template"].length > 0){
					var tplName = item["template"];
					if( webApp.draw.vars["templates"][ tplName ] ){
						itemHtml = webApp.draw.vars["templates"][ tplName ];
					} else {
console.log("-- warning, not found template, ", tplName );
						continue;
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
							//item[key2] = "<span class='not-found-item 1'>not found " + key2 +"</span>";
						} else {
							//read templates for sub list
							var subOrdList = _vars["templates"][key2]["listTpl"];
							var itemTpl = _vars["templates"][key2]["itemTpl"];
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
							//itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "<span class='not-found-item 2'>not found " + key2 +"</span>");
							itemHtml = itemHtml.replace(new RegExp("{{"+key2+"}}", "g"), "");
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

	
	function _updatePager(opt){
		
		if( webApp.db.vars["queryRes"].length === 0){
			var totalNodes = webApp.db.vars["nodes"].length;
		} else {
			var totalNodes = webApp.db.vars["queryRes"].length;
		}
		var numPages = Math.ceil( totalNodes / webApp.db.vars["numRecordsPerPage"]);
		webApp.db.vars["numPages"] = numPages;
		
		$("#total-records").text( totalNodes );
		$("#num-pages").text( numPages );
		
//---------------------------------
		$("#page-number").val( webApp.db.vars["numberPage"] );
		$("#page-range").val( webApp.db.vars["numberPage"] );
		$("#page-range").attr("max", webApp.db.vars["numPages"]);
		
	}//end _updatePager()


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
		},
		updatePager: _updatePager
	};
}//end _draw()