function _draw( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		"templates":{

//=========================================
			"blockPlayer" : '<div class="uk-card uk-card-default uk-margin-small">\
						<div class="row">\
							<div class="uk-float-right">\
									<a data-toggle="#block-player" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small wrapper">\
							<div class="uk-margin-small">\
								<h5 id="track-info"></h5>\
<audio id="audio-player" controls="controls" class="w100"><source src="" />Tag <b>audio</b> not supported by this browser....</audio>\
							</div>\
							<div class="uk-margin-small">\
<iframe type="text/html" id="iframe-player" src="" style="display: none;" width="640" height="385" frameborder="1"></iframe>\
<video id="video-player" controls="controls" width="640" height="385">\
	<source src="">\
	Tag <b>video</b> not supported by this browser.... \
</video>\
							</div>\
							<div id="player-buttons">\
								<ul class="button-group uk-list">\
<!--<button id="btn-play" class="btn btn-blue">play</button>\
<button id="btn-pause" class="btn btn-blue">pause</button>-->\
<li><a href="?q=prev-track" class="btn btn-blue">previous track</a></li>\
<li><a href="?q=next-track" class="btn btn-blue">next track</a></li>\
								</ul>\
							</div>\
						</div>\
{{content}}\
					</div>',
			
//=========================================
			"blockTrackList" : '<div class="wrapper">{{content}}</div>',
			"trackList" : '\
<div class="row">\
			<div class="uk-float-left">\
				<h4>{{tracklist_title}}</h4>\
			</div>\
			<div class="uk-float-right">\
					<a data-toggle="#block-tracklist" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
			</div>\
</div>\
		<div class="">\
			<ul class="menu-track-action button-group uk-list">\
<li><a href="?q=clear-tracklist" class="uk-button uk-button-danger uk-button-small">clear track list</a></li>\
<li><a href="?q=toggle" data-toggle="#modal-insert-track" class="uk-button uk-button-primary uk-button-small">insert track</a></li>\
<li><a href="?q=get-tracklist-url&action=load-tracklist" title="load track list from JSON file" class="uk-button uk-button-primary uk-button-small">Load track list</a></li>\
<li><a href="?q=get-tracklist-url&action=save-tracklist" title="save track list to JSON file" class="uk-button uk-button-primary uk-button-small">Save track lists</a></li>\
			</ul>\
		</div>\
<div class="media-list">\
	<ul id="track-list" class="list-unstyled">{{list}}</ul>\
</div>',
						
			"trackListItem" :  '<li class="list-group-item">\
	<div class="uk-clearfix">\
		<div class="uk-float-left">{{number}}.\
			<a class="track-name" href="?q=load-track&amp;num={{number}}">{{artist}}, {{title}}</a>\
		</div>\
		<div class="uk-float-right">\
<a class="edit-track" href="?q=edit-track&amp;num={{number}}">edit</a> | \
<a class="remove-track" href="?q=remove-track&amp;num={{number}}" title="Remove this track from tracklist">x</a>\
		</div>\
	</div>\
</li>',

			
//=========================================
			"blockTags" : "{{block-tag-groups}} {{block-taglist}}",
			"blockTagGroups" : '\
						<div class="uk-card uk-card-primary">\
						<div class="row">\
							<div class="uk-float-left uk-padding-small">\
								<b>Tag groups</b>\
							</div>\
							<div class="uk-float-right">\
<a data-toggle="#block-tags" href="?q=close" title="reset tags select" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
{{content}}\
						</div>\
					</div>',
			"tagGroupsList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagGroupsListItem" :  '<li><a  href="?q=get-tag-list&vid={{vid}}&group_name={{name}}">{{name}} </a><small>({{num}})</small></li>',
					
			"blockTagList" : '\
						<div class="uk-card uk-card-secondary collapse" id="tags-music-syles">\
							<div class="uk-card-body uk-padding-small">\
{{content}}\
							</div>\
						</div>',
			"tagList" :  '<ul class="uk-list tag-list">{{list}}</ul>',
"tagListItem" :  '<li><a href="?q=get-nodes-by-tag&vid={{vid}}&tid={{tid}}&group_name={{group_name}}">{{text}} </a><small>({{num}})</small></li>',
			
//=========================================
			"blockFileManager" : '<div class="uk-card uk-card-default wrapper">{{content}}</div>',
			"contentFileManager" : '<div class="row">\
							<div class="uk-float-left uk-padding-small">\
									<b>File manager</b>\
							</div>\
							<div class="uk-float-right">\
<a data-toggle="#fm-settings" href="?q=toggle" class="btn icon-cog"></a>\
<a data-toggle="#block-file-manager" href="?q=close" class="uk-button uk-button-small uk-button-danger">x</a>\
							</div>\
						</div>\
						<div class="uk-card-body uk-padding-small">\
<div id="fm-settings" class="wrapper uk-margin-small uk-padding-small uk-hidden">\
<b>Define location music collection: </b>\
	<input name="inp_location_path" id="input-location-path" value="{{location}}" type="text" class="uk-input w80">\
	<a href="?q=define-location" class="btn btn-blue">Reload</a>\
	<p>/mnt/d2/music; /home/www/music; d:/music</p>\
	<b>web alias:</b><input name="inp_web_alias" id="input-web-alias" value="{{web_alias}}" type="text" class="uk-input 
	">\
	<p>/music; /www; /video....</p>\
</div>\
							<div class="wrapper">\
{{buttons_fs_action}}\
<div class="row">\
	{{btn_change_level}}\
	<div class="breadcrumbs uk-float-left w90"><p><b>fs path</b>: {{fs_path}}</p> <p><b>url path</b>: {{url_path}}</p></div>\
</div>\
{{filelist}}\
							</div>\
						</div>',
					
			"buttonsFSaction": '<div class="">\
	<ul class="btn-fs-action button-group">\
<li><a href="?q=check-all" class="btn btn-blue">select all</a></li>\
<li><a href="?q=clear-all" class="btn btn-blue">clear all</a></li>\
<li><a href="?q=rename-file" class="btn btn-orange">rename selected</a></li>\
<li><a href="?q=delete-file" class="group-remove uk-button uk-button-small uk-button-danger" >delete selected</a></li>\
<li><a href="?q=add-track" class="uk-button uk-button-small uk-button-primary">add track to tracklist</a></li>\
	</ul>\
</div>',

		"btnChangeLevel": '<div class="uk-padding-small uk-float-left">\
<a class="up-link icon-level-up" href="?q=level-up"></a>\
</div>',

			"fileList": '<div class="wfm">{{subfolders}}{{files}}</div>',

			"subfolders_listTpl" : '<ul class="folders-list uk-list uk-list-striped">{{list}}</ul>', 
			"subfolders_itemTpl" : '<li>\
<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
<a class="subfolder" href="?q=get-folder&foldername={{name}}"><span class="icon-folder"></span>{{name}}</a>\
</li>',

		"files_listTpl" : '<ul class="files-list uk-list uk-list-striped">{{list}}</ul>', 
		
		"files_itemTpl" : '<li><div>\
		<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
		<a class="file-name no-block-link" href="{{url}}" target="_blank">{{name}}</a>\
	</div></li>',
	
		"files_itemTpl_block" : '<li>\
	<div>\
		<input name="file[]" value="{{name}}" type="checkbox" class="no-block-link">\
		<span class="file-name">{{name}}</span>\
	</div>\
</li>',


//=========================================
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
<li><a href="?q=load-tracklist&url={{playlist_filepath}}" class="btn btn-blue-c4 btn-load-tracklist">add to tracklist</a></li>\
<li><a href="?q=edit-node&nid={{nid}}" class="btn btn-blue-c4">edit</a></li>\
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
				"itemTpl" : '<li><a href="{{href}}" data-type="{{data-type}}" target="_blank" class="no-block-link">{{text}}</a></li>',
			},
			node_tags : {
"listTpl" : '<div><ul class="list-inline node-tags">{{list}}</ul></div>', 
"itemTpl" : '<li><a href="?q=get-nodes-by-tag&group-name={{group_name}}" class="">{{text}}</a></li>',
			},
			
//=========================================
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

		if( p["data"].length > 0 ){
			html = __formListHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
		} else {
			html = __formNodeHtml( p["data"], webApp.draw.vars["templates"][ p.templateID ] );
		}
		
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

/*
	function _wrapDataMod( opt ){
		var p = {
			"data": null,
			"templateID" : false,
			"template" : false,
			"templateListItemID": false,
			"templateListItem": false
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
		
		var _template = p.templateID;
console.log(_template);

		if( ! _template || _template.length === 0 ){
console.log("-- error, _draw.wrapData(),  template is not defined...");
			return false;
		}
		
		
		var html = "";
//console.log( p["data"].length );

		if( p["data"].length > 0 ){
			html = __formListHtml( p["data"], _template );
		} else {
			html = __formNodeHtml( p["data"], _template );
		}
		
//console.log(html);
		return html;

		//function __formNodeHtml( data, _html ){
		function __formNodeHtml( data, tpl ){
//----------------- load unique template for data element
//hide element - write not defined template ID
		if( data["template"]){
//console.log(data);
//console.log(data["template"].length);
			
			if( data["template"].length > 0){
				var tplName = data["template"];
				if( webApp.draw.vars["templates"][ tplName ] ){
					tpl = webApp.draw.vars["templates"][ tplName ];
				} else {
//console.log("-- warning, no draw element because not defined template: '" + tplName + "'...");
//console.log(data);
					return "";
				}
			}

		}
			
			var _html = tpl;
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
		
		function __formListHtml( data, tpl ){
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
				
				var itemHtml = tpl;
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
			
			_html = tpl.replace("{{list}}", listHtml);
			return _html;
			
		}//end __formListHtml

	}//end _wrapDataMod()
*/
	
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
		//wrapDataMod: _wrapDataMod,
		updatePager: _updatePager
	};
}//end _draw()

/*
<div id="field-tracklist-url" class="uk-hidden uk-margin-small">\
<input type="text" name="input_tracklist_url" value="" placeholder="enter track list url" class="uk-input w80">\
<a href="?q=get-tracklist-url" class="btn btn-blue">load</a>\
<a data-toggle="#field-tracklist-url" href="?q=close" class="btn">x</a>\
</div>\
*/
