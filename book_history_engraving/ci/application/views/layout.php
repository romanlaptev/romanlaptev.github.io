<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" version="XHTML+RDFa 1.0" dir="ltr"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/terms/"
  xmlns:foaf="http://xmlns.com/foaf/0.1/"
  xmlns:og="http://ogp.me/ns#"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  xmlns:sioc="http://rdfs.org/sioc/ns#"
  xmlns:sioct="http://rdfs.org/sioc/types#"
  xmlns:skos="http://www.w3.org/2004/02/skos/core#"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema#">

	<head profile="http://www.w3.org/1999/xhtml/vocab">
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>

<?php
	if ($this->config->item('colorbox')=='lightbox')
	{
echo "
	<script src='".$this->config->item('base_url')."js/lightbox/jquery-1.7.2.min.js'></script>
	<script type='text/javascript' src='".$this->config->item('base_url')."js/lightbox/lightbox.js'></script>
	<link rel='stylesheet' href='".$this->config->item('base_url')."js/lightbox/lightbox.css' type='text/css' media='screen' />
";
?>
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
<?php
	}//------------------------------- end if

	if ($this->config->item('colorbox')=='pirobox')
	{
echo '
	<link rel="stylesheet" href="'.$this->config->item('base_url').'js/pirobox/pirobox.css" type="text/css" media="screen" />
	<script type="text/javascript" src="'.$this->config->item('base_url').'js/pirobox/jquery.min.js"></script>
	<script type="text/javascript" src="'.$this->config->item('base_url').'js/pirobox/pirobox_ansi.js"></script>
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

	if ($this->config->item('colorbox')=='highslide')
	{
echo '
	<link rel="stylesheet" type="text/css" href="'.$this->config->item('base_url').'js/highslide/highslide.css" />
	<script type="text/javascript" src="'.$this->config->item('base_url').'js/highslide/highslide.js"></script>
	
<script type="text/javascript">
//http://highslide.com/ref/hs.expand
		hs.graphicsDir = "'.$this->config->item('base_url').'js/highslide/graphics/";
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
	<link href="<? echo $this->config->item('base_url') ?>css/style.css" rel="stylesheet" type="text/css" />
	<title><? echo $title;?></title>
</head>

<body>

	<div class="breadcrumbs">
<?
//echo "<pre>";
//print_r($page);
//print_r($book);
//print_r($template);
//print_r($this->breadcrumbs);
//print_r($this->breadcrumbs);
//print_r($breadcrumbs);
//print_r($this->config);
//echo "</pre>";

//---------------------------------------
	//$this->load->helper('url');
//echo index_page();
//echo current_url();
//echo site_url();
//echo anchor('news/local/123', 'Мои новости', array('title' => 'Самые лучшие новости!'));
//---------------------------------------
	echo $breadcrumbs;
	echo "<br>";
?>
	</div>

<?
	if ($template == "view-content")
	{
		$data['book']=$book;
		$this->load->view($template,$data);
	}

	if ($template == "view-page")
	{
		$data['page']=$page;
		$this->load->view($template,$data);
	}
?>

<?php
if (!empty($page_links))
{
//echo "<pre>";
//print_r($page_links);
//echo "</pre>";
	echo '<div class="page-links">';

	echo '	<div class="page-previous">';
	if (!empty($page_links["page_previous_mlid"]))
	{
		echo '<a class="" 
title="'.$page_links["page_previous_link_title"].'" 
href="'.$this->config->item("base_url").'index.php/book/get_page/?mlid='.$page_links["page_previous_mlid"]
.'">&lt;|| предыдущая страница</a>';
	}
	echo '	&nbsp;</div>';

	echo '	<div class="page-up">';
	echo '	<a href="#top">к началу страницы</a> | ';
	if (!empty($page_links["content_plid"]))
	{
		echo '<a class="" 
title="Перейти к родительской странице" 
href="'.$this->config->item("base_url").'index.php/book/get_page/?mlid='.$page_links["content_plid"]
.'">содержание</a>';
	}
	echo '	&nbsp;</div>';

	if (!empty($page_links["page_next_mlid"]))
	{
		echo '<a class="page-next" 
title="'.$page_links["page_next_link_title"].'" 
href="'.$this->config->item("base_url").'index.php/book/get_page/?mlid='.$page_links["page_next_mlid"]
.'">следующая страница ||&gt; </a>';
	}
	echo '</div>';
}
?>

</body>
</html>
