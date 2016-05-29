var sitename = "";
if(location.href.indexOf("mycomp") === -1){
	var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzcGZHYnlOb1RCRUk";
	//var sitecontent = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
	var sitecontent = "";
}

//var pirobox_css_file = sitename + "/book_history_engraving/themes/gravura/js/pirobox/pirobox.css";
//if(location.href.indexOf("mycomp") === -1){
	var pirobox_css_file = "themes/gravura/css/pirobox.css";
//}

if( typeof window.jQuery !== "function")
{
	var message = "jQuery load error...";
	document.write('<h2>' +message+ '</h2>');
}
else
{
	console.log( $.fn.jquery);
}	


/*
document.addEventListener("DOMContentLoaded", function(e){
console.log("DOMContentLoaded, ", e);
		//zoomifly init
		var script = document.createElement('script');
		script.src = "zoomify/ZoomifyImageViewer_test.js";
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
			
		}
		script.onerror = function() {
			alert( "onerror " + this.src );
		};  
		
});
*/		

window.onload = function(){
	//document.getElementById("zoomContainer").addEventListener("mouseup", hide_zoom, true);
	//Zoomify
	//if( document.body.className === "zoom" ){
		//load_zoomify_script();
	//};
	
};//end load

/*
function hide_zoom( e ){
console.log("test!!!!", e.target, e.target.getAttribute("id"));
	if( e.target.getAttribute("id") === "buttonFullPage-imgDown"){
		document.getElementById("zoomContainer").style.display = "none";
	}
}
*/

(function($){
    $(function() {

	//======================
		//Обработка проблем загрузки изображений (загрузить с облака гугла)
		//$(".pirobox img, .picture_column img").error(function(){
		$("img").error(function(){
			var src = $(this).attr("src");
			var new_src = sitecontent + src;
console.log("Error loag image!, new source = " + new_src);
			//$(this).attr("src", new_src);
/*
			var wrap = $(this).parent().parent();
			$(wrap).find(".pirobox_gall").each(function(){
				var imagebox_src = $(this).attr("href");
					var new_imagebox_src = sitecontent + imagebox_src;
				$(this).attr("href", new_imagebox_src);
			});
*/
		});
		
		//resize click correct
		/*
		$(".picture_column a, .resize a").on( "click", function(){
			var href = $(this).attr("href");
console.log("resize click, href=" + href);
			if( location.href.indexOf("googledrive.com") > 0)
			{
				var correct_href = sitecontent + href;
console.log("correct href=", correct_href);			
				$(this).attr("href", correct_href);
				$(this).attr("target", "_blank");
			}
			//return false;
		});
		*/
		
		$(".pirobox").each(function(){
			var href = $(this).attr("href");
//console.log("href = " + href);
			var new_href = sitecontent + href;
			$(this).attr("href", new_href);
			$(this).attr("target", "_blank");
//console.log("new_href = " + new_href);
		});
		
    });
})(jQuery);


/**
* Name: piroBox v.1.2.2
* Date: May 2010
* Autor: Diego Valobra (http://www.pirolab.it),(http://www.diegovalobra.com)
* Version: 1.2.2
* Licence: CC-BY-SA http://creativecommons.org/licenses/by-sa/2.5/it/
**/

