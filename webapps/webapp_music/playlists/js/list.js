// init vars
var vars = {
	"templates" : {
		"playlist_tpl" : "",
	},
	"contentId" : "#external-content"
};
console.log( "vars:" , vars );

_load( "playlists/xml/list.xml", _init );

function _load ( file, callBack ) {
	var _startTime = new Date();
	
	$.ajax({
		type: "GET",
		url: file,
		//dataType: "xml",
		//dataType: "json",
		
		beforeSend: function(){
//console.log("beforeSend:", arguments);					
			//return false; //cancel
		},
		
		success: function( data, textStatus ){
//console.log( arguments );
		var _endTime = new Date();
		_runtime = (_endTime.getTime() - _startTime.getTime()) / 1000;
			
			if( typeof callBack === "function"){
				callBack({
					"data" : data,
					"runtime" : _runtime
				});
			}
			
		},
		
		error: function( xml, status, errorThrown ){
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
		}
	});
	
	
}//_load()


function _init( opts ){
//console.log( arguments );

	var $xml = $( opts["data"] );
	
// var title = $xml.find( "title" ).text();
// console.log( title );
// return;

	//read template
	vars["templates"]["playlist_tpl"] = $("#playlist-tpl").html();
	vars["templates"]["playlist_tpl_related_link"] = "<a href='{{location}}' class='btn btn-info' target='_blank'>yandex music</a>";
	
	var $list = $xml.find("xdata").children("playlist");
	var html = "";
	$list.each(function(num, item){
		var $pls = $(this);
		
		var _title = $pls.attr("title");
		var _location = $pls.children("location").text();
//console.log( _title, _location );
//console.log( $pls.children("thumbnail").length, _thumbnail );
//-----------------------------------------
		var _related_links_html="";
		var $related_links = $pls.children("related_links");
//console.log( $related_links, $related_links.length > 0 );
		if( $related_links.length > 0){
			$related_links.children("li").each(function(num, item){
//console.log( num, $(item).text() );
				_related_links_html += vars["templates"]["playlist_tpl_related_link"].replace("{{location}}", $(item).text() );
			});
		}
//-----------------------------------------
		

		var _thumbnail = "";
		var _img_alt = "";
		var _img_title = "";
		if( $pls.children("thumbnail").attr("url") ){
			_thumbnail = $pls.children("thumbnail").attr("url");
			_img_alt = $pls.attr("title");
			_img_title = $pls.attr("title");
		}

		var _class = num;
		if( $pls.attr("class") ){
			_class = $pls.attr("class");
		}

		html += vars["templates"]["playlist_tpl"]
		//.replace(/{{title}}/g, _title)
		.replace("{{title}}", _title)
		.replace("{{class}}", _class)
		.replace("{{img_src}}", _thumbnail)
		.replace("{{img_alt}}", _img_alt)
		.replace("{{img_title}}", _img_title)
		.replace("{{location}}", _location )
		.replace("{{related_links}}", _related_links_html );
	});
	
	$(vars["contentId"]).html( html );

	$(".load-playlist").on("click", function(e){
//console.log(e.target, e.target.getAttribute("href") );		
		var url = e.target.getAttribute("href");
		_load( url, _postLoad );
		e.preventDefault();
	});
	
}//_init()


function _postLoad( opts ){
//console.log(arguments);
	vars["playlistObj"].setPlaylist( opts["data"] );	
}//end _postLoad()
