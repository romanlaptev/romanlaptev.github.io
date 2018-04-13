_vars = [];
_vars["sitename"] = "http://graphic-art-collection.16mb.com";
//_vars["sitename"] = "http://comp";

_vars["fonts"] = [
	{
		"font_name" : "AGRevueCyr Roman Medium",
		"font_family" : "AGRevueCyr",
		"panel_id" : "#font-AGRevueCyr",
		"view_code" : "#agrevc-code",
		"css_code" : function(){
			//var _code = "body{ background-color : orange !important}";
			var _code = "\
@font-face { font-family: 'AGRevueCyr';\
src: url('#FONTSITEfonts/A/AGREVC/AGREVC.eot');\
src: url('#FONTSITEfonts/A/AGREVC/AGREVC.eot') format('embedded-opentype'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.woff2') format('woff2'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.woff') format('woff'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.ttf') format('truetype'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.svg#AGREVC') format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/AGREVC/AGREVC.zip"
	},
];

_vars["sample_text"] = "\
абвгдежзийклмнопрстуфхцчшщъыьэюя <br>\
АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ  <br>\
abcdefghijklmnopqrstuvwxyz   <br>\
ABCDEFGHIJKLMNOPQRSTUVWXYZ   <br>\
1234567890.:,;   (!?) -*/  <br>\
";

$(document).ready(function(){
//console.log("Ready to start....");
//console.log( $("#agrevc-css").text() );

//Add CSS font-face text
//----------------
	addFont( _vars["fonts"][0] );

	$("#impact-code pre").text( $("#impact-css").text() );

	$("#century-gothic-code pre").text( $("#century-gothic-css").text() );
	$("#font-century-gothic .panel-heading > h3").css("font-family", "century-gothic");
	$("#font-century-gothic .sample-text").css("font-family", "century-gothic");

	$("#fiddums-code > pre").text( $("#font-fiddums-family-css").text() );
	$("#font-fiddums-family .panel-heading > h3").css("font-family", "fiddums-family");
	$("#font-fiddums-family .sample-text").css("font-family", "fiddums-family");

	$("#french-script-code > pre").text( $("#french-script-code-css").text() );
	$("#font-french-script-mt .panel-heading > h3").css("font-family", "french-script-mt");
	$("#font-french-script-mt .sample-text").css("font-family", "french-script-mt");

	$("#impact-code > pre").text( $("#impact-css").text() );
	$("#font-impact .panel-heading > h3").css("font-family", "Impact");
	$("#font-impact .sample-text").css("font-family", "Impact");

	$("#victorian-code pre").text( $("#victorian-css").text() );
	
});//end ready

console.log(_vars);

function addFont( _font ){

	if( !_font["panel_id"] || _font["panel_id"].length === 0){
console.log("error, need parameter 'panel_id'.... ");
		return false;
	}
	
//console.log ( typeof $(_font["panel_id"]).attr("id") );
	var test = $(_font["panel_id"]).attr("id");
	if( !test ){
console.log("error, not find block fo ID " + _font["panel_id"] );
		return false;
	}
	var $block = $(_font["panel_id"]);
	
	$block.find( ".panel-heading > h3").text( _font["font_name"] );
	$block.find( ".panel-heading > h3").css("font-family", _font["font_family"] );

	var _sample_text = _vars["sample_text"];
	if( _font["sample_text"] ){
		_sample_text = _font["sample_text"];
	}
	$block.find( ".sample-text").css("font-family", _font["font_family"] );
	$block.find( ".sample-text").html( _sample_text );

	$block.find(".download-link").attr( "href", _font["download_link"] );
	// if( _vars["sitename"] ){
		// $(".download-link").each(function(){
	// //console.log( $(this) );	
			// var url = _vars["sitename"] + "/" + $(this).attr("href");
	// //console.log( url );	
			// $(this).attr("href", url);
		// });
	// }	

	var _code = _font["css_code"]();
	var newStyle = document.createElement('style');
	//var newStyleText = document.createTextNode("body{ background-color : orange !important}");
	var newStyleText = document.createTextNode( _code ); 
	newStyle.appendChild( newStyleText );
	document.head.appendChild( newStyle );

	$( _font["view_code"]).html( 
	_code
	.replace(/;/g, ";<br/>")
	.replace(/,/g, ",<br/>")
	.replace(/\t/g, "&nbsp;&nbsp;") 
	);
	
}//end addFont()
