_vars = [];
_vars["sitename"] = "http://graphic-art-collection.16mb.com";
//_vars["sitename"] = "http://comp";
_vars["fonts"] = [
	{
		"font_name" : "AGRevueCyr Roman Medium",
		"font_family" : "AGRevueCyr",
		"panel_id" : "#font-AGRevueCyr",
		"view_code" : "#agrevc-code",
/*		
		"css_code" : "@font-face { font-family: 'AGRevueCyr';\
src: url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.eot');\
src: url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.eot') format('embedded-opentype'),\
	url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.woff2') format('woff2'),\
	url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.woff') format('woff'),\
	url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.ttf') format('truetype'),\
	url('http://graphic-art-collection.16mb.com/fonts/A/AGREVC/AGREVC.svg#AGREVC') format('svg');\
}",
*/
		"css_code" : function(){
			//var _code = "body{ background-color : orange !important}";
			var _code = "@font-face { font-family: 'AGRevueCyr';\
src: url('#FONTSITEfonts/A/AGREVC/AGREVC.eot');\
src: url('#FONTSITEfonts/A/AGREVC/AGREVC.eot') format('embedded-opentype'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.woff2') format('woff2'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.woff') format('woff'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.ttf') format('truetype'),\
	url('#FONTSITEfonts/A/AGREVC/AGREVC.svg#AGREVC') format('svg');\
}";
			_code = _code.replace(/#FONTSITE/g, "");
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
var _font = _vars["fonts"][0];

$( _font["panel_id"] + " .panel-heading > h3").text( _font["font_name"] );
$( _font["panel_id"] + " .panel-heading > h3").css("font-family", _font["font_family"] );

var _sample_text = _vars["sample_text"];
if( _font["sample_text"] ){
	_sample_text = _font["sample_text"];
}
$( _font["panel_id"] + " .sample-text").css("font-family", _font["font_family"] );
$( _font["panel_id"] + " .sample-text").html( _sample_text );

$( _font["panel_id"] + " .download-link").attr( "href", _font["download_link"] );

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
//------------------

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

if( _vars["sitename"] ){
	$(".download-link").each(function(){
//console.log( $(this) );	
		var url = _vars["sitename"] + "/" + $(this).attr("href");
//console.log( url );	
		$(this).attr("href", url);
	});
}	
	
});//end ready

console.log(_vars);