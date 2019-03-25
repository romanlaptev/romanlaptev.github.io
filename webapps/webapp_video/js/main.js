//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);
var start_scroll_pos, end_scroll_pos;

window.onload = function(){
//console.log("window event onload");
func.log( navigator.userAgent );

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

if ('ontouchstart' in window){
	document.body.className = "touch";
func.log( document.body.className );	
/*
		var script = document.createElement('script');
		script.src = "https://getfirebug.com/firebug-lite.js";
		//document.body.appendChild( script );
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() {
//alert( "onload " + this.src);
		};
		script.onerror = function(e) {
//alert( "error load script " + this.src);
		};  
*/
}


if( typeof window.jQuery === "function"){
var msg = 'jQuery version: ' + jQuery.fn.jquery;
func.log(msg);

	$(document).ready(function(){
//console.log("document ready");

		//--------------------- Scroll
		//Detect top position for scroll block
		start_scroll_pos = $("#App").offset().top + 100;
		end_scroll_pos = start_scroll_pos - 20;
		
//---------------------
/*
		//$(".btn-primary").click(function(){
			//$(".collapse").collapse('toggle');
		//});
		
		//$(".btn-success").click(function(){
			//$(".collapse").collapse('show');
		//});
		
		//$(".btn-warning").click(function(){
			//$(".collapse").collapse('hide');
		//});
		
		$(".collapse").on('show.bs.collapse', function(){
func.log('<p>The collapsible content is about to be shown.</p>');
		});
		
		$(".collapse").on('shown.bs.collapse', function(){
func.log('<p>The collapsible content is now fully shown.</p>');
		});
		
		$(".collapse").on('hide.bs.collapse', function(){
func.log('<p>The collapsible content is about to be hidden.</p>');
		});
		
		$(".collapse").on('hidden.bs.collapse', function(){
func.log('<p>The collapsible content is now hidden.</p>');
		});
*/		
//---------------------		
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
