//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);
func.vars["logOrderBy"] = "DESC";//sort log message by date

var start_scroll_pos, end_scroll_pos;


if( typeof window.jQuery === "function"){

	$(document).ready(function(){
//console.log("document ready");

		//--------------------- Scroll
		//Detect top position for scroll block
		start_scroll_pos = $("#App").offset().top + 100;
		end_scroll_pos = start_scroll_pos - 20;
		
	
//---------------------
//console.log( $("#page-range").attr("type") );
//var msg = 'page-range type: ' + $("#page-range").attr("type");
//msg += ', page-range type: ' + $("#page-number-2").attr("type");
//func.log("<p class='alert'>"+msg+"</p>");
		if( $("#page-range").attr("type") !== "range"){
			$("#page-range").hide();
		}
		if( $("#page-number-2").attr("type") !== "number"){
			$("#page-number-2").hide();
		}

		
	});//end ready	

	$(window).scroll(function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );
		if ( $(this).scrollTop() > start_scroll_pos  ) {
			$("#btn-scroll-to-top").show();
		} 

		if ( $(this).scrollTop() < end_scroll_pos ) {
			$("#btn-scroll-to-top").hide();
		}
	});//end scroll
}


window.onload = function(){
//console.log("window event onload");
func.logAlert( navigator.userAgent, "info" );

	//Start webApp
	if( typeof webApp === "object"){
		_runApp();
	}

	function _runApp(){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize

	}//end _runApp()

};//end window.load
