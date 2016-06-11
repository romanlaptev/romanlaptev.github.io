<html>
<head>
<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
	<meta name="keywords" content="{KEYWORDS}" />
	<meta name="description" content="{DESCRIPTION}"/>
	<title>{TITLE}</title>
<! -- ======================================= -->
	<link rel="stylesheet" type="text/css" media="screen" href="/pages/js/highslide/resources/css/gallery.css" />	
	<link rel="stylesheet" type="text/css" href="/pages/js/highslide/resources/highslide/highslide.css" />
	<script type="text/javascript" src="/pages/js/highslide/resources/highslide/highslide.js"></script>
	<script language="JavaScript" src="/pages/js/access.js.php"></script>
	<script type="text/javascript">
		// 		hs.graphicsDir = './resources/highslide/graphics/';
		hs.transitions = ['expand', 'crossfade'];
		hs.restoreCursor = null;
		hs.lang.restoreTitle = 'Click for next image';
	
		hs.showCredits = false;
		
		hs.lang = {
		   loadingText : 'loadingTextloadingTextloadingText',
		   loadingTitle : 'loadingTitleloadingTitleloadingTitle',
		   number: ''
		};
		// Add the slideshow providing the controlbar and the thumbstrip
		hs.addSlideshow({
			//slideshowGroup: 'group1',
			interval: 3000,
			repeat: false,
			useControls: true,
			overlayOptions: {
				position: 'bottom right',
				offsetY: 50
			},
			thumbstrip: {
				position: 'above',
				mode: 'horizontal',
				//mode: 'vertical',
				relativeTo: 'expander'
			}
		});
	
		// Options for the in-page items
		var inPageOptions = {
			//slideshowGroup: 'group1',
			outlineType: null,
			allowSizeReduction: false,
			//allowSizeReduction: true,
			wrapperClassName: 'in-page controls-in-heading',
			useBox: true,
			width: 800,
			height: 500,
			targetX: 'gallery-area 0px',
			targetY: 'gallery-area 0px'
			}
	
		// Open the first thumb on page load
		hs.addEventListener(window, 'load', function() {
			document.getElementById('img001').onclick();
		});
	
		// Cancel the default action for image click and do next instead
		hs.Expander.prototype.onImageClick = function() {
			if (/in-page/.test(this.wrapper.className))	return hs.next();
		}

		// Under no circumstances should the static popup be closed
		hs.Expander.prototype.onBeforeClose = function() {
			if (/in-page/.test(this.wrapper.className))	return false;
		}
		// ... nor dragged
		hs.Expander.prototype.onDrag = function() {
			if (/in-page/.test(this.wrapper.className))	return false;
		}

		// Keep the position after window resize
	    hs.addEventListener(window, 'resize', function() {
			var i, exp;
			hs.page = hs.getPageSize();
	
			for (i = 0; i < hs.expanders.length; i++) {
				exp = hs.expanders[i];
				if (exp) {
					var x = exp.x,
						y = exp.y;
	
					// get new thumb positions
					exp.tpos = hs.getPosition(exp.el);
					x.calcThumb();
					y.calcThumb();
	
					// calculate new popup position
			 		x.pos = x.tpos - x.cb + x.tb;
					x.scroll = hs.page.scrollLeft;
					x.clientSize = hs.page.width;
					y.pos = y.tpos - y.cb + y.tb;
					y.scroll = hs.page.scrollTop;
					y.clientSize = hs.page.height;
					exp.justify(x, true);
					exp.justify(y, true);
	
					// set new left and top to wrapper and outline
					exp.moveTo(x.pos, y.pos);
				}
			}
		});
	</script>
<! -- ======================================= -->
<!-- общие стили -->
	<link rel="stylesheet" href="<!--{CSS_PAGER}-->" type="text/css" />
	<link rel="stylesheet" href="<!--{CSS_STYLES}-->" type="text/css" />


<style>
.info
{
	font-size:12px;
}
body
{
	/*background:#333340 !important;*/
}

.highslide-caption, 
.highslide-wrapper, 
.highslide-outline 
{ 
	background-color: transparent !important; 
	border-color: transparent !important; 
}
		
#gallery-area 
{
	width: 800px !important;
/*
	height: 600px !important;
*/
	margin: 0 auto 20px !important;
	background-color: #FFFFFF !important;
	border: 0px solid red !important;
	overflow: hidden !important;
}
			
