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
		"font_name" : "AvantGarde",
		"font_family" : "avantgarde",
		"panel_id" : "#font-avantgarde",
		"view_code" : "#avantgarde-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/A/AVANTGAR",
		"css_code" : function(){
			var _code = "\
@font-face { font-family: 'avantgarde';\
src: url('#FONTSITE{{PATH}}/AVANTGAR.eot');\
src: url('#FONTSITE{{PATH}}/AVANTGAR.eot') format('embedded-opentype'),\
	url('#FONTSITE{{PATH}}/AVANTGAR.woff2') format('woff2'),\
	url('#FONTSITE{{PATH}}/AVANTGAR.woff') format('woff'),\
	url('#FONTSITE{{PATH}}/AVANTGAR.ttf') format('truetype'),\
	url('#FONTSITE{{PATH}}/AVANTGAR.svg#AGREVC') format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/A/AVANTGAR/AVANTGAR.zip"
	},//end font

	{
		"font_name" : "Akbar Plain",
		"font_family" : "akbar-plain",
		"panel_id" : "#font-akbar-plain",
		"view_code" : "#akbar-plain-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/A/akbar_plain",
		"css_code" : function(){
			var _code = "\
@font-face { font-family: 'akbar-plain';\
src: url('#FONTSITE{{PATH}}/akbar_plain.eot');\
src: url('#FONTSITE{{PATH}}/akbar_plain.eot') format('embedded-opentype'),\
	url('#FONTSITE{{PATH}}/akbar_plain.woff2') format('woff2'),\
	url('#FONTSITE{{PATH}}/akbar_plain.woff') format('woff'),\
	url('#FONTSITE{{PATH}}/akbar_plain.ttf') format('truetype'),\
	url('#FONTSITE{{PATH}}/akbar_plain.svg#akbar_plain') format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/A/akbar_plain/akbar_plain.zip"
	},//end font

	{
		"font_name" : "Almanaque Normal",
		"font_family" : "almanaque_normal",
		"panel_id" : "#font-almanaque_normal",
		"view_code" : "#almanaque_normal-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/A/almanaque_normal",
		"css_code" : function(){
			var _code = "\
@font-face { font-family: 'almanaque_normal';\
src: url('#FONTSITE{{PATH}}/almanaque_normal.eot');\
src: url('#FONTSITE{{PATH}}/almanaque_normal.eot') format('embedded-opentype'),\
	url('#FONTSITE{{PATH}}/almanaque_normal.woff2') format('woff2'),\
	url('#FONTSITE{{PATH}}/almanaque_normal.woff') format('woff'),\
	url('#FONTSITE{{PATH}}/almanaque_normal.ttf') format('truetype'),\
	url('#FONTSITE{{PATH}}/almanaque_normal.svg#almanaque_normal') format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/A/almanaque_normal/almanaque_normal.zip"
	},//end font

	{
		"font_name" : "Alpha Mack AOE",
		"font_family" : "alphamackaoe",
		"panel_id" : "#font-alphamackaoe",
		"view_code" : "#alphamackaoe-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/A/alphamackaoe",
		"css_code" : function(){
			var _code = "\
@font-face { font-family: 'alphamackaoe';\
src: url('#FONTSITE{{PATH}}/alphamackaoe.eot');\
src: url('#FONTSITE{{PATH}}/alphamackaoe.eot') format('embedded-opentype'),\
	url('#FONTSITE{{PATH}}/alphamackaoe.woff2') format('woff2'),\
	url('#FONTSITE{{PATH}}/alphamackaoe.woff') format('woff'),\
	url('#FONTSITE{{PATH}}/alphamackaoe.ttf') format('truetype'),\
	url('#FONTSITE{{PATH}}/alphamackaoe.svg#alphamackaoe') format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/A/alphamackaoe/alphamackaoe.zip"
	},//end font

	{
		"font_name" : "Impact",
		"font_family" : "Impact",
		"panel_id" : "#font-impact",
		"view_code" : "#impact-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/I/impact_font",
		"css_code" : function(){
			var _code = "@font-face {\
font-family:Impact;\
src: url('#FONTSITE{{PATH}}/impact.eot'); /* EOT file for IE */\
src: url('#FONTSITE{{PATH}}/impact.eot?#iefix') format('embedded-opentype'),\
		url('#FONTSITE{{PATH}}/impact.woff2') format('woff2'),\
		url('#FONTSITE{{PATH}}/impact.woff') format('woff'),\
		url('#FONTSITE{{PATH}}/impact.ttf')  format('truetype'),\
		url('#FONTSITE{{PATH}}/impact.svg')  format('svg');\
}";
//console.log(this);
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
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
		//"fontsite" : "http://comp",
		//"path" : "fonts/gothic_font",
		"path" : "fonts/G/gothic_font",
		
		"css_code" : function(){
			var _code = "@font-face {\
font-family:century-gothic;\
src: url('#FONTSITE{{PATH}}/GOTHIC.eot'); /* EOT file for IE8 */\
src: url('#FONTSITE{{PATH}}/GOTHIC.eot?#iefix') format('embedded-opentype'),\
		url('#FONTSITE{{PATH}}/GOTHIC.woff2') format('woff2'),\
		url('#FONTSITE{{PATH}}/GOTHIC.woff') format('woff'),\
		url('#FONTSITE{{PATH}}/GOTHIC.ttf')  format('truetype'),\
		url('#FONTSITE{{PATH}}/GOTHIC.svg')  format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
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
		//"fontsite" : "http://comp",
		//"path" : "fonts/fiddums-family",
		"path" : "fonts/F/fiddums-family",
		"css_code" : function(){
			var _code = "@font-face {\
font-family: fiddums-family;\
src: url('#FONTSITE{{PATH}}/fiddums-family.eot'); /* EOT file for IE8 */\
src: url('#FONTSITE{{PATH}}/fiddums-family.eot?#iefix') format('embedded-opentype'), /* EOT file for IE */\
		url('#FONTSITE{{PATH}}/fiddums-family.woff2') format('woff2'),\
		url('#FONTSITE{{PATH}}/fiddums-family.woff') format('woff'),\
		url('#FONTSITE{{PATH}}/fiddums-family.ttf')  format('truetype'),\
		url('#FONTSITE{{PATH}}/fiddums-family.svg')  format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/F/fiddums-family/fiddums-family.zip"
	},//end font

	
	{
		"font_name" : "French Script MT",
		"font_family" : "french-script-mt",
		"panel_id" : "#font-french-script-mt",
		"view_code" : "#french-script-code",
		//"fontsite" : "http://comp",
		//"path" : "fonts/FRSCRIPT",
		"path" : "fonts/F/FRSCRIPT",
		"css_code" : function(){
			var _code = "@font-face {\
	font-family: french-script-mt;\
	src: url('#FONTSITE{{PATH}}/FRSCRIPT.eot');\
	src: url('#FONTSITE{{PATH}}/FRSCRIPT.eot') format('embedded-opentype'),\
		 url('#FONTSITE{{PATH}}/FRSCRIPT.woff2') format('woff2'),\
		 url('#FONTSITE{{PATH}}/FRSCRIPT.woff') format('woff'),\
		 url('#FONTSITE{{PATH}}/FRSCRIPT.ttf') format('truetype'),\
		 url('#FONTSITE{{PATH}}/FRSCRIPT.svg#FRSCRIPT') format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
			}
			return _code;
		},
		//"sample_text" : "This is a test!!!!",
		"download_link" : "fonts/F/FRSCRIPT/FRSCRIPT.zip"
	},//end font

	{
		"font_name" : "Victorian LET Regular",
		"font_family" : "victorian-let-regular",
		"panel_id" : "#font-victorian-let-regular",
		"view_code" : "#victorian-code",
		//"fontsite" : "http://comp",
		"path" : "fonts/V/Victorian_LET",
		"css_code" : function(){
			var _code = "@font-face {\
font-family:victorian-let-regular;\
src: url('#FONTSITE{{PATH}}/victorian-let-regular.eot');/* EOT file for IE8 */\
src: url('#FONTSITE{{PATH}}/victorian-let-regular.eot?#iefix') format('embedded-opentype'), /* EOT file for IE */\
		url('#FONTSITE{{PATH}}/victorian-let-regular.woff2') format('woff2'),\
		url('#FONTSITE{{PATH}}/victorian-let-regular.woff') format('woff'),\
		url('#FONTSITE{{PATH}}/victorian-let-regular.ttf')  format('truetype'),\
		url('#FONTSITE{{PATH}}/victorian-let-regular.svg')  format('svg');\
}";
			_code = _code.replace(/{{PATH}}/g, this.path);
			if( this.fontsite && this.fontsite.length > 0){
				_code = _code.replace(/#FONTSITE/g, this.fontsite + "/");
			} else {
				if( !_vars["sitename"] ){
					_code = _code.replace(/#FONTSITE/g, "");
				} else {
					_code = _code.replace(/#FONTSITE/g, _vars["sitename"] + "/");
				}
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

	//addFont( _vars["fonts"][0] );
	for( var n = 0; n < _vars["fonts"].length; n++){
		addFont( _vars["fonts"][n] );
	}//next
	
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