(function($) {
	$.fn.piroBox = function(opt) {
		opt = jQuery.extend({
		my_speed : null,
		close_speed : 300,
		bg_alpha : 0.5,
		close_all : '.piro_close,.piro_overlay',
		slideShow : null,
		slideSpeed : null
		}, opt);

		function start_pirobox() {
		  var corners =
			  '<tr>'+
			  '<td colspan="3" class="pirobox_up"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td class="t_l"></td>'+
			  '<td class="t_c"></td>'+
			  '<td class="t_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td class="c_l"></td>'+
			  '<td class="c_c"><span><span></span></span><div></div></td>'+
			  '<td class="c_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td class="b_l"></td>'+
			  '<td class="b_c"></td>'+
			  '<td class="b_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td colspan="3" class="pirobox_down"></td>'+
			  '</tr>';
			var window_height =  $(document).height();
			var bg_overlay = $(jQuery('<div class="piro_overlay"></div>').hide().css({'opacity':+opt.bg_alpha,'height':window_height+'px'}));
			var main_cont = $(jQuery('<table class="pirobox_content" cellpadding="0" cellspacing="0"></table>'));
			var caption = $(jQuery('<div class="caption"></div>'));
			var piro_nav = $(jQuery('<div class="piro_nav"></div>'));
			var piro_close = $(jQuery('<a href="#close" class="piro_close" title="закрыть"></a>'));
			var piro_play = $(jQuery('<a href="#play" class="play" title="пролистать"></a>'));
			var piro_stop = $(jQuery('<a href="#stop" class="stop" title="остановить"></a>'));
			var piro_prev = $(jQuery('<a href="#prev" class="piro_prev" title="предыдущая"></a>'));
			var piro_next = $(jQuery('<a href="#next" class="piro_next" title="следующая"></a>'));
			$('body').append(bg_overlay).append(main_cont);
			main_cont.append(corners);
			$('.pirobox_up').append(piro_close);
			$('.pirobox_down').append(piro_nav);
			$('.pirobox_down').append(piro_play);
			piro_play.hide();
			$('.pirobox_down').append(piro_prev).append(piro_next);
			piro_nav.append(caption);
			var my_nav_w = piro_prev.width();
			main_cont.hide();
			var my_gall_classes = $("a[class^='pirobox']");
			var map = new Object();
				for (var i=0; i<my_gall_classes.length; i++) {
					var it=$(my_gall_classes[i])
					map['a.'+it.attr('class')]=0;
				}
			var gall_settings = new Array();
				for (var key in map) {
					gall_settings.push(key);
				}
				for (var i=0; i<gall_settings.length; i++) {
					$(gall_settings[i]).each(function(rel){this.rel = rel+1 + "&nbsp;из&nbsp;" + $(gall_settings[i]).length;});
						var add_first = $(gall_settings[i]+':first').addClass('first');
						var add_last = $(gall_settings[i]+':last').addClass('last');
				}
			$(my_gall_classes).each(function(rev){this.rev = rev+0});
			var imgCache = $(my_gall_classes).each(function(){this.href});
			var hidden = $('body').append('<div id="imgCache" style="display:none"></div').children('#imgCache');
			$.each(imgCache, function (i,val) {
				$('<div/>').css({'background':'url('+val+')'/*,'width':'600px','height':'200px'*/}).appendTo(hidden);
			});
			var piro_gallery = $(my_gall_classes);
			$.fn.fixPNG = function() {
				return this.each(function () {
					var image = $(this).css('backgroundImage');
					if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
						image = RegExp.$1;
						$(this).css({
							'backgroundImage': 'none',
							'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + ($(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
						}).each(function () {
							var position = $(this).css('position');
							if (position != 'absolute' && position != 'relative')
								$(this).css('position', 'relative');
						});
					}
				});
			};
			$.browser.msie6 =($.browser.msie && /MSIE 6\.0/i.test(window.navigator.userAgent));
			if( $.browser.msie6 && !/MSIE 8\.0/i.test(window.navigator.userAgent)) {
				$('.t_l,.t_c,.t_r,.c_l,.c_r,.b_l,.b_c,.b_r,a.piro_next, a.piro_prev,a.piro_prev_out,a.piro_next_out,.c_c,.piro_close,a.play,a.stop').fixPNG();
				var ie_w_h =  $(document).height();
				bg_overlay.css('height',ie_w_h+ 'px');
			}
			if( $.browser.msie) {
			opt.close_speed = 0;
			}
			$(window).resize(function(){
				var new_w_bg = $(document).height();
				bg_overlay.css({'visibility':'visible','height':+ new_w_bg +'px'});
			});
			piro_prev.add(piro_next).bind('click',function(c) {
				c.preventDefault();
				var image_count = parseInt($(piro_gallery).filter('.item').attr('rev'));
				var start = $(this).is('.piro_prev_out,.piro_prev') ? $(piro_gallery).eq(image_count - 1) : $(piro_gallery).eq(image_count + 1);
				if(!start.size()) {
					start = $(this).is('.piro_prev_out,.piro_prev') ? $(piro_gallery).eq($(piro_gallery).size() - 1) : $(piro_gallery).eq(0);
				}
				start.click();
				piro_close.add(caption).add(piro_next).add(piro_prev).css('visibility','hidden');
			});
			$(piro_gallery).each(function(array) {
					var item = $(this);
					item.unbind();
					item.bind('click',function(c) {
						c.preventDefault();
						piro_open(item.attr('href'));
						var this_url = item.attr('href');
						//var descr = item.children('span').html();
						var descr = item.attr('title');
						var number = item.attr('rel');
						/*if( descr == ""){
						caption.html('<p>'+ this_url+'<em class="number">' + number + '</em><a href='+ this_url +' class="link_to" target="_blank" title="Open Image in a new window"></a></p>');
						}else{
						caption.html('<p>'+ descr+'<em class="number">' + number + '</em><a href='+ this_url +' class="link_to" target="_blank" title="Open Image in a new window"></a></p>');
						}*/
						if( descr != ""){
							caption.html('<p>'+descr+'<em class="number">'+number+'</em></p>');
						} else {
							// нет комента - нет темной фигни снизу
							caption.html('<p>&nbsp;<em class="number">'+number+'</em></p>');
						}
						if(item.is('.last')){
							$('.number').css('text-decoration','underline');

						}else{
							$('.number').css('text-decoration','none');
							}
						if(item.is('.first')){
							piro_prev.hide();
							piro_next.show();
						}else{
							piro_next.add(piro_prev).show();
						}
						if(item.is('.last')){
							piro_prev.show();
							piro_next.hide();
							piro_play.css('width','0');
						}else{
							piro_play.css('width','40px');
							}
						if(item.is('.last') && item.is('.first') ){
							piro_prev.add(piro_next).hide();
							$('.number').hide();
							piro_play.remove();
						}
							$(piro_gallery).filter('.item').removeClass('item');
							item.addClass('item');
							$('.c_c').removeClass('unique');
					});
				});
				var piro_open = function(my_url) {
					piro_play.add(piro_stop).hide();
					piro_close.add(caption).add(piro_next).add(piro_prev).css('visibility','hidden');
					if(main_cont.is(':visible')) {
						$('.c_c div').children().fadeOut(300, function() {
							$('.c_c div').children().remove();
							load_img(my_url);
						});
					} else {
						$('.c_c div').children().remove();
						main_cont.show();
						bg_overlay.fadeIn(300,function(){
						load_img(my_url);
						});
					}
				}
				var load_img = function(my_url) {
				if(main_cont.is('.loading')) {return;}
				main_cont.addClass('loading');
				var img = new Image();
				img.onerror = function (){
					var main_cont_h = $(main_cont).height();
					main_cont.css({marginTop : parseInt($(document).scrollTop())-(main_cont_h/1.9)});
				  $('.c_c div').append('<p class="err_mess">There seems to be an Error:&nbsp;<a href="#close" class="close_pirobox">Close Pirobox</a></p>');
					$('.close_pirobox').bind('click',function(c) {
						c.preventDefault();
						piro_close.add(bg_overlay).add(main_cont).add(caption).add(piro_next).add(piro_prev).hide(0,function(){ img.src = '';});
						main_cont.removeClass('loading');
					});
				}
				img.onload = function() {
					var imgH = img.height;
					var imgW = img.width;
					var main_cont_h = $(main_cont).height();
					var w_H = $(window).height();
					var w_W = $(window).width();
					$(img).height(imgH).width(imgW).hide();
						$('.c_c div').animate({height:imgH+'px',width:imgW+'px'},opt.my_speed);
						var fix = imgH/w_H*2.3;
						if(w_H < imgH){h_fix = fix;}else{h_fix = 2;}
						main_cont.animate({
						height : (imgH+40) + 'px' ,
						width : (imgW+40) + 'px' ,
						marginLeft : '-' +((imgW)/2+20) +'px',
						marginTop : parseInt($(document).scrollTop())-(imgH/h_fix)},opt.my_speed, function(){
						$('.piro_nav,.caption').css({width:(imgW)+'px','margin-bottom':'10px'});
						$('.piro_nav').css('margin-left','-'+(imgW)/2+'px');
							var caption_height = caption.height();
							$('.c_c div').append(img);
							piro_close.css('display','block');
							piro_next.add(piro_prev).add(piro_close).css('visibility','visible');
							caption.css({'visibility':'visible','display':'block','opacity':'0.8','overflow':'hidden'});
							main_cont.hover(function(){
								caption.stop().fadeTo(200,0.8);},
								function(){caption.stop().fadeTo(200,0);
								});
								$(img).fadeIn(300);
									main_cont.removeClass('loading');
									if(opt.slideShow === true){
									   piro_play.add(piro_stop).show();
									}else{
										 piro_play.add(piro_stop).hide();
									}
							});
						}
					img.src = my_url;
					$('html').bind("keyup", function (c) {
						 if(c.keyCode == 27) {
							c.preventDefault();
							if($(img).is(':visible') || $('.c_c>div>p>a').is('.close_pirobox')){
								$(piro_gallery).removeClass('slideshow').removeClass('item');
								piro_close.add(bg_overlay).add(main_cont).add(caption).add(piro_next).add(piro_prev).hide(0,function(){ img.src = '';});
								main_cont.removeClass('loading');
								clearTimeout(timer);
								$(piro_gallery).children().removeAttr('class');
								$('.stop').remove();
								$('.c_c').append(piro_play);
								$('.sc_menu').css('display','none');
								$('ul.sc_menu li a').removeClass('img_active').css('opacity','0.4');
								piro_next.add(piro_prev).show().css({'top':'50%'});
								$(piro_gallery).children().fadeTo(100,1);
							}
						}
					});
					$('html').bind("keyup" ,function(e) {
						 if ($('.item').is('.first')){
						}else if(e.keyCode == 37){
						e.preventDefault();
							if($(img).is(':visible')){
								clearTimeout(timer);
								$(piro_gallery).children().removeAttr('class');
								$('.stop').remove();
								$('.c_c').append(piro_play);
								piro_prev.click();
							}
						 }
					});
					$('html').bind("keyup" ,function(z) {
						if ($('.item').is('.last')){
						}else if(z.keyCode == 39){
						z.preventDefault();
							if($(img).is(':visible')){
								clearTimeout(timer);
								$(piro_gallery).children().removeAttr('class');
								$('.stop').remove();
								$('.c_c').append(piro_play);
								piro_next.click();
								//alert('click')
							}
						}
					});
					var win_h = $(window).height();
					piro_stop.bind('click',function(x){
						x.preventDefault();
						clearTimeout(timer);
						$(piro_gallery).removeClass('slideshow');
						$('.stop').remove();
						$('.pirobox_down').append(piro_play);
						piro_next.add(piro_prev).css('width',my_nav_w+'px');
					});
					piro_play.bind('click',function(w){
						w.preventDefault();
						clearTimeout(timer);
						if($(img).is(':visible')){
						$(piro_gallery).addClass('slideshow');
						$('.play').remove();
						$('.pirobox_down').append(piro_stop);
						}
						piro_next.add(piro_prev).css({'width':'0px'});
						return slideshow();
					});
				  $(opt.close_all).bind('click',function(c) {
					$(piro_gallery).removeClass('slideshow');
					clearTimeout(timer);
					if($(img).is(':visible')){
						c.preventDefault();
						piro_close.add(bg_overlay).add(main_cont).add(caption).add(piro_next).add(piro_prev).hide(0,function(){ img.src = '';});
						main_cont.removeClass('loading');
						$(piro_gallery).removeClass('slideshow');
						piro_next.add(piro_prev).css('width',my_nav_w+'px').hide();
						$('.stop').remove();
						$('.pirobox_down').append(piro_play);
						piro_play.hide();
					}
				  });
					if(opt.slideShow === true){
						function slideshow(){
							if( $(piro_gallery).filter('.item').is('.last')){
							clearTimeout(timer);
							$(piro_gallery).removeClass('slideshow');
							$('.stop').remove();
							$('.pirobox_down').append(piro_play);
							piro_next.add(piro_prev).css('width',my_nav_w+'px');
							} else if($(piro_gallery).is('.slideshow' ) && $(img).is(':visible')){
								clearTimeout(timer);
								piro_next.click();
							}
						}
						var timer = setInterval(slideshow,opt.slideSpeed*1000 );
					}


				}
			}

		start_pirobox();
	}
})(jQuery);

