	//-------------------------------------------------- init
	var sitename = "";
	//var sitecontent = "";
	//var sitecontent = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
	var sitecontent = "https://cloclo20.datacloudmail.ru/weblink/thumb/xw1/J1zH/u6oXREDxr";
	
	//if(location.href.indexOf("mycomp") === -1){
		//var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk";
	//}

	//-------------------------------------------------------------- load Bootstrap
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", "css/bootstrap335.min.css");
	document.getElementsByTagName("head")[0].appendChild ( css );
	css.onload = function() {
		//alert( "onload " + this.href);
console.log( "onload " + this.href);
	};
	css.onerror = function(e) {
		//alert( "error load css " + this.href);
console.log( "error load css " + this.href );
	};  
	
	//-------------------------------------------------------------- load style.css
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", "css/style.css");
	document.getElementsByTagName("head")[0].appendChild ( css );
	css.onload = function() {
		//alert( "onload " + this.href);
console.log( "onload " + this.href);
	};
	css.onerror = function(e) {
		//alert( "error load css " + this.href);
console.log( "error load css " + this.href );
	};  
	
	//-------------------------------------------------------------- load jQuery
	if( typeof window.jQuery !== "function")
	{
		var message = "jQuery load error...";
		document.write('<h2>' +message+ '</h2>');
		//document.write('<script src="themes/gravura/js/jquery-1.8.3.min.js"><\/script>');
	}
	else
	{
	console.log( $.fn.jquery);
	}	
	
//	var script = document.createElement('script');
//	script.src = "js/jquery-1.8.3.min.js";
//	//document.body.appendChild( script );
//	document.getElementsByTagName('head')[0].appendChild(script);
//
//	script.onload = function() {
//		//alert( "onload " + this.src);
//console.log( "onload " + this.src, ", jQuery version = " + $.fn.jquery);
//		init_actions();
// 	};
//	script.onerror = function(e) {
//		alert( "error load script " + this.src);
//	};  



document.addEventListener("DOMContentLoaded", function(e){
console.log("DOMContentLoaded, ", e);
console.log( "jQuery is " + typeof $, document.body.className);

	//Pirobox init
	if( document.body.className.indexOf("use-pirobox") !== -1 ){
		//load pirobox resources
		var css = document.createElement('link');
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", "js/pirobox/pirobox.css");
		document.getElementsByTagName("head")[0].appendChild ( css );
		css.onload = function() {
			//alert( "onload " + this.href);
console.log( "onload " + this.href);
		};
		css.onerror = function(e) {
			//alert( "error load css " + this.href);
console.log( "error load css " + this.href );
		};

		//load Pirobox script
		var script = document.createElement('script');
		script.src = "js/pirobox/pirobox.js";
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() {
console.log( "onload " + this.src);
console.log( typeof jQuery().piroBox );
			if ( jQuery().piroBox) {
				jQuery().piroBox({
						my_speed: 300, //animation speed
						bg_alpha: 0.1, //background opacity
						slideShow : false, // true == slideshow on, false === slideshow off
						slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
						close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox
				});
			}
		};
		script.onerror = function(e) {
			alert( "error load script " + this.src);
		}; 
}

	//zoomifly init
	if( document.body.className.indexOf("use-zoomify") !== -1 ){
		var script = document.createElement('script');
		script.src = "zoomify/ZoomifyImageViewer.min.js";
		document.body.appendChild( script );
		
		script.onload = function() {
console.log( "Zoomify onload " + this.src);
console.log( "jQuery is " + typeof $);

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

			$(".btn-view-detail-picture").on("click", function(e){
	//console.log("click", e);
				e.preventDefault();
			});//end event;

			$(".btn-view-detail-picture").on("mousedown", function(e){
console.log( "mousedown", e, this.getAttribute("href"));
console.log( "Z.imagePath = ", Z.imagePath );
//console.log( "2.Z.Navigator.setImagePath = ",  Z.Navigator.setImagePath );
console.log( "Z.Viewer = ",  Z.Viewer );
				set_zoomify_img( this );
				$('#zoom-window').toggle();
			});//end event;

			$(".btn-view-detail-picture").on('touchstart', function(e){
	//alert( 'touchstart');
				var img_filename = this.getAttribute("href");
				set_zoomify_img( this );
				$('#zoom-window').toggle();
			});//end event;

		};
		script.onerror = function() {
			alert( "onerror " + this.src );
		};  
		
	}//end zoomify init

    
	//console.log( location.href, location.href.indexOf("gravura.ts6.ru") );    
	if( location.href.indexOf("gravura.wallst.ru") !== -1 ){
console.log("ya counter add...");        
		//Yandex.Metrika counter
		(function (d, w, c) {
			(w[c] = w[c] || []).push(function() {
				try {
					w.yaCounter43081739 = new Ya.Metrika({
						id:43081739,
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true,
						webvisor:true
					});
				} catch(e) { }
			});

			var n = d.getElementsByTagName("script")[0],
				s = d.createElement("script"),
				f = function () { n.parentNode.insertBefore(s, n); };
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://mc.yandex.ru/metrika/watch.js";

			if (w.opera == "[object Opera]") {
				d.addEventListener("DOMContentLoaded", f, false);
			} else { f(); }
		})(document, window, "yandex_metrika_callbacks");
		
	}
    
});//end dom load



