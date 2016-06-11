<html>
<head>
<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
	<meta name="keywords" content="{KEYWORDS}" />
	<meta name="description" content="{DESCRIPTION}"/>
	<title>{TITLE}</title>
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
	<script language="JavaScript" src="/pages/js/access.js.php"></script>
<! -- ======================================= -->
<!-- общие стили -->
	<link rel="stylesheet" href="{CSS_PAGER}" type="text/css" />
	<link rel="stylesheet" href="{CSS_STYLES}" type="text/css" />
<!-- стили для размеров текстовой колонки-->
	<link rel="stylesheet" href="<!--{CSS_STYLES_1024}-->" type="text/css" />

	<!--<base href="{URL_IMG}">-->
</head>
<body>

<!-- ======================================= -->
<!--{YA_METRIKA}-->
<!-- ======================================= -->


<div class="page">

<!--{PAGER_START}-->
<!-- ======================================= -->
<!-- PAGER											  -->
<!-- ======================================= -->

<div class="pager">
		<a href="{INDEX}">^</a>
		<div class="more">
	<!--{URL_LIST}-->
		</div>

		<h2>{TITLE2}</h2>

		<div class="nav_pager">
			<div class="nav_prev">
				<a href="{PREV_URL}"><<</a>
			</div>

			<div class="nav_list">
				<span class="nav_txt">страница</span>
	<!--{PAGE_LIST_START}-->
				<a href="{FILENAME}">{LIST_NUM_PAGE}</a>
	<!--{PAGE_LIST_END}-->
			</div>

			<div class="nav_next">
				<a href="{NEXT_URL}">>></a>
			</div>

		</div>
</div>
<!-- ======================================= -->
<!-- <div class="num_page_top">{NUM_PAGE}</div> -->
<!--{PAGER_END}-->

	<div class="picture_column">
<!--{PICTURE_START}-->
		<div class="picture">
			<a href="{URL_IMG2}{IMG}" title="<!--{IMG_TITLE}-->" rel="gallery" class="pirobox_gall">
				<img src="{URL_IMG3}{IMG}" alt="<!--{IMG_TITLE}-->"></a>
				<div class="resize">увеличить в 
					<a href="#"></a>2x 
					<a href="{URL_IMG2}{IMG}" rel="gallery" class="pirobox_gall">3x</a> 
					<a href="#"></a>4x
				</div>
				<br/>
			<p><!--{IMG_TITLE}--><br/><!--{IMG_TITLE_DATE}--></p>
			<p><!--{IMG_TITLE_AUTHOR}--><br/><!--{INFO}--></p>
<!--
<center>
			<a href="{URL_IMG1}/{IMG}" target="_blank">full size image</a>
</center>
-->
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

