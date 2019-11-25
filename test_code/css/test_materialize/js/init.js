(function($){
	$(function(){

		$('.sidenav').sidenav();
		//$('.carousel').carousel();
		//$('.collapsible').collapsible();
		//$('.modal').modal();
		 
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

document.addEventListener('DOMContentLoaded', function(e) {
console.log(e, e.type);
console.log(M);

	var versionInfo = document.querySelector("#logo-container");
	versionInfo.innerHTML = "version: " + M.version;

	var elems = document.querySelectorAll('.carousel');
	var instances = M.Carousel.init(elems, {
		duration: 300//ms
	});
	
	var panels = document.querySelectorAll('.collapsible');
	var options = {
		accordion: true
	};
	var instances2 = M.Collapsible.init(panels, options);	
console.log(instances2);
	
	
	var modalElems = document.querySelectorAll('.modal');
	var options = {
		onOpenStart: function( w ){
console.log( this, w );
		}
	};
	var modalInstances = M.Modal.init(modalElems, options);
	
});