jQuery(document).ready(function() {
	
	// load pirobox resources
	var pirobox_style = document.createElement('link');
	pirobox_style.setAttribute("rel", "stylesheet");
	pirobox_style.setAttribute("type", "text/css");
	pirobox_style.setAttribute("href", pirobox_css_file );
	document.getElementsByTagName("head")[0].appendChild(pirobox_style);

	//var script2 = document.createElement('script');
	//script2.src = "themes/gravura/js/pirobox/pirobox_ansi.js";
	//script2.src = "themes/gravura/js/test.js";
	//document.body.appendChild( script2 );
/*
	script2.onload = function() {
		//alert( "onload " + this.src);
	}
	script2.onerror = function() {
		alert( "onerror " + this.src );
	};  
*/	

	jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : false, // true == slideshow on, false === slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox
	});

	//Zoomify
	//if( $(document.body).hasClass("zoom") ){
		//load_zoomify_script();
	//};
	
});//end ready


/*	
function load_zoomify_script(){	
	// load zoomify resources
	var script = document.createElement('script');
	script.src = "ZoomifyImageViewer_test.js";
	document.body.appendChild( script );
	script.onload = function() {
alert( "onload " + this.src);
		//var zoom_img_path = "/site-content/book_history_engraving/02.german_engraving/zoom/p0003/";
		//load_zoomify_img( zoom_img_path, "zoomContainer" );
	}
	script.onerror = function() {
		alert( "onerror " + this.src );
	};  

	$("#zoomContainer").on("mouseup","#buttonFullPage-imgDown", function(e){
console.log("test mouseup on  ", e.target);
		$("#zoomContainer").hide();
	})//end event
	
	$(".picture-details").on("click", function(e){
console.log("click  ", e.target);
		//var zoom_img_path = "/site-content/book_history_engraving/02.german_engraving/zoom/p0003/";
		//load_zoomify_img( zoom_img_path );
		$('#zoomContainer').show();
		return false;
	})//ent event
	
}//end load_zoomify_script
*/


