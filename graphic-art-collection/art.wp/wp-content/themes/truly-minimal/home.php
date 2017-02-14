<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, layout=1.0">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->

<?php //wp_head(); ?>
<!--
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
$(document).ready(function(){
console.log( "i am ready!" );
});

window.onload = function(){
console.log( "loaded...." );
}
</script>
-->


<?php
	$config["jquery"] = false;
	$config["bootstrap"] = true;

	echo '<link rel="stylesheet" href="'.site_url().'/css/main.css" type="text/css" media="screen" />';
	if ($config["bootstrap"])
	{
echo '<link rel="stylesheet" href="'.site_url().'/bootstrap/bootstrap335.min.css" type="text/css" media="screen" />';
//echo '<script type="text/javascript" src="'.site_url().'/bootsrap/bootstrap335.min.js"></script>';
	}

	if ($config["jquery"])
	{
echo '<script type="text/javascript" src="'.site_url().'/js/lib/jquery-1.10.2.min.js"></script>';
	}
?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="container">
	<?php do_action( 'before' ); ?>
	<header>
		<hgroup>
			<h1 class="text-center"><?php bloginfo( 'name' ); ?></h1>
		</hgroup>
	</header>

	<div class="row">
		<div class="col-xs-offset-1 col-sm-offset-1 col-sm-10 col-md-offset-3 col-md-9 col-lg-6">
			<div style="" class="row">
				<div class="content">
<?php 
/* view category list */
$args = array(
	'parent'                   => 0,
	'hide_empty'               => 0,
	//'exclude'                  => '21',
	'number'                   => '0',
	'taxonomy'                 => 'category',
	'pad_counts'               => true );
$catlist = get_categories($args);

foreach ($catlist as $categories_item) 
{
	$url = site_url(  $categories_item->taxonomy ."/". $categories_item->category_nicename );
	$img_src = $config["site_content_url"] . "/site-content/albums/termin_images/imagecache/category_pictures/". $categories_item->description;
echo "
	<div class='img-container'>
		<div class='picture'>
			<a href='$url'>
				<img border='0' alt='$categories_item->cat_name' src='$img_src'>
			</a>
		</div>
		<p class='img-caption'>
			<a href='$url'>" .$categories_item->name. "</a>
			<span class='small-text'></span>
		</p>
	</div>
";	
}
?>
				</div>

			</div>
		</div>
			
			
	</div>
</div>


	<footer class="" role="contentinfo">
		<h1 class="text-center"><?php bloginfo( 'description' ); ?></h1>
	</footer>
</div><!-- #page --><!-- end container -->

<?php wp_footer(); ?>

</body>
</html>
<?php //get_footer(); ?>

