<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->

<?php wp_head(); ?>

<?php

	$config["jquery"] = true;
	$config["bootstrap"] = false;
	
	if ($config["bootstrap"])
	{
echo '<link rel="stylesheet" href="'.site_url().'/bootstrap/bootstrap335.min.css" type="text/css" media="screen" />';
//echo '<script type="text/javascript" src="'.site_url().'/bootsrap/bootstrap335.min.js"></script>';
	}

	if ($config["jquery"])
	{
echo '<script type="text/javascript" src="'.site_url().'/js/lib/jquery-1.7.2.min.js"></script>';
	}

	if ($config["colorbox"] =='pirobox')
	{
echo '
	<link rel="stylesheet" href="'.site_url().'/js/pirobox/pirobox.css" type="text/css" media="screen" />
	<script type="text/javascript" src="'.site_url().'/js/pirobox/pirobox.js"></script>
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
	}
?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="hfeed site">
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="">
		<hgroup>
			<?php $header_image = get_header_image();
			if ( ! empty( $header_image ) ) { ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<img src="<?php header_image(); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="" />
				</a>
			<?php } // if ( ! empty( $header_image ) ) ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</hgroup>

		<nav id="site-navigation" class="navigation-main" role="navigation">
			<h1 class="menu-toggle"><?php _e( 'Menu', 'truly_minimal' ); ?></h1>
			<div class="screen-reader-text skip-link"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'truly_minimal' ); ?>"><?php _e( 'Skip to content', 'truly_minimal' ); ?></a></div>

			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="main" class="site-main">

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php if ( is_search() ) : // Only display Excerpts for Search ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	<?php else : ?>

	<div class="entry-content">
<?php 

$field_preview_img = get_post_custom_values('field_preview_img_value');
$img_src = $config["site_content_url"] . $field_preview_img[0];

$field_big_img = get_post_custom_values('field_big_img_value');
$img_url = $config["site_content_url"] . $field_big_img[0];

$field_original_img = get_post_custom_values('field_original_img_value');
$img_url_org = $config["site_content_url"] . $field_original_img[0];

$img_title = $post->post_title;
$post_link =  esc_url( get_permalink() );
$img_caption =  the_title( '<span class="title">', '</span>', false );

$thumbnail = "
		<div class='thumbnail'>
			<a href='$img_url' class='pirobox' title='$img_title'>
				<img src='$img_src' alt='$img_title'>
			</a>
			<p class='img-caption'>
				<a href='$post_link'>$img_caption</a>
			</p>
		</div>
";
echo $thumbnail;

wp_link_pages( 
array( 
'before' => '<div class="page-links">' . __( 'Pages:', 'truly_minimal' ), 
'after' => '</div>' ) 
); 


?>
	</div><!-- .entry-content -->
	<?php endif; ?>

	<?php do_action( 'truly-minimal-after-entry' ); ?>
</article>
<!-- #post-## -->

				<?php
					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || '0' != get_comments_number() )
						comments_template();
				?>

			<?php endwhile; // end of the loop. ?>

		</div><!-- #content -->
	</div><!-- #primary -->


<?php get_sidebar(); ?>
	</div><!-- #main -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
