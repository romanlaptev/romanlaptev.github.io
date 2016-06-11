<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Truly_Minimal
 */
?>


<article id="post-<?php the_ID(); ?>
content-page.php

" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'truly_minimal' ), 'after' => '</div>' ) ); ?>
	</div><!-- .entry-content -->
	<?php edit_post_link( __( 'Edit', 'truly_minimal' ), '<footer class="entry-meta"><span class="edit-link">', '</span></footer>' ); ?>
	<?php do_action( 'truly-minimal-after-entry' ); ?>
</article><!-- #post-## -->
