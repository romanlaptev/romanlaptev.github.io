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

<!-- общие стили -->
	<link rel="stylesheet" href="{CSS_STYLES}" type="text/css" />
<!-- стили для размеров текстовой колонки-->
	<link rel="stylesheet" href="<!--{CSS_STYLES_1024}-->" type="text/css" />

<!--<base href="{URL_IMG}">-->
</head>
<body>

<!-- ======================================= -->
<!--{YA_METRIKA}-->
<!-- ======================================= -->

<div class="pager"><!--{PAGER}--></div>
<div class="num_page_top">{NUM_PAGE}</div>
<div class="page">
	<div class="text_column">

<h2><!--{BOOK_TITLE}--></h2>

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
			<a href="{URL_IMG}/w1024/{IMG_NAME}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall"><img src="{URL_IMG}/w300/{IMG_NAME}"></a>
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