function load_zoomify_img( zoom_img_path, zoomContainer ){
/*
"zInitialX" : // Default is null (centered).
"zInitialY" : // Default is null (centered).
"zInitialZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is null (zoom-to-fit view area).
"zMinZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is null (zoom-to-fit view area).
"zMaxZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is 1 (100%).
"zNavigatorVisible" :  // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
"zToolbarVisible" :  // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
"zLogoVisible" :  // "0"=hide, "1"=show (default).
"zSliderVisible" :  // "0"=false, "1"=true (default).
"zFullPageVisible" :  // "0"=false, "1"=true (default).
"zFullPageInitial" :  // "0"=false, "1"=true (default).
"zProgressVisible" :  // "0"=false, "1"=true (default).
"zTooltipsVisible" :  // "0"=hide, "1"=show (default).
"zSkinPath" :

"zZoomSpeed" : // "1"=slow to "10"=fast, default is "5".
"zPanSpeed" :  // "1"=slow to "10"=fast, default is "5".
"zFadeInSpeed" : // "1"=slow to "10"=fast, default is "5", "0" = no fade-in.
"zToolbarPosition" :  // "0"=top, "1"=bottom (default).
"zNavigatorWidth" : // Size in pixels, default is 150, useful max is thumbnail width.
"zNavigatorHeight" : // Size in pixels, default is 150, useful max is thumbnail height.
"zNavigatorLeft" : // Position in pixels, default is 0.
"zNavigatorTop" : // Position in pixels, default is 0.
"zNavigatorFit" :  // "0"= fit to viewer (default), "1"= fit to image.
"zClickZoom" :  // "0"=disable, "1"=enable (default).
"zClickPan" :  // "0"=disable, "1"=enable (default).
"zMousePan" :  // "0"=disable, "1"=enable (default).
"zKeys" :  // "0"=disable, "1"=enable (default).
"zConstrainPan" :  // "0"=false, "1"=true.
"zWatermarkPath" :
"zCopyrightPath" :
"zHotspotPath" :
"zHotspotListTitle" :
"zAnnotationPath" :
"zLogoCustomPath" :
"zCanvas" :  // "0"=false, "1"=true (default).
"zDebug" :  // "0"=disable (default), "1"=enable, "2"=enable with tile name labels and tracing.
"zImageProperties" :
"zServerIP" :
"zServerPort" :
"zTileHandlerPath" :
"zEditMode" :
"zSaveHandlerPath" :
"zImageW" :
"zImageH" :
"zTileSize" :
"zMagnification" :
"zFocal" :
"zQuality" :
*/
	var zoomify_viewer_path = "zoomify";
	var optional_params = "";
	
	//optional_params += "zInitialZoom=30&";
	optional_params += "zLogoVisible=0&";// "0"=hide, "1"=show (default).
	optional_params += "zNavigatorVisible=-1&" ; // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
	optional_params += "zFullPageVisible=1&";  // "0"=false, "1"=true (default).
	optional_params += "zFullPageInitial=1&";  // "0"=false, "1"=true (default).
	optional_params += "zToolbarVisible=1&"; // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
	//optional_params += "zMousePan=1&";  // "0"=disable, "1"=enable (default).
	optional_params += "zSkinPath="  + zoomify_viewer_path + "/Assets/Skins/Default";

	//if( location.href.indexOf("googledrive.com") > 0 ||
		//location.href.indexOf("gravura.ts6.ru") > 0 )
	//{
		var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
		zoom_img_path = sitename + zoom_img_path;
	//}
console.log( Z, zoomContainer, zoom_img_path );
	Z.showImage( zoomContainer, zoom_img_path, optional_params ); 
}//end load_zoomify_img()

function showLayer( id, visibility ) {
	//if(visibility == 'show') { visibility = 'visible'; }
	//if(visibility == 'hide') { visibility = 'hidden'; }
	//document.getElementById(id).style.visibility = visibility;
	
	if(visibility == 'show') { css_display = 'block'; }
	if(visibility == 'hide') { css_display = 'none'; }
	document.getElementById(id).style.display = css_display;

	return false;
}