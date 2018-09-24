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
	lib = Lib();
console.log(lib);
	
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
				//delete lib.xml_obj;
	//console.log(lib);			
	
				//info = [];
				//info.push("Clear storage, " + err +"<br>");
				//view_log( info );
var logMsg = "Clear storage, error: " + err;
 _log("<div class='alert alert-info'>" + logMsg + "</div>");
console.log( logMsg );
				
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