window.onload = function(){
console.log("window.onload");	
//console.log( "jQuery is " + typeof $);

	//+Обработка проблем загрузки изображений (загрузить с облака гугла)
//	var images = document.getElementsByTagName("img");
//console.log( "images =  ", images, images.length);
//	for( var n = 0; n < images.length; n++){
//console.log(images[n].src,  " ,image.clientHeight =  ", images[n].clientHeight );
//		if( images[n].clientHeight === 0 ){
//			load_img_error( images[n] );
//		};
//	};


};//end load

(function($){
    $(function() {

		//Обработка проблем загрузки изображений (загрузить с облака гугла)
		$("img").on("error", function( e ){
console.log("image load error");
			//var src = $(this).attr("src");
			//var new_src = sitecontent + src;
//console.log("fixing image source = " + new_src);
			//$(this).attr("src", new_src);
			$("body").attr("data-image-load-error","1");
			load_img_error( $(this)[0] );
		});

		//$("img").on("load", function( e ){
//console.log("image load event", e);
		//});

/*
		  if( location.href.indexOf("mycomp") === -1 )
		  {
			$(".pirobox img, .notebook-icons img, .slide img").each(function(){
				var src = $(this).attr("src");
if( src.indexOf("googledrive") === -1)
{
				var new_src = sitecontent + src;
console.log("Error loag image!, new source = " + new_src);
				$(this).attr("src", new_src);
}
			});
		  }
*/


		$(".pirobox").each(function(){
			  if( location.href.indexOf("gravura.ts6.ru") >  0 ){
//			//if(location.href.indexOf("mycomp") === -1){
				  var href = $(this).attr("href");
//console.log("href = " + href);
//if( href.indexOf("googledrive") === -1)
//{
				var new_href = sitecontent + href;
				$(this).attr("href", new_href);
				$(this).attr("target", "_blank");
console.log("fix pirobox link, new_href = " + new_href);
//}
			  }
		});

    });
})(jQuery);



function showLayer( id, visibility ) {
	//if(visibility == 'show') { visibility = 'visible'; }
	//if(visibility == 'hide') { visibility = 'hidden'; }
	//document.getElementById(id).style.visibility = visibility;
	
	if(visibility == 'show') { css_display = 'block'; }
	if(visibility == 'hide') { css_display = 'none'; }
	document.getElementById(id).style.display = css_display;
	
	return false;
}


function set_zoomify_img( image ){

	var img_filename = image.getAttribute("href");
	//if(location.href.indexOf("mycomp") === -1){
	//if( $("body").attr("data-image-load-error") === "1" ){
		//img_filename = sitecontent + img_filename;
//console.log("data-load-image-error", $("body").attr("data-image-load-error"), img_filename); 	
	//}
	
	//test preload img_filename + '/ImageProperties.xml' and replace path in case error
	var xml_filename = img_filename + '/ImageProperties.xml';
	$.ajax({
		type: "GET",
		url: xml_filename,
		dataType: "text",
		success: function( data ){
			var message = "Successful download " + xml_filename;
console.log( message );
			Z.Viewer.setImagePath( img_filename );
		},
		error: function( data, status, errorThrown ){
console.log( "error function, status: " + status );
console.log( "errorThrown: " + errorThrown );
			img_filename = sitecontent + img_filename;
console.log( "fix zoomify image path - " + img_filename );
			Z.Viewer.setImagePath( img_filename );
		}
	});
	
}//set_zoomify_img



//var init_actions = function(){
//console.log( "init_actions " + $.fn.jquery);
//	test_img.onerror = function(){
//alert("error!" );
//	};
//console.log( test_img.onerror );
//}//end init_actions()


function load_img_error( image ){
	
	//exit, if no cloud image
console.log( image.getAttribute("src") );	
	if( image.getAttribute("src").indexOf("http://") !== -1 ||
		image.getAttribute("src").indexOf("https://") !== -1){
		return false;
	}
	
	var new_src = sitecontent + image.getAttribute("src");
	image.src = new_src;
	
	//fix img link
	var link = image.parentNode.getAttribute("href");
	var link_class = image.parentNode.className;
	if( link_class.indexOf("pirobox") !==-1){
		var new_link = sitecontent + link;
		image.parentNode.setAttribute("href", new_link );
	}
	
//console.log("fixing image source - ", image, "new parent link = " + new_link, link_class);

}//end load_img_error()
