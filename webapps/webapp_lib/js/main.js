var lib;
var info = [];

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
	lib = Lib({
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
"runtime" : []
	});
	
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
