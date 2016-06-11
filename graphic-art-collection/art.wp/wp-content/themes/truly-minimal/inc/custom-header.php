<?php
/**
 * @package Truly_Minimal
 */

/**
 * Setup the WordPress core custom header feature.
 *
 * @uses truly_minimal_header_style()
 * @uses truly_minimal_admin_header_style()
 * @uses truly_minimal_admin_header_image()
 *
 * @package Truly_Minimal
 */
function truly_minimal_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'truly_minimal_custom_header_args', array(
		'default-text-color'     => '08c1c3',
		'width'                  => 955,
		'height'                 => 250,
		'flex-height'            => true,
		'flex-width'             => true,
		'wp-head-callback'       => 'truly_minimal_header_style',
		'admin-head-callback'    => 'truly_minimal_admin_header_style',
		'admin-preview-callback' => 'truly_minimal_admin_header_image',
	) ) );
}
add_action( 'after_setup_theme', 'truly_minimal_custom_header_setup' );
if ( ! function_exists( 'truly_minimal_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog
 *
 * @see truly_minimal_custom_header_setup().
 */
function truly_minimal_header_style() {

	// If no custom options for text are set, let's bail
	// get_header_textcolor() options: HEADER_TEXTCOLOR is default, hide text (returns 'blank') or any hex value
	if ( HEADER_TEXTCOLOR == get_header_textcolor() )
		return;
	// If we get this far, we have custom styles. Let's do this.
	?>
	<style type="text/css">
	<?php
		// Has the text been hidden?
		if ( 'blank' == get_header_textcolor() ) :
	?>
		.site-title,
		.site-description {
			position: absolute !important;
			clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
			clip: rect(1px, 1px, 1px, 1px);
		}
	<?php
		// If the user has set a custom color for the text use that
		else :
	?>
		.site-title a {
			color: #<?php echo get_header_textcolor(); ?>;
		}
	<?php endif; ?>
	</style>
	<?php
}
endif; // truly_minimal_header_style

if ( ! function_exists( 'truly_minimal_admin_header_style' ) ) :
/**
 * Styles the header image displayed on the Appearance > Header admin panel.
 *
 * @see truly_minimal_custom_header_setup().
 */
function truly_minimal_admin_header_style() {
?>
	<style type="text/css">
	.appearance_page_custom-header #headimg {
		border: none;
		max-width: 955px;
	}
	#headimg h1,
	#desc {
	}
	#headimg h1 {
		font-family: 'Droid Sans', Arial, Helvetica, sans-serif;
		font-size: 36px;
		font-weight: bold;
		letter-spacing: -2px;
		line-height: 1.25;
		margin: 1.25em 0 .25em;
	}
	#headimg h1 a {
		text-decoration: none;
	}
	#desc {
		color: #a5a5a5 !important;
		font-family: "Droid Serif", "Times New Roman", serif;
		font-size: 14px;
		font-weight: normal;
		margin: 0 0 1.5em;
	}
	#headimg img {
		display: block;
		margin: 0 auto;
		max-width: 955px;
	}
	</style>
<?php
}
endif; // truly_minimal_admin_header_style

if ( ! function_exists( 'truly_minimal_admin_header_image' ) ) :
/**
 * Custom header image markup displayed on the Appearance > Header admin panel.
 *
 * @see truly_minimal_custom_header_setup().
 */
function truly_minimal_admin_header_image() {
	$style        = sprintf( ' style="color:#%s;"', get_header_textcolor() );
	$header_image = get_header_image();
?>
	<div id="headimg">
		<?php if ( ! empty( $header_image ) ) : ?>
			<img src="<?php echo esc_url( $header_image ); ?>" alt="" />
		<?php endif; ?>
		<h1 class="displaying-header-text"><a id="name"<?php echo $style; ?> onclick="return false;" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></h1>
		<div class="displaying-header-text" id="desc"<?php echo $style; ?>><?php bloginfo( 'description' ); ?></div>
	</div>
<?php
}
endif; // truly_minimal_admin_header_image