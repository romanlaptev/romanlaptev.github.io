<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

	<!-- blueprint CSS framework -->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/print.css" media="print" />
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/form.css" />

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
<!-- ############################### -->
<?php
//echo "colorbox = ".Yii::app()->params['colorbox'];
//echo "<br>";

	if (Yii::app()->params['colorbox']=='lightbox')
	{
echo "
	<script src='/pages/js/lightbox/jquery-1.7.2.min.js'></script>
	<script type='text/javascript' src='/pages/js/lightbox/lightbox.js'></script>
	<link rel='stylesheet' href='/pages/js/lightbox/lightbox.css' type='text/css' media='screen' />
";
?>
<script>
  jQuery(document).ready(function($) {
//alert(lightbox.innerHTML);
/*
<div class="lb-outerContainer">
<div class="lb-container">
<img class="lb-image">
<div class="lb-nav">
<a class="lb-prev"></a>
<a class="lb-next"></a></div>
<div class="lb-loader">

<a class="lb-cancel">
<img src="images/loading.gif"></a>
</div></div></div>

<div class="lb-dataContainer">
<div class="lb-data">
<div class="lb-details">
<span class="lb-caption">
</span><span class="lb-number">
</span></div><div class="lb-closeContainer"><a class="lb-close"><img src="images/close.png"></a></div></div></div>
*/
/*
	var childrens = lightbox.childNodes;
	var lb_data_container = childrens.item(1).childNodes;
	var lb_data = lb_data_container.item(0).childNodes;
	var lb_closeContainer = lb_data.item(1);
	var lb_close_img = lb_closeContainer.getElementsByTagName('img')[0];
	lb_close_img.src = "/pages/js/lightbox/images/close.png";
*/
	var lb_cancel_img = lightbox.getElementsByTagName('img')[1];
	lb_cancel_img.src = "/pages/js/lightbox/images/loading.gif";

	var lb_close_img = lightbox.getElementsByTagName('img')[2];
	lb_close_img.src = "/pages/js/lightbox/images/close.png";

      $('a').smoothScroll({
        speed: 3000,
        easing: 'easeInOutCubic'
      });
/*
      $('.showOlderChanges').on('click', function(e){
        $('.changelog .old').slideDown('slow');
        $(this).fadeOut();
        e.preventDefault();
      })
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
<?php
	}//------------------------------- end if

	if (Yii::app()->params['colorbox']=='pirobox')
	{
echo '
	<link rel="stylesheet" href="/pages/js/pirobox/pirobox.css" type="text/css" media="screen" />
	<script type="text/javascript" src="/pages/js/pirobox/jquery.min.js"></script>
	<script type="text/javascript" src="/pages/js/pirobox/pirobox_ansi.js"></script>
	<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : true, // true == slideshow on, false == slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : ".piro_close,.piro_overlay" // add class .piro_overlay(with comma)if you want overlay click close piroBox
	});
});
	</script>
';
	}//------------------------------- end if

	if (Yii::app()->params['colorbox']=='highslide')
	{
echo '
	<link rel="stylesheet" type="text/css" href="/pages/js/highslide/highslide.css" />
	<script type="text/javascript" src="/pages/js/highslide/highslide.js"></script>
	
<script type="text/javascript">
//http://highslide.com/ref/hs.expand
		hs.graphicsDir = "/pages/js/highslide/graphics/";
		hs.wrapperClassName = "wide-border";
		hs.showCredits = false;
		//hs.align = "center";
		//hs.transitions = ["expand", "crossfade"];
		// Add the simple close button
		hs.registerOverlay({
			html: "<div class=\"closebutton\" onclick=\"return hs.close(this)\" title=\"Close\"></div>",
			position: "top right",
			fade: 2 // fading the semi-transparent overlay looks bad in IE
		});
	</script>
';
	}//------------------------------- end if
?>
<!-- ############################### -->
</head>

<body>

<div class="container" id="page">

	<div id="header">
		<div id="logo"><?php echo CHtml::encode(Yii::app()->name); ?></div>
	</div><!-- header -->

	<div id="mainmenu">
		<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Главная', 'url'=>array('/site/index')),
				//array('label'=>'About', 'url'=>array('/site/page', 'view'=>'about')),
				//array('label'=>'Contact', 'url'=>array('/site/contact')),
				array('label'=>'All images ', 'url'=>array('/node')),
				array('label'=>'All albums', 'url'=>array('/site/list')),
				array('label'=>'export', 'url'=>array('/export')),
				//array('label'=>'Content_type_photogallery_image', 'url'=>array('/Content_type_photogallery_image')),
				
				//array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				//array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
		)); ?>
	</div><!-- mainmenu -->
	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>

	<div class="clear"></div>

	<div id="footer">
		Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
		All Rights Reserved.<br/>
		<?php echo Yii::powered(); ?>
	</div><!-- footer -->

</div><!-- page -->

</body>
</html>
