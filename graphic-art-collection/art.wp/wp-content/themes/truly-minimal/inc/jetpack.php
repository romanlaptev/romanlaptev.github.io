<?php
/**
 * Jetpack Compatibility File
 * See: http://jetpack.me/
 *
 * @package Truly_Minimal
 */

/**
 * Add theme support for Infinite Scroll.
 * See: http://jetpack.me/support/infinite-scroll/
 */
function truly_minimal_infinite_scroll_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'content',
		'footer'    => 'page',
	) );
}
add_action( 'after_setup_theme', 'truly_minimal_infinite_scroll_setup' );


if ( function_exists( 'jetpack_is_mobile' ) ) {
	function truly_minimal_has_footer_widgets() {

		if ( jetpack_is_mobile( '', true ) && is_active_sidebar( 'sidebar-1' ) )
			return true;

		return false;
	}
	add_filter( 'infinite_scroll_has_footer_widgets', 'truly_minimal_has_footer_widgets' );
}