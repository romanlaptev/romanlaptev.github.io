<?php
$format = get_post_format();
$supported_formats = get_theme_support( 'post-formats' );

if ( ! in_array( $format, $supported_formats[0] ) )
    $format = 'single';

get_header(); ?>
		<div id="content" class="">

<?php
the_title( '<h2 class="entry-title">', '</h1>' );
edit_post_link( __( 'Edit', 'truly_minimal' ), '<span class="edit-link">', '</span>' );

$field_zoom_img = get_post_custom_values('field_zoom_img_value');
if( !empty($field_zoom_img) )
{
	view_zoom_image( trim($field_zoom_img[0]) );
}
else
{
	view_colorbox();
}
?>

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'content2', $format ); ?>

			<?php truly_minimal_content_nav( 'nav-below' ); ?>

			<?php
				// If comments are open or we have at least one comment, load up the comment template
				if ( comments_open() || '0' != get_comments_number() )
					comments_template();
			?>

		<?php endwhile; // end of the loop. ?>

		</div><!-- #content -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
