<?php
/**
 * @package Truly_Minimal
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php if ( is_single() ) : ?>
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<?php else : ?>
			<?php the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' ); ?>
		<?php endif; ?>
	</header><!-- .entry-header -->
	<div class="entry-content">
		<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'truly_minimal' ) ); ?>
		<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'truly_minimal' ), 'after' => '</div>' ) ); ?>
	</div><!-- .entry-content -->

	<footer class="entry-meta">
		<a class="entry-format" href="<?php echo esc_url( get_post_format_link( 'video' ) ); ?>" title="<?php echo esc_attr( sprintf( __( 'All %s posts', 'truly_minimal' ), get_post_format_string( 'video' ) ) ); ?>"><?php echo get_post_format_string( 'video' ); ?></a>
		<span class="sep"> / </span>
		<?php truly_minimal_posted_on(); ?>
		<?php
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( __( ', ', 'truly_minimal' ) );
			if ( $categories_list && truly_minimal_categorized_blog() ) :
		?>
		<span class="cat-links">
			<?php printf( __( 'in %1$s', 'truly_minimal' ), $categories_list ); ?>
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

		<?php if ( ! is_single() && ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
		<span class="sep"> / </span>
		<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'truly_minimal' ), __( '1 Comment', 'truly_minimal' ), __( '% Comments', 'truly_minimal' ) ); ?></span>
		<?php endif; ?>

		<?php edit_post_link( __( 'Edit', 'truly_minimal' ), '<span class="sep"> / </span><span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
	<?php do_action( 'truly-minimal-after-entry' ); ?>
</article><!-- #post-## -->
