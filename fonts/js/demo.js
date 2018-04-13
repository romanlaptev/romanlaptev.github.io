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
		"download_link" : "fonts/A/AGREVC/AGREVC.zip"
	},//end font
	
	{
		"font_name" : "Impact",
		"font_family" : "Impact",
		"panel_id" : "#font-impact",
		"view_code" : "#impact-code",
		"css_code" : function(){
			var _code = "@font-face {\
font-family:Impact;\
src: url('#FONTSITEfonts/impact_font/impact.eot'); /* EOT file for IE */\
src: url('#FONTSITEfonts/impact_font/impact.eot?#iefix') format('embedded-opentype'),\
		url('#FONTSITEfonts/impact_font/impact.woff2') format('woff2'),\
		url('#FONTSITEfonts/impact_font/impact.woff') format('woff'),\
		url('#FONTSITEfonts/impact_font/impact.ttf')  format('truetype'),\
		url('#FONTSITEfonts/impact_font/impact.svg')  format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/I/impact/impact_font.zip"
	},//end font

	{
		"font_name" : "Century Gothic",
		"font_family" : "century-gothic",
		"panel_id" : "#font-century-gothic",
		"view_code" : "#century-gothic-code",
		"css_code" : function(){
			var _code = "@font-face {\
font-family:century-gothic;\
src: url('#FONTSITEfonts/gothic_font/GOTHIC.eot'); /* EOT file for IE8 */\
src: url('#FONTSITEfonts/gothic_font/GOTHIC.eot?#iefix') format('embedded-opentype'),\
		url('#FONTSITEfonts/gothic_font/GOTHIC.woff2') format('woff2'),\
		url('#FONTSITEfonts/gothic_font/GOTHIC.woff') format('woff'),\
		url('#FONTSITEfonts/gothic_font/GOTHIC.ttf')  format('truetype'),\
		url('#FONTSITEfonts/gothic_font/GOTHIC.svg')  format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/gothic_font/gothic_font.zip"
	},//end font
	
	{
		"font_name" : "Fiddums-family (Addams family film)",
		"font_family" : "fiddums-family",
		"panel_id" : "#font-fiddums-family",
		"view_code" : "#fiddums-code",
		"css_code" : function(){
			var _code = "@font-face {\
font-family: fiddums-family;\
src: url('#FONTSITEfonts/fiddums-family/fiddums-family.eot'); /* EOT file for IE8 */\
src: url('#FONTSITEfonts/fiddums-family/fiddums-family.eot?#iefix') format('embedded-opentype'), /* EOT file for IE */\
		url('#FONTSITEfonts/fiddums-family/fiddums-family.woff2') format('woff2'),\
		url('#FONTSITEfonts/fiddums-family/fiddums-family.woff') format('woff'),\
		url('#FONTSITEfonts/fiddums-family/fiddums-family.ttf')  format('truetype'),\
		url('#FONTSITEfonts/fiddums-family/fiddums-family.svg')  format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/fiddums-family/fiddums-family-font.zip"
	},//end font

	
	{
		"font_name" : "French Script MT",
		"font_family" : "french-script-mt",
		"panel_id" : "#font-french-script-mt",
		"view_code" : "#french-script-code",
		"css_code" : function(){
			var _code = "@font-face {\
	font-family: french-script-mt;\
	src: url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.eot');\
	src: url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.eot') format('embedded-opentype'),\
		 url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.woff2') format('woff2'),\
		 url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.woff') format('woff'),\
		 url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.ttf') format('truetype'),\
		 url('#FONTSITEfonts/FRSCRIPT/FRSCRIPT.svg#FRSCRIPT') format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/FRSCRIPT/FRSCRIPT.zip"
	},//end font

	{
		"font_name" : "Victorian LET Regular",
		"font_family" : "victorian-let-regular",
		"panel_id" : "#font-victorian-let-regular",
		"view_code" : "#victorian-code",
		"css_code" : function(){
			var _code = "@font-face {\
font-family:victorian-let-regular;\
src: url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.eot');/* EOT file for IE8 */\
src: url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.eot?#iefix') format('embedded-opentype'), /* EOT file for IE */\
		url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.woff2') format('woff2'),\
		url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.woff') format('woff'),\
		url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.ttf')  format('truetype'),\
		url('#FONTSITEfonts/V/Victorian_LET/victorian-let-regular.svg')  format('svg');\
}";
			if( !_vars["sitename"] ){
				_code = _code.replace(/#FONTSITE/g, "");
			} else {
				_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/V/Victorian_LET/Victorian_LET.zip"
	},//end font
	
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
	addFont( _vars["fonts"][1] );
	addFont( _vars["fonts"][2] );
	addFont( _vars["fonts"][3] );
	addFont( _vars["fonts"][4] );
	addFont( _vars["fonts"][5] );
	
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
	
	//create CSS style and add to page head
	if( !_font["css_code"] ){
console.log("error, not find 'css_code' ");
		return false;
	}
	
	if( typeof _font["css_code"] === "string"){
		var _code = _font["css_code"];
	} 
	if( typeof _font["css_code"] === "function"){
		var _code = _font["css_code"]();
	} else {
console.log("error, wrong type 'css_code': " + typeof _font["css_code"]);
		return false;
	}
	
	var newStyle = document.createElement('style');
	//var newStyleText = document.createTextNode("body{ background-color : orange !important}");
	var newStyleText = document.createTextNode( _code ); 
	newStyle.appendChild( newStyleText );
	document.head.appendChild( newStyle );
	
	//apply font to panel header and sample text
	$block.find( ".panel-heading > h3").text( _font["font_name"] );
	$block.find( ".panel-heading > h3").css("font-family", _font["font_family"] );

	var _sample_text = _vars["sample_text"];
	if( _font["sample_text"] ){
		_sample_text = _font["sample_text"];
	}
	$block.find( ".sample-text").css("font-family", _font["font_family"] );
	$block.find( ".sample-text").html( _sample_text );

	//add download link
	$block.find(".download-link").attr( "href", _font["download_link"] );
	if( _vars["sitename"] ){
		var url = _vars["sitename"] + "/" + $block.find(".download-link").attr("href");
//console.log( url );	
		$block.find(".download-link").attr("href", url);
	}	

	//add sample of CSS code 
	var test = $( _font["view_code"] ).attr("id");
	if( test ){
		var $blockCode = $( _font["view_code"] );
		$blockCode.html( 
		_code
		.replace(/;/g, ";<br/>")
		.replace(/,/g, ",<br/>")
		.replace(/\t/g, "&nbsp;&nbsp;") 
		);
	}
	
}//end addFont()
