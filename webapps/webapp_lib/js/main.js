//var lib;

//if (navigator.userAgent.indexOf ('Windows')!= -1) {
	//config["content_location"] = "file:///F:/clouds/0_data";
//}

//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
		var func = sharedFunc();
console.log("func:", func);

var config = {
"dbName" : "db1",
"storage_key" : "lib_xml",
"xml_file" : "db/export_lib.xml",
//"xml_file : "db/test.xml",
//"tpl_file" : "tpl/templates.html",

//"content_location" : "file:///mnt/terra/clouds/0_data",
"content_location" : "http://site-content",

//"url_lib_location_dropbox" : "https://dl.dropboxusercontent.com/u/75717183",
"url_book_location_Mail" : "https://cloclo20.datacloudmail.ru/weblink/view/JSDm/zciANxB6p",
"url_book_location_Yandex" : "https://docviewer.yandex.ru/?url=ya-disk:///disk/dont_sync",

//https://www.dropbox.com/sh/pdyhl1yyagqvbrv/AAD_yLVLU2XZXf0rdV_MAAuVa/lib/books/B?dl=0&preview=B_fantasy_boiler.txt&subfolder_nav_tracking=1
//"url_Dropbox" : "https://www.dropbox.com/sh/pdyhl1yyagqvbrv/AAD_yLVLU2XZXf0rdV_MAAuVa",
//"url_DropboxPreview" : "?dl=0&preview=",
//https://www.dropbox.com/sh/pdyhl1yyagqvbrv/AAD_yLVLU2XZXf0rdV_MAAuVa/lib/books/B/Begbeder.F?dl=0&preview=B_prose_99franks.txt
//https://www.dropbox.com/sh/pdyhl1yyagqvbrv/AACOO8GxThqW4XfJc6Bgh5MAa/lib/books/B/Begbeder.F?dl=0&preview=B_prose_99franks.txt&subfolder_nav_tracking=1

"use_localcache" : true,
"addCopyLink": true,
"localforagePath": "js/vendor/localforage.min.js",
"clipboardPath": "js/vendor/clipboard.min.js"				
};
console.log("config:", config);

function init_webapp(){
console.log("init_webapp()");


//console.log("typeof window.jQuery: " + typeof window.jQuery);
	if( typeof window.jQuery === "function"){
		//lib = Lib(config);
		var lib = Lib();
console.log("lib:", lib);
		lib.runApp(config);
/*		
//============================ test modal

	var waitWindow = getById("win1");
	if( waitWindow ){
		waitWindow.style.display="block";
	}

		lib.vars["loadProgressBar"] = getById("load-progress-bar");
		//lib.vars["numTotalLoad"] = getById("num-total-load");
		lib.vars["parseProgressBar"] = getById("parse-progress-bar");
		
		var percentComplete = 20;
		
		lib.vars["loadProgressBar"].className = "progress-bar";
		lib.vars["loadProgressBar"].style.width = percentComplete+"%";
		lib.vars["loadProgressBar"].innerHTML = percentComplete+"%";
							
		//lib.vars["numTotalLoad"].innerHTML = ((e.total / 1024) / 1024).toFixed(2)  + " Mb";
		
		var _percentComplete = 30;
		lib.vars["parseProgressBar"].className = "progress-bar";
		//lib.vars["parseProgressBar"].style.width = _percentComplete+"%";
		//lib.vars["parseProgressBar"].innerHTML = _percentComplete+"%";
		$(lib.vars["parseProgressBar"]).width( _percentComplete+"%");
		$(lib.vars["parseProgressBar"]).html( _percentComplete+"%");

	setTimeout(function(){
		//hide block overlay and wait window
		if( waitWindow ){
			waitWindow.style.display="none";
		}
	}, 1000*10);

//---------------------------
*/		
	}
	
}//end init_webapp()

function _searchNodeType( id, value ){
//console.log( id, value );	

	var input = func.getById( id );
//console.log( input );	

	if(input){
		input.value = value;	
	} else {
console.log("error!!! ", input);		
	}
	
	$("#tab-search input[type=radio]").each(function(num, element){
//console.log(num, element);
		$(element).prop("checked", false);
	});//next
	$("#radio-node-type").prop("checked", true);
	
}//end _searchNodeType()

$(document).ready(function(){
//console.log("document ready");

	$("#service-panel").hide();
	
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
			//$("#service-panel").show();
		//}
		if( e.keyCode === 27 ){//ESC
			//view_log( info );			
			$("#service-panel").toggle();
		}

	};//end event

		
};//end window.load
