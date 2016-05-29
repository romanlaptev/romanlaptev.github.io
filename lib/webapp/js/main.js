var storage_key = "lib_xml";
var lib;
var info = [];

//config
var config = [];
config["xml_file"] = "xml/export_lib.xml";
config["tpl_file"] = "tpl/templates.html";
config["content_location"] = "file:///mnt/terra/clouds/0_data";
config["url_lib_location_dropbox"] = "https://dl.dropboxusercontent.com/u/75717183";

if (navigator.userAgent.indexOf ('Windows')!= -1) 
{
	config["content_location"] = "file:///F:/clouds/0_data";
}
//console.log(config);


window.onload = function(){
	//var test = document.getElementById("test_template").innerHTML;
//console.log(test);
//for(var item in test){
//console.log(item +": "+test[item]);
//}

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
	}//end event

};//end window.load	

$(document).ready(function(){
	$('#ajaxBusy').hide();
	$("#info").hide();


	$(document).ajaxStart(
		function(){ 
			$('#ajaxBusy').show(); 
		}
	).ajaxStop(
		function()
		{ 
			$('#ajaxBusy').hide();
		}
	);
	
	$("#info-panel-view").click(function(){
		view_log( info );
		return false;
	});//end event
	
	$("#info-panel-clear").click(function(){
		info = [];
delete lib.xml_obj;
		$("#info .message").empty();
		$(this).hide();
		return false;
	});//end event

	
});//end ready


window.addEventListener("load", function()
{
console.log(" event load");
});//end event load

function view_log( log )
{
//console.log( log );
	$("#info").show();
	//$("#info .message").empty();
	$("#info .message").html( log );
	
	setTimeout(function() {
		$("#info").hide();
	}, 10*1000); 
}
	
var init = function(){
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
	
};//end _init()

var test_db = function(){
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


function get_xml(){
	var test = test_db();
//console.log(test);

	if ( !test["localStorage"] &&
			!test["WebSQL"] &&
				!test["indexedDB"])
	{
alert( "error, no support web-storages" );
		var params = {
			filename : config["xml_file"],
			callback: after_load
		};
		load_xml( params );
	} else {
		get_xml_from_storage();
	}
	
	function load_xml( params )
	{
		$.ajax({
			type: "GET",
			url: params["filename"],
			dataType: "text",
			success: function( data ){
				var message = "<br>Successful download " + params["filename"];
//console.log( message );
				info.push(message);
				params.callback( data );	
			},
			error: function( data, status, errorThrown ){
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
			}
		});
	}//end load_xml();
	
	function after_load( xml )
	{
		lib = Lib( xml );
//console.log(lib);
	}//end after_load()

	function get_xml_from_storage(){
		var exec_start = new Date();
		localforage.keys(function(err, keys) {//test in array of keys
			var j_keys = keys.join();
			var pos = j_keys.indexOf( storage_key );
			if( pos >= 0){
				localforage.getItem( storage_key, function(err, readValue) {
//console.log('Read: ', storage_key, readValue.length);
//console.log(err);
					var exec_end = new Date();
					var runtime_s = (exec_end.getTime() - exec_start.getTime()) / 1000;
				
					var cache_size = readValue.length; 
					var cache_size_kb = cache_size / 1024 ;
					var cache_size_mb = cache_size_kb / 1024;
					
					var log = "<br>get cache element " + storage_key + ", <b>size</b>: "+ cache_size_kb.toFixed(2) +" Kbytes, "+ cache_size_mb.toFixed(2) +" Mbytes";
					log += ", <b>runtime</b>: " + runtime_s + " <b>sec</b>";
					log += ", error: " + err;
					info.push(log);
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

	function put_to_storage( xml )
	{
		localforage.setItem( storage_key, xml, function(err, v) {
//console.log('function put_to_storage, saved in cache ' + storage_key);
//console.log(err);
			
			var cache_size = xml.length; 
			var cache_size_kb = cache_size / 1024 ;
			var cache_size_mb = cache_size_kb / 1024;
			var log = "<br>save in cache element " + storage_key + ", <b>size</b>: "+ cache_size_kb.toFixed(2) +" Kbytes, "+ cache_size_mb.toFixed(2) +" Mbytes";
			//var status = true;
			if( err !== null){
				log = "<br>error, no save " + storage_key + ", " + err;
				//status = false;
			}
			info.push(log);
			
			//params.callback( key, status, log );	
			after_load( xml );
		});
	}//end put_to_storage();
	
}//end get_xml()


//let's start
init();
get_xml( config["xml_file"] );