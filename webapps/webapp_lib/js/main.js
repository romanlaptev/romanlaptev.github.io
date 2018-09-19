var lib;
var info = [];

//config
var config = [];
config["storage_key"] = "lib_xml";
config["xml_file"] = "db/export_lib.xml";
//config["xml_file"] = "db/test.xml";
config["tpl_file"] = "tpl/templates.html";

//config["content_location"] = "file:///mnt/terra/clouds/0_data";
config["content_location"] = "http://site-content";

//config["url_lib_location_dropbox"] = "https://dl.dropboxusercontent.com/u/75717183";
config["url_book_location_Mail"] = "https://cloclo20.datacloudmail.ru/weblink/view/JSDm/zciANxB6p";
config["url_book_location_Yandex"] = "https://docviewer.yandex.ru/?url=ya-disk:///disk/dont_sync";
config["use_localcache"] = false;
config["runtime"] = [];

//if (navigator.userAgent.indexOf ('Windows')!= -1) {
	//config["content_location"] = "file:///F:/clouds/0_data";
//}

//console.log(config);

function init_webapp(){
//console.log("init_webapp()");

//============================ test modal
/*	
	var waitWindow = getById("win1");
	if( waitWindow ){
		waitWindow.style.display="block";
	}

	setTimeout(function(){
		//hide block overlay and wait window
		if( waitWindow ){
			waitWindow.style.display="none";
		}
	}, 1000*3);
*/	
//---------------------------


	if ( config["use_localcache"] ) {
		//load localforage script
		var script = document.createElement('script');
		script.src = "js/vendor/localforage.min.js";
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() {
//console.log( "onload " + this.src);
//console.log( "localforage version: " + localforage._config.version );
			init_cache();
			get_xml( config["xml_file"] );
		};
		script.onerror = function(e) {
			alert( "error load script " + this.src);
		}; 
	} else {
		//get_xml( config["xml_file"] );
		lib = Lib();
console.log(lib);
	}
	
}//end init_webapp()

$(document).ready(function(){
//console.log("document ready");
	$("#info").hide();

	$("#info-panel-clear").click(function(){
		info = [];
delete lib.xml_obj;
		$("#info .message").empty();
		//$(this).hide();
		return false;
	});//end event
	
});//end ready


window.onload = function(){
//console.log("window event onload");
	//var test = document.getElementById("test_template").innerHTML;
//console.log(test);
//for(var item in test){
//console.log(item +": "+test[item]);
//}
	if ( config["use_localcache"] ) {
		document.getElementById("localforage-clear").onclick = function(){

			localforage.clear(function(err) {
	//console.log('Clear storage');
	//console.dir(err);

				//delete lib.xml_obj;
	//console.log(lib);			
				info = [];
				info.push("Clear storage, " + err +"<br>");
				view_log( info );
			});
		};//end event
	} else {
		document.getElementById("localforage-clear").style.display = "none";
	}	

	document.onkeydown = function(e) {
		e=e || window.event;
		//event_target = e.target || e.srcElement; //srcElement, for old IE
//for( var item in e){
	//alert( item +": "+e[item] );
//}		
//console.log( e.keyCode );
		//if( e.keyCode === 192 ){//`
			//view_log( info );
			//$("#info").show();
		//}
		if( e.keyCode === 27 ){//ESC
			view_log( info );			
			$("#info").toggle();
		}

	};//end event

		
};//end window.load	

function view_log( log ){
//console.log( log[0] );
	//$("#info .message").empty();
	$("#info .message").html( log );
	
//	setTimeout(function() {
//		$("#info").hide();
//	}, 10*1000); 
}


function init_cache() {
	localforage.config({
		driver: [localforage.INDEXEDDB,
				 localforage.WEBSQL,
				 localforage.LOCALSTORAGE],
		name: 'localforage'
		//name: 'webapp-store'
		//driver: [localforage.WEBSQL],
	});

	localforage.ready(function() {
//console.log('localForage ready');
//console.log('localforage.driver():', localforage.driver());
	});

	localforage.length(function(err, numberOfKeys) {
//console.log('length of the database - ' + numberOfKeys);
//console.dir(err);
	});
	
	var test = test_db();
//console.log(test);
	if ( !test["localStorage"] &&
			!test["WebSQL"] &&
				!test["indexedDB"])
	{
alert( "error, no support web-storages" );
		config["use_localcache"] = false;
	}

	//var test_db = function(){
	function test_db(){
		var test = {}

		test["localStorage"] = false;
		if( 'localStorage' in window && window['localStorage'] !== null ) {
			test["localStorage"] = true;
		} 

	//console.log ("openDatabase = " + typeof(openDatabase));
		test["WebSQL"] = false;
		if(window.openDatabase) {
			test["WebSQL"] = true;
		}

	//console.log ("indexedDB = " + typeof(indexedDB));
		test["indexedDB"] = false;
		if("indexedDB" in window) {
			test["indexedDB"] = true;
		}

		var message = navigator.userAgent + "<br>\n";

		if ( test["localStorage"] ) {
			message += "LocalStorage is available<br>\n";
		} else {
			message += "LocalStorage is not available<br>\n";
		}

		if ( test["WebSQL"] ){
			message += "Your browser supports WebSQL<br>\n";
		} else {
			message += "Your browser does not have support for WebSQL<br>\n";
		}

		if( test["indexedDB"] ) {
			message += "Your browser supports indexedDB.<br>\n";
		} else {
			message += "Your browser does not have support for indexedDB.<br>\n";
		}

		info.push(message);
		if( typeof window.console === "object"){
	//console.log( message );
		} else {
	alert( message );
		}

		return test;
	};//end _test()
	
};//end _init_cache()
