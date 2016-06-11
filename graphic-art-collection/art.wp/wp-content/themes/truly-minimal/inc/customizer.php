<?php
/**
 * Truly-Minimal Theme Customizer
 *
 * @package Truly-Minimal
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function truly_minimal_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	$wp_customize->add_section( 'truly_minimal_options', array(
		'title'    => __( 'Theme Options', 'truly-minimal' ),
		'priority' => 35,
	) );

	$wp_customize->add_setting( 'truly_minimal_sidebar', array(
		'default' => 'right',
	) );

	$wp_customize->add_control( 'truly_minimal_sidebar', array(
	    'label'	  => 'Sidebar Placement:',
	    'section' => 'truly_minimal_options',
	    'type'	  => 'select',
	    'choices' => array(
			'right'	=> __( 'Right', 'truly-minimal' ),
			'left'	=> __( 'Left', 'truly-minimal' ),
			'none'	=> __( 'None (Full Width)', 'truly-minimal' ),
	        ),
	) );
}
add_action( 'customize_register', 'truly_minimal_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function truly_minimal_customize_preview_js() {
	wp_enqueue_script( 'truly-minimal-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20130304', true );
}
add_action( 'customize_preview_init', 'truly_minimal_customize_preview_js' );