.controls-in-heading .highslide-heading 
{
	height: 16px;
	padding: 0 0 0 0;
	background: url(/pages/js/highslide/resources/images/sb_000000_icons.png) no-repeat 0 0;
}
		
.controls-in-heading .highslide-controls 
{
	width: 48px;
	height: 16px;
	border: 0px solid red !important;
}
		
.controls-in-heading .highslide-controls ul 
{
	height: 16px;
}
		
.controls-in-heading .highslide-controls a 
{
	background-image: url(/pages/js/highslide/resources/images/sb_000000_icons.png);
	height: 16px;
	width: 16px;
}
		
.controls-in-heading .highslide-controls .highslide-move, 
.controls-in-heading .highslide-controls .highslide-full-expand, 
.controls-in-heading .highslide-controls .highslide-close 
{
	display: none;
}
		
.controls-in-heading .highslide-controls .highslide-previous a 
{
	background-position: -48px 0;
}

.controls-in-heading .highslide-controls .highslide-previous a:hover 
{
	background-position: -48px 0;
}

.controls-in-heading .highslide-controls .highslide-previous a.disabled 
{
	background-position: -48px 0 !important;
}

.controls-in-heading .highslide-controls .highslide-play a 
{
	background-position: -16px 0;
}

.controls-in-heading .highslide-controls .highslide-play a:hover 
{
	background-position: -16px 0;
}

.controls-in-heading .highslide-controls .highslide-play a.disabled 
{
	background-position: 0 0 !important;
}

.controls-in-heading .highslide-controls .highslide-pause a 
{
	background-position: 0 0;
}

.controls-in-heading .highslide-controls .highslide-pause a:hover 
{
	background-position: 0 0;
}

.controls-in-heading .highslide-controls .highslide-next a 
{
	background-position: -32px 0;
}

.controls-in-heading .highslide-controls .highslide-next a:hover 
{
	background-position: -32px 0;
}

.controls-in-heading .highslide-controls .highslide-next a.disabled 
{
	background-position: -32px 0 !important;
}

.controls-in-heading .highslide-controls .highslide-full-expand a 
{
	background-position: -100px 0;
}

.controls-in-heading .highslide-controls .highslide-full-expand a:hover 
{
	background-position: -100px 0;
}

.controls-in-heading .highslide-controls .highslide-full-expand a.disabled 
{
	background-position: -100px 0 !important;
}

.controls-in-heading .highslide-controls .highslide-close a 
{
	background-position: -64px 0;
}

.controls-in-heading .highslide-controls .highslide-close a:hover 
{
	background-position: -64px 0;
}

</style>

</head>
<body>

<!-- ======================================= -->
<!--{YA_METRIKA}-->
<!-- ======================================= -->


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
</div>
<!-- ======================================= -->
<!--{PAGER_END}-->

<div class="highslide-gallery">
<div class="hidden-container">

<!--{PICTURE_URLBOX_START}-->
	<a id="img00{NUM_PAGE}" class="highslide" href="{URL_IMG4}{IMG}" onclick="return hs.expand(this, inPageOptions)">
		<img src="{URL_IMG3}{IMG}" alt="<!--{IMG_TITLE}-->"/></a>
		<div class="highslide-caption">
			<p><!--{IMG_TITLE}-->&nbsp;<!--{IMG_TITLE_DATE}--></p>
			<p><!--{IMG_TITLE_AUTHOR}--><span class="info"><!--{INFO}--></span></p>
		</div>
<!--{PICTURE_URLBOX_END}-->

<!--{PICTURE_URL_START}-->
		<div class="picture">
			<a href="<!--{URL}-->"><img src="{URL_IMG3}{IMG}" alt="<!--{IMG_TITLE}-->"></a>
			<br/>
			<p><!--{IMG_TITLE}-->&nbsp;<!--{IMG_TITLE_DATE}--></p>
			<p><!--{IMG_TITLE_AUTHOR}--><br/><span class="info"><!--{INFO}--></span></p>
		</div>
<!--{PICTURE_URL_END}-->

</div>
<div id="gallery-area"></div>
<div class="clear"></div>
</div> <!-- /highslide-gallery -->


</body>
</html>

