<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=<!--{CHARSET}-->" />
	<meta name="keywords" content="<!--{KEYWORDS}-->" />
	<meta name="description" content="<!--{DESCRIPTION}-->"/>
	<title><!--{TITLE}--></title>

	<link rel="stylesheet" href="<!--{CSS_STYLES}-->" type="text/css" />
<!--[if lte IE 8]>
	<link rel="stylesheet" href="<!--{CSS_STYLES_FIX-IE}-->" type="text/css" />
<![endif]-->

<!-- ===============highslide================= -->
<link rel="stylesheet" type="text/css" href="<!--{JS_LOCATION}-->/highslide/highslide.css" />
<script type="text/javascript" src="<!--{JS_LOCATION}-->/highslide/highslide.js"></script>
<script type="text/javascript">
//http://highslide.com/ref/hs.expand
	hs.graphicsDir = '<!--{JS_LOCATION}-->/highslide/graphics/';
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
	// Open the first thumb on page load
/*
	hs.addEventListener(window, 'load', function() {
		document.getElementById('img001').onclick();
	});
*/
</script>
<!-- ======================================= -->
	<script language="JavaScript" src="/pages/js/access.js.php"></script>

<script>
function preview_img(id)
{
//alert (img_src);
	var preview_img = document.getElementById('preview_img'); //получить слой для вывода увеличенной картинки
	var prep_img = document.getElementById(id); //Получить слой с подготовленной картинкой по id слоя
//alert (prep_img.outerHTML);
//alert (prep_img.textContent); // не работает в IE
//alert (prep_img.firstChild.nodeValue); // совместимо с IE

	//var childrens = prep_img.childNodes;
	//var preview_img_html = childrens.item(1).outerHTML;
	var preview_img_html = prep_img.getElementsByTagName('div')[0].outerHTML;//получить код подготовленной картинки
//alert (preview_img_html);
	preview_img.innerHTML = preview_img_html; // вставить подготовленную картинку в слой preview_img
//---------------------------------------------------------------------------------------------
	var preview_img_caption = document.getElementById('preview_img_caption'); //получить слой описания под картинкой
//alert (preview_img_caption);

//	var enlarge_links = childrens.item(3).outerHTML;
	var enlarge_links = prep_img.getElementsByTagName('div')[1].outerHTML;
//alert (enlarge_links);
	preview_img_caption.innerHTML = enlarge_links;//Занести highslide-ссылки картинки в слой preview_img_caption
//---------------------------------------------------------------------------------------------
	//var img_description = prep_img.firstChild.nodeValue;
	//preview_img_caption.innerHTML += img_description; //Занести описание картинки в слой preview_img_caption


}
</script>
<noscript>
	<font color="red"><b>not javascript support</b></font>
	<meta http-equiv="refresh" content="0;URL=<!--{NO_JS_LOCATION}-->">
</noscript>

<style>
</style>
</head>

<body onload="preview_img('img0');">
<!-- ======================================= -->
<!--{YA_METRIKA}-->
<!-- ======================================= -->
<div id="square">

<div id="p7">
		<div id="top_arrow">
			<div class="top-corner-left"></div>
			<div class="top-corner-right"></div>
		</div>
		<div id="top_box1"></div>
		<div id="top_box2"></div>
</div><!-- end p7 -->

<div id="p0">
		<div id="left_arrow">
			<div class="left-corner-top"></div>
			<div class="left-corner-bottom"></div>
		</div>
		<div id="left_box1"></div>
		<div id="left_box2"></div>
</div><!-- end p0 -->

<div id="p1"></div>

<div id="p2">
		<div id="title"><!--{TITLE2}--></div>
</div>

<div id="p3">

	<div id="thumb_col">
		<a href="<!--{PREV_URL}-->"><div class="up_arrow"></div></a>

		<div id="thumb_img">
<!--{PICTURE_URL_START}-->
			<div class="picture">
				<a href="#"><img src="<!--{ICON_IMG_PATH}--><!--{IMG}-->" onClick="preview_img('<!--{DIV_IMG}-->');"/></a>
				<div id="<!--{DIV_IMG}-->" class="img_info">
					<div><!-- img for layer preview_img -->
						<a class="highslide" onclick="return hs.expand(this)" href="<!--{FULL_IMG_PATH}--><!--{IMG}-->">
							<img name="" src="<!--{FULL_IMG_PATH_PREVIEW}--><!--{IMG}-->" alt="<!--{IMG_TITLE}-->"/>
						</a>
					</div>
					<div class="resize"><!-- html for layer preview_img_caption -->
						<a class="highslide" onclick="return hs.expand(this)" href="<!--{FULL_IMG_PATH}--><!--{IMG}-->">увеличить</a>
<div class="img_title">
<!--{IMG_TITLE}-->
</div>
					</div>
				</div>
			</div>
<!--{PICTURE_URL_END}-->
		</div><!-- end of thumb_img -->

		<a href="<!--{NEXT_URL}-->"><div class="down_arrow"></div></a>
	</div><!-- end of thumb_col -->

</div><!-- end p3 -->

<div id="p4">
		<div class="img_area">
<!--{PAGER_START}-->
			<div class="pager">страницы: 
	<!--{PAGE_LIST_START}-->
				<a href="<!--{FILENAME}-->"><!--{LIST_NUM_PAGE}--></a>
	<!--{PAGE_LIST_END}-->
			</div>
<!--{PAGER_END}-->
			<div id="preview_img">
				<img name="img_preview" src="" alt=""/>
			</div>
			<div id="preview_img_caption">	</div>
		</div><!-- end img_area -->
</div><!-- end p4 -->


<div id="p5">
		<div id="right_box2"></div>
		<div id="right_box1"></div>
		<div id="right_arrow">
			<div class="right-corner-top"></div>
			<div class="right-corner-bottom"></div>
		</div>
		<div class="more_links">
				Также:<br>
					<a href="http://blackcat.px6.ru/pages/albums/gallery_Muha/">Альфонс Муха</a><br>
					<a href="#">Обри Бердслей</a><br>
					<a href="#">Густав Климт</a><br>
<!--{URL_LIST}-->
		</div>
</div><!-- end p5 -->

<div id="p6">
		<div id="bottom_box"></div>
</div><!-- end p6 -->

</div>


</body>
</html>
