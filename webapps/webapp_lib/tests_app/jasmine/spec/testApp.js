function _log( msg, id){
//console.log(arguments);
//alert(arguments.length);
//		for( var n = 0; n < arguments.length; n++){
//			var _s = "<li> arguments." + n +" = "+ arguments[n] + "</li>";
//alert( _s );
//		}
	var id = id || arguments[1];//IE4 fix
//alert( msg );
//alert( id );

	if(!id){
		var id = "log";
	}
	
	var output = getById(id);
	if( output ){	
		if( msg.length == 0){
			output.innerHTML = "";
		} else {
			output.innerHTML += msg;
		}
		
	} else {
		console.log(msg);
		//alert(msg);
		//document.writeln(msg);
	}
	
	if( typeof _showHiddenLog === "function"){
//console.log(_showHiddenLog);
		_showHiddenLog();
	}
	
}//end _log()

function getById(id){
	
	if( document.querySelector ){
		var obj = document.querySelector("#"+id);
		return obj;
	}
	
	if( document.getElementById ){
		var obj = document.getElementById(id);
		return obj;
	}
	
	if( document.all ){
		var obj = document.all[id];
		return obj;
	}
	
	//if( document.layers ){
		//var obj = document.layers[id];
		//return obj;
	//}
	
	return false;
}//end getById()


//**************************************
//musFM.html?dirname=/music/A&pls=/music/0_playlists/russian.json
//$_GET = parseGetParams(); 
//or 
//$_GET = parseGetParams("?test=1"); 
//console.log( $_GET);
//**************************************
function parseGetParams( parseStr ) { 
//console.log(parseStr);
//console.log(window.location);

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		p = parseStr.split("?");
	//console.log(p);
		parseStr = p["1"];
		var parse_url = parseStr.split("&"); 
	}
	
	var $_GET = {}; 
	for(var n = 0; n < parse_url.length; n++) { 
	var getVar = parse_url[n].split("="); 
		//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
		if( typeof(getVar[1])=="undefined" ){
			$_GET[ getVar[0] ] = "";
		} else {
		 $_GET[ getVar[0] ] = getVar[1];
		}
	}//next
	return $_GET; 
}//end parseGetParams() 

if( typeof window.jQuery === "function"){
var msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
_log(msg);

	$(document).ready(function(){
		
		
	});//end ready	

}
//==================================

//console.log( jasmine );
//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "../";
jasmine.getFixtures().fixturesPath = "html";
//webApp.vars["data_url"] = "../db/bookmarks.json";


describe("test application", function(){
	
	beforeAll(function(){
console.log("beforeAll", arguments);
		loadFixtures("test.index.html");
		// spyOn( webApp.iDBmodule, "getRecords" ).and.callFake( function(){
// console.log("test method .getRecords(), fake call", arguments);
		// });
		
		//Start webApp
		var config = {
			"dbName" : "db1",
			"storage_key" : "lib_xml",
			"xml_file" : "db/export_lib.xml",
			//"xml_file : "db/test.xml",
			"tpl_file" : "tpl/templates.html",

			//"content_location" : "file:///mnt/terra/clouds/0_data",
			"content_location" : "http://site-content",

			//"url_lib_location_dropbox" : "https://dl.dropboxusercontent.com/u/75717183",
			"url_book_location_Mail" : "https://cloclo20.datacloudmail.ru/weblink/view/JSDm/zciANxB6p",
			"url_book_location_Yandex" : "https://docviewer.yandex.ru/?url=ya-disk:///disk/dont_sync",
			"use_localcache" : true,
			"addCopyLink": true
		};
		var lib = Lib(config);
console.log("lib:", lib);

	});

	beforeEach(function(){
console.log("beforeEach", arguments);
	});
	
	afterEach(function(){
console.log("afterEach", arguments);
	});
	
	it("test1, creating lib object", function(){
		var test1 = typeof Lib === "function";
console.log( "Lib: " + typeof Lib, test1 );	

		var test2 = typeof lib === "object";
console.log( "lib: " + typeof lib, test2 );	

		var res = test1 && test2;
console.log( "test result: ", res );	
		
		expect( res ).toBe(true);
	});//end it

});//end describe
