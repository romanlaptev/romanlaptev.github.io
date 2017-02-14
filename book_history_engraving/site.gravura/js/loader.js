	//-------------------------------------------------------------- load Bootstrap
	var bootstrap_css = document.createElement('link');
	bootstrap_css.setAttribute("rel", "stylesheet");
	bootstrap_css.setAttribute("type", "text/css");
	bootstrap_css.setAttribute("href", "themes/gravura/css/bootstrap335.min.css");
	document.getElementsByTagName("head")[0].appendChild ( bootstrap_css );
	bootstrap_css.onload = function() {
		//alert( "onload " + this.href);
console.log( "onload " + this.href);
	};
	bootstrap_css.onerror = function(e) {
		//alert( "error load css " + this.href);
console.log( "error load css " + this.href );
	};  
	
	//-------------------------------------------------------------- load style.css
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", "themes/gravura/css/style.css");
	document.getElementsByTagName("head")[0].appendChild ( css );
	css.onload = function() {
		//alert( "onload " + this.href);
console.log( "onload " + this.href);
	};
	css.onerror = function(e) {
		//alert( "error load css " + this.href);
console.log( "error load css " + this.href );
	};  




requirejs.config({
    baseUrl: 'js',
    paths:{
        'jquery': 'jquery-1.8.3.min',
        //'jquery': 'jquery-1.9.1.min',
	"pirobox" : "../themes/gravura/js/pirobox/pirobox"
    }//,
    //shim: {
        //'jquery': {
            //exports: 'jQuery',
        //}
    //}
});


require( ["jquery"], function($) {
	
console.log("require jquery");
	//alert( $.fn.jquery );
	
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

require(["jquery", "pirobox"], function( $, pirobox) {
  console.log( $.fn.jquery, pirobox );
	//-----------------------------------------------------------  load pirobox resources
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", "themes/gravura/js/pirobox/pirobox.css");
	document.getElementsByTagName("head")[0].appendChild ( css );
	css.onload = function() {
		//alert( "onload " + this.href);
console.log( "Pirobox onload " + this.href);

		jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : false, // true == slideshow on, false === slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox
		});

	};
	css.onerror = function(e) {
		//alert( "error load css " + this.href);
console.log( "error load Pirobox css " + this.href );
	};  
});



window.onload = function(){
console.log("window.onload  = function", $);	

	//add YA metrica
console.log( location.href, location.href.indexOf("gravura.ts6.ru") );    
	if( location.href.indexOf("gravura.ts6.ru") !== -1 ){
//console.log("ya counter add...");        
	//Yandex.Metrika counter
	(function (d, w, c) {
		(w[c] = w[c] || []).push(function() {
			try {
				w.yaCounter12808177 = new Ya.Metrika({id:12808177, enableAll: true, webvisor:true});
			} catch(e) { }
		});

		var n = d.getElementsByTagName("script")[0],
			s = d.createElement("script"),
			f = function () { n.parentNode.insertBefore(s, n); };
		s.type = "text/javascript";
		s.async = true;
		s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

		if (w.opera == "[object Opera]") {
			d.addEventListener("DOMContentLoaded", f, false);
		} else { f(); }
	})(document, window, "yandex_metrika_callbacks");
	//<noscript><div><img src="//mc.yandex.ru/watch/12808177" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
	/*
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-53153513-1', 'auto');
	  ga('send', 'pageview');
	</script> 
	*/
	}
    
	
	//Zoomify init
	if( document.body.className === "zoom" )
	{
		//zoomifly init
		var script = document.createElement('script');
		script.src = "zoomify/ZoomifyImageViewer.min.js";
		document.body.appendChild( script );

		script.onload = function() {
console.log( "onload " + this.src);

			//calc width and height zoomContainer
			var w = $(window).width() / 1.1;
			var h = $(window).height() / 1.1;
			var offset_left = ( $(window).width() - w ) / 2;
			var offset_top = ( $(window).height() - h ) / 2;
console.log(w, h, offset_left, offset_top);		

			$("#zoom-window").width( w );
			$("#zoom-window").height( h );
			$("#zoom-window").css( "left", offset_left + "px");
			$("#zoom-window").css( "top", offset_top + "px");

			var w = $("#zoom-window").width();
			var h = ( $("#zoom-window").height() ) - 60;
			$("#zoomContainer").width( w );
			$("#zoomContainer").height( h );

			var zoom_img_path = "zoomify/zoom_init";
			var zoom_optional_params = "";
			zoom_optional_params += "zLogoVisible=0&";// "0"=hide, "1"=show (default).
			zoom_optional_params += "zToolbarVisible=1&"; // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
			zoom_optional_params += "zNavigatorVisible=1&" ; // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
			zoom_optional_params += "zSkinPath=zoomify/Assets/Skins/Default";
			Z.showImage("zoomContainer", zoom_img_path, zoom_optional_params); 
	//console.log( "1.Z.Navigator.setImagePath = ",  Z.Navigator.setImagePath );
		};
		script.onerror = function() {
			alert( "onerror " + this.src );
		};  

		$(".btn-view-detail-picture").on("click", function(e){
//console.log("click", e);
			e.preventDefault();
		});//end event;

		$(".btn-view-detail-picture").on("mousedown", function(e){
	console.log( "mousedown", e, this.getAttribute("href"));
	console.log( "Z.imagePath = ", Z.imagePath );
	//console.log( "2.Z.Navigator.setImagePath = ",  Z.Navigator.setImagePath );
	console.log( "Z.Viewer = ",  Z.Viewer );

			var img_filename = this.getAttribute("href");
			set_zoomify_img( img_filename );
			$('#zoom-window').toggle();
		});//end event;

		$(".btn-view-detail-picture").on('touchstart', function(e){
	//alert( 'touchstart');
			var img_filename = this.getAttribute("href");
			set_zoomify_img( img_filename );
			$('#zoom-window').toggle();
		});//end event;


	}//end zoomify init


};//end load



var init = function(){
console.log("init ", $);
};//end init


function showLayer( id, visibility ) {
	//if(visibility == 'show') { visibility = 'visible'; }
	//if(visibility == 'hide') { visibility = 'hidden'; }
	//document.getElementById(id).style.visibility = visibility;
	
	if(visibility == 'show') { css_display = 'block'; }
	if(visibility == 'hide') { css_display = 'none'; }
	document.getElementById(id).style.display = css_display;
	
	return false;
}


function set_zoomify_img( img_filename ){
	img_filename = sitecontent + img_filename;
	Z.Viewer.setImagePath( img_filename );
}//set_zoomify_img