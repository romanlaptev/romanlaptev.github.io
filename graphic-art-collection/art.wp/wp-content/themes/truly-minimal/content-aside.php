<?php
/**
 * @package Truly_Minimal
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'truly_minimal' ), 'after' => '</div>' ) ); ?>
	</div><!-- .entry-content -->

	<footer class="entry-meta">
		<a class="entry-format" href="<?php echo esc_url( get_post_format_link( 'aside' ) ); ?>" title="<?php echo esc_attr( sprintf( __( 'All %s posts', 'truly_minimal' ), get_post_format_string( 'aside' ) ) ); ?>"><?php echo get_post_format_string( 'aside' ); ?></a>
		<span class="sep"> / </span>
		<?php if ( is_single() ) : ?>
			<?php the_title( '<h1 class="entry-title">', '</h1><span class="sep"> / </span>' ); ?>
		<?php else : ?>
			<?php the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1><span class="sep"> / </span>' ); ?>
		<?php endif; ?>
		<?php truly_minimal_posted_on(); ?>

		<?php edit_post_link( __( 'Edit', 'truly_minimal' ), '<span class="sep"> / </span><span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
	<?php do_action( 'truly-minimal-after-entry' ); ?>
</article><!-- #post-## -->
