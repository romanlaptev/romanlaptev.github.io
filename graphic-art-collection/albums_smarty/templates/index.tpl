<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
   <title>{$title_text}</title>
   <meta http-equiv="content-type" content="text/html; charset={$charset}" />
	<meta http-equiv="Content-Language" content="ru" />
	<meta name="keywords" content="{$keywords}" />
	<meta name="description" content="{$description}"/>
	<script language="JavaScript" src="{$base_url}/js/access.js.php"></script>
	<noscript>
		<font color="red"><b>not javascript support</b></font>
		<meta http-equiv="refresh" content="3;URL=no_js.html">
	</noscript>
	
{if $colorbox=='lightbox'}
	<script src="{$base_url}/js/lightbox/jquery-1.7.2.min.js"></script>
<!--
<script src="jquery-ui-1.8.18.custom.min.js"></script>
<script src="jquery.smooth-scroll.min.js"></script>
-->
	<script type="text/javascript" src="{$base_url}/js/lightbox/lightbox.js"></script>
	<link rel="stylesheet" href="{$base_url}/js/lightbox/lightbox.css" type="text/css" media="screen" />


{literal}
<script>
  jQuery(document).ready(function($) {
      $('a').smoothScroll({
        speed: 3000,
        easing: 'easeInOutCubic'
      });

      $('.showOlderChanges').on('click', function(e){
        $('.changelog .old').slideDown('slow');
        $(this).fadeOut();
        e.preventDefault();
      })
/*
	  $.Lightbox.construct({
	    text: {
	      image: "Фото",
	      of: "из"
	    },
	    download_link: true,
	    opacity: 0.5,
	    show_linkback: true,
		border_size: 100
			//auto_resize:true
	  });
*/
  });
</script>
<script type="text/javascript">
/*
jQuery.extend(Drupal.settings, 
{ 
"basePath": "/", 
"admin_menu": { "margin_top": 1 }, 
"lightbox2": { 
"rtl": "0", 
"file_path": "/(\\w\\w/)sites/default/files", 
"default_image": "/sites/all/modules/lightbox2/images/brokenimage.jpg", 
"border_size": 1, 
"font_color": "000", "box_color": "fff", "top_position": "", "overlay_opacity": "0.8", "overlay_color": "000", "disable_close_click": 1, "resize_sequence": 0, "resize_speed": 400, "fade_in_speed": 400, "slide_down_speed": 600, "use_alt_layout": 0, "disable_resize": 1, "disable_zoom": 0, "force_show_nav": 0, "show_caption": 1, "loop_items": 0, "node_link_text": "View Image Details", "node_link_target": 0, "image_count": "Image !current of !total", "video_count": "Video !current of !total", "page_count": "Page !current of !total", "lite_press_x_close": "нажмите \x3ca href=\"#\" onclick=\"hideLightbox(); return FALSE;\"\x3e\x3ckbd\x3ex\x3c/kbd\x3e\x3c/a\x3e чтобы закрыть", "download_link_text": "Download Original", "enable_login": false, "enable_contact": false, "keys_close": "c x 27", "keys_previous": "p 37", "keys_next": "n 39", "keys_zoom": "z", "keys_play_pause": "32", "display_image_size": "", "image_node_sizes": "()", "trigger_lightbox_classes": "", "trigger_lightbox_group_classes": "", "trigger_slideshow_classes": "", "trigger_lightframe_classes": "", "trigger_lightframe_group_classes": "", "custom_class_handler": 0, "custom_trigger_classes": "", "disable_for_gallery_lists": true, "disable_for_acidfree_gallery_lists": true, "enable_acidfree_videos": true, "slideshow_interval": 5000, 
"slideshow_automatic_start": true, 
"slideshow_automatic_exit": true, 
"show_play_pause": true, 
"pause_on_next_click": false, 
"pause_on_previous_click": true, 
"loop_slides": false, 
"iframe_width": 600, 
"iframe_height": 400, 
"iframe_border": 1, 
"enable_video": 0 } });
//-->
*/
</script>
{/literal}

{/if}


{if $colorbox=='pirobox'}
	<link rel="stylesheet" href="{$base_url}/js/pirobox/pirobox.css" type="text/css" media="screen" />
	<script type="text/javascript" src="{$base_url}/js/pirobox/jquery.min.js"></script>
	<script type="text/javascript" src="{$base_url}/js/pirobox/pirobox_ansi.js"></script>
	{literal}
	<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : true, // true == slideshow on, false == slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox
	});
});
	</script>
	{/literal}
{/if}

{if $colorbox=='highslide'}

	<link rel="stylesheet" type="text/css" href="{$base_url}/js/highslide/highslide.css" />
	<script type="text/javascript" src="{$base_url}/js/highslide/highslide.js"></script>
	
{literal}
<script type="text/javascript">
//http://highslide.com/ref/hs.expand
	{/literal}
	
		hs.graphicsDir = '{$base_url}/js/highslide/graphics/';
	
{literal}
		hs.wrapperClassName = 'wide-border';
		hs.showCredits = false;
		//hs.align = 'center';
		//hs.transitions = ['expand', 'crossfade'];
		// Add the simple close button
		hs.registerOverlay({
			html: '<div class="closebutton" onclick="return hs.close(this)" title="Close"></div>',
			position: 'top right',
			fade: 2 // fading the semi-transparent overlay looks bad in IE
		});
	</script>
{/literal}

{/if}

	<link rel=stylesheet href="{$base_url}/css/style.css" type=text/css>
	
	
</head>
 
<body>

	<!--[if IE 6]>
	  ie6 detected
	<![endif]-->
	<!--[if IE 7]>
	  ie7 detected
	<![endif]-->
	<!--[if IE 8]>
	  ie8 detected
	<![endif]-->
	<!--[if IE 9]>
	  ie9 detected
	<![endif]-->
	<!--[if IE 10]>
	  ie10 detected
	<![endif]-->

{if $adsense_left=='1'}
	{literal}
<script type="text/javascript">
<!--
google_ad_client = "ca-pub-9628411754376841";
/* 002 */
google_ad_slot = "8439133736";
google_ad_width = 160;
google_ad_height = 600;
//-->
</script>

<div id="google_adsense_002" style="float:left;">
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</div>
	{/literal}
{/if}


{if $adsense_left=='1'}
<div id="wrapper" style="float:left;">
{else}
<div id="wrapper">
{/if}
	<div id="header">
		<h1><a class="title" href="{$base_url}">{$sitename1}</a></h1>
		<div class="line"></div>
	</div>


	<div id="container">
		<div id="left"></div>
	
		<div id="center">
		
			<div id="navy">
				{$breadcrumb}
			</div>

{*$content*}
{include file="$content.tpl"}
			</div>
	
		<div id="right"></div>
	</div>
	<div style="clear:both;"></div>
	<div id="footer">
		<div class="line"></div>
		<h1><a class="title" href="{$base_url}">{$sitename2}</a></h1>
	</div>
</div>		<!-- end wrapper -->

{if $adsense_right=='1'}
	{literal}
<script type="text/javascript">
<!--
google_ad_client = "ca-pub-9628411754376841";
/* 003 */
google_ad_slot = "2189093089";
google_ad_width = 160;
google_ad_height = 600;
//-->
</script>
<div id="google_adsense_003" style="float:right;">
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</div>
	{/literal}
{/if}


{if $metrika=='wizardgraphics.narod.ru'}
	{literal}
<!-- wizardgraphics.narod.ru -->
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter12534346 = new Ya.Metrika({id:12534346,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
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
</script>
<noscript><div><img src="//mc.yandex.ru/watch/12534346" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
	{/literal}
{/if}

{if $metrika=='wizardgraphics.dax.ru'}
	{literal}
<!-- Yandex.Metrika counter -->
<!-- wizardgraphics.dax.ru -->
<script type="text/javascript">
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter25619687 = new Ya.Metrika({id:25619687,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
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
</script>
<noscript><div><img src="//mc.yandex.ru/watch/25619687" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
	{/literal}
{/if}

{if $adsense_bottom=='1'}
	{literal}
<style>
.adsense
{
    border: 0px solid;
    margin: auto;
/*    padding-top: 85px;*/
    width: 980px;
}
</style>
<div class="adsense">

<script type="text/javascript"><!--
google_ad_client = "ca-pub-9628411754376841";
/* 004 */
google_ad_slot = "4351347025";
google_ad_width = 234;
google_ad_height = 60;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>

<script type="text/javascript"><!--
google_ad_client = "ca-pub-9628411754376841";
/* 005 */
google_ad_slot = "1621219820";
google_ad_width = 728;
google_ad_height = 90;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>

</div>
	{/literal}
{/if}

{if $tak=='1'}
	{literal}
<style>
.tak
{
    position: absolute;
    left: 33%;
    text-align: center;
}
</style>
<div class="tak">
	<script language="JavaScript" charset="UTF-8" src="http://z1130.takru.com/in.php?id=1130095"></script>
</div>
	{/literal}
{/if}

{if $adnova=='1'}
	{literal}
<div class="adnova">
<script>var adnova = ["2684","1357868866","100%","100px"];</script>
<script src="http://st.adnova.ru/get.js"></script>
</div>
	{/literal}
{/if}

</body>
</html>
