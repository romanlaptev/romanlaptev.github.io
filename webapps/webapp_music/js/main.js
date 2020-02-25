var func = sharedFunc();
//console.log("func:", func);

var _vars = {
	"logMsg": "",
	start_scroll_pos:0,
	end_scroll_pos:0//,
};
//console.log( _vars );

/*
document.onreadystatechange = function(e){
console.log(e);
//console.log("eventPhase:" + e.eventPhase);
console.log("--- document.readyState = " + document.readyState, typeof document.readyState);
	if (document.readyState == "interactive") {
		initApplication();
	}
}
*/

if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function(){////DOM ready, but not load images
//console.log("DOMContentLoaded");
//console.log("-- document.readyState = " + document.readyState);
		initApplication();
	},false);//end dom load
}

window.onload = function(){
//console.log("window.onload");
//console.log("-- document.readyState = " + document.readyState);
	//Start webApp
	if( typeof webApp === "object"){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize
	}
}//end load()


if( typeof window.jQuery === "function"){
	$(document).ready(function(){
//console.log( "jQuery: document.ready" );
//console.log("-- document.readyState = " + document.readyState);
		_initPage();
	});//end ready()
	
	$(window).scroll( function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );
		if ( $(this).scrollTop() > _vars.start_scroll_pos  ) {
			$("#btn-scroll-to-top").show();
		} 

		if ( $(this).scrollTop() < _vars.end_scroll_pos ) {
			$("#btn-scroll-to-top").hide();
		}
	});//end scroll
	
}



function initApplication(){
	_vars.logMsg = navigator.userAgent;
	func.logAlert( _vars.logMsg, "info");

//===============================
/*
	_vars["logPanel"] = func.getById("log");
	func.addEvent( 
		func.getById("btn-clear-log"), 
		"click", 
		function(event){
//console.log( event.type );
			event = event || window.event;
			var target = event.target || event.srcElement;
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			_vars.logPanel.innerHTML = "";
		}
	);//end event
*/

/*
//------------------------ Image load error
	_vars.blockNodeList = document.querySelector("#block-nodelist");
//console.log(_vars);	
	var images = _vars.blockNodeList.getElementsByTagName("img");
//console.log( "images =  " + images.length);
//console.log( "images.onerror =  "+ typeof images[0].onerror);

//if( typeof images[0].onerror !== "object"){
//console.log( "error, 'images.onerror' callback not supported...");
//} else {

	for( var n = 0; n < images.length; n++){
		//if( images[n].clientHeight === 0 ){
//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
//console.log( "img load error: ", images[n].getAttribute("src") );	
			images[n].onerror = function(e){
_vars["logMsg"] = "error, image not load: <small><b>" + e.target["src"] + "</b></small>";
_vars["logMsg"] += ", waiting time: " + e["timeStamp"] / 1000 + " sec";
//func.log("<div class='alert alert-danger'>" + webApp.vars["logMsg"] + "</div>");
//console.log( _vars["logMsg"] );
//console.log(e.target.parentNode);				
				var _blockImages = e.target.parentNode;
				_blockImages.innerHTML = "<div class='uk-alert uk-alert-danger'>"+_vars["logMsg"] +"</div>";
			}

			images[n].onload = function(e){
//console.log(e);
				var _blockImages = e.target.parentNode;
				_blockImages.style.background = "transparent";
			}
			
		//};
	};//next
//}
//------------------------
*/
}//end initApplication()


function _initPage(){
	
//--------------------- Scroll
	//Detect top position for scroll block
	_vars.start_scroll_pos = $("#main").offset().top + 100;
	_vars.end_scroll_pos = _vars.start_scroll_pos - 20;
	
	$("#btn-scroll-to-top").hide();
	$(".scroll-to").addClass("nolink").on("click", function(){
		if($(this).attr("href")){
			var id = $(this).attr("href");
		} else {
			var id = "#" + $(this).attr("data-target");
		}
//console.log("id: " , id);

		//$('body').scrollTo( elem, 800, {offset: -50});//need jquery.scrollTo-1.4.3.1-min.js!!!!

		var start_scroll_pos = $(id).offset().top;// Get  start position for scroll block
		 start_scroll_pos = start_scroll_pos - 100;// minus height, padding #top block
//console.log("start_scroll_pos: " , start_scroll_pos);

		$('html,body').animate({
			scrollTop: start_scroll_pos
			}, 500);
		return false;
	});//end event
	//---------------------

		// document.forms["formSearch"].onsubmit = function(event){
			
			// event = event || window.event;
			// var target = event.target || event.srcElement;
			
			// if (event.preventDefault) { 
				// event.preventDefault();
			// } else {
				// event.returnValue = false;
			// }
// console.log("Submit form", event, this);
			// var form = document.forms["formSearch"]
// console.log(form);
// //console.log(form.elements.targetField, form.elements.targetField.length);
// //console.log(form.elements.keyword.value);

		// };//end event
//console.log( document.forms["formSearch"] );
	
}//_initPage()