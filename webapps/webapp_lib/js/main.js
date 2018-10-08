//var lib;

//if (navigator.userAgent.indexOf ('Windows')!= -1) {
	//config["content_location"] = "file:///F:/clouds/0_data";
//}

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
"addCopyLink": true,
"localforagePath": "js/vendor/localforage.min.js",
"clipboardPath": "js/vendor/clipboard.min.js"				
};
console.log("config:", config);

function init_webapp(){
console.log("init_webapp()");
console.log("module Lib:", typeof Lib, Lib);

//console.log("typeof window.jQuery: " + typeof window.jQuery);
	if( typeof window.jQuery === "function"){
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
		//lib = Lib(config);
		var lib = Lib();
console.log("lib:", lib);
		lib.runApp(config);
	}
	
}//end init_webapp()

$(document).ready(function(){
//console.log("document ready");

	$("#info").hide();
	
	$("#use-storage-switch").prop("checked", config["use_localcache"]);

	$(".switch-control").on("click", function(e){
		var state = $("#use-storage-switch").prop("checked");
		config["use_localcache"] = state;
//console.log(config["use_localcache"]);	
	});//end event


	//--------------------- Scroll
	//Detect top position for scroll block
	var start_scroll_pos = $("#App").offset().top + 100;
	var end_scroll_pos = start_scroll_pos - 20;

	//------------------------- scroll to top
	// $("#scroll-to-top").click(function(e) {
		// e.preventDefault;
		// $('html,body').animate({
			// scrollTop: 0
			// }, 500);
		// return false;
	// });
	
	$(".scroll-to").addClass("nolink").on("click", function(){
		if($(this).attr("href")){
			var id = $(this).attr("href");
		} else {
			var id = "#" + $(this).attr("data-target");
		}
//console.log("id: " , id);
		
		var start_scroll_pos = $(id).offset().top;
//console.log("start_scroll_pos: " , start_scroll_pos);

		$('html,body').animate({
			scrollTop: start_scroll_pos
			}, 500);
		return false;
	});

});//end ready

	$(window).scroll(function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );
		var start_scroll_pos = $("#App").offset().top + 100;
		var end_scroll_pos = start_scroll_pos - 20;

		if ( $(this).scrollTop() > start_scroll_pos  ) {
			$("#btn-scroll-to-top").show();
		} 

		if ( $(this).scrollTop() < end_scroll_pos ) {
			$("#btn-scroll-to-top").hide();
		}
	});//end scroll

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
			//view_log( info );			
			$("#info").toggle();
		}

	};//end event

		
};//end window.load
