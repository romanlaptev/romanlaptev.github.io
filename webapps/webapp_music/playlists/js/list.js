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
	
	var $list = $xml.find("xdata").children("playlist");
	var html = "";
	$list.each(function(num, item){
		var $pls = $(this);
		
		var _title = $pls.attr("title");
		var _location = $pls.children("location").text();
//console.log( _title, _location );
//console.log( $pls.children("thumbnail").length, _thumbnail );

		var _thumbnail = "";
		if( $pls.children("thumbnail").attr("url") ){
			_thumbnail = $pls.children("thumbnail").attr("url");
		}

		var _class = num;
		if( $pls.attr("class") ){
			_class = $pls.attr("class");
		}

		html += vars["templates"]["playlist_tpl"]
		.replace(/{{title}}/g, _title)
		.replace("{{class}}", _class)
		.replace("{{img_src}}", _thumbnail)
		.replace("{{location}}", _location );
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
console.log(arguments);
	vars["playlistObj"].setPlaylist( opts["data"] );	
	
}//end _postLoad()