var func = sharedFunc();
//console.log("func:", func);

var _vars = {
	"logMsg": "",
	//menuWidth : 270,//270px
	//duration : 600,
	//$offcanvas : null,
	//$offcanvasBar : null,
	//$offcanvasMenu : null,
	start_scroll_pos:0,
	end_scroll_pos:0//,
	//"imageNotLoad": "img/image_not_load.png"
};
console.log( _vars );

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
console.log("DOMContentLoaded");
console.log("-- document.readyState = " + document.readyState);
		initApplication();
	},false);//end dom load
}

window.onload = function(){
console.log("window.onload");
console.log("-- document.readyState = " + document.readyState);
	//Start webApp
	if( typeof webApp === "object"){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize
	}
}//end load()

if( typeof window.jQuery === "function"){
	$(document).ready(function(){
console.log( "jQuery: document.ready" );
console.log("-- document.readyState = " + document.readyState);
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
/*
	_vars.$offcanvas = $("#off-canvas2");
	_vars.$offcanvasBar = $("#off-canvas2 .my-offcanvas-bar");
	_vars.$offcanvasMenu = $("#off-canvas2 .uk-nav-offcanvas > li > a");
	_vars.$closeButtons = $("a[href='#close']");
	_vars.$modalButtons = $("a[href^='#modal']");
	_vars.$getTagGroups = $("a[href^='#get-tag-group']");
	_vars.$toggleContent = $(".toggle-content");
	_vars.$blockTags = $("#block-tags");
	$(".collapse").hide();
	
//--------------------------------- hide input type="range" if not support
//https://learn.javascript.ru/dom-polyfill
	var _testRangeType = $("#page-range").attr("type");
	//console.log( _testRangeType );
	if( _testRangeType !== "range"){
		$("#page-range").hide();
	}
	
//---------------------------------
	$("#btn-toggle-menu").on("click", function(e){
//console.log( e.type );
		//e.preventDefault();
		//return false;
		toggleMenu();
	});//end event
	
	$("#btn-close-menu").on("click", function(e){
		toggleMenu();
	});//end event
	
	_vars.$offcanvasMenu.on("click", function(e){
//console.log( e.target );
		$(".collapse").hide();
//console.log( $( e.target ).data()  );
		var _target = $( e.target ).data("toggle");
//console.log( _target );
		//$( _target ).slideToggle( _vars.duration, function(e){
		$( _target ).show( _vars.duration, function(e){
//console.log(arguments)
			toggleMenu();
		});
	});//end event
	
	
	_vars.$closeButtons.on("click", function(e){
//console.log( e.target );
			var _target = $( e.target ).data("toggle");
//console.log( _target );
			$( _target ).slideToggle( _vars.duration , function(e){
//console.log(arguments)
			});
		});//end event

	_vars.$modalButtons.on("click", function(e){
//console.log( e.target );
			var id = $( e.target ).data("toggle");
			_toggleModal( id );
			
			if( $( e.target ).attr("href").indexOf("&") !== -1 ){
				var arr = $( e.target ).attr("href").split("&");
				arr = arr[1].split("=");
//console.log(arr);
				var nodeId = arr[1];
//console.log(nodeId);
				if( id === "#modal-edit-node"){
					_getFieldValues(id, nodeId);
				}
			}
			
		});//end event

	_vars.$getTagGroups.on("click", function(e){
//console.log( e.target );
		$("#block-tags").find(".collapse").hide();
		var _target = $( e.target ).data("toggle");
//console.log( _target );
		$( _target ).slideToggle( _vars.duration , function(e){
//console.log(arguments)
		});
	});//end event


	_vars.$toggleContent.on("click", function(e){
//console.log( e.target );
		var test = $(e.target).hasClass("icon-chevron-down");
//console.log( test );
		var test2 = $(e.target).hasClass("icon-chevron-up");
//console.log( test2 );

		if( test || test2 ){
			var _p = e.target.parentNode;
	//console.log( _p );
			var $blockContent = $(_p).find(".block-content");
	//console.log( $blockContent );
			$blockContent.slideToggle(_vars.duration);

			var $buttonDropDown = $(e.target);
	//console.log( $buttonDropDown );
			var test = $buttonDropDown.hasClass("icon-chevron-down");
			if( test ){
				$buttonDropDown.removeClass("icon-chevron-down");
				$buttonDropDown.addClass("icon-chevron-up");
			} else {
				$buttonDropDown.removeClass("icon-chevron-up");
				$buttonDropDown.addClass("icon-chevron-down");
			}
		}
		
	});//end event

	$(document).on("keydown", function(e) {
//console.log(e);
//console.log("e.keyCode = " + e.keyCode );
		if (e.keyCode == 27) {
//console.log("press ESC ", e.target);
			_closeModal( "#modal-edit-node" );
		}
	});//end event
	
*/	
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
	
}//_initPage()


function toggleMenu(){
	var _w = parseInt( _vars.$offcanvasBar.css("width") );
//console.log( _vars.$offcanvasBar.css("width"), _w);
	
	if( _w == 0){
		_vars.$offcanvas.css("display","block");
		_vars.$offcanvasBar.css("width", _vars.menuWidth);
	}

	if( parseInt(_w) == _vars.menuWidth){
		_vars.$offcanvas.css("display","none");
		_vars.$offcanvasBar.css("width", 0);
	}
}//end toggleMenu()

function _toggleModal( id ){
	$m = $(id);
	if( $m.hasClass("uk-open") ){
		$m.hide( _vars.duration );
		//$m.slideUp( _vars.duration, function () {
		//$m.fadeOut( 600, function () {
//console.log("-- end of hide....");				
		//});
		$m.removeClass("uk-open");
	} else {
		//$m.show("fast", function () {
		$m.slideDown( _vars.duration, function () {
		//$m.fadeIn( 600, function () {
//console.log("-- end of show....");				
		});
		$m.addClass("uk-open");
	}
}//end _toggleModal()

function _closeModal( id ){
	$m = $(id);
	if( $m.hasClass("uk-open") ){
		$m.hide( _vars.duration );
		$m.removeClass("uk-open");
	}
}//end _toggleModal()


function _getFieldValues(id, nodeId){
	if( id === "#modal-edit-node"){
		var form = document.forms["form_playlist_node"];
//console.log(form);
console.log(form.elements);
console.log(nodeId);
	}
}//_getFieldValues()