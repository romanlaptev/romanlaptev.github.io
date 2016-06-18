var lib;
var info = [];

//console.log for old IE
if(!window.console){
	console = {
		log : function(message){
			alert(message);
			//document.getElementById("log").innerHTML += message;
		}
	}
}

//config
var config = [];
config["storage_key"] = "lib_xml";
config["xml_file"] = "db/export_lib.xml";
//config["xml_file"] = "db/test.xml";
config["tpl_file"] = "tpl/templates.html";
config["content_location"] = "file:///mnt/terra/clouds/0_data";
config["url_lib_location_dropbox"] = "https://dl.dropboxusercontent.com/u/75717183";
config["use_localcache"] = true;
config["runtime"] = [];

if (navigator.userAgent.indexOf ('Windows')!= -1) {
	config["content_location"] = "file:///F:/clouds/0_data";
}
//console.log(config);

/* для Mozilla/Firefox/Opera 9 */
if (document.addEventListener) {
	
	document.addEventListener("DOMContentLoaded", function(){
console.log("DOMContentLoaded");
		//init_webapp()
	},false);//end dom load
	
}

function init_webapp(){
console.log("init_webapp()");
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
		get_xml( config["xml_file"] );
	}
}//end init_webapp()

$(document).ready(function(){
console.log("document ready");
	$('#ajaxBusy').hide();//?????
	$("#info").hide();

	$(document).ajaxStart(
		function() { 
			$('#ajaxBusy').show(); 
		}
	).ajaxStop(
		function() { 
			$('#ajaxBusy').hide();
		}
	);
	
//	$("#info-panel-view").click(function(){
//		view_log( info );
//		return false;
//	});//end event
	
	$("#info-panel-clear").click(function(){
		info = [];
delete lib.xml_obj;
		$("#info .message").empty();
		//$(this).hide();
		return false;
	});//end event
	
});//end ready


window.onload = function(){
console.log("window event onload");
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

/*
console.log("window.addEventListener:" + window.addEventListener);
console.log("window.attachEvent:" + window.attachEvent);
if ( window.addEventListener ) {
	
	window.addEventListener("load", function(e) {
console.log("window.addEventListener, event load");
	}, false);
	
} else {
	
	if (window.attachEvent)	{
		window.attachEvent("onload", function(){
console.log("window.attachEvent, event onload");
		});
	}
};
*/

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


//let's start
function get_xml(){
	
	if ( config["use_localcache"] ) {
		get_xml_from_storage();
	} else {
		var params = {
			filename : config["xml_file"],
			callback: after_load
		};
		load_xml( params );
	}
	
	function load_xml( params ) {
		var exec_start = new Date();
		$.ajax({
			type: "GET",
			url: params["filename"],
			dataType: "text",
			//dataType: "xml",
			complete: function(xhr, state){
//console.log("ajax load complete, ", arguments);
				var exec_end = new Date();
				var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
				config["runtime"]["ajax_load"] = [];
				config["runtime"]["ajax_load"]["time"] = runtime_s;
				var log = "<br>ajax load " + params["filename"] + " complete";
				log += ", runtime: <b>" + runtime_s + "</b> sec";
				log += ", <b>state</b>: " + state;
				info.push(log);
			},
			success: function( data ){
//console.log( "success", arguments );
				//var message = "<br>Successful download " + params["filename"];
				//info.push(message);
				params.callback( data );	
			},
			error: function( data, status, errorThrown ){
//console.log( "error", arguments );
				var message = "<br>error ajax load " + params["filename"];
				//message += ", status: " + status;
				message += ", " + errorThrown;
				info.push(message);
//console.log( message );
			}
		});
	}//end load_xml();
	
	function after_load( xml ) {
		lib = Lib( xml );
//console.log(lib);
	}//end after_load()

	function get_xml_from_storage() {
		var exec_start = new Date();
		localforage.keys(function(err, keys) {//test in array of keys
			var j_keys = keys.join();
			var pos = j_keys.indexOf( config["storage_key"] );
			if( pos >= 0){
				localforage.getItem( config["storage_key"], function(err, readValue) {
//console.log('Read: ', config["storage_key"], readValue.length);
//console.log(err);
					var exec_end = new Date();
					var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
				
					var cache_size = readValue.length; 
					var cache_size_kb = cache_size / 1024 ;
					var cache_size_mb = cache_size_kb / 1024;
					
					var log = "<br>get storage element " + config["storage_key"];
					log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
					log += ", runtime: <b>" + runtime_s + "</b> sec";
					log += ", error: " + err;
					info.push(log);
					config["runtime"]["get_storage"] = [];
					config["runtime"]["get_storage"]["time"] = runtime_s;
					
					//params.callback( readValue, true, log );	
					after_load( readValue);
				 });
			} else {
				var params = {
					filename : config["xml_file"],
					callback: put_to_storage
				};
				load_xml( params );
			}
		});
	}//end get_xml_from_storage()

	function put_to_storage( xml ) {
		var exec_start = new Date();
		localforage.setItem( config["storage_key"], xml, function(err, v) {
//console.log('function put_to_storage, saved in cache ' + config["storage_key"]);
//console.log(err);
			var exec_end = new Date();
			var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;

			var cache_size = xml.length; 
			var cache_size_kb = cache_size / 1024 ;
			var cache_size_mb = cache_size_kb / 1024;
			var log = "<br>save in cache element " + config["storage_key"];
			log += ", size: <b>"+ cache_size_kb.toFixed(2) +"</b> Kbytes, <b>"+ cache_size_mb.toFixed(2) +"</b> Mbytes";
			log += ", runtime: <b>" + runtime_s + "</b> sec";
			//var status = true;
			if( err !== null){
				log = "<br>error, no save " + config["storage_key"] + ", " + err;
				//status = false;
			}
			info.push(log);
			config["runtime"]["put_storage"] = [];
			config["runtime"]["put_storage"]["time"] = runtime_s;
			
			//params.callback( key, status, log );	
			after_load( xml );
		});
	}//end put_to_storage();
	
}//end get_xml()