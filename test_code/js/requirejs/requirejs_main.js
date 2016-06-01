//var jq;

document.addEventListener("DOMContentLoaded", function(e){
console.log("DOMContentLoaded, ", e);
});//end dom load

onload = function(){
console.log("onload");
};

requirejs.config({
    baseUrl: 'res',
    paths:{
        'jquery': 'http://code.jquery.com/jquery-1.8.0.min'
    }//,
    //shim: {
        //'jquery': {
            //exports: 'jQuery',
        //}
    //}
});

require(["graphics_curves"], function() {
console.log("load graphics_curves.js.");
});


require( ["jquery"], function($) {
console.log("require jquery");
	alert( $.fn.jquery );
	//window.jq = $;
	$(document).ready(function(){
console.log("document ready");
		init();
	});
});

/*
require(["jquery", "graphics_curves"], function( graphics_curves, $) {
  alert("load graphics_curves.js.");
console.log( graphics_curves );  
  alert( $.fn.jquery );
});
*/


/*
define(
    'mymodule',
    ['jquery'],
    function( $ ){
        return {
            foo : 'bar'
        };
    }
);
*/

//alias module to use when lazy loading from URL
/*
define("http://code.jquery.com/jquery-1.9.1.min.js", ["jquery"], function ( $ ) {
console.log($.fn.jquery);
   return $;//returns original module
});
*/

var init = function(){
console.log("init ", $);
};