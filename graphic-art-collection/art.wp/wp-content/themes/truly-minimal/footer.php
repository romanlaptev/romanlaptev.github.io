<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package Truly_Minimal
 */
?>

	</div><!-- #main -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<?php do_action( 'truly_minimal_credits' ); ?>
			<a href="http://wordpress.org/" title="<?php esc_attr_e( 'A Semantic Personal Publishing Platform', 'truly_minimal' ); ?>" rel="generator"><?php printf( __( 'Proudly powered by %s', 'truly_minimal' ), 'WordPress' ); ?></a>
			<span class="sep"> / </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'truly_minimal' ), 'Truly Minimal', '<a href="http://www.flarethemes.com" rel="designer">FlareThemes</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>