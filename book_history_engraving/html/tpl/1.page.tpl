<html>
<head>
<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
<meta name="keywords" content="{KEYWORDS}" />
<meta name="description" content="{DESCRIPTION}"/>
<title>{TITLE}</title>

<!-- ======================================= -->
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
<!-- ======================================= -->

<link rel="stylesheet" href="{CSS_STYLES}" type="text/css" />
<!--<base href="{URL_IMG}">-->
</head>
<body>

<! -- ======================================= -->
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
<! -- ======================================= -->
<!-- Yandex.Metrika counter -->
<!-- roman-laptev.narod2.ru-->
<!-- 
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript"></script>
<div style="display:none;"><script type="text/javascript">
try { var yaCounter11996368 = new Ya.Metrika({id:11996368,
          trackLinks:true,
          accurateTrackBounce:true, webvisor:true});}
catch(e) { }
</script></div>
<noscript><div><img src="//mc.yandex.ru/watch/11996368" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
-->
<!-- /Yandex.Metrika counter -->

<! -- ======================================= -->

<! -- ======================================= -->
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
<!-- =========================================== -->

<! -- ======================================= -->
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
<! -- ======================================= -->

<! -- ======================================= -->
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
<!-- =========================================== -->

<div class="pager"><!--{PAGER}--></div>
<div class="num_page_top">{NUM_PAGE}</div>
<div class="page">
	<div class="text_column">

<!--{TEXT_COLUMN_START}-->
			<p>	{PARAGRAPH}

<!--{NOTE_START}-->
				<span class="notes">({NOTE})</span>
<!--{NOTE_END}-->

			</p>
<!--{TEXT_COLUMN_END}-->

	</div><!-- end text column -->
	<div class="picture_column">

<!--{PICTURE_START}-->
		<div class="picture">
			<a href="{URL_IMG}/middle/{IMG_NAME}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall"><img src="{URL_IMG}/small/{IMG_NAME}"></a>
			<p>{IMG_TITLE}</p>
			<p>
<!--				детали ({FILESIZE})-->
<!--				{FILESIZE}-->
<!--{DETAILS_START}-->
				<a href="{URL_IMG_DETAILS}" target="_blank">url</a>
<!--{DETAILS_END}-->
			</p>
		</div>
<!--{PICTURE_END}-->

	</div> <!-- end picture column -->

	<div class="clear_both"></div>
</div> <!-- end page -->

<!--
<div class="num_page_bottom">{NUM_PAGE}</div>
-->
<!-- =========================================== -->

</body>
</html>

