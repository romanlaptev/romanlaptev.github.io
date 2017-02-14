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
	<link rel="stylesheet" href="{CSS_STYLES}" type="text/css" />
	<!--<base href="{URL_IMG}">-->

<style>
.note
{
	color:#ffffff;
}

.nav_index
{
	color:#ffffff;
}
.more
{
	color:#ffffff;
	border-top:1px solid;
	margin-top:10px;
	padding-top:5px;
	padding-left:10px;
	padding-right:10px;
	/*text-align:left;*/
}
</style>

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
		<h2>{TITLE2}</h2>
<!--
		<div class="nav_index">
			<a href="{INDEX}">^</a>
		</div>
-->
		<div class="nav_pager">
			<span class="nav_prev">
				<a href="{PREV_URL}"><<</a>
			</span>
			<span class="note">страница</span>
	<!--{PAGE_LIST_START}-->
				<a href="{FILENAME}">{LIST_NUM_PAGE}</a>
	<!--{PAGE_LIST_END}-->

			<span class="nav_next">
				<a href="{NEXT_URL}">>></a>
			</span>

			<div class="more">
	<!--{URL_LIST}-->
				| <a href="{INDEX}"><<>></a>
			</div>
		</div>
</div>
<!-- ======================================= -->
<!-- <div class="num_page_top">{NUM_PAGE}</div> -->
<!--{PAGER_END}-->

	<div class="picture_column">
<!--{PICTURE_START}-->
		<div class="picture">
			<a href="{URL_IMG}/w1024/{IMG2}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall">
				<img src="{URL_IMG}/w300/{IMG1}" alt="{IMG_TITLE}"></a>
			<p>{IMG_TITLE_AUTHOR}<br>{IMG_TITLE}<br>{IMG_TITLE_DATE}</p>
<!--
<center>
			<a href="{URL_IMG}/big/{IMG3}" target="_blank">full size image</a>
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

