(function($){
	$(function(){

		$('.sidenav').sidenav();

	}); // end of document ready
})(jQuery); // end of jQuery name space

window.onload = function(e){
//console.log(e);
	if( document.querySelector ){
		var ua_header = document.querySelector("#ua");
	} else {
		var ua_header = document.getElementById("ua");
	}

	ua_header.innerHTML = navigator.userAgent;
}//end load
