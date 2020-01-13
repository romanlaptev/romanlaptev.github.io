var templates = {
	
	"blockPlayer" : {
		"container_tpl" : '<div class="uk-card uk-card-default">\
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
		"container_tpl" : "{{block-tag-groups}} {{block-taglist}}"
	},
	
	"blockTagGroups" : {
		"container_tpl" : '\
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
		"container_tpl" : '\
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
		"container_tpl" : '\
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
	
	"blockNodelist" : {
		"container_tpl" : "{{block-pager}}{{block-list}}"
	},
	
	"blockPager" : {
		"container_tpl" : '\
			<div class="row">\
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
			</div>'
	},
	
	"blockListItem" : {
		"container_tpl" : '\
			<div class="uk-card uk-card-default node pls-8">\
				<div class="uk-card-header uk-padding-small block-titles">\
						<h3>{{title}}</h3>\
					</div>\
			<div class="uk-card-body uk-padding-small block-images">\
<img src="{{img_path}}" alt="{{title}}" title="{{title}}">\
			</div>\
				<div class="toggle-content">\
					<button class="btn-dropdown icon-chevron-down"></button>\
					<div class="uk-card-body uk-padding-small block-content">\
						<ul class="uk-list">\
<li><a href="#?q=load_playlist&url={{playlist_filepath}}" class="btn btn-blue-c4 btn-load-playlist">add to playlist</a></li>\
			<li><a data-toggle="#modal-edit-node" href="#modal" class="btn btn-blue-c4">edit</a></li>\
						</ul>\
						<ul class="related-links">\
			<li><a href="https://music.yandex.ru/users/roman-laptev/playlists/1017" class="" target="_blank">music.yandex.ru</a></li>\
			<li><a href="#" class="" target="_blank">youtube playlists</a></li> \
			<li><a href="#" class="" target="_blank">music on VK.com </a></li>\
			<li><a href="#" class="" target="_blank">music on OK.ru </a></li>\
			<li><a href="#" class="" target="_blank">music on cloud.mail.ru</a></li>\
						</ul>\
						<div class="description">https://ru.wikipedia.org/wiki/Korpiklaani</div>\
						<ul class="list-inline node-tags">\
		<small><b>related tags:</b></small>\
				<li><a href="#" data-group-name="alphabetical_voc">J</a></li>\
				<li><a href="#" data-group-name="music_genre">Рок</a></li>\
				<li><a href="#" data-group-name="music_styles">classic rock</a></li>\
				<li><a href="#" data-group-name="music_styles">heavy metal</a></li>\
				<li><a href="#" data-group-name="country">Великобритания</a></li>\
				<li><a href="#" data-group-name="music_formats">collection</a></li>\
						</ul>\
					</div>\
				</div>\
			</div>'
	},
	
	"blockLinks" : {
		"container_tpl" : '<div class="uk-card uk-card-primary">\
				<ul class="uk-card-body uk-text-center">\
<li class="uk-inline">\
<a class="" href="https://music.yandex.ru/users/roman-laptev/playlists" target="_blank">music.yandex.ru</a>\
</li>\
<li class="uk-inline">\
<a class="" href="https://www.youtube.com/channel/UCgp8hFrPYEx2F1SqEB8yUMg/playlists" target="_blank">youtube playlists</a>\
</li>\
<li class="uk-inline">\
<a class="" href="https://vk.com/audios36466377" target="_blank">music on VK.com</a></li>\
<li class="uk-inline">\
<a class="" href="https://ok.ru/music/profile/508693848602" target="_blank">music on OK.ru</a></li>\
<li class="uk-inline">\
<a class="" href="https://cloud.mail.ru/public/bbb2f6a3eb1d/music" target="_blank">music on cloud.mail.ru</a></li>\
				</ul>\
	</div>\
'
	}
	
		
}//end templates{}
console.log("templates:", templates);