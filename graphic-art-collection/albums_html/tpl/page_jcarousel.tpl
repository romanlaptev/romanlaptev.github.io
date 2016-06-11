<html>
<head>
<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
	<meta name="keywords" content="{KEYWORDS}" />
	<meta name="description" content="{DESCRIPTION}"/>
<title>{TITLE}</title>

<script type="text/javascript" src="{JS_LOCATION}/lib/jquery.min.js"></script>
<! -- ======================================= -->
<link rel="stylesheet" href="{JS_LOCATION}/pirobox/pirobox.css" type="text/css" media="screen" />
<script type="text/javascript" src="{JS_LOCATION}/pirobox/jquery.min.js"></script>
<script type="text/javascript" src="{JS_LOCATION}/pirobox/pirobox_ansi.js"></script>
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
<! -- ======================================= -->

<script type="text/javascript" src="{JS_LOCATION}/jCarousel/imgbubbles.js">

/***********************************************
* Image Bubbles effect- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for this script and 100s more
***********************************************/
</script>
<script type="text/javascript">
	jQuery(document).ready(
		function($)
		  {
			//$('ul#mycarousel').imgbubbles({factor:1.1})//add bubbles effect to UL id="mycarousel"
		  })
</script>

<! -- ======================================= -->

<style>
#mycarousel li
{
	border:0px solid;
	width: 210px;
	height: 450px;
	margin-right:20px;
}

#mycarousel li a img
{
	border:0px;
}

.tooltip
{
	text-align:center;
	font-size:12px;
}
</style>

<style>
.jcarousel-skin-tango .jcarousel-container {
   border-radius: 10px;
    background: #F0F6F9;
    border: 1px solid #346F97;
}

.jcarousel-skin-tango .jcarousel-direction-rtl {
	direction: rtl;
}

.jcarousel-skin-tango .jcarousel-container-horizontal {
    border: 0px solid red;
    width: 800px;
	margin:auto;
	/*padding-left: 20px;*/
	padding-top: 20px;
	padding-bottom: 20px;
}

.jcarousel-skin-tango .jcarousel-clip {
    overflow: hidden;
}

.jcarousel-skin-tango .jcarousel-clip-horizontal {
    border: 0px solid blue;
    width: 690px;
    /*height: 150px;*/
	margin:auto;
}

.jcarousel-skin-tango .jcarousel-item {
    width: 320px;
    height: 420px;
}

.jcarousel-skin-tango .jcarousel-item-horizontal {
	margin-left: 0;
    margin-right: 10px;
	margin-bottom: 15px;
}

.jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-item-horizontal {
	margin-left: 10px;
    margin-right: 0;
}

.jcarousel-skin-tango .jcarousel-item-placeholder {
    background: #fff;
    color: #000;
}

/**
 *  Horizontal Buttons
 */
.jcarousel-skin-tango .jcarousel-next-horizontal {
    position: absolute;
    top: 43px;
    right: 5px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: transparent url({JS_LOCATION}/jCarousel/next-horizontal.png) no-repeat 0 0;
}

.jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-next-horizontal {
    left: 5px;
    right: auto;
    background-image: url({JS_LOCATION}/jCarousel/prev-horizontal.png);
}

.jcarousel-skin-tango .jcarousel-next-horizontal:hover,
.jcarousel-skin-tango .jcarousel-next-horizontal:focus {
    background-position: -32px 0;
}

.jcarousel-skin-tango .jcarousel-next-horizontal:active {
    background-position: -64px 0;
}

.jcarousel-skin-tango .jcarousel-next-disabled-horizontal,
.jcarousel-skin-tango .jcarousel-next-disabled-horizontal:hover,
.jcarousel-skin-tango .jcarousel-next-disabled-horizontal:focus,
.jcarousel-skin-tango .jcarousel-next-disabled-horizontal:active {
    cursor: default;
    background-position: -96px 0;
}

.jcarousel-skin-tango .jcarousel-prev-horizontal {
    position: absolute;
    top: 43px;
    left: 5px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: transparent url({JS_LOCATION}/jCarousel/prev-horizontal.png) no-repeat 0 0;
}

.jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-prev-horizontal {
    left: auto;
    right: 5px;
    background-image: url({JS_LOCATION}/jCarousel/next-horizontal.png);
}

.jcarousel-skin-tango .jcarousel-prev-horizontal:hover, 
.jcarousel-skin-tango .jcarousel-prev-horizontal:focus {
    background-position: -32px 0;
}

.jcarousel-skin-tango .jcarousel-prev-horizontal:active {
    background-position: -64px 0;
}

.jcarousel-skin-tango .jcarousel-prev-disabled-horizontal,
.jcarousel-skin-tango .jcarousel-prev-disabled-horizontal:hover,
.jcarousel-skin-tango .jcarousel-prev-disabled-horizontal:focus,
.jcarousel-skin-tango .jcarousel-prev-disabled-horizontal:active {
    cursor: default;
    background-position: -96px 0;
}
</style>

<script type="text/javascript" src="{JS_LOCATION}/jCarousel/jquery.jcarousel.min.js"></script>
<script type="text/javascript">
//jQuery(document).ready(function() {
//    jQuery('#mycarousel').jcarousel();
//});

function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

jQuery(document).ready(function() {
    jQuery('#mycarousel').jcarousel({
        auto: 1,
        scroll:1,
        wrap: 'both',
        animation: 1200,
        initCallback: mycarousel_initCallback
    });
});
</script>

	<link rel="stylesheet" href="{CSS_STYLES}" type="text/css" />
	<!--<base href="{URL_IMG}">-->
</head>

<body>

<!-- ====================================================== -->
<!-- roman-laptev.narod.ru -->
<!-- Yandex.Metrika counter -->
<!--
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter9372961 = new Ya.Metrika({id:9372961, enableAll: true, webvisor:true});
        }
        catch(e) { }
    });
})(window, "yandex_metrika_callbacks");
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script>
<noscript><div><img src="//mc.yandex.ru/watch/9372961" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
-->
<!-- /Yandex.Metrika counter -->

<!-- ====================================================== -->
<!-- blackcat.far.ru -->
<!-- Yandex.Metrika counter -->
<!--
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter10439389 = new Ya.Metrika({id:10439389, enableAll: true, webvisor:true});
        }
        catch(e) { }
    });
})(window, "yandex_metrika_callbacks");
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script>
<noscript><div><img src="//mc.yandex.ru/watch/10439389" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
-->
<!-- /Yandex.Metrika counter -->

<!-- ====================================================== -->
<!-- wizardgraphics.dax.ru -->
<!-- Yandex.Metrika counter -->
<!--
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter11707375 = new Ya.Metrika({id:11707375, enableAll: true, webvisor:true});
        }
        catch(e) { }
    });
})(window, "yandex_metrika_callbacks");
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script>
<noscript><div><img src="//mc.yandex.ru/watch/11707375" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
-->
<!-- /Yandex.Metrika counter -->

<!-- ====================================================== -->
<!-- blackcat.hop.ru -->
<!-- Yandex.Metrika counter -->
<!--
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter10438756 = new Ya.Metrika({id:10438756, enableAll: true, webvisor:true});
        }
        catch(e) { }
    });
})(window, "yandex_metrika_callbacks");
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script>
<noscript><div><img src="//mc.yandex.ru/watch/10438756" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
-->
<!-- /Yandex.Metrika counter -->
<!-- ====================================================== -->

<!-- =========================================== -->

<div class="pager_start_page"><a href="../">up</a></div>
<div class="page">
	<ul id="mycarousel" class="jcarousel-skin-tango">

<!--{PICTURE_START}-->
<!-- =========================================== -->
		<li>
			<a href="{URL_IMG}/middle/{IMG2}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall">
				<img src="{URL_IMG}/w200px/{IMG1}" alt="">

				<div class="tooltip">
					<p>{IMG_TITLE_AUTHOR}<br>
					{IMG_TITLE}<br>
					{IMG_TITLE_DATE}</p>
					<a href="{URL_IMG}/big/{IMG3}" target="_blank">full size image</a>
				</div>
			</a>
		</li>
<!-- =========================================== -->
<!--{PICTURE_END}-->

	 </ul>
	<div class="clear_both"></div>
</div> <!-- end page -->

</body>
</html>

