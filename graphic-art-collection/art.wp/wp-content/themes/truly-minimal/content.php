<?php
/**
 * @package Truly_Minimal
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

content.php

	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php truly_minimal_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<?php if ( is_search() ) : // Only display Excerpts for Search ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	<?php else : ?>

	<div class="entry-content">
<?php 

the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'truly_minimal' ) ); 

/*
$field_preview_img = get_post_custom_values('field_preview_img_value');
$img_src = $site_content_url . $field_preview_img[0];

$field_big_img = get_post_custom_values('field_big_img_value');
$img_url = $site_content_url . $field_big_img[0];

$field_original_img = get_post_custom_values('field_original_img_value');
$img_url_org = $site_content_url . $field_original_img[0];

$thumbnail = "
		<div class='thumbnail'>
			<a href='$img_url' class='pirobox'><img src='$img_src'></a>
		</div><!-- end thumbnail -->
";
echo $thumbnail;
*/

wp_link_pages( 
array( 
'before' => '<div class="page-links">' . __( 'Pages:', 'truly_minimal' ), 
'after' => '</div>' ) 
); 

?>
	</div><!-- .entry-content -->
	<?php endif; ?>

	<footer class="entry-meta">
		<?php if ( 'post' == get_post_type() ) : // Hide category and tag text for pages on Search ?>
			<?php
				/* translators: used between list items, there is a space after the comma */
				$categories_list = get_the_category_list( __( ', ', 'truly_minimal' ) );
				if ( $categories_list && truly_minimal_categorized_blog() ) :
			?>

			<span class="cat-links">
<?php 
printf( __( 'Categories: %1$s', 'truly_minimal' ), $categories_list ); 
?>
			</span>

			<?php endif; // End if categories ?>

			<?php
				/* translators: used between list items, there is a space after the comma */
				$tags_list = get_the_tag_list( '', __( ', ', 'truly_minimal' ) );
				if ( $tags_list ) :
			?>
			<span class="sep"> / </span>
			<span class="tags-links">
				<?php printf( __( 'Tagged %1$s', 'truly_minimal' ), $tags_list ); ?>
			</span>
			<?php endif; // End if $tags_list ?>
		<?php endif; // End if 'post' == get_post_type() ?>

		<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
		<span class="sep"> / </span>
		<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'truly_minimal' ), __( '1 Comment', 'truly_minimal' ), __( '% Comments', 'truly_minimal' ) ); ?></span>
		<?php endif; ?>

		<?php edit_post_link( __( 'Edit', 'truly_minimal' ), '<span class="sep"> / </span><span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
	<?php do_action( 'truly-minimal-after-entry' ); ?>
</article>
<!-- #post-## -->
