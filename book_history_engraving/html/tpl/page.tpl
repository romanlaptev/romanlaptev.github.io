<html>
<head>
<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
<meta name="keywords" content="{KEYWORDS}" />
<meta name="description" content="{DESCRIPTION}"/>
<title>{TITLE}</title>

<!-- ========PIROBOX======================== -->
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
<!-- ======================================= -->

<!-- общие стили -->
	<link rel="stylesheet" href="<!--{CSS_STYLES}-->" type="text/css" />
	<link rel="stylesheet" href="<!--{CSS_PAGER}-->" type="text/css" />
	<link rel="stylesheet" href="<!--{CSS_FILTER_TEXT}-->" type="text/css" />

<!--<base href="{URL_IMG}">-->
</head>
<body>
<a name="top">

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
|<a href="http://gravura.ts6.ru/drupal/?q=list_albums"> Альбомы</a>
		</div>

		<div class="nav_pager">

<!--			<a href="{PREV_URL}"><div class="nav_prev">	<<	</div></a> -->
			<a href="{PREV_URL}">
				<div class="left-arrow">
					<div class="corner">
						<div class="right-corner"></div>
						<div class="clear"></div>
						<div class="right-corner2"></div>
					</div>
					<div class="block1"></div>
					<div class="block2"></div>
				</div>
			</a>

			<div class="nav_index">
				<span class="nav_txt">страница</span>
	<!--{PAGE_LIST_START}-->
				<a href="{FILENAME}">{LIST_NUM_PAGE}</a>
	<!--{PAGE_LIST_END}-->

<!-- ======================================= -->
	<div class="search_form">
		<form name=form_search method=post action="/php/search_db_site.php" target=_blank>
	<input type='hidden'  name='xml_file' size='50' value='../pages/xml/db_site.xml'><br><br>
	<div style='display:none;'>
	<fieldset>
		<legend><b>Выбор книги (book_name)</b></legend>
		<p>
			<input type='checkbox'  name='book_name[]' size='20' value='german_engraving' checked >german_engraving<br>
			<input type='checkbox'  name='book_name[]' size='20' value='netherlandish_engraving' checked>netherlandish_engraving<br>
			<input type='checkbox'  name='book_name[]' size='20' value='italian_engraving' checked>italian_engraving		<br>
			<input type='checkbox'  name='book_name[]' size='20' value='french_engraving_15_17' checked>french_engraving_15_17<br>
			<input type='checkbox'  name='book_name[]' size='20' value='06.French_engraving_18th' checked>06.French_engraving_18th<br>
			<input type='checkbox'  name='book_name[]' size='20' value='japanese_colour_prints' checked>japanese_colour_prints	<br>
			<input type='checkbox'  name='book_name[]' size='20' value='book_Beardsley' checked>book_Beardsley			<br>
		</p>
	</fieldset>
	</div>
Поиск по страницам:	<input type='text'  name='search_txt' size='60' value=''>
	<input type='hidden' name='action' value='search'>
	<input type=submit value='>>'>
<!--
	<div class="query">
		<base target="_blank"/>
		- <a href="/php/search_db_site.php?action=search&search_txt=Дюрер">Дюрер</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Шонгауэр">Шонгауэр</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Лука Лейденский">Лука Лейденский</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Тьеполо">Тьеполо</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Кастильоне">Кастильоне</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Пармиджанино">Пармиджанино</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Калло">Калло</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Госсарт">Госсарт</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Буше">Буше</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Харунобу">Харунобу</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=рококо">рококо</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=кьяроскуро">кьяроскуро</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=chiaroscuro">chiaroscuro</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Ars moriendi">Ars moriendi</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=блочные книги">блочные книги</a>
		- <a href="/php/search_db_site.php?action=search&search_txt=Обри Винсент Бердслей">Обри Винсент Бердслей</a>
		<base target=""/>
	</div>
-->
		</form>
	</div><!-- end search_form -->
<!-- ======================================= -->
			</div><!-- end nav_index -->

<!--			<a href="{NEXT_URL}"><div class="nav_next">	>>	</div></a> -->
			<a href="{NEXT_URL}">
				<div class="right-arrow">
					<div class="block22"></div>
					<div class="block21"></div>
					<div class="corner">
						<div class="left-corner"></div>
						<div class="clear"></div>
						<div class="left-corner2"></div>
					</div>
				</div>
			</a>

		</div><!-- end nav_pager -->
</div><!-- end pager -->

<!-- ======================================= -->
<!-- <div class="num_page_top">{NUM_PAGE}</div> -->
<!--{PAGER_END}-->

<div class="notebook_page">
<table>
	<tr>
		<td valign="top" class="text_col">
			<div class="text_column">

				<h2>{TITLE_PAGE}</h2>
				<h2><!--{BOOK_TITLE}--></h2>

<!--{TEXT_COLUMN_START}-->
				<p>	{PARAGRAPH}

<!--{NOTE_START}-->
					<span class="notes">({NOTE})</span>
<!--{NOTE_END}-->

				</p>
<!--{TEXT_COLUMN_END}-->

			</div><!-- end text column -->
		</td>

		<td valign="top">
			<div class="picture_column">
<!--{PICTURE_START}-->
				<div class="picture">
<!--			<a href="{URL_IMG2}/w1024/{IMG_NAME}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall"><img src="{URL_IMG}/w300/{IMG_NAME}"></a>-->
					<a href="{URL_IMG2}{IMG}" title="{IMG_TITLE}" rel="gallery" class="pirobox_gall">
						<img src="{URL_IMG3}{IMG}" alt="{IMG_TITLE}">
					</a>
					<span class="resize">увеличить в 
						<a href="{URL_IMG4}{IMG}" rel="gallery" class="pirobox_gall">2x</a> 
						<a href="{URL_IMG2}{IMG}" rel="gallery" class="pirobox_gall">3x</a> 
						<a href="{URL_IMG5}{IMG}" rel="gallery" class="pirobox_gall">4x</a>
					</span>
					<br/>

					<p>{IMG_TITLE}</p>
			<!--<p>{IMG_TITLE_AUTHOR}<br>{IMG_TITLE}<br>{IMG_TITLE_DATE}</p>-->
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
		</td>

	</tr>
</table>
</div><!-- end notebook_page -->

	<div class="clear_both"></div>
</div> <!-- end page -->


<div class="num_page_bottom">
<!--
{NUM_PAGE}
-->
	<p><a href="#top">в начало страницы</a></p>
<span class="created">Last modified:<!--{LAST MODIFIED}--></span>
</div>
<!-- =========================================== -->

</body>
</html>

