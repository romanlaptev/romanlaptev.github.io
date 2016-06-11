<?php
/**
 * WordPress.com-specific functions and definitions
 * This file is centrally included from `wp-content/mu-plugins/wpcom-theme-compat.php`.
 *
 * @package Truly_Minimal
 */

function truly_minimal_theme_colors() {
	global $themecolors;

	/**
	 * Set a default theme color array for WP.com.
	 *
	 * @global array $themecolors
	 */
	if ( ! isset( $themecolors ) ) :
		$themecolors = array(
			'bg'     => 'ffffff',
			'border' => '918b8b',
			'text'   => '333333',
			'link'   => '08c1c3',
			'url'    => '08c1c3',
		);
	endif;
}
add_action( 'after_setup_theme', 'truly_minimal_theme_colors' );

/*
 * De-queue Google fonts if custom fonts are being used instead
 */

function truly_minimal_dequeue_fonts() {
	if ( class_exists( 'TypekitData' ) && class_exists( 'CustomDesign' ) ) {
		if ( CustomDesign::is_upgrade_active() ) {
			$custom_fonts = TypekitData::get( 'families' );
				if ( ! $custom_fonts )
					return;

				$site_title = $custom_fonts['site-title'];
				$headings = $custom_fonts['headings'];
				$body_text = $custom_fonts['body-text'];

				if ( $site_title['id'] && $headings['id'] && $body_text['id'] ) {
					wp_dequeue_style( 'truly-minimal-droid-sans' );
			}
		}
	}
}

add_action( 'wp_enqueue_scripts', 'truly_minimal_dequeue_fonts' );

//WordPress.com specific styles
function truly_minimal_wpcom_styles() {
	wp_enqueue_style( 'truly_minimal-wpcom', get_template_directory_uri() . '/inc/style-wpcom.css', '080213' );
}
add_action( 'wp_enqueue_scripts', 'truly_minimal_wpcom_styles' );

/**
 * Adds support for WP.com print styles
 */
function truly_minimal_print_styles() {
	add_theme_support( 'print-style' );
}
add_action( 'after_setup_theme', 'truly_minimal_print_styles' );